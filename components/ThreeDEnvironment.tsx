'use client'
import Plane from "@/components/Plane";
import Vehicle from "@/components/Vehicle";
import { rotate } from "@/helpers/threeJs";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";

const ThreeDEnvironment = () => {
    return (
        <Canvas
            shadows
            camera={{
                fov: 90,
                near: 0.1,
                far: 50000,
                position: [-15, 1, 15],
                rotation: [rotate(-1), rotate(-50), 0],
            }}
        >
            <ambientLight intensity={0.5} />
            <spotLight
                angle={rotate(45)}
                position={[1000, 1000, 1000]}
                intensity={10000000}
                castShadow
            />

            <Physics gravity={[0, -50, 0]}>
                <Plane position={[0, 0, 0]} />
                {/* <Wheel wheelType="back" positionX={-20} positionZ={-20} /> */}
                <Vehicle position={[5, 0, 0]} rotation={[0, rotate(180), 0]} />
            </Physics>

            <OrbitControls />
        </Canvas>
    );
};

export default ThreeDEnvironment