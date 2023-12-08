import { Controls } from "@/enums/controls";
import { rotate } from "@/helpers/threeJs";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
    CylinderCollider,
    RapierRigidBody,
    RigidBody,
} from "@react-three/rapier";
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
    const refArm = useRef<RapierRigidBody>(null);

    // const joint = useRevoluteJoint(refArm, refWheel, [
    //     [0, 0, 0],
    //     [0, 0, 0],
    //     [0, 1, 0],
    // ]);

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
        if (wheelType === "back") {
            if (get()[Controls.forward]) {
                refWheel.current.applyImpulse({ x: 0, y: 0, z: 10 }, true);
                refWheel.current.addForce({ x: 0, y: 0, z: 10 }, true);
            }
            if (get()[Controls.back]) {
                refWheel.current.applyImpulse({ x: 0, y: 0, z: -10 }, true);
                refWheel.current.addForce({ x: 0, y: 0, z: -10 }, true);
            }
        }
    });

    return (
        <group>
            {/* <RigidBody
                ref={refArm}
                position={[positionX * 4, radius * 20, positionZ * 4]}
            >
                <CylinderCollider
                    args={[radius / 10, radius / 10]}
                    rotation={[0, 0, rotate(-90)]}
                >
                    <Cylinder
                        args={[radius / 10, radius / 10, 1, 5, 1, false]}
                        // rotation={[0, 0, rotate(-90)]}
                    />
                </CylinderCollider>
            </RigidBody> */}
            <RigidBody
                ref={refWheel}
                colliders={false}
                // enabledRotations={[true, false, false]}
                position={[positionX, radius, positionZ]}
                {...rest}
            >
                <CylinderCollider
                    args={[radius, radius]}
                    rotation={[0, 0, rotate(-90)]}
                >
                    <mesh castShadow>
                        <cylinderGeometry
                            args={[radius, radius, radius * 1.5, 32, 1, false]}
                        />
                        <meshStandardMaterial
                            color={wheelType === "back" ? "gray" : "white"}
                        />
                    </mesh>
                </CylinderCollider>
            </RigidBody>
        </group>
    );
};

export default Wheel;
