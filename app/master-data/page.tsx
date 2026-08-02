"use client";

import { useState, useEffect, useCallback } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/contexts/auth-context";
import { useLicenses } from "@/contexts/license-context";
import { useUsers } from "@/contexts/user-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Database,
  Plus,
  Search,
  Edit2,
  Trash2,
  FileText,
  User,
  Users,
  ClipboardList,
  Save,
  X,
  Eye,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminHeader } from "@/components/layout/admin-header";

interface JenisPelayanan {
  id: string;
  nama: string;
  deskripsi: string;
  sektor: string;
  biaya: number;
  estimasiHari: number;
  status: "aktif" | "nonaktif";
}

interface DataPemohon {
  id: string;
  nama: string;
  email: string;
  telepon: string;
  alamat: string;
  nik: string;
  totalPermohonan: number;
}

interface DataPegawai {
  id: string;
  nama: string;
  nip: string;
  jabatan: string;
  bidang: string;
  email: string;
  telepon: string;
  status: "aktif" | "nonaktif";
  role?: "pegawai" | "tim_survei";
  spesialisasi?: string;
}

interface DataTimSurvei {
  id: string;
  nama: string;
  nip: string;
  spesialisasi: string;
  email: string;
  telepon: string;
  status: "aktif" | "nonaktif";
}

const STORAGE_KEYS = {
  pemohon: "masterDataPemohon",
  pegawai: "masterDataPegawai",
  timSurvei: "masterDataTimSurvei",
  jenisPelayanan: "masterDataJenisPelayanan",
};

function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {}
  return fallback;
}

