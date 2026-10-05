"use client";

import React, { useState } from "react";
import { useRole, UserRole } from "@/context/role-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Lock, Mail, User, Shield, Zap, CheckCircle2, UserCheck, Image, Camera, Upload } from "lucide-react";

const PRESET_AVATARS = [
  { label: "Runner", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
  { label: "Athlete", url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80" },
  { label: "Warrior", url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80" },
  { label: "Player", url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80" },
  { label: "Coach", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
  { label: "Champion", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
];

export function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    login,
    register,
  } = useRole();

  const [activeTab, setActiveTab] = useState<"login" | "register">(authModalTab);
  const [selectedRole, setSelectedRole] = useState<UserRole>("user");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(PRESET_AVATARS[0].url);
  const [customAvatar, setCustomAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  React.useEffect(() => {
    setActiveTab(authModalTab);
    setErrorMsg("");
    setSuccessMsg("");
  }, [authModalTab, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const currentAvatar = customAvatar.trim() || avatarUrl;

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setCustomAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMsg("Please enter both username and password");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    try {
      const res = await login(username.trim(), password.trim(), selectedRole, currentAvatar);
      if (res.success) {
        setSuccessMsg(`Welcome, ${username}! (${selectedRole === "admin" ? "Admin Mode" : "Fan View"})`);
        setTimeout(() => {
          closeAuthModal();
        }, 700);
      } else {
        setErrorMsg(res.error || "Login failed. Please check credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMsg("Username and password are required");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    try {
      const res = await register(
        username.trim(),
        email.trim() || `${username.trim()}@sport.com`,
        password.trim(),
        selectedRole,
        currentAvatar
      );
      if (res.success) {
        setSuccessMsg(`Account created successfully! Welcome, ${username}! (${selectedRole === "admin" ? "Admin Mode" : "Fan View"})`);
        setTimeout(() => {
          closeAuthModal();
        }, 700);
      } else {
        setErrorMsg(res.error || "Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fillQuickAdmin = () => {
    setUsername("admin");
    setPassword("admin123");
    setSelectedRole("admin");
    setAvatarUrl(PRESET_AVATARS[4].url); // Coach/Admin avatar
    setErrorMsg("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto bg-white dark:bg-[#151B10] border border-[#E2E6D5] dark:border-[#26331B] text-[#12150D] dark:text-[#F8F9F3] rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#EEF2E4] dark:bg-[#1E2816] flex items-center justify-center text-[#12150D] dark:text-[#F8F9F3] hover:bg-[#12150D] hover:text-[#C6FE56] cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          {/* Live Avatar Preview - Clickable to Upload */}
          <label className="relative w-16 h-16 mx-auto mb-2.5 block cursor-pointer group" title="Click to upload custom photo from device">
            <img
              src={currentAvatar}
              alt="Avatar Preview"
              className="w-16 h-16 rounded-full object-cover border-2 border-[#C6FE56] shadow-md ring-4 ring-[#C6FE56]/20 transition-all group-hover:ring-[#C6FE56]/50 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = PRESET_AVATARS[0].url;
              }}
            />
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#12150D] text-[#C6FE56] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <Camera className="w-3 h-3" />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarFile}
              className="hidden"
            />
          </label>

          <div className="flex items-center justify-center mb-1">
            <img
              src="/sporty-logo.png"
              alt="Sporty Logo"
              className="h-9 w-auto object-contain drop-shadow-sm"
            />
          </div>
          <p className="text-xs text-[#616D54] dark:text-[#A2AF93] mt-0.5">
            {activeTab === "login"
              ? "Sign in with your selected role and athlete avatar"
              : "Register your free account with a custom avatar"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-[#F8F9F3] dark:bg-[#0D1009] border border-[#E2E6D5] dark:border-[#26331B] rounded-full mb-4">
          <button
            type="button"
            onClick={() => {
              setActiveTab("login");
              setErrorMsg("");
            }}
            className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "login"
                ? "bg-[#12150D] dark:bg-[#C6FE56] text-[#C6FE56] dark:text-[#12150D] shadow-sm"
                : "text-[#616D54] dark:text-[#A2AF93] hover:text-[#12150D] dark:hover:text-[#C6FE56]"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("register");
              setErrorMsg("");
            }}
            className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "register"
                ? "bg-[#12150D] dark:bg-[#C6FE56] text-[#C6FE56] dark:text-[#12150D] shadow-sm"
                : "text-[#616D54] dark:text-[#A2AF93] hover:text-[#12150D] dark:hover:text-[#C6FE56]"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Role Selection */}
        <div className="mb-4">
          <label className="text-[11px] font-bold text-[#616D54] dark:text-[#A2AF93] uppercase tracking-wider block mb-1.5">
            Select Your Role
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSelectedRole("user")}
              className={`p-2 rounded-2xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                selectedRole === "user"
                  ? "bg-[#12150D] dark:bg-[#C6FE56] text-[#C6FE56] dark:text-[#12150D] border-[#12150D] dark:border-[#C6FE56]"
                  : "bg-[#F8F9F3] dark:bg-[#0D1009] text-[#616D54] dark:text-[#A2AF93] border-[#E2E6D5] dark:border-[#26331B] hover:border-[#12150D] dark:hover:border-[#C6FE56] hover:text-[#12150D] dark:hover:text-[#C6FE56]"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Fan / Athlete
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("admin")}
              className={`p-2 rounded-2xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                selectedRole === "admin"
                  ? "bg-[#12150D] dark:bg-[#C6FE56] text-[#C6FE56] dark:text-[#12150D] border-[#12150D] dark:border-[#C6FE56]"
                  : "bg-[#F8F9F3] dark:bg-[#0D1009] text-[#616D54] dark:text-[#A2AF93] border-[#E2E6D5] dark:border-[#26331B] hover:border-[#12150D] dark:hover:border-[#C6FE56] hover:text-[#12150D] dark:hover:text-[#C6FE56]"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Administrator
            </button>
          </div>
        </div>

        {/* Avatar Preset Picker */}
        <div className="mb-4 p-3 rounded-2xl bg-[#F8F9F3] dark:bg-[#0D1009] border border-[#E2E6D5] dark:border-[#26331B]">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-bold text-[#12150D] dark:text-[#F8F9F3] uppercase tracking-wider flex items-center gap-1">
              <Image className="w-3 h-3 text-emerald-700 dark:text-[#C6FE56]" />
              Choose Athlete Avatar
            </label>
            <span className="text-[10px] text-[#8E9B7E] dark:text-[#A2AF93]">Click to select</span>
          </div>

          <div className="flex items-center justify-between gap-1.5 mb-2.5 overflow-x-auto pb-1">
            {PRESET_AVATARS.map((av, idx) => {
              const isSelected = avatarUrl === av.url && !customAvatar;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setAvatarUrl(av.url);
                    setCustomAvatar("");
                  }}
                  className={`relative shrink-0 rounded-full transition-all cursor-pointer ${
                    isSelected
                      ? "ring-3 ring-[#C6FE56] scale-110 shadow-sm"
                      : "opacity-75 hover:opacity-100 hover:scale-105"
                  }`}
                  title={av.label}
                >
                  <img
                    src={av.url}
                    alt={av.label}
                    className="w-9 h-9 rounded-full object-cover border border-[#E2E6D5]"
                  />
                </button>
              );
            })}
          </div>

          {/* Custom Avatar URL or Device Upload */}
          <div className="flex items-center gap-1.5">
            <Input
              value={customAvatar.startsWith("data:") ? "Local photo loaded from device" : customAvatar}
              onChange={(e) => setCustomAvatar(e.target.value)}
              placeholder="Or paste custom image URL (https://...)"
              className="text-xs h-8 rounded-xl bg-white dark:bg-[#0D1009] border-[#E2E6D5] dark:border-[#26331B] text-[#12150D] dark:text-[#F8F9F3] focus:ring-[#C6FE56] flex-1"
            />
            <label className="cursor-pointer inline-flex items-center px-2.5 h-8 rounded-xl text-[11px] font-bold border border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#1E2816] hover:bg-[#EEF2E4] dark:hover:bg-[#28351D] text-[#12150D] dark:text-[#F8F9F3] transition shrink-0">
              <Upload className="w-3 h-3 mr-1 text-emerald-700 dark:text-[#C6FE56]" />
              Device
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarFile}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Alert Messages */}
        {errorMsg && (
          <div className="mb-3.5 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-3.5 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            {successMsg}
          </div>
        )}

        {/* Sign In Form */}
        {activeTab === "login" && (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-[#12150D] dark:text-[#F8F9F3] block mb-1">
                Username or Email
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9B7E]" />
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin or fan_runner"
                  required
                  className="pl-10 rounded-2xl border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-[#12150D] dark:text-[#F8F9F3] text-sm h-10"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#12150D] dark:text-[#F8F9F3] block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9B7E]" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-10 rounded-2xl border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-[#12150D] dark:text-[#F8F9F3] text-sm h-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-full bg-[#12150D] dark:bg-[#C6FE56] hover:bg-[#1C2215] dark:hover:bg-[#B3E848] text-[#C6FE56] dark:text-[#12150D] font-black text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01]"
            >
              {loading ? "Signing in..." : `Sign In as ${selectedRole === "admin" ? "Admin" : "Fan"}`}
            </Button>

            {/* Quick Demo Fill */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={fillQuickAdmin}
                className="text-xs font-bold text-emerald-700 dark:text-[#C6FE56] hover:text-emerald-900 dark:hover:text-[#D9FF70] underline underline-offset-4 cursor-pointer inline-flex items-center gap-1"
              >
                <Shield className="w-3.5 h-3.5" />
                Fill Admin Demo Credentials (1-Click)
              </button>
            </div>
          </form>
        )}

        {/* Register Form */}
        {activeTab === "register" && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-[#12150D] dark:text-[#F8F9F3] block mb-1">
                Username *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9B7E]" />
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. sokha_athlete"
                  required
                  className="pl-10 rounded-2xl border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-[#12150D] dark:text-[#F8F9F3] text-sm h-10"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#12150D] dark:text-[#F8F9F3] block mb-1">
                Email Address (Optional)
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9B7E]" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sokha@sport.com.kh"
                  className="pl-10 rounded-2xl border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-[#12150D] dark:text-[#F8F9F3] text-sm h-10"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#12150D] dark:text-[#F8F9F3] block mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9B7E]" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-10 rounded-2xl border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-[#12150D] dark:text-[#F8F9F3] text-sm h-10"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#12150D] dark:text-[#F8F9F3] block mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9B7E]" />
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-10 rounded-2xl border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-[#12150D] dark:text-[#F8F9F3] text-sm h-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-full bg-[#12150D] dark:bg-[#C6FE56] hover:bg-[#1C2215] dark:hover:bg-[#B3E848] text-[#C6FE56] dark:text-[#12150D] font-black text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01] mt-2"
            >
              {loading ? "Creating Account..." : `Register as ${selectedRole === "admin" ? "Admin" : "Fan"}`}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
