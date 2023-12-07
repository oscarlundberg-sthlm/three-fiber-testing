import { RigidBody } from "@react-three/rapier";

const Plane = (props) => {
    return (
        <RigidBody>
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} {...props}>
                <planeGeometry args={[2000, 2000]} />
                <meshStandardMaterial color="#666666" />
            </mesh>
        </RigidBody>
    );
};

export default Plane;
