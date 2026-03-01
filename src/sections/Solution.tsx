import React from "react"
import { Container, Section } from "../components/ui/Layout"
import { Reveal } from "../components/animations/Reveal"
import { CheckCircle2, Zap, Brain, Globe, Bot, Cpu, Users, Calendar } from "lucide-react"
import { DashboardPreview } from "../components/sections/DashboardPreview"

export function Solution() {
    const solutions = [
        {
            icon: <Users className="w-5 h-5 text-primary" />,
            title: "Talent Acquisition at Scale.",
            description: "Stop losing top talent to slow hiring cycles. Track every candidate from 'Applied' to 'Hired' with a visual, automated pipeline that notifies your team at every stage.",
            metric: "Move from Screening to Technical Interview in < 24 hours."
        },
        {
            icon: <Calendar className="w-5 h-5 text-primary" />,
            title: "Real-Time Workforce Visibility.",
            description: "Instant oversight of your team’s availability. Automated leave tracking and attendance logs sync directly with your capacity planning to ensure optimal project output.",
            metric: "Maintained 92% optimal capacity for current projects."
        },
        {
            icon: <Bot className="w-5 h-5 text-primary" />,
            title: "HR Department on Autopilot.",
            description: "Deploy an AI assistant to automate repetitive document requests and internal workflows, eliminating manual work. It streamlines operations and improves overall efficiency.",
            metric: "Zero-touch document generation for contracts and requests."
        }
    ]

    return (
        <Section id="solution" className="pb-0">
            <Container>
                <div className="text-center md:text-left mb-20 max-w-4xl">
                    <Reveal width="100%">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-foreground mb-6">
                            The Intelligent Operating System <br />
                            <span className="text-muted-foreground font-medium tracking-tight">for Modern Enterprises.</span>
                        </h2>
                    </Reveal>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-40 items-stretch">
                    {solutions.map((item, i) => (
                        <Reveal key={i} delay={0.2 + (i * 0.1)} width="100%">
                            <div className="h-full">
                                <div className="flex flex-col h-full relative p-8 rounded-3xl border border-accent bg-[#efefef] dark:bg-deep hover:border-primary/20 transition-all group overflow-hidden">
                                    {/* Hover Effect Background Overlay */}
                                    <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 shadow-sm border border-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed mb-8">{item.description}</p>

                                        {/* Key Metric Overlay */}
                                        <div className="mt-auto pt-4 relative">
                                            <div className="w-full h-px border-t border-dashed border-accent mb-4" />
                                            <div className="px-4 py-3 bg-white dark:bg-background rounded-xl border border-accent border-l-4 border-l-primary shadow-sm group-hover:shadow-md transition-shadow">
                                                <p className="text-xs font-semibold text-foreground italic">
                                                    "{item.metric}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
