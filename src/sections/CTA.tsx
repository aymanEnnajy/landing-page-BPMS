import React from "react"
import { Container, Section } from "../components/ui/Layout"
import { Reveal } from "../components/animations/Reveal"
import { Button } from "../components/ui/Button"
import { ArrowRight } from "lucide-react"

export function CTA() {
    return (
        <Section className="bg-background relative overflow-hidden">
            {/* Background Decorative Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-accent/20 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent/20 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-accent/40 rounded-full pointer-events-none" />

            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <Reveal width="100%">
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-foreground mb-8 text-glow">
                            Ready to Transform <br />
                            <span className="text-muted">Your Business Workflows?</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2} width="100%">
                        <p className="text-xl text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
                            Join elite enterprises using BPMS to automate at the speed of thought.
                            Deploy BPMS today and transform your organization with the power of AI-driven automation.
                        </p>
                    </Reveal>
                    <Reveal delay={0.4} width="100%">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Button size="lg" className="w-full sm:w-auto h-16 px-12 text-lg">
                                Get Started Now
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 px-12 text-lg">
                                Talk to Sales
                            </Button>
                        </div>
                    </Reveal>

                    <Reveal delay={0.6} width="100%">
                        <p className="mt-12 text-muted text-sm font-medium tracking-widest uppercase">
                            No fixed contracts. Cancel your subscription anytime.
                        </p>
                    </Reveal>
                </div>
            </Container>
        </Section>
    )
}
