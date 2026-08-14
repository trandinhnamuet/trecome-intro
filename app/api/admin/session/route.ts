import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, AdminConfigError, SESSION_MAX_AGE, isAuthenticated, sessionToken, verifyPassword } from '@/lib/admin-auth';

export const runtime = 'nodejs';

/** Kiểm tra phiên hiện tại — dashboard gọi lúc mount để biết hiện form hay hiện số liệu. */
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ authenticated: isAuthenticated(request) });
  } catch (error) {
    if (error instanceof AdminConfigError) {
      return NextResponse.json({ authenticated: false, error: error.message }, { status: 503 });
    }
    throw error;
  }
}

/** Đăng nhập. */
export async function POST(request: NextRequest) {
  let password: unknown;
  try {
    ({ password } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Body không hợp lệ' }, { status: 400 });
  }

  try {
    if (!verifyPassword(password)) {
      return NextResponse.json({ error: 'Sai mật khẩu' }, { status: 401 });
    }
    const response = NextResponse.json({ authenticated: true });
    response.cookies.set(ADMIN_COOKIE, sessionToken(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: SESSION_MAX_AGE,
    });
    return response;
  } catch (error) {
    if (error instanceof AdminConfigError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }
    throw error;
  }
}

/** Đăng xuất. */
export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.delete(ADMIN_COOKIE);
  return response;
}
