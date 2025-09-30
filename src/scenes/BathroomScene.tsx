export function BathroomScene() {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[1.2, 0.5, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#f72585" />
      </mesh>
    </group>
  );
}


