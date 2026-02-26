import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Building2, Briefcase, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";

// Import step components
import { AdminStep } from "../components/signup/AdminStep";
import { CompanyGeneralStep } from "../components/signup/CompanyGeneralStep";
import { CompanyBusinessStep } from "../components/signup/CompanyBusinessStep";

export default function SignUpPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Admin Info
        fullName: "",
        adminEmail: "",
        password: "",
        confirmPassword: "",
        phone: "",
        profilePic: null,
        jobTitle: "",
        department: "",
        experience: "",
        securityQuestion: "",
        twoFactorEnabled: false,
        acceptTerms: false,
        acceptPrivacy: false,
        // Company General
        companyName: "",
        logo: null,
        address: "",
        city: "",
        country: "Morocco",
        postalCode: "",
        ice_rc: "",
        taxId: "",
        creationDate: "",
        // Business Info
        sector: "",
        employeeCount: "1-10",
        companyType: "Startup",
        website: "",
        companyEmail: "",
        companyPhone: "",
        deptCount: "",
        orgStructure: "",
        currency: "MAD",
    });

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (name: string, file: File) => {
        setFormData((prev) => ({ ...prev, [name]: file }));
    };

    const nextStep = () => setStep((s) => Math.min(s + 1, 3));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const steps = [
        { id: 1, title: "Manager", icon: User },
        { id: 2, title: "Company", icon: Building2 },
        { id: 3, title: "Business", icon: Briefcase },
    ];

    return (
        <div className="h-[100dvh] bg-background text-foreground flex items-center justify-center p-4 md:p-6 lg:overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-3xl z-10"
            >
                <div className="text-center mb-4 lg:mb-6">
                    <Link to="/" className="inline-block mb-2">
                        <span className="text-xl font-black tracking-tighter uppercase">BPMS <span className="text-primary italic text-lg">Intelligent</span></span>
                    </Link>
                    <h1 className="text-2xl md:text-4xl font-black tracking-tighter mb-1 leading-none">Create Account</h1>
                    <p className="text-muted-foreground text-[8px] uppercase tracking-[0.3em] font-bold">Manager & Enterprise Registration</p>
                </div>

                <div className="glass rounded-[1.5rem] border border-foreground/5 bg-background/40 backdrop-blur-3xl overflow-hidden shadow-none">
                    {/* Stepper */}
                    <div className="flex border-b border-foreground/5">
                        {steps.map((s) => (
                            <div
                                key={s.id}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 py-3 px-4 transition-all duration-500",
                                    step === s.id ? "bg-primary/5 border-b-2 border-primary" : "opacity-30"
                                )}
                            >
                                <s.icon className={cn("w-3.5 h-3.5", step === s.id ? "text-primary" : "text-foreground")} />
                                <span className={cn("text-[9px] font-black uppercase tracking-widest hidden md:block", step === s.id ? "text-primary" : "text-foreground")}>
                                    {s.title}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 md:p-6 lg:p-8">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <AdminStep
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    handleFileChange={handleFileChange}
                                />
                            )}

                            {step === 2 && (
                                <CompanyGeneralStep
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    handleFileChange={handleFileChange}
                                />
                            )}

                            {step === 3 && (
                                <CompanyBusinessStep
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    handleFileChange={handleFileChange}
                                />
                            )}
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between mt-6 gap-4">
                            <button
                                onClick={prevStep}
                                disabled={step === 1}
                                className={cn(
                                    "px-6 py-3 rounded-lg border border-foreground/10 text-[10px] uppercase tracking-widest font-black transition-all flex items-center gap-2 active:scale-95",
                                    step === 1 ? "opacity-0 pointer-events-none" : "hover:bg-foreground/5"
                                )}
                            >
                                <ArrowLeft className="w-3 h-3" />
                                Back
                            </button>

                            <button
                                onClick={step === 3 ? () => console.log("Final Data:", formData) : nextStep}
                                className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-[10px] uppercase tracking-widest font-black transition-all flex items-center justify-center gap-2 group active:scale-95"
                            >
                                {step === 3 ? "Complete Registration" : "Next Step"}
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <p className="text-center mt-4 text-[8px] text-muted-foreground uppercase tracking-[0.2em] font-medium">
                            Already registered? <Link to="/login" className="text-primary font-black hover:underline ml-1">Log In</Link>
                        </p>
                    </div>
                </div>
            </motion.div>

            <footer className="absolute bottom-4 text-center opacity-20 text-[8px] uppercase tracking-[0.3em] font-black pointer-events-none">
                Intelligent BPMS &copy; 2026 Admin Panel
            </footer>
        </div>
    );
}
