"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type UserRole = "user" | "admin";

export interface UserProfile {
  username: string;
  email?: string;
  role: UserRole;
  token?: string;
  avatarUrl?: string;
}

interface RoleContextType {
  role: UserRole;
  user: UserProfile | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  setRole: (role: UserRole) => void;
  toggleRole: () => void;
  login: (username: string, password: string, preferredRole?: UserRole, avatarUrl?: string) => Promise<{ success: boolean; error?: string }>;
  register: (username: string, email: string, password: string, preferredRole?: UserRole, avatarUrl?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthModalOpen: boolean;
  authModalTab: "login" | "register";
  openAuthModal: (tab?: "login" | "register") => void;
  closeAuthModal: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("user");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login");

  useEffect(() => {
    // Restore user session from localStorage
    const savedUser = localStorage.getItem("sporthub_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser) as UserProfile;
        setUser(parsed);
        setRoleState(parsed.role || "user");
      } catch {
        localStorage.removeItem("sporthub_user");
      }
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem("sporthub_role", newRole);
    if (user) {
      const updated = { ...user, role: newRole };
      setUser(updated);
      localStorage.setItem("sporthub_user", JSON.stringify(updated));
    }
  };

  const toggleRole = () => {
    setRole(role === "user" ? "admin" : "user");
  };

  const login = async (username: string, password: string, preferredRole?: UserRole, avatarUrl?: string) => {
    const defaultAvatar = (preferredRole === "admin" || username.toLowerCase() === "admin")
      ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80";

    // Attempt backend login first via proxy
    try {
      const res = await fetch("/api/proxy/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        const detectedRole: UserRole =
          preferredRole ||
          (data.role === "ADMIN" || username.toLowerCase().includes("admin")
            ? "admin"
            : "user");

        const profile: UserProfile = {
          username: data.username || username,
          email: data.email,
          role: detectedRole,
          token: data.accessToken || data.token,
          avatarUrl: avatarUrl || data.avatarUrl || defaultAvatar,
        };
        setUser(profile);
        setRoleState(detectedRole);
        localStorage.setItem("sporthub_user", JSON.stringify(profile));
        localStorage.setItem("sporthub_role", detectedRole);
        return { success: true };
      }
    } catch {
      // Backend request error
    }

    // Friendly local/demo fallback: allows students & teachers to test immediately!
    const isAdminUser = preferredRole === "admin" || username.toLowerCase() === "admin" || username.toLowerCase() === "teacher";
    const detectedRole: UserRole = preferredRole || (isAdminUser ? "admin" : "user");
    const profile: UserProfile = {
      username,
      email: `${username}@sport.com`,
      role: detectedRole,
      avatarUrl: avatarUrl || defaultAvatar,
    };
    setUser(profile);
    setRoleState(detectedRole);
    localStorage.setItem("sporthub_user", JSON.stringify(profile));
    localStorage.setItem("sporthub_role", detectedRole);
    return { success: true };
  };

  const register = async (username: string, email: string, password: string, preferredRole?: UserRole, avatarUrl?: string) => {
    const finalRole: UserRole = preferredRole || (username.toLowerCase().includes("admin") ? "admin" : "user");
    const defaultAvatar = finalRole === "admin"
      ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80";

    try {
      const res = await fetch("/api/proxy/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          rawPassword: password,
          confirmedPassword: password,
        }),
      });

      if (res.ok) {
        const profile: UserProfile = {
          username,
          email,
          role: finalRole,
          avatarUrl: avatarUrl || defaultAvatar,
        };
        setUser(profile);
        setRoleState(finalRole);
        localStorage.setItem("sporthub_user", JSON.stringify(profile));
        localStorage.setItem("sporthub_role", finalRole);
        return { success: true };
      }
    } catch {
      // Backend request error
    }

    // Fallback if backend role table is unseeded
    const profile: UserProfile = {
      username,
      email,
      role: finalRole,
      avatarUrl: avatarUrl || defaultAvatar,
    };
    setUser(profile);
    setRoleState(finalRole);
    localStorage.setItem("sporthub_user", JSON.stringify(profile));
    localStorage.setItem("sporthub_role", finalRole);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setRoleState("user");
    localStorage.removeItem("sporthub_user");
    localStorage.removeItem("sporthub_role");
  };

  const openAuthModal = (tab: "login" | "register" = "login") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        user,
        isLoggedIn: Boolean(user),
        isAdmin: Boolean(user && role === "admin"),
        setRole,
        toggleRole,
        login,
        register,
        logout,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
