
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

interface FirstNFTSuccessEmailProps {
  username?: string;
  nftTitle: string;
  nftImage?: string;
  nftUrl: string;
  ipfsUrl: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://authichain.app';

export const FirstNFTSuccessEmail = ({
  username = 'User',
  nftTitle,
  nftImage,
  nftUrl,
  ipfsUrl,
}: FirstNFTSuccessEmailProps) => (
  <Html>
    <Head />
    <Preview>Congratulations! You minted your first NFT on AuthiChain 🎉</Preview>
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

        <Section style={celebrationBadge}>
          <Text style={celebrationEmoji}>🎉</Text>
        </Section>

        <Heading style={h1}>You Did It, {username}!</Heading>

        <Text style={text}>
          Congratulations on minting your first authenticated NFT on AuthiChain! This is a
          significant milestone in your digital creator journey.
        </Text>

        {nftImage && (
          <Section style={nftPreview}>
            <Img
              src={nftImage}
              alt={nftTitle}
              style={nftImageStyle}
              width="400"
              height="400"
            />
          </Section>
        )}

        <Section style={nftCard}>
          <Heading as="h2" style={nftTitleStyle}>
            {nftTitle}
          </Heading>
          <Section style={nftDetails}>
            <Text style={nftDetailLabel}>IPFS Storage:</Text>
            <Text style={nftDetailValue}>✓ Permanently stored on IPFS</Text>
            <Text style={nftDetailLabel}>Blockchain:</Text>
            <Text style={nftDetailValue}>✓ Verified and authenticated</Text>
            <Text style={nftDetailLabel}>Status:</Text>
            <Text style={nftDetailValue}>✓ Successfully minted</Text>
          </Section>
        </Section>

        <Section style={ctaSection}>
          <Button style={button} href={nftUrl}>
            View Your NFT
          </Button>
          <Button style={buttonSecondary} href={ipfsUrl}>
            View on IPFS
          </Button>
        </Section>

        <Section style={nextStepsSection}>
          <Heading as="h3" style={h3}>
            What's Next? 🚀
          </Heading>
          
          <Section style={step}>
            <Text style={stepNumber}>1️⃣</Text>
            <Section style={stepContent}>
              <Text style={stepTitle}>Share Your Creation</Text>
              <Text style={stepDescription}>
                Show the world your authenticated NFT on social media
              </Text>
            </Section>
          </Section>

          <Section style={step}>
            <Text style={stepNumber}>2️⃣</Text>
            <Section style={stepContent}>
              <Text style={stepTitle}>Build a Collection</Text>
              <Text style={stepDescription}>
                Create a themed collection to organize your NFTs
              </Text>
            </Section>
          </Section>

          <Section style={step}>
            <Text style={stepNumber}>3️⃣</Text>
            <Section style={stepContent}>
              <Text style={stepTitle}>List on Marketplace</Text>
              <Text style={stepDescription}>
                Make your NFT available for sale or auction
              </Text>
            </Section>
          </Section>
        </Section>

        <Section style={tipsSection}>
          <Heading as="h3" style={h3}>
            Pro Tips for Success 💡
          </Heading>
          <ul style={list}>
            <li style={listItem}>
              <strong>Optimize your metadata:</strong> Add detailed descriptions and tags
            </li>
            <li style={listItem}>
              <strong>Engage with collectors:</strong> Respond to comments and offers
            </li>
            <li style={listItem}>
              <strong>Track analytics:</strong> Monitor views, likes, and engagement
            </li>
            <li style={listItem}>
              <strong>Join the community:</strong> Connect with other creators and collectors
            </li>
          </ul>
        </Section>

        <Section style={resourcesSection}>
          <Heading as="h3" style={h3}>
            Continue Learning
          </Heading>
          <Text style={text}>
            <Link href={`${baseUrl}/collections`} style={link}>
              📁 Manage Collections
            </Link>
            {' • '}
            <Link href={`${baseUrl}/marketplace`} style={link}>
              🛒 Browse Marketplace
            </Link>
            {' • '}
            <Link href={`${baseUrl}/dashboard/analytics`} style={link}>
              📊 View Analytics
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
          <Text style={footerText}>© 2025 AuthiChain. All rights reserved.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default FirstNFTSuccessEmail;

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

const celebrationBadge = {
  textAlign: 'center' as const,
  padding: '20px',
};

const celebrationEmoji = {
  fontSize: '64px',
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

const nftPreview = {
  textAlign: 'center' as const,
  padding: '20px',
  margin: '20px 0',
};

const nftImageStyle = {
  maxWidth: '400px',
  width: '100%',
  height: 'auto',
  borderRadius: '12px',
  border: '2px solid #e6e6e6',
};

const nftCard = {
  backgroundColor: '#f9fafb',
  borderRadius: '12px',
  padding: '24px',
  margin: '30px 20px',
  border: '2px solid #8b5cf6',
};

const nftTitleStyle = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 20px',
  textAlign: 'center' as const,
};

const nftDetails = {
  margin: '16px 0',
};

const nftDetailLabel = {
  color: '#8898aa',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '8px 0 4px',
  textTransform: 'uppercase' as const,
};

const nftDetailValue = {
  color: '#10b981',
  fontSize: '16px',
  margin: '0 0 16px',
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

const nextStepsSection = {
  padding: '20px',
  margin: '30px 0',
};

const step = {
  display: 'flex',
  alignItems: 'flex-start',
  margin: '20px 0',
};

const stepNumber = {
  fontSize: '32px',
  marginRight: '16px',
  flexShrink: 0,
};

const stepContent = {
  flex: 1,
};

const stepTitle = {
  color: '#1a1a1a',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 4px',
};

const stepDescription = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
};

const tipsSection = {
  padding: '20px',
  backgroundColor: '#fffbeb',
  margin: '30px 20px',
  borderRadius: '8px',
  border: '2px solid #fbbf24',
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
