import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Rocket, Bot, Database, Cpu, Layout, Activity } from "lucide-react"

export function IsometricScene() {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 25 })
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 25 })

    // Parallax movement for the whole scene
    const sceneX = useTransform(mouseXSpring, [-0.5, 0.5], ["-10px", "10px"])
    const sceneY = useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - rect.left) / rect.width - 0.5)
        y.set((e.clientY - rect.top) / rect.height - 0.5)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    // Helper for isometric transform: rotateX(60deg) rotateZ(-45deg)
    const isoStyles = {
        transformStyle: "preserve-3d" as const,
        transform: "rotateX(60deg) rotateZ(-45deg)",
    }

    return (
        <div
            className="relative w-full aspect-square max-w-2xl mx-auto flex items-center justify-center pointer-events-auto"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1500px" }}
        >
            <motion.div
                style={{ x: sceneX, y: sceneY, ...isoStyles }}
                className="relative w-[300px] h-[300px]"
            >
                {/* Main Ground Platform */}
                <div className="absolute inset-0 bg-primary/20 rounded-md border-b-8 border-primary/40 shadow-[20px_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[20px_20px_50px_rgba(0,0,0,0.6)]" />

                {/* Layer 1: Data Center (Back Left) */}
                <motion.div
                    initial={{ translateZ: 0 }}
                    animate={{ translateZ: 20 }}
                    className="absolute top-4 left-4 w-24 h-24 glass rounded-lg flex flex-col items-center justify-center border border-white/10 dark:border-white/5"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <Database className="w-8 h-8 text-primary mb-2" />
                    <div className="flex gap-1">
                        {[1, 2, 3].map(j => (
                            <motion.div
                                key={j}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: j * 0.2 }}
                                className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Layer 2: Main Interface (Center Right) */}
                <motion.div
                    animate={{ translateZ: [40, 50, 40] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 right-0 -translate-y-1/2 w-48 h-32 glass-morphism rounded-xl border border-white/20 p-4 shadow-2xl overflow-hidden"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div className="flex justify-between mb-3">
                        <Layout className="w-4 h-4 text-blue-400" />
                        <div className="w-12 h-1.5 bg-white/10 rounded-full" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-2 w-full bg-white/5 rounded-full" />
                        <div className="h-2 w-3/4 bg-white/5 rounded-full" />
                        <div className="flex items-center gap-2 pt-2">
                            <Activity className="w-3 h-3 text-primary" />
                            <div className="h-1.5 flex-1 bg-primary/20 rounded-full overflow-hidden">
                                <motion.div
                                    animate={{ width: ["0%", "80%", "0%"] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="h-full bg-primary"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Layer 3: Rocket (Front Center) */}
                <motion.div
                    animate={{ translateZ: [80, 100, 80], y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div className="w-16 h-16 bg-gradient-to-tr from-primary to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                        <Rocket className="w-8 h-8 text-white -rotate-45" />
                    </div>
                    {/* Propulsion Glow */}
                    <div className="w-8 h-12 bg-primary/40 blur-xl rounded-full mt-2 animate-pulse" />
                </motion.div>

                {/* Layer 4: Floating Drone (Top Above) */}
                <motion.div
                    animate={{
                        translateZ: 140,
                        x: [0, 40, 0, -40, 0],
                        y: [0, -40, 40, 0, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 right-0"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div className="p-3 bg-white/5 dark:bg-black/20 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-emerald-400" />
                    </div>
                </motion.div>

                {/* Supporting Pillars (Isometric look) */}
                <div className="absolute top-1/2 left-4 w-4 h-12 bg-primary/10 border-r border-primary/20 rotate-x-90" style={{ transform: "rotateX(-90deg) translateZ(6px)" }} />
                <div className="absolute top-1/2 right-12 w-4 h-16 bg-blue-500/10 border-r border-blue-500/20 rotate-x-90" style={{ transform: "rotateX(-90deg) translateZ(8px)" }} />

                {/* Tiny Floating Nodes */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            translateZ: [60 + i * 10, 80 + i * 10, 60 + i * 10],
                            opacity: [0.2, 0.6, 0.2]
                        }}
                        transition={{ duration: 2 + i, repeat: Infinity, delay: i * 0.5 }}
                        className="absolute w-2 h-2 bg-primary/40 rounded-full"
                        style={{
                            top: `${20 + i * 15}%`,
                            left: `${10 + i * 10}%`,
                        }}
                    />
                ))}
            </motion.div>

            {/* Ambient Background Glow System */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
                <div className="absolute top-1/4 right-0 w-[40%] aspect-square bg-blue-500/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-1/4 left-0 w-[40%] aspect-square bg-primary/10 blur-[100px] rounded-full" />
            </div>
        </div>
    )
}
