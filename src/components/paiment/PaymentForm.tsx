import { cn } from "../../lib/utils";
import { CreditCard, User, Calendar, Lock, ArrowRight, Loader2 } from "lucide-react";

interface PaymentFormProps {
    formData: {
        cardNumber: string;
        cardHolder: string;
        expiryDate: string;
        cvc: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        cardNumber: string;
        cardHolder: string;
        expiryDate: string;
        cvc: string;
    }>>;
    setIsFlipped: (isFlipped: boolean) => void;
    onSubmit?: () => void;
    loading?: boolean;
    error?: string | null;
}

interface InputWrapperProps {
    icon: any;
    label: string;
    name: string;
    placeholder: string;
    value: string;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

const InputWrapper = ({ icon: Icon, label, name, placeholder, value, type = "text", onChange, onFocus, onBlur }: InputWrapperProps) => (
    <div className="space-y-2 group">
        <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">
            {label}
        </label>
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Icon className="w-4 h-4" />
            </div>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={placeholder}
                className={cn(
                    "w-full bg-background/50 border border-border/50 rounded-xl py-4 pl-12 pr-4 text-sm font-medium transition-all",
                    "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm",
                    "placeholder:text-muted-foreground/50"
                )}
            />
        </div>
    </div>
);

export function PaymentForm({ formData, setFormData, setIsFlipped, onSubmit, loading, error }: PaymentFormProps) {
    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'cardNumber') {
            formattedValue = formatCardNumber(value).substring(0, 19);
        } else if (name === 'expiryDate') {
            formattedValue = value.replace(/[^0-9/]/g, '').substring(0, 5);
            if (formattedValue.length === 2 && !formattedValue.includes('/')) {
                formattedValue += '/';
            }
        } else if (name === 'cvc') {
            formattedValue = value.replace(/[^0-9]/g, '').substring(0, 3);
        } else if (name === 'cardHolder') {
            formattedValue = value.substring(0, 30).toUpperCase();
        }

        setFormData(prev => ({ ...prev, [name]: formattedValue }));
    };

    return (
        <div className="w-full space-y-6">
            <div className="space-y-4">
                <InputWrapper
                    icon={CreditCard}
                    label="Card Number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="0000 0000 0000 0000"
                />

                <InputWrapper
                    icon={User}
                    label="Card Holder"
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleInputChange}
                    placeholder="ENTER NAME"
                />

                <div className="grid grid-cols-2 gap-4">
                    <InputWrapper
                        icon={Calendar}
                        label="Expiration"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                    />
                    <InputWrapper
                        icon={Lock}
                        label="CVC / CCV"
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        placeholder="•••"
                        onFocus={() => setIsFlipped(true)}
                        onBlur={() => setIsFlipped(false)}
                    />
                </div>
            </div>

            {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-[10px] font-bold uppercase tracking-wider text-center">
                    {error}
                </div>
            )}

            <div className="flex gap-4 pt-4">
                <button
                    onClick={() => window.history.back()}
                    className="flex-1 py-4 rounded-xl border border-border/50 text-sm font-bold hover:bg-muted transition-colors active:scale-95"
                >
                    Cancel
                </button>
                <button
                    onClick={onSubmit}
                    disabled={loading}
                    className="flex-1 bg-primary text-primary-foreground py-4 rounded-xl text-sm font-bold shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-50"
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <>
                            Pay Now
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </div>

            <p className="text-[10px] text-center text-muted-foreground pt-4">
                Secure checkout powered by Flowly Intelligent Systems. <br />
                Encryption level: AES-256.
            </p>
        </div>
    );
}
