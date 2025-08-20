'use client'

import * as React from "react"
import {
  Home,
  Bell,
  Users,
  Calendar,
  Heart,
  User,
  Briefcase,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  Package, FileCheck
} from 'lucide-react'
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
    submenu: [
      {
        title: "Services/Offres",
        url: "/services_offres",
        icon: Package,
      },
      {
        title: "Voir mes candidatures",
        url: "/candidatures",
        icon: FileCheck,
      },
      {
        title: "Voir mes offres/services",
        url: "/offres-services",
        icon: Briefcase,
      },
    ]
  },
]

interface SidebarProps {
  isOpen?: boolean
  onToggle?: () => void
}

export default function Sidebar() {
  const [activeItem, setActiveItem] = React.useState("Home");
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);

  const toggleSubmenu = (e: React.MouseEvent, title: string) => {
    e.preventDefault(); // Empêche la navigation immédiate
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

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
                    const hasSubmenu = item.submenu && item.submenu.length > 0;
                    const isSubmenuOpen = openSubmenu === item.title;
                    // On vérifie si l'URL actuelle ou une URL du sous-menu correspond à l'élément actif
                    const isActive =
                        activeItem === item.title ||
                        (isSubmenuOpen && item.submenu?.some(subItem => activeItem === subItem.title));


                    return (
                        <li key={item.title}>
                          {/* Utilisation de Link pour la navigation */}
                          <Link
                              href={item.url}
                              onClick={(e) => {
                                if (hasSubmenu) {
                                  toggleSubmenu(e, item.title);
                                }
                                setActiveItem(item.title);
                              }}
                              className={`
                          flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                          ${isActive ? 'bg-gray-200 text-black' : 'text-black hover:bg-gray-50 hover:text-black'}
                        `}
                          >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'text-gray-600'}`}
                                  fill={isActive ? 'black' : 'none'}
                            />
                            <span>{item.title}</span>
                            {/* Ajout de la flèche de sous-menu */}
                            {hasSubmenu && (isSubmenuOpen ? <ChevronUp className="ml-auto w-4 h-4" /> : <ChevronDown className="ml-auto w-4 h-4" />)}
                          </Link>

                          {/* Affichage du sous-menu s'il est ouvert */}
                          {hasSubmenu && isSubmenuOpen && (
                              <ul className="ml-8 mt-1 space-y-1">
                                {item.submenu?.map((subItem) => {
                                  const SubIcon = subItem.icon;
                                  const isSubActive = activeItem === subItem.title;
                                  return (
                                      <li key={subItem.title}>
                                        <Link
                                            href={subItem.url}
                                            onClick={() => setActiveItem(subItem.title)}
                                            className={`
                                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                                    ${isSubActive ? 'bg-gray-200 text-black' : 'text-black hover:bg-gray-50 hover:text-black'}
                                  `}
                                        >
                                          <SubIcon className={`w-4 h-4 ${isSubActive ? 'text-black' : 'text-gray-600'}`} />
                                          <span>{subItem.title}</span>
                                        </Link>
                                      </li>
                                  );
                                })}
                              </ul>
                          )}
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