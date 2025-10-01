import React, { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Model as Apartment } from './models/Apartment';
import { LandingPage } from './components/LandingPage';
import { useAppViewStore } from './store/viewStore';
import { useProgress } from '@react-three/drei';
import { Crosshair } from './components/Crosshair';

export function App() {
  const view = useAppViewStore((s) => s.view);
  const setProgress = useAppViewStore((s) => s.setProgress);
  const setLoaded = useAppViewStore((s) => s.setLoaded);
  const { progress, active } = useProgress();
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    setProgress(Math.round(progress));
    if (!active && progress >= 100) {
      setLoaded(true);
      // 약간의 여유를 둔 후 씬 표시
      const t = setTimeout(() => setSceneReady(true), 150);
      return () => clearTimeout(t);
    }
  }, [progress, active, setProgress, setLoaded]);

  return (
    <Root>
      {view !== 'scene' && <LandingPage />}
      {view === 'scene' && (
        <>
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
          <Crosshair />
          <SceneCover aria-hidden={!sceneReady} $visible={sceneReady} />
        </>
      )}
    </Root>
  );
}

const Root = styled.div`
  position: fixed;
  inset: 0;
  background: var(--gr-bg);
`;

const SceneCover = styled.div<{ $visible: boolean }>`
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: #000;
  opacity: ${(p) => (p.$visible ? 0 : 1)};
  transition: opacity 0.6s ease;
`;
