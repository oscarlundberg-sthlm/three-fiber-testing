import { Controls } from "@/enums/controls";
import { rotate } from "@/helpers/threeJs";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { forwardRef } from "react";
import { Euler, Quaternion, TextureLoader } from "three";
import { degToRad } from "three/src/math/MathUtils.js";

interface WheelProps {
    positionX?: number;
    positionZ?: number;
    wheelType?: "front" | "back";
}

const Wheel = forwardRef(function Wheel(
    { positionX = 0, positionZ = 0, wheelType, ...rest }: WheelProps,
    ref: any
) {
    const radius = 1;
    const [sub, get] = useKeyboardControls<Controls>();
    const wheelMap = useLoader(TextureLoader, "/maps/wheeltread.jpg");

    useFrame(() => {
        if (!ref?.current) return;

        if (wheelType === "front") {
            if (!get()[Controls.left] && !get()[Controls.right]) {
                ref.current.setRotation(
                    new Quaternion().setFromEuler(new Euler(0, 0, 0)),
                    true
                );
            }
            if (get()[Controls.left]) {
                ref.current.setRotation(
                    new Quaternion().setFromEuler(
                        new Euler(0, degToRad(25), 0)
                    ),
                    true
                );
            }
            if (get()[Controls.right]) {
                ref.current.setRotation(
                    new Quaternion().setFromEuler(
                        new Euler(0, degToRad(-25), 0)
                    ),
                    true
                );
            }
        }
        if (wheelType === "back") {
            if (get()[Controls.forward]) {
                ref.current.applyImpulse({ x: 0, y: 0, z: 10 }, true);
                ref.current.addForce({ x: 0, y: 0, z: 10 }, true);
            }
            if (get()[Controls.back]) {
                ref.current.applyImpulse({ x: 0, y: 0, z: -10 }, true);
                ref.current.addForce({ x: 0, y: 0, z: -10 }, true);
            }
        }
    });

    return (
        <RigidBody
            ref={ref}
            colliders={false}
            position={[positionX, radius, positionZ]}
            enabledRotations={[false, true, false]}
            linearDamping={0.9}
            {...rest}
        >
            <mesh castShadow rotation={[0, 0, rotate(-90)]}>
                <cylinderGeometry
                    args={[radius, radius, radius * 1.5, 32, 1, false]}
                />
                <meshStandardMaterial
                    color={wheelType === "back" ? "gray" : "white"}
                    map={wheelMap}
                />
            </mesh>
            <CylinderCollider
                args={[radius, radius]}
                rotation={[0, 0, rotate(-90)]}
            />
        </RigidBody>
    );
});

export default Wheel;
