import { Container, Section } from "../components/ui/Layout"
import { Reveal } from "../components/animations/Reveal"
import { TiltCard } from "../components/animations/TiltCard"
import {
    Workflow,
    FileText,
    ShieldCheck,
    BarChart3,
    Globe2,
    Cpu
} from "lucide-react"

export function Features() {
    const features = [
        {
            icon: <Globe2 className="w-6 h-6" />,
            title: "Multi-tenant SaaS",
            description: "Enterprise-grade isolation for every client with dedicated secure data instances."
        },
        {
            icon: <ShieldCheck className="w-6 h-6" />,
            title: "Role-Based Security",
            description: "Granular RBAC system ensuring data access is restricted to the right personnel."
        },
        {
            icon: <Cpu className="w-6 h-6" />,
            title: "AI Automation Engine",
            description: "Elite intelligence driving status triggers and automated task transitions."
        },
        {
            icon: <Workflow className="w-6 h-6" />,
            title: "Vacation Requests",
            description: "Fully automated management of employee leave from submission to final approval."
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Auto-Generation",
            description: "Generate professional HR documents instantly from your predefined enterprise templates."
        },
        {
            icon: <BarChart3 className="w-6 h-6" />,
            title: "HR Analytics",
            description: "Real-time visibility into organization efficiency and team performance velocity."
        }
    ]

    return (
        <Section id="features" className="bg-black">
            <Container>
                <div className="text-left mb-20">
                    <Reveal>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-4 text-left">
                            Enterprise-Grade Capabilities
                        </h2>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <p className="text-muted text-left">
                            Equipped with everything your enterprise needs to automate complex business logic and manage global human resources.
                        </p>
                    </Reveal>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <Reveal key={i} delay={0.1 * i} width="100%">
                            <TiltCard className="h-full">
                                <div className="h-full border border-white/5 bg-zinc-950/50 p-8 rounded-3xl hover:bg-zinc-900 transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center mb-6">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </Section>
    )
}
