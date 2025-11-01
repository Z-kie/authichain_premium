#!/usr/bin/env node

/**
 * AI Executive Assistant Test Script
 * Tests all major functions of the AuthiChain AI Assistant
 */

require('dotenv').config();
const AIExecutiveAssistant = require('../lib/AIExecutiveAssistant');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function runTests() {
  log('\n═══════════════════════════════════════════════════', 'cyan');
  log('🤖 AuthiChain AI Executive Assistant - Test Suite', 'cyan');
  log('═══════════════════════════════════════════════════\n', 'cyan');

  // Check API key
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_anthropic_api_key_here') {
    log('❌ ERROR: ANTHROPIC_API_KEY not configured!', 'red');
    log('\nPlease set your Anthropic API key in .env file:', 'yellow');
    log('ANTHROPIC_API_KEY=your_actual_key_here\n', 'yellow');
    log('Get your API key from: https://console.anthropic.com/', 'blue');
    process.exit(1);
  }

  const assistant = new AIExecutiveAssistant();

  try {
    // Test 1: Sales Email
    log('📧 TEST 1: Sales Email Generation', 'blue');
    log('─────────────────────────────────────────────────────\n', 'blue');
    
    const salesEmail = await assistant.draftSalesEmail({
      name: 'Sarah Chen',
      company: 'Luxury Fashion Brand Co.',
      title: 'Chief Digital Officer',
      industry: 'Fashion & Luxury Goods',
      painPoints: ['counterfeit products', 'brand protection', 'authentication costs']
    });
    
    log(salesEmail, 'green');
    log('\n✅ Sales Email Test Passed!\n', 'green');

    // Test 2: NFT Description
    log('🎨 TEST 2: NFT Description Generation', 'blue');
    log('─────────────────────────────────────────────────────\n', 'blue');
    
    const nftDescription = await assistant.generateNFTDescription({
      name: 'Cyber Phoenix #42',
      category: 'Digital Art',
      creator: 'ArtistDAO Collective',
      story: 'A mythical phoenix reborn in the digital realm, symbolizing transformation and resilience',
      rarity: 'Ultra Rare',
      attributes: {
        background: 'Neon Cityscape',
        style: 'Cyberpunk',
        animation: 'Dynamic Flames'
      }
    });
    
    log(nftDescription, 'green');
    log('\n✅ NFT Description Test Passed!\n', 'green');

    // Test 3: LinkedIn Post
    log('📱 TEST 3: LinkedIn Post Generation', 'blue');
    log('─────────────────────────────────────────────────────\n', 'blue');
    
    const linkedInPost = await assistant.generateLinkedInPost(
      'The future of NFT authentication in luxury brands',
      { tone: 'professional', targetAudience: 'luxury brand executives' }
    );
    
    log(linkedInPost, 'green');
    log('\n✅ LinkedIn Post Test Passed!\n', 'green');

    // Test 4: Support Response
    log('💬 TEST 4: Support Response Generation', 'blue');
    log('─────────────────────────────────────────────────────\n', 'blue');
    
    const supportResponse = await assistant.generateSupportResponse({
      category: 'NFT Minting',
      question: 'I\'m trying to mint my first NFT but keep getting a "wallet connection failed" error. What should I do?',
      userContext: { accountType: 'basic', platform: 'mobile' },
      urgency: 'high'
    });
    
    log(supportResponse, 'green');
    log('\n✅ Support Response Test Passed!\n', 'green');

    // Test 5: Daily Briefing
    log('📊 TEST 5: Executive Briefing Generation', 'blue');
    log('─────────────────────────────────────────────────────\n', 'blue');
    
    const briefing = await assistant.generateDailyBriefing({
      nftsMinted: 127,
      revenue: 3450,
      activeAuctions: 23,
      newSignups: 45,
      enterpriseLeads: 3,
      topCollection: 'Verified Luxury Collection'
    });
    
    log(briefing, 'green');
    log('\n✅ Executive Briefing Test Passed!\n', 'green');

    // Summary
    log('═══════════════════════════════════════════════════', 'cyan');
    log('✅ ALL TESTS PASSED! AI Assistant is fully operational!', 'green');
    log('═══════════════════════════════════════════════════\n', 'cyan');

    log('🎉 Integration successful! The AI Assistant is ready to use.', 'magenta');
    log('\nAccess the dashboard at: /admin/ai-assistant\n', 'yellow');

  } catch (error) {
    log('\n❌ TEST FAILED!', 'red');
    log(`Error: ${error.message}`, 'red');
    
    if (error.message.includes('API key')) {
      log('\n💡 Fix: Verify your ANTHROPIC_API_KEY in .env file', 'yellow');
    } else if (error.message.includes('Rate limit')) {
      log('\n💡 Note: Rate limit reached. This is normal behavior.', 'yellow');
    } else {
      log(`\n${error.stack}`, 'red');
    }
    
    process.exit(1);
  }
}

// Run tests
runTests().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
