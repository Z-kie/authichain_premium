
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

interface WelcomeEmailProps {
  username?: string;
  walletAddress?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://authichain.app';

export const WelcomeEmail = ({ username = 'User', walletAddress }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to AuthiChain - Your NFT Authentication Journey Starts Now</Preview>
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
        
        <Heading style={h1}>Welcome to AuthiChain, {username}! 🎉</Heading>
        
        <Text style={text}>
          Thank you for joining AuthiChain, the leading NFT authentication and verification marketplace.
          We're excited to have you as part of our community!
        </Text>

        {walletAddress && (
          <Section style={walletSection}>
            <Text style={walletLabel}>Your Connected Wallet:</Text>
            <Text style={walletAddressStyle}>{walletAddress}</Text>
          </Section>
        )}

        <Section style={ctaSection}>
          <Heading as="h2" style={h2}>Get Started in 3 Easy Steps</Heading>
          
          <Section style={step}>
            <Text style={stepNumber}>1️⃣</Text>
            <Text style={stepText}>
              <strong>Choose Your Subscription</strong> - Select the plan that fits your needs
            </Text>
          </Section>

          <Section style={step}>
            <Text style={stepNumber}>2️⃣</Text>
            <Text style={stepText}>
              <strong>Mint Your First NFT</strong> - Create authenticated digital assets
            </Text>
          </Section>

          <Section style={step}>
            <Text style={stepNumber}>3️⃣</Text>
            <Text style={stepText}>
              <strong>Explore the Marketplace</strong> - Discover and trade verified NFTs
            </Text>
          </Section>

          <Button style={button} href={`${baseUrl}/getting-started`}>
            Start Your Journey
          </Button>
        </Section>

        <Section style={benefitsSection}>
          <Heading as="h3" style={h3}>What You Can Do with AuthiChain</Heading>
          <ul style={list}>
            <li style={listItem}>✓ Mint authenticated NFTs with IPFS storage</li>
            <li style={listItem}>✓ Participate in auctions and bidding</li>
            <li style={listItem}>✓ Create and manage collections</li>
            <li style={listItem}>✓ Access advanced analytics and insights</li>
            <li style={listItem}>✓ Connect with a global community</li>
          </ul>
        </Section>

        <Section style={resourcesSection}>
          <Heading as="h3" style={h3}>Helpful Resources</Heading>
          <Text style={text}>
            <Link href={`${baseUrl}/getting-started`} style={link}>
              📚 Getting Started Guide
            </Link>
            {' • '}
            <Link href={`${baseUrl}/pricing`} style={link}>
              💎 View Pricing Plans
            </Link>
            {' • '}
            <Link href={`${baseUrl}/marketplace`} style={link}>
              🛒 Browse Marketplace
            </Link>
          </Text>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            Need help? Contact us at{' '}
            <Link href="mailto:support@authichain.app" style={link}>
              support@authichain.app
            </Link>
          </Text>
          <Text style={footerText}>
            © 2025 AuthiChain. All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
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

const h1 = {
  color: '#1a1a1a',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0 20px',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '30px 0 20px',
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

const walletSection = {
  backgroundColor: '#f6f9fc',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px',
};

const walletLabel = {
  color: '#525f7f',
  fontSize: '14px',
  margin: '0 0 8px',
};

const walletAddressStyle = {
  color: '#1a1a1a',
  fontSize: '14px',
  fontFamily: 'monospace',
  wordBreak: 'break-all' as const,
  margin: '0',
};

const ctaSection = {
  padding: '20px',
  backgroundColor: '#f9fafb',
  margin: '30px 20px',
  borderRadius: '8px',
};

const step = {
  display: 'flex',
  alignItems: 'center',
  margin: '16px 0',
};

const stepNumber = {
  fontSize: '24px',
  marginRight: '12px',
};

const stepText = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
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
  margin: '24px 0 0',
};

const benefitsSection = {
  padding: '0 20px',
  margin: '30px 0',
};

const list = {
  paddingLeft: '20px',
  margin: '16px 0',
};

const listItem = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '28px',
};

const resourcesSection = {
  padding: '20px',
  backgroundColor: '#f9fafb',
  margin: '30px 20px',
  borderRadius: '8px',
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
