import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User, Building2, ArrowRight, ArrowLeft,
    Loader2, CheckCircle2, Mail, Lock, Phone, MapPin, Hash,
    FileText, Globe, Camera, Image as ImageIcon, AlertCircle
} from "lucide-react";
import { cn } from "../lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { supabaseDb2 } from "../lib/supabase_db2";
import { FormInput, FormSelect, FormImageUpload } from "../components/signup/FormComponents";

// ─── Steps ───────────────────────────────────────────────────
const STEPS = [
    { id: 1, title: "Owner", icon: User },
    { id: 2, title: "Company", icon: Building2 },
];

// ─── Helper: Convert file to base64 string for DB storage ───
function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
    });
}

// ─── Step Validation ────────────────────────────────────────
function validateStep1(formData: any): string | null {
    if (!formData.firstName.trim()) return "First name is required";
    if (!formData.lastName.trim()) return "Last name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Please enter a valid email address";
    if (!formData.password) return "Password is required";
    if (formData.password.length < 6) return "Password must be at least 6 characters";
    if (!formData.confirmPassword) return "Please confirm your password";
    if (formData.password !== formData.confirmPassword) return "Passwords do not match";
    return null;
}

function validateStep2(formData: any): string | null {
    if (!formData.companyName.trim()) return "Company name is required";
    return null;
}

