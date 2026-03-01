import React from "react"
import { Container } from "../ui/Layout"

export function Footer() {
    const currentYear = new Date().getFullYear()

    const sections = [
        {
            title: "Product",
            links: ["Workflow Automation", "HR Analytics", "SaaS Multi-tenancy", "Security"],
        },
        {
            title: "Company",
            links: ["About Us", "Contact", "Enterprise", "Customers"],
        },
        {
            title: "Legal",
            links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
        },
        {
            title: "Connect",
            links: ["X / Twitter", "LinkedIn", "GitHub", "YouTube"],
        },
    ]

    return (
        <footer className="bg-background py-20 border-t border-accent">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
                    <div className="col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 bg-foreground rounded flex items-center justify-center">
                                <div className="w-3 h-3 bg-background rounded-sm" />
                            </div>
                            <span className="text-lg font-black tracking-tighter text-foreground">Flowly</span>
                        </div>
                        <p className="text-sm text-zinc-500 max-w-xs mb-6">
                            Enterprise-grade AI-powered workflow automation platform for modern business management.
                        </p>
                    </div>

                    {sections.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-foreground font-bold mb-6">{section.title}</h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-muted hover:text-foreground transition-colors font-medium"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-zinc-600">
                        &copy; {currentYear} Flowly SaaS Platform. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="text-xs text-zinc-700">PFE 2026 - Engineering Project</span>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
