"use client";

import { useLicenses } from "@/contexts/license-context";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { ProtectedRoute } from "@/components/protected-route";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminHeader } from "@/components/layout/admin-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";
import { Eye, FileText, Clock, CheckCircle, X } from "lucide-react";

export default function TandaTanganElektronikPage() {
  const { user } = useAuth();
  const { licenses, isLoading, updateLicense, refreshLicenses } = useLicenses();
  const { toast } = useToast();

  const isPimpinan = user?.role === "pimpinan";

  const pendingSignatures = useMemo(
    () =>
      licenses.filter(
        (license) => license.status === "selesai" && !license.pimpinanVerified,
      ),
    [licenses],
  );

  const handleVerifyTTD = async (licenseId: string) => {
    try {
      const now = new Date().toISOString();
      await updateLicense(licenseId, {
        pimpinanVerified: true,
        pimpinanVerifiedBy: user?.name || "Pimpinan",
        pimpinanVerifiedAt: now,
      });
      await refreshLicenses();
      toast({
        title: "Berhasil",
        description: "Tanda tangan elektronik berhasil diverifikasi.",
      });
    } catch (error: any) {
      console.error("Error verifying TTD:", error);
      toast({
        title: "Gagal",
        description:
          error?.message || "Gagal memverifikasi tanda tangan elektronik.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "pending") {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-0">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      );
    }
    if (status === "approved") {
      return (
        <Badge className="bg-green-100 text-green-800 border-0">
          <CheckCircle className="h-3 w-3 mr-1" />
          Disetujui
        </Badge>
      );
    }
    if (status === "rejected") {
      return (
        <Badge className="bg-red-100 text-red-800 border-0">
          <X className="h-3 w-3 mr-1" />
          Ditolak
        </Badge>
      );
    }
    return (
      <Badge className="bg-slate-100 text-slate-700 border-0">
        <FileText className="h-3 w-3 mr-1" />
        {status}
      </Badge>
    );
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <AdminSidebar />
        <AdminHeader />
        <main className="lg:pl-64 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Tanda Tangan Elektronik
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Daftar permohonan yang siap ditandatangani oleh pimpinan.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Tanda Tangan Elektronik</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-center w-12">
                          No
                        </TableHead>
                        <TableHead className="font-semibold">
                          Kode Tracking
                        </TableHead>
                        <TableHead className="font-semibold">
                          Nama Pemohon
                        </TableHead>
                        <TableHead className="font-semibold">
                          Jenis Izin
                        </TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold text-center">
                          Aksi
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="text-center py-8 text-gray-500"
                          >
                            Memuat data...
                          </TableCell>
                        </TableRow>
                      ) : pendingSignatures.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="text-center py-8 text-gray-500"
                          >
                            Tidak ada permohonan untuk ditandatangani.
                          </TableCell>
                        </TableRow>
                      ) : (
                        pendingSignatures.map((license, index) => (
                          <TableRow
                            key={license.id}
                            className="hover:bg-gray-50"
                          >
                            <TableCell className="text-center font-medium">
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              <span className="text-sm font-mono font-medium text-gray-700 bg-gray-50 px-2 py-1 rounded border">
                                {license.trackingCode || "-"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-gray-700">
                                {license.pemohonNama ||
                                  license.createdBy ||
                                  "-"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-gray-700">
                                {license.jenisIzin}
                              </span>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(
                                license.verificationStatus || "pending",
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {isPimpinan ? (
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  className="h-8"
                                  onClick={() => handleVerifyTTD(license.id)}
                                >
                                  Verifikasi TTD
                                </Button>
                              ) : (
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  className="h-8"
                                >
                                  Detail
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
