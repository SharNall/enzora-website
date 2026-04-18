"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AdminUser {
  uid: string;
  email: string;
}

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        // Check if firebase_token cookie exists and user data in localStorage
        const userData = localStorage.getItem("admin_user");
        const hasCookie = document.cookie.includes("firebase_token");

        if (userData && hasCookie) {
          const user = JSON.parse(userData);
          setUser(user);
        } else if (pathname.startsWith("/admin") && !pathname.includes("/login")) {
          // If on protected route without auth, redirect to login
          router.push("/admin/login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("admin_user");
        if (pathname.startsWith("/admin") && !pathname.includes("/login")) {
          router.push("/admin/login");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  const logout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      localStorage.removeItem("admin_user");
      setUser(null);
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
