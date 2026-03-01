import React, { useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Terminal, GitBranch, Shield, Cpu } from "lucide-react"

export function AIAgent() {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 25, stiffness: 120, mass: 1 }
    const xSpring = useSpring(mouseX, springConfig)
    const ySpring = useSpring(mouseY, springConfig)

    // Base Rotation & Parallax
    const rotateX = useTransform(ySpring, [-0.5, 0.5], ["-15deg", "15deg"])
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-25deg", "25deg"])

    // Light Source Tracking (Specular Highlight)
    const lightX = useTransform(xSpring, [-0.5, 0.5], ["-40%", "40%"])
    const lightY = useTransform(ySpring, [-0.5, 0.5], ["-40%", "40%"])

    // Floating Logic Fragments
    const fragments = [
        { icon: <Terminal size={14} />, label: "exec.log", x: -140, y: -100, z: 120 },
        { icon: <GitBranch size={14} />, label: "main.flow", x: 160, y: -40, z: 80 },
        { icon: <Shield size={14} />, label: "rbac.v1", x: -150, y: 100, z: 150 },
        { icon: <Cpu size={14} />, label: "ai.engine", x: 140, y: 120, z: 100 },
    ]

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window
            const x = (e.clientX / innerWidth) - 0.5
            const y = (e.clientY / innerHeight) - 0.5
            mouseX.set(x)
            mouseY.set(y)
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [mouseX, mouseY])

    return (
        <div className="relative w-full aspect-square flex items-center justify-center perspective-2000 py-20">
            {/* Background Narrative Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-72 h-[28rem] z-10"
            >
                {/* 1. LAYER: THE CORE SHELL (Depth Buffer) */}
                <div className="absolute inset-0 bg-white dark:bg-background border border-primary/10 dark:border-foreground/[0.08] rounded-[80px] shadow-[0_40px_100px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_100px_rgba(255,255,255,0.02)]" />

                {/* 2. LAYER: SPECULAR HIGHLIGHT (Light Reactive) */}
                <motion.div
                    style={{ x: lightX, y: lightY, translateZ: "20px" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none rounded-[80px]"
                />

                {/* 3. LAYER: FACIAL STRUCTURE (TranslateZ 40px) */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-start pt-24" style={{ transform: "translateZ(40px)" }}>

                    {/* Detailed Eyelids & Eyebrows (Softer, Friendly Arches) */}
                    <div className="flex gap-16 mb-4">
                        <motion.div
                            animate={{ rotate: [10, 12, 10] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="w-16 h-1 bg-primary/20 dark:bg-primary/10 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: [-10, -12, -10] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="w-16 h-1 bg-primary/20 dark:bg-primary/10 rounded-full"
                        />
                    </div>

                    {/* Advanced Optic Units (Friendly Arched Eyes) */}
                    <div className="flex gap-14 mb-12">
                        {[0, 1].map((i) => (
                            <motion.div
                                key={i}
                                className="relative w-16 h-16 flex items-center justify-center"
                                style={{ transform: "translateZ(20px)" }}
                            >
                                {/* Eye Socket (Rounded & Friendly) */}
                                <div className="absolute inset-0 bg-white dark:bg-secondary/40 border-2 border-primary/5 rounded-full shadow-inner" />

                                {/* Arched Smiling Lids */}
                                <motion.div
                                    className="absolute inset-0 border-t-8 border-primary dark:border-primary/80 rounded-full z-20"
                                    style={{ clipPath: "inset(0 0 60% 0)" }}
                                />

                                {/* Interactive Pupil (Softer Glow) */}
                                <motion.div
                                    style={{
                                        x: useTransform(xSpring, [-0.5, 0.5], ["-8px", "8px"]),
                                        y: useTransform(ySpring, [-0.5, 0.5], ["-4px", "4px"]),
                                        translateZ: "15px"
                                    }}
                                    className="w-8 h-8 bg-primary dark:bg-foreground rounded-full relative z-10"
                                >
                                    <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 bg-white rounded-full opacity-50 shadow-[0_0_8px_white]" />
                                    <div className="absolute inset-0 rounded-full bg-primary/30 blur-[4px] animate-pulse" />
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bridge of the Nose (Softer Definition) */}
                    <div className="w-[2px] h-10 bg-gradient-to-b from-primary/10 to-transparent mb-6 opacity-40" />

                    {/* Neural Expression Module (Pronounced Smile) */}
                    <div className="relative w-32 h-12 flex items-center justify-center">
                        <motion.div
                            animate={{
                                scaleX: [1, 1.05, 1],
                                opacity: [0.7, 0.9, 0.7],
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-20 h-6 border-b-4 border-primary dark:border-foreground rounded-[50%]"
                            style={{
                                transformStyle: "preserve-3d",
                                transform: "translateZ(20px)",
                            } as any}
                        />
                        {/* Status Pulse Nodes */}
                        <div className="absolute -left-4 w-1.5 h-1.5 rounded-full bg-primary/50 dark:bg-primary/40 shadow-[0_0_8px_var(--primary)]" />
                        <div className="absolute -right-4 w-1.5 h-1.5 rounded-full bg-primary/50 dark:bg-primary/40 shadow-[0_0_8px_var(--primary)]" />
                    </div>

                    {/* Chin/Jawline Definition (Subtle) */}
                    <div className="mt-auto mb-16 opacity-30">
                        <div className="w-20 h-12 border-b-2 border-foreground/20 rounded-[40px]" />
                    </div>
                </div>

                {/* 4. LAYER: LOGIC FRAGMENTS (Orbiting in 3D Space) */}
                {fragments.map((frag, i) => (
                    <motion.div
                        key={i}
                        style={{
                            left: "50%",
                            top: "50%",
                            x: useTransform(xSpring, [-0.5, 0.5], [frag.x - 20, frag.x + 20]),
                            y: useTransform(ySpring, [-0.5, 0.5], [frag.y - 15, frag.y + 15]),
                            translateZ: frag.z + "px",
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    >
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                            className="glass px-3 py-1.5 rounded-xl border border-primary/10 dark:border-white/10 flex items-center gap-2 shadow-xl shadow-black/5 dark:shadow-white/5 bg-white dark:bg-transparent"
                        >
                            <span className="text-primary">{frag.icon}</span>
                            <span className="text-[10px] font-bold tracking-tighter opacity-70 uppercase text-primary dark:text-foreground">{frag.label}</span>
                        </motion.div>
                    </motion.div>
                ))}

                {/* 5. LAYER: HOLOGRAPHIC SHELL (Glass Overlay) */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/[0.02] dark:to-white/[0.02] rounded-[80px] border border-white/5 dark:border-white/10 pointer-events-none" style={{ transform: "translateZ(90px)" }} />
            </motion.div>

            {/* Global Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-foreground/5 rounded-full blur-[140px] -z-10 animate-pulse pointer-events-none" />
        </div>
    )
}
