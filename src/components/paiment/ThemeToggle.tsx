import { Moon, Sun } from "lucide-react";
import { cn } from "../../lib/utils";

interface ThemeToggleProps {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
}

export function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
    const themes = [
        { id: 'light', icon: Sun, label: 'Light' },
        { id: 'dark', icon: Moon, label: 'Dark' },
    ] as const;

    return (
        <div className="fixed top-8 right-8 z-50 flex items-center gap-2 p-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-xl shadow-2xl">
            {themes.map((t) => (
                <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={cn(
                        "p-3 rounded-full transition-all duration-300 relative group",
                        theme === t.id
                            ? "bg-foreground text-background shadow-lg scale-110"
                            : "hover:bg-foreground/10 text-muted-foreground"
                    )}
                    title={t.label}
                >
                    <t.icon className="w-5 h-5" />
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-foreground text-background text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {t.label} Mode
                    </span>
                </button>
            ))}
        </div>
    );
}
