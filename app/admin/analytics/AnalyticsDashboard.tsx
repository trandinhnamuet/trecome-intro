'use client';

import { useCallback, useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Overview, RangeKey } from '@/lib/ga';
import { BarList, Kpi, axisTick, dayLabel, duration, nf, timeFmt } from '@/components/admin/StatsUi';
import './analytics.css';

/* Nhãn khoảng thời gian khai báo lại ở client: lib/ga.ts chạy trên node:crypto
   nên không kéo được vào bundle trình duyệt. */
const RANGE_LABELS: { key: RangeKey; label: string; vs: string }[] = [
  { key: 'today', label: 'Hôm nay', vs: 'hôm qua' },
  { key: '7d', label: '7 ngày', vs: '7 ngày trước đó' },
  { key: '28d', label: '28 ngày', vs: '28 ngày trước đó' },
  { key: '90d', label: '90 ngày', vs: '90 ngày trước đó' },
];

const SERIES = [
  { key: 'users', label: 'Người dùng', color: 'var(--an-series-1)' },
  { key: 'sessions', label: 'Phiên', color: 'var(--an-series-2)' },
  { key: 'pageViews', label: 'Lượt xem trang', color: 'var(--an-series-3)' },
] as const;

interface TooltipPayload {
  dataKey?: string | number;
  value?: number;
  color?: string;
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="an-tip">
      <div className="an-tip-date">{label ? dayLabel(String(label)) : ''}</div>
      {payload.map((item) => {
        const series = SERIES.find((s) => s.key === item.dataKey);
        return (
          <div key={String(item.dataKey)} className="an-tip-row">
            <span style={{ color: item.color }}>
              <i />
              <span style={{ color: 'var(--ink-3)' }}>{series?.label ?? String(item.dataKey)}</span>
            </span>
            <b>{nf.format(item.value ?? 0)}</b>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */

type Status = 'checking' | 'login' | 'ready';

export default function AnalyticsDashboard() {
  const [status, setStatus] = useState<Status>('checking');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [range, setRange] = useState<RangeKey>('28d');
  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async (key: RangeKey) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/analytics?range=${key}`, { cache: 'no-store' });
      if (res.status === 401) {
        setStatus('login');
        setData(null);
        return;
      }
      const body = await res.json();
      if (!res.ok) {
        setError(body.error || `Lỗi ${res.status}`);
        setData(null);
        return;
      }
      setData(body as Overview);
      setStatus('ready');
    } catch {
      setError('Không gọi được API. Kiểm tra kết nối mạng.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/admin/session', { cache: 'no-store' });
        const body = await res.json();
        if (cancelled) return;
        if (body.authenticated) load(range);
        else setStatus('login');
      } catch {
        if (!cancelled) setStatus('login');
      }
    })();
    return () => {
      cancelled = true;
    };
    // Chỉ chạy một lần lúc mount; đổi range sau đó do handler lo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setLoginError('');
    try {
      const res = await fetch('/api/admin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const body = await res.json();
      if (!res.ok) {
        setLoginError(body.error || 'Đăng nhập thất bại');
        return;
      }
      setPassword('');
      await load(range);
    } catch {
      setLoginError('Không gọi được API');
    } finally {
      setSubmitting(false);
    }
  }

  async function logout() {
    await fetch('/api/admin/session', { method: 'DELETE' });
    setData(null);
    setStatus('login');
  }

  function pickRange(key: RangeKey) {
    setRange(key);
    load(key);
  }

  if (status === 'checking') {
    return (
      <div className="an-root">
        <div className="an-wrap">
          <div className="an-skeleton" style={{ height: 120, marginBottom: 14 }} />
          <div className="an-skeleton" style={{ height: 340 }} />
        </div>
      </div>
    );
  }

  if (status === 'login') {
    return (
      <div className="an-root">
        <div className="an-wrap">
          <div className="an-state">
            <h1>Trecome Analytics</h1>
            <p>Khu vực nội bộ. Nhập mật khẩu quản trị để xem số liệu truy cập của trecome.vn.</p>
            <form onSubmit={login}>
              <input
                className="an-field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu quản trị"
                autoFocus
              />
              <button className="an-submit" type="submit" disabled={submitting || !password}>
                {submitting ? 'Đang kiểm tra…' : 'Đăng nhập'}
              </button>
              {loginError && <div className="an-error">{loginError}</div>}
            </form>
          </div>
        </div>
      </div>
    );
  }

  const rangeMeta = RANGE_LABELS.find((r) => r.key === range)!;

  return (
    <div className="an-root">
      <div className="an-wrap">
        <header className="an-head">
          <div>
            <h1>Traffic trecome.vn</h1>
            <div className="an-sub">
              Nguồn: Google Analytics 4
              {data && ` · cập nhật ${timeFmt.format(new Date(data.updatedAt))}`}
            </div>
          </div>
          <div className="an-head-actions">
            <a className="an-btn" href="/admin/visitors">
              Nhật ký truy cập
            </a>
            {data && (
              <span className="an-live">
                <span className="an-dot" />
                {nf.format(data.activeNow)} người đang online
              </span>
            )}
            <button className="an-btn" onClick={() => load(range)} disabled={loading}>
              {loading ? 'Đang tải…' : 'Làm mới'}
            </button>
            <button className="an-btn" onClick={logout}>
              Đăng xuất
            </button>
          </div>
        </header>

        {error && (
          <div className="an-banner">
            <strong>Không lấy được số liệu.</strong> {error}
          </div>
        )}

        <div className="an-filters">
          {RANGE_LABELS.map((item) => (
            <button
              key={item.key}
              className="an-chip"
              aria-pressed={item.key === range}
              onClick={() => pickRange(item.key)}
              disabled={loading}
            >
              {item.label}
            </button>
          ))}
        </div>

        {!data && !error && <div className="an-skeleton" style={{ height: 340 }} />}

        {/* GA4 giữ realtime và báo cáo tổng hợp ở hai kho khác nhau. Realtime có
            ngay, báo cáo phải chờ GA xử lý. Không nói rõ thì nhìn "đang online:
            5" cạnh "người dùng: 0" rất giống hỏng. */}
        {data && data.timeseries.length === 0 && (
          <div className="an-note">
            <strong>Báo cáo tổng hợp chưa có dữ liệu.</strong> Số &quot;đang online&quot; phía trên lấy từ Realtime
            API nên đúng ngay, còn các chỉ số theo ngày phải chờ GA4 xử lý — thường 4–24 giờ với property mới tạo,
            Google ghi tối đa 48 giờ. Chưa cần làm gì cả.
          </div>
        )}

        {data && (
          <>
            <div className="an-kpis">
              <Kpi
                label="Người dùng"
                value={nf.format(data.current.users)}
                current={data.current.users}
                previous={data.previous.users}
                vs={rangeMeta.vs}
              />
              <Kpi
                label="Người dùng mới"
                value={nf.format(data.current.newUsers)}
                current={data.current.newUsers}
                previous={data.previous.newUsers}
                vs={rangeMeta.vs}
              />
              <Kpi
                label="Phiên truy cập"
                value={nf.format(data.current.sessions)}
                current={data.current.sessions}
                previous={data.previous.sessions}
                vs={rangeMeta.vs}
              />
              <Kpi
                label="Lượt xem trang"
                value={nf.format(data.current.pageViews)}
                current={data.current.pageViews}
                previous={data.previous.pageViews}
                vs={rangeMeta.vs}
              />
              <Kpi
                label="Thời lượng phiên TB"
                value={duration(data.current.avgSessionDuration)}
                current={data.current.avgSessionDuration}
                previous={data.previous.avgSessionDuration}
                vs={rangeMeta.vs}
              />
              <Kpi
                label="Tỉ lệ thoát"
                value={`${(data.current.bounceRate * 100).toFixed(1)}%`}
                current={data.current.bounceRate}
                previous={data.previous.bounceRate}
                vs={rangeMeta.vs}
                lowerIsBetter
              />
            </div>

            <div className="an-card" style={{ marginBottom: 14 }}>
              <h2>Diễn biến theo ngày</h2>
              <div className="an-hint">{rangeMeta.label} gần nhất</div>

              {/* Legend chỉ mang tên series; con số tổng của đúng ba chỉ số này
                  nằm ngay ở hàng KPI phía trên nên không lặp lại ở đây (cộng dồn
                  "người dùng" theo ngày cũng không bằng tổng kỳ vì GA khử trùng
                  lặp người dùng quay lại). */}
              <div className="an-legend">
                {SERIES.map((series) => (
                  <span key={series.key} style={{ color: series.color }}>
                    <i />
                    <span style={{ color: 'var(--ink-3)' }}>{series.label}</span>
                  </span>
                ))}
              </div>

              <div className="an-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.timeseries} margin={{ top: 6, right: 12, bottom: 0, left: -12 }}>
                    <CartesianGrid stroke="var(--line-2)" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickFormatter={dayLabel}
                      tick={{ fill: 'var(--muted-2)', fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: 'var(--line)' }}
                      minTickGap={24}
                    />
                    <YAxis
                      tick={{ fill: 'var(--muted-2)', fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={axisTick}
                      width={56}
                    />
                    <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'var(--line)' }} />
                    {SERIES.map((series) => (
                      <Line
                        key={series.key}
                        type="monotone"
                        dataKey={series.key}
                        stroke={series.color}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, strokeWidth: 2, stroke: 'var(--an-surface)' }}
                        isAnimationActive={false}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="an-grid cols-2">
              <div className="an-card">
                <h2>Trang được xem nhiều nhất</h2>
                <div className="an-hint">Top 10 theo lượt xem</div>
                <BarList
                  rows={data.topPages.map((page) => ({ label: page.path, sub: page.title, value: page.views }))}
                  unit="lượt"
                />
              </div>
              <div className="an-card">
                <h2>Nguồn truy cập</h2>
                <div className="an-hint">Kênh mang khách vào site</div>
                <BarList rows={data.channels.map((c) => ({ label: c.name, value: c.value }))} unit="phiên" />
              </div>
            </div>

            <div className="an-grid cols-2">
              <div className="an-card">
                <h2>Thiết bị</h2>
                <div className="an-hint">Phiên theo loại thiết bị</div>
                <BarList rows={data.devices.map((d) => ({ label: d.name, value: d.value }))} unit="phiên" />
              </div>
              <div className="an-card">
                <h2>Khu vực</h2>
                <div className="an-hint">Top thành phố theo phiên</div>
                <BarList rows={data.cities.map((c) => ({ label: c.name, value: c.value }))} unit="phiên" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
