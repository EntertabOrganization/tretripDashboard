"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";
import {
  LayoutDashboard,
  Plane,
  Car,
  Package,
  HeartPulse,
  MapPin,
  Building,
  Calendar,
  MessageSquare,
  Users,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Globe
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Travel Tourism", href: "/dashboard/travel-tourism", icon: Plane },
  { name: "Transportation", href: "/dashboard/transportation-services", icon: Car },
  { name: "Shipping", href: "/dashboard/shipping-services", icon: Package },
  { name: "Medical Tourism", href: "/dashboard/medical-tourism", icon: HeartPulse },
  { name: "Hajj & Umrah", href: "/dashboard/programs/hajj-umrah", icon: Globe },
  { name: "Explore USA", href: "/dashboard/programs/explore-usa", icon: MapPin },
  { name: "Explore Kingdom", href: "/dashboard/programs/explore-kingdom", icon: Building },
  { name: "Events", href: "/dashboard/events", icon: Calendar },
  { name: "Contact Us", href: "/dashboard/contact-us", icon: MessageSquare },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Business Services", href: "/dashboard/business-services", icon: Briefcase },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}></div>
          {!collapsed && <h2>TreTrip</h2>}
        </div>
        <button
          className={styles.collapseBtn}
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className={styles.nav}>
        <ul>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                  title={collapsed ? item.name : undefined}
                >
                  <Icon size={20} className={styles.icon} />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
