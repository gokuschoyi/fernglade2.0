import { Text } from '@react-three/drei';

export const GridLabels = ({ size = 10, spacing = 1 }) => {
  const labels = [];

  for (let x = -size / 2; x <= size / 2; x += spacing) {
    for (let z = -size / 2; z <= size / 2; z += spacing) {
      labels.push(
        <Text
          key={`label-${x}-${z}`}
          position={[x, 0.01, z]} // just above the grid
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {`(${x},${z})`}
        </Text>,
      );
    }
  }

  return <group>{labels}</group>;
};
