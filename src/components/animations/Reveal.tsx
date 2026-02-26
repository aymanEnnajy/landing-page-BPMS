import React from "react"
import { motion, useInView } from "framer-motion"

interface RevealProps {
    children: React.ReactNode
    width?: "fit-content" | "100%"
    delay?: number
    duration?: number
    y?: number
    x?: number
    overflow?: "hidden" | "visible"
}

export const Reveal = ({
    children,
    width = "fit-content",
    delay = 0.2,
    duration = 0.5,
    y = 20,
    x = 0,
    overflow = "hidden"
}: RevealProps) => {
    const ref = React.useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <div ref={ref} style={{ position: "relative", width, overflow }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y, x },
                    visible: { opacity: 1, y: 0, x: 0 },
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration, delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    )
}
