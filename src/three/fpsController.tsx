/* eslint-disable prettier/prettier */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { CollisionWorld, buildCollisionWorld, sweepCollision } from './collision';

type Keys = Record<string, boolean>;

export function useFPSControllerFromModel(rootRef: React.MutableRefObject<THREE.Object3D | null>) {
  const { camera, gl } = useThree();
  const keys = useRef<Keys>({});
  const velocity = useRef(new THREE.Vector3());
  const onGround = useRef(false);
  const world = useRef<CollisionWorld | null>(null);
  const playerPos = useRef(new THREE.Vector3()); // foot position (capsule center at feet)

  // Build collision world from model meshes
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const meshes: THREE.Mesh[] = [];
    // Ensure world matrices are up to date before building BVH
    root.updateWorldMatrix(true, true);
    root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh && m.geometry) {
        meshes.push(m);
      }
    });
    world.current = buildCollisionWorld(meshes);

    // Spawn camera at floor near model center to avoid falling
    const bbox = new THREE.Box3().setFromObject(root);
    const center = new THREE.Vector3();
    bbox.getCenter(center);
    const ray = new THREE.Raycaster();
    const sampleOffsets = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.5, 0, 0),
      new THREE.Vector3(-0.5, 0, 0),
      new THREE.Vector3(0, 0, 0.5),
      new THREE.Vector3(0, 0, -0.5)
    ];
    let bestY = -Infinity;
    for (const off of sampleOffsets) {
      const origin = new THREE.Vector3(center.x + off.x, bbox.max.y + 10, center.z + off.z);
      ray.set(origin, new THREE.Vector3(0, -1, 0));
      ray.far = bbox.max.y - bbox.min.y + 20;
      const hits = ray.intersectObjects(meshes, false);
      if (hits[0]) bestY = Math.max(bestY, hits[0].point.y);
    }
    if (!isFinite(bestY)) bestY = bbox.min.y;
    const eyeY = bestY + capsuleEyeHeight;
    // Place camera higher to avoid initial penetration
    camera.position.set(center.x, eyeY + 1.6, center.z);
    // Initialize foot position under camera
    const footY = eyeY - (capsuleEyeHeight - capsuleRadius);
    playerPos.current.set(center.x, footY, center.z);
    // Lock player on ground initially
    onGround.current = true;
    velocity.current.set(0, 0, 0);
  }, [rootRef]);

  // Pointer lock for mouse look
  useEffect(() => {
    const dom = gl.domElement;
    const request = () => dom.requestPointerLock();
    const handleClick = () => {
      if (document.pointerLockElement !== dom) request();
    };
    dom.addEventListener('click', handleClick);
    return () => dom.removeEventListener('click', handleClick);
  }, [gl]);

  // Keyboard input
  useEffect(() => {
    const down = (e: KeyboardEvent) => (keys.current[e.code] = true);
    const up = (e: KeyboardEvent) => (keys.current[e.code] = false);
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  // Mouse look
  useEffect(() => {
    const dom = gl.domElement;
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    const onMove = (event: MouseEvent) => {
      if (document.pointerLockElement !== dom) return;
      const dx = event.movementX || 0;
      const dy = event.movementY || 0;
      const sens = 0.0025;
      euler.setFromQuaternion(camera.quaternion);
      euler.y -= dx * sens;
      euler.x -= dy * sens;
      euler.x = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, euler.x));
      camera.quaternion.setFromEuler(euler);
    };
    dom.addEventListener('mousemove', onMove);
    return () => dom.removeEventListener('mousemove', onMove);
  }, [camera, gl]);

  // Physics parameters
  const gravity = 20;
  const speed = 3;
  const jumpSpeed = 6;
  const capsuleRadius = 0.2; // smaller player radius
  const capsuleEyeHeight = 1.4; // slightly shorter eye height

  useFrame((_, dt) => {
    if (!world.current) return;
    const input = new THREE.Vector3();
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

    if (keys.current['KeyW']) input.add(forward);
    if (keys.current['KeyS']) input.add(forward.clone().multiplyScalar(-1));
    if (keys.current['KeyA']) input.add(right.clone().multiplyScalar(-1));
    if (keys.current['KeyD']) input.add(right);
    input.normalize().multiplyScalar(speed);

    // Jump
    if (keys.current['Space'] && onGround.current) {
      velocity.current.y = jumpSpeed;
      onGround.current = false;
    }

    // Apply gravity
    velocity.current.y -= gravity * dt;

    // Desired horizontal velocity blends towards input
    const currentHorizontal = new THREE.Vector3(velocity.current.x, 0, velocity.current.z);
    const targetHorizontal = new THREE.Vector3(input.x, 0, input.z);
    currentHorizontal.lerp(targetHorizontal, 0.15);
    velocity.current.x = currentHorizontal.x;
    velocity.current.z = currentHorizontal.z;

    // Move with collision sweep
    const delta = velocity.current.clone().multiplyScalar(dt);
    const start = playerPos.current.clone();
    const moved = sweepCollision(world.current, start, delta, capsuleRadius, 4);
    const newPos = start.clone().add(moved);

    // Ground probe & snap to reduce jitter near floor
    const rayDown = new THREE.Raycaster();
    const footProbeStart = newPos.clone().add(new THREE.Vector3(0, 0.3, 0));
    rayDown.set(footProbeStart, new THREE.Vector3(0, -1, 0));
    rayDown.far = 0.8;
    const gh = world.current ? rayDown.intersectObjects(world.current.meshes, false) : [];
    if (gh[0] && velocity.current.y <= 0) {
      const groundY = gh[0].point.y + capsuleRadius;
      const diff = footProbeStart.y - 0.3 - groundY; // distance from foot to ground
      if (diff >= -0.02 && diff <= 0.25) {
        newPos.y = groundY;
        onGround.current = true;
        velocity.current.y = 0;
      } else {
        onGround.current = false;
      }
    } else if (velocity.current.y > 0) {
      onGround.current = false;
    }

    // Commit foot position and update camera at eye height
    playerPos.current.copy(newPos);
    camera.position.set(newPos.x, newPos.y + (capsuleEyeHeight - capsuleRadius), newPos.z);
  });
}
