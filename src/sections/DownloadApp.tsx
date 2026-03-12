import React from "react"
import { Container, Section } from "../components/ui/Layout"
import { Reveal } from "../components/animations/Reveal"
import qrCode from "../logo/flowly-app-qr.png"

export function DownloadApp() {
    return (
        <Section id="download" className="py-24 bg-gradient-to-b from-background to-[#efefef] dark:to-deep/20 overflow-hidden">
            <Container>
                <div className="relative rounded-[50px] border border-accent bg-white dark:bg-deep p-10 md:p-16 lg:p-24 overflow-hidden shadow-2xl group">
                    {/* Premium Abstract Background */}
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(var(--primary-rgb),0.05),transparent_70%)] -z-10" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Column 1: Text Content */}
                        <div className="flex flex-col space-y-8 text-left">
                            <Reveal>
                                <div className="inline-flex items-center px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-black tracking-widest uppercase">
                                    Mobile Experience
                                </div>
                            </Reveal>

                            <div className="space-y-6">
                                <Reveal delay={0.1}>
                                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-foreground leading-[0.95]">
                                        Flowly in the <br />
                                        <span className="text-primary italic">Palm of Your Hand.</span>
                                    </h2>
                                </Reveal>

                                <Reveal delay={0.2}>
                                    <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                                        Ready to take your workforce management to the next level? 
                                        Scan the code to download our professional mobile application 
                                        and stay synchronized with your team anywhere.
                                    </p>
                                </Reveal>
                            </div>

                            <Reveal delay={0.4}>
                                <div className="pt-8 border-t border-accent w-full max-w-md">
                                    <p className="text-sm text-muted-foreground italic font-medium">
                                        "The simplest way to manage your team synchronization on the field."
                                    </p>
                                </div>
                            </Reveal>
                        </div>

                        {/* Column 2: QR Code */}
                        <div className="relative flex justify-center lg:justify-end">
                            <Reveal delay={0.3} width="100%">
                                <div className="relative inline-block">
                                    {/* Aesthetic Glow behind QR */}
                                    <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full -z-10 group-hover:bg-primary/30 transition-colors duration-700" />
                                    
                                    <div className="relative p-10 md:p-14 rounded-[40px] bg-white dark:bg-background border-2 border-accent shadow-2xl group-hover:scale-[1.02] transition-transform duration-500 ease-out">
                                        {/* Corners */}
                                        <div className="absolute top-6 left-6 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
                                        <div className="absolute top-6 right-6 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
                                        <div className="absolute bottom-6 left-6 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
                                        <div className="absolute bottom-6 right-6 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />

                                        <div className="relative bg-white p-4 rounded-2xl">
                                            <img 
                                                src={qrCode} 
                                                alt="Flowly App QR Code" 
                                                className="w-48 h-48 md:w-64 md:h-64 object-contain"
                                            />
                                        </div>
                                        
                                        <div className="mt-8 text-center">
                                            <p className="text-lg font-black text-foreground tracking-tight">Scan to Download</p>
                                            <div className="mt-2 flex items-center justify-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">iOS & Android Ready</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    )
}
