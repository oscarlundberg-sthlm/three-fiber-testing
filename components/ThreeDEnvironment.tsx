'use client'
import { rotate } from "@/helpers/threeJs";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Debug, Physics } from "@react-three/cannon";
import { Suspense } from "react";
import Plane from "./Plane";
import Vehicle from "./pickupTruck/Vehicle";

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
                // color={"red"}
                castShadow
            />
            <pointLight position={[0,20,0]} castShadow intensity={1000} />
            
            <Suspense>
                <Physics broadphase="SAP" contactEquationRelaxation={4} friction={1e-3} allowSleep>
                    <Debug>
                        <Plane position={[0, 0, 0]} />
                        {/* <Wheel wheelType="back" positionX={-20} positionZ={-20} /> */}
                        {/* <Vehicle position={[0, 10, 0]} rotation={[0, 0, 0]} /> */}
                        {/* <VehicleSimpleBlender position={[0, 10, 0]} rotation={[0, 0, 0]} /> */}
                        <Vehicle position={[0, 2, 0]} angularVelocity={[0, 1, 0]} wheelRadius={2} />
                    </Debug>
                </Physics>
            </Suspense>

            <ContactShadows
                scale={20}
                blur={0.4}
                opacity={0.2}
                position={[-0, -1.5, 0]}
            />
            <Environment preset="park" background blur={0.2} />
            <OrbitControls />
        </Canvas>
    );
};

export default ThreeDEnvironment