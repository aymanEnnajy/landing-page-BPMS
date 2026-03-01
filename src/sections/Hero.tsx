import { Container } from "../components/ui/Layout"
import { Button } from "../components/ui/Button"
import { Reveal } from "../components/animations/Reveal"
import { CinematicVisual } from "../components/visuals/CinematicVisual"
import { FloatingGraph } from "../components/visuals/FloatingGraph"
import { ArrowRight, PlayCircle } from "lucide-react"
import { Link } from "react-router-dom"

import { motion } from "framer-motion"
import type { Variants } from "framer-motion"

export function Hero() {
    const headline = "Stop Managing.";
    const secondLine = "Start Scaling.";

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2
            }
        }
    };

    const letterVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="relative h-screen flex flex-col justify-center overflow-hidden bg-background">
            {/* 1. LAYER ONE: Cinematic background (Flares, particles) */}
            <CinematicVisual />

            {/* 2. LAYER TWO: Unconstrained Floating Visuals (The "Decentralized" Graph) */}
            <FloatingGraph />

            {/* 3. LAYER THREE: Main Content UI */}
            <Container className="relative z-20 w-full">
                <div className="max-w-4xl mt-16 md:mt-20">
                    <Reveal delay={0.1}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-8 border border-accent/20 bg-secondary/10 backdrop-blur-xl">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] font-bold text-primary/80 uppercase tracking-[0.2em] text-center">ENTERPRISE-GRADE HR AUTOMATION</span>
                        </div>
                    </Reveal>

                    <motion.h1
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-foreground leading-[0.9] mb-8 uppercase"
                    >
                        {headline.split("").map((char, index) => (
                            <motion.span
                                key={index}
                                variants={letterVariants}
                                className="inline-block"
                                style={{ marginRight: char === " " ? "0.25em" : "0" }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                        <br />
                        <span className="text-primary italic">
                            {secondLine.split("").map((char, index) => (
                                <motion.span
                                    key={index}
                                    variants={letterVariants}
                                    className="inline-block"
                                    style={{ marginRight: char === " " ? "0.25em" : "0" }}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </span>
                    </motion.h1>

                    <Reveal delay={0.3} y={30}>
                        <p className="text-lg md:text-xl text-muted/80 max-w-2xl mb-12 leading-relaxed font-light">
                            Orchestrate your entire HR lifecycle with high-precision AI. From automated payroll to seamless onboarding,
                            Flowly eliminates administrative bottlenecks with zero compromises.
                            Built for elite teams that value time over trials.
                        </p>
                    </Reveal>

                    <Reveal delay={0.4} y={40}>
                        <div className="flex flex-col items-start gap-4">
                            <Button size="lg" className="h-14 px-10 text-base w-full sm:w-auto group relative overflow-hidden shadow-2xl shadow-primary/10" asChild>
                                <a href="#pricing">
                                    <span className="relative z-10 flex items-center font-bold">
                                        Get Started Now
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-[#272727] opacity-0 group-hover:opacity-100 transition-opacity translate-y-full group-hover:translate-y-0 duration-300" />
                                </a>
                            </Button>
                            <p className="text-[10px] uppercase tracking-widest text-muted/60 font-bold ml-1">
                                Instant setup. Enterprise security active.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </Container>

            {/* Subtle Gradient Fade to next section */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-30" />
        </section>
    )
}
