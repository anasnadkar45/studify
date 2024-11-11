'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BorderBeam } from '@/components/ui/border-beam'

interface StaticContainerProps {
    titleComponent: React.ReactNode
    children: React.ReactNode
}

export const ContainerScroll: React.FC<StaticContainerProps> = ({
    titleComponent,
    children,
}) => {
    return (
        <div className="flex flex-col items-center justify-center relative p-4 md:p-6">
            <div className="w-full relative" style={{ perspective: '1000px' }}>
                {/* <Header titleComponent={titleComponent} /> */}
                <Card>{children}</Card>
            </div>
        </div>
    )
}

const Header: React.FC<{ titleComponent: React.ReactNode }> = ({ titleComponent }) => {
    return (
        <div className="max-w-5xl mx-auto text-center mb-6 sm:mb-4 px-4 sm:px-0">
            {titleComponent}
        </div>
    )
}

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <motion.div
            initial={{ rotateX: 20, scale: 0.9 }}
            animate={{ rotateX: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative max-w-5xl mx-auto h-[30rem] sm:h-[35rem] md:h-[40rem] w-full p-4 sm:p-5 bg-[#222222] rounded-[20px] sm:rounded-[25px] md:rounded-[30px]"
        >
            <div className="h-full w-full rounded-2xl bg-zinc-900 md:rounded-2xl md:p-6">
                {children}
            </div>
            <BorderBeam size={250} duration={12} delay={9} />
        </motion.div>
    )
}
