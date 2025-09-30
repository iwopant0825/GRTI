export function KitchenScene() {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[-1.2, 0.5, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#4cc9f0" />
      </mesh>
    </group>
  );
}


