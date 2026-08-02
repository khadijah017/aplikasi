<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import { getMySQLPool } from "@/lib/mysql";
import mysql from "mysql2/promise";

export const dynamic = "force-dynamic";

async function hasColumn(
  pool: ReturnType<typeof getMySQLPool>,
  table: string,
  column: string,
) {
  const [rows] = await pool.execute(
    `SHOW COLUMNS FROM ${mysql.escapeId(table)} LIKE ${mysql.escape(column)}`,
  );
  return Array.isArray(rows) && rows.length > 0;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const pool = getMySQLPool();
    const [rows] = await pool.execute("SELECT * FROM payments WHERE id = ?", [
      resolvedParams.id,
    ]);
    const payment = Array.isArray(rows) ? rows[0] : null;
    if (!payment) {
      return NextResponse.json(
        { success: false, error: "Payment not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: payment });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    const allowedFields = [
      "jumlah",
      "metode_pembayaran",
      "status_pembayaran",
      "tanggal_pembayaran",
      "bukti_pembayaran",
      "keterangan",
      "license_id",
      "tracking_code",
    ];
    if (await hasColumn(getMySQLPool(), "payments", "jenis_id")) {
      allowedFields.push("jenis_id");
    }
=======
import { NextRequest, NextResponse } from 'next/server';
import { getMySQLPool } from '@/lib/mysql';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const pool = getMySQLPool();
    const [rows] = await pool.execute('SELECT * FROM payments WHERE id = ?', [resolvedParams.id]);
    const payment = Array.isArray(rows) ? rows[0] : null;
    if (!payment) {
      return NextResponse.json({ success: false, error: 'Payment not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: payment });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    const allowedFields = ['jumlah', 'metode_pembayaran', 'status_pembayaran', 'tanggal_pembayaran', 'bukti_pembayaran', 'keterangan', 'license_id', 'tracking_code'];
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
    const updates: string[] = [];
    const values: any[] = [];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates.push(`${field} = ?`);
        values.push(body[field]);
      }
    }

    if (updates.length === 0) {
<<<<<<< HEAD
      return NextResponse.json(
        { success: false, error: "No fields to update" },
        { status: 400 },
      );
    }

    updates.push("updated_at = ?");
    values.push(new Date().toISOString().slice(0, 19).replace("T", " "));
    values.push(resolvedParams.id);

    const pool = getMySQLPool();
    await pool.execute(
      `UPDATE payments SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );

    const [rows] = await pool.execute("SELECT * FROM payments WHERE id = ?", [
      resolvedParams.id,
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
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const pool = getMySQLPool();
    await pool.execute("DELETE FROM payments WHERE id = ?", [
      resolvedParams.id,
    ]);
    return NextResponse.json({ success: true, message: "Payment deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
=======
      return NextResponse.json({ success: false, error: 'No fields to update' }, { status: 400 });
    }

    updates.push('updated_at = ?');
    values.push(new Date().toISOString().slice(0, 19).replace('T', ' '));
    values.push(resolvedParams.id);

    const pool = getMySQLPool();
    await pool.execute(`UPDATE payments SET ${updates.join(', ')} WHERE id = ?`, values);

    const [rows] = await pool.execute('SELECT * FROM payments WHERE id = ?', [resolvedParams.id]);
    return NextResponse.json({ success: true, data: Array.isArray(rows) ? rows[0] : null });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const pool = getMySQLPool();
    await pool.execute('DELETE FROM payments WHERE id = ?', [resolvedParams.id]);
    return NextResponse.json({ success: true, message: 'Payment deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
>>>>>>> 4c4f0770793d167becd0ecb8e522c555a3d88c43
  }
}
