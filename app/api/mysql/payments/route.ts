<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import { getMySQLPool } from "@/lib/mysql";
import mysql from "mysql2/promise";
import crypto from "crypto";

export const dynamic = "force-dynamic";

async function hasColumn(
  pool: ReturnType<typeof getMySQLPool>,
  table: string,
  column: string,
) {
  const [rows] = await pool.execute(
    `SHOW COLUMNS FROM ${table} LIKE ${mysql.escape(column)}`,
  );
  return Array.isArray(rows) && rows.length > 0;
}
=======
import { NextRequest, NextResponse } from 'next/server';
import { getMySQLPool } from '@/lib/mysql';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43

export async function GET() {
  try {
    const pool = getMySQLPool();
<<<<<<< HEAD
    const [rows] = await pool.execute(
      "SELECT * FROM payments ORDER BY created_at DESC",
    );
    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
=======
    const [rows] = await pool.execute('SELECT * FROM payments ORDER BY created_at DESC');
    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
<<<<<<< HEAD
    const {
      license_id,
      tracking_code,
      jenis_id,
      pemohon_nama,
      jumlah,
      metode_pembayaran,
      status_pembayaran,
      tanggal_pembayaran,
      bukti_pembayaran,
      keterangan,
    } = body;

    if (!pemohon_nama) {
      return NextResponse.json(
        { success: false, error: "Nama pemohon wajib diisi" },
        { status: 400 },
      );
=======
    const { license_id, tracking_code, pemohon_nama, jumlah, metode_pembayaran, status_pembayaran, tanggal_pembayaran, bukti_pembayaran, keterangan } = body;

    if (!pemohon_nama) {
      return NextResponse.json({ success: false, error: 'Nama pemohon wajib diisi' }, { status: 400 });
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
    }

    const pool = getMySQLPool();
    const id = crypto.randomUUID();
<<<<<<< HEAD
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");

    const validStatuses = ["pending", "dibayar", "lunas", "batal"];
    const finalStatus = validStatuses.includes(status_pembayaran)
      ? status_pembayaran
      : "pending";

    const columns = [
      "id",
      "license_id",
      "tracking_code",
      "pemohon_nama",
      "jumlah",
      "metode_pembayaran",
      "status_pembayaran",
      "tanggal_pembayaran",
      "bukti_pembayaran",
      "keterangan",
      "created_at",
      "updated_at",
    ];
    const values: any[] = [
      id,
      license_id || null,
      tracking_code || null,
      pemohon_nama,
      jumlah || 0,
      metode_pembayaran || "transfer",
      finalStatus,
      tanggal_pembayaran || null,
      bukti_pembayaran || null,
      keterangan || null,
      now,
      now,
    ];

    if (await hasColumn(pool, "payments", "jenis_id")) {
      columns.splice(3, 0, "jenis_id");
      values.splice(3, 0, jenis_id || null);
    }

    await pool.execute(
      `INSERT INTO payments (${columns.join(", ")}) VALUES (${columns.map(() => "?").join(", ")})`,
      values,
    );

    const [rows] = await pool.execute("SELECT * FROM payments WHERE id = ?", [
      id,
    ]);
    return NextResponse.json({
      success: true,
      data: Array.isArray(rows) ? rows[0] : null,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
=======
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const validStatuses = ['pending', 'dibayar', 'lunas', 'batal'];
    const finalStatus = validStatuses.includes(status_pembayaran) ? status_pembayaran : 'pending';

    await pool.execute(
      `INSERT INTO payments (id, license_id, tracking_code, pemohon_nama, jumlah, metode_pembayaran, status_pembayaran, tanggal_pembayaran, bukti_pembayaran, keterangan, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, license_id || null, tracking_code || null, pemohon_nama, jumlah || 0, metode_pembayaran || 'transfer', finalStatus, tanggal_pembayaran || null, bukti_pembayaran || null, keterangan || null, now, now]
    );

    const [rows] = await pool.execute('SELECT * FROM payments WHERE id = ?', [id]);
    return NextResponse.json({ success: true, data: Array.isArray(rows) ? rows[0] : null });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
  }
}
