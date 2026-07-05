import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Field 'name', 'email', dan 'message' wajib diisi" },
        { status: 400 }
      );
    }

    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;

    if (!EMAIL_USER || !EMAIL_PASS) {
      console.error("[/api/contact] EMAIL_USER atau EMAIL_PASS belum dikonfigurasi di .env");
      return NextResponse.json(
        { error: "Konfigurasi email belum lengkap. Silakan hubungi admin." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"LaptopPintar Contact Form" <${EMAIL_USER}>`,
      to: "laptoppintar.id@gmail.com",
      replyTo: email,
      subject: `[LaptopPintar] Pesan dari ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d946ef; border-bottom: 2px solid #d946ef; padding-bottom: 8px;">
            Pesan Baru dari LaptopPintar
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #64748b; width: 120px;">Nama</td>
              <td style="padding: 8px; color: #1e293b;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #64748b;">Email</td>
              <td style="padding: 8px; color: #1e293b;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #64748b; vertical-align: top;">Pesan</td>
              <td style="padding: 8px; color: #1e293b; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          <p style="font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px;">
            Email ini dikirim otomatis dari formulir kontak LaptopPintar.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Pesan berhasil dikirim",
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[/api/contact] Error:", msg);
    return NextResponse.json(
      { error: "Gagal mengirim pesan. Silakan coba lagi nanti." },
      { status: 500 }
    );
  }
}
