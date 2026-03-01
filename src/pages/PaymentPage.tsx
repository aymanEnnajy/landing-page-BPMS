import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PaymentCard } from "../components/paiment/PaymentCard";
import { PaymentForm } from "../components/paiment/PaymentForm";
import { ThemeToggle } from "../components/paiment/ThemeToggle";

export default function PaymentPage() {
    const navigate = useNavigate();

    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
        }
        return 'dark';
    });

    const [formData, setFormData] = useState({
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvc: "",
    });

    const [isFlipped, setIsFlipped] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // ─── Payment Submit Handler ──────────────────────────────
    const handlePaymentSubmit = async () => {
        setLoading(true);
        setError(null);

        // Validation
        const rawCardNumber = formData.cardNumber.replace(/\s/g, '');
        if (rawCardNumber.length < 13) {
            setError("Please enter a valid card number");
            setLoading(false);
            return;
        }
        if (!formData.cardHolder.trim()) {
            setError("Please enter the card holder name");
            setLoading(false);
            return;
        }
        if (!formData.expiryDate || formData.expiryDate.length < 5) {
            setError("Please enter a valid expiration date (MM/YY)");
            setLoading(false);
            return;
        }
        if (!formData.cvc || formData.cvc.length < 3) {
            setError("Please enter a valid CVC");
            setLoading(false);
            return;
        }

        try {
            // Store payment info temporarily in localStorage
            // It will be saved to the database AFTER registration (when user is authenticated)
            const [expMonth, expYear] = formData.expiryDate.split('/');
            const lastFour = rawCardNumber.slice(-4);

            // Detect card brand
            let brand = "Unknown";
            if (/^4/.test(rawCardNumber)) brand = "Visa";
            else if (/^5[1-5]/.test(rawCardNumber)) brand = "Mastercard";
            else if (/^3[47]/.test(rawCardNumber)) brand = "Amex";

            const paymentData = {
                card_holder_name: formData.cardHolder,
                card_last_four: lastFour,
                card_brand: brand,
                expiration_month: expMonth,
                expiration_year: `20${expYear}`,
                status: "pending",
            };

            localStorage.setItem("pending_payment", JSON.stringify(paymentData));

            // Redirect to registration page
            navigate("/signup");

        } catch (err: any) {
            setError(err.message || "Payment processing failed");
        } finally {
            setLoading(false);
        }
    };

    const floatAnim = {
        initial: { y: 0 },
        animate: {
            y: [-10, 10, -10],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut" as any
            }
        }
    };

    return (
        <div className="min-h-[100dvh] lg:h-[100dvh] bg-background text-foreground transition-colors duration-500 overflow-y-auto lg:overflow-hidden p-4 md:p-8 flex flex-col items-center justify-center relative">
            <ThemeToggle theme={theme} setTheme={setTheme} />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-[1100px] z-10 flex flex-col items-center"
            >
                <div className="text-center mb-6 lg:mb-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-5xl font-black tracking-tighter mb-2"
                    >
                        Secure Checkout
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground"
                    >
                        Premium Intelligent BPMS Encryption
                    </motion.p>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-16 w-full">
                    {/* Left Side: Form */}
                    <div className="w-full lg:w-[450px] order-2 lg:order-1">
                        <div className="glass rounded-[2rem] p-6 md:p-8 shadow-2xl border border-white/5 bg-background/40 backdrop-blur-3xl">
                            <PaymentForm
                                formData={formData}
                                setFormData={setFormData}
                                setIsFlipped={setIsFlipped}
                                onSubmit={handlePaymentSubmit}
                                loading={loading}
                                error={error}
                            />
                        </div>
                    </div>

                    {/* Right Side: 3D Card */}
                    <div className="w-full lg:w-[450px] order-1 lg:order-2 flex justify-center perspective-2000">
                        <motion.div
                            variants={floatAnim}
                            initial="initial"
                            animate="animate"
                            className="w-full"
                        >
                            <PaymentCard formData={formData} isFlipped={isFlipped} />
                        </motion.div>
                    </div>
                </div>

                {/* Decorative blurs */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
            </motion.div>

            <footer className="absolute bottom-6 text-center opacity-30 text-[10px] uppercase tracking-[0.3em] font-black pointer-events-none">
                Intelligent BPMS &copy; 2026
            </footer>
        </div>
    );
}
