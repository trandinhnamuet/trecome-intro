import { NextRequest, NextResponse } from 'next/server';
import { AdminConfigError, isAuthenticated } from '@/lib/admin-auth';
import { GaConfigError, getOverview, isConfigured, isRangeKey } from '@/lib/ga';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    }
  } catch (error) {
    if (error instanceof AdminConfigError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }
    throw error;
  }

  if (!isConfigured()) {
    return NextResponse.json(
      { error: 'Chưa cấu hình GA_PROPERTY_ID / GA_SERVICE_ACCOUNT_KEY', code: 'not_configured' },
      { status: 503 }
    );
  }

  const rangeParam = request.nextUrl.searchParams.get('range');
  const range = isRangeKey(rangeParam) ? rangeParam : '28d';

  try {
    return NextResponse.json(await getOverview(range));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Lỗi không xác định';
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: message, code: error instanceof GaConfigError ? 'not_configured' : 'upstream_error' },
      { status: error instanceof GaConfigError ? 503 : 502 }
    );
  }
}
