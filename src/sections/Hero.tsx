import { useRef } from "react"
import { Container } from "../components/ui/Layout"
import { Button } from "../components/ui/Button"
import { Reveal } from "../components/animations/Reveal"
import { HeroVisualCSS } from "../components/visuals/HeroVisualCSS"
import { ArrowRight, PlayCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"

export function Hero() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    })

    // Layout transformations
    const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
    const contentY = useTransform(scrollYProgress, [0, 0.2], [0, -50])

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[200vh] bg-background selection:bg-primary selection:text-primary-foreground"
        >
            {/* Sticky Visual Backdrop */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none z-0">
                <div className="relative w-full max-w-7xl px-6 lg:px-12 grid lg:grid-cols-2 items-center gap-12">
                    <div className="hidden lg:block h-full" /> {/* Layout Placeholder */}
                    <div className="relative w-full aspect-square flex items-center justify-center">
                        <HeroVisualCSS />
                    </div>
                </div>
            </div>

            {/* Main Content Overlay */}
            <div className="absolute top-0 inset-x-0">
                <Container className="relative z-10 min-h-screen flex items-center pointer-events-none">
                    <motion.div
                        style={{ opacity: contentOpacity, y: contentY }}
                        className="grid lg:grid-cols-2 gap-12 items-center w-full py-20 pointer-events-none"
                    >
                        <div className="max-w-2xl pointer-events-auto">
                            <Reveal delay={0.1}>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-8 border border-white/10">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-xs font-semibold text-primary/80 uppercase tracking-widest">Enterprise AI Automation</span>
                                </div>
                            </Reveal>

                            <Reveal delay={0.2} y={30}>
                                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground leading-[0.85] mb-8">
                                    RELENTLESS <br />
                                    <span className="text-muted/50 font-light italic">EFFICIENCY.</span>
                                </h1>
                            </Reveal>

                            <Reveal delay={0.3} y={30}>
                                <p className="text-xl md:text-2xl text-muted/80 max-w-xl mb-12 leading-relaxed font-light">
                                    Orchestrate complex workflows with high-precision AI.
                                    Minimize friction, maximize output, and scale your business logic with
                                    <span className="text-foreground font-medium"> zero compromises.</span>
                                </p>
                            </Reveal>

                            <Reveal delay={0.4} y={30}>
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto group relative overflow-hidden shadow-2xl shadow-primary/20" asChild>
                                        <Link to="/signup">
                                            <span className="relative z-10 flex items-center">
                                                Get Started
                                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto glass hover:bg-white/5 border-white/10">
                                        <PlayCircle className="mr-2 w-5 h-5" />
                                        Watch Demo
                                    </Button>
                                </div>
                            </Reveal>
                        </div>
                    </motion.div>
                </Container>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity: contentOpacity }}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 animate-bounce z-20 pointer-events-none"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll to explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-foreground to-transparent" />
            </motion.div>

            {/* Impact Message at depth */}
            <div className="h-screen flex items-center justify-center">
                <Reveal delay={0.5} y={50}>
                    <div className="text-center">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter opacity-20">THE FUTURE IS AI.</h2>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
