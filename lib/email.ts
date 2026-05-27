import nodemailer from 'nodemailer';

interface ContactData {
  name: string;
  email: string;
  phone: string;
  brand: string;
  plan: string;
  msg: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactEmail(data: ContactData): Promise<boolean> {
  try {
    // Email to owner
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `Yêu cầu tư vấn từ ${data.name}`,
      html: `
        <h2>Yêu cầu tư vấn mới từ Trecome</h2>
        <p><strong>Họ tên:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Điện thoại:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Thương hiệu:</strong> ${escapeHtml(data.brand)}</p>
        <p><strong>Gói dịch vụ:</strong> ${escapeHtml(data.plan)}</p>
        <p><strong>Tin nhắn:</strong></p>
        <p>${escapeHtml(data.msg).replace(/\n/g, '<br>')}</p>
      `,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: data.email,
      subject: 'Trecome nhận được yêu cầu của bạn',
      html: `
        <h2>Cảm ơn bạn đã liên hệ!</h2>
        <p>Chúng tôi đã nhận được yêu cầu tư vấn của bạn. Trecome sẽ liên hệ lại trong 24h.</p>
        <hr>
        <p><strong>Thông tin bạn cung cấp:</strong></p>
        <p><strong>Họ tên:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Gói dịch vụ:</strong> ${escapeHtml(data.plan)}</p>
      `,
    });

    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
