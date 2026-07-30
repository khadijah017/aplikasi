"use client";

import { useEffect, useMemo, useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminHeader } from "@/components/layout/admin-header";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, Eye, RotateCcw, Search } from "lucide-react";

interface SurveyPhotoData {
  name: string;
  url: string;
}

interface SurveyDocumentData {
  name: string;
  url: string;
}

interface SurveyVerificationItem {
  id: string;
  licenseId: string;
  trackingCode: string;
  namaIzin: string;
  jenisIzin: string;
  pemohonNama: string;
  lokasi: string;
  tanggalSurvey: string;
  waktuSurvey: string;
  petugas: string;
  status: "dijadwalkan" | "sedang_survey" | "selesai" | "dibatalkan";
  catatan: string;
  surveyResult?: string;
  surveyChecklist?: Record<string, boolean>;
  surveyPhotos?: SurveyPhotoData[];
  surveyDocuments?: SurveyDocumentData[];
  surveyAction?: "Disetujui" | "Proses" | "Ditolak";
  verificationStatus?: "menunggu" | "disetujui" | "dikembalikan";
  verificationNote?: string;
  createdAt: string;
  updatedAt: string;
}

const statusLabel: Record<string, string> = {
  menunggu: "Menunggu Verifikasi",
  disetujui: "Disetujui",
  dikembalikan: "Dikembalikan",
};

const statusBadgeClass: Record<string, string> = {
  menunggu: "bg-amber-100 text-amber-800",
  disetujui: "bg-green-100 text-green-800",
  dikembalikan: "bg-red-100 text-red-800",
};

export default function SurveyVerificationPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<SurveyVerificationItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<SurveyVerificationItem | null>(null);
  const [reviewNote, setReviewNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("surveyData");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as SurveyVerificationItem[];
      const normalized = parsed.map((item) => ({
        ...item,
        verificationStatus: item.verificationStatus || "menunggu",
        verificationNote: item.verificationNote || "",
        surveyDocuments: item.surveyDocuments || [],
      }));
      setItems(normalized);
    } catch (error) {
      console.error("Gagal memuat data survei untuk verifikasi", error);
    }
  }, []);

  const visibleItems = useMemo(() => {
    const term = searchTerm.toLowerCase();
    if (!term) return items;

    return items.filter((item) => {
      return [
        item.trackingCode,
        item.namaIzin,
        item.pemohonNama,
        item.petugas,
      ].some((value) => value?.toLowerCase().includes(term));
    });
  }, [items, searchTerm]);

  const saveItems = (nextItems: SurveyVerificationItem[]) => {
    setItems(nextItems);
    localStorage.setItem("surveyData", JSON.stringify(nextItems));
  };

  const openDetail = (item: SurveyVerificationItem) => {
    setSelectedItem(item);
    setReviewNote(item.verificationNote || "");
  };

  const updateVerification = (
    itemId: string,
    status: "disetujui" | "dikembalikan",
  ) => {
    const updated = items.map((item) => {
      if (item.id !== itemId) return item;

      return {
        ...item,
        verificationStatus: status,
        verificationNote: reviewNote.trim() || item.verificationNote || "",
        surveyAction: status === "disetujui" ? "Disetujui" : "Ditolak",
        updatedAt: new Date().toISOString(),
      };
    });

    saveItems(updated);
    toast({
      title: "Berhasil",
      description:
        status === "disetujui"
          ? "Hasil survei telah disetujui."
          : "Hasil survei dikembalikan untuk diperbaiki.",
    });
    setSelectedItem(null);
    setReviewNote("");
  };

  if (user?.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <AdminHeader />
      <main className="lg:pl-64 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Verifikasi Hasil Survei
            </h1>
            <p className="text-gray-600 mt-1">
              Admin dapat memeriksa hasil survei, foto, dokumen, serta menyetujui atau mengembalikan hasil survei.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daftar Hasil Survei</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari kode tracking, nama pemohon, atau tim survei"
                  className="w-full outline-none"
                />
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>Kode Tracking</TableHead>
                      <TableHead>Nama Pemohon</TableHead>
                      <TableHead>Tim Survei</TableHead>
                      <TableHead>Hasil Survei</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Status Verifikasi</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visibleItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-slate-500">
                          Belum ada hasil survei yang tersedia.
                        </TableCell>
                      </TableRow>
                    ) : (
                      visibleItems.map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell className="font-medium">{item.trackingCode || "-"}</TableCell>
                          <TableCell>{item.pemohonNama || "-"}</TableCell>
                          <TableCell>{item.petugas || "-"}</TableCell>
                          <TableCell className="max-w-[220px]">
                            <div className="line-clamp-2 text-sm text-slate-600">
                              {item.surveyResult || "Belum ada hasil survei"}
                            </div>
                          </TableCell>
                          <TableCell>
                            {item.tanggalSurvey ? new Date(item.tanggalSurvey).toLocaleDateString("id-ID") : "-"}
                          </TableCell>
                          <TableCell>
                            <Badge className={statusBadgeClass[item.verificationStatus || "menunggu"]}>
                              {statusLabel[item.verificationStatus || "menunggu"]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openDetail(item)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Lihat
                              </Button>
                            </div>
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

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detail Hasil Survei</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Kode Tracking</p>
                  <p className="font-semibold">{selectedItem.trackingCode}</p>
                </div>
                <div>
                  <p className="text-slate-500">Nama Pemohon</p>
                  <p className="font-semibold">{selectedItem.pemohonNama}</p>
                </div>
                <div>
                  <p className="text-slate-500">Tim Survei</p>
                  <p className="font-semibold">{selectedItem.petugas}</p>
                </div>
                <div>
                  <p className="text-slate-500">Lokasi</p>
                  <p className="font-semibold">{selectedItem.lokasi}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Hasil Survei</Label>
                <div className="rounded-md border bg-slate-50 p-3 text-sm whitespace-pre-wrap">
                  {selectedItem.surveyResult || "Belum ada hasil survei"}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Catatan Tim Survei</Label>
                <div className="rounded-md border bg-slate-50 p-3 text-sm whitespace-pre-wrap">
                  {selectedItem.catatan || "-"}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Checklist Survei</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.surveyChecklist && Object.entries(selectedItem.surveyChecklist).filter(([, checked]) => checked).length > 0 ? (
                    Object.entries(selectedItem.surveyChecklist)
                      .filter(([, checked]) => checked)
                      .map(([item]) => (
                        <Badge key={item} variant="secondary">
                          {item}
                        </Badge>
                      ))
                  ) : (
                    <span className="text-sm text-slate-500">Tidak ada checklist</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Foto</Label>
                {selectedItem.surveyPhotos && selectedItem.surveyPhotos.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedItem.surveyPhotos.map((photo, index) => (
                      <img
                        key={`${photo.name}-${index}`}
                        src={photo.url}
                        alt={photo.name}
                        className="w-full h-40 object-cover rounded-md border"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">Belum ada foto yang diunggah.</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Dokumen Pendukung</Label>
                {selectedItem.surveyDocuments && selectedItem.surveyDocuments.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedItem.surveyDocuments.map((document) => (
                      <li key={document.name}>
                        <a
                          href={document.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          {document.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500">Belum ada dokumen pendukung.</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Catatan Verifikasi</Label>
                <Textarea
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  placeholder="Masukkan catatan jika ada koreksi atau alasan pengembalian"
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Button onClick={() => updateVerification(selectedItem.id, "disetujui")}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Setujui Hasil Survei
                </Button>
                <Button variant="outline" onClick={() => updateVerification(selectedItem.id, "dikembalikan")}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Kembalikan Hasil Survei
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
