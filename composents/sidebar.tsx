'use client'

import * as React from "react"
import { usePathname } from "next/navigation"
import { Home, Bell, Users, Calendar, Heart, User, Briefcase, ClipboardList, Menu, X } from 'lucide-react'
import Link from "next/link"

const menuItems = [
  { title: "Home", url: "/home", icon: Home },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Groupes", url: "/groupes", icon: Users },
  { title: "Événements", url: "/events", icon: Calendar },
  { title: "Mes Favoris", url: "/favorites", icon: Heart },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Services/Offres", url: "/services_offres", icon: Briefcase },
  { title: "Voir mes candidatures", url: "/candidatures", icon: ClipboardList },
  { title: "voir mes offres/services", url: "/offres-services", icon: Briefcase },
]

interface SidebarProps {
  isOpen?: boolean
  onToggle?: () => void
}

export default function Sidebar({ isOpen: controlledOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const isOpen = controlledOpen ?? mobileOpen

  const closeMobile = () => {
    setMobileOpen(false)
    onToggle?.()
  }

  const NavLinks = (
    <nav className="px-2">
      <ul className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.url || pathname?.startsWith(item.url + "/")
          return (
            <li key={item.title}>
              <Link
                href={item.url}
                onClick={closeMobile}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                  ${isActive ? 'bg-gray-200 text-black' : 'text-black hover:bg-gray-50'}
                `}
              >
                <Icon className="w-5 h-5 text-black" />
                <span>{item.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )

  return (
    <>
      {/* Desktop sidebar (>= md) */}
      <div
        className={`
          hidden md:block
          fixed top-20 left-5 h-[calc(100vh-6rem)] w-72 bg-white border border-gray-200
          shadow-xl rounded-[15px] z-30
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 py-4 overflow-y-auto">{NavLinks}</div>
        </div>
      </div>

      {/* Mobile: floating toggle button */}
      <button
        type="button"
        className="md:hidden fixed bottom-4 left-4 z-40 rounded-full bg-black text-white px-4 py-2 shadow-lg active:scale-95 transition"
        onClick={() => setMobileOpen(true)}
        aria-label="Ouvrir le menu"
      >
        <span className="inline-flex items-center gap-2">
          <Menu className="w-5 h-5" />
          Menu
        </span>
      </button>

      {/* Mobile drawer */}
      <div className={`md:hidden ${isOpen ? 'fixed' : 'hidden'} inset-0 z-50`}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={closeMobile}
          aria-hidden="true"
        />
        {/* Panel */}
        <div
          className={`
            absolute left-0 top-0 h-full w-72 bg-white shadow-2xl border-r border-gray-200
            rounded-r-2xl p-3 flex flex-col
          `}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-1 py-1.5">
            <span className="font-semibold text-black">Navigation</span>
            <button
              onClick={closeMobile}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-black" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-2">{NavLinks}</div>
        </div>
      </div>
    </>
  )
}