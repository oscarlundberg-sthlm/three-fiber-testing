/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useCylinder } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";

interface WheelProps {
    radius: number;
    leftSide?: boolean;
}

useGLTF.preload("threeDModels/pickup/carwheel.glb");

const Wheel = forwardRef(({ radius = 1, leftSide, ...props }: WheelProps, ref) => {
    const { nodes, materials } = useGLTF("threeDModels/pickup/carwheel.glb");

    // kinematic bodies move based on their velocity and need to be manually moved.
    useCylinder(() => ({ mass: 10, type: 'Kinematic', material: 'wheel', collisionFilterGroup: 0, args: [radius, radius, 0.5, 16], ...props }), ref);

    return (
        <mesh ref={ref}>
            <mesh rotation={[0, 0, ((leftSide ? 1 : -1) * Math.PI) / 2]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Torus006.geometry}
                    material={materials["Material.001"]}
                />
            </mesh>
        </mesh>
    );
});

export default Wheel;
