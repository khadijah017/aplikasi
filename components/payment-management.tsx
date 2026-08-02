<<<<<<< HEAD
"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { License, useLicenses } from "@/contexts/license-context";
=======
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
<<<<<<< HEAD
} from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Search, CreditCard, X, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Payment {
  id: string;
  license_id?: string;
  tracking_code?: string;
  jenis_id?: string;
  pemohon_nama: string;
  jumlah: number;
  metode_pembayaran: string;
  status_pembayaran: string;
  tanggal_pembayaran?: string;
  bukti_pembayaran?: string;
  keterangan?: string;
  created_at: string;
  updated_at: string;
}

interface PaymentFormData {
  pemohon_nama: string;
  jumlah: string;
  metode_pembayaran: string;
  status_pembayaran: string;
  tracking_code: string;
  jenis_id?: string;
  jenis_label?: string;
  isLicenseRow?: boolean;
  keterangan: string;
}

interface JenisPelayanan {
  id: string;
  nama: string;
  deskripsi?: string;
  sektor?: string;
  biaya: number;
=======
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, Search, CreditCard, X, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Payment {
  id: string
  license_id?: string
  tracking_code?: string
  pemohon_nama: string
  jumlah: number
  metode_pembayaran: string
  status_pembayaran: string
  tanggal_pembayaran?: string
  bukti_pembayaran?: string
  keterangan?: string
  created_at: string
  updated_at: string
}

interface PaymentFormData {
  pemohon_nama: string
  jumlah: string
  metode_pembayaran: string
  status_pembayaran: string
  tracking_code: string
  jenis_id?: string
  keterangan: string
}

interface JenisPelayanan {
  id: string
  nama: string
  deskripsi?: string
  sektor?: string
  biaya: number
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
}

function PaymentForm({
  payment,
<<<<<<< HEAD
  license,
  onSubmit,
  onCancel,
  jenisList = [],
}: {
  payment?: Payment;
  license?: License;
  onSubmit: (data: PaymentFormData) => void;
  onCancel: () => void;
  jenisList?: JenisPelayanan[];
=======
  onSubmit,
  onCancel,
}: {
  payment?: Payment
  onSubmit: (data: PaymentFormData) => void
  onCancel: () => void
  jenisList?: JenisPelayanan[]
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
}) {
  const [formData, setFormData] = useState<PaymentFormData>({
    pemohon_nama: payment?.pemohon_nama || "",
    jumlah: payment?.jumlah?.toString() || "",
    metode_pembayaran: payment?.metode_pembayaran || "transfer",
    status_pembayaran: payment?.status_pembayaran || "pending",
    tracking_code: payment?.tracking_code || "",
<<<<<<< HEAD
    jenis_id: payment?.jenis_id || "",
    keterangan: payment?.keterangan || "",
  });
=======
    jenis_id: (payment as any)?.jenis_id || "",
    keterangan: payment?.keterangan || "",
  })
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43

  useEffect(() => {
    if (payment) {
      setFormData({
        pemohon_nama: payment.pemohon_nama || "",
        jumlah: payment.jumlah?.toString() || "",
        metode_pembayaran: payment.metode_pembayaran || "transfer",
        status_pembayaran: payment.status_pembayaran || "pending",
        tracking_code: payment.tracking_code || "",
        jenis_id: (payment as any)?.jenis_id || "",
        keterangan: payment.keterangan || "",
<<<<<<< HEAD
      });
    } else if (license) {
      setFormData({
        pemohon_nama: license.pemohonNama || "",
        jumlah: "",
        metode_pembayaran: "transfer",
        status_pembayaran: "pending",
        tracking_code: license.trackingCode || "",
        jenis_id: undefined,
        keterangan: "",
      });
=======
      })
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
    } else {
      setFormData({
        pemohon_nama: "",
        jumlah: "",
        metode_pembayaran: "transfer",
        status_pembayaran: "pending",
        tracking_code: "",
        keterangan: "",
<<<<<<< HEAD
      });
    }
  }, [payment, license]);

  // auto-fill jumlah when a jenis pelayanan is selected (jenis id stored in jenis_id)
  useEffect(() => {
    if (formData.jenis_id) {
      const match = jenisList.find((j) => j.id === formData.jenis_id);
      if (match)
        setFormData((prev) => ({ ...prev, jumlah: match.biaya.toString() }));
    }
  }, [formData.jenis_id, jenisList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pemohon_nama.trim() || !formData.jumlah.trim()) return;
    onSubmit(formData);
  };
