'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Crown, HomeIcon, Settings, Goal, Wallet, Receipt, BarChart3, HelpCircle, Network, BrainCircuitIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Logo from '../../../../public/Logo.svg'

const sidebarLinks = [
  {
    category: "MENU",
    links: [
      { id: 0, name: "Dashboard", href: "/dashboard", icon: HomeIcon },
      { id: 1, name: "StudyPlan", href: "/study-plan", icon: BrainCircuitIcon },
      { id: 2, name: "My Goals", href: "/goals", icon: Goal },
      { id: 3, name: "Investment", href: "/investment", icon: Wallet },
      { id: 4, name: "Bills and Payment", href: "/bills", icon: Receipt },
      { id: 5, name: "Analytics and Reports", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    category: "SUPPORT",
    links: [
      { id: 0, name: "Helps", href: "/help", icon: HelpCircle },
      { id: 1, name: "Integration", href: "/integration", icon: Network },
      { id: 2, name: "Settings", href: "/settings", icon: Settings },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex flex-col h-screen w-[260px] bg-card border-r">
      <div className="flex items-center border-b h-16 gap-3 p-4">
        <div className="flex p-1 items-center justify-center rounded-lg bg-teal-500">
          <Image src={Logo} alt="Studify" className="size-8" />
        </div>
        <div>
          <h1 className="font-semibold">Studify</h1>
          <p className="text-sm text-zinc-400">Study Planner</p>
        </div>
      </div>

      <div className="flex h-full flex-col justify-between p-2">
        <div className="space-y-6 mt-4">
          {sidebarLinks.map((section) => (
            <div key={section.category} className="space-y-1">
              <h2 className="px-4 text-xs font-bold text-zinc-500">{section.category}</h2>
              <nav className="space-y-1">
                {section.links.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white",
                      pathname.includes(link.href)  && "bg-primary text-slate-950 hover:bg-primary/90 hover:text-slate-800"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="mx-2 rounded-lg bg-zinc-800/50 p-4">
          <div className="text-center">
            <h3 className="font-medium">Become Pro Access</h3>
            <p className="mt-1 text-sm text-zinc-400">Try your experience for using more features</p>
          </div>
          <Button className="mt-4 w-full bg-[#EEB58F] font-medium text-zinc-900 hover:bg-[#d7a07b]">
            <Crown className="mr-2 h-4 w-4" />
            Upgrade Pro
          </Button>
        </div>
      </div>
    </div>
  )
}