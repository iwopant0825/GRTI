import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Model as Apartment } from './models/Apartment';

export function App() {
  return (
    <Root>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [6, 4, 8], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Apartment />
          <Environment preset="city" />
        </Suspense>
        {/* OrbitControls 제거: 1인칭 컨트롤 사용 */}
      </Canvas>
    </Root>
  );
}

const Root = styled.div`
  position: fixed;
  inset: 0;
  background: var(--gr-bg);
`;