=======
      })
    }
  }, [payment])

  // auto-fill jumlah when a jenis pelayanan is selected (jenis id stored in jenis_id)
  useEffect(() => {
    if (typeof window === "undefined") return
    const stored: JenisPelayanan[] = JSON.parse(localStorage.getItem("masterDataJenisPelayanan") || "[]")
    if (formData.jenis_id) {
      const match = stored.find((j) => j.id === formData.jenis_id)
      if (match) setFormData((prev) => ({ ...prev, jumlah: match.biaya.toString() }))
    }
  }, [formData.jenis_id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.pemohon_nama.trim() || !formData.jumlah.trim()) return
    onSubmit(formData)
  }
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pemohon_nama">Nama Pemohon *</Label>
          <Input
            id="pemohon_nama"
            value={formData.pemohon_nama}
<<<<<<< HEAD
            onChange={(e) =>
              setFormData({ ...formData, pemohon_nama: e.target.value })
            }
=======
            onChange={(e) => setFormData({ ...formData, pemohon_nama: e.target.value })}
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
            required
          />
        </div>
        <div className="space-y-2">
<<<<<<< HEAD
          <Label htmlFor="jenis_pelayanan">Jenis Pelayanan</Label>
          <Select
            value={formData.jenis_id || "__none"}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                jenis_id: value === "__none" ? "" : value,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih jenis pelayanan (opsional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__none" disabled>
                -- Pilih --
              </SelectItem>
              {jenisList.map((j) => (
                <SelectItem key={j.id} value={j.id}>
                  {j.nama} - Rp {j.biaya.toLocaleString("id-ID")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label htmlFor="jumlah">Jumlah (Rp) *</Label>
          <Input
            id="jumlah"
            type="number"
            value={formData.jumlah}
            onChange={(e) =>
              setFormData({ ...formData, jumlah: e.target.value })
            }
            required
          />
=======
            <Label htmlFor="jenis_pelayanan">Jenis Pelayanan</Label>
            <Select
              value={formData.jenis_id || "__none"}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  jenis_id: value === "__none" ? "" : value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis pelayanan (opsional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none" disabled>-- Pilih --</SelectItem>
                {(typeof window !== "undefined" ? JSON.parse(localStorage.getItem("masterDataJenisPelayanan") || "[]") : [])?.map((j: JenisPelayanan) => (
                  <SelectItem key={j.id} value={j.id}>
                    {j.nama} - Rp {j.biaya.toLocaleString("id-ID")}
                  </SelectItem>
                ))}
              </SelectContent>
                </Select>

            <Label htmlFor="jumlah">Jumlah (Rp) *</Label>
            <Input
              id="jumlah"
              type="number"
              value={formData.jumlah}
              onChange={(e) => setFormData({ ...formData, jumlah: e.target.value })}
              required
            />
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
        </div>
        {/* sync jumlah when jenis selected */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="metode_pembayaran">Metode Pembayaran</Label>
<<<<<<< HEAD
          <Select
            value={formData.metode_pembayaran}
            onValueChange={(value) =>
              setFormData({ ...formData, metode_pembayaran: value })
            }
          >
=======
          <Select value={formData.metode_pembayaran} onValueChange={(value) => setFormData({ ...formData, metode_pembayaran: value })}>
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="transfer">Transfer Bank</SelectItem>
              <SelectItem value="cash">Tunai</SelectItem>
              <SelectItem value="ewallet">E-Wallet</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status_pembayaran">Status</Label>
<<<<<<< HEAD
          <Select
            value={formData.status_pembayaran}
            onValueChange={(value) =>
              setFormData({ ...formData, status_pembayaran: value })
            }
          >
=======
          <Select value={formData.status_pembayaran} onValueChange={(value) => setFormData({ ...formData, status_pembayaran: value })}>
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="dibayar">Menunggu Verifikasi</SelectItem>
              <SelectItem value="lunas">Lunas</SelectItem>
              <SelectItem value="batal">Batal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tracking_code">Kode Tracking</Label>
        <Input
          id="tracking_code"
          value={formData.tracking_code}
<<<<<<< HEAD
          onChange={(e) =>
            setFormData({ ...formData, tracking_code: e.target.value })
          }
=======
          onChange={(e) => setFormData({ ...formData, tracking_code: e.target.value })}
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
          placeholder="Contoh: ABC12345"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="keterangan">Keterangan</Label>
        <Textarea
          id="keterangan"
          value={formData.keterangan}
<<<<<<< HEAD
          onChange={(e) =>
            setFormData({ ...formData, keterangan: e.target.value })
          }
=======
          onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit">{payment ? "Update" : "Tambah"}</Button>
      </div>
    </form>
<<<<<<< HEAD
  );
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
=======
  )
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount)
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
}

function statusBadge(status: string) {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    dibayar: "bg-blue-100 text-blue-800",
    lunas: "bg-green-100 text-green-800",
    batal: "bg-red-100 text-red-800",
<<<<<<< HEAD
  };
=======
  }
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
  const labels: Record<string, string> = {
    pending: "Pending",
    dibayar: "Menunggu Verifikasi",
    lunas: "Lunas",
    batal: "Batal",
<<<<<<< HEAD
  };
  return {
    className: colors[status] || "bg-gray-100 text-gray-800",
    label: labels[status] || status,
  };
}

export function PaymentManagement() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);
  const [loading, setLoading] = useState(false);
  const [jenisList, setJenisList] = useState<JenisPelayanan[]>([]);
  const { licenses } = useLicenses();
  const { toast } = useToast();

  useEffect(() => {
    loadPayments();
    if (typeof window !== "undefined") {
      setJenisList(
        JSON.parse(localStorage.getItem("masterDataJenisPelayanan") || "[]"),
      );
    }
  }, []);

  useEffect(() => {
    if (isDialogOpen && typeof window !== "undefined") {
      setJenisList(
        JSON.parse(localStorage.getItem("masterDataJenisPelayanan") || "[]"),
      );
    }
  }, [isDialogOpen]);

  useEffect(() => {
    if (!isDialogOpen && !editingPayment) {
      const timer = setTimeout(() => loadPayments(), 200);
      return () => clearTimeout(timer);
    }
  }, [isDialogOpen, editingPayment]);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/mysql/payments");
      const data = await res.json();
      if (data.success) {
        setPayments(data.data || []);
      }
    } catch (error) {
      console.error("Error loading payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const mergedRows = useMemo(() => {
    const existing = payments.map((payment) => ({
      ...payment,
      isLicenseRow: false,
    }));
    const existingLicenseIds = new Set(
      existing.filter((p) => p.license_id).map((p) => p.license_id!),
    );
    const existingTrackingCodes = new Set(
      existing.map((p) => p.tracking_code?.toUpperCase() || ""),
    );

    const licenseRows = licenses
      .filter((license) => license.status === "selesai")
      .filter(
        (license) =>
          !existingLicenseIds.has(license.id) &&
          !(
            license.trackingCode &&
            existingTrackingCodes.has(license.trackingCode.toUpperCase())
          ),
      )
      .map((license) => ({
        id: `license-${license.id}`,
        license_id: license.id,
        tracking_code: license.trackingCode || "",
        jenis_id: undefined,
        jenis_label: license.jenisIzin,
        pemohon_nama: license.pemohonNama || "-",
        jumlah: 0,
        metode_pembayaran: "transfer",
        status_pembayaran: "pending",
        tanggal_pembayaran: undefined,
        bukti_pembayaran: undefined,
        keterangan: "Perizinan selesai - belum tercatat pembayaran",
        created_at: license.createdAt,
        updated_at: license.updatedAt,
        isLicenseRow: true,
      }));

    return [...existing, ...licenseRows];
  }, [payments, licenses]);
