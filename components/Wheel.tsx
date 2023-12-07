import { Controls } from "@/enums/controls";
import { rotate } from "@/helpers/threeJs";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Euler, Quaternion } from "three";
import { degToRad } from "three/src/math/MathUtils.js";

interface WheelProps {
    positionX?: number;
    positionZ?: number;
    wheelType?: "front" | "back";
}

const Wheel = ({
    positionX = 0,
    positionZ = 0,
    wheelType,
    ...rest
}: WheelProps) => {
    const radius = 1;
    const [sub, get] = useKeyboardControls<Controls>();
    const refWheel = useRef<RapierRigidBody>(null);

    useFrame(() => {
        if (!refWheel?.current) return;

        if (wheelType === "front") {
            if (!get()[Controls.left] && !get()[Controls.right]) {
                refWheel.current.setRotation(
                    new Quaternion().setFromEuler(new Euler(0, 0, 0)),
                    true
                );
            }
            if (get()[Controls.left]) {
                refWheel.current.setRotation(
                    new Quaternion().setFromEuler(
                        new Euler(0, degToRad(25), 0)
                    ),
                    true
                );
            }
            if (get()[Controls.right]) {
                refWheel.current.setRotation(
                    new Quaternion().setFromEuler(
                        new Euler(0, degToRad(-25), 0)
                    ),
                    true
                );
            }
        }
    });

    return (
        <RigidBody
            ref={refWheel}
            colliders={false}
            enabledRotations={[true, false, false]}
            position={[positionX, radius, positionZ]}
            {...rest}
        >
            <mesh castShadow rotation={[0, 0, rotate(-90)]}>
                <cylinderGeometry
                    args={[radius, radius, radius * 1.5, 32, 1, false]}
                />
                <meshStandardMaterial
                    color={wheelType === "back" ? "gray" : "white"}
                />
            </mesh>
        </RigidBody>
    );
};

export default Wheel;
