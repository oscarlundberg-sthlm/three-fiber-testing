import { Controls } from "@/enums/controls";
import { rotate } from "@/helpers/threeJs";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";

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
            if (get()[Controls.left]) {
                refWheel.current.applyImpulse({ x: 0, y: 0, z: 3 }, true);
                refWheel.current.addForce({ x: 0, y: 0, z: 10 }, true);
            }
            if (get()[Controls.right]) {
                refWheel.current.applyImpulse({ x: 0, y: 0, z: -3 }, true);
                refWheel.current.addForce({ x: 0, y: 0, z: -10 }, true);
            }
        }
        if (wheelType === "back") {
            if (get()[Controls.forward]) {
                refWheel.current.applyImpulse({ x: 0, y: 0, z: 3 }, true);
                refWheel.current.addForce({ x: 0, y: 0, z: 10 }, true);
            }
            if (get()[Controls.back]) {
                refWheel.current.applyImpulse({ x: 0, y: 0, z: -3 }, true);
                refWheel.current.addForce({ x: 0, y: 0, z: -10 }, true);
            }
        }

        if (get()[Controls.jump]) {
        }
    });

    return (
        <RigidBody
            ref={refWheel}
            position={[positionX, radius, positionZ]}
            {...rest}
        >
            <mesh castShadow rotation={[0, 0, rotate(-90)]}>
                <cylinderGeometry
                    args={[radius, radius, radius * 1.5, 32, 1, false]}
                />
                <meshStandardMaterial color="white" />
            </mesh>
        </RigidBody>
    );
};

export default Wheel;
