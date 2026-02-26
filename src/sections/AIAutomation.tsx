import React from "react"
import { Container, Section } from "../components/ui/Layout"
import { Reveal } from "../components/animations/Reveal"
import { Button } from "../components/ui/Button"
import { Sparkles, Bot, ArrowRight, CheckCircle2 } from "lucide-react"
import { AIAgent } from "../components/3d/AIAgent"

export function AIAutomation() {
    return (
        <Section id="automation" className="relative bg-background">
            <Container>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 relative">
                        <Reveal delay={0.2} y={40} width="100%">
                            <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
                                <AIAgent />

                                {/* Background Glow */}
                                <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
                            </div>
                        </Reveal>
                    </div>

                    <div className="order-1 lg:order-2">
                        <Reveal>
                            <div className="inline-flex items-center gap-2 text-foreground font-bold text-sm mb-6 px-4 py-1.5 rounded-full glass">
                                <Sparkles className="w-4 h-4 text-primary" />
                                AI-First Architecture
                            </div>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-8">
                                Autonomous <br />
                                <span className="text-muted">Decision Support.</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <p className="text-lg text-muted mb-10 leading-relaxed">
                                Our AI engine doesn't just assist; it automates. From intelligent vacation request approvals to automatic document validation, BPMS learns your business logic and applies it with surgical precision.
                            </p>
                        </Reveal>

                        <div className="space-y-4 mb-10">
                            {[
                                "Template-based Document Generation",
                                "AI-Assisted Validation Engine",
                                "Automated Status Transitions",
                                "Intelligent Decision Support"
                            ].map((text, i) => (
                                <Reveal key={i} delay={0.4 + (i * 0.1)} x={-20}>
                                    <div className="flex items-center gap-3 text-foreground/80">
                                        <CheckCircle2 className="w-5 h-5 text-primary" />
                                        <span className="font-medium text-foreground">{text}</span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal delay={0.8}>
                            <Button size="lg" className="group">
                                Explore AI Features
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </Section>
    )
}
