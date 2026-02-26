import * as React from "react"
import { cn } from "../../lib/utils"

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ElementType
    children: React.ReactNode
}

export function Container({ as: Component = "div", className, children, ...props }: ContainerProps) {
    return (
        <Component
            className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}
            {...props}
        >
            {children}
        </Component>
    )
}

export function Section({ as: Component = "section", className, children, ...props }: ContainerProps) {
    return (
        <Component
            className={cn("py-20 lg:py-32 overflow-hidden", className)}
            {...props}
        >
            {children}
        </Component>
    )
}
