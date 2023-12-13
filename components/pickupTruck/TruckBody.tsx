/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { rotate } from "@/helpers/threeJs";
import { useBox } from "@react-three/cannon";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { forwardRef } from "react";

useGLTF.preload("threeDModels/pickup/carbody.glb");

interface TruckBodyProps {
  args: any;
  mass?: number;
  setVisible?: any;
}

const TruckBody = forwardRef(
  (
    { args = [1.7, 0.4, 4], mass = 500, setVisible, ...props }: TruckBodyProps,
    ref
  ) => {
    const { nodes, materials } = useGLTF("threeDModels/pickup/carbody.glb");

    const [, api] = useBox(
      () => ({
        mass,
        args,
        allowSleep: false,
        ...props,
      }),
      ref
    );

    return (
      <mesh
        ref={ref}
        api={api}
        userData={{ id: "truckbody" }}
        {...props}
      >
            <mesh>
                <mesh position={[0,1,10]}>
                    <pointLight
                        intensity={40}
                        decay={0.2}
                        color="#f8fff1"
                        position={[0, 0.022, 0.239]}
                    />
                </mesh>
                <mesh position={[0,0,-7]}>
                    <pointLight
                        intensity={300}
                        decay={1}
                        color="#ff2025"
                        position={[0, 0.026, 0.043]}
                        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
                    />
                </mesh>
                <mesh>
                    <group dispose={null}>
                        <mesh rotation={[0,rotate(-180), 0]}>
                            <PerspectiveCamera
                                makeDefault
                                near={0.1}
                                far={50000}
                                position={[0, 20, 20]}
                                rotation={[rotate(-30), 0, 0]}
                            />
                        </mesh>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cylinder011.geometry}
                            material={materials["body color"]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cylinder011_1.geometry}
                            material={materials.windows}
                        />
                    </group>
                </mesh>
            </mesh>
      </mesh>
    );
  }
);

export default TruckBody;
