import { Link } from "react-router-dom"
import { Container, Section } from "../components/ui/Layout"
import { Reveal } from "../components/animations/Reveal"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Check, ArrowRight } from "lucide-react"

export function Pricing() {
    const plans = [
        {
            name: "Pro Monthly",
            duration: "1 Month",
            price: "700",
            currency: "DH",
            description: "Perfect for short-term projects and testing the full power of BPMS.",
            features: [
                "Full AI Process Automation",
                "Infinite Workflow Nodes",
                "Advanced HR Management",
                "Global Performance Tracking",
                "24/7 Dedicated Support",
            ],
            cta: "Buy Subscription",
            featured: false
        },
        {
            name: "Enterprise Semi-Annual",
            duration: "6 Months",
            price: "3500",
            currency: "DH",
            description: "Scale your business with a stable environment and elite features.",
            features: [
                "Full AI Process Automation",
                "Infinite Workflow Nodes",
                "Advanced HR Management",
                "Global Performance Tracking",
                "24/7 Dedicated Support",
                "Legacy System Integration",
            ],
            cta: "Choose Semi-Annual",
            featured: false
        },
        {
            name: "Global Annual",
            duration: "12 Months",
            price: "5500",
            currency: "DH",
            description: "The ultimate value for long-term growth and total business transformation.",
            features: [
                "Full AI Process Automation",
                "Infinite Workflow Nodes",
                "Advanced HR Management",
                "Global Performance Tracking",
                "24/7 Dedicated Support",
                "Legacy System Integration",
                "Custom LLM Fine-tuning",
            ],
            cta: "Get Best Value",
            featured: true
        }
    ]

    return (
        <Section id="pricing" className="bg-secondary/30 relative">
            <Container>
                <div className="text-left mb-20">
                    <Reveal>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-6">
                            Invest in Your <br />
                            <span className="text-muted">Business Future.</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-lg text-muted max-w-2xl text-left">
                            Choose the plan that fits your execution speed. All plans include full access to our core BPMS engine.
                        </p>
                    </Reveal>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <Reveal key={i} delay={0.1 * i} y={40} overflow="visible">
                            <Card className={`h-full relative flex flex-col p-8 border-2 ${plan.featured ? "border-primary bg-background shadow-2xl shadow-primary/5" : "border-accent bg-background"}`}>
                                {plan.featured && (
                                    <div className="absolute top-0 right-12 -translate-y-1/2 bg-foreground text-background text-[10px] font-black uppercase tracking-[0.2em] py-2 px-4 rounded-full shadow-xl shadow-primary/20 z-20">
                                        Best Value
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted mb-4">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-black text-foreground">{plan.price}</span>
                                        <span className="text-lg font-bold text-muted">{plan.currency}</span>
                                        <span className="text-sm text-muted ml-2">/ {plan.duration}</span>
                                    </div>
                                    <p className="text-sm text-muted mt-4 leading-relaxed">
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="space-y-4 mb-10 flex-grow">
                                    {plan.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-primary" />
                                            </div>
                                            <span className="text-sm text-foreground/80 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    size="lg"
                                    variant={plan.featured ? "primary" : "outline"}
                                    className="w-full group"
                                    asChild
                                >
                                    <Link to="/paiment">
                                        {plan.cta}
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </Card>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </Section>
    )
}
