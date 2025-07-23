import { type Object3DNode, extend } from '@react-three/fiber';
import { LumaSplatsThree } from '@lumaai/luma-web';
import { useLumaModel } from '../helpers/useLumaModel';

extend({ LumaSplats: LumaSplatsThree });

// For typeScript support:
declare module '@react-three/fiber' {
  interface ThreeElements {
    lumaSplats: Object3DNode<LumaSplatsThree, typeof LumaSplatsThree>;
  }
}

interface HouseModelProps {
  onProgress: (progress: number) => void;
  onLoaded: () => void;
}

const HouseModelWithHook = ({ onProgress, onLoaded }: HouseModelProps) => {
  const { model, error } = useLumaModel(onProgress, onLoaded);

  if (error || !model) {
    return (
      <group rotation={[0, 0, -0.06]} position={[0, 0.2, 0.2]} scale={1.1}>
        {/* You could add a loading placeholder here */}
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="gray" wireframe />
        </mesh>
      </group>
    );
  }

  return (
    <group rotation={[0, 0, -0.06]} position={[-0.03, 0.27, 0.3]} scale={1.1}>
      {model && <primitive object={model} />}
    </group>
  );
};

export default HouseModelWithHook;
