import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function HeroVisualCSS() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    // Animation values
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 180])
    const scale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 2.5, 15])
    const blur = useTransform(scrollYProgress, [0, 0.8, 1], [0, 5, 20])
    const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0])

    return (
        <div ref={containerRef} className="relative w-full aspect-square max-w-2xl mx-auto flex items-center justify-center pointer-events-none">
            {/* outer rings */}
            <motion.div
                style={{ rotate, scale, filter: `blur(${blur}px)`, opacity }}
                className="absolute w-full h-full border border-foreground/5 rounded-full"
            />
            <motion.div
                style={{ rotate: useTransform(scrollYProgress, [0, 1], [360, 0]), scale, filter: `blur(${blur}px)`, opacity }}
                className="absolute w-[80%] h-[80%] border border-primary/10 rounded-full"
            />

            {/* Main Power Core */}
            <motion.div
                style={{ scale, opacity }}
                animate={{
                    scale: [1, 1.02, 1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative w-[60%] h-[60%] flex items-center justify-center"
            >
                {/* Glass Sphere Effect */}
                <div className="absolute inset-0 rounded-full glass overflow-hidden border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                    {/* Interior Glows */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-500/20 mix-blend-overlay" />
                    <motion.div
                        animate={{
                            left: ["-100%", "200%"],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute top-0 bottom-0 w-1/4 bg-white/10 skew-x-12 blur-xl"
                    />
                </div>

                {/* Internal Geometry (Artificial 3D look) */}
                <div className="relative w-full h-full p-12">
                    <div className="w-full h-full rounded-full border border-foreground/20 flex items-center justify-center">
                        <div className="w-1/2 h-1/2 rounded-full bg-gradient-to-t from-primary/40 to-white/10 blur-md animate-pulse" />
                    </div>
                </div>
            </motion.div>

            {/* Glowing Particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary/40 rounded-full"
                    style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                        y: [0, -40, 0],
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                    }}
                />
            ))}

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        </div>
    )
}
