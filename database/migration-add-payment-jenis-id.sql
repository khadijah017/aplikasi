-- Migration: Add jenis_id column to payments table
-- Run this if the payments table already exists and needs to store master data jenis pelayanan.

ALTER TABLE payments
ADD COLUMN jenis_id VARCHAR(36) NULL AFTER tracking_code;
