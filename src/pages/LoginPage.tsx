import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { FormInput } from "../components/signup/FormComponents";

export default function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(null);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password
            });

            if (authError) {
                // Provide a friendlier message for unconfirmed email
                if (authError.message.toLowerCase().includes("email not confirmed")) {
                    throw new Error("Please confirm your email first. Check your inbox for the confirmation link we sent.");
                }
                throw authError;
            }

            navigate('/');
        } catch (err: any) {
            setError(err.message || "Invalid login credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md z-10 text-center">
                <Link to="/" className="inline-block mb-10">
                    <div className="flex items-center gap-2 justify-center">
                        <img src="/ICONBLACK.svg?v=3" alt="Flowly" className="h-8 w-auto block dark:hidden" />
                        <img src="/ICONWHITE.svg?v=3" alt="Flowly" className="h-8 w-auto hidden dark:block" />
                        <span className="text-2xl font-black tracking-tighter uppercase ml-1">Flowly <span className="text-primary italic text-xl">Intelligent</span></span>
                    </div>
                </Link>

                <div className="glass rounded-[2rem] border border-foreground/5 bg-background/40 backdrop-blur-3xl p-8 md:p-10 shadow-2xl">
                    <h1 className="text-3xl font-black tracking-tighter mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] font-bold mb-10">Access your enterprise ecosystem</p>

                    <form onSubmit={handleLogin} className="space-y-6 text-left">
                        <FormInput
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="admin@company.ma"
                            icon={Mail}
                            required
                        />

                        <FormInput
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            icon={Lock}
                            required
                        />

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-[10px] font-bold uppercase tracking-wider text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-primary-foreground h-14 rounded-xl text-[10px] uppercase tracking-[0.3em] font-black transition-all flex items-center justify-center gap-3 group active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Enter Dashboard
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-[9px] text-muted-foreground uppercase tracking-[0.3em] font-black">
                    New to Flowly? <Link to="/signup" className="text-primary hover:underline ml-2">Create Enterprise Account</Link>
                </p>
            </div>
        </div>
    );
}
