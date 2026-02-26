import * as React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-2xl border border-accent bg-background p-6 shadow-sm transition-all hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5",
            className
        )}
        {...props}
    />
))
Card.displayName = "Card"

export { Card }
