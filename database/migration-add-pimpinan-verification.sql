-- Migration: Add pimpinan verification fields to licenses table
-- Run this SQL to add TTD/verification by pimpinan support

ALTER TABLE licenses
  ADD COLUMN pimpinan_verified BOOLEAN DEFAULT FALSE AFTER verified_at,
  ADD COLUMN pimpinan_verified_by VARCHAR(255) NULL AFTER pimpinan_verified,
  ADD COLUMN pimpinan_verified_at TIMESTAMP NULL AFTER pimpinan_verified_by;
