import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sphere, useScroll } from "@react-three/drei"
import * as THREE from "three"

export function HeroSphere() {
    const meshRef = useRef<THREE.Mesh>(null)
    const groupRef = useRef<THREE.Group>(null)
    const scroll = useScroll()

    useFrame((state) => {
        if (!meshRef.current || !groupRef.current) return

        // Get scroll offset (0 to 1)
        const offset = scroll.offset

        // Initial position on the right, moves to center
        // offset goes from 0 to 1
        const xPos = 2.5 - offset * 2.5 // moves from right to center
        const yPos = 0
        const zPos = offset * 12 // moves towards camera

        // Scale up dramatically as we scroll
        // 1 -> 5 -> 20 (it covers the screen)
        const scale = 1 + offset * 18

        groupRef.current.position.set(xPos, yPos, zPos)
        groupRef.current.scale.setScalar(scale)

        // Subtle rotation
        meshRef.current.rotation.x += 0.002
        meshRef.current.rotation.y += 0.003

        // Mouse interaction (gentle tilt - reduced as scroll increases)
        const { x, y } = state.mouse
        const mouseInfluence = Math.max(0, 1 - offset * 2)
        meshRef.current.rotation.x += y * 0.02 * mouseInfluence
        meshRef.current.rotation.y += x * 0.02 * mouseInfluence

        // Opacity/Dissolve effect as it "hits" the screen
        if (offset > 0.9) {
            // We can animate material transmission or opacity
        }
    })

    return (
        <group ref={groupRef}>
            <Float
                speed={1.5}
                rotationIntensity={0.5}
                floatIntensity={0.5}
            >
                <Sphere ref={meshRef} args={[1, 64, 64]}>
                    <MeshDistortMaterial
                        color="#ffffff"
                        roughness={0.05}
                        metalness={0.9}
                        distort={0.4}
                        speed={2}
                        transmission={0.8}
                        thickness={2}
                        ior={1.4}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                    />
                </Sphere>
            </Float>

            {/* Lights that follow the scale/position might be needed, but static ones work for now */}
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={3} />
            <pointLight position={[-10, -10, -10]} intensity={1.5} color="#4fa9ff" />
        </group>
    )
}
