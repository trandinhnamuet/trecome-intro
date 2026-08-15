import { NextRequest, NextResponse } from 'next/server';
import { AdminConfigError, isAuthenticated } from '@/lib/admin-auth';
import { StatsConfigError, getVisitStats, isConfigured, isVisitRange } from '@/lib/visits';

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
      { error: 'Chưa cấu hình STATS_DB_NAME / STATS_SITE', code: 'not_configured' },
      { status: 503 }
    );
  }

  const params = request.nextUrl.searchParams;
  const rangeParam = params.get('range');
  const range = isVisitRange(rangeParam) ? rangeParam : '7d';
  const page = Math.max(1, Number(params.get('page')) || 1);
  const search = params.get('q') ?? '';

  try {
    return NextResponse.json(await getVisitStats(range, page, search));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Lỗi không xác định';
    console.error('Visitors API error:', error);
    return NextResponse.json(
      { error: message, code: error instanceof StatsConfigError ? 'not_configured' : 'db_error' },
      { status: error instanceof StatsConfigError ? 503 : 502 }
    );
  }
}
