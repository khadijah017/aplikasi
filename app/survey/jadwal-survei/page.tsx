"use client";

import { useMemo, useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminHeader } from "@/components/layout/admin-header";
import { useLicenses } from "@/contexts/license-context";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, List, MapPin } from "lucide-react";

const viewOptions = [
  { value: "day", label: "Harian" },
  { value: "week", label: "Mingguan" },
];

export default function SurveySchedulePage() {
  const { user } = useAuth();
  const { licenses } = useLicenses();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"day" | "week">("day");

  const surveyLicenses = useMemo(
    () =>
      licenses
        .filter((license) => license.lokasiIzin)
        .filter((license) => {
          const term = searchTerm.toLowerCase();
          return (
            license.namaIzin.toLowerCase().includes(term) ||
            license.lokasiIzin.toLowerCase().includes(term) ||
            license.sektor.toLowerCase().includes(term)
          );
        }),
    [licenses, searchTerm],
  );

  const groupedByDay = useMemo(() => {
    const groups: Record<string, typeof surveyLicenses> = {};
    surveyLicenses.forEach((license) => {
      const date = license.permohonanMasuk
        ? new Date(license.permohonanMasuk).toLocaleDateString("id-ID", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
          })
        : "Tanpa Tanggal";
      groups[date] = groups[date] || [];
      groups[date].push(license);
    });
    return groups;
  }, [surveyLicenses]);

  const groupedByWeek = useMemo(() => {
    const groups: Record<string, typeof surveyLicenses> = {};
    surveyLicenses.forEach((license) => {
      const date = license.permohonanMasuk
        ? new Date(license.permohonanMasuk)
        : null;
      const weekKey = date
        ? `${date.toLocaleDateString("id-ID", { month: "2-digit" })}-${Math.ceil(
            (date.getDate() + 6 - date.getDay()) / 7,
          )}-${date.getFullYear()}`
        : "Tanpa Minggu";
      groups[weekKey] = groups[weekKey] || [];
      groups[weekKey].push(license);
    });
    return groups;
  }, [surveyLicenses]);

  if (user?.role !== "tim_survei") {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <AdminHeader />
      <main className="lg:pl-64 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Jadwal Survei
              </h1>
              <p className="text-gray-600 mt-1">
                Lihat jadwal survei harian atau mingguan.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "day" ? "default" : "outline"}
                onClick={() => setViewMode("day")}
                className="flex items-center gap-2"
              >
                <CalendarIcon className="h-4 w-4" /> Harian
              </Button>
              <Button
                variant={viewMode === "week" ? "default" : "outline"}
                onClick={() => setViewMode("week")}
                className="flex items-center gap-2"
              >
                <List className="h-4 w-4" /> Mingguan
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Filter Jadwal</CardTitle>
              <Input
                placeholder="Cari nama izin, lokasi, atau sektor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {viewMode === "day" &&
                  Object.entries(groupedByDay).map(([day, items]) => (
                    <div
                      key={day}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-sm text-slate-500">Hari</div>
                          <div className="text-lg font-semibold text-slate-900">
                            {day}
                          </div>
                        </div>
                        <div className="text-sm text-slate-500">
                          {items.length} lokasi
                        </div>
                      </div>
                      <div className="space-y-3">
                        {items.map((license) => (
                          <div
                            key={license.id}
                            className="rounded-xl border border-slate-100 p-3"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div>
                                <div className="font-semibold text-slate-900">
                                  {license.namaIzin}
                                </div>
                                <div className="text-sm text-slate-500">
                                  {license.lokasiIzin}
                                </div>
                              </div>
                              <div className="flex flex-col sm:items-end gap-2">
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                  <MapPin className="h-4 w-4 text-slate-500" />
                                  {license.sektor || "-"}
                                </div>
                                <div className="text-xs uppercase tracking-wide text-slate-500">
                                  Peta / Google Maps
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                  <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                      license.lokasiIzin,
                                    )}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2"
                                  >
                                    <MapPin className="h-4 w-4" />
                                    Buka Navigasi
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                {viewMode === "week" &&
                  Object.entries(groupedByWeek).map(([week, items]) => (
                    <div
                      key={week}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-sm text-slate-500">Minggu</div>
                          <div className="text-lg font-semibold text-slate-900">
                            {week}
                          </div>
                        </div>
                        <div className="text-sm text-slate-500">
                          {items.length} lokasi
                        </div>
                      </div>
                      <div className="space-y-3">
                        {items.map((license) => (
                          <div
                            key={license.id}
                            className="rounded-xl border border-slate-100 p-3"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div>
                                <div className="font-semibold text-slate-900">
                                  {license.namaIzin}
                                </div>
                                <div className="text-sm text-slate-500">
                                  {license.lokasiIzin}
                                </div>
                              </div>
                              <div className="flex flex-col sm:items-end gap-2">
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                  <MapPin className="h-4 w-4 text-slate-500" />
                                  {license.sektor || "-"}
                                </div>
                                <div className="text-xs uppercase tracking-wide text-slate-500">
                                  Peta / Google Maps
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                  <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                      license.lokasiIzin,
                                    )}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2"
                                  >
                                    <MapPin className="h-4 w-4" />
                                    Buka Navigasi
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
