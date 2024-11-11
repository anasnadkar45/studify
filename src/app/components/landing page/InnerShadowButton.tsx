'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'

interface InnerShadowButtonProps {
    title: string
}

export default function InnerShadowButton({ title }: InnerShadowButtonProps) {
    return (
        <RegisterLink>
            <motion.div
                className="relative bg-card rounded-full overflow-hidden group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Button
                    variant="ghost"
                    className="w-full h-full py-4 px-10 overflow-hidden hover:bg-primary text-muted-foreground hover:text-white transition-all duration-300"
                >
                    <div className="relative z-20">
                        <h2 className="text-xl font-semibold">{title}</h2>
                    </div>
                </Button>

                {/* Inner shadow effect */}
                <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.3)] dark:shadow-[inset_0_0_30px_rgba(255,255,255,0.1)] rounded-2xl z-10 pointer-events-none" />
            </motion.div>
        </RegisterLink>

    )
}

// Animation keyframes
const gradientAnimation = `
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`

// Add the animation to the global styles
if (typeof document !== 'undefined') {
    const style = document.createElement('style')
    style.textContent = gradientAnimation
    document.head.appendChild(style)
}