
import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://authichain.app';

export const metadata: Metadata = {
  title: 'About AuthiChain - Product NFT Marketplace & Technology Platform',
  description: 'Learn about AuthiChain, the revolutionary product NFT marketplace combining blockchain technology, AI-powered item authentication, and comprehensive business analytics for the product industry.',
  keywords: [
    'AuthiChain about', 'product NFT platform history', 'digital asset blockchain technology',
    'product AI authentication', 'item verification technology', 'product business platform',
    'digital asset NFT marketplace mission', 'product industry innovation', 'blockchain product solutions',
    'product technology company', 'digital asset analytics platform', 'product NFT innovation'
  ],
  openGraph: {
    title: 'About AuthiChain - Product Blockchain Innovation',
    description: 'Revolutionary product NFT marketplace with AI authentication, business analytics, and blockchain technology',
    url: `${baseUrl}/about`,
    images: [
      {
        url: `${baseUrl}/og-about.jpg`,
        width: 1200,
        height: 630,
        alt: 'About AuthiChain Product Technology'
      }
    ],
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-6">
            About AuthiChain
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Revolutionizing the product industry through blockchain technology, 
            AI-powered authentication, and comprehensive business analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-slate-800/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-green-400 mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              To create the world's most trusted product NFT marketplace, where authenticity, 
              quality, and innovation meet. We're building the future of product commerce 
              through cutting-edge blockchain technology and AI-powered item verification.
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-green-400 mb-4">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              A product ecosystem where every item is authenticated, every transaction 
              is transparent, and every business has access to powerful analytics and 
              tools to thrive in the evolving product industry.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-900/20 to-purple-900/20 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-semibold text-white mb-8 text-center">
            Why AuthiChain?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Authenticity</h3>
              <p className="text-gray-300">
                AI-powered item verification and QR code authentication ensure every NFT represents genuine product genetics.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Analytics</h3>
              <p className="text-gray-300">
                Comprehensive business intelligence tools help product businesses make data-driven decisions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⛓️</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Blockchain</h3>
              <p className="text-gray-300">
                Secure, transparent, and immutable records of product item lineage and ownership.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-white mb-8">
            Technology Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'Next.js 14', 'TypeScript', 'Blockchain', 'AI/ML',
              'Stripe Payments', 'PostgreSQL', 'TensorFlow', 'Web3'
            ].map((tech, index) => (
              <div key={index} className="bg-slate-800/50 rounded-lg p-4 backdrop-blur-sm">
                <span className="text-green-400 font-semibold">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-8 backdrop-blur-sm text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Join the Product Revolution
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Whether you're a grower, dispensary owner, investor, or product enthusiast, 
            AuthiChain provides the tools and marketplace to participate in the future of product.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/marketplace"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Explore Marketplace
            </a>
            <a
              href="/pricing"
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
