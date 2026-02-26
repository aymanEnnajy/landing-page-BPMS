import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { BarChart3, Users, Briefcase, Sparkles, CheckCircle2, TrendingUp, Zap } from "lucide-react"

export function HeroDashboardVisual() {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 30 })
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 30 })

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        x.set((mouseX / rect.width) - 0.5)
        y.set((mouseY / rect.height) - 0.5)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <div
            className="relative w-full aspect-video max-w-4xl mx-auto flex items-center justify-center p-8 lg:p-12 mb-10"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "2000px" }}
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-full h-full glass rounded-[2.5rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden p-8 lg:p-10 flex gap-8"
            >
                {/* Background Animated Gradient Pulse */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none" />

                {/* Dashboard Sidebar - Deep Layer */}
                <motion.div
                    style={{ translateZ: "30px" }}
                    className="w-20 h-full flex flex-col gap-8 items-center border-r border-white/5 pr-6 py-4 shrink-0"
                >
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20"
                    >
                        <Sparkles className="w-6 h-6 text-white" />
                    </motion.div>
                    {[BarChart3, Users, Briefcase, Zap, CheckCircle2].map((Icon, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ x: 5, color: "#fff" }}
                            className="p-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer text-muted-foreground/40"
                        >
                            <Icon className="w-6 h-6" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Dashboard Main Area */}
                <div className="flex-1 flex flex-col gap-10 py-4 overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
                    <motion.div
                        style={{ translateZ: "40px" }}
                        className="flex justify-between items-center"
                    >
                        <div className="space-y-2">
                            <div className="h-6 w-48 bg-white/10 rounded-full" />
                            <div className="h-3 w-32 bg-white/5 rounded-full" />
                        </div>
                        <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-full bg-white/10 border border-white/5" />
                            <div className="h-10 w-32 rounded-xl bg-white/5 border border-white/5" />
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-6" style={{ transformStyle: "preserve-3d" }}>
                        {[
                            { color: "primary", val: "84%" },
                            { color: "blue-500", val: "+12.4%" }
                        ].map((stat, i) => (stat &&
                            <motion.div
                                key={i}
                                style={{ translateZ: `${50 + i * 10}px` }}
                                className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4 hover:bg-white/10 transition-colors"
                            >
                                <div className="flex justify-between">
                                    <div className="h-4 w-20 bg-white/10 rounded-full" />
                                    <span className="text-xs font-bold text-primary">{stat.val}</span>
                                </div>
                                <div className="h-8 w-32 bg-white/10 rounded-full" />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        style={{ translateZ: "60px" }}
                        className="flex-1 rounded-[2rem] bg-white/5 border border-white/5 p-8 flex flex-col gap-6 overflow-hidden relative shadow-inner"
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <TrendingUp className="w-5 h-5 text-emerald-500" />
                                <div className="h-5 w-48 bg-white/10 rounded-full" />
                            </div>
                            <div className="h-6 w-16 bg-white/5 rounded-full" />
                        </div>

                        {/* Simulated Enhanced Graph - Waves */}
                        <div className="flex-1 flex items-end gap-3 px-2 pb-2">
                            {[40, 65, 45, 95, 70, 85, 60, 90, 55, 100, 75, 45].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: `${h}%`,
                                        opacity: 1,
                                    }}
                                    transition={{
                                        height: { duration: 1.5, delay: i * 0.08, ease: "circOut" },
                                        opacity: { duration: 0.5, delay: i * 0.08 }
                                    }}
                                    className="flex-1 relative group"
                                >
                                    <div className="absolute inset-0 bg-primary/20 blur-sm rounded-t-lg group-hover:bg-primary/40 transition-colors" />
                                    <div className="relative h-full w-full bg-gradient-to-t from-primary/30 via-primary/60 to-primary rounded-t-lg" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Highly Oscillating Floating Cards - Deep Space */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotateZ: [-2, 2, -2]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ translateZ: "120px" }}
                    className="absolute top-1/4 -right-16 p-6 glass border border-white/20 rounded-3xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] w-64 hidden xl:block z-50"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <div className="text-[10px] font-bold tracking-[0.2em] text-emerald-500 uppercase">System Status</div>
                            <div className="text-sm font-bold text-white tracking-tight">AI PROCESSED</div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "94%" }}
                                transition={{ duration: 3, delay: 1 }}
                                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                            />
                        </div>
                        <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
                            <span>Accuracy</span>
                            <span>99.9%</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, 15, 0],
                        rotateZ: [1, 3, 1]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    style={{ translateZ: "150px" }}
                    className="absolute -bottom-8 -left-12 p-6 glass border border-white/20 rounded-3xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] flex items-center gap-5 hidden xl:flex z-50"
                >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-primary flex items-center justify-center p-3 shadow-lg">
                        <Users className="text-white w-full h-full" />
                    </div>
                    <div>
                        <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em]">Efficiency Score</div>
                        <div className="text-2xl font-bold text-white tabular-nums">+42%</div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Complex Ambient Glow System */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute top-1/4 right-0 w-[40%] aspect-square bg-blue-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 left-0 w-[40%] aspect-square bg-primary/10 blur-[120px] rounded-full" />
            </div>
        </div>
    )
}
