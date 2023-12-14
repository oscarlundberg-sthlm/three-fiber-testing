import { usePlane } from "@react-three/cannon";
import { useTexture } from "@react-three/drei";
import { RepeatWrapping, Vector2 } from "three";

const Plane = (props) => {
    const [ref] = usePlane(() => ({ type: 'Static', material: 'ground', friction: 1e-3, rotation: [-Math.PI / 2, 0, 0], ...props }))
    const texture = useTexture("/maps/sketchpattern.png");
    texture.repeat = new Vector2(100, 100);
    texture.flipY = false;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;

    return (
        <group ref={ref}>
            <mesh receiveShadow {...props}>
                <planeGeometry args={[2000, 2000]} />
                <meshPhongMaterial map={texture} shininess={1} />
            </mesh>
        </group>
    );
};

export default Plane;
