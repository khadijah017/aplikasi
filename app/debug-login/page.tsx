"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function DebugLoginPage() {
  const router = useRouter();

  const defaultUsers = [
    {
      id: "1",
      username: "admin",
      email: "admin@perizinan.id",
      role: "admin",
      name: "Administrator",
      isActive: true,
      password: "admin123",
    },
    {
      id: "3",
      username: "pimpinan1",
      email: "pimpinan@perizinan.id",
      role: "pimpinan",
      name: "Pimpinan Dinas",
      isActive: true,
      password: "pimpinan123",
    },
    {
      id: "4",
      username: "survei1",
      email: "survei@perizinan.id",
      role: "tim_survei",
      name: "Tim Survei",
      isActive: true,
      password: "survei123",
    },
  ];

  const resetUsers = () => {
    localStorage.setItem("users", JSON.stringify(defaultUsers));
    localStorage.removeItem("currentUser");
    console.log("Users reset to defaults");
    alert("Users reset to defaults.\nTry logging in with admin/admin123");
  };

  const setAdminAndGo = () => {
    const admin = {
      id: "1",
      username: "admin",
      email: "admin@perizinan.id",
      role: "admin",
      name: "Administrator",
    };
    localStorage.setItem("currentUser", JSON.stringify(admin));
    console.log("currentUser set to admin", admin);
    router.push("/dashboard");
  };

  const logState = () => {
    console.log("currentUser:", localStorage.getItem("currentUser"));
    console.log("users:", localStorage.getItem("users"));
    alert("Check console for state logs");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="space-y-4 max-w-xl w-full">
        <h1 className="text-2xl font-bold">Debug Login</h1>
        <p className="text-sm text-gray-600">Use these buttons to inspect or set localStorage users/currentUser.</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={resetUsers}>
            Reset Users to Defaults
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={setAdminAndGo}>
            Set Admin & Open Dashboard
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded" onClick={logState}>
            Log current state
          </button>
        </div>
      </div>
    </div>
  );
}