=======
  }
  return { className: colors[status] || "bg-gray-100 text-gray-800", label: labels[status] || status }
}

export function PaymentManagement() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadPayments()
  }, [])

  useEffect(() => {
    if (!isDialogOpen && !editingPayment) {
      const timer = setTimeout(() => loadPayments(), 200)
      return () => clearTimeout(timer)
    }
  }, [isDialogOpen, editingPayment])

  const loadPayments = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/mysql/payments")
      const data = await res.json()
      if (data.success) {
        setPayments(data.data || [])
      }
    } catch (error) {
      console.error("Error loading payments:", error)
    } finally {
      setLoading(false)
    }
  }
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43

  const handleSubmit = async (data: PaymentFormData) => {
    try {
      const payload = {
        pemohon_nama: data.pemohon_nama,
        jumlah: Number(data.jumlah),
        metode_pembayaran: data.metode_pembayaran,
        status_pembayaran: data.status_pembayaran,
        tracking_code: data.tracking_code || null,
<<<<<<< HEAD
        jenis_id: data.jenis_id || null,
        license_id: selectedLicense?.id || null,
        keterangan: data.keterangan || null,
      };
=======
        keterangan: data.keterangan || null,
      }
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43

      if (editingPayment) {
        const res = await fetch(`/api/mysql/payments/${editingPayment.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
<<<<<<< HEAD
        });
        const result = await res.json();
        if (!result.success) throw new Error(result.error);
        toast({
          title: "Berhasil",
          description: "Pembayaran berhasil diperbarui",
        });
=======
        })
        const result = await res.json()
        if (!result.success) throw new Error(result.error)
        toast({ title: "Berhasil", description: "Pembayaran berhasil diperbarui" })
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
      } else {
        const res = await fetch("/api/mysql/payments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
<<<<<<< HEAD
        });
        const result = await res.json();
        if (!result.success) throw new Error(result.error);
        toast({
          title: "Berhasil",
          description: "Pembayaran berhasil ditambahkan",
        });
      }

      setIsDialogOpen(false);
      setEditingPayment(null);
      loadPayments();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Gagal menyimpan pembayaran",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/mysql/payments/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error);
      toast({ title: "Berhasil", description: "Pembayaran berhasil dihapus" });
      loadPayments();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus pembayaran",
        variant: "destructive",
      });
    }
  };

  const filteredPayments = mergedRows.filter(
    (p) =>
      p.pemohon_nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.jenis_label || "")
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      p.tracking_code?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalJumlah = payments.reduce(
    (sum, p) => sum + (Number(p.jumlah) || 0),
    0,
  );
  const pendingCount = payments.filter(
    (p) => p.status_pembayaran === "pending",
  ).length;
  const lunasCount = payments.filter(
    (p) => p.status_pembayaran === "lunas",
  ).length;
=======
        })
        const result = await res.json()
        if (!result.success) throw new Error(result.error)
        toast({ title: "Berhasil", description: "Pembayaran berhasil ditambahkan" })
      }

      setIsDialogOpen(false)
      setEditingPayment(null)
      loadPayments()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal menyimpan pembayaran",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/mysql/payments/${id}`, { method: "DELETE" })
      const result = await res.json()
      if (!result.success) throw new Error(result.error)
      toast({ title: "Berhasil", description: "Pembayaran berhasil dihapus" })
      loadPayments()
    } catch (error) {
      toast({ title: "Error", description: "Gagal menghapus pembayaran", variant: "destructive" })
    }
  }

  const filteredPayments = payments.filter(
    (p) =>
      p.pemohon_nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tracking_code?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalJumlah = payments.reduce((sum, p) => sum + (Number(p.jumlah) || 0), 0)
  const pendingCount = payments.filter((p) => p.status_pembayaran === "pending").length
  const lunasCount = payments.filter((p) => p.status_pembayaran === "lunas").length
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
<<<<<<< HEAD
          <h3 className="text-xl font-bold text-gray-900">
            Manajemen Pembayaran
          </h3>
          <p className="text-sm text-gray-600">
            Kelola data pembayaran retribusi perizinan
          </p>
=======
          <h3 className="text-xl font-bold text-gray-900">Manajemen Pembayaran</h3>
          <p className="text-sm text-gray-600">Kelola data pembayaran retribusi perizinan</p>
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
<<<<<<< HEAD
                setEditingPayment(null);
                setIsDialogOpen(true);
=======
                setEditingPayment(null)
                setIsDialogOpen(true)
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
              }}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Pembayaran
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
<<<<<<< HEAD
              <DialogTitle>
                {editingPayment ? "Edit Pembayaran" : "Tambah Pembayaran Baru"}
              </DialogTitle>
            </DialogHeader>
            <PaymentForm
              key={editingPayment?.id || selectedLicense?.id || "new"}
              payment={editingPayment || undefined}
              license={selectedLicense || undefined}
              jenisList={jenisList}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingPayment(null);
                setSelectedLicense(null);
