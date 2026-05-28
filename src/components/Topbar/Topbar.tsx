"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import styles from "./Topbar.module.css";
import { Bell, Search, LogOut, User } from "lucide-react";

export default function Topbar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  // Simple logic to format the pathname into a title
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard Overview";
    
    // e.g. "/dashboard/travel-tourism" -> "Travel Tourism"
    const parts = pathname.split("/");
    const lastPart = parts[parts.length - 1];
    
    return lastPart
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <h1 className={styles.pageTitle}>{getPageTitle()}</h1>
      </div>

      <div className={styles.right}>
        <div className={styles.search}>
          <Search size={18} className={styles.searchIcon} />
          <input type="text" placeholder="Search..." />
        </div>

        <button className={styles.iconBtn}>
          <Bell size={20} />
          <span className={styles.badge}></span>
        </button>

        <div className={styles.divider}></div>

        <div className={styles.profile}>
          <div className={styles.avatar}>
            <User size={18} color="#fff" />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Admin User</span>
            <span className={styles.userRole}>Administrator</span>
          </div>
        </div>

        <button className={styles.logoutBtn} onClick={logout} title="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
