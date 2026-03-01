import React from "react"
import { Container, Section } from "../components/ui/Layout"
import { Card } from "../components/ui/Card"
import { Reveal } from "../components/animations/Reveal"
import { AlertCircle, Clock, FileText, Layers, ShieldAlert } from "lucide-react"

export function Problem() {
    const problems = [
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Manual HR Processes",
            description: "Fragmented human resource tasks consume hours of valuable executive time every day."
        },
        {
            icon: <AlertCircle className="w-6 h-6" />,
            title: "Slow Approval Chains",
            description: "Stagnant approval requests create massive internal bottlenecks and operational delays."
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Paper-based Documents",
            description: "Legacy documentation prone to errors, loss, and impossible tracking in a digital world."
        },
        {
            icon: <Layers className="w-6 h-6" />,
            title: "Lack of Visibility",
            description: "Zero real-time coordination and invisible task status across departments."
        }
    ]

    return (
        <Section id="problem" className="bg-secondary relative">
            <Container>
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <Reveal>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-6">
                                Manual Processes are <br />
                                <span className="text-muted font-medium">the Silent Business Killers.</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                                Traditional enterprise management is slow, error-prone, and disconnected.
                                Flowly eliminates these pain points by injecting AI-powered automation at the core of your operation.
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {problems.map((problem, i) => (
                            <Reveal key={i} delay={0.1 * i} y={20}>
                                <Card className="h-full group hover:bg-zinc-900 border-accent transition-colors">
                                    <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-all text-primary">
                                        {problem.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground group-hover:text-white mb-2 transition-colors">{problem.title}</h3>
                                    <p className="text-sm text-muted-foreground group-hover:text-zinc-400 transition-colors leading-relaxed">{problem.description}</p>
                                </Card>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    )
}
