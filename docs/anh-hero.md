# Ảnh hero trên trang chủ

Ba ảnh trong vòng tròn ở hero chạy luân phiên 4 giây một lần. Danh sách nằm ở
`HERO_SLIDES` trong `components/Hero.tsx`; **thứ tự trong mảng trùng với số ở
đầu tên file**, nên bỏ ảnh nào thì xoá cả file lẫn đúng dòng đó.

## Danh sách

| # | File | Nội dung | Nguồn |
|---|---|---|---|
| 01 | `01-shopee-dashboard.png` | dashboard Shopee Seller Centre | có sẵn trong repo |
| 02 | `02-chu-shop-xu-ly-don.jpg` | chủ shop kiểm đơn bên laptop | [Unsplash](https://unsplash.com/photos/woman-checking-package-with-phone-near-laptop-and-boxes-k63Or81F8-M) |
| 03 | `03-dashboard-doanh-thu.jpg` | dashboard doanh thu trên laptop | [Unsplash](https://unsplash.com/photos/black-and-silver-laptop-computer-tR0jvlsmCuQ) |
| 04 | `04-trang-san-tmdt.jpg` | trang bán hàng mở trên laptop | [Unsplash](https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-table-jovi7gRQjOs) |
| 05 | `05-livestream-ban-hang.jpg` | livestream bán hàng bằng điện thoại | [Unsplash](https://unsplash.com/photos/a-person-holding-a-phone-eDvPupUMdZU) |
| 06 | `06-dong-goi-don-hang.jpg` | đóng gói đơn hàng | [Unsplash](https://unsplash.com/photos/a-woman-standing-next-to-a-cardboard-box-on-top-of-a-table-V5XaBkW6PO8) |
| 07 | `07-quan-ly-danh-muc.jpg` | quản lý danh mục sản phẩm | [Unsplash](https://unsplash.com/photos/black-laptop-computer-on-white-round-table-O6sqkN9Y7IU) |
| 08 | `08-xe-giao-hang-buu-dien.jpg` | xe giao hàng Bưu điện Việt Nam | [Unsplash](https://unsplash.com/photos/yellow-delivery-motorcycle-parked-on-sidewalk-VCKTpVoXtb8) |
| 09 | `09-bieu-do-hieu-suat.jpg` | biểu đồ phân tích hiệu suất | [Unsplash](https://unsplash.com/photos/graphs-of-performance-analytics-on-a-laptop-screen-JKUTrJ4vK00) |
| 10 | `10-kho-hang.jpg` | kho hàng | [Unsplash](https://unsplash.com/photos/tall-shelves-filled-with-cardboard-boxes-in-a-warehouse-aisle-Q8JTZqnNB-o) |
| 11 | `11-set-chup-anh-san-pham.jpg` | set chụp ảnh sản phẩm | [Unsplash](https://unsplash.com/photos/studio-setup-with-spray-bottle-and-mushroom-sculpture-7m84cCVTV4I) |
| 12 | `12-thung-carton-xep-lop.jpg` | thùng carton xếp lớp | [Unsplash](https://unsplash.com/photos/brown-labeled-box-l-E_dRKdBhxk4) |
| 13 | `13-ho-kinh-doanh-via-he.jpg` | hộ kinh doanh ngoài phố | [Unsplash](https://unsplash.com/photos/woman-slicing-vegetable-on-her-bike-stand-near-store-8rViMo16EN0) |
| 14 | `14-shopee-app.jpg` | ảnh marketing app Shopee | có sẵn trong repo |
| 15 | `15-shopee-app-mockup.png` | mockup app Shopee (**đã chỉnh**, xem dưới) | có sẵn trong repo |

Ba ảnh đã bị xoá khỏi bộ ban đầu (18 ảnh): shipper chở hàng trên xe máy, thùng
hàng dán nhãn vận chuyển, bưu kiện chờ giao. Phần đánh số của các ảnh còn lại đã
dồn lại cho khớp — không còn lỗ hổng trong dãy số.

Ảnh 02, 05, 06, 08, 13 là ảnh có người hoặc bối cảnh Việt Nam / Đông Nam Á. Các
ảnh còn lại không có mặt người.

> Không có cách nào xác minh quốc tịch người trong ảnh stock. Những ảnh trên
> được chọn theo bối cảnh nhìn thấy được — biển hiệu tiếng Việt, xe Bưu điện
> Việt Nam, đường phố Việt Nam — chứ không phải theo thông tin nhân thân. Ảnh
> nào chỉ "trông như người châu Á" mà không có bối cảnh rõ thì nên soi kỹ trước
> khi giữ.

## Ảnh 15 (`15-shopee-app-mockup.png`) đã bị chỉnh sửa

File này từng mang số 18 trong bộ gốc 18 ảnh, đổi tên khi dồn số sau khi xoá
bớt ảnh — xem "Danh sách" ở trên. Ảnh **không còn giống bản gốc trong lịch sử
git** (`3.png` ở commit `5e67d9d`). Hai thay đổi:

- Xoá hẳn chữ "Redesign" ở tiêu đề — đây là mockup của người khác, chữ đó không
  nói gì về dịch vụ của mình.
- Dời cụm logo + chữ "Shopee" từ góc trên trái vào giữa khung, và thu còn 86%.

Lý do: ảnh tỉ lệ 2:1, mà `object-fit: cover` cắt về khung vuông nên chỉ còn thấy
1/2 chiều ngang ở giữa. Trước khi sửa, phần chữ lọt vào vòng tròn là "pee
Redesign".

Vì sao phải thu 86% thay vì giữ nguyên cỡ: cụm logo rộng 1468px trên bản gốc
4000px, nhưng khoảng trống bên phải chỉ tới x=2681 thì vướng mockup điện thoại.
Đặt canh giữa mà giữ nguyên cỡ thì đè lên mockup; thu 86% vừa canh giữa tuyệt
đối vừa chừa 51px hở.

Sửa trên bản gốc 4000×2000 lấy lại từ git rồi mới co xuống 1400px, nên không bị
nén hai lần. Muốn làm lại từ đầu thì lấy `git show 5e67d9d:public/hero-slide/3.png`.

## Ba điều cần biết khi thay ảnh

### 1. Chủ thể phải nằm giữa khung

Ảnh lấp đầy vòng tròn bằng `object-fit: cover`, tức bị cắt bớt hai rìa. Trước
đây `Hero.tsx` có hàm `fitDiagonal` co ảnh lọt trọn vào vòng tròn (đường chéo
ảnh bằng đường kính) — không cắt mất gì nhưng chừa lại hai mảng trắng trên và
dưới, nên đã bỏ.

### 2. Cẩn thận ảnh Unsplash+

Kết quả tìm kiếm của Unsplash **trộn lẫn** ảnh free và ảnh Unsplash+ (trả phí).
Ảnh Unsplash+ tải về không đăng ký thì bị đóng watermark chữ "Unsplash+" mờ rải
khắp ảnh — nhạt tới mức nhìn lướt không thấy, chỉ lộ ra khi tăng tương phản.

Phân biệt bằng URL ảnh:

| Loại | URL |
|---|---|
| Free — dùng được | `https://images.unsplash.com/photo-…` |
| Unsplash+ — **không** dùng | `https://plus.unsplash.com/premium_photo-…` |

Sau khi tải vẫn nên soi lại: mở ảnh, tăng tương phản lên ~2.5 lần rồi nhìn vùng
sáng xem có chữ mờ không. **Unsplash License** (ảnh free) cho dùng thương mại,
không cần xin phép, không bắt buộc ghi công.

### 3. 1400px chiều ngang là đủ

Vòng tròn chỉ hiển thị ảnh ở khoảng 420px, nên 1400px đã dư cho màn retina. Ảnh
tải từ Unsplash mặc định 5000px trở lên — nhớ co lại và nén (`quality=78`,
progressive) trước khi commit. Bộ hiện tại 18 ảnh tổng 3.9MB; nếu để nguyên bản
gốc thì đã hơn 8MB.

## Hai chỗ còn yếu

**`01-shopee-dashboard.png` chỉ có 472×423px.** Đây là ảnh dashboard Shopee duy
nhất đang có, nhưng ở kích thước đó thì khi phóng lấp đầy vòng tròn (~420px, x2
trên màn retina) nó bị mờ thấy rõ. Cách sửa duy nhất là chụp lại màn hình
Shopee Seller Centre của chính mình ở độ phân giải đầy đủ rồi che số liệu thật.

**Không thể tìm thêm ảnh Shopee Seller Centre từ nguồn stock.** Giao diện đó là
tài sản của Shopee, không có trên Unsplash hay Pexels. Muốn có thêm thì phải tự
chụp từ tài khoản của mình.
