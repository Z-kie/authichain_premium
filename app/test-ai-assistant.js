/**
 * Test Script for AI Executive Assistant
 * 
 * This script tests the AI Assistant integration WITHOUT calling the actual API
 * It validates the setup, configuration, and structure
 */

const path = require('path');

console.log('🧪 AI Executive Assistant - Integration Test\n');
console.log('=' .repeat(60));

// Test 1: Check if dependencies are installed
console.log('\n✅ Test 1: Check Dependencies');
try {
  require('@anthropic-ai/sdk');
  console.log('   ✓ @anthropic-ai/sdk is installed');
} catch (error) {
  console.log('   ✗ @anthropic-ai/sdk is NOT installed');
  console.log('   Run: npm install @anthropic-ai/sdk');
}

// Test 2: Check if configuration file exists
console.log('\n✅ Test 2: Check Configuration File');
try {
  const config = require('./lib/ai-assistant-config');
  console.log('   ✓ Configuration file exists');
  console.log('   ✓ Company:', config.AUTHICHAIN_CONTEXT.company);
  console.log('   ✓ Product:', config.AUTHICHAIN_CONTEXT.product);
  console.log('   ✓ Features:', config.AUTHICHAIN_CONTEXT.features.length);
  console.log('   ✓ Target Audiences:', config.AUTHICHAIN_CONTEXT.targetAudiences.length);
} catch (error) {
  console.log('   ✗ Configuration file NOT found or invalid');
  console.log('   Error:', error.message);
}

// Test 3: Check if AI Assistant class exists
console.log('\n✅ Test 3: Check AI Assistant Class');
try {
  const AIExecutiveAssistant = require('./lib/AIExecutiveAssistant');
  console.log('   ✓ AIExecutiveAssistant class loaded');
  
  // Test instantiation (without API key)
  process.env.ANTHROPIC_API_KEY = 'test_key_for_validation';
  const assistant = new AIExecutiveAssistant('admin');
  console.log('   ✓ Assistant can be instantiated');
  console.log('   ✓ Context loaded:', assistant.context.company);
  
  // Check methods exist
  const methods = [
    'draftSalesEmail',
    'draftPartnershipEmail',
    'generateLinkedInPost',
    'generateBlogPost',
    'generateTwitterThread',
    'generateProductAnnouncement',
    'generateSupportResponse',
    'generateOnboardingEmail',
    'generateFAQAnswer',
    'generateNFTDescription',
    'generateCollectionDescription',
    'improveNFTMetadata',
    'generateDailyBriefing',
    'analyzeCompetitor',
    'generateMarketingStrategy',
    'generateContentCalendar',
    'summarizeText',
    'improveWriting',
    'translateText',
  ];
  
  const missingMethods = methods.filter(method => typeof assistant[method] !== 'function');
  
  if (missingMethods.length === 0) {
    console.log(`   ✓ All ${methods.length} methods are implemented`);
  } else {
    console.log(`   ✗ Missing methods: ${missingMethods.join(', ')}`);
  }
  
} catch (error) {
  console.log('   ✗ AI Assistant class NOT found or invalid');
  console.log('   Error:', error.message);
}

// Test 4: Check if API route exists
console.log('\n✅ Test 4: Check API Route');
const fs = require('fs');
const apiRoutePath = path.join(__dirname, 'app/api/ai-assistant/route.ts');
if (fs.existsSync(apiRoutePath)) {
  console.log('   ✓ API route file exists:', apiRoutePath);
  const content = fs.readFileSync(apiRoutePath, 'utf8');
  
  const hasGET = content.includes('export async function GET');
  const hasPOST = content.includes('export async function POST');
  const hasAuth = content.includes('requireAuth') || content.includes('getServerSession');
  const hasValidation = content.includes('z.object') || content.includes('schema');
  
  console.log('   ✓ GET handler:', hasGET ? '✓' : '✗');
  console.log('   ✓ POST handler:', hasPOST ? '✓' : '✗');
  console.log('   ✓ Authentication:', hasAuth ? '✓' : '✗');
  console.log('   ✓ Input validation:', hasValidation ? '✓' : '✗');
} else {
  console.log('   ✗ API route file NOT found');
}

// Test 5: Check if admin page exists
console.log('\n✅ Test 5: Check Admin Dashboard Page');
const adminPagePath = path.join(__dirname, 'app/admin/ai-assistant/page.tsx');
if (fs.existsSync(adminPagePath)) {
  console.log('   ✓ Admin page exists:', adminPagePath);
  const content = fs.readFileSync(adminPagePath, 'utf8');
  
  const hasUI = content.includes('useState') && content.includes('Button');
  const hasCategories = content.includes('actionCategories');
  const hasFetch = content.includes('fetch') && content.includes('/api/ai-assistant');
  
  console.log('   ✓ React UI components:', hasUI ? '✓' : '✗');
  console.log('   ✓ Action categories:', hasCategories ? '✓' : '✗');
  console.log('   ✓ API integration:', hasFetch ? '✓' : '✗');
} else {
  console.log('   ✗ Admin page NOT found');
}

// Test 6: Check environment variables
console.log('\n✅ Test 6: Check Environment Variables');
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasAnthropicKey = envContent.includes('ANTHROPIC_API_KEY');
  const hasRateLimit = envContent.includes('AI_ASSISTANT_RATE_LIMIT');
  
  console.log('   ✓ .env file exists');
  console.log('   ✓ ANTHROPIC_API_KEY:', hasAnthropicKey ? '✓' : '✗');
  console.log('   ✓ AI_ASSISTANT_RATE_LIMIT:', hasRateLimit ? '✓' : '✗');
  
  if (hasAnthropicKey && envContent.includes('your_anthropic_api_key_here')) {
    console.log('   ⚠️  WARNING: ANTHROPIC_API_KEY needs to be set to a real value');
    console.log('   Get your API key from: https://console.anthropic.com/');
  }
} else {
  console.log('   ✗ .env file NOT found');
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('✅ INTEGRATION TEST COMPLETE\n');

console.log('📋 Next Steps:');
console.log('1. Get Anthropic API key from: https://console.anthropic.com/');
console.log('2. Add the API key to .env: ANTHROPIC_API_KEY=sk-ant-...');
console.log('3. Add to Vercel environment variables');
console.log('4. Restart the development server');
console.log('5. Access admin panel: /admin/ai-assistant');
console.log('\n');
