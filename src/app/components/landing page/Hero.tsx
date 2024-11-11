"use client"

import React from 'react'
import { motion } from 'framer-motion'
import InnerShadowButton from './InnerShadowButton'

const AnimatedHeadline = ({ text }: { text: string }) => {
    const words = text.split(" ");
    return (
        <h1 className="text-balance max-w-[900px] text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-6 text-foreground">
            {words.map((word, index) => (
                <motion.span
                    className={`inline-block ${word === "Studify" ? "bg-gradient-to-r from-primary from-60% to-foreground text-transparent bg-clip-text" : ""}`}
                    key={word}
                    initial={{ opacity: 0, filter: "blur(16px)", y: 8 + 1 * (index + 2) }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                        delay: 0.04 * (index + 12),
                        type: "spring",
                        bounce: 0,
                        duration: 0.7 + 0.1 * (index + 4),
                    }}
                >
                    {word}&#160;
                </motion.span>
            ))}
        </h1>
    )
}

export const Hero = () => {

    return (
        <div id='home' className="relative min-h-fit px-3 py-12 sm:pt-36 w-full overflow-hidden bg-background ">
            <div className="relative z-20 mb-12 flex flex-col items-center justify-center min-h-fit ">
                <AnimatedHeadline text="Transform Your Learning with Studify" />
                <motion.p
                    className="text-sm sm:text-lg text-center mb-8 max-w-2xl text-muted-foreground"
                    initial={{ filter: "blur(12px)", opacity: 0, y: 24 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        bounce: 0,
                        duration: 1.8,
                        delay: 1,
                    }}
                >
                    Upload, organize, and share AI-generated study plans, complete with daily schedules, resources, quizzes, summaries, and more!
                </motion.p>
                <motion.div
                    initial={{ filter: "blur(12px)", opacity: 0, y: 16 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        bounce: 0,
                        duration: 1.4,
                        delay: 1.2,
                    }}
                >
                    <InnerShadowButton
                        title="Get Started"
                    />
                </motion.div>
            </div>
        </div>
    )
}
