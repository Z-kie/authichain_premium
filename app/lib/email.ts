
import { render } from '@react-email/render';
import WelcomeEmail from '@/emails/welcome-email';
import SubscriptionConfirmationEmail from '@/emails/subscription-confirmation-email';
import FirstNFTSuccessEmail from '@/emails/first-nft-success-email';

// ============================================
// Email Service — Resend (primary) / SMTP (fallback) / Console (dev)
// ============================================
// Set RESEND_API_KEY for Resend, or SMTP_HOST + SMTP_USER + SMTP_PASS for SMTP.
// Falls back to console logging when neither is configured.
// ============================================

const EMAIL_FROM = process.env.EMAIL_FROM || 'AuthiChain <noreply@authichain.com>';

export interface EmailService {
  sendEmail(to: string, subject: string, html: string): Promise<void>;
}

// --- Resend email service (recommended) ---
class ResendEmailService implements EmailService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [to],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error('Resend API error:', res.status, body);
      throw new Error(`Resend email failed: ${res.status} ${body}`);
    }

    const data = await res.json();
    console.log('Email sent via Resend:', { id: data.id, to, subject });
  }
}

// --- SMTP email service (fallback via nodemailer) ---
class SmtpEmailService implements EmailService {
  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    // Dynamic import so nodemailer is only loaded when SMTP is configured
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nodemailer = (await import('nodemailer' as any)).default;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: EMAIL_FROM,
      to,
      subject,
      html,
    });

    console.log('Email sent via SMTP:', { to, subject });
  }
}

// --- Console email service (development) ---
class ConsoleEmailService implements EmailService {
  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    console.log('=== EMAIL (dev console) ===');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('HTML:', html.substring(0, 200) + '...');
    console.log('===========================');
  }
}

// --- Service factory ---
function getEmailService(): EmailService {
  if (process.env.RESEND_API_KEY) {
    console.log('Email service: Resend');
    return new ResendEmailService(process.env.RESEND_API_KEY);
  }
  if (process.env.SMTP_HOST || process.env.SMTP_USER) {
    console.log('Email service: SMTP');
    return new SmtpEmailService();
  }
  console.warn('No email provider configured — using console logger. Set RESEND_API_KEY or SMTP_* env vars.');
  return new ConsoleEmailService();
}

const emailService = getEmailService();

// Export for use by email-automation.ts and other modules
export function getEmailServiceInstance(): EmailService {
  return emailService;
}

// Email sending functions
export async function sendWelcomeEmail(
  to: string,
  username: string,
  walletAddress?: string
): Promise<void> {
  const html = await render(WelcomeEmail({ username, walletAddress }));
  await emailService.sendEmail(
    to,
    'Welcome to AuthiChain - Your NFT Journey Starts Now! 🎉',
    html
  );
}

export async function sendSubscriptionConfirmationEmail(
  to: string,
  username: string,
  tier: 'BASIC' | 'PRO' | 'ENTERPRISE',
  amount: number,
  periodEnd: string
): Promise<void> {
  const html = await render(
    SubscriptionConfirmationEmail({ username, tier, amount, periodEnd })
  );
  await emailService.sendEmail(
    to,
    `Your ${tier} Subscription is Active!`,
    html
  );
}

export async function sendFirstNFTSuccessEmail(
  to: string,
  username: string,
  nftTitle: string,
  nftImage: string | undefined,
  nftUrl: string,
  ipfsUrl: string
): Promise<void> {
  const html = await render(
    FirstNFTSuccessEmail({ username, nftTitle, nftImage, nftUrl, ipfsUrl })
  );
  await emailService.sendEmail(
    to,
    'Congratulations on Your First NFT! 🎉',
    html
  );
}

// Helper function to preview emails in development
export async function previewEmail(
  emailComponent: React.ReactElement
): Promise<string> {
  return await render(emailComponent);
}
