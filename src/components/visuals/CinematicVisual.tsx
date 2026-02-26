import { motion, useTransform, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

export function CinematicVisual() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const springX = useSpring(mousePos.x, { stiffness: 50, damping: 20 })
    const springY = useSpring(mousePos.y, { stiffness: 50, damping: 20 })

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-background">
            {/* Perspective Grid Floor */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[60vh] opacity-20"
                style={{
                    perspective: '1000px',
                    transform: 'rotateX(60deg) translateY(100px)',
                    backgroundImage: 'linear-gradient(to right, #444 1px, transparent 1px), linear-gradient(to bottom, #444 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage: 'linear-gradient(to top, black, transparent)',
                }}
            />

            {/* Ambient Lens Flares */}
            <motion.div
                style={{ x: springX, y: springY }}
                className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full"
            />
            <motion.div
                style={{ x: useTransform(springX, (v) => -v), y: useTransform(springY, (v) => -v) }}
                className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-500/10 blur-[100px] rounded-full"
            />

            {/* Particle Stream */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/40 rounded-full"
                        initial={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: 0,
                            scale: Math.random() * 2
                        }}
                        animate={{
                            y: [0, -100 - Math.random() * 200],
                            opacity: [0, 0.8, 0],
                            x: [0, (Math.random() - 0.5) * 100]
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Vertical Flow Lines */}
            <div className="absolute inset-0 opacity-10">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent"
                        style={{ left: `${20 * i + 10}%` }}
                        animate={{
                            scaleY: [0, 1, 0],
                            y: ['-100%', '100%']
                        }}
                        transition={{
                            duration: 5 + i * 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
