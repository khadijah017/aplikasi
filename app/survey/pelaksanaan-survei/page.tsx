"use client";

import { useState, useMemo, useEffect } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminHeader } from "@/components/layout/admin-header";
import { useAuth } from "@/contexts/auth-context";
import { useLicenses } from "@/contexts/license-context";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, CheckCircle, MapPin, Eye } from "lucide-react";
import { Upload } from "lucide-react";

interface PhotoData {
  name: string;
  url: string;
}

interface SurveySaveData {
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
  surveyPhotos?: PhotoData[];
  surveyAction?: "Disetujui" | "Proses" | "Ditolak";
  createdAt: string;
  updatedAt: string;
}

const checklistItems = [
  "Cek dokumen izin",
  "Cek lokasi dan kondisi lapangan",
  "Verifikasi data pemohon",
  "Cek izin lingkungan jika diperlukan",
  "Foto kondisi lokasi",
  "Catatan tambahan",
];

export default function SurveyExecutionPage() {
  const { user } = useAuth();
  const { licenses } = useLicenses();
  const [selectedLicenseId, setSelectedLicenseId] = useState<string>(
    licenses[0]?.id || "",
  );
  const [checklist, setChecklist] = useState<Record<string, boolean>>(
    checklistItems.reduce((acc, item) => ({ ...acc, [item]: false }), {}),
  );
  const [action, setAction] = useState<"Disetujui" | "Proses" | "Ditolak">(
    "Disetujui",
  );
  const [result, setResult] = useState("");
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [surveyData, setSurveyData] = useState<SurveySaveData[]>([]);
  const [selectedSurvey, setSelectedSurvey] = useState<SurveySaveData | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { toast } = useToast();

  const selectedLicense = useMemo(
    () => licenses.find((license) => license.id === selectedLicenseId),
    [licenses, selectedLicenseId],
  );

  useEffect(() => {
    const stored = localStorage.getItem("surveyData");
    if (stored) {
      try {
        setSurveyData(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse surveyData:", error);
      }
    }
  }, []);

  if (user?.role !== "tim_survei" && user?.role !== "admin") {
    return null;
  }

  const handlePhotoUpload = (files: FileList | null) => {
    if (!files) return;
    setPhotos((prev) => [...prev, ...Array.from(files)]);
  };

  const readFileAsDataUrl = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSaveSurvey = async () => {
    if (!selectedLicense) {
      toast({
        title: "Error",
        description: "Pilih lokasi survei terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    if (!result.trim()) {
      toast({
        title: "Error",
        description: "Hasil survei wajib diisi",
        variant: "destructive",
      });
      return;
    }

    if (photos.length === 0) {
      toast({
        title: "Error",
        description: "Upload foto lokasi wajib",
        variant: "destructive",
      });
      return;
    }

    const checkedItems = Object.values(checklist).filter(Boolean).length;
    if (checkedItems === 0) {
      toast({
        title: "Error",
        description: "Checklist pemeriksaan wajib diisi",
        variant: "destructive",
      });
      return;
    }

    try {
      const stored = localStorage.getItem("surveyData");
      const existingSurveys: SurveySaveData[] = stored
        ? JSON.parse(stored)
        : [];
      const photoData: PhotoData[] = await Promise.all(
        photos.map(async (photo) => ({
          name: photo.name,
          url: await readFileAsDataUrl(photo),
        })),
      );

      const surveyEntry: SurveySaveData = {
        id: `survey-${selectedLicense.id}`,
        licenseId: selectedLicense.id,
        trackingCode: selectedLicense.trackingCode || "",
        namaIzin: selectedLicense.namaIzin,
        jenisIzin: selectedLicense.jenisIzin,
        pemohonNama: selectedLicense.pemohonNama || "-",
        lokasi: selectedLicense.lokasiIzin,
        tanggalSurvey: selectedLicense.permohonanMasuk || "",
        waktuSurvey: "",
        petugas: user?.name || "",
        status: "sedang_survey",
        catatan: notes,
        surveyAction: action,
        surveyResult: result,
        surveyChecklist: checklist,
        surveyPhotos: photoData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updatedSurveys = existingSurveys.filter(
        (item) => item.licenseId !== selectedLicense.id,
      );
      updatedSurveys.push(surveyEntry);
      localStorage.setItem("surveyData", JSON.stringify(updatedSurveys));
      setSurveyData(updatedSurveys);

      toast({
        title: "Berhasil",
        description: "Hasil survei berhasil disimpan",
      });
      setChecklist(
        checklistItems.reduce((acc, item) => ({ ...acc, [item]: false }), {}),
      );
      setResult("");
      setNotes("");
      setPhotos([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan data survei",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <AdminHeader />
      <main className="lg:pl-64 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Pelaksanaan Survei
              </h1>
              <p className="text-gray-600 mt-1">
                Checklist, hasil survei, upload foto, dan catatan lokasi.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setChecklist(
                    checklistItems.reduce(
                      (acc, item) => ({ ...acc, [item]: false }),
                      {},
                    ),
                  );
                  setResult("");
                  setNotes("");
                  setPhotos([]);
                }}
              >
                Reset
              </Button>
            </div>
          </div>

          {user?.role !== "tim_survei" && (
            <Card>
              <CardHeader>
                <CardTitle>Daftar Pelaksanaan Survei</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-3 px-3 font-semibold">
                          No
                        </th>
                        <th className="text-left py-3 px-3 font-semibold">
                          Kode Tracking
                        </th>
                        <th className="text-left py-3 px-3 font-semibold">
                          Nama Pemohon
                        </th>
                        <th className="text-left py-3 px-3 font-semibold">
                          Jenis Izin
                        </th>
                        <th className="text-left py-3 px-3 font-semibold">
                          Tim Survei
                        </th>
                        <th className="text-left py-3 px-3 font-semibold">
                          Jadwal Survei
                        </th>
                        <th className="text-center py-3 px-3 font-semibold">
                          Status Survei
                        </th>
                        {user?.role === "admin" ? (
                          <>
                            <th className="text-left py-3 px-3 font-semibold">
                              Foto Lokasi
                            </th>
                          </>
                        ) : (
                          <>
                            <th className="text-left py-3 px-3 font-semibold">
                              Tanggal Penugasan
                            </th>
                            <th className="text-center py-3 px-3 font-semibold">
                              SLA
                            </th>
                          </>
                        )}
                        <th className="text-center py-3 px-3 font-semibold">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {surveyData.length === 0 ? (
                        <tr>
                          <td
                            colSpan={10}
                            className="text-center py-12 text-gray-500"
                          >
                            Belum ada data pelaksanaan survei.
                          </td>
                        </tr>
                      ) : (
                        surveyData.map((survey, index) => {
                          const surveyDate = survey.tanggalSurvey
                            ? new Date(survey.tanggalSurvey).toLocaleDateString(
                                "id-ID",
                              )
                            : "-";
                          const slaValue = surveyData[index]?.createdAt
                            ? Math.max(
                                0,
                                Math.ceil(
                                  (new Date(survey.updatedAt).getTime() -
                                    new Date(survey.createdAt).getTime()) /
                                    (1000 * 60 * 60 * 24),
                                ),
                              )
                            : 0;

                          return (
                            <tr
                              key={survey.id}
                              className="border-b hover:bg-gray-50"
                            >
                              <td className="py-3 px-3">{index + 1}</td>
                              <td className="py-3 px-3 font-mono text-xs text-emerald-700">
                                {survey.trackingCode || "-"}
                              </td>
                              <td className="py-3 px-3">
                                {survey.pemohonNama}
                              </td>
                              <td className="py-3 px-3">{survey.jenisIzin}</td>
                              <td className="py-3 px-3">
                                {survey.petugas || "-"}
                              </td>
                              <td className="py-3 px-3">
                                {survey.waktuSurvey
                                  ? `${surveyDate} ${survey.waktuSurvey}`
                                  : "Belum dijadwalkan"}
                              </td>
                              <td className="py-3 px-3 text-center">
                                <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                                  {survey.status.replace("_", " ")}
                                </span>
                              </td>
                              {user?.role === "admin" ? (
                                <>
                                  <td className="py-3 px-3">
                                    {survey.surveyPhotos?.length ? (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setSelectedSurvey(survey);
                                          setIsDetailOpen(true);
                                        }}
                                        className="inline-block rounded-md overflow-hidden border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      >
                                        <img
                                          src={survey.surveyPhotos[0].url}
                                          alt={survey.surveyPhotos[0].name}
                                          className="h-12 w-12 object-cover"
                                        />
                                      </button>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className="py-3 px-3">{surveyDate}</td>
                                  <td className="py-3 px-3 text-center">
                                    {slaValue} hari
                                  </td>
                                </>
                              )}
                              <td className="py-3 px-3 text-center">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const found = surveyData.find(
                                      (s) => s.licenseId === survey.licenseId,
                                    );
                                    if (found) {
                                      setSelectedSurvey(found);
                                      setIsDetailOpen(true);
                                    } else {
                                      setSelectedLicenseId(survey.licenseId);
                                    }
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {user?.role !== "admin" && (
            <Card>
              <CardHeader>
                <CardTitle>Pilihan Lokasi Survei</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Pilih lokasi survei
                  </label>
                  <select
                    value={selectedLicenseId}
                    onChange={(e) => setSelectedLicenseId(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {licenses.map((license) => (
                      <option key={license.id} value={license.id}>
                        {license.namaIzin} - {license.lokasiIzin}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedLicense ? (
                  <div className="space-y-6">
                    <Card className="bg-slate-50 border-slate-200">
                      <CardContent>
                        <div className="text-sm text-slate-500 mb-2">
                          Checklist Pemeriksaan
                        </div>
                        <div className="space-y-2">
                          {checklistItems.map((item) => (
                            <div key={item} className="flex items-center gap-2">
                              <Checkbox
                                checked={checklist[item]}
                                onCheckedChange={(checked) =>
                                  setChecklist((prev) => ({
                                    ...prev,
                                    [item]: Boolean(checked),
                                  }))
                                }
                              />
                              <span className="text-sm text-slate-700">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-50 border-slate-200">
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Hasil Survei <span className="text-red-600">*</span></Label>
                          <Textarea
                            value={result}
                            onChange={(e) => setResult(e.target.value)}
                            placeholder="Masukkan hasil survei"
                            className="mt-2"
                            rows={4}
                          />
                        </div>

                        <div>
                          <Label>Tindakan</Label>
                          <select
                            value={action}
                            onChange={(e) =>
                              setAction(e.target.value as "Disetujui" | "Proses" | "Ditolak")
                            }
                            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          >
                            <option value="Disetujui">Disetujui</option>
                            <option value="Proses">Proses</option>
                            <option value="Ditolak">Ditolak</option>
                          </select>
                        </div>

                        <div>
                          <Label>Catatan / Keterangan</Label>
                          <Textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Tambah catatan atau keterangan lokasi"
                            className="mt-2"
                            rows={3}
                          />
                        </div>

                        <div>
                          <Label>Upload Foto Lokasi</Label>
                          <div className="mt-2 flex items-center gap-3">
                            <label className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm cursor-pointer hover:bg-slate-50">
                              <Upload className="h-4 w-4" />
                              Pilih Foto
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={(e) =>
                                  handlePhotoUpload(e.target.files)
                                }
                              />
                            </label>
                          </div>
                          {photos.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {photos.map((photo, index) => (
                                <div
                                  key={index}
                                  className="rounded-lg border border-slate-200 overflow-hidden"
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt={`Foto survei ${index + 1}`}
                                    className="h-28 w-full object-cover"
                                  />
                                  <div className="p-2 text-xs text-slate-600 truncate">
                                    {photo.name}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setChecklist(
                            checklistItems.reduce(
                              (acc, item) => ({ ...acc, [item]: false }),
                              {},
                            ),
                          );
                          setResult("");
                          setNotes("");
                          setPhotos([]);
                        }}
                      >
                        Reset Form
                      </Button>
                      <Button onClick={handleSaveSurvey}>
                        Simpan Hasil Survei
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-500">
                    Tidak ada lokasi survei yang tersedia.
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Detail Dialog for selected survey */}
      <Dialog
        open={isDetailOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsDetailOpen(false);
            setSelectedSurvey(null);
          }
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" /> Detail Pelaksanaan Survei
            </DialogTitle>
          </DialogHeader>

          {selectedSurvey ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium text-gray-600">
                    Kode Tracking:
                  </span>
                </div>
                <div className="font-mono font-semibold">
                  {selectedSurvey.trackingCode || "-"}
                </div>

                <div>
                  <span className="font-medium text-gray-600">Nama Izin:</span>
                </div>
                <div>{selectedSurvey.namaIzin}</div>

                <div>
                  <span className="font-medium text-gray-600">Jenis Izin:</span>
                </div>
                <div>{selectedSurvey.jenisIzin}</div>

                <div>
                  <span className="font-medium text-gray-600">Pemohon:</span>
                </div>
                <div>{selectedSurvey.pemohonNama}</div>

                <div>
                  <span className="font-medium text-gray-600">Lokasi:</span>
                </div>
                <div className="col-span-1">{selectedSurvey.lokasi}</div>

                <div>
                  <span className="font-medium text-gray-600">Status:</span>
                </div>
                <div>{selectedSurvey.status}</div>

                <div>
                  <span className="font-medium text-gray-600">
                    Tanggal Survei:
                  </span>
                </div>
                <div>
                  {selectedSurvey.tanggalSurvey
                    ? new Date(selectedSurvey.tanggalSurvey).toLocaleDateString(
                        "id-ID",
                      )
                    : "-"}
                </div>

                <div>
                  <span className="font-medium text-gray-600">Waktu:</span>
                </div>
                <div>{selectedSurvey.waktuSurvey || "-"}</div>

                <div>
                  <span className="font-medium text-gray-600">Petugas:</span>
                </div>
                <div>{selectedSurvey.petugas || "-"}</div>
              </div>

              {selectedSurvey.surveyResult && (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="text-sm font-medium text-slate-700 mb-2">
                    Hasil Survei
                  </div>
                  <div className="text-sm text-slate-800 whitespace-pre-line">
                    {selectedSurvey.surveyResult}
                  </div>
                </div>
              )}

              {selectedSurvey.surveyChecklist && (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="text-sm font-medium text-slate-700 mb-2">
                    Checklist Pemeriksaan
                  </div>
                  <div className="grid gap-2">
                    {Object.entries(selectedSurvey.surveyChecklist).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center gap-2 text-sm text-slate-700"
                        >
                          <span
                            className={`inline-flex h-3 w-3 rounded-full ${value ? "bg-emerald-500" : "bg-slate-300"}`}
                          />
                          {key}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {selectedSurvey.surveyPhotos &&
                selectedSurvey.surveyPhotos.length > 0 && (
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div className="text-sm font-medium text-slate-700 mb-2">
                      Foto Lokasi
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedSurvey.surveyPhotos.map((photo, index) => (
                        <div
                          key={index}
                          className="overflow-hidden rounded-lg border border-slate-200"
                        >
                          <img
                            src={photo.url}
                            alt={photo.name}
                            className="h-28 w-full object-cover"
                          />
                          <div className="p-2 text-xs text-slate-600 truncate">
                            {photo.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {selectedSurvey.catatan && (
                <div className="bg-gray-50 p-3 rounded-lg text-sm">
                  <span className="font-medium">Catatan: </span>
                  {selectedSurvey.catatan}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDetailOpen(false);
                    setSelectedSurvey(null);
                  }}
                >
                  Tutup
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-sm text-gray-600">
              Data survei tidak ditemukan.
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
