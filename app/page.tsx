"use client";

import { useState } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { Dashboard } from "@/components/dashboard/dashboard";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginForm onSuccess={() => setIsLoggedIn(true)} />;
  }

  return <Dashboard onLogout={() => setIsLoggedIn(false)} />;
}
