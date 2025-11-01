
// AI Executive Assistant for AuthiChain NFT Marketplace
// Anthropic Claude-powered content generation and automation

const Anthropic = require('@anthropic-ai/sdk');
const { AUTHICHAIN_CONTEXT } = require('./ai-assistant-config');

class AIExecutiveAssistant {
  constructor(apiKey) {
    this.anthropic = new Anthropic({
      apiKey: apiKey || process.env.ANTHROPIC_API_KEY,
    });
    
    this.context = AUTHICHAIN_CONTEXT;
    this.rateLimitCounter = 0;
    this.rateLimitWindow = Date.now();
    this.model = 'claude-sonnet-4-20250514';
  }

  async checkRateLimit() {
    const limit = parseInt(process.env.AI_ASSISTANT_RATE_LIMIT || '100');
    const windowMs = 60 * 60 * 1000; // 1 hour
    
    if (Date.now() - this.rateLimitWindow > windowMs) {
      this.rateLimitCounter = 0;
      this.rateLimitWindow = Date.now();
    }
    
    if (this.rateLimitCounter >= limit) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    
    this.rateLimitCounter++;
  }

  async callClaude(prompt, maxTokens = 2000) {
    await this.checkRateLimit();
    
    console.log("🤖 Calling Claude AI...");
    
    try {
      const message = await this.anthropic.messages.create({
        model: this.model,
        max_tokens: maxTokens,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      return message.content[0].text;
    } catch (error) {
      console.error('Claude API Error:', error.message);
      throw new Error(`AI Assistant failed: ${error.message}`);
    }
  }

  // ===== SALES & OUTREACH =====

  async draftSalesEmail(prospectData) {
    const { name, company, title, industry, painPoints = [] } = prospectData;
    
    const prompt = `Draft a compelling sales email for AuthiChain NFT Authentication Marketplace.

Prospect Information:
- Name: ${name}
- Company: ${company}
- Title: ${title}
- Industry: ${industry}
${painPoints.length > 0 ? `- Pain Points: ${painPoints.join(', ')}` : ''}

AuthiChain Product:
${this.context.product} - ${this.context.tagline}

Key Features:
${this.context.features.slice(0, 5).map(f => `• ${f}`).join('\n')}

Value Propositions:
${Object.entries(this.context.valuePropositions).map(([k, v]) => `• ${v}`).join('\n')}

Competitive Advantages:
${this.context.competitiveAdvantages.slice(0, 3).map(a => `• ${a}`).join('\n')}

Requirements:
- Personalize to their role, industry, and pain points
- Address specific challenges (counterfeits, authentication, brand protection, revenue loss)
- Clear, compelling value proposition
- Include 1-2 social proof elements (without making up specific names)
- Soft CTA: Ask for 15-min discovery call
- Professional yet approachable tone
- Under 130 words (body only)
- Include subject line

Generate the email:`;

    return await this.callClaude(prompt, 1200);
  }

  async draftPartnershipEmail(partnerData) {
    const { name, company, type, proposedIntegration, benefits = [] } = partnerData;
    
    const prompt = `Draft a partnership proposal email for AuthiChain.

Partner Information:
- Contact: ${name} at ${company}
- Partnership Type: ${type}
- Proposed Integration: ${proposedIntegration}
${benefits.length > 0 ? `- Mutual Benefits: ${benefits.join(', ')}` : ''}

AuthiChain Overview:
${this.context.product} - ${this.context.tagline}

Key Features: ${this.context.features.slice(0, 4).join(', ')}

Requirements:
- Highlight mutual value and benefits
- Specific integration opportunities and technical synergies
- Request partnership exploration call
- Professional, collaborative tone
- Under 160 words
- Include compelling subject line

Generate email:`;

    return await this.callClaude(prompt, 1200);
  }

  // ===== MARKETING CONTENT =====

  async generateLinkedInPost(topic, options = {}) {
    const { includeStats = false, tone = 'professional', targetAudience = 'general' } = options;
    
    const prompt = `Create an engaging LinkedIn post for AuthiChain about: ${topic}

AuthiChain Context:
- ${this.context.product}
- ${this.context.tagline}
- Target Audience: ${targetAudience !== 'general' ? targetAudience : this.context.targetAudiences.slice(0, 3).join(', ')}

Requirements:
- 190-230 words
- Strong, attention-grabbing opening hook related to NFT authentication, digital trust, or blockchain verification
- Include 1-2 specific insights about ${topic} as it relates to NFT technology or authenticity
- Address common pain points (counterfeits, trust issues, verification costs, fraud)
${includeStats ? '- Include 1-2 relevant statistics or data points (real, verifiable stats only)' : ''}
- Provide actionable takeaways or thought-provoking perspectives
- End with engaging question to drive comments and discussion
- Add 4-6 relevant hashtags (#NFT #Blockchain #Authentication #Web3 #DigitalAssets)
- ${tone === 'professional' ? 'Professional yet conversational' : tone} tone
- NO emojis in main text (can use sparingly in hashtag section)
- SEO-friendly with natural keyword integration

Generate the post:`;

    return await this.callClaude(prompt, 1200);
  }

  async generateBlogPost(topic, length = 'medium', keywords = []) {
    const wordCounts = {
      short: '600-800',
      medium: '1200-1600',
      long: '2200-2800'
    };

    const prompt = `Write a ${length} blog post (${wordCounts[length]} words) for AuthiChain blog about: ${topic}

AuthiChain Overview:
${this.context.product} - ${this.context.tagline}

Target Audience: ${this.context.targetAudiences.join(', ')}

Use Cases:
${this.context.useCases.slice(0, 4).map(uc => `• ${uc}`).join('\n')}

${keywords.length > 0 ? `Target Keywords: ${keywords.join(', ')}` : ''}

Requirements:
- Compelling, SEO-optimized headline (H1)
- Engaging introduction with hook and clear thesis
- 4-6 main sections with descriptive subheadings (H2/H3)
- Include specific examples related to NFT authentication, blockchain verification, or digital authenticity
- Address reader pain points and provide solutions
- Actionable insights and practical takeaways
- Strong conclusion with clear CTA (try AuthiChain, contact for demo, etc.)
- SEO-friendly (naturally incorporate keywords: NFT, authentication, blockchain, verification, digital assets)
- Professional yet accessible tone
- Include relevant statistics or case study references where appropriate
- Format in markdown

Generate the blog post:`;

    return await this.callClaude(prompt, 4096);
  }

  async generateProductAnnouncement(featureData) {
    const { featureName, description, benefits, releaseDate, targetUsers = 'all users' } = featureData;

    const prompt = `Create a product announcement for AuthiChain's new feature.

Feature Information:
- Feature Name: ${featureName}
- Description: ${description}
- Key Benefits: ${benefits.join(', ')}
- Release Date: ${releaseDate}
- Target Users: ${targetUsers}

AuthiChain Context:
${this.context.product} - ${this.context.tagline}

Format: Multi-channel announcement content

Requirements:
- Exciting but professional tone
- Clear value proposition and user benefits
- Specific use cases showing how to use the feature
- Strong CTA to try the feature
- Keep each version concise and punchy

Generate 3 versions:

1. **Email Announcement** (Subject + Body, 160-180 words)
   - Compelling subject line
   - Problem → Solution → Benefits structure
   - Clear instructions on accessing the feature
   - CTA button text

2. **Social Media Post** (LinkedIn/Twitter, 120-140 words)
   - Attention-grabbing hook
   - Feature highlights
   - Visual element suggestions
   - Relevant hashtags

3. **In-App Notification** (60-80 words)
   - Concise, benefit-focused
   - Immediate action prompt
   - Friendly, encouraging tone`;

    return await this.callClaude(prompt, 2500);
  }

  async generateSocialMediaContent(platform, topic, style = 'professional') {
    const platformGuidelines = {
      twitter: { maxWords: 50, tone: 'concise', hashtagCount: 2-3 },
      linkedin: { maxWords: 200, tone: 'professional', hashtagCount: 5 },
      instagram: { maxWords: 150, tone: 'visual', hashtagCount: 10 },
      facebook: { maxWords: 120, tone: 'conversational', hashtagCount: 3 }
    };

    const guide = platformGuidelines[platform.toLowerCase()] || platformGuidelines.linkedin;

    const prompt = `Create ${platform} content for AuthiChain about: ${topic}

AuthiChain: ${this.context.product}

Platform: ${platform}
Style: ${style}
Max Words: ${guide.maxWords}

Requirements:
- ${guide.tone} tone optimized for ${platform}
- Strong opening hook
- Clear value/insight related to NFT authentication or blockchain
- ${platform === 'instagram' ? 'Suggest visual elements (image/video ideas)' : ''}
- Include ${guide.hashtagCount} relevant hashtags
- Engagement-driving CTA

Generate the post:`;

    return await this.callClaude(prompt, 800);
  }

  // ===== USER SUPPORT & ONBOARDING =====

  async generateSupportResponse(ticket) {
    const { category, question, userContext = {}, urgency = 'normal' } = ticket;

    const prompt = `Generate a helpful support response for AuthiChain user.

Ticket Information:
- Category: ${category}
- User Question: ${question}
- User Context: ${JSON.stringify(userContext)}
- Urgency: ${urgency}

AuthiChain Features & Common Topics:

NFT Minting Process:
1. Connect Web3 wallet (MetaMask, WalletConnect, Coinbase Wallet)
2. Upload asset to IPFS (images, videos, documents)
3. Add metadata (title, description, attributes)
4. Select blockchain (Ethereum, Polygon, Base)
5. Mint NFT and receive verification certificate

Wallet Connection:
- Supported: MetaMask, WalletConnect, Coinbase Wallet, Rainbow Wallet
- Requirements: Browser extension or mobile wallet app
- Troubleshooting: Check network, refresh page, clear cache

Gas Fees:
- Network-dependent (Ethereum, Polygon, Base)
- Paid in native token (ETH, MATIC, ETH)
- Polygon recommended for lower fees (~$0.01-0.10)

Verification Process:
- Blockchain-verified authenticity certificate
- Immutable ownership record
- IPFS-stored metadata and assets

Subscriptions:
- Basic: Free (5 NFTs/month)
- Pro: $29/month (unlimited NFTs, advanced features)
- Enterprise: Custom pricing (white-label, API access)

Requirements:
- Empathetic, helpful, and professional tone
- Clear, step-by-step instructions when applicable
- Provide specific solutions, not generic advice
- Proactively suggest next steps
- Offer additional resources (docs, tutorials, support channels)
- ${urgency === 'high' ? 'Urgent, immediate assistance focus' : 'Thorough, educational approach'}
- Under 220 words

Generate support response:`;

    return await this.callClaude(prompt, 1800);
  }

  async generateOnboardingEmail(userData, step) {
    const { name, accountType, signupDate, progress = {} } = userData;

    const onboardingSteps = {
      welcome: {
        title: 'Welcome to AuthiChain',
        focus: 'Platform introduction and first steps'
      },
      first_mint: {
        title: 'Mint Your First NFT',
        focus: 'Step-by-step minting guide'
      },
      explore_features: {
        title: 'Explore Advanced Features',
        focus: 'Collections, auctions, and verification'
      },
      upgrade_prompt: {
        title: 'Unlock Pro Features',
        focus: 'Benefits of Pro subscription'
      },
      engagement: {
        title: 'Make the Most of AuthiChain',
        focus: 'Tips, best practices, and community'
      }
    };

    const currentStep = onboardingSteps[step] || onboardingSteps.welcome;

    const prompt = `Create an onboarding email for AuthiChain user.

User Information:
- Name: ${name}
- Account Type: ${accountType}
- Signup Date: ${signupDate}
- Progress: ${JSON.stringify(progress)}

Onboarding Step: ${step}
- Focus: ${currentStep.focus}

AuthiChain Overview:
${this.context.product} - ${this.context.tagline}

Key Features:
${this.context.features.slice(0, 6).map(f => `• ${f}`).join('\n')}

Requirements:
- Personalized, warm greeting
- ${currentStep.focus}
- One clear, primary CTA (big button action)
- 2-3 quick tips specific to this step
- Visual suggestions (screenshots, icons, diagrams)
- Friendly, encouraging, non-salesy tone
- Under 170 words (body only)
- Compelling subject line that drives opens (use curiosity, urgency, or value)
- P.S. line with secondary CTA or helpful resource

Generate email with subject line and body:`;

    return await this.callClaude(prompt, 1500);
  }

  // ===== NFT-SPECIFIC CONTENT =====

  async generateNFTDescription(nftData) {
    const { name, category, attributes = {}, creator, story, rarity, edition } = nftData;

    const prompt = `Write a compelling NFT description for AuthiChain marketplace listing.

NFT Information:
- Name: ${name}
- Category: ${category}
- Attributes: ${JSON.stringify(attributes)}
- Creator: ${creator}
- Story/Background: ${story || 'Not provided - create compelling narrative'}
${rarity ? `- Rarity: ${rarity}` : ''}
${edition ? `- Edition: ${edition}` : ''}

Requirements:
- Engaging, descriptive title/headline
- Compelling narrative (3-4 sentences) that tells the NFT's story
- Highlight unique attributes and their significance
- Emphasize authenticity (blockchain-verified, immutable record)
- Create emotional connection and desire
- Professional yet creative, artistic tone
- 100-140 words
- SEO-friendly (incorporate: NFT, verified, authentic, ${category})
- Make it stand out from generic NFT descriptions

Generate description:`;

    return await this.callClaude(prompt, 1000);
  }

  async generateCollectionDescription(collectionData) {
    const { name, theme, totalItems, creator, utilities = [], roadmap, communityBenefits } = collectionData;

    const prompt = `Write a collection description for AuthiChain NFT marketplace.

Collection Information:
- Name: ${name}
- Theme: ${theme}
- Total Items: ${totalItems}
- Creator: ${creator}
- Utilities: ${utilities.length > 0 ? utilities.join(', ') : 'None specified'}
${roadmap ? `- Roadmap: ${roadmap}` : ''}
${communityBenefits ? `- Community Benefits: ${communityBenefits}` : ''}

Requirements:
- Captivating collection overview and vision
- Theme exploration and artistic direction
- What makes this collection unique and valuable
- Utility and holder benefits (if any)
- Rarity and distribution information
- Authenticity and verification emphasis
- Creator background and credibility
- Community and roadmap highlights
- 140-200 words
- Engaging, professional tone with artistic flair
- SEO-optimized

Generate description:`;

    return await this.callClaude(prompt, 1400);
  }

  async generateNFTMarketingCopy(nftData, purpose = 'listing') {
    const { name, category, price, highlights = [], targetBuyers } = nftData;

    const purposes = {
      listing: 'Marketplace listing that drives sales',
      social: 'Social media announcement for launch',
      email: 'Email campaign to collectors',
      auction: 'Auction listing with urgency and scarcity'
    };

    const prompt = `Create ${purposes[purpose]} copy for AuthiChain NFT.

NFT Details:
- Name: ${name}
- Category: ${category}
${price ? `- Price: ${price}` : ''}
- Highlights: ${highlights.length > 0 ? highlights.join(', ') : 'Not provided'}
${targetBuyers ? `- Target Buyers: ${targetBuyers}` : ''}

Purpose: ${purposes[purpose]}

Requirements:
- ${purpose === 'auction' ? 'Create urgency and FOMO' : 'Compelling value proposition'}
- Highlight key features and benefits
- Appeal to ${targetBuyers || 'NFT collectors and enthusiasts'}
- ${purpose === 'social' ? 'Concise (100 words), shareable' : 'Detailed persuasion (150 words)'}
- Professional yet exciting tone
- Strong CTA
${purpose === 'auction' ? '- Emphasize scarcity, time pressure, competitive bidding' : ''}

Generate copy:`;

    return await this.callClaude(prompt, 1200);
  }

  // ===== EXECUTIVE & ANALYTICS =====

  async generateDailyBriefing(metrics = {}) {
    const {
      nftsMinted = 0,
      revenue = 0,
      activeAuctions = 0,
      newSignups = 0,
      enterpriseLeads = 0,
      topCollection = 'N/A',
      avgMintTime = 'N/A'
    } = metrics;

    const prompt = `Generate a morning executive briefing for AuthiChain founder/leadership.

Yesterday's Metrics:
- NFTs Minted: ${nftsMinted}
- Revenue: $${revenue}
- Active Auctions: ${activeAuctions}
- New Signups: ${newSignups}
- Enterprise Leads: ${enterpriseLeads}
- Top Collection: ${topCollection}
- Avg Mint Time: ${avgMintTime}

Current Strategic Focus:
- Growing enterprise customer base and partnerships
- Increasing NFT minting volume and marketplace activity
- Improving user onboarding and activation rates
- Building strategic blockchain and marketplace partnerships
- Enhancing platform features and user experience

Include:
1. **Key Highlights** - Top 3 wins or concerns from yesterday
2. **Today's Top 3 Priorities** - What to focus on today
3. **Quick Wins** - 2-3 actionable items that can be done quickly
4. **Metrics to Watch** - KPIs that need monitoring
5. **Strategic Recommendation** - 1 high-level suggestion

Format: Executive-style bullet points
Tone: Concise, actionable, data-driven
Length: Under 220 words

Generate briefing:`;

    return await this.callClaude(prompt, 1500);
  }

  async analyzeCompetitor(competitorData) {
    const { name, features = [], pricing, strengths = [], weaknesses = [], marketPosition } = competitorData;

    const prompt = `Analyze competitor and provide AuthiChain positioning strategy.

Competitor: ${name}
- Features: ${features.join(', ')}
- Pricing: ${pricing}
- Strengths: ${strengths.join(', ')}
- Weaknesses: ${weaknesses.join(', ')}
${marketPosition ? `- Market Position: ${marketPosition}` : ''}

AuthiChain Competitive Advantages:
${this.context.competitiveAdvantages.map(a => `• ${a}`).join('\n')}

AuthiChain Features:
${this.context.features.slice(0, 8).map(f => `• ${f}`).join('\n')}

Provide:
1. **Competitive Analysis Summary** - Key takeaways about competitor
2. **AuthiChain Differentiation** - How we stand out
3. **Messaging Recommendations** - What to emphasize in marketing
4. **Feature Gap Analysis** - What they have that we don't (and should we build it?)
5. **Pricing Strategy** - How to position our pricing
6. **Action Items** - 3-5 specific tactical recommendations

Format: Markdown with clear sections
Tone: Strategic, analytical, actionable

Generate analysis:`;

    return await this.callClaude(prompt, 3500);
  }

  // ===== UTILITY METHODS =====

  async summarizeText(text, maxWords = 100, style = 'concise') {
    const prompt = `Summarize the following text in ${maxWords} words or less.

Style: ${style}

Text:
${text}

Provide a ${style === 'concise' ? 'brief, bullet-point' : 'narrative'} summary that captures the key points, main arguments, and actionable insights.`;

    return await this.callClaude(prompt, 600);
  }

  async improveWriting(text, style = 'professional', purpose = 'general') {
    const prompt = `Improve the following text with a ${style} tone for ${purpose} purpose.

Original Text:
${text}

Requirements:
- Enhance clarity and readability
- Improve engagement and impact
- Maintain core message and intent
- ${style === 'professional' ? 'Polish language, remove colloquialisms' : 'Adjust tone appropriately'}
- ${purpose === 'marketing' ? 'Add persuasive elements' : purpose === 'technical' ? 'Ensure accuracy and precision' : 'Optimize for purpose'}
- Fix grammar, punctuation, and style issues

Provide improved version:`;

    return await this.callClaude(prompt, 2000);
  }

  async generateEmailCampaign(campaignData) {
    const { subject, audience, goal, keyPoints = [], tone = 'professional' } = campaignData;

    const prompt = `Create an email campaign for AuthiChain.

Campaign Details:
- Subject: ${subject}
- Target Audience: ${audience}
- Campaign Goal: ${goal}
- Key Points: ${keyPoints.join(', ')}
- Tone: ${tone}

AuthiChain Context:
${this.context.product} - ${this.context.tagline}

Value Props: ${Object.values(this.context.valuePropositions).slice(0, 2).join('; ')}

Generate:
1. **3 Subject Line Options** (A/B/C test variations)
2. **Email Body** (180-220 words)
   - Personalized greeting
   - Strong opening hook
   - Value proposition and benefits
   - Social proof elements
   - Clear CTA
   - P.S. line
3. **CTA Button Text** (2-3 options)

Format: Markdown with clear sections`;

    return await this.callClaude(prompt, 2000);
  }

  async generateFAQAnswer(question, category = 'general') {
    const prompt = `Generate a comprehensive FAQ answer for AuthiChain.

Question: ${question}
Category: ${category}

AuthiChain Overview:
${this.context.product}

Features: ${this.context.features.slice(0, 6).join(', ')}

Requirements:
- Direct, clear answer to the question
- Step-by-step instructions if applicable
- Include relevant links to docs/resources (use placeholders like [Minting Guide])
- Anticipate follow-up questions
- Professional, helpful tone
- 80-150 words
- If technical, simplify for non-technical users

Generate answer:`;

    return await this.callClaude(prompt, 1000);
  }
}

module.exports = AIExecutiveAssistant;
