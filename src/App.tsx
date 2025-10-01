import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Model as Apartment } from './models/Apartment';
import { StartScreen } from './components/StartScreen';
import { useAppViewStore } from './store/viewStore';

export function App() {
  const view = useAppViewStore((s) => s.view);
  return (
    <Root>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [6, 4, 8], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        shadows
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 15, 8]}
          intensity={1.2}
          castShadow
          shadow-bias={-0.0005}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.1}
          shadow-camera-far={100}
        />
        <pointLight position={[0, 5, 0]} intensity={0.3} castShadow />
        <Suspense fallback={null}>
          <Apartment />
          <Sky />
        </Suspense>
      </Canvas>
      {view === 'start' && <StartScreen />}
    </Root>
  );
}

const Root = styled.div`
  position: fixed;
  inset: 0;
  background: var(--gr-bg);
`;
