import { rotate } from "@/helpers/threeJs";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { FBXLoader } from "three/examples/jsm/Addons.js";

const Vehicle = ({ ...args }) => {
    const mesh = useRef(null);
    const fbx = useLoader(
        FBXLoader,
        "/threeDModels/lowPolyVehicles/Muscle 2/Muscle 2.fbx"
    );
    return (
        <mesh ref={mesh} rotation={[0, rotate(180), 0]} {...args}>
            <primitive object={fbx} />
        </mesh>
    );
};

export default Vehicle;
