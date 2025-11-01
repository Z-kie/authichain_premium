
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface SubscriptionConfirmationEmailProps {
  username?: string;
  tier: 'BASIC' | 'PRO' | 'ENTERPRISE';
  amount: number;
  periodEnd: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://authichain.app';

const tierDetails = {
  BASIC: {
    name: 'Basic',
    features: [
      '10 NFT mints per month',
      'Basic analytics',
      'Standard support',
      'Marketplace access',
    ],
  },
  PRO: {
    name: 'Pro',
    features: [
      'Unlimited NFT mints',
      'Advanced analytics',
      'Priority support',
      'Custom collections',
      'Auction features',
      'API access',
    ],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    features: [
      'Everything in Pro',
      'White-label solution',
      'Dedicated support',
      'Custom integrations',
      'Advanced security',
      'SLA guarantee',
    ],
  },
};

export const SubscriptionConfirmationEmail = ({
  username = 'User',
  tier,
  amount,
  periodEnd,
}: SubscriptionConfirmationEmailProps) => {
  const details = tierDetails[tier];

  return (
    <Html>
      <Head />
      <Preview>Your {details.name} subscription is now active!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Img
              src={`${baseUrl}/logo.png`}
              width="150"
              height="50"
              alt="AuthiChain"
              style={logo}
            />
          </Section>

          <Section style={successBadge}>
            <Text style={successEmoji}>✓</Text>
          </Section>

          <Heading style={h1}>Subscription Confirmed!</Heading>

          <Text style={text}>
            Hi {username}, your {details.name} subscription is now active. Welcome to the next
            level of NFT authentication!
          </Text>

          <Section style={subscriptionCard}>
            <Section style={cardHeader}>
              <Heading as="h2" style={cardTitle}>
                {details.name} Plan
              </Heading>
              <Text style={cardPrice}>${amount}/month</Text>
            </Section>

            <Section style={divider} />

            <Section style={cardBody}>
              <Text style={cardLabel}>Your Benefits:</Text>
              <ul style={list}>
                {details.features.map((feature, index) => (
                  <li key={index} style={listItem}>
                    ✓ {feature}
                  </li>
                ))}
              </ul>
            </Section>

            <Section style={divider} />

            <Section style={cardFooter}>
              <Text style={cardInfo}>
                <strong>Next billing date:</strong> {periodEnd}
              </Text>
              <Text style={cardInfo}>
                <strong>Status:</strong> Active
              </Text>
            </Section>
          </Section>

          <Section style={ctaSection}>
            <Button style={button} href={`${baseUrl}/dashboard`}>
              Go to Dashboard
            </Button>
            <Button style={buttonSecondary} href={`${baseUrl}/mint`}>
              Mint Your First NFT
            </Button>
          </Section>

          <Section style={tipsSection}>
            <Heading as="h3" style={h3}>
              Make the Most of Your Subscription
            </Heading>
            <Text style={text}>
              🎨 <strong>Create Collections:</strong> Organize your NFTs into themed collections
              <br />
              📊 <strong>Track Analytics:</strong> Monitor your NFT performance and engagement
              <br />
              💰 <strong>List on Marketplace:</strong> Sell your authenticated NFTs to collectors
              <br />
              🎯 <strong>Join Auctions:</strong> Participate in exclusive auction events
            </Text>
          </Section>

          <Section style={supportSection}>
            <Text style={text}>
              Need help getting started?{' '}
              <Link href={`${baseUrl}/getting-started`} style={link}>
                Check our getting started guide
              </Link>{' '}
              or{' '}
              <Link href="mailto:support@authichain.app" style={link}>
                contact support
              </Link>
              .
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              To manage your subscription, visit your{' '}
              <Link href={`${baseUrl}/dashboard/settings`} style={link}>
                account settings
              </Link>
              .
            </Text>
            <Text style={footerText}>© 2025 AuthiChain. All rights reserved.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default SubscriptionConfirmationEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  padding: '32px 20px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const successBadge = {
  textAlign: 'center' as const,
  padding: '20px',
};

const successEmoji = {
  fontSize: '48px',
  color: '#10b981',
  margin: '0',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '20px 0',
  padding: '0 20px',
  textAlign: 'center' as const,
};

const h3 = {
  color: '#1a1a1a',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '20px 0 10px',
};

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
  padding: '0 20px',
};

const subscriptionCard = {
  backgroundColor: '#ffffff',
  border: '2px solid #8b5cf6',
  borderRadius: '12px',
  margin: '30px 20px',
  overflow: 'hidden',
};

const cardHeader = {
  backgroundColor: '#8b5cf6',
  padding: '24px',
  textAlign: 'center' as const,
};

const cardTitle = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 8px',
};

const cardPrice = {
  color: '#ffffff',
  fontSize: '36px',
  fontWeight: 'bold',
  margin: '0',
};

const cardBody = {
  padding: '24px',
};

const cardLabel = {
  color: '#1a1a1a',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 12px',
};

const list = {
  paddingLeft: '20px',
  margin: '0',
};

const listItem = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '28px',
};

const divider = {
  borderTop: '1px solid #e6e6e6',
  margin: '0',
};

const cardFooter = {
  padding: '24px',
  backgroundColor: '#f9fafb',
};

const cardInfo = {
  color: '#525f7f',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
};

const ctaSection = {
  padding: '20px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#8b5cf6',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '16px 32px',
  margin: '12px 0',
};

const buttonSecondary = {
  backgroundColor: '#ffffff',
  border: '2px solid #8b5cf6',
  borderRadius: '8px',
  color: '#8b5cf6',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '16px 32px',
  margin: '12px 0',
};

const tipsSection = {
  padding: '20px',
  backgroundColor: '#f9fafb',
  margin: '30px 20px',
  borderRadius: '8px',
};

const supportSection = {
  padding: '0 20px',
  margin: '30px 0',
};

const link = {
  color: '#8b5cf6',
  textDecoration: 'none',
  fontWeight: '500',
};

const footer = {
  padding: '20px',
  borderTop: '1px solid #e6e6e6',
  margin: '40px 20px 0',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
};
