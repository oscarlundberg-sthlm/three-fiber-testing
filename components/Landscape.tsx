/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF, useTexture } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

export function Landscape(props: GroupProps) {
  const { nodes, materials }: { nodes: any, materials: any } = useGLTF("/threeDModels/landscape.glb");
  const image = useTexture('/images/sunny.jpg');
  image.flipY = false;

  return (
    <group {...props} dispose={null}>
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
      /> */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002_1.geometry}
        material={materials["Material.006"]}
        position={[20,10,20]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002_2.geometry}
        material={materials["Material.005"]}
        position={[-10,0,-20]}
      />
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002_3.geometry}
        material={materials.photo}
      >
        <meshBasicMaterial map={image} />
      </mesh> */}
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002_4.geometry}
        material={materials["Material.003"]}
      /> */}
    </group>
  );
}

useGLTF.preload("/threeDModels/landscape.glb");