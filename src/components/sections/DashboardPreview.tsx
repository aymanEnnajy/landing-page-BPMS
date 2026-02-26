import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
    Users, Building2, LayoutDashboard, Briefcase,
    BarChart3, Settings, CreditCard, Sparkles,
    UserCheck, Calendar, FileText, Wallet,
    CheckCircle2, TrendingUp
} from "lucide-react";
import { cn } from "../../lib/utils";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const SidebarItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
    <div className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors cursor-pointer",
        active ? "bg-primary text-primary-foreground" : "text-muted hover:text-foreground hover:bg-secondary/50"
    )}>
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{label}</span>
    </div>
);

const KPICard = ({ title, value, trend, icon: Icon }: { title: string, value: string, trend?: string, icon: any }) => (
    <div className="p-4 rounded-2xl bg-secondary/30 border border-accent glass">
        <div className="flex justify-between items-start mb-2">
            <div className="p-2 rounded-lg bg-secondary/50">
                <Icon className="w-4 h-4 text-muted" />
            </div>
            {trend && <span className="text-xs text-emerald-500 font-medium">{trend}</span>}
        </div>
        <div className="text-sm text-muted mb-1">{title}</div>
        <div className="text-xl font-bold tracking-tight text-foreground">{value}</div>
    </div>
);

