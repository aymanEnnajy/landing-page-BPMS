import { Container, Section } from "../components/ui/Layout"
import { Reveal } from "../components/animations/Reveal"
import { Card } from "../components/ui/Card"
import { Building2, Landmark, Users2, Rocket, Briefcase } from "lucide-react"

export function UseCases() {
    const cases = [
        {
            icon: <Landmark className="w-6 h-6" />,
            title: "Large Enterprises",
            description: "Scale complex HR operations across global departments with unified AI logic."
        },
        {
            icon: <Building2 className="w-6 h-6" />,
            title: "SMEs",
            description: "Modernize your business without the overhead of massive legacy IT teams."
        },
        {
            icon: <Briefcase className="w-6 h-6" />,
            title: "HR Departments",
            description: "Eliminate repetitive manual tasks and focus on organizational growth strategy."
        },
        {
            icon: <Users2 className="w-6 h-6" />,
            title: "Project Teams",
            description: "Coordinate tasks and approvals at the speed of light with real-time tracking."
        },
        {
            icon: <Rocket className="w-6 h-6" />,
            title: "Tech Startups",
            description: "Deploy enterprise-ready architecture from day one with multi-tenant SaaS."
        }
    ]

    return (
        <Section id="use-cases" className="bg-secondary/30">
            <Container>
                <div className="flex flex-col items-start mb-16">
                    <Reveal>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
                            Engineered for Every <br />
                            <span className="text-muted">Market Segment.</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-muted max-w-2xl">
                            Whether you're a scaling startup or a global corporation, BPMS adapts to your specific operational needs.
                        </p>
                    </Reveal>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cases.map((useCase, i) => (
                        <Reveal key={i} delay={0.1 * i} width="100%">
                            <Card className="h-full border border-accent bg-background hover:border-primary/50 transition-colors">
                                <div className="p-3 rounded-xl bg-primary/5 text-primary w-fit mb-6">
                                    {useCase.icon}
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3">{useCase.title}</h3>
                                <p className="text-muted text-sm leading-relaxed">{useCase.description}</p>
                            </Card>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </Section>
    )
}
