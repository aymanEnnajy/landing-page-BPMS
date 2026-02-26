import { Container, Section } from "../components/ui/Layout"
import { Reveal } from "../components/animations/Reveal"
import { Card } from "../components/ui/Card"
import { motion } from "framer-motion"
import { Server, Database, Shield, Zap, Cpu, MousePointer2 } from "lucide-react"

export function Architecture() {
    const techStack = [
        {
            icon: <Cpu className="w-6 h-6" />,
            title: "Advanced AI Engine",
            description: "Distributed decision layers with sub-100ms inference latency."
        },
        {
            icon: <Server className="w-6 h-6" />,
            title: "Edge Runtime",
            description: "Globally distributed infrastructure for instant global access."
        },
        {
            icon: <Database className="w-6 h-6" />,
            title: "Unified Data Layer",
            description: "Seamless integration between legacy systems and modern AI storage."
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Zero Trust Security",
            description: "Military-grade encryption and tenant isolation by default."
        }
    ]

    return (
        <Section id="architecture" className="bg-secondary relative">
            <Container>
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <Reveal>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-6">
                                Built for <br />
                                <span className="text-muted">Enterprise Scale.</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <p className="text-lg text-muted mb-10 leading-relaxed max-w-md">
                                Built with a high-performance Node.js backend and strict TypeScript,
                                our secure multi-tenant architecture ensures data isolation and infinite scale.
                            </p>
                        </Reveal>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {techStack.map((tech, i) => (
                                <Reveal key={i} delay={0.1 * i}>
                                    <div className="p-4 border border-accent rounded-2xl bg-secondary/50">
                                        <div className="text-foreground mb-3">{tech.icon}</div>
                                        <h4 className="text-foreground font-bold mb-1 text-sm">{tech.title}</h4>
                                        <p className="text-muted text-xs leading-relaxed">{tech.description}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <Reveal delay={0.5}>
                            <Card className="aspect-square flex items-center justify-center border-accent overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent" />
                                <div className="relative z-10 w-full p-12">
                                    {/* Mock Architecture Visualization */}
                                    <div className="space-y-6">
                                        <div className="h-4 w-full bg-foreground/10 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-foreground/30"
                                                animate={{ width: ["10%", "90%", "40%", "80%"] }}
                                                transition={{ duration: 5, repeat: Infinity }}
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="aspect-square rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                                                    <Zap className="w-4 h-4 text-foreground/20" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="h-32 w-full rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-1 bg-foreground/20 rounded-full animate-pulse" />
                                                <div className="w-12 h-1 bg-foreground/20 rounded-full animate-pulse delay-100" />
                                                <div className="w-12 h-1 bg-foreground/20 rounded-full animate-pulse delay-200" />
                                            </div>
                                        </div>
                                    </div>
                                    <MousePointer2 className="absolute bottom-10 right-10 text-foreground/20 w-8 h-8 group-hover:translate-y-[-20px] transition-transform duration-500" />
                                </div>
                            </Card>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </Section>
    )
}
