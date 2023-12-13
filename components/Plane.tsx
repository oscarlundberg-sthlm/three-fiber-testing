import { usePlane } from "@react-three/cannon";

const Plane = (props) => {
    const [ref] = usePlane(() => ({ type: 'Static', material: 'ground', rotation: [-Math.PI / 2, 0, 0], ...props }))

    return (
        <group ref={ref}>
            <mesh receiveShadow {...props}>
                <planeGeometry args={[2000, 2000]} />
                <meshStandardMaterial color="#666666" />
            </mesh>
        </group>
    );
};

export default Plane;
