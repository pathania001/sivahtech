import nodemailer from "nodemailer";

export function getTransport() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      : undefined
  });
}

export async function sendLeadEmails(input: { name: string; email: string; phone?: string; service?: string; message?: string }) {
  const transport = getTransport();
  if (!transport) return;
  const from = process.env.EMAIL_FROM || "info@sivahtech.com";
  const admin = process.env.LEAD_NOTIFY_EMAIL || "info@sivahtech.com";

  await Promise.all([
    transport.sendMail({
      from,
      to: admin,
      subject: `New lead from ${input.name}`,
      text: `Name: ${input.name}\nEmail: ${input.email}\nPhone: ${input.phone || "-"}\nService: ${input.service || "-"}\nMessage: ${input.message || "-"}`
    }),
    input.email
      ? transport.sendMail({
          from,
          to: input.email,
          subject: "Thank you for contacting Sivah Tech",
          text: `Hi ${input.name},\n\nThanks for reaching out to Sivah Tech. Our team has received your enquiry and will respond shortly.\n\nSivah Tech`
        })
      : Promise.resolve()
  ]);
}
