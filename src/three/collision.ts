/* eslint-disable prettier/prettier */
import * as THREE from 'three';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';

// Enable BVH helpers on prototypes
(THREE.Mesh as unknown as { prototype: THREE.Mesh }).prototype.raycast = acceleratedRaycast as any;
(THREE.BufferGeometry as unknown as { prototype: THREE.BufferGeometry }).prototype.computeBoundsTree =
  computeBoundsTree as any;
(THREE.BufferGeometry as unknown as { prototype: THREE.BufferGeometry }).prototype.disposeBoundsTree =
  disposeBoundsTree as any;

export type CollisionWorld = { meshes: THREE.Mesh[] };

export function buildCollisionWorld(fromMeshes: THREE.Mesh[]): CollisionWorld {
  const meshes: THREE.Mesh[] = [];
  for (const mesh of fromMeshes) {
    if (!mesh.geometry) continue;
    // Build BVH on original geometry (local space); transforms handled by Mesh
    (mesh.geometry as any).computeBoundsTree?.();
    meshes.push(mesh);
  }
  return { meshes };
}

export function sweepCollision(
  world: CollisionWorld,
  start: THREE.Vector3,
  delta: THREE.Vector3,
  radius = 0.3,
  maxIter = 3
): THREE.Vector3 {
  // Simple iterative sweep test using raycasts along the movement vector
  const position = start.clone();
  const remaining = delta.clone();
  const ray = new THREE.Raycaster();
  ray.far = remaining.length();

  for (let i = 0; i < maxIter; i++) {
    if (remaining.lengthSq() < 1e-8) break;
    const dir = remaining.clone().normalize();
    ray.set(position, dir);
    ray.far = remaining.length() + radius;
    const hits = ray.intersectObjects(world.meshes, false);
    const hit = hits.find((h) => h.distance <= remaining.length() + radius);
    if (!hit) {
      position.add(remaining);
      break;
    }
    // Slide along the surface normal
    const penetration = remaining.length() - hit.distance + radius;
    const n = (hit.face?.normal.clone() ?? new THREE.Vector3(0, 1, 0)).transformDirection(
      (hit.object as THREE.Object3D).matrixWorld
    );
    const correction = n.multiplyScalar(penetration > 0 ? penetration : 0);
    position.addScaledVector(dir, hit.distance - radius).add(correction.multiplyScalar(1.01));
    // Compute slide vector: remove normal component
    const slide = remaining.clone().sub(n.multiplyScalar(remaining.dot(n)));
    remaining.copy(slide);
  }
  return position.sub(start);
}



