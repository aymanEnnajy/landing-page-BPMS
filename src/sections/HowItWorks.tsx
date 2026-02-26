import { Container, Section } from "../components/ui/Layout"
import { Reveal } from "../components/animations/Reveal"
import { motion } from "framer-motion"

export function HowItWorks() {
    const steps = [
        {
            number: "01",
            title: "Create Company",
            description: "Set up your secure multi-tenant environment in seconds with localized settings."
        },
        {
            number: "02",
            title: "Assign Roles",
            description: "Implement granular RBAC permissions for Admins, Managers, and Employees."
        },
        {
            number: "03",
            title: "Define Workflows",
            description: "Use our visual tools to map out your specific business and HR processes."
        },
        {
            number: "04",
            title: "Automate with AI",
            description: "Deploy our intelligent engine to handle status transitions and document validation."
        },
        {
            number: "05",
            title: "Track & Optimize",
            description: "Monitor organizational velocity and optimize processes with real-time analytics."
        }
    ]

    return (
        <Section id="how-it-works" className="relative">
            <Container>
                <div className="text-left mb-20">
                    <Reveal>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-6">
                            Deploy BPMS in <br />
                            <span className="text-muted">Five Simple Steps.</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-lg text-muted max-w-2xl text-left">
                            Transforming your enterprise doesn't have to be complex. We've simplified the onboarding to maximize your conversion.
                        </p>
                    </Reveal>
                </div>

                <div className="relative">
                    {/* Connection Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent hidden lg:block" />

                    <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
                        {steps.map((step, i) => (
                            <Reveal key={i} delay={0.1 * i}>
                                <div className="relative group text-center lg:text-left">
                                    <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-black text-xs mb-6 mx-auto lg:mx-0 group-hover:scale-110 transition-transform">
                                        {step.number}
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
                                    <p className="text-muted text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    )
}
