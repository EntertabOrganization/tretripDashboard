"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./login.module.css";
import { Lock, Mail, ArrowRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (!success) {
      toast.error("Invalid credentials. Please use admin@entertab.com / Admin@1234");
    } else {
      toast.success("Welcome back!");
    }
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}></div>
          </div>
          <h1>Welcome Back</h1>
          <p>Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={20} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@entertab.com"
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            <span>Sign In</span>
            <ArrowRight size={20} />
          </button>
        </form>

        <div className={styles.footer}>
          <p>Demo Credentials: <b>admin@entertab.com</b> / <b>Admin@1234</b></p>
        </div>
      </div>
    </div>
  );
}
