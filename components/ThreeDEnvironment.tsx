'use client'
import { rotate } from "@/helpers/threeJs";
import { ContactShadows, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Physics } from "@react-three/cannon";
import { Suspense } from "react";
import { Lamppost } from "./Lamppost";
import { OscarStatuett } from "./OscarStatuett";
import { OscarText } from "./OscarText";
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
            <ambientLight intensity={2} />
            
            <Suspense>
                <Physics broadphase="SAP" allowSleep>
                    {/* <Debug> */}
                        <Plane position={[0, 0, 0]} />
                        <OscarText position={[0,15,30]} />
                        <OscarStatuett position={[0,0,160]} rotation={[0,rotate(90),0]} />
                        {[...Array(5)].map((_,i) => {
                            const initialDepthPosition = 10; 
                            const extraDistance = 15;
                            const depthPosition = initialDepthPosition + (i * extraDistance);
                            return <Lamppost key={'lamppostsLeftLane_' + depthPosition} position={[40,0,depthPosition]} />
                        })}
                        {[...Array(5)].map((_,i) => {
                            const initialDepthPosition = 10; 
                            const extraDistance = 15;
                            const depthPosition = initialDepthPosition + (i * extraDistance);
                            return <Lamppost key={'lamppostsLeftLane_' + depthPosition} position={[-40,0,depthPosition]} />
                        })}
                        <Vehicle position={[0, 2, -40]} wheelRadius={2} />
                    {/* </Debug> */}
                </Physics>
            </Suspense>

            <ContactShadows
                scale={20}
                blur={0.4}
                opacity={0.2}
                position={[-0, -1.5, 0]}
            />
            <Environment preset="night" background blur={0.2} />
            {/* <OrbitControls /> */}

            
        </Canvas>
    );
};

export default ThreeDEnvironment