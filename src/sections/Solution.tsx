import React from "react"
import { Container, Section } from "../components/ui/Layout"
import { Reveal } from "../components/animations/Reveal"
import { CheckCircle2, Zap, Brain, Globe, Bot, Cpu } from "lucide-react"
import { DashboardPreview } from "../components/sections/DashboardPreview"

export function Solution() {
    const solutions = [
        {
            icon: <Brain className="w-5 h-5" />,
            title: "Centralized Management",
            description: "Every workflow, task, and document managed from a single, high-performance command center."
        },
        {
            icon: <Bot className="w-5 h-5" />,
            title: "AI Document Automation",
            description: "From generation to validation, AI handles the heavy lifting of HR documentation instantly."
        },
        {
            icon: <Zap className="w-5 h-5" />,
            title: "Smart Approval Routing",
            description: "Intelligent engines that move requests to the right person before they even ask."
        }
    ]

    return (
        <Section id="solution" className="pb-0">
            <Container>
                <div className="text-left mb-20">
                    <Reveal width="100%">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-6 text-left">
                            The Intelligent Operating System <br />
                            <span className="text-muted">for Modern Enterprises.</span>
                        </h2>
                    </Reveal>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-40">
                    {solutions.map((item, i) => (
                        <Reveal key={i} delay={0.2 + (i * 0.1)} width="100%">
                            <div className="p-8 rounded-3xl border border-white/5 bg-deep hover:border-white/20 transition-all flex flex-col items-center text-center group">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-4">{item.title}</h3>
                                <p className="text-muted leading-relaxed">{item.description}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Container>

            {/* Premium 3D Dashboard Preview Section */}
            <DashboardPreview />
        </Section>
    )
}