=======
              <DialogTitle>{editingPayment ? "Edit Pembayaran" : "Tambah Pembayaran Baru"}</DialogTitle>
            </DialogHeader>
            <PaymentForm
              key={editingPayment?.id || "new"}
              payment={editingPayment || undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsDialogOpen(false)
                setEditingPayment(null)
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
<<<<<<< HEAD
            <CardTitle className="text-sm font-medium">
              Total Pembayaran
            </CardTitle>
=======
            <CardTitle className="text-sm font-medium">Total Pembayaran</CardTitle>
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Nilai</CardTitle>
            <CreditCard className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
<<<<<<< HEAD
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalJumlah)}
            </div>
=======
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalJumlah)}</div>
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
<<<<<<< HEAD
            <CardTitle className="text-sm font-medium">
              Pending / Lunas
            </CardTitle>
=======
            <CardTitle className="text-sm font-medium">Pending / Lunas</CardTitle>
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
            <CreditCard className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
<<<<<<< HEAD
              <span className="text-yellow-600">{pendingCount}</span> /{" "}
              <span className="text-green-600">{lunasCount}</span>
=======
              <span className="text-yellow-600">{pendingCount}</span> / <span className="text-green-600">{lunasCount}</span>
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Cari berdasarkan nama atau kode tracking..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama Pemohon</TableHead>
<<<<<<< HEAD
                <TableHead>Jenis Pelayanan</TableHead>
