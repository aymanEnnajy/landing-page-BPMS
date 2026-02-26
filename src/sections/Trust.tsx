import { Container, Section } from "../components/ui/Layout"
import { Reveal } from "../components/animations/Reveal"
import { ShieldCheck, Cpu, Database, Landmark } from "lucide-react"

export function Trust() {
    return (
        <Section id="trust" className="py-12 lg:py-16 border-y border-accent bg-secondary/10">
            <Container>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: <Landmark className="w-5 h-5" />, text: "Designed for Enterprises" },
                        { icon: <ShieldCheck className="w-5 h-5" />, text: "Secure by Design" },
                        { icon: <Cpu className="w-5 h-5" />, text: "AI-Ready Infrastructure" },
                        { icon: <Database className="w-5 h-5" />, text: "Isolated Data Layers" }
                    ].map((item, i) => (
                        <Reveal key={i} delay={0.1 * i}>
                            <div className="flex items-center justify-center lg:justify-start gap-4 text-muted hover:text-foreground transition-colors group">
                                <div className="p-2 rounded-lg bg-accent/50 group-hover:bg-primary/10 transition-colors">
                                    {item.icon}
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest">{item.text}</span>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </Section>
    )
}
