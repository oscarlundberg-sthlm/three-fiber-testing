import { Controls } from "@/enums/controls";
import { Sphere, useKeyboardControls } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Euler, Quaternion } from "three";
import { FBXLoader } from "three/examples/jsm/Addons.js";

const VehicleSimple = (props) => {
    const [sub, get] = useKeyboardControls<Controls>();

    const refCar = useRef<RapierRigidBody>(null);

    const carModel = useLoader(
        FBXLoader,
        "/threeDModels/lowPolyVehicles/Muscle 2/Muscle 2.fbx"
    );

    useFrame(() => {
        if (!refCar?.current) return;

        if (!get()[Controls.left] && !get()[Controls.right]) {
            refCar.current.setRotation(
                new Quaternion().setFromEuler(new Euler(0, 0, 0)),
                true
            );
        }
        if (get()[Controls.left]) {
            refCar.current.applyImpulse({ x: 10, y: 0, z: 0 }, true);
            refCar.current.addForce({ x: 10, y: 0, z: 0 }, true);
        }
        if (get()[Controls.right]) {
            refCar.current.applyImpulse({ x: -10, y: 0, z: 0 }, true);
            refCar.current.addForce({ x: -10, y: 0, z: 0 }, true);
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
        <group {...props}>
            <RigidBody
                type="dynamic"
                colliders="ball"
                ref={refCar}
                linearDamping={20}
            >
                <Sphere args={[1, 32, 32]} receiveShadow />
            </RigidBody>
        </group>
    );
};

export default VehicleSimple;
