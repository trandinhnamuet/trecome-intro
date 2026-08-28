# tax.trecome.vn — trang dịch vụ kế toán

Trang riêng cho mảng kế toán – thuế. **Cùng repo, khác nhánh**: toàn bộ code nằm
trên nhánh `tax`, dùng lại nguyên bộ UI của `main` (cùng `globals.css`, cùng các
component), chỉ thay nội dung và cấu trúc section.

Vì sao không tách repo: CSS và layout là tài sản chung, sửa một lần muốn cả hai
site cùng hưởng. Vì sao không cùng nhánh: nội dung hai site không có phần nào
dùng chung, gộp vào một nhánh thì mỗi lần build phải mang theo nội dung của site
kia.

## Nội dung lấy từ đâu

Hai file gốc do khách cung cấp, để trong thư mục `Tài liệu kế toán/`
(**không** commit — chứa bảng giá nội bộ):

| File | Dùng cho |
|---|---|
| `TC_Bài giới thiệu.docx` | Hero, khu "Tại sao chọn chúng tôi", cam kết dịch vụ |
| `GÓI DỊCH VỤ_TRECOM.xlsx` — Sheet1 | Bảng 4 nhóm doanh thu, phí theo nhóm, giá phần mềm, 4 cấp độ dịch vụ, bộ báo cáo quản trị |
| `GÓI DỊCH VỤ_TRECOM.xlsx` — Sheet "DV và BG" | Phạm vi dịch vụ, danh mục dịch vụ, cam kết, bảng giá HKD và doanh nghiệp |

Khi khách gửi bản cập nhật, sửa ở ba nơi và phải khớp nhau:

- `lib/i18n.ts` — chữ (cả `vi` lẫn `en`)
- `lib/tax-policy.ts` — số liệu khu nền tối (nhóm doanh thu, kỳ kê khai)
- `components/Pricing.tsx` — mức phí, gói, và ma trận so sánh cấp độ dịch vụ

`lib/tax-policy.ts` và các key `group.*` trong `i18n.ts` cùng mô tả một bộ quy
định — đổi một chỗ mà quên chỗ kia là trang tự mâu thuẫn với chính nó.

## Khác gì so với `main`

| | main (trecome.vn) | tax (tax.trecome.vn) |
|---|---|---|
| Section | Hero → Marquee → MarketData → Process → Services → Pricing → CTA | Hero → Marquee → Why → TaxPolicy → TaxGroups → Process → Services → Reports → Pricing → FAQ → CTA |
| Component thêm | | `Why`, `TaxGroups`, `Reports` |
| Component đổi tên | `MarketData` + `lib/market-data.ts` | `TaxPolicy` + `lib/tax-policy.ts` |
| Component bỏ | | `Cases`, `Testimonials`, `Blog`, `Team`, `Stats` (không còn nội dung tương ứng) |
| Toggle bảng giá | tháng / quý | Hộ & cá nhân kinh doanh / Doanh nghiệp |
| Logo | `logo-trim.png` | `logo-tax.png` |

### Logo

`public/assets/logo-tax.png` được dựng lại từ `logo-small.png`: giữ nguyên chữ
TRECOME, thay dòng tagline "E-COMMERCE SERVICES & OPERATIONS" bằng "ACCOUNTING &
TAX SERVICES". Dòng tagline mới **không** dùng đúng font gốc (dựng bằng Century
Gothic Bold, font gần nhất có sẵn) — nếu bộ nhận diện có file gốc, thay lại bằng
bản của designer rồi ghi đè đúng đường dẫn này.

## Deploy — VPS `103.28.33.163`

Chạy song song với trecome.vn trên cùng máy, tách bằng port và tên app pm2.

| | trecome.vn | tax.trecome.vn |
|---|---|---|
| Thư mục | `/root/trecome-nextjs` | `/root/trecome-tax` |
| Nhánh | `main` | `tax` |
| Port | 3006 | 3007 |
| pm2 | `trecome-nextjs` | `trecome-tax` |
| `STATS_SITE` | `trecome` | `trecome-tax` |

Tên miền `tax.trecome.vn` đã trỏ A record về `103.28.33.163` trên Mắt Bão.

### Lần đầu

```bash
ssh root@103.28.33.163
git clone -b tax https://github.com/trandinhnamuet/trecome-intro.git /root/trecome-tax
cd /root/trecome-tax
cp /root/trecome-nextjs/.env.local .           # dùng chung SMTP, DB, service account
nano .env.local                                # xem bảng biến bên dưới
npm ci
npm run build
pm2 start npm --name trecome-tax -- start -- -p 3007
pm2 save
```

Biến phải sửa lại sau khi copy `.env.local`:

| Biến | Giá trị | Vì sao |
|---|---|---|
| `STATS_SITE` | `trecome-tax` | tách lượt truy cập khỏi trecome.vn trong bảng `visits` |
| `NEXT_PUBLIC_GA_ID` | property GA4 riêng của tax.trecome.vn | để chung sẽ trộn số liệu hai site; **nhúng lúc build**, đổi thì phải build lại |
| `GA_PROPERTY_ID` | property ID tương ứng | `/admin/analytics` đọc đúng property |

Các biến còn lại (`SMTP_*`, `CONTACT_EMAIL`, `GA_SERVICE_ACCOUNT_KEY`,
`ADMIN_PASSWORD`, `STATS_DB_*`) dùng chung được, giữ nguyên.

Nếu chưa tạo GA property riêng thì cứ để trống hai biến GA — trang vẫn chạy,
`VisitTracker` vẫn ghi lượt truy cập vào DB, chỉ khu `/admin/analytics` là trống.

### nginx

`/etc/nginx/sites-available/tax.trecome.vn`:

```nginx
server {
    listen 80;
    server_name tax.trecome.vn;

    location / {
        proxy_pass http://127.0.0.1:3007;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        # VisitTracker lấy IP từ X-Real-IP, không lấy phần tử đầu X-Forwarded-For
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/tax.trecome.vn /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
certbot --nginx -d tax.trecome.vn
```

### Deploy lại sau khi sửa code

```bash
ssh root@103.28.33.163
cd /root/trecome-tax
git pull origin tax
npm ci
npm run build
pm2 restart trecome-tax --update-env
```

> Máy chỉ có 3.8GB RAM và giờ chạy thêm một app Node nữa. Swap 2GB
> (`/swapfile`) là thứ giữ cho `next build` không bị OOM — đừng xoá. Nếu build
> vẫn chết, dừng tạm `trecome-nextjs` trong lúc build rồi bật lại.
