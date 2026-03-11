export const dynamic = 'force-dynamic';

// AI Executive Assistant API Route
// Secure endpoint for AI-powered content generation

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

const AIExecutiveAssistant = require('@/lib/AIExecutiveAssistant');

// Rate limiting store (in-memory, use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(userId: string, limit: number = 50): boolean {
  const now = Date.now();
  const userLimit = rateLimitStore.get(userId);
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitStore.set(userId, { count: 1, resetTime: now + 60 * 60 * 1000 }); // 1 hour
    return true;
  }
  
  if (userLimit.count >= limit) {
    return false;
  }
  
  userLimit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    // Admin check (optional - remove if you want all authenticated users to access)
    // Uncomment the following lines to restrict to admins only
    /*
    const userRole = session.user.role || 'user';
    if (userRole !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }
    */

    // Rate limiting
    const userId = session.user.email || session.user.id || 'anonymous';
    if (!checkRateLimit(userId, 50)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { action, data } = body;

    if (!action) {
      return NextResponse.json(
        { error: 'Missing required field: action' },
        { status: 400 }
      );
    }

    // Initialize AI Assistant
    const assistant = new AIExecutiveAssistant(process.env.ANTHROPIC_API_KEY);

    // Process action
    let result: string;
    let metadata: any = {};

    switch (action) {
      // Sales & Outreach
      case 'draft_sales_email':
        if (!data?.name || !data?.company) {
          return NextResponse.json(
            { error: 'Missing required fields: name, company' },
            { status: 400 }
          );
        }
        result = await assistant.draftSalesEmail(data);
        metadata = { category: 'sales', audience: data.company };
        break;

      case 'draft_partnership_email':
        if (!data?.name || !data?.company || !data?.type) {
          return NextResponse.json(
            { error: 'Missing required fields: name, company, type' },
            { status: 400 }
          );
        }
        result = await assistant.draftPartnershipEmail(data);
        metadata = { category: 'partnership', type: data.type };
        break;

      // Marketing Content
      case 'generate_linkedin_post':
        if (!data?.topic) {
          return NextResponse.json(
            { error: 'Missing required field: topic' },
            { status: 400 }
          );
        }
        result = await assistant.generateLinkedInPost(data.topic, data.options || {});
        metadata = { category: 'marketing', platform: 'linkedin' };
        break;

      case 'generate_blog_post':
        if (!data?.topic) {
          return NextResponse.json(
            { error: 'Missing required field: topic' },
            { status: 400 }
          );
        }
        result = await assistant.generateBlogPost(data.topic, data.length || 'medium', data.keywords || []);
        metadata = { category: 'marketing', type: 'blog', length: data.length };
        break;

      case 'generate_product_announcement':
        if (!data?.featureName || !data?.description) {
          return NextResponse.json(
            { error: 'Missing required fields: featureName, description' },
            { status: 400 }
          );
        }
        result = await assistant.generateProductAnnouncement(data);
        metadata = { category: 'product', feature: data.featureName };
        break;

      case 'generate_social_content':
        if (!data?.platform || !data?.topic) {
          return NextResponse.json(
            { error: 'Missing required fields: platform, topic' },
            { status: 400 }
          );
        }
        result = await assistant.generateSocialMediaContent(data.platform, data.topic, data.style || 'professional');
        metadata = { category: 'social', platform: data.platform };
        break;

      // User Support
      case 'generate_support_response':
        if (!data?.question) {
          return NextResponse.json(
            { error: 'Missing required field: question' },
            { status: 400 }
          );
        }
        result = await assistant.generateSupportResponse(data);
        metadata = { category: 'support', urgency: data.urgency || 'normal' };
        break;

      case 'generate_onboarding_email':
        if (!data?.name || !data?.step) {
          return NextResponse.json(
            { error: 'Missing required fields: name, step' },
            { status: 400 }
          );
        }
        result = await assistant.generateOnboardingEmail(data, data.step);
        metadata = { category: 'onboarding', step: data.step };
        break;

      case 'generate_faq_answer':
        if (!data?.question) {
          return NextResponse.json(
            { error: 'Missing required field: question' },
            { status: 400 }
          );
        }
        result = await assistant.generateFAQAnswer(data.question, data.category || 'general');
        metadata = { category: 'support', type: 'faq' };
        break;

      // NFT-Specific
      case 'generate_nft_description':
        if (!data?.name || !data?.category) {
          return NextResponse.json(
            { error: 'Missing required fields: name, category' },
            { status: 400 }
          );
        }
        result = await assistant.generateNFTDescription(data);
        metadata = { category: 'nft', type: 'description' };
        break;

      case 'generate_collection_description':
        if (!data?.name || !data?.theme) {
          return NextResponse.json(
            { error: 'Missing required fields: name, theme' },
            { status: 400 }
          );
        }
        result = await assistant.generateCollectionDescription(data);
        metadata = { category: 'nft', type: 'collection' };
        break;

      case 'generate_nft_marketing':
        if (!data?.name || !data?.category) {
          return NextResponse.json(
            { error: 'Missing required fields: name, category' },
            { status: 400 }
          );
        }
        result = await assistant.generateNFTMarketingCopy(data, data.purpose || 'listing');
        metadata = { category: 'nft', purpose: data.purpose };
        break;

      // Executive & Analytics
      case 'generate_daily_briefing':
        result = await assistant.generateDailyBriefing(data?.metrics || {});
        metadata = { category: 'executive', type: 'briefing' };
        break;

      case 'analyze_competitor':
        if (!data?.name || !data?.features) {
          return NextResponse.json(
            { error: 'Missing required fields: name, features' },
            { status: 400 }
          );
        }
        result = await assistant.analyzeCompetitor(data);
        metadata = { category: 'executive', type: 'competitor_analysis' };
        break;

      case 'generate_email_campaign':
        if (!data?.subject || !data?.audience || !data?.goal) {
          return NextResponse.json(
            { error: 'Missing required fields: subject, audience, goal' },
            { status: 400 }
          );
        }
        result = await assistant.generateEmailCampaign(data);
        metadata = { category: 'marketing', type: 'email_campaign' };
        break;

      // Utility Methods
      case 'summarize_text':
        if (!data?.text) {
          return NextResponse.json(
            { error: 'Missing required field: text' },
            { status: 400 }
          );
        }
        result = await assistant.summarizeText(data.text, data.maxWords || 100, data.style || 'concise');
        metadata = { category: 'utility', type: 'summarize' };
        break;

      case 'improve_writing':
        if (!data?.text) {
          return NextResponse.json(
            { error: 'Missing required field: text' },
            { status: 400 }
          );
        }
        result = await assistant.improveWriting(data.text, data.style || 'professional', data.purpose || 'general');
        metadata = { category: 'utility', type: 'improve' };
        break;

      default:
        return NextResponse.json(
          { error: `Invalid action: ${action}. Check API documentation for supported actions.` },
          { status: 400 }
        );
    }

    // Log usage (optional - implement logging to database)
    console.log(`AI Assistant used by ${userId}: ${action}`);

    // Return success response
    return NextResponse.json({
      success: true,
      result,
      metadata: {
        ...metadata,
        action,
        timestamp: new Date().toISOString(),
        user: userId
      }
    });

  } catch (error: any) {
    console.error('AI Assistant API Error:', error);

    // Handle rate limit errors
    if (error.message?.includes('Rate limit exceeded')) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in an hour.' },
        { status: 429 }
      );
    }

    // Handle API key errors
    if (error.message?.includes('API key') || error.message?.includes('authentication')) {
      return NextResponse.json(
        { error: 'AI service configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    // Generic error
    return NextResponse.json(
      { error: error.message || 'AI Assistant failed to generate content' },
      { status: 500 }
    );
  }
}

// GET endpoint for listing available actions
export async function GET(request: NextRequest) {
  const actions = {
    sales: [
      { action: 'draft_sales_email', description: 'Generate personalized sales email', requiredFields: ['name', 'company', 'title', 'industry'] },
      { action: 'draft_partnership_email', description: 'Generate partnership proposal', requiredFields: ['name', 'company', 'type', 'proposedIntegration'] }
    ],
    marketing: [
      { action: 'generate_linkedin_post', description: 'Create LinkedIn post', requiredFields: ['topic'] },
      { action: 'generate_blog_post', description: 'Write blog post', requiredFields: ['topic'] },
      { action: 'generate_product_announcement', description: 'Create product announcement', requiredFields: ['featureName', 'description', 'benefits', 'releaseDate'] },
      { action: 'generate_social_content', description: 'Generate social media content', requiredFields: ['platform', 'topic'] },
      { action: 'generate_email_campaign', description: 'Create email campaign', requiredFields: ['subject', 'audience', 'goal'] }
    ],
    support: [
      { action: 'generate_support_response', description: 'Generate support response', requiredFields: ['question', 'category'] },
      { action: 'generate_onboarding_email', description: 'Create onboarding email', requiredFields: ['name', 'step'] },
      { action: 'generate_faq_answer', description: 'Generate FAQ answer', requiredFields: ['question'] }
    ],
    nft: [
      { action: 'generate_nft_description', description: 'Generate NFT description', requiredFields: ['name', 'category', 'creator'] },
      { action: 'generate_collection_description', description: 'Generate collection description', requiredFields: ['name', 'theme', 'totalItems', 'creator'] },
      { action: 'generate_nft_marketing', description: 'Generate NFT marketing copy', requiredFields: ['name', 'category'] }
    ],
    executive: [
      { action: 'generate_daily_briefing', description: 'Generate daily executive briefing', requiredFields: [] },
      { action: 'analyze_competitor', description: 'Analyze competitor', requiredFields: ['name', 'features'] }
    ],
    utility: [
      { action: 'summarize_text', description: 'Summarize text', requiredFields: ['text'] },
      { action: 'improve_writing', description: 'Improve writing', requiredFields: ['text'] }
    ]
  };

  return NextResponse.json({
    message: 'AuthiChain AI Executive Assistant API',
    version: '1.0.0',
    actions,
    usage: {
      endpoint: '/api/ai-assistant',
      method: 'POST',
      body: {
        action: 'string (required)',
        data: 'object (required fields vary by action)'
      }
    }
  });
}
