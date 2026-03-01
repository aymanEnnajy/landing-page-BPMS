import React from "react"
import { Container, Section } from "../components/ui/Layout"
import { Reveal } from "../components/animations/Reveal"
import { Card } from "../components/ui/Card"
import { Network, Server, ShieldCheck, FileCheck, CalendarClock, UserPlus } from "lucide-react"

export function TechnicalProof() {
    const performanceMetrics = [
        {
            label: "GLOBAL OUTPUT",
            value: "+84.2%",
            context: "Average increase in HR workflow efficiency after 30 days of deployment.",
            icon: <Network className="w-5 h-5 text-emerald-500" />
        },
        {
            label: "ACTIVE NODES",
            value: "1.2M",
            context: "Secure automated logic triggers processed daily across our global network.",
            icon: <Server className="w-5 h-5 text-blue-500" />
        },
        {
            label: "SHIELD PROTOCOL",
            value: "ACTIVE",
            context: "Enterprise-grade encryption protecting sensitive employee payroll and personal data.",
            icon: <ShieldCheck className="w-5 h-5 text-primary" />
        }
    ]

    const coreWorkflows = [
        {
            icon: <FileCheck className="w-6 h-6" />,
            title: "Zero-Touch Document Requests",
            description: "Use the AI Assistant to generate employment contracts, salary certificates, and legal addendums instantly. No more manual templates."
        },
        {
            icon: <CalendarClock className="w-6 h-6" />,
            title: "92% Average Present Rate Tracking",
            description: "Real-time synchronization between the 'Attendance' tracker and 'Payroll' modules to eliminate manual calculation errors."
        },
        {
            icon: <UserPlus className="w-6 h-6" />,
            title: "Screen, Interview, and Hire in one Flow",
            description: "A centralized Recruitment Pipeline that moves candidates through 6 critical stages—from 'Applied' to 'Hired'—automatically notifying stakeholders at every step."
        }
    ]

    return (
        <Section id="technology" className="bg-secondary relative border-t border-accent">
            <Container>
                {/* Part A: Trust & Performance Banner */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <Reveal>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-foreground mb-6 uppercase">
                            Built for Speed. <br />
                            <span className="text-primary italic">Engineered for Scale.</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            High-growth enterprises require more than just a dashboard.
                            They require a resilient infrastructure that processes HR logic in real-time.
                        </p>
                    </Reveal>
                </div>

                {/* Part B: Data-Driven Performance Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-32">
                    {performanceMetrics.map((metric, i) => (
                        <Reveal key={i} delay={0.1 * i} y={20}>
                            <Card className="p-8 h-full bg-background/50 border-accent hover:border-primary/50 transition-colors group">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-secondary/80">
                                        {metric.icon}
                                    </div>
                                    <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                        {metric.label}
                                    </span>
                                </div>
                                <div className="text-4xl font-black text-foreground mb-4 group-hover:scale-105 transition-transform origin-left">
                                    {metric.value}
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {metric.context}
                                </p>
                            </Card>
                        </Reveal>
                    ))}
                </div>

                {/* Part C: The "Core Workflows" Feature Grid */}
                <div className="text-left mb-16">
                    <Reveal>
                        <h3 className="text-2xl font-bold text-foreground">Core Workflows</h3>
                        <div className="w-20 h-1 bg-primary mt-4 rounded-full" />
                    </Reveal>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {coreWorkflows.map((workflow, i) => (
                        <Reveal key={i} delay={0.2 + (0.1 * i)} y={20}>
                            <div className="flex flex-col gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                    {workflow.icon}
                                </div>
                                <h4 className="text-xl font-bold text-foreground">
                                    {workflow.title}
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {workflow.description}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </Section>
    )
}
