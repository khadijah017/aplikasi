"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useLicenses } from "@/contexts/license-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, AlertCircle } from "lucide-react";
import { ProtectedRoute } from "@/components/protected-route";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminHeader } from "@/components/layout/admin-header";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { licenses, isLoading, getOverdueLicenses } = useLicenses();

  useEffect(() => {
    if (user && user.role !== "pimpinan") {
      router.replace("/licenses");
    }
  }, [router, user]);

  const overdueLicenses = getOverdueLicenses();
  const waitingForSignature = licenses.filter(
    (license) => license.status === "selesai" && !license.pimpinanVerified,
  ).length;

  const stats = [
    {
      title: "Jumlah Permohonan",
      value: licenses.length,
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Menunggu TTD",
      value: waitingForSignature,
      icon: Clock,
      color: "text-amber-600",
    },
    {
      title: "Terlambat",
      value: overdueLicenses.length,
      icon: AlertCircle,
      color: "text-red-600",
    },
  ];

  if (!user || user.role !== "pimpinan") {
    return null;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <AdminSidebar />
        <AdminHeader />
        <main className="lg:pl-64 pb-8">
          <div className="max-w-6xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8 py-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Dashboard Pimpinan
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Ringkasan jumlah permohonan, yang menunggu TTD, dan yang
                terlambat.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.title} className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">
                        {stat.title}
                      </CardTitle>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className={`text-3xl font-bold ${stat.color}`}>
                        {isLoading ? "-" : stat.value}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
