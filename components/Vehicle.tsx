import Wheel from "@/components/Wheel";
import { Controls } from "@/enums/controls";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { FBXLoader } from "three/examples/jsm/Addons.js";

const Vehicle = (props) => {
    const [sub, get] = useKeyboardControls<Controls>();
    const refCar = useRef<RapierRigidBody>(null);
    const carModel = useLoader(
        FBXLoader,
        "/threeDModels/lowPolyVehicles/Muscle 2/Muscle 2.fbx"
    );

    useFrame(() => {
        if (!refCar?.current) return;

        if (get()[Controls.left]) {
            refCar.current.applyImpulse({ x: 0, y: 0, z: 3 }, true);
            refCar.current.addForce({ x: 0, y: 0, z: 10 }, true);
        }
        if (get()[Controls.right]) {
            refCar.current.applyImpulse({ x: 0, y: 0, z: -3 }, true);
            refCar.current.addForce({ x: 0, y: 0, z: -10 }, true);
        }
        if (get()[Controls.forward]) {
            refCar.current.applyImpulse({ x: 0, y: 0, z: 3 }, true);
            refCar.current.addForce({ x: 0, y: 0, z: 10 }, true);
        }
        if (get()[Controls.back]) {
            refCar.current.applyImpulse({ x: 0, y: 0, z: -3 }, true);
            refCar.current.addForce({ x: 0, y: 0, z: -10 }, true);
        }
    });

    return (
        <group {...props}>
            <RigidBody>
                <Wheel wheelType="back" positionX={6} positionZ={-7} />
            </RigidBody>
            {/* <Wheel wheelType="back" positionX={2.7} positionZ={-4.5} /> */}
            <RigidBody ref={refCar}>
                <mesh castShadow position={[0, 0, 0]} scale={0.027}>
                    <primitive object={carModel} />
                </mesh>
            </RigidBody>
        </group>
    );
};

export default Vehicle;
