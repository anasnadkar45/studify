'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Logo from '../../../../public/Logo.svg'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    // const navItems = [
    //     { name: 'Features', href: '#features' },
    //     { name: 'Pricing', href: '#pricing' },
    //     { name: 'Blog', href: '/blog' },
    //     { name: 'About', href: '/about' },
    // ]

    return (
        <nav className="bg-card border-2 mt-2 rounded-md">
            <div className="max-w-container mx-auto px-3 sm:px-6 lg:px-6">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <div className="flex p-1 items-center justify-center rounded-lg bg-teal-500">
                                <Image src={Logo} alt="Studify" className="size-8" />
                            </div>
                            <span className="ml-2 text-2xl font-bold">Studify</span>
                        </Link>
                    </div>
                    {/* <div className="hidden sm:ml-6 sm:flex sm:items-center gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="px-3 py-2 rounded-md text-sm font-medium text-foreground/50 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div> */}
                    <div className="ml-6 flex items-center">
                        <Button variant="secondary" asChild>
                            <LoginLink>Log in</LoginLink>
                        </Button>
                        <Button className="ml-2" asChild>
                            <RegisterLink>Sign up</RegisterLink>
                        </Button>
                    </div>
                    {/* <div className="flex items-center sm:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-gray-500">
                                    <span className="sr-only">Open main menu</span>
                                    {isOpen ? (
                                        <X className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Menu className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <nav className="flex flex-col gap-4">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                    <hr className="my-2 border-gray-200" />
                                    <Button variant="secondary" asChild className="justify-start">
                                        <LoginLink>Log in</LoginLink>
                                    </Button>
                                    <Button asChild className="justify-start">
                                        <RegisterLink>Sign up</RegisterLink>
                                    </Button>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div> */}
                </div>
            </div>
        </nav>
    )
}