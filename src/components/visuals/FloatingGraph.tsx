import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { TrendingUp, Users, Zap, Search, ShieldCheck } from "lucide-react"

export function FloatingGraph() {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 25 })
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 25 })

    // Parallax movement for the whole group
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - rect.left) / rect.width - 0.5)
        y.set((e.clientY - rect.top) / rect.height - 0.5)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    // SVG Graph Path (Growth Curve) - Slightly more spread out
    const graphPath = "M 0 160 Q 150 140, 250 80 T 500 120 T 750 40 T 1000 20"

    return (
        <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "2000px" }}
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-full h-full"
            >
                {/* SVG Line Graph - Spanning wide */}
                <svg viewBox="0 0 1000 300" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] opacity-20 dark:opacity-30 mix-blend-screen pointer-events-none">
                    <motion.path
                        d={graphPath}
                        className="stroke-primary"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                    />
                    {[250, 750, 1000].map((cx, i) => (
                        <motion.circle
                            key={i}
                            cx={cx}
                            cy={i === 0 ? 80 : (i === 1 ? 40 : 20)}
                            r="6"
                            className="fill-primary"
                            initial={{ scale: 0 }}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i }}
                        />
                    ))}
                </svg>

                {/* Scattered Decentralized Elements */}

                {/* 1. Growth Card (Top Left-ish) */}
                <motion.div
                    animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    style={{ translateZ: "120px" }}
                    className="absolute top-[20%] left-[10%] p-4 glass border border-white/10 rounded-2xl shadow-2xl flex items-center gap-4 border-l-4 border-l-primary hidden lg:flex pointer-events-auto"
                >
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Global Output</div>
                        <div className="text-xl font-bold dark:text-white tabular-nums">+84.2%</div>
                    </div>
                </motion.div>

                {/* 2. Efficiency Node (Bottom Right) */}
                <motion.div
                    animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    style={{ translateZ: "180px" }}
                    className="absolute bottom-[15%] right-[15%] p-5 glass border border-white/10 rounded-2xl shadow-2xl flex items-center gap-4 hidden lg:flex pointer-events-auto"
                >
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Users className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Active nodes</div>
                        <div className="text-2xl font-bold dark:text-white tabular-nums">1.2M</div>
                    </div>
                </motion.div>

                {/* 3. AI Security Badge (Middle Upper Right) */}
                <motion.div
                    animate={{ y: [0, 25, 0], rotate: [0, 2, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    style={{ translateZ: "60px" }}
                    className="absolute top-[35%] right-[25%] p-3 glass border border-white/5 bg-emerald-500/5 rounded-xl shadow-lg border-l-2 border-l-emerald-500/30 hidden xl:flex pointer-events-auto items-center gap-3"
                >
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-bold tracking-widest text-emerald-500/80 uppercase">Shield Protocol Active</span>
                </motion.div>

                {/* 4. Scanning Node (Far Bottom Left) */}
                <motion.div
                    animate={{ x: [0, 20, 0], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{ translateZ: "40px" }}
                    className="absolute bottom-[20%] left-[25%] flex items-center gap-3 opacity-50 hidden lg:flex"
                >
                    <Search className="w-4 h-4 text-primary" />
                    <div className="h-1 w-24 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="h-full w-1/2 bg-primary/50"
                        />
                    </div>
                </motion.div>

                {/* 5. Central Hub Spark (Behind Text Area but drifting) */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full -z-10"
                />
            </motion.div>
        </div>
    )
}
