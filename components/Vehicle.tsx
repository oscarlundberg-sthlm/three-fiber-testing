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
            refCar.current.setAngvel({ x: 0, y: -10, z: 0 }, true);
        }

        if (get()[Controls.right]) {
            refCar.current.setAngvel({ x: 0, y: 10, z: 0 }, true);
        }

        if (get()[Controls.forward]) {
            refCar.current.applyImpulse({ x: 0, y: 0, z: 10 }, true);
            refCar.current.addForce({ x: 0, y: 0, z: 10 }, true);
        }
        if (get()[Controls.back]) {
            refCar.current.applyImpulse({ x: 0, y: 0, z: -10 }, true);
            refCar.current.addForce({ x: 0, y: 0, z: -10 }, true);
        }
    });

    return (
        <RigidBody ref={refCar} {...props}>
            <Wheel wheelType="front" positionX={2.5} positionZ={-4.4} />
            <Wheel wheelType="front" positionX={-2.5} positionZ={-4.4} />
            <Wheel wheelType="back" positionX={2.5} positionZ={4.4} />
            <Wheel wheelType="back" positionX={-2.5} positionZ={4.4} />
            <RigidBody colliders={false}>
                <mesh position={[0, 1, 0]}>
                    <boxGeometry args={[2, 1, 5]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                {/* <mesh castShadow position={[0, 3, 0]} scale={0.027}>
                    <primitive object={carModel} />
                </mesh> */}
            </RigidBody>
        </RigidBody>
    );
};

export default Vehicle;
