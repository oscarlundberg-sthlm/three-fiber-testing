'use client'
import Plane from "@/components/Plane";
import Vehicle from "@/components/Vehicle";
import { rotate } from "@/helpers/threeJs";
import { ContactShadows, OrbitControls } from "@react-three/drei";
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
                position: [-15, 10, 15],
                rotation: [0, rotate(-50), 0],
            }}
        >
            <ambientLight intensity={0.5} />
            <spotLight
                angle={rotate(45)}
                position={[1000, 1000, 1000]}
                intensity={10000000}
                color={"red"}
                castShadow
            />

            <Physics gravity={[0, -50, 0]} debug>
                <Plane position={[0, 0, 0]} />
                {/* <Wheel wheelType="back" positionX={-20} positionZ={-20} /> */}
                <Vehicle position={[0, 10, 0]} rotation={[0, 0, 0]} />
            </Physics>

            <ContactShadows
                scale={20}
                blur={0.4}
                opacity={0.2}
                position={[-0, -1.5, 0]}
            />

            <OrbitControls />
        </Canvas>
    );
};

export default ThreeDEnvironment