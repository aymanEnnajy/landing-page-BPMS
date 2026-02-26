import { useRef } from "react"
import { Container } from "../components/ui/Layout"
import { Button } from "../components/ui/Button"
import { Reveal } from "../components/animations/Reveal"
import { HeroSphere } from "../components/visuals/HeroSphere"
import { ArrowRight, PlayCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { Canvas } from "@react-three/fiber"
import { Environment, ContactShadows, ScrollControls, Scroll } from "@react-three/drei"
import { motion } from "framer-motion"

export function Hero() {
    return (
        <section className="relative min-h-screen bg-background overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 45 }}
                    dpr={[1, 2]}
                    gl={{ antialias: true, alpha: true }}
                >
                    <ambientLight intensity={0.5} />
                    <Environment preset="city" />

                    <ScrollControls pages={3} damping={0.2} distance={1}>
                        <Scroll>
                            <HeroSphere />
                        </Scroll>

                        <Scroll html style={{ width: '100%' }}>
                            <div className="w-full">
                                <Container className="relative z-10 min-h-screen flex items-center">
                                    <div className="grid lg:grid-cols-2 gap-12 items-center w-full py-20">
                                        <div className="max-w-2xl">
                                            <Reveal delay={0.1}>
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-8 border border-white/10"
                                                >
                                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                                    <span className="text-xs font-semibold text-primary/80 uppercase tracking-widest">Enterprise AI Automation</span>
                                                </motion.div>
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
                                    </div>
                                </Container>

                                {/* Spacer and subsequent content hint */}
                                <div className="h-[200vh] flex flex-col justify-end items-center pb-20">
                                    <Reveal delay={0.1} y={20}>
                                        <div className="p-8 glass border border-white/5 rounded-3xl max-w-sm text-center">
                                            <p className="text-muted text-sm italic">"The sphere expands to reveal the core of your automation engine."</p>
                                        </div>
                                    </Reveal>
                                </div>
                            </div>
                        </Scroll>
                    </ScrollControls>

                    <ContactShadows
                        position={[0, -2, 0]}
                        opacity={0.4}
                        scale={10}
                        blur={2}
                        far={4.5}
                    />
                </Canvas>
            </div>

            {/* Hint of scroll */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 animate-bounce z-20 pointer-events-none">
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll to explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-foreground to-transparent" />
            </div>
        </section>
    )
}