// ─── Main Component ──────────────────────────────────────────
export default function SignUpPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        // Owner
        firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
        phone: "", address: "", profilePhoto: null as File | null,
        // Company
        companyName: "", legalForm: "SARL", ice: "", rc: "", ifNumber: "",
        cnss: "", patente: "", companyEmail: "", companyPhone: "",
        companyAddress: "", city: "", companyLogo: null as File | null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(null);
    };

    const handleFileChange = (name: string, file: File) => {
        setFormData(prev => ({ ...prev, [name]: file }));
    };

    // ─── Validated Next Step ────────────────────────────────
    const handleNext = () => {
        if (step === 1) {
            const err = validateStep1(formData);
            if (err) { setError(err); return; }
        }
        setError(null);
        setStep(s => Math.min(s + 1, 2));
    };

    const prevStep = () => { setStep(s => Math.max(s - 1, 1)); setError(null); };

    // ─── Registration Logic ──────────────────────────────────
    const handleRegistration = async () => {
        // Validate step 2 before submitting
        const stepErr = validateStep2(formData);
        if (stepErr) { setError(stepErr); return; }

        setLoading(true);
        setError(null);

        let currentStep = "PREPARING";
        try {
            currentStep = "DB1_AUTH";
            // ── 1. Auth Sign Up in DB1 ───────────────────────
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                    },
                },
            });

            if (authError) throw new Error(`[DB1 Auth] ${authError.message}`);
            const userId = authData?.user?.id;
            if (!userId) throw new Error("[DB1 Auth] Account creation failed — no user returned");

            // ── 2. Convert images to base64 ──────────────────
            currentStep = "IMAGE_CONVERSION";
            let profilePhotoUrl: string | null = null;
            if (formData.profilePhoto) {
                try {
                    profilePhotoUrl = await fileToBase64(formData.profilePhoto);
                    console.log(`Profile photo base64 length: ${profilePhotoUrl.length}`);
                }
                catch (e) { console.warn("Profile photo conversion failed:", e); }
            }

            let logoUrl: string | null = null;
            if (formData.companyLogo) {
                try {
                    logoUrl = await fileToBase64(formData.companyLogo);
                    console.log(`Company logo base64 length: ${logoUrl.length}`);
                }
                catch (e) { console.warn("Logo conversion failed:", e); }
            }

            // ── 3. Read payment + plan from localStorage ─────
            currentStep = "PLAN_READING";
            const pendingPayment = (() => {
                try { return JSON.parse(localStorage.getItem("pending_payment") || "null"); } catch { return null; }
            })();

            const plan = selectedPlan;

            // Calculate subscription dates
            const startDate = new Date();
            const endDate = new Date(startDate);
            if (plan) {
                endDate.setMonth(endDate.getMonth() + (plan.duration_months ?? 1));
            }

            // ── 4. Write to DB1: RPC call ────────────────────
            currentStep = "DB1_RPC";
            const { error: rpcError } = await supabase.rpc("register_owner_and_company", {
                // Owner
                p_user_id: userId,
                p_first_name: formData.firstName,
                p_last_name: formData.lastName,
                p_email: formData.email,
                p_phone: formData.phone || null,
                p_address: formData.address || null,
                p_profile_photo: profilePhotoUrl,
                // Company
                p_company_name: formData.companyName,
                p_legal_form: formData.legalForm,
                p_ice: formData.ice || null,
                p_rc: formData.rc || null,
                p_if_number: formData.ifNumber || null,
                p_cnss: formData.cnss || null,
                p_patente: formData.patente || null,
                p_company_email: formData.companyEmail || null,
                p_company_phone: formData.companyPhone || null,
                p_company_address: formData.companyAddress || null,
                p_city: formData.city || null,
                p_logo_url: logoUrl,
                // Payment
                p_card_holder: pendingPayment?.card_holder_name ?? null,
                p_card_last_four: pendingPayment?.card_last_four ?? null,
                p_card_brand: pendingPayment?.card_brand ?? null,
                p_exp_month: pendingPayment?.expiration_month ?? null,
                p_exp_year: pendingPayment?.expiration_year ?? null,
                p_amount: plan?.price ?? null,
                p_currency: plan?.currency ?? "MAD",
                // Subscription
                p_plan_name: plan?.plan_name ?? null,
                p_duration: plan?.duration ?? null,
                p_price: plan?.price ?? null,
                p_sub_currency: plan?.currency ?? "MAD",
                p_start_date: plan ? startDate.toISOString().split("T")[0] : null,
                p_end_date: plan ? endDate.toISOString().split("T")[0] : null,
            });

            if (rpcError) throw new Error(`[DB1 RPC] ${rpcError.message}`);

            // ── 5. Write to DB2: Create Auth Account ─────────
            currentStep = "DB2_AUTH";
            console.log("── DB2 Step 5: Creating auth account...");
            const { data: db2AuthData, error: db2AuthError } = await supabaseDb2.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        role: "admin",
                    },
                },
            });

            console.log("DB2 Auth Result:", { db2AuthData, db2AuthError });
            if (db2AuthError) throw new Error(`[DB2 Auth] ${db2AuthError.message}`);
            if (!db2AuthData.user) throw new Error("[DB2 Auth] Account creation failed — no user returned");

            if (db2AuthData.user.identities && db2AuthData.user.identities.length === 0) {
                throw new Error("[DB2 Auth] Email already registered. Please delete user from DB2 Auth before retrying.");
            }

            const db2AuthUserId = db2AuthData.user.id;
            console.log("✅ DB2 Auth User created:", db2AuthUserId);

            // Build helper values
            const avatarInitials = `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`.toUpperCase();
            const location = [formData.companyAddress, formData.city].filter(Boolean).join(", ") || null;

            // Map plan names → DB2 enterprise_plan enum: 'Starter', 'Business', 'Enterprise'
            let db2Plan: string | null = null;
            if (plan?.plan_name) {
                const lower = plan.plan_name.toLowerCase();
                if (lower.includes("pro")) db2Plan = "Starter";
                else if (lower.includes("enterprise") || lower.includes("semi")) db2Plan = "Business";
                else if (lower.includes("global")) db2Plan = "Enterprise";
                else db2Plan = "Starter";
            }
            console.log("DB2 Plan mapped:", plan?.plan_name, "→", db2Plan);

            // ── 6. Write to DB2: Provision Enterprise + Admin (SECURE RPC) ─
            currentStep = "DB2_RPC";
            console.log("── DB2 Step 6: Calling secure provision_enterprise_admin RPC...");

            const { data: db2RpcData, error: db2RpcError } = await supabaseDb2.rpc("provision_enterprise_admin", {
                p_auth_user_id: db2AuthUserId,
                p_name: formData.companyName,
                p_industry: formData.legalForm || null,
                p_phone: formData.companyPhone || null,
                p_email: formData.companyEmail || null,
                p_location: location,
                p_plan: db2Plan,
                p_legal_form: formData.legalForm || null,
                p_ice: formData.ice || null,
                p_rc: formData.rc || null,
                p_if_number: formData.ifNumber || null,
                p_cnss: formData.cnss || null,
                p_patente: formData.patente || null,
                p_country: "Morocco",
                p_logo_url: logoUrl,
                p_profile_photo: profilePhotoUrl,
                p_first_name: formData.firstName,
                p_last_name: formData.lastName,
                p_user_email: formData.email,
                p_password_hash: formData.password,
                p_avatar_initials: avatarInitials,
            });

            console.log("DB2 RPC Result:", { db2RpcData, db2RpcError });
            if (db2RpcError) throw new Error(`[DB2 RPC] ${db2RpcError.message}`);
            console.log("✅ DB2 Secure Provisioning Complete");

            // ── 7. Clean up localStorage ─────────────────────
            currentStep = "CLEANUP";
            localStorage.removeItem("pending_payment");
            localStorage.removeItem("selected_plan");

            // ── 8. Success → redirect to external login ──────
            setSuccess(true);
            setTimeout(() => {
                window.location.href = "https://bpms-pff.vercel.app/login";
            }, 4000);

        } catch (err: any) {
            console.error("─── REGISTRATION FAILURE ───");
            console.error("Step:", currentStep);
            console.error("Context:", err);

            let detailedError = err.message || "An unknown error occurred";

            // Helpful hints for common Supabase errors
            if (detailedError.includes("Database error saving new user")) {
                const dbName = currentStep.startsWith("DB2") ? "SaaS Database (DB2)" : "Landing Page Database (DB1)";
                detailedError = `[Database Trigger Error @ ${currentStep}] ${detailedError}. 
                This means a trigger in ${dbName} failed. 
                Common causes: BASE64 image too large for 'text' column, or a missing 'NOT NULL' field.`;
            } else {
                detailedError = `[Failed at ${currentStep}] ${detailedError}`;
            }

            setError(detailedError);
        } finally {
            setLoading(false);
        }
    };

    // Read selected plan from localStorage (saved by Pricing section)
    const selectedPlan: {
        plan_name: string;
        duration: string;
        duration_months: number;
        price: number;
        currency: string;
    } | null = (() => {
        try {
            const raw = localStorage.getItem("selected_plan");
            return raw ? JSON.parse(raw) : null;
        } catch { return null; }
    })();

    // ─── Render ──────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-2xl z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block mb-3">
                        <div className="flex items-center gap-2">
                            <img src="/ICONBLACK.svg?v=3" alt="Flowly" className="h-8 w-auto block dark:hidden" />
                            <img src="/ICONWHITE.svg?v=3" alt="Flowly" className="h-8 w-auto hidden dark:block" />
                            <span className="text-2xl font-black tracking-tighter uppercase ml-1">Flowly <span className="text-primary italic text-xl">Intelligent</span></span>
                        </div>
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2 leading-none">Enterprise Setup</h1>
                    <p className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-bold">Create your platform account</p>
                </div>

                {/* Selected Plan Badge */}
                {selectedPlan && !success && (
                    <div className="mb-4 flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                            <CheckCircle2 className="w-3 h-3" />
                            {selectedPlan.plan_name} — {selectedPlan.price} {selectedPlan.currency}
                        </span>
                    </div>
                )}

                {/* Card */}
                <div className="glass rounded-[2rem] border border-foreground/5 bg-background/40 backdrop-blur-3xl overflow-hidden shadow-2xl">
                    {/* Stepper */}
                    <div className="flex border-b border-foreground/5">
                        {STEPS.map(s => (
                            <div
                                key={s.id}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 py-3.5 px-4 transition-all duration-500 cursor-pointer",
                                    step === s.id ? "bg-primary/5 border-b-2 border-primary" :
                                        step > s.id ? "opacity-60" : "opacity-30"
                                )}
                                onClick={() => { if (s.id < step) { setStep(s.id); setError(null); } }}
                            >
                                <s.icon className={cn("w-3.5 h-3.5", step === s.id ? "text-primary" : "text-foreground")} />
                                <span className={cn("text-[9px] font-black uppercase tracking-widest hidden md:block", step === s.id ? "text-primary" : "text-foreground")}>
                                    {s.title}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Form Content */}
                    <div className="p-6 md:p-8">
                        <AnimatePresence mode="wait">
                            {success ? (
                                <SuccessState key="success" />
                            ) : (
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {step === 1 && <OwnerStep formData={formData} onChange={handleInputChange} onFileChange={handleFileChange} />}
                                    {step === 2 && <CompanyStep formData={formData} onChange={handleInputChange} onFileChange={handleFileChange} />}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Error */}
                        {error && (
                            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-[10px] font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        {/* Navigation */}
                        {!success && (
                            <div className="flex items-center justify-between mt-6 gap-4">
                                <button onClick={prevStep} disabled={step === 1}
                                    className={cn("px-6 py-3 rounded-lg border border-foreground/10 text-[10px] uppercase tracking-widest font-black transition-all flex items-center gap-2 active:scale-95",
                                        step === 1 ? "opacity-0 pointer-events-none" : "hover:bg-foreground/5")}>
                                    <ArrowLeft className="w-3 h-3" /> Back
                                </button>
                                <button
                                    onClick={step === 2 ? handleRegistration : handleNext}
                                    disabled={loading}
                                    className="flex-1 bg-primary text-primary-foreground px-6 py-3.5 rounded-xl text-[10px] uppercase tracking-[0.2em] font-black transition-all flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                        <>{step === 2 ? "Create Account" : "Continue"} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></>
                                    )}
                                </button>
                            </div>
                        )}

                        <p className="text-center mt-5 text-[8px] text-muted-foreground uppercase tracking-[0.2em] font-medium">
                            Already registered? <a href="https://bpms-pff.vercel.app/login" className="text-primary font-black hover:underline ml-1">Log In</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Step 1: Owner ───────────────────────────────────────────
function OwnerStep({ formData, onChange, onFileChange }: any) {
    return (
        <div className="space-y-5">
            <div className="flex justify-center mb-2">
                <FormImageUpload label="Profile Photo" onChange={(f: File) => onFileChange("profilePhoto", f)} icon={Camera} shape="circle" />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <FormInput label="First Name *" name="firstName" value={formData.firstName} onChange={onChange} placeholder="Taha" icon={User} required />
                <FormInput label="Last Name *" name="lastName" value={formData.lastName} onChange={onChange} placeholder="Alami" icon={User} required />
            </div>
            <FormInput label="Email *" name="email" type="email" value={formData.email} onChange={onChange} placeholder="taha@enterprise.ma" icon={Mail} required />
            <div className="grid md:grid-cols-2 gap-5">
                <FormInput label="Password *" name="password" type="password" value={formData.password} onChange={onChange} placeholder="••••••••" icon={Lock} required />
                <FormInput label="Confirm Password *" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={onChange} placeholder="••••••••" icon={Lock} required />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <FormInput label="Phone" name="phone" value={formData.phone} onChange={onChange} placeholder="+212 6XX XXX XXX" icon={Phone} />
                <FormInput label="Address" name="address" value={formData.address} onChange={onChange} placeholder="Casablanca, Morocco" icon={MapPin} />
            </div>
        </div>
    );
}

// ─── Step 2: Company ─────────────────────────────────────────
function CompanyStep({ formData, onChange, onFileChange }: any) {
    return (
        <div className="space-y-5">
            <div className="flex justify-center mb-2">
                <FormImageUpload label="Company Logo" onChange={(f: File) => onFileChange("companyLogo", f)} icon={ImageIcon} shape="square" />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <FormInput label="Company Name *" name="companyName" value={formData.companyName} onChange={onChange} placeholder="Tech Solutions SARL" icon={Building2} required />
                <FormSelect label="Legal Form" name="legalForm" value={formData.legalForm} onChange={onChange} icon={FileText}
                    options={[
                        { value: "SARL", label: "SARL" }, { value: "SA", label: "SA" },
                        { value: "SAS", label: "SAS" }, { value: "Auto-entrepreneur", label: "Auto-entrepreneur" },
                        { value: "SNC", label: "SNC" }, { value: "Other", label: "Other" },
                    ]} />
            </div>
            <div className="grid md:grid-cols-3 gap-5">
                <FormInput label="ICE" name="ice" value={formData.ice} onChange={onChange} placeholder="001234567000012" icon={Hash} />
                <FormInput label="RC" name="rc" value={formData.rc} onChange={onChange} placeholder="123456" icon={Hash} />
                <FormInput label="IF (Identifiant Fiscal)" name="ifNumber" value={formData.ifNumber} onChange={onChange} placeholder="12345678" icon={Hash} />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <FormInput label="CNSS" name="cnss" value={formData.cnss} onChange={onChange} placeholder="1234567" icon={Hash} />
                <FormInput label="Patente" name="patente" value={formData.patente} onChange={onChange} placeholder="12345678" icon={Hash} />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <FormInput label="Company Email" name="companyEmail" type="email" value={formData.companyEmail} onChange={onChange} placeholder="contact@company.ma" icon={Mail} />
                <FormInput label="Company Phone" name="companyPhone" value={formData.companyPhone} onChange={onChange} placeholder="+212 5XX XXX XXX" icon={Phone} />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <FormInput label="City" name="city" value={formData.city} onChange={onChange} placeholder="Casablanca" icon={Globe} />
                <FormInput label="Address" name="companyAddress" value={formData.companyAddress} onChange={onChange} placeholder="Bd. d'Anfa" icon={MapPin} />
            </div>
        </div>
    );
}

// ─── Success State ───────────────────────────────────────────
function SuccessState() {
    return (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="py-16 flex flex-col items-center text-center gap-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <div>
                <h2 className="text-3xl font-black tracking-tighter mb-2">Account Created!</h2>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                    Your data has been saved. <br />
                    Please check your email to confirm your account, <br />
                    then log in to access your dashboard. <br />
                    <span className="text-primary">Redirecting to login...</span>
                </p>
            </div>
        </motion.div>
    );
}