const AdminDashboard = () => (
    <div className="flex h-full bg-background text-foreground overflow-hidden rounded-3xl border border-accent shadow-2xl">
        <div className="w-64 border-r border-accent p-6 flex flex-col gap-1 shrink-0 bg-secondary/10">
            <div className="flex items-center gap-2 mb-8 px-2">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold tracking-tight text-lg">BPMS</span>
            </div>
            <SidebarItem icon={LayoutDashboard} label="Overview" active />
            <SidebarItem icon={Building2} label="Companies" />
            <SidebarItem icon={Users} label="HR Management" />
            <SidebarItem icon={Briefcase} label="Projects" />
            <SidebarItem icon={BarChart3} label="Analytics" />
            <SidebarItem icon={Sparkles} label="AI Insights" />
            <div className="mt-auto pt-6 border-t border-accent">
                <SidebarItem icon={CreditCard} label="Billing" />
                <SidebarItem icon={Settings} label="Settings" />
            </div>
        </div>
        <div className="flex-1 p-8 overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
                    <p className="text-muted text-sm">Global enterprise overview and controls.</p>
                </div>
                <div className="h-10 w-32 rounded-lg bg-secondary/30 border border-accent" />
            </div>
            <div className="grid grid-cols-4 gap-6 mb-8">
                <KPICard title="Total Employees" value="1,284" trend="+12%" icon={Users} />
                <KPICard title="Active Managers" value="48" icon={UserCheck} />
                <KPICard title="Live Projects" value="32" icon={Briefcase} />
                <KPICard title="Monthly Revenue" value="$42,500" trend="+8%" icon={Wallet} />
            </div>
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 p-6 rounded-2xl bg-secondary/20 border border-accent glass min-h-[300px]">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold">Growth Analytics</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="h-4 w-full bg-secondary/30 rounded-full" />
                        <div className="h-4 w-[80%] bg-secondary/30 rounded-full" />
                        <div className="h-4 w-[90%] bg-secondary/30 rounded-full" />
                        <div className="h-4 w-[70%] bg-secondary/30 rounded-full" />
                    </div>
                </div>
                <div className="p-6 rounded-2xl bg-secondary/40 border border-accent glass flex flex-col">
                    <div className="flex items-center gap-2 mb-4 text-emerald-500">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-bold">AI INSIGHTS</span>
                    </div>
                    <p className="text-sm text-muted mb-6 italic leading-relaxed">
                        "Employee retention is up 15%. Recommend scaling recruitment in Engineering."
                    </p>
                    <div className="mt-auto space-y-3">
                        <div className="h-8 w-full rounded bg-secondary/50" />
                        <div className="h-8 w-full rounded bg-secondary/50" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const HRDashboard = () => (
    <div className="flex h-full bg-background text-foreground overflow-hidden rounded-3xl border border-accent shadow-2xl">
        <div className="w-64 border-r border-accent p-6 flex flex-col gap-1 shrink-0 bg-secondary/10">
            <div className="flex items-center gap-2 mb-8 px-2">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold tracking-tight text-lg">HR Portal</span>
            </div>
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
            <SidebarItem icon={Users} label="Employees" />
            <SidebarItem icon={Building2} label="Teams" />
            <SidebarItem icon={FileText} label="Document Requests" />
            <SidebarItem icon={Calendar} label="Leave Management" />
            <SidebarItem icon={Wallet} label="Payroll" />
            <SidebarItem icon={BarChart3} label="Analytics" />
            <div className="mt-auto pt-6 border-t border-accent">
                <SidebarItem icon={Sparkles} label="AI Assistant" />
            </div>
        </div>
        <div className="flex-1 p-8 overflow-y-auto no-scrollbar">
            <h2 className="text-2xl font-bold tracking-tight mb-8">HR Management</h2>
            <div className="grid grid-cols-3 gap-6 mb-8">
                <KPICard title="On Leave Today" value="8" icon={Calendar} />
                <KPICard title="Pending Documents" value="24" icon={FileText} />
                <KPICard title="Payroll Status" value="Processing" icon={Wallet} />
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-secondary/20 border border-accent glass">
                    <h3 className="font-bold mb-4">Leave Calendar</h3>
                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 28 }).map((_, i) => (
                            <div key={i} className={cn(
                                "h-10 rounded-lg flex items-center justify-center text-xs",
                                i === 12 ? "bg-primary text-primary-foreground font-bold" : "bg-secondary text-muted"
                            )}>{i + 1}</div>
                        ))}
                    </div>
                </div>
                <div className="p-6 rounded-2xl bg-secondary/20 border border-accent glass">
                    <h3 className="font-bold mb-4">Validation Queue</h3>
                    {[1, 2, 3].map(item => (
                        <div key={item} className="flex items-center justify-between p-3 border-b border-accent last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-secondary" />
                                <div className="text-sm">
                                    <div className="font-medium">Sarah Connor</div>
                                    <div className="text-xs text-muted">Vacation Request</div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const EmployeeDashboard = () => (
    <div className="flex h-full bg-background text-foreground overflow-hidden rounded-3xl border border-accent shadow-2xl">
        <div className="w-64 border-r border-accent p-6 flex flex-col gap-1 shrink-0 bg-secondary/10">
            <div className="flex items-center gap-2 mb-8 px-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-primary-foreground" />
                </div>
                <span className="font-bold tracking-tight text-lg">My Space</span>
            </div>
            <SidebarItem icon={LayoutDashboard} label="My Dashboard" active />
            <SidebarItem icon={CheckCircle2} label="My Tasks" />
            <SidebarItem icon={FileText} label="My Documents" />
            <SidebarItem icon={Calendar} label="Leave Requests" />
            <SidebarItem icon={Users} label="Profile" />
            <div className="mt-auto pt-6 border-t border-accent">
                <SidebarItem icon={Sparkles} label="Productivity Agent" />
            </div>
        </div>
        <div className="flex-1 p-8 overflow-y-auto no-scrollbar">
            <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Welcome, Alex</h2>
                <p className="text-muted text-sm">You have 4 tasks to complete today.</p>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-8">
                <KPICard title="Task Progress" value="65%" icon={TrendingUp} />
                <KPICard title="Leave Days" value="12 Rem." icon={Calendar} />
                <KPICard title="Performance" value="Top 10%" icon={Sparkles} />
            </div>
            <div className="p-6 rounded-2xl bg-secondary/20 border border-accent glass">
                <h3 className="font-bold mb-4">My Tasks</h3>
                {[
                    { t: "Update Documentation", d: "Due in 2 days", s: "In Progress" },
                    { t: "Performance Review", d: "Tomorrow", s: "Pending" },
                    { t: "Expense Report", d: "Today", s: "Urgent" }
                ].map((task, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl mb-3 last:mb-0">
                        <div>
                            <div className="text-sm font-medium text-foreground">{task.t}</div>
                            <div className="text-xs text-muted">{task.d}</div>
                        </div>
                        <span className={cn(
                            "text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded",
                            task.s === "Urgent" ? "bg-red-500/20 text-red-500" : "bg-primary/10 text-muted"
                        )}>{task.s}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export function DashboardPreview() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const dashboards = gsap.utils.toArray<HTMLElement>(".dashboard-card");
            const indicators = gsap.utils.toArray<HTMLElement>(".indicator-item");

            const st = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "+=300%",
                pin: true,
                scrub: 1,
                snap: {
                    snapTo: 1 / (dashboards.length - 1),
                    duration: { min: 0.2, max: 0.8 },
                    delay: 0.1,
                    ease: "power2.inOut"
                },
                onUpdate: (self) => {
                    if (self.isActive) {
                        resetAutoPlay();
                    }
                },
            });
            scrollTriggerRef.current = st;

            const mainTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=300%",
                    scrub: 1,
                }
            });

            dashboards.forEach((card, i) => {
                const isFirst = i === 0;
                const isLast = i === dashboards.length - 1;

                // Horizontal Slide Transition: slides in from LEFT
                if (!isFirst) {
                    mainTl.fromTo(card, {
                        xPercent: -120, // Start from left
                        opacity: 0,
                    }, {
                        xPercent: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power2.out"
                    }, i - 0.5);
                }

                // Horizontal Slide Transition: slides out to RIGHT
                if (!isLast) {
                    mainTl.to(card, {
                        xPercent: 120, // Slide out to right
                        opacity: 0,
                        duration: 1,
                        ease: "power2.in"
                    }, i + 0.5);
                }

                mainTl.to(indicators[i], {
                    color: "var(--foreground)",
                    opacity: 1,
                    duration: 0.1
                }, i > 0 ? i - 0.2 : 0);

                if (i > 0) {
                    mainTl.to(indicators[i - 1], {
                        color: "var(--muted)",
                        opacity: 0.5,
                        duration: 0.1
                    }, i - 0.2);
                }
            });

            let currentIndex = 0;
            let autoPlayTimer: any;

            const resetAutoPlay = () => {
                if (autoPlayTimer) autoPlayTimer.kill();
                if (!st || !st.isActive) return;

                autoPlayTimer = gsap.delayedCall(7, () => {
                    if (!st.isActive) return;
                    currentIndex = (currentIndex + 1) % dashboards.length;
                    const targetProgress = currentIndex / (dashboards.length - 1);
                    const scrollTarget = st.start + (st.end - st.start) * targetProgress;

                    gsap.to(window, {
                        scrollTo: scrollTarget,
                        duration: 1.5,
                        ease: "power3.inOut"
                    });

                    resetAutoPlay();
                });
            };

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top center",
                onEnter: () => resetAutoPlay(),
                onEnterBack: () => resetAutoPlay(),
                onLeave: () => autoPlayTimer?.kill(),
                onLeaveBack: () => autoPlayTimer?.kill(),
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleIndicatorClick = (index: number) => {
        const st = scrollTriggerRef.current;
        if (!st) return;

        const targetProgress = index / (3 - 1);
        const scrollTarget = st.start + (st.end - st.start) * targetProgress;

        gsap.to(window, {
            scrollTo: scrollTarget,
            duration: 1.2,
            ease: "power3.inOut"
        });
    };

    return (
        <section ref={sectionRef} className="relative h-screen w-full bg-background overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-15%] right-[-10%] w-[60%] aspect-square bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-[120px] opacity-10 dark:opacity-20" />
                <div className="absolute bottom-[-15%] left-[-10%] w-[50%] aspect-square bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-[100px] opacity-5 dark:opacity-10" />
            </div>

            <div className="relative w-full max-w-6xl px-4 h-[75vh]">
                <div className="relative w-full h-full">
                    {/* Admin Dashboard */}
                    <div className="dashboard-card absolute inset-0 w-full h-full">
                        <AdminDashboard />
                    </div>

                    {/* HR Dashboard */}
                    <div className="dashboard-card absolute inset-0 w-full h-full opacity-0">
                        <HRDashboard />
                    </div>

                    {/* Employee Dashboard */}
                    <div className="dashboard-card absolute inset-0 w-full h-full opacity-0">
                        <EmployeeDashboard />
                    </div>
                </div>

                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-16">
                    {[
                        { id: "admin", label: "01. Admin" },
                        { id: "hr", label: "02. HR Portal" },
                        { id: "employee", label: "03. My Space" }
                    ].map((item, i) => (
                        <div
                            key={item.id}
                            onClick={() => handleIndicatorClick(i)}
                            className="indicator-item group flex flex-col gap-3 cursor-pointer opacity-50 transition-all hover:opacity-100"
                        >
                            <span className="text-[10px] font-mono tracking-[0.3em] uppercase transition-colors text-muted group-hover:text-foreground">
                                {item.label}
                            </span>
                            <div className="relative w-24 h-[1px] bg-foreground/10 overflow-hidden">
                                <div className="absolute inset-0 bg-foreground/30 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
