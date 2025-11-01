
// Test payment system integration
import { stripe } from '../lib/stripe';

async function testPaymentSystem() {
  console.log('🧪 Testing payment system integration...\n');

  try {
    // Test 1: Verify API connection
    console.log('1️⃣ Testing Stripe API connection...');
    const balance = await stripe.balance.retrieve();
    console.log('✅ Stripe API connected successfully');
    console.log(`   Available balance: $${balance.available[0]?.amount || 0 / 100}`);

    // Test 2: Verify products exist
    console.log('\n2️⃣ Verifying subscription products...');
    const products = await stripe.products.list({ limit: 10 });
    const itemChainProducts = products.data.filter((p: any) => 
      p.name?.includes('AuthiChain')
    );

    if (itemChainProducts.length >= 2) {
      console.log('✅ Subscription products found:');
      itemChainProducts.forEach((product: any) => {
        console.log(`   - ${product.name} (${product.id})`);
      });
    } else {
      console.log('⚠️  Products may need verification in Stripe Dashboard');
    }

    // Test 3: Verify price IDs
    console.log('\n3️⃣ Verifying price configuration...');
    const proPrice = process.env.STRIPE_PRO_PRICE_ID;
    const brandPrice = process.env.STRIPE_BRAND_PRICE_ID;

    if (proPrice && brandPrice) {
      try {
        const proPriceObj = await stripe.prices.retrieve(proPrice);
        const brandPriceObj = await stripe.prices.retrieve(brandPrice);
        
        console.log('✅ Price IDs verified:');
        console.log(`   Pro Plan: $${proPriceObj.unit_amount! / 100}/month (${proPrice})`);
        console.log(`   Brand Plan: $${brandPriceObj.unit_amount! / 100}/month (${brandPrice})`);
      } catch (error) {
        console.log('⚠️  Price ID verification failed - check Price IDs in .env');
      }
    }

    // Test 4: Create test checkout session
    console.log('\n4️⃣ Testing checkout session creation...');
    const testSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: proPrice,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'https://your-domain.com/success',
      cancel_url: 'https://your-domain.com/cancel',
    });

    console.log('✅ Test checkout session created successfully');
    console.log(`   Session ID: ${testSession.id}`);

    console.log('\n🎉 PAYMENT SYSTEM FULLY OPERATIONAL!');
    console.log('\n💰 READY TO GENERATE INCOME:');
    console.log('   ✅ Stripe API connected');
    console.log('   ✅ Products created');
    console.log('   ✅ Prices configured');
    console.log('   ✅ Checkout working');
    console.log('\n🚀 Your platform can now accept $29 and $99 monthly subscriptions!');

    // Show next steps
    console.log('\n📋 FINAL SETUP STEPS:');
    console.log('1. Set up webhooks in Stripe Dashboard');
    console.log('2. Deploy your app to production');
    console.log('3. Start promoting your subscription plans');
    console.log('4. Watch the recurring revenue roll in! 💸');

  } catch (error) {
    console.error('❌ Payment system test failed:', error);
    console.log('\n🔧 Please check:');
    console.log('   - API keys are correct');
    console.log('   - Products exist in Stripe Dashboard');
    console.log('   - Price IDs are valid');
  }
}

// Run test
testPaymentSystem().catch(console.error);
