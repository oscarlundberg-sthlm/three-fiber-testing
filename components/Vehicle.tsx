import Wheel from "@/components/Wheel";
import { Controls } from "@/enums/controls";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import {
    RapierRigidBody,
    RigidBody,
    useRevoluteJoint,
} from "@react-three/rapier";
import { useRef } from "react";
import { FBXLoader } from "three/examples/jsm/Addons.js";

const Vehicle = (props) => {
    const [sub, get] = useKeyboardControls<Controls>();

    const refCar = useRef<RapierRigidBody>(null);
    const refCarBody = useRef<RapierRigidBody>(null);
    const refWheel1 = useRef<RapierRigidBody>(null);
    const refWheel2 = useRef<RapierRigidBody>(null);
    const refWheel3 = useRef<RapierRigidBody>(null);
    const refWheel4 = useRef<RapierRigidBody>(null);

    const carModel = useLoader(
        FBXLoader,
        "/threeDModels/lowPolyVehicles/Muscle 2/Muscle 2.fbx"
    );

    const wheel1Joint = useRevoluteJoint(refCarBody, refWheel1, [
        [-1.2, 1, 1],
        [0, 0.5, 0],
        [1, 0, 0],
    ]);
    const wheel2Joint = useRevoluteJoint(refCarBody, refWheel2, [
        [1.2, 1, 1],
        [0, 0.5, 0],
        [1, 0, 0],
    ]);

    useFrame(() => {
        if (!refCar?.current) return;
        wheel1Joint.current?.configureMotor(0, 1000, 1000, 1);
        wheel2Joint.current?.configureMotor(0, 1000, 1000, 1);
    });

    return (
        <group {...props}>
            <RigidBody colliders={false} type="dynamic" ref={refCar}>
                <Wheel
                    ref={refWheel1}
                    wheelType="back"
                    positionX={2.5}
                    positionZ={-4.4}
                />
                <Wheel
                    ref={refWheel2}
                    wheelType="back"
                    positionX={-2.5}
                    positionZ={-4.4}
                />
                <Wheel
                    ref={refWheel3}
                    wheelType="front"
                    positionX={2.5}
                    positionZ={4.4}
                />
                <Wheel
                    ref={refWheel4}
                    wheelType="front"
                    positionX={-2.5}
                    positionZ={4.4}
                />
                <RigidBody colliders="hull" ref={refCarBody}>
                    <mesh position={[0, 1, 0]}>
                        <boxGeometry args={[2.4, 1, 12]} />
                        <meshStandardMaterial color="white" />
                    </mesh>
                    {/* <mesh castShadow position={[0, 3, 0]} scale={0.027}>
                        <primitive object={carModel} />
                    </mesh> */}
                </RigidBody>
            </RigidBody>
        </group>
    );
};

export default Vehicle;
