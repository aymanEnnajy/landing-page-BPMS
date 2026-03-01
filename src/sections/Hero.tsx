import { Container } from "../components/ui/Layout"
import { Button } from "../components/ui/Button"
import { Reveal } from "../components/animations/Reveal"
import { CinematicVisual } from "../components/visuals/CinematicVisual"
import { FloatingGraph } from "../components/visuals/FloatingGraph"
import { ArrowRight, PlayCircle } from "lucide-react"
import { Link } from "react-router-dom"

export function Hero() {
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
                            <span className="text-[10px] font-bold text-primary/80 uppercase tracking-[0.2em] text-center">Enterprise AI Automation</span>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2} y={30}>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-foreground leading-[0.9] mb-8 uppercase">
                            Automate <br />
                            <span className="italic font-extralight text-muted/40 font-serif lowercase">Logic.</span> <br />
                            <span className="text-primary italic">Scale Growth.</span>
                        </h1>
                    </Reveal>

                    <Reveal delay={0.3} y={30}>
                        <p className="text-lg md:text-xl text-muted/80 max-w-xl mb-12 leading-relaxed font-light">
                            Orchestrate complex workflows with high-precision AI.
                            Minimizing delays, eliminating bottlenecks and
                            scaling business logic with
                            <span className="text-foreground font-medium"> zero compromises.</span>
                        </p>
                    </Reveal>

                    <Reveal delay={0.4} y={40}>
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <Button size="lg" className="h-14 px-10 text-base w-full sm:w-auto group relative overflow-hidden shadow-2xl shadow-primary/20" asChild>
                                <Link to="/signup">
                                    <span className="relative z-10 flex items-center font-bold">
                                        Get Started
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity translate-y-full group-hover:translate-y-0 duration-300" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-10 text-base w-full sm:w-auto glass hover:bg-secondary/20 border-accent/20 group">
                                <PlayCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                                Watch Demo
                            </Button>
                        </div>
                    </Reveal>
                </div>
            </Container>

            {/* Subtle Gradient Fade to next section */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-30" />
        </section>
    )
}
