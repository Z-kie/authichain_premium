
import { render } from '@react-email/render';
import WelcomeEmail from '@/emails/welcome-email';
import SubscriptionConfirmationEmail from '@/emails/subscription-confirmation-email';
import FirstNFTSuccessEmail from '@/emails/first-nft-success-email';

// Email service interface
export interface EmailService {
  sendEmail(to: string, subject: string, html: string): Promise<void>;
}

// Console email service for development
class ConsoleEmailService implements EmailService {
  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    console.log('=== EMAIL ===');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('HTML:', html.substring(0, 200) + '...');
    console.log('=============');
  }
}

// Get email service based on environment
function getEmailService(): EmailService {
  // In production, you would use a service like SendGrid, AWS SES, etc.
  // For now, we'll use console logging
  return new ConsoleEmailService();
}

const emailService = getEmailService();

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