=======
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
                <TableHead>Jumlah</TableHead>
                <TableHead>Metode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bukti</TableHead>
                <TableHead>Tracking</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
<<<<<<< HEAD
                  <TableCell colSpan={9} className="text-center py-8">
                    Memuat data...
                  </TableCell>
                </TableRow>
              ) : filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    Tidak ada data pembayaran
                  </TableCell>
=======
                  <TableCell colSpan={8} className="text-center py-8">Memuat data...</TableCell>
                </TableRow>
              ) : filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">Tidak ada data pembayaran</TableCell>
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
                </TableRow>
              ) : (
                filteredPayments.map((payment, index) => (
                  <TableRow key={payment.id}>
                    <TableCell>{index + 1}</TableCell>
<<<<<<< HEAD
                    <TableCell className="font-medium">
                      {payment.pemohon_nama}
                    </TableCell>
                    <TableCell>
                      {payment.jenis_label ||
                        jenisList.find((j) => j.id === payment.jenis_id)
                          ?.nama ||
                        "-"}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(Number(payment.jumlah))}
                    </TableCell>
                    <TableCell className="capitalize">
                      {payment.metode_pembayaran}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          statusBadge(payment.status_pembayaran).className
                        }
                      >
=======
                    <TableCell className="font-medium">{payment.pemohon_nama}</TableCell>
                    <TableCell>{formatCurrency(Number(payment.jumlah))}</TableCell>
                    <TableCell className="capitalize">{payment.metode_pembayaran}</TableCell>
                    <TableCell>
                      <Badge className={statusBadge(payment.status_pembayaran).className}>
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
                        {statusBadge(payment.status_pembayaran).label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {payment.bukti_pembayaran ? (
                        <a
                          href={payment.bukti_pembayaran}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="h-4 w-4" />
                          Lihat
                        </a>
                      ) : (
                        <span className="text-sm text-slate-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>{payment.tracking_code || "-"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
<<<<<<< HEAD
                        {payment.status_pembayaran === "dibayar" &&
                          !payment.isLicenseRow && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={async () => {
                                try {
                                  const res = await fetch(
                                    `/api/mysql/payments/${payment.id}`,
                                    {
                                      method: "PUT",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        status_pembayaran: "lunas",
                                      }),
                                    },
                                  );
                                  const result = await res.json();
                                  if (!result.success)
                                    throw new Error(result.error);
                                  toast({
                                    title: "Berhasil",
                                    description:
                                      "Pembayaran diverifikasi sebagai lunas",
                                  });
                                  loadPayments();
                                } catch (error) {
                                  toast({
                                    title: "Error",
                                    description:
                                      "Gagal memverifikasi pembayaran",
                                    variant: "destructive",
                                  });
                                }
                              }}
                            >
                              Verifikasi
                            </Button>
                          )}
                        {payment.isLicenseRow ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedLicense(
                                licenses.find(
                                  (license) =>
                                    license.id === payment.license_id,
                                ) || null,
                              );
                              setEditingPayment(null);
                              setIsDialogOpen(true);
                            }}
                          >
                            Tambah Pembayaran
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditingPayment(payment);
                                setSelectedLicense(null);
                                setIsDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Hapus Pembayaran?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Apakah Anda yakin ingin menghapus pembayaran
                                    &quot;{payment.pemohon_nama}&quot;? Tindakan
                                    ini tidak dapat dibatalkan.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Batal</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(payment.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Hapus
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}
=======
                        {payment.status_pembayaran === "dibayar" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={async () => {
                              try {
                                const res = await fetch(`/api/mysql/payments/${payment.id}`, {
                                  method: "PUT",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ status_pembayaran: "lunas" }),
                                });
                                const result = await res.json();
                                if (!result.success) throw new Error(result.error);
                                toast({ title: "Berhasil", description: "Pembayaran diverifikasi sebagai lunas" });
                                loadPayments();
                              } catch (error) {
                                toast({ title: "Error", description: "Gagal memverifikasi pembayaran", variant: "destructive" });
                              }
                            }}
                          >
                            Verifikasi
                          </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={() => { setEditingPayment(payment); setIsDialogOpen(true) }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Pembayaran?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus pembayaran &quot;{payment.pemohon_nama}&quot;? Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(payment.id)} className="bg-red-600 hover:bg-red-700">
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
<<<<<<< HEAD
  );
=======
  )
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
}
