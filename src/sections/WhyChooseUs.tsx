import { Container, Section } from "../components/ui/Layout"
import { Reveal } from "../components/animations/Reveal"
import { Card } from "../components/ui/Card"
import {
    ShieldCheck,
    Headphones,
    Zap,
    Users,
    Globe,
    Cpu
} from "lucide-react"

export function WhyChooseUs() {
    const features = [
        {
            icon: <ShieldCheck className="w-8 h-8 text-primary" />,
            title: "Enterprise Security",
            description: "Military-grade encryption and isolated tenant environments for maximum data protection."
        },
        {
            icon: <Headphones className="w-8 h-8 text-primary" />,
            title: "24/7 Dedicated Support",
            description: "Our experts are available around the clock to ensure your operations never skip a beat."
        },
        {
            icon: <Zap className="w-8 h-8 text-primary" />,
            title: "Seamless Integration",
            description: "Connect your existing legacy systems (SAP, Oracle, custom ERPs) with our intelligent API layer."
        },
        {
            icon: <Cpu className="w-8 h-8 text-primary" />,
            title: "AI-Driven Efficiency",
            description: "Not just automation; our AI learns your business logic to suggest optimizations in real-time."
        },
        {
            icon: <Users className="w-8 h-8 text-primary" />,
            title: "Global Compliance",
            description: "Built-in support for international labor laws and regional regulatory requirements."
        },
        {
            icon: <Globe className="w-8 h-8 text-primary" />,
            title: "Scalable Infrastructure",
            description: "From 100 to 100,000+ employees, our platform scales horizontally without performance loss."
        }
    ]

    return (
        <Section id="why-choose-us" className="bg-background relative">
            <Container>
                <div className="text-left mb-20">
                    <Reveal>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-6">
                            Why Global Leaders <br />
                            <span className="text-muted">Choose BPMS.</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-lg text-muted max-w-2xl text-left">
                            We bridge the gap between complex manual operations and fully autonomous,
                            AI-powered business processes.
                        </p>
                    </Reveal>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <Reveal key={i} delay={0.1 * i} y={30}>
                            <Card className="h-full group hover:bg-secondary/50 transition-colors duration-500">
                                <div className="mb-6 p-3 bg-primary/5 w-fit rounded-2xl group-hover:scale-110 transition-transform duration-500">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                                <p className="text-muted leading-relaxed">
                                    {feature.description}
                                </p>
                            </Card>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </Section>
    )
}
