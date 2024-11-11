'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, BrainCircuitIcon, Globe, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const bottomNavLinks = [
  { id: 0, name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { id: 1, name: "StudyPlan", href: "/study-plan", icon: BrainCircuitIcon },
  { id: 2, name: "Community", href: "/community", icon: Globe },
  { id: 3, name: "Settings", href: "/settings/profile", icon: Settings },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 pb-4 px-4 pointer-events-none">
      <nav className="bg-card border rounded-md shadow-lg pointer-events-auto">
        <div className="flex justify-around items-center h-16">
          {bottomNavLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center text-xs font-medium text-zinc-400 transition-colors rounded-md p-2",
                pathname.includes(link.href) && "text-primary bg-primary/10",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              <link.icon className="h-5 w-5 mb-1" />
              <span className="sr-only">{link.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}