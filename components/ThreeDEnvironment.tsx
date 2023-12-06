'use client'
import Vehicle from "@/components/Vehicle"
import { rotate } from "@/helpers/threeJs"
import { Canvas } from "@react-three/fiber"

const ThreeDEnvironment = () => {
  return (
    <Canvas camera={{
        fov: 75,
        near: 0.1,
        far: 50000,
        position: [0, 1000, 1000],
        rotation: [rotate(-30), 0, 0]
    }}>
        <ambientLight intensity={0.2} />
        <directionalLight color="red" position={[20,10,20]} intensity={10} />

        <mesh position={[0,0,-180]} rotation={[rotate(-90),0,0]}>
            <planeGeometry args={[2000,2000]} />
            <meshToonMaterial color="gray" />
        </mesh>

        <Vehicle />
    </Canvas>
  )
}

export default ThreeDEnvironment