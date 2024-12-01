'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Code, Bug, Rocket, GraduationCap, Settings, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

const sidebarItems = [
  { icon: Code, href: '/', label: 'File Explorer' },
  { icon: Bug, href: '/debugger', label: 'Debugger' },
  { icon: Rocket, href: '/deploy', label: 'Deploy & Run' },
  { icon: GraduationCap, href: '/learn', label: 'Learn' },
  { icon: Layers, href: '/orchestration', label: 'Orchestration' },
  { icon: Settings, href: '/settings', label: 'Settings' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-16 bg-[#2a2c3b] border-r border-[#3a3c4b] flex flex-col items-center py-4">
      {sidebarItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "p-3 rounded-md mb-2",
            pathname === item.href
              ? "bg-[#1a1b1c] text-[#3498db]"
              : "text-[#9a9a9a] hover:bg-[#1a1b1c] hover:text-white"
          )}
          title={item.label}
        >
          <item.icon className="w-6 h-6" />
        </Link>
      ))}
    </div>
  )
}

