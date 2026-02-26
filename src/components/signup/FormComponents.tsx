import { useState } from "react";
import { cn } from "../../lib/utils";

export const FormInput = ({ label, name, type = "text", value, onChange, placeholder, icon: Icon, required = false }: any) => (
    <div className="space-y-1 group">
        <label className="text-[9px] uppercase tracking-[0.2em] font-black text-muted-foreground ml-1">
            {label} {required && <span className="text-primary">*</span>}
        </label>
        <div className="relative">
            {Icon && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                </div>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={cn(
                    "w-full bg-foreground/5 border border-foreground/10 rounded-lg py-2.5 px-4 text-xs font-medium transition-all focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 leading-none",
                    Icon && "pl-10"
                )}
            />
        </div>
    </div>
);

export const FormSelect = ({ label, name, value, onChange, options, icon: Icon }: any) => (
    <div className="space-y-1 group">
        <label className="text-[9px] uppercase tracking-[0.2em] font-black text-muted-foreground ml-1">
            {label}
        </label>
        <div className="relative">
            {Icon && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                </div>
            )}
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={cn(
                    "w-full bg-foreground/5 border border-foreground/10 rounded-lg py-2.5 px-4 text-xs font-medium transition-all focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 appearance-none cursor-pointer leading-none",
                    Icon && "pl-10"
                )}
            >
                {options.map((opt: any) => (
                    <option key={opt.value} value={opt.value} className="bg-background text-foreground">
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    </div>
);

export const FormCheckbox = ({ label, name, checked, onChange, required = false }: any) => (
    <label className="flex items-center gap-3 cursor-pointer group py-1">
        <div className="relative flex items-center justify-center">
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                className="peer sr-only"
                required={required}
            />
            <div className="w-4 h-4 border border-foreground/20 rounded bg-foreground/5 transition-all peer-checked:bg-primary peer-checked:border-primary group-hover:border-primary/50" />
            <svg
                className="absolute w-2.5 h-2.5 text-primary-foreground opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="4"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        </div>
        <span className="text-[10px] font-bold text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-wider">
            {label} {required && <span className="text-primary">*</span>}
        </span>
    </label>
);

export const FormImageUpload = ({ label, onChange, icon: Icon, shape = "circle" }: any) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                onChange(file);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-center gap-2 group">
            <label className="text-[9px] uppercase tracking-[0.2em] font-black text-muted-foreground">
                {label}
            </label>
            <div className="relative group/upload">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className={cn(
                    "w-16 h-16 bg-foreground/5 border border-dashed border-foreground/20 flex flex-col items-center justify-center transition-all group-hover/upload:border-primary/50 relative overflow-hidden bg-cover bg-center",
                    shape === "circle" ? "rounded-full" : "rounded-xl"
                )}
                    style={{ backgroundImage: preview ? `url(${preview})` : undefined }}
                >
                    {!preview && (
                        <>
                            <Icon className="w-5 h-5 text-muted-foreground group-hover/upload:text-primary transition-colors" />
                            <span className="text-[7px] font-bold uppercase mt-1 opacity-50 text-center px-2">Upload</span>
                        </>
                    )}
                    {preview && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/upload:opacity-100 transition-opacity">
                            <Icon className="w-4 h-4 text-white" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
