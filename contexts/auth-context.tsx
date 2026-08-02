"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useUsers } from "@/contexts/user-context";

interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "pimpinan" | "tim_survei";
  name: string;
}

const DEFAULT_USERS = [
  {
    id: "1",
    username: "admin",
    email: "admin@perizinan.id",
    role: "admin",
    name: "Administrator",
    password: "admin123",
    isActive: true,
  },
  {
    id: "3",
    username: "pimpinan1",
    email: "pimpinan@perizinan.id",
    role: "pimpinan",
    name: "Pimpinan Dinas",
    password: "pimpinan123",
    isActive: true,
  },
  {
    id: "4",
    username: "survei1",
    email: "survei@perizinan.id",
    role: "tim_survei",
    name: "Tim Survei",
    password: "survei123",
    isActive: true,
  },
];

const normalize = (value: any) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { users } = useUsers();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Convert old roles to new role system: staff/pemohon/user -> pimpinan
        const roleStr = parsedUser.role as string;
        if (roleStr === "staff" || roleStr === "pemohon" || roleStr === "user") {
          parsedUser.role = "pimpinan";
          localStorage.setItem("currentUser", JSON.stringify(parsedUser));
        }
        // Allow tim_survei as-is
        setUser(parsedUser);
        console.log("User loaded from localStorage:", parsedUser);
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("currentUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    setIsLoading(true);
    console.log("Login attempt:", { username, password });
    console.log("Available users:", users);

    const normalize = (value: any) =>
      typeof value === "string" ? value.trim().toLowerCase() : "";

    const normalizedUsername = normalize(username);

    // Try to find user from context first, then fallback to localStorage
    let foundUser = users.find(
      (u) => normalize(u.username) === normalizedUsername && u.isActive,
    );

    // If not found in context, try localStorage
    if (!foundUser) {
      try {
        const savedUsers = localStorage.getItem("users");
        if (savedUsers) {
          const parsedUsers = JSON.parse(savedUsers);
          foundUser = parsedUsers.find(
            (u: any) =>
              normalize(u.username) === normalizedUsername &&
              (u.isActive === true || u.isActive === undefined),
          );
          console.log(
            "Found user from localStorage:",
            foundUser
              ? { username: foundUser.username, role: foundUser.role }
              : null,
          );
        }
      } catch (error) {
        console.error("Error loading users from localStorage:", error);
      }
    }

    console.log(
      "Found user:",
      foundUser
        ? {
            username: foundUser.username,
            role: foundUser.role,
            hasPassword: !!foundUser.password,
          }
        : null,
    );

    if (foundUser && foundUser.password === password) {
      // Convert old roles to new role system: staff/pemohon/user -> pimpinan
      let userRole: "admin" | "pimpinan" | "tim_survei" = foundUser.role as "admin" | "pimpinan" | "tim_survei";
      const roleStr = (foundUser.role as any);
      if (roleStr === "staff" || roleStr === "pemohon" || roleStr === "user") {
        userRole = "pimpinan";
      }

      // Ensure role is valid
      if (userRole !== "admin" && userRole !== "pimpinan" && userRole !== "tim_survei") {
        userRole = "pimpinan";
      }

      const authUser: User = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        role: userRole,
        name: foundUser.name,
      };
      setUser(authUser);
      localStorage.setItem("currentUser", JSON.stringify(authUser));
      console.log("Login successful:", authUser);
      setIsLoading(false);
      return true;
    }

    console.log("Login failed: Invalid credentials or user not found");
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    console.log("Logging out user:", user);
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