function saveToStorage<T>(key: string, data: T[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

function MasterDataContent() {
  const { user } = useAuth();
  const { licenses } = useLicenses();
  const { users, addUser, updateUser, deleteUser } = useUsers();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("data-pemohon");
  const [searchTerm, setSearchTerm] = useState("");

  // State untuk Jenis Pelayanan
  const [jenisPelayananList, setJenisPelayananList] = useState<
    JenisPelayanan[]
  >([
    {
      id: "1",
      nama: "Izin Usaha Perdagangan",
      deskripsi: "Izin untuk usaha perdagangan barang",
      sektor: "Perdagangan",
      biaya: 50000,
      estimasiHari: 7,
      status: "aktif",
    },
    {
      id: "2",
      nama: "Izin Mendirikan Bangunan",
      deskripsi: "Izin untuk mendirikan bangunan baru",
      sektor: "Konstruksi",
      biaya: 100000,
      estimasiHari: 14,
      status: "aktif",
    },
    {
      id: "3",
      nama: "Izin Usaha Pariwisata",
      deskripsi: "Izin untuk usaha di bidang pariwisata",
      sektor: "Pariwisata",
      biaya: 75000,
      estimasiHari: 10,
      status: "aktif",
    },
    {
      id: "4",
      nama: "Izin Kesehatan",
      deskripsi: "Izin untuk fasilitas kesehatan",
      sektor: "Kesehatan",
      biaya: 80000,
      estimasiHari: 12,
      status: "aktif",
    },
    {
      id: "5",
      nama: "Izin Pendidikan",
      deskripsi: "Izin untuk lembaga pendidikan",
      sektor: "Pendidikan",
      biaya: 60000,
      estimasiHari: 8,
      status: "aktif",
    },
  ]);
  // load jenis pelayanan from storage if present
  useEffect(() => {
<<<<<<< HEAD
    const stored = loadFromStorage(
      STORAGE_KEYS.jenisPelayanan,
      [],
    ) as JenisPelayanan[];
=======
    const stored = loadFromStorage(STORAGE_KEYS.jenisPelayanan, []) as JenisPelayanan[];
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
    if (stored && stored.length > 0) {
      setJenisPelayananList(stored);
    } else {
      // ensure default list is persisted
      saveToStorage(STORAGE_KEYS.jenisPelayanan, jenisPelayananList);
    }
  }, []);
<<<<<<< HEAD

  // persist jenisPelayananList whenever it changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.jenisPelayanan, jenisPelayananList);
  }, [jenisPelayananList]);

=======
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
  const [isJenisDialogOpen, setIsJenisDialogOpen] = useState(false);
  const [editingJenis, setEditingJenis] = useState<JenisPelayanan | null>(null);
  const [jenisForm, setJenisForm] = useState({
    nama: "",
    deskripsi: "",
    sektor: "",
    biaya: 0,
    estimasiHari: 7,
  });

  // Data Pemohon (merged with ID Pemohon)
  const [pemohonList, setPemohonList] = useState<DataPemohon[]>([]);
  const [selectedPemohon, setSelectedPemohon] = useState<DataPemohon | null>(
    null,
  );
  const [isPemohonDialogOpen, setIsPemohonDialogOpen] = useState(false);
  const [editingPemohon, setEditingPemohon] = useState<DataPemohon | null>(
    null,
  );
  const [pemohonForm, setPemohonForm] = useState({
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
    nik: "",
  });

  // Data Pegawai sourced from user-management (useUsers)
  const [isPegawaiDialogOpen, setIsPegawaiDialogOpen] = useState(false);
  const [editingPegawai, setEditingPegawai] = useState<DataPegawai | null>(
    null,
  );
  const [pegawaiForm, setPegawaiForm] = useState({
    nama: "",
    nip: "",
    jabatan: "",
    bidang: "",
    email: "",
    telepon: "",
    role: "pegawai",
    spesialisasi: "",
  });

  // Load data from localStorage on mount
  useEffect(() => {
    setPemohonList(loadFromStorage(STORAGE_KEYS.pemohon, []));
    // gabungkan pegawai dan tim survei ke satu list pegawaiList
    // pegawaiList now sourced from users context; no local merge here
  }, []);

  // Sync pemohon data from licenses (merge existing licenses data into master data)
  const syncPemohonFromLicenses = useCallback(() => {
    setPemohonList((prev) => {
      const updated = [...prev];
      let changed = false;
      for (const license of licenses) {
        const nama = license.pemohonNama;
        if (!nama || nama === "-") continue;
        const existing = updated.find((p) => p.nama === nama);
        if (existing) {
          existing.totalPermohonan++;
          if (license.pemohonEmail && !existing.email)
            existing.email = license.pemohonEmail;
          if (license.pemohonTelepon && !existing.telepon)
            existing.telepon = license.pemohonTelepon;
          if (license.alamat && !existing.alamat)
            existing.alamat = license.alamat;
          changed = true;
        } else {
          updated.push({
            id:
              license.pemohonId ||
              `pemohon-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
            nama,
            email: license.pemohonEmail || "",
            telepon: license.pemohonTelepon || "",
            alamat: license.alamat || license.lokasiIzin || "",
            nik: "-",
            totalPermohonan: 1,
          });
          changed = true;
        }
      }
      if (changed) {
        saveToStorage(STORAGE_KEYS.pemohon, updated);
      }
      return updated;
    });
  }, [licenses]);

  useEffect(() => {
    syncPemohonFromLicenses();
  }, [syncPemohonFromLicenses]);

  // Filtered lists
  const filteredJenis = jenisPelayananList.filter(
    (j) =>
      j.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.sektor.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredPemohon = pemohonList.filter(
    (p) =>
      p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.telepon.includes(searchTerm) ||
      p.nik.includes(searchTerm),
  );

  // derive pegawai from users context
  const filteredPegawai = users
    .filter(
      (u) =>
        u.role === "pimpinan" || u.role === "tim_survei" || u.role === "admin",
    )
    .map(
      (u) =>
        ({
          id: u.id,
          nama: u.name,
          nip: u.username || "",
          jabatan: u.department || "",
          bidang: u.department || "",
          email: u.email || "",
          telepon: u.phone || "",
          status: u.isActive ? "aktif" : "nonaktif",
          role: u.role as any,
          spesialisasi: "",
        }) as DataPegawai,
    )
    .filter(
      (p) =>
        p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.nip.includes(searchTerm) ||
        p.jabatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.bidang.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  // ============ Jenis Pelayanan CRUD ============
  const handleSaveJenis = () => {
    if (!jenisForm.nama || !jenisForm.sektor) {
      toast({
        title: "Error",
        description: "Nama dan sektor wajib diisi",
        variant: "destructive",
      });
      return;
    }
    if (editingJenis) {
      setJenisPelayananList((prev) =>
        prev.map((j) =>
          j.id === editingJenis.id ? { ...j, ...jenisForm } : j,
        ),
      );
      toast({
        title: "Berhasil",
        description: "Jenis pelayanan berhasil diperbarui",
      });
    } else {
      const newJenis: JenisPelayanan = {
        id: Date.now().toString(),
        ...jenisForm,
        status: "aktif",
      };
      setJenisPelayananList((prev) => [...prev, newJenis]);
      toast({
        title: "Berhasil",
        description: "Jenis pelayanan berhasil ditambahkan",
      });
    }
    setIsJenisDialogOpen(false);
    setEditingJenis(null);
    setJenisForm({
      nama: "",
      deskripsi: "",
      sektor: "",
      biaya: 0,
      estimasiHari: 7,
    });
    // persist jenisPelayananList changes
    saveToStorage(STORAGE_KEYS.jenisPelayanan, jenisPelayananList);
  };

  const handleDeleteJenis = (id: string) => {
    const updated = jenisPelayananList.filter((j) => j.id !== id);
    setJenisPelayananList(updated);
    toast({
      title: "Berhasil",
      description: "Jenis pelayanan berhasil dihapus",
    });
    saveToStorage(STORAGE_KEYS.jenisPelayanan, updated);
  };

  // ============ Pemohon CRUD ============
  const handleSavePemohon = () => {
    if (!pemohonForm.nama) {
      toast({
        title: "Error",
        description: "Nama pemohon wajib diisi",
        variant: "destructive",
      });
      return;
    }
    if (editingPemohon) {
      const updated = pemohonList.map((p) =>
        p.id === editingPemohon.id ? { ...p, ...pemohonForm } : p,
      );
      setPemohonList(updated);
      saveToStorage(STORAGE_KEYS.pemohon, updated);
      toast({
        title: "Berhasil",
        description: "Data pemohon berhasil diperbarui",
      });
    } else {
      const newPemohon: DataPemohon = {
        id: `pemohon-${Date.now()}`,
        ...pemohonForm,
        totalPermohonan: 0,
      };
      const updated = [...pemohonList, newPemohon];
      setPemohonList(updated);
      saveToStorage(STORAGE_KEYS.pemohon, updated);
      toast({
        title: "Berhasil",
        description: "Data pemohon berhasil ditambahkan",
      });
    }
    setIsPemohonDialogOpen(false);
    setEditingPemohon(null);
    setPemohonForm({ nama: "", email: "", telepon: "", alamat: "", nik: "" });
  };

  const handleDeletePemohon = (id: string) => {
    const updated = pemohonList.filter((p) => p.id !== id);
    setPemohonList(updated);
    saveToStorage(STORAGE_KEYS.pemohon, updated);
    toast({ title: "Berhasil", description: "Data pemohon berhasil dihapus" });
  };

  // ============ Pegawai CRUD ============
  const handleSavePegawai = () => {
    if (!pegawaiForm.nama || !pegawaiForm.nip) {
      toast({
        title: "Error",
        description: "Nama dan NIP wajib diisi",
        variant: "destructive",
      });
      return;
    }
    if (editingPegawai) {
      // update user in user-management
      const updateData: Partial<any> = {
        name: pegawaiForm.nama,
        email: pegawaiForm.email,
        phone: pegawaiForm.telepon,
        department: pegawaiForm.bidang || pegawaiForm.jabatan,
        role:
          (pegawaiForm.role as any) === "tim_survei"
            ? "tim_survei"
            : "pimpinan",
      };
      updateUser(editingPegawai.id, updateData);
      toast({
        title: "Berhasil",
        description: "Data pegawai berhasil diperbarui",
      });
    } else {
      // add new user to user-management. username will use NIP if available, password default 'changeme'
      const newUser = {
        username: pegawaiForm.nip || `user${Date.now()}`,
        email: pegawaiForm.email || `${pegawaiForm.nip || "user"}@example.com`,
        role:
          (pegawaiForm.role as any) === "tim_survei"
            ? "tim_survei"
            : "pimpinan",
        name: pegawaiForm.nama,
        phone: pegawaiForm.telepon,
        department: pegawaiForm.bidang || pegawaiForm.jabatan,
        isActive: true,
        password: "changeme",
      };
      addUser(newUser);
      toast({
        title: "Berhasil",
        description:
          "Data pegawai berhasil ditambahkan (password default: changeme)",
      });
    }
    setIsPegawaiDialogOpen(false);
    setEditingPegawai(null);
    setPegawaiForm({
      nama: "",
      nip: "",
      jabatan: "",
      bidang: "",
      email: "",
      telepon: "",
      role: "pegawai",
      spesialisasi: "",
    });
  };

  const handleDeletePegawai = (id: string) => {
    // delete user from user-management
    deleteUser(id);
    // also remove from timSurvei storage if exists
    const existingTim = loadFromStorage(
      STORAGE_KEYS.timSurvei,
      [],
    ) as DataTimSurvei[];
    const updatedTim = existingTim.filter((t) => t.id !== id);
    saveToStorage(STORAGE_KEYS.timSurvei, updatedTim);
    toast({ title: "Berhasil", description: "Data pegawai berhasil dihapus" });
  };

  // Note: Tim Survei entries are merged into pegawaiList; saving/removing will update storage for both keys where appropriate.

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <AdminSidebar />
      <AdminHeader />
      <main className="lg:pl-64 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Master Data</h2>
              <p className="text-gray-600">
                Kelola data pemohon, pegawai, dan tim survei
              </p>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-3 lg:w-[800px]">
              <TabsTrigger
                value="data-pemohon"
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Data Pemohon
              </TabsTrigger>
              <TabsTrigger value="pegawai" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Data Pegawai
              </TabsTrigger>
              <TabsTrigger
                value="jenis-pelayanan"
                className="flex items-center gap-2"
              >
                <Database className="h-4 w-4" />
                Jenis Pelayanan
              </TabsTrigger>
            </TabsList>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tab: Data Pemohon (merged with ID Pemohon) */}
            <TabsContent value="data-pemohon" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-600" />
                      Data Pemohon
                    </CardTitle>
                    <CardDescription>
                      Daftar pemohon beserta ID unik dan riwayat permohonan
                    </CardDescription>
                  </div>
                  <Dialog
                    open={isPemohonDialogOpen}
                    onOpenChange={(open) => {
                      setIsPemohonDialogOpen(open);
                      if (!open) {
                        setEditingPemohon(null);
                        setPemohonForm({
                          nama: "",
                          email: "",
                          telepon: "",
                          alamat: "",
                          nik: "",
                        });
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Pemohon
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>
                          {editingPemohon ? "Edit" : "Tambah"} Data Pemohon
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Nama Pemohon *</Label>
                          <Input
                            value={pemohonForm.nama}
                            onChange={(e) =>
                              setPemohonForm({
                                ...pemohonForm,
                                nama: e.target.value,
                              })
                            }
                            placeholder="Nama lengkap"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>NIK / No. Identitas</Label>
                          <Input
                            value={pemohonForm.nik}
                            onChange={(e) =>
                              setPemohonForm({
                                ...pemohonForm,
                                nik: e.target.value,
                              })
                            }
                            placeholder="16 digit NIK"
                            maxLength={16}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                              type="email"
                              value={pemohonForm.email}
                              onChange={(e) =>
                                setPemohonForm({
                                  ...pemohonForm,
                                  email: e.target.value,
                                })
                              }
                              placeholder="email@example.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Telepon</Label>
                            <Input
                              value={pemohonForm.telepon}
                              onChange={(e) =>
                                setPemohonForm({
                                  ...pemohonForm,
                                  telepon: e.target.value,
                                })
                              }
                              placeholder="081234567890"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Alamat</Label>
                          <Textarea
                            value={pemohonForm.alamat}
                            onChange={(e) =>
                              setPemohonForm({
                                ...pemohonForm,
                                alamat: e.target.value,
                              })
                            }
                            placeholder="Alamat lengkap"
                            rows={2}
                          />
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => setIsPemohonDialogOpen(false)}
                          >
                            Batal
                          </Button>
                          <Button onClick={handleSavePemohon}>
                            <Save className="h-4 w-4 mr-2" />
                            Simpan
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-left py-3 px-2 font-semibold">
                            No
                          </th>
                          <th className="text-left py-3 px-2 font-semibold">
                            ID Pemohon
                          </th>
                          <th className="text-left py-3 px-2 font-semibold">
                            Nama Pemohon
                          </th>
                          <th className="text-left py-3 px-2 font-semibold">
                            NIK
                          </th>
                          <th className="text-left py-3 px-2 font-semibold">
                            Email
                          </th>
                          <th className="text-left py-3 px-2 font-semibold">
                            Telepon
                          </th>
                          <th className="text-left py-3 px-2 font-semibold">
                            Alamat
                          </th>
                          <th className="text-center py-3 px-2 font-semibold">
                            Total Permohonan
                          </th>
                          <th className="text-center py-3 px-2 font-semibold">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPemohon.length === 0 ? (
                          <tr>
                            <td
                              colSpan={9}
                              className="text-center py-8 text-gray-500"
                            >
                              Tidak ada data pemohon
                            </td>
                          </tr>
                        ) : (
                          filteredPemohon.map((pemohon, index) => (
                            <tr
                              key={pemohon.id}
                              className="border-b hover:bg-gray-50"
                            >
                              <td className="py-3 px-2">{index + 1}</td>
                              <td className="py-3 px-2 font-mono text-xs font-semibold text-blue-700">
                                {pemohon.id}
                              </td>
                              <td className="py-3 px-2 font-medium">
                                {pemohon.nama}
                              </td>
                              <td className="py-3 px-2 text-xs">
                                {pemohon.nik || "-"}
                              </td>
                              <td className="py-3 px-2">
                                {pemohon.email || "-"}
                              </td>
                              <td className="py-3 px-2">
                                {pemohon.telepon || "-"}
                              </td>
                              <td className="py-3 px-2 max-w-[200px] truncate text-gray-600">
                                {pemohon.alamat || "-"}
                              </td>
                              <td className="py-3 px-2 text-center">
                                <Badge variant="secondary">
                                  {pemohon.totalPermohonan}
                                </Badge>
                              </td>
                              <td className="py-3 px-2 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedPemohon(pemohon)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setEditingPemohon(pemohon);
                                      setPemohonForm({
                                        nama: pemohon.nama,
                                        email: pemohon.email,
                                        telepon: pemohon.telepon,
                                        alamat: pemohon.alamat,
                                        nik: pemohon.nik,
                                      });
                                      setIsPemohonDialogOpen(true);
                                    }}
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleDeletePemohon(pemohon.id)
                                    }
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Detail Pemohon Dialog */}
              {selectedPemohon && (
                <Dialog
                  open={!!selectedPemohon}
                  onOpenChange={(open) => {
                    if (!open) setSelectedPemohon(null);
                  }}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Detail Pemohon</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-gray-600">
                          ID Pemohon:
                        </span>{" "}
                        <span className="font-mono text-blue-700">
                          {selectedPemohon.id}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Nama:</span>{" "}
                        {selectedPemohon.nama}
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">NIK:</span>{" "}
                        {selectedPemohon.nik || "-"}
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">
                          Email:
                        </span>{" "}
                        {selectedPemohon.email || "-"}
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">
                          Telepon:
                        </span>{" "}
                        {selectedPemohon.telepon || "-"}
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">
                          Alamat:
                        </span>{" "}
                        {selectedPemohon.alamat || "-"}
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">
                          Total Permohonan:
                        </span>{" "}
                        {selectedPemohon.totalPermohonan}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </TabsContent>

            {/* Tab: Data Pegawai */}
            <TabsContent value="pegawai" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      Data Pegawai
                    </CardTitle>
                    <CardDescription>
                      Daftar pegawai DPMPTSP Kabupaten Tapin
                    </CardDescription>
                  </div>
                  <Dialog
                    open={isPegawaiDialogOpen}
                    onOpenChange={(open) => {
                      setIsPegawaiDialogOpen(open);
                      if (!open) {
                        setEditingPegawai(null);
                        setPegawaiForm({
                          nama: "",
                          nip: "",
                          jabatan: "",
                          bidang: "",
                          email: "",
                          telepon: "",
                        });
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Pegawai
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>
                          {editingPegawai ? "Edit" : "Tambah"} Data Pegawai
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Nama Pegawai *</Label>
                            <Input
                              value={pegawaiForm.nama}
                              onChange={(e) =>
                                setPegawaiForm({
                                  ...pegawaiForm,
                                  nama: e.target.value,
                                })
                              }
                              placeholder="Nama lengkap"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>NIP *</Label>
                            <Input
                              value={pegawaiForm.nip}
                              onChange={(e) =>
                                setPegawaiForm({
                                  ...pegawaiForm,
                                  nip: e.target.value,
                                })
                              }
                              placeholder="NIP"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Jabatan</Label>
                            <Input
                              value={pegawaiForm.jabatan}
                              onChange={(e) =>
                                setPegawaiForm({
                                  ...pegawaiForm,
                                  jabatan: e.target.value,
                                })
                              }
                              placeholder="Jabatan"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Bidang</Label>
                            <Select
                              value={pegawaiForm.bidang}
                              onValueChange={(v) =>
                                setPegawaiForm({ ...pegawaiForm, bidang: v })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih bidang" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Perizinan">
                                  Perizinan
                                </SelectItem>
                                <SelectItem value="Investasi">
                                  Investasi
                                </SelectItem>
                                <SelectItem value="Pelayanan">
                                  Pelayanan
                                </SelectItem>
                                <SelectItem value="UMKM">UMKM</SelectItem>
                                <SelectItem value="IT">IT</SelectItem>
                                <SelectItem value="Umum">Umum</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Role</Label>
                            <Select
                              value={pegawaiForm.role}
                              onValueChange={(v) =>
                                setPegawaiForm({ ...pegawaiForm, role: v })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pegawai">Pegawai</SelectItem>
                                <SelectItem value="tim_survei">
                                  Tim Survei
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Spesialisasi (opsional)</Label>
                            <Input
                              value={pegawaiForm.spesialisasi}
                              onChange={(e) =>
                                setPegawaiForm({
                                  ...pegawaiForm,
                                  spesialisasi: e.target.value,
                                })
                              }
                              placeholder="Contoh: Perdagangan"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                              type="email"
                              value={pegawaiForm.email}
                              onChange={(e) =>
                                setPegawaiForm({
                                  ...pegawaiForm,
                                  email: e.target.value,
                                })
                              }
                              placeholder="email@perizinan.id"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Telepon</Label>
                            <Input
                              value={pegawaiForm.telepon}
                              onChange={(e) =>
                                setPegawaiForm({
                                  ...pegawaiForm,
                                  telepon: e.target.value,
                                })
                              }
                              placeholder="081234567890"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => setIsPegawaiDialogOpen(false)}
                          >
                            Batal
                          </Button>
                          <Button onClick={handleSavePegawai}>
                            <Save className="h-4 w-4 mr-2" />
                            Simpan
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-left py-3 px-2 font-semibold">
                            No
                          </th>
                          <th className="text-left py-3 px-2 font-semibold">
                            Nama
                          </th>
                          <th className="text-left py-3 px-2 font-semibold">
                            NIP
                          </th>
                          <th className="text-left py-3 px-2 font-semibold">
                            Jabatan
                          </th>
                          <th className="text-left py-3 px-2 font-semibold">
                            Bidang
                          </th>
                          <th className="text-left py-3 px-2 font-semibold">
                            Email
                          </th>
                          <th className="text-left py-3 px-2 font-semibold">
                            Telepon
                          </th>
                          <th className="text-center py-3 px-2 font-semibold">
                            Status
                          </th>
                          <th className="text-center py-3 px-2 font-semibold">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPegawai.length === 0 ? (
                          <tr>
                            <td
                              colSpan={9}
                              className="text-center py-8 text-gray-500"
                            >
                              Tidak ada data pegawai
                            </td>
                          </tr>
                        ) : (
                          filteredPegawai.map((pegawai, index) => (
                            <tr
                              key={pegawai.id}
                              className="border-b hover:bg-gray-50"
                            >
                              <td className="py-3 px-2">{index + 1}</td>
                              <td className="py-3 px-2 font-medium">
                                {pegawai.nama}
                              </td>
                              <td className="py-3 px-2 font-mono text-xs">
                                {pegawai.nip}
                              </td>
                              <td className="py-3 px-2">
                                {(pegawai.role === "tim_survei"
                                  ? pegawai.spesialisasi || pegawai.jabatan
                                  : pegawai.jabatan) || "-"}
                              </td>
                              <td className="py-3 px-2">
                                {pegawai.bidang || "-"}
                              </td>
                              <td className="py-3 px-2">
                                {pegawai.email || "-"}
                              </td>
                              <td className="py-3 px-2">
                                {pegawai.telepon || "-"}
                              </td>
                              <td className="py-3 px-2 text-center">
                                <Badge
                                  className={
                                    pegawai.status === "aktif"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                                  }
                                >
                                  {pegawai.status}
                                </Badge>
                              </td>
                              <td className="py-3 px-2 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setEditingPegawai(pegawai);
                                      setPegawaiForm({
                                        nama: pegawai.nama,
                                        nip: pegawai.nip,
                                        jabatan: pegawai.jabatan,
                                        bidang: pegawai.bidang,
                                        email: pegawai.email,
                                        telepon: pegawai.telepon,
                                        role: pegawai.role || "pegawai",
                                        spesialisasi:
                                          pegawai.spesialisasi || "",
                                      });
                                      setIsPegawaiDialogOpen(true);
                                    }}
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleDeletePegawai(pegawai.id)
                                    }
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tim Survei merged into Data Pegawai - tab removed */}

            {/* Tab: Jenis Pelayanan */}
            <TabsContent value="jenis-pelayanan" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-blue-600" />
                      Daftar Jenis Pelayanan
                    </CardTitle>
                    <CardDescription>
                      Kelola daftar jenis pelayanan perizinan
                    </CardDescription>
                  </div>
                  <Dialog
                    open={isJenisDialogOpen}
                    onOpenChange={(open) => {
                      setIsJenisDialogOpen(open);
                      if (!open) {
                        setEditingJenis(null);
                        setJenisForm({
                          nama: "",
                          deskripsi: "",
                          sektor: "",
                          biaya: 0,
                          estimasiHari: 7,
                        });
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Jenis
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {editingJenis ? "Edit" : "Tambah"} Jenis Pelayanan
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Nama Jenis Pelayanan *</Label>
                          <Input
                            value={jenisForm.nama}
                            onChange={(e) =>
                              setJenisForm({
                                ...jenisForm,
                                nama: e.target.value,
                              })
                            }
                            placeholder="Contoh: Izin Usaha Perdagangan"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Deskripsi</Label>
                          <Textarea
                            value={jenisForm.deskripsi}
                            onChange={(e) =>
                              setJenisForm({
                                ...jenisForm,
                                deskripsi: e.target.value,
                              })
                            }
                            placeholder="Deskripsi jenis pelayanan"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Sektor *</Label>
                            <Select
                              value={jenisForm.sektor}
                              onValueChange={(v) =>
                                setJenisForm({ ...jenisForm, sektor: v })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih sektor" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Perdagangan">
                                  Perdagangan
                                </SelectItem>
                                <SelectItem value="Pariwisata">
                                  Pariwisata
                                </SelectItem>
                                <SelectItem value="Kesehatan">
                                  Kesehatan
                                </SelectItem>
                                <SelectItem value="Pendidikan">
                                  Pendidikan
                                </SelectItem>
                                <SelectItem value="Pertanian">
                                  Pertanian
                                </SelectItem>
                                <SelectItem value="Perikanan">
                                  Perikanan
                                </SelectItem>
                                <SelectItem value="Konstruksi">
                                  Konstruksi
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Biaya (Rp)</Label>
                            <Input
                              type="number"
                              value={jenisForm.biaya}
                              onChange={(e) =>
                                setJenisForm({
                                  ...jenisForm,
                                  biaya: Number(e.target.value),
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Estimasi Waktu (hari)</Label>
                          <Input
                            type="number"
                            value={jenisForm.estimasiHari}
                            onChange={(e) =>
                              setJenisForm({
                                ...jenisForm,
                                estimasiHari: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => setIsJenisDialogOpen(false)}
                          >
                            Batal
                          </Button>
                          <Button onClick={handleSaveJenis}>
                            <Save className="h-4 w-4 mr-2" />
                            Simpan
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-left py-3 px-2 font-semibold">
                            No
                          </th>
                          <th className="text-left py-3 px-2 font-semibold">
                            Nama Jenis
                          </th>
                          <th className="text-left py-3 px-2 font-semibold">
                            Deskripsi
                          </th>
                          <th className="text-left py-3 px-2 font-semibold">
                            Sektor
                          </th>
                          <th className="text-right py-3 px-2 font-semibold">
                            Biaya
                          </th>
                          <th className="text-center py-3 px-2 font-semibold">
                            Estimasi
                          </th>
                          <th className="text-center py-3 px-2 font-semibold">
                            Status
                          </th>
                          <th className="text-center py-3 px-2 font-semibold">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredJenis.length === 0 ? (
                          <tr>
                            <td
                              colSpan={8}
                              className="text-center py-8 text-gray-500"
                            >
                              Tidak ada data jenis pelayanan
                            </td>
                          </tr>
                        ) : (
                          filteredJenis.map((jenis, index) => (
                            <tr
                              key={jenis.id}
                              className="border-b hover:bg-gray-50"
                            >
                              <td className="py-3 px-2">{index + 1}</td>
                              <td className="py-3 px-2 font-medium">
                                {jenis.nama}
                              </td>
                              <td className="py-3 px-2 text-gray-600 max-w-xs truncate">
                                {jenis.deskripsi}
                              </td>
                              <td className="py-3 px-2">{jenis.sektor}</td>
                              <td className="py-3 px-2 text-right">
                                Rp {jenis.biaya.toLocaleString("id-ID")}
                              </td>
                              <td className="py-3 px-2 text-center">
                                {jenis.estimasiHari} hari
                              </td>
                              <td className="py-3 px-2 text-center">
                                <Badge
                                  className={
                                    jenis.status === "aktif"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                                  }
                                >
                                  {jenis.status}
                                </Badge>
                              </td>
                              <td className="py-3 px-2 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setEditingJenis(jenis);
                                      setJenisForm({
                                        nama: jenis.nama,
                                        deskripsi: jenis.deskripsi,
                                        sektor: jenis.sektor,
                                        biaya: jenis.biaya,
                                        estimasiHari: jenis.estimasiHari,
                                      });
                                      setIsJenisDialogOpen(true);
                                    }}
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteJenis(jenis.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default function MasterDataPage() {
  return (
    <ProtectedRoute>
      <MasterDataContent />
    </ProtectedRoute>
  );
}
