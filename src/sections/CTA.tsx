import React from "react"
import { Container, Section } from "../components/ui/Layout"
import { Reveal } from "../components/animations/Reveal"
import { Button } from "../components/ui/Button"
import { ArrowRight } from "lucide-react"

export function CTA() {
    return (
        <Section className="bg-background relative overflow-hidden py-32 border-t border-accent">
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/10 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full pointer-events-none" />

            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <Reveal width="100%">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-foreground mb-8 text-glow uppercase">
                            Ready to Automate <br />
                            <span className="text-primary italic">Your Business Logic?</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2} width="100%">
                        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                            No demos. No delays. Choose your tier and deploy Flowly across your organization today.
                        </p>
                    </Reveal>
                    <Reveal delay={0.4} width="100%">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Button size="lg" className="w-full sm:w-auto h-16 px-12 text-lg group shadow-xl shadow-primary/20" asChild>
                                <a href="#pricing">
                                    View Subscription Tiers
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Button>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </Section>
    )
}
