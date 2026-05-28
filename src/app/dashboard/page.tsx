import styles from "./dashboard.module.css";
import { Users, Building, Globe, Car, Plane } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "Total Bookings", value: "1,248", change: "+12%", icon: Plane, color: "#3b82f6" },
    { label: "Active Clients", value: "842", change: "+5%", icon: Users, color: "#10b981" },
    { label: "Hajj & Umrah", value: "356", change: "+18%", icon: Globe, color: "#f59e0b" },
    { label: "Transport Services", value: "624", change: "-2%", icon: Car, color: "#8b5cf6" },
    { label: "Business Clients", value: "128", change: "+24%", icon: Building, color: "#ec4899" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Overview</h2>
        <p>Welcome to the TreTrip Admin Dashboard. Here is what is happening today.</p>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith("+");
          
          return (
            <div key={index} className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>{stat.label}</span>
                <div className={styles.iconWrapper} style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                  <Icon size={20} />
                </div>
              </div>
              <div className={styles.statBody}>
                <h3 className={styles.statValue}>{stat.value}</h3>
                <span className={`${styles.statChange} ${isPositive ? styles.positive : styles.negative}`}>
                  {stat.change} from last month
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.chartSection}>
        <div className={styles.chartCard}>
          <h3>Recent Activity Placeholder</h3>
          <div className={styles.placeholderChart}>
            <p>Chart will be rendered here.</p>
          </div>
        </div>
        <div className={styles.chartCard}>
          <h3>System Status</h3>
          <div className={styles.placeholderChart}>
            <p>All systems operational.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
