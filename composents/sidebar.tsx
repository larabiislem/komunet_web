'use client'

import * as React from "react"
import { Home, Bell, Users, Calendar, Heart, User, Briefcase } from 'lucide-react'
import Link from "next/link"

const menuItems = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
  {
    title: "Groupes",
    url: "/groupes",
    icon: Users,
  },
  {
    title: "Événements",
    url: "/events",
    icon: Calendar,
  },
  {
    title: "Mes Favoris",
    url: "/favorites",
    icon: Heart,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Services/Offres",
    url: "/services_offres",
    icon: Briefcase,
  },
]

interface SidebarProps {
  isOpen?: boolean
  onToggle?: () => void
}

export default function Sidebar() {
  const [activeItem, setActiveItem] = React.useState("Home")

  return (
    <>
  
      <div className={`
       fixed top-20 left-5 h-full w-70 bg-white border-r border-gray-200 shadow-lg z-50 rounded-[15px]
          hidden md:block
      
      `}>

        <div className="flex flex-col h-full">
          <div className="flex-1 py-4">
            <nav className="px-2">
              <ul className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeItem === item.title
                  return (
                   <li key={item.title}>
                  <Link
                    href={item.url}
                    onClick={() => setActiveItem(item.title)}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                      ${isActive 
                        ? 'bg-gray-200 text-black ' 
                        : 'text-black hover:bg-gray-50 hover:text-black'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'text-gray-600'}`}
                      fill={isActive ? 'black' : 'none'}
                    />
                    <span>{item.title}</span>
                  </Link>
                </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}