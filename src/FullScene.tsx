import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CineonToneMapping } from 'three';
import { AdaptiveDpr, ScrollControls, GizmoHelper, GizmoViewport, Scroll } from '@react-three/drei';
import HouseModelWithHook from './ThreeScenes/HouseModelWithHook';
import { CameraController } from './ThreeScenes/CameraRig';
import { GridLabels } from './helpers/GridLabels';
// import { GridSquares } from './helpers/GridSquares';
import { Axis } from './helpers/GridSquares';
import { Content } from './Content';

interface LoadingScreenProps {
  progress: number;
  isLoaded: boolean;
}

const LoadingScreen = ({ progress, isLoaded }: LoadingScreenProps) => {
  return (
    <div
      className={`loading-screen ${isLoaded ? 'loading-screen-hidden' : 'loading-screen-visible'}`}
    >
      <div className="content">
        <h1 className="loading-title">Makki Mala Hillside Retreat</h1>
        <p className="loading-description">Preparing your virtual tour...</p>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress * 100}%` }}></div>
        </div>
        <p className="progress-text">{Math.round(progress * 100)}%</p>
      </div>
    </div>
  );
};

const FullScene = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  // console.log('Loading progress:', loadingProgress, 'Model loaded:', isModelLoaded);
  return (
    <div className="full-scene" style={{ height: '100%' }}>
      <Canvas
        gl={{
          antialias: false,
          toneMapping: CineonToneMapping,
        }}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <AdaptiveDpr pixelated />

        <group position={[0, 0, 0]}>
          {/* <GridSquares size={10} /> */}
          <GridLabels size={10} />
        </group>

        <Axis size={3} />

        <ScrollControls pages={15} damping={0.5} horizontal={false}>
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
          </GizmoHelper>

          <CameraController />

          <Suspense fallback={null}>
            <HouseModelWithHook
              onProgress={setLoadingProgress}
              onLoaded={() => setIsModelLoaded(true)}
            />
          </Suspense>

          <Scroll html style={{ width: '100%' }}>
            {isModelLoaded && <Content />}
          </Scroll>
        </ScrollControls>
      </Canvas>
      <LoadingScreen progress={loadingProgress} isLoaded={isModelLoaded} />
    </div>
  );
};

export default FullScene;
