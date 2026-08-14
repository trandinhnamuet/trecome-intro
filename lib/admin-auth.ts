/**
 * Cổng mật khẩu cho khu /admin.
 *
 * Đủ dùng cho một dashboard nội bộ một người quản trị: không có user store, chỉ
 * một mật khẩu duy nhất trong env. Cookie lưu token dẫn xuất từ mật khẩu (HMAC)
 * chứ không lưu mật khẩu, và đặt httpOnly nên script phía client không đọc được.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';

export const ADMIN_COOKIE = 'trecome_admin';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 ngày

const SESSION_SALT = 'trecome-admin-session-v1';

export class AdminConfigError extends Error {}

function adminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new AdminConfigError('Chưa cấu hình ADMIN_PASSWORD');
  return password;
}

function equals(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  // timingSafeEqual ném lỗi nếu khác độ dài, mà độ dài không phải bí mật cần giấu.
  return left.length === right.length && timingSafeEqual(left, right);
}

export function sessionToken(): string {
  return createHmac('sha256', adminPassword()).update(SESSION_SALT).digest('hex');
}

export function verifyPassword(input: unknown): boolean {
  return typeof input === 'string' && equals(input, adminPassword());
}

export function isAuthenticated(request: NextRequest): boolean {
  const cookie = request.cookies.get(ADMIN_COOKIE)?.value;
  return Boolean(cookie) && equals(cookie!, sessionToken());
}
