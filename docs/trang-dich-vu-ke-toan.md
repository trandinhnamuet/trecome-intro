# tax.trecome.vn — trang dịch vụ kế toán

Trang riêng cho mảng kế toán – thuế. **Cùng repo, khác nhánh**: toàn bộ code nằm
trên nhánh `tax`, dùng lại nguyên bộ UI của `main` (cùng `globals.css`, cùng các
component), chỉ thay nội dung và cấu trúc section.

Vì sao không tách repo: CSS và layout là tài sản chung, sửa một lần muốn cả hai
site cùng hưởng. Vì sao không cùng nhánh: nội dung hai site không có phần nào
dùng chung, gộp vào một nhánh thì mỗi lần build phải mang theo nội dung của site
kia.

## Nhánh nào sửa gì

Hai nhánh phát triển **độc lập**, không merge qua lại:

| Nhánh | Site | Sửa những gì |
|---|---|---|
| `main` | www.trecome.vn | nội dung TMĐT, và mọi thứ dùng chung: `app/admin/*`, `app/api/*`, `lib/visits.ts`, `lib/email.ts`, `lib/sheets.ts`, `app/globals.css` |
| `tax` | tax.trecome.vn | chỉ nội dung kế toán: `lib/i18n.ts`, `lib/tax-policy.ts`, các component của trang, `docs/trang-dich-vu-ke-toan.md` |

**Trước khi commit, xem đang đứng ở nhánh nào.** Ngày 2026-08-28 đã có một lần
sửa `app/admin/*` và `lib/visits.ts` trong lúc đang checkout `tax`, commit
`83ec72b` — phải rebase gỡ ra khỏi `tax` rồi làm lại trên `main` (`e7a63cf`).

Sửa phần dùng chung thì làm trên `main`, rồi cherry-pick sang `tax` đúng commit
đó — đừng merge cả nhánh, vì nội dung hai site xung đột toàn bộ.

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
| Ảnh hero | 3 ảnh marketing Shopee | 3 ảnh kế toán từ Unsplash |

### Ảnh hero

Ba ảnh chạy luân phiên 4 giây một lần trong vòng tròn ở hero, khai báo tại
`HERO_SLIDES` trong `components/Hero.tsx`.

Bản trên `main` dùng ba ảnh marketing của Shopee — vừa sai chủ đề, vừa là
thương hiệu của bên thứ ba trên một trang bán dịch vụ kế toán. Đã thay hết bằng
ảnh Unsplash:

| File | Ảnh | Tác giả | Nguồn |
|---|---|---|---|
| `1.jpg` | kế toán viên làm việc bên máy tính và chứng từ | cornerstone accounting | [G90H3ylKC7E](https://unsplash.com/photos/G90H3ylKC7E) |
| `2.jpg` | phân tích báo cáo trên tablet giữa các biểu đồ | Jakub Żerdzicki | [ykgLX_CwtDw](https://unsplash.com/photos/ykgLX_CwtDw) |
| `3.jpg` | bàn làm việc với máy tính, biểu đồ, bìa hồ sơ | Cht Gsml | [FVwy7PBiSUo](https://unsplash.com/photos/FVwy7PBiSUo) |

#### Cẩn thận ảnh Unsplash+

Kết quả tìm kiếm của Unsplash **trộn lẫn** ảnh free và ảnh Unsplash+ (trả phí).
Ảnh Unsplash+ tải về không đăng ký thì bị đóng watermark chữ "Unsplash+" mờ rải
khắp ảnh — nhạt tới mức nhìn lướt không thấy, chỉ lộ ra khi tăng tương phản.

Lần thay ảnh đầu tiên đã dính đúng bẫy này: hai trong ba ảnh chọn ra là
Unsplash+, phải bỏ và chọn lại.

Cách phân biệt chắc chắn nhất là nhìn URL trong kết quả API:

| Loại | URL ảnh |
|---|---|
| Free — dùng được | `https://images.unsplash.com/photo-…` |
| Unsplash+ — **không** dùng | `https://plus.unsplash.com/premium_photo-…` |

Trong một lượt tìm 10 từ khoá có tới 42 ảnh thuộc loại thứ hai, nên phải lọc chứ
không thể chọn bằng mắt. Sau khi tải về vẫn nên soi lại: mở ảnh, tăng tương phản
lên ~2.5 lần rồi nhìn vùng sáng xem có chữ mờ không.

**Unsplash License** (ảnh free): dùng thương mại được, không cần xin phép, không
bắt buộc ghi công. Bảng nguồn ở trên giữ lại để sau này còn truy được xuất xứ,
không phải để tuân thủ giấy phép.

#### Khi thay ảnh khác

1. **Chủ thể phải nằm giữa khung.** Ảnh lấp đầy vòng tròn bằng `object-fit:
   cover`, tức là bị cắt bớt hai rìa. Trước đây `Hero.tsx` có hàm `fitDiagonal`
   co ảnh lọt trọn vào vòng tròn (đường chéo ảnh bằng đường kính) — không cắt
   mất gì nhưng chừa lại hai mảng trắng trên/dưới, nên đã bỏ.
2. **1600px chiều ngang là đủ.** Vòng tròn chỉ hiển thị ảnh ở khoảng 420px, để
   1600px là đã dư cho màn retina. Ba ảnh hiện tại tổng 499KB, nhẹ hơn nhiều so
   với bộ Shopee cũ (2.1MB).

### Logo

`public/assets/logo-tax.png` được dựng lại từ `logo-small.png`: giữ nguyên chữ
TRECOME, thay dòng tagline "E-COMMERCE SERVICES & OPERATIONS" bằng "ACCOUNTING &
TAX SERVICES". Dòng tagline mới **không** dùng đúng font gốc (dựng bằng Century
Gothic Bold, font gần nhất có sẵn) — nếu bộ nhận diện có file gốc, thay lại bằng
bản của designer rồi ghi đè đúng đường dẫn này.

## Deploy — VPS `103.28.33.163`

**Đã chạy thật ngày 2026-08-28**, đang online tại https://tax.trecome.vn.
Chạy song song với trecome.vn trên cùng máy, tách bằng port và tên app pm2.

| | trecome.vn | tax.trecome.vn |
|---|---|---|
| Thư mục | `/root/trecome-nextjs` | `/root/trecome-tax` |
| Nhánh | `main` | `tax` |
| Port | 3006 | 3007 |
| pm2 | `trecome-nextjs` | `trecome-tax` |
| nginx | `/etc/nginx/sites-available/trecome.conf` | `/etc/nginx/sites-available/tax.trecome.conf` |
| Chứng chỉ | `trecome.vn` (kèm 3 domain phụ) | `tax.trecome.vn`, hết hạn 2026-11-26 |
| `STATS_SITE` | `trecome` | `trecome-tax` |

`pm2 save` đã chạy và `pm2-root.service` đang enabled, nên app tự lên lại sau
khi reboot. `certbot.timer` enabled, `certbot renew --dry-run` cho domain này
đã pass.

### Biến môi trường

`.env.local` copy từ `/root/trecome-nextjs/.env.local` rồi sửa ba biến:

| Biến | Giá trị | Vì sao |
|---|---|---|
| `STATS_SITE` | `trecome-tax` | tách lượt truy cập khỏi trecome.vn trong bảng `visits` |
| `NEXT_PUBLIC_GA_ID` | **để trống** | xem bên dưới |
| `GA_PROPERTY_ID` | **để trống** | property tương ứng cũng chưa có |

Các biến còn lại (`SMTP_*`, `CONTACT_EMAIL`, `GOOGLE_*`, `GA_SERVICE_ACCOUNT_KEY`,
`ADMIN_PASSWORD`, `STATS_DB_*`) dùng chung, giữ nguyên.

> **Hai biến GA đang để trống có chủ đích.** Nếu để nguyên ID của trecome.vn thì
> lượt truy cập hai site trộn vào cùng một property, và GA **không cho tách lại
> về sau** — dữ liệu hỏng là hỏng vĩnh viễn. Để trống thì chỉ mất GA cho tới khi
> có property riêng, còn lượt truy cập vẫn được `VisitTracker` ghi đủ vào bảng
> `visits` với `site = 'trecome-tax'`, xem tại `/admin/visitors`.
>
> Khi đã tạo property GA4 riêng cho tax.trecome.vn: điền hai biến rồi
> **build lại** — `NEXT_PUBLIC_GA_ID` nhúng vào bundle lúc build, restart không đủ.

### Dựng lại từ đầu (nếu phải làm lại trên máy khác)

```bash
git clone -b tax https://github.com/trandinhnamuet/trecome-intro.git /root/trecome-tax
cd /root/trecome-tax
cp /root/trecome-nextjs/.env.local .env.local && chmod 600 .env.local
sed -i 's/^STATS_SITE=.*/STATS_SITE=trecome-tax/' .env.local
sed -i 's/^NEXT_PUBLIC_GA_ID=.*/NEXT_PUBLIC_GA_ID=/' .env.local
sed -i 's/^GA_PROPERTY_ID=.*/GA_PROPERTY_ID=/' .env.local
npm ci
npm run build
# gọi thẳng binary của next, đúng cách trecome-nextjs đang chạy
pm2 start node_modules/next/dist/bin/next --name trecome-tax \
    --interpreter /usr/bin/node -- start -p 3007
pm2 save
```

### nginx

`/etc/nginx/sites-available/tax.trecome.conf` — khối SSL do certbot tự thêm:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name tax.trecome.vn;

    location ~* ^/.well-known/acme-challenge/ {
        root /opt/www/well_known;
        try_files $uri =404;
        allow all;
    }

    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:3007;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        # VisitTracker đọc IP từ X-Real-IP, không lấy phần tử đầu X-Forwarded-For
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
ln -sfn /etc/nginx/sites-available/tax.trecome.conf /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
certbot --nginx -d tax.trecome.vn --redirect
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

> Máy có 3.8GB RAM và giờ chạy 4 app Node. Lúc deploy lần đầu, `next build` chạy
> lọt với ~2.6GB available nên không cần đụng gì. Swap 2GB (`/swapfile`) là thứ
> giữ cho build không bị OOM — đừng xoá. Nếu về sau build chết vì hết RAM, dừng
> tạm `trecome-nextjs` trong lúc build rồi bật lại.

### Đã kiểm sau khi deploy

| Kiểm | Kết quả |
|---|---|
| `https://tax.trecome.vn` | 200 |
| `http://` → `https://` | 301 |
| `POST /api/track` | 204, ghi vào `visits` với `site = 'trecome-tax'` |
| `POST /api/contact` (payload rỗng) | 400 + thông báo validate — route sống |
| GA script | **không** nhúng khi `NEXT_PUBLIC_GA_ID` trống, đúng như mong đợi |
| `robots.txt` | chặn `/admin` và `/api` |
| trecome.vn, lonfantafc.com | vẫn 200, không bị ảnh hưởng |

Form liên hệ mới chỉ kiểm tới mức route phản hồi đúng — **chưa gửi thử một lead
thật**, vì làm vậy sẽ bắn email vào hộp thư và thêm một dòng rác vào Google
Sheet. Nên tự gửi thử một lần rồi xoá dòng đó.
