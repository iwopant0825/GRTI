/* eslint-disable prettier/prettier */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { CollisionWorld, buildCollisionWorld, sweepCollision } from './collision';
import { useAppViewStore } from '../store/viewStore';

type Keys = Record<string, boolean>;

export function useFPSControllerFromModel(rootRef: React.MutableRefObject<THREE.Object3D | null>) {
  const { camera, gl } = useThree();
  const view = useAppViewStore((s) => s.view);
  const setView = useAppViewStore((s) => s.setView);
  const keys = useRef<Keys>({});
  const velocity = useRef(new THREE.Vector3());
  const onGround = useRef(false);
  const world = useRef<CollisionWorld | null>(null);
  const playerPos = useRef(new THREE.Vector3()); // foot position (capsule center at feet)
  const bounds = useRef<THREE.Box3 | null>(null);
  const spawnPos = useRef(new THREE.Vector3());
  const baseFloorY = useRef(0);
  const isPaused = useRef(false);
  const skipFrames = useRef(0);
  const framesNoGround = useRef(0);

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
    bounds.current = bbox;
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
    baseFloorY.current = bestY;
    // Place camera higher to avoid initial penetration
    camera.position.set(center.x, eyeY + 1.6, center.z);
    // Initialize foot position under camera
    const footY = eyeY - (capsuleEyeHeight - capsuleRadius);
    playerPos.current.set(center.x, footY, center.z);
    spawnPos.current.copy(playerPos.current);
    // Lock player on ground initially
    onGround.current = true;
    velocity.current.set(0, 0, 0);
  }, [rootRef, camera]);

  // Pointer lock for mouse look
  useEffect(() => {
    const dom = gl.domElement;
    const request = () => dom.requestPointerLock();
    const handleClick = () => {
      if (view !== 'scene') return;
      if (document.pointerLockElement !== dom) request();
    };
    dom.addEventListener('click', handleClick);
    return () => dom.removeEventListener('click', handleClick);
  }, [gl, view]);

  // If pointer lock is exited (ESC 등), 즉시 시작 화면으로 전환
  useEffect(() => {
    const dom = gl.domElement;
    const onLockChange = () => {
      const locked = document.pointerLockElement === dom;
      if (!locked && view === 'scene') {
        setView('start');
      }
    };
    document.addEventListener('pointerlockchange', onLockChange);
    return () => document.removeEventListener('pointerlockchange', onLockChange);
  }, [gl, view, setView]);

  // Pause on tab hide/blur, resume on focus; drop first frames to avoid dt spike
  useEffect(() => {
    const onVis = () => {
      const hidden = document.hidden;
      isPaused.current = hidden;
      if (hidden) {
        velocity.current.set(0, 0, 0);
      } else {
        skipFrames.current = 2;
      }
    };
    const onBlur = () => {
      isPaused.current = true;
      velocity.current.set(0, 0, 0);
    };
    const onFocus = () => {
      isPaused.current = false;
      skipFrames.current = 2;
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  // Handle WebGL context loss/restoration
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const dom = gl.domElement as HTMLCanvasElement;
    const onLost = (e: Event) => {
      e.preventDefault();
      isPaused.current = true;
    };
    const onRestored = () => {
      isPaused.current = false;
      skipFrames.current = 2;
      const root = rootRef.current;
      if (!root) return;
      const meshes: THREE.Mesh[] = [];
      root.updateWorldMatrix(true, true);
      root.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh && m.geometry) {
          meshes.push(m);
        }
      });
      world.current = buildCollisionWorld(meshes);
      const bbox = new THREE.Box3().setFromObject(root);
      bounds.current = bbox;
      const center = new THREE.Vector3();
      bbox.getCenter(center);
      const ray = new THREE.Raycaster();
      const origin = new THREE.Vector3(center.x, bbox.max.y + 10, center.z);
      ray.set(origin, new THREE.Vector3(0, -1, 0));
      ray.far = bbox.max.y - bbox.min.y + 20;
      const hits = ray.intersectObjects(meshes, false);
      const bestY = hits[0]?.point.y ?? bbox.min.y;
      const eyeY = bestY + capsuleEyeHeight;
      baseFloorY.current = bestY;
      camera.position.set(center.x, eyeY + 1.6, center.z);
      const footY = eyeY - (capsuleEyeHeight - capsuleRadius);
      playerPos.current.set(center.x, footY, center.z);
      spawnPos.current.copy(playerPos.current);
      onGround.current = true;
      velocity.current.set(0, 0, 0);
    };
    dom.addEventListener('webglcontextlost', onLost as EventListener);
    dom.addEventListener('webglcontextrestored', onRestored as EventListener);
    return () => {
      dom.removeEventListener('webglcontextlost', onLost as EventListener);
      dom.removeEventListener('webglcontextrestored', onRestored as EventListener);
    };
  }, [gl, rootRef, camera]);

  // Keyboard input
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        if (view === 'scene') {
          setView('start');
          if (document.exitPointerLock) document.exitPointerLock();
        }
        return;
      }
      if (view !== 'scene') return;
      keys.current[e.code] = true;
    };
    const up = (e: KeyboardEvent) => {
      if (view !== 'scene') return;
      keys.current[e.code] = false;
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, [view, setView]);

  // When entering start view, clear movement state
  useEffect(() => {
    if (view !== 'scene') {
      keys.current = {} as Keys;
      velocity.current.set(0, 0, 0);
    }
  }, [view]);

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
    if (view !== 'scene') return;
    if (isPaused.current) return;
    if (skipFrames.current > 0) {
      skipFrames.current -= 1;
      return;
    }
    const frameDt = Math.min(dt, 0.05);
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
    velocity.current.y -= gravity * frameDt;

    // Desired horizontal velocity blends towards input
    const currentHorizontal = new THREE.Vector3(velocity.current.x, 0, velocity.current.z);
    const targetHorizontal = new THREE.Vector3(input.x, 0, input.z);
    currentHorizontal.lerp(targetHorizontal, 0.15);
    velocity.current.x = currentHorizontal.x;
    velocity.current.z = currentHorizontal.z;

    // Move with collision sweep
    const delta = velocity.current.clone().multiplyScalar(frameDt);
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
      const diff = footProbeStart.y - 0.3 - groundY;
      if (diff >= -0.05 && diff <= 0.35) {
        const dy = groundY - newPos.y;
        newPos.y += THREE.MathUtils.clamp(dy, -0.3, 0.3) * 0.5;
        onGround.current = true;
        framesNoGround.current = 0;
        if (Math.abs(groundY - newPos.y) < 0.02) {
          newPos.y = groundY;
          velocity.current.y = 0;
        } else {
          velocity.current.y *= 0.25;
        }
      } else {
        onGround.current = false;
        framesNoGround.current++;
      }
    } else if (velocity.current.y > 0) {
      onGround.current = false;
      // going up – keep counter but don't reset
    } else {
      // no ground hit at all
      framesNoGround.current++;
    }

    // Respawn guard if out of bounds or unstable
    if (bounds.current) {
      const b = bounds.current;
      const fellBelowBox = newPos.y < b.min.y - 1;
      const fellBelowFloor = newPos.y < baseFloorY.current - 2;
      const lostGroundTooLong = framesNoGround.current > 60; // ~1s at 60fps
      if (!isFinite(newPos.x + newPos.y + newPos.z) || fellBelowBox || fellBelowFloor || lostGroundTooLong) {
        playerPos.current.copy(spawnPos.current);
        camera.position.set(
          spawnPos.current.x,
          spawnPos.current.y + (capsuleEyeHeight - capsuleRadius),
          spawnPos.current.z
        );
        velocity.current.set(0, 0, 0);
        onGround.current = true;
        framesNoGround.current = 0;
        return;
      }
    }

    // Commit foot position and update camera at eye height
    playerPos.current.copy(newPos);
    camera.position.set(newPos.x, newPos.y + (capsuleEyeHeight - capsuleRadius), newPos.z);
  });
}
