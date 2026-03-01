import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CreditCard, Globe } from "lucide-react";
import { cn } from "../../lib/utils";

interface PaymentCardProps {
    formData: {
        cardNumber: string;
        cardHolder: string;
        expiryDate: string;
        cvc: string;
    };
    isFlipped: boolean;
}

export function PaymentCard({ formData, isFlipped }: PaymentCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Parallax Tilt Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // const cardType = getCardType(formData.cardNumber);

    return (
        <div className="w-full max-w-[400px] aspect-[1.586/1] card-perspective mx-auto mb-12">
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX: isFlipped ? 0 : rotateX,
                    rotateY: isFlipped ? 180 : rotateY,
                    transformStyle: "preserve-3d",
                }}
                className={cn(
                    "w-full h-full relative cursor-pointer transition-transform duration-700 ease-in-out card-inner",
                    isFlipped && "flipped"
                )}
            >
                {/* Front Side */}
                <div className="card-front w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#0a0a0b] border border-white/10 flex flex-col justify-between p-8 text-white">
                    {/* Metallic Grain & Waves Effect */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

                    {/* Globe Watermark */}
                    <div className="absolute right-[-20%] top-0 bottom-0 aspect-square opacity-10 pointer-events-none">
                        <Globe className="w-full h-full text-white" />
                    </div>

                    <div className="flex justify-between items-start z-10">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-black tracking-tighter">CIH</span>
                                <div className="w-[2px] h-6 bg-white/20" />
                                <span className="text-xl font-bold tracking-tight opacity-90">BANK</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-black italic tracking-[0.2em] text-blue-200/50 block">PLATINUM</span>
                        </div>
                    </div>

                    <div className="z-10 mt-2">
                        <div className="w-12 h-10 bg-gradient-to-br from-yellow-400 via-yellow-200 to-yellow-500 rounded-lg flex items-center justify-center border border-yellow-600/50 shadow-inner overflow-hidden relative">
                            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,black_2px,black_4px)]" />
                            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,black_2px,black_4px)]" />
                        </div>
                    </div>

                    <div className="z-10 mt-auto pt-4 flex flex-col gap-4">
                        <div className="text-xl sm:text-2xl font-mono tracking-[0.1em] sm:tracking-[0.15em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                            {formData.cardNumber ? formData.cardNumber : "4714 3807 0620 0002"}
                        </div>

                        <div className="flex justify-between items-end gap-2 w-full">
                            <div className="flex flex-col flex-1 min-w-0 pr-2">
                                <span className="text-[6px] sm:text-[8px] uppercase tracking-widest opacity-40 mb-1">Card Holder</span>
                                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] line-clamp-1 truncate block w-full">
                                    {formData.cardHolder || "MR LAHLOU MOHAMMED AMINE"}
                                </span>
                            </div>
                            <div className="flex flex-col items-center shrink-0 w-16">
                                <span className="text-[5px] sm:text-[6px] uppercase tracking-[0.2em] opacity-40 mb-1">VALID THRU</span>
                                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                                    {formData.expiryDate || "12/28"}
                                </span>
                            </div>
                            <div className="w-12 sm:w-16 h-8 sm:h-10 flex justify-end items-end shrink-0">
                                <span className="text-xl sm:text-2xl font-black italic tracking-tighter opacity-90 block">VISA</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back Side */}
                <div className="card-back w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-[#0a0a0b] border border-white/5 flex flex-col p-0 text-white">
                    <div className="mt-8 h-12 w-full bg-black shadow-inner" />
                    <div className="px-8 mt-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/90 h-10 w-48 rounded flex items-center justify-end px-4 overflow-hidden relative">
                                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.05)_10px,rgba(0,0,0,0.05)_20px)]" />
                            </div>
                            <div className="bg-white h-8 w-12 rounded flex items-center justify-center border border-white/20">
                                <span className="text-sm font-mono font-black italic text-black tracking-widest italic">
                                    {formData.cvc || "•••"}
                                </span>
                            </div>
                        </div>
                        <p className="text-[7px] opacity-30 mt-6 leading-relaxed uppercase tracking-[0.15em] max-w-[80%]">
                            This card is a property of CIH BANK. If found, please return to any branch.
                            Use is subject to the terms of the Cardholder Agreement.
                            Platinum Premium Security Level.
                        </p>
                    </div>
                    <div className="mt-auto p-8 flex justify-between items-end">
                        <div className="text-[8px] opacity-20 font-bold tracking-widest">
                            INTERNATIONAL CARD
                        </div>
                        <CreditCard className="w-8 h-8 opacity-10" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
