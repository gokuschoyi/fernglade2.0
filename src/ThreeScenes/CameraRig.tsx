import { useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { Vector3, CatmullRomCurve3 } from 'three';

// const keyframes1 = [ // ← Extracted from your JSON
//     { position: [-1.7728, 1.1813, -4.5147] },
//     { position: [-4.4588, 1.7557, -0.0844] },
//     { position: [1.0851, 1.4023, 6.3791] },
//     { position: [3.9527, 1.2770, 0.8684] },
//     { position: [2.8546, 1.0627, -2.8592] },
//     { position: [1.5920, 1.8491, -5.1255] },
//     { position: [-0.7431, 2.5308, -8.0545] },
// ]

const kk = [
    { position: [-2.233, 0.957, -3] },
    { position: [-5.584, 1.982, -0.249] },
    { position: [-0.783, 1.506, 4.703] },
    { position: [1.972, 0.488, 2.366] },
    { position: [3.006, 0.603, -0.571] },
    { position: [0.735, 0.703, -2.949] },
    { position: [-3.440, 1.947, -4.389] },
    { position: [-4.993, 2.194, -2.269] },
    { position: [-5.096, 2.600, 1.468] },
]

const keyframes_ = [
    { position: [0, 0, 0] },
    { position: [2.687, 0.3, -1.63] },
    { position: [-0.684, 1.416, -4.746] },
    { position: [-2.569, 1.047, -2.979] },
    { position: [-3.487, 1.176, -1.741] },
    { position: [-2.939, 0.986, -0.519] },
    { position: [-2.243, 0.782, 2.059] },
    { position: [-0.59, 0.26, 3.077] },
    { position: [0.585, 0.044, 2.142] },
    { position: [1.633, 0.281, 1.479] },
    { position: [2.091, 0.65, -0.373] },
    { position: [0.414, 0.383, -2.148] },
    { position: [-1.172, 0.47, -1.828] },
    { position: [-2.093, 0.665, -0.336] },
    { position: [-1.689, 0.404, 1.385] },
    { position: [1.26, -0.071, 2.879] },
    { position: [2.578, 0.002, -1.799] },
]

const keyframes = [
    { position: [-2.687, 0.3, 1.63] },
    { position: [0.684, 1.416, 4.746] },
    { position: [4, 1, 3] },
    { position: [6, 1, -5] },
    { position: [-1, 0.8, -3.7] },
    { position: [-1, 1.2, -1] },
    { position: [-1, 1.4, 1] },
]
// Custom camera controller to follow scroll
const CameraController = ({ offset }: { offset: number }) => {
    console.log('CameraController rendered with offset:', offset);
    const { camera } = useThree();
    const data = useScroll()
    const curve = useMemo(() => {
        const points = keyframes.map(k => new Vector3(...k.position))
        return new CatmullRomCurve3(points)
    }, [])

    const target = new Vector3();
    useFrame(() => {
        if (offset !== undefined) {
            const point = curve.getPointAt(offset)
            camera.position.lerp(point, 0.1)
        }
        const point = curve.getPointAt(data.offset)
        // console.log('Point at offset:', data.offset)
        camera.position.lerp(point, 0.1)
        // console.log('Camera position:', camera.position)

        // Optional: look ahead slightly to create natural motion
        curve.getPointAt(Math.min(data.offset + 0.01, 1), target)
        camera.lookAt(0, 0, 0);
    })

    return null;
};

export { CameraController }