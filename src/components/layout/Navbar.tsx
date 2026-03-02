import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "../ui/Layout"
import { Button } from "../ui/Button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { Link } from "react-router-dom"

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "Why Flowly?", href: "#problem" },
        { name: "Platform", href: "#solution" },
        { name: "Technology", href: "#technology" },
        { name: "Pricing", href: "#pricing" },
    ]

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-4 bg-background/80 backdrop-blur-md border-b border-accent" : "py-6 bg-transparent"
                }`}
        >
            <Container className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <img src="/ICONBLACK.svg?v=3" alt="Flowly" className="h-6 w-auto block dark:hidden" />
                        <img src="/ICONWHITE.svg?v=3" alt="Flowly" className="h-6 w-auto hidden dark:block" />
                        <span className="text-xl font-black tracking-tighter text-foreground ml-1">Flowly</span>
                    </div>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-muted hover:text-foreground transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggle />
                    <Button variant="outline" size="sm" className="border-2 border-black dark:border-white" asChild>
                        <a href="https://bpms-pff.vercel.app/login" target="_blank" rel="noopener noreferrer">Login</a>
                    </Button>
                    <Button size="sm" asChild>
                        <a href="#pricing">Get Started</a>
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <ThemeToggle />
                    <button
                        className="text-foreground"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </Container>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-background border-b border-accent px-4 py-8 md:hidden shadow-xl"
                    >
                        <div className="flex flex-col gap-6 items-center">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-lg font-medium text-muted hover:text-foreground"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <hr className="w-full border-accent" />
                            <Button variant="outline" size="sm" className="w-full border-2 border-black dark:border-white" asChild>
                                <a href="https://bpms-pff.vercel.app/login" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>Login</a>
                            </Button>
                            <Button className="w-full" asChild>
                                <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Get Started</a>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
