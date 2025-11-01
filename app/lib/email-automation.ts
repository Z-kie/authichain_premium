
/**
 * Email Automation System
 * Handles lifecycle emails, onboarding, retention, and win-back campaigns
 */

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  trigger: 'signup' | 'trial_start' | 'trial_end' | 'subscription' | 'churn' | 'usage_milestone';
  delayDays?: number;
}

interface EmailSequence {
  name: string;
  emails: EmailTemplate[];
}

export class EmailAutomation {
  /**
   * Onboarding Email Sequence (Days 0, 1, 3, 7)
   */
  static onboardingSequence: EmailSequence = {
    name: 'Onboarding',
    emails: [
      {
        id: 'onboard-1',
        name: 'Welcome Email',
        subject: '🎉 Welcome to AuthiChain! Let\'s get you started',
        body: 'Welcome! Your first 100 products are FREE. Here\'s how to mint your first NFT...',
        trigger: 'signup',
        delayDays: 0,
      },
      {
        id: 'onboard-2',
        name: 'Day 1: Quick Start Guide',
        subject: '⚡ Mint your first product in 5 minutes',
        body: 'Quick tutorial on minting your first authenticated product...',
        trigger: 'signup',
        delayDays: 1,
      },
      {
        id: 'onboard-3',
        name: 'Day 3: Feature Showcase',
        subject: '🚀 Unlock the full power of AuthiChain',
        body: 'Discover advanced features: Supply chain tracking, analytics, API access...',
        trigger: 'signup',
        delayDays: 3,
      },
      {
        id: 'onboard-4',
        name: 'Day 7: Success Stories',
        subject: '📈 See how brands like yours save millions',
        body: 'Case studies and testimonials from successful customers...',
        trigger: 'signup',
        delayDays: 7,
      },
    ],
  };

  /**
   * Trial Conversion Sequence
   */
  static trialSequence: EmailSequence = {
    name: 'Trial Conversion',
    emails: [
      {
        id: 'trial-1',
        name: 'Trial Day 7: Value Reminder',
        subject: '💎 You\'ve authenticated 47 products—here\'s what\'s next',
        body: 'You\'re seeing the value! Upgrade now and get 20% off...',
        trigger: 'trial_start',
        delayDays: 7,
      },
      {
        id: 'trial-2',
        name: 'Trial Day 14: Countdown',
        subject: '⏰ Only 2 weeks left in your free trial',
        body: 'Don\'t lose access! Lock in your discounted rate today...',
        trigger: 'trial_start',
        delayDays: 14,
      },
      {
        id: 'trial-3',
        name: 'Trial Day 28: Last Chance',
        subject: '🚨 Last chance: Your trial ends tomorrow',
        body: 'Upgrade now to keep protecting your products...',
        trigger: 'trial_start',
        delayDays: 28,
      },
    ],
  };

  /**
   * Retention & Engagement Sequence
   */
  static retentionSequence: EmailSequence = {
    name: 'Retention',
    emails: [
      {
        id: 'retention-1',
        name: 'Monthly Value Summary',
        subject: '📊 Your monthly impact: 1,247 products protected',
        body: 'Here\'s how AuthiChain protected your brand this month...',
        trigger: 'usage_milestone',
        delayDays: 30,
      },
      {
        id: 'retention-2',
        name: 'Feature Update',
        subject: '🎁 New feature: Advanced Analytics Dashboard',
        body: 'We just launched something amazing for you...',
        trigger: 'subscription',
        delayDays: 60,
      },
    ],
  };

  /**
   * Win-Back Sequence (for churned customers)
   */
  static winBackSequence: EmailSequence = {
    name: 'Win-Back',
    emails: [
      {
        id: 'winback-1',
        name: 'We Miss You',
        subject: '😢 We noticed you left—here\'s 30% off to come back',
        body: 'We want you back! Exclusive offer just for you...',
        trigger: 'churn',
        delayDays: 7,
      },
      {
        id: 'winback-2',
        name: 'What Went Wrong?',
        subject: '🤔 Quick question about your experience',
        body: 'We\'d love your feedback. What could we improve?...',
        trigger: 'churn',
        delayDays: 14,
      },
      {
        id: 'winback-3',
        name: 'Last Offer',
        subject: '🎁 Final offer: 50% off for 3 months',
        body: 'This is our best offer ever. Come back today...',
        trigger: 'churn',
        delayDays: 30,
      },
    ],
  };

  /**
   * Send email (integrates with SendGrid/Mailgun/etc)
   */
  static async sendEmail(
    to: string,
    subject: string,
    body: string,
    metadata?: any
  ): Promise<boolean> {
    // TODO: Integrate with actual email service (SendGrid, Mailgun, etc.)
    console.log('Sending email:', { to, subject, body, metadata });
    
    // Placeholder for email service integration
    // const sg = require('@sendgrid/mail');
    // sg.setApiKey(process.env.SENDGRID_API_KEY);
    // await sg.send({ to, subject, html: body });

    return true;
  }

  /**
   * Schedule email sequence
   */
  static async scheduleSequence(
    userId: string,
    userEmail: string,
    sequenceType: 'onboarding' | 'trial' | 'retention' | 'winback'
  ): Promise<void> {
    const sequences: Record<string, EmailSequence> = {
      onboarding: this.onboardingSequence,
      trial: this.trialSequence,
      retention: this.retentionSequence,
      winback: this.winBackSequence,
    };

    const sequence = sequences[sequenceType];
    if (!sequence) return;

    for (const email of sequence.emails) {
      // Schedule each email with delay
      console.log(`Scheduling email ${email.name} for ${userEmail} in ${email.delayDays} days`);
      // TODO: Integrate with scheduling service (BullMQ, AWS SQS, etc.)
    }
  }

  /**
   * Trigger immediate email based on event
   */
  static async triggerEmail(
    event: 'signup' | 'trial_start' | 'subscription' | 'churn' | 'payment_success' | 'payment_failed',
    userId: string,
    userEmail: string,
    metadata?: any
  ): Promise<void> {
    const emailMap: Record<string, { subject: string; body: string }> = {
      signup: {
        subject: '🎉 Welcome to AuthiChain!',
        body: 'Thanks for signing up! Let\'s get you started with your first 100 FREE products...',
      },
      trial_start: {
        subject: '🚀 Your free trial has started!',
        body: 'You now have access to all AuthiChain features. Start minting products today...',
      },
      subscription: {
        subject: '✅ Subscription activated!',
        body: 'Thank you for subscribing! Here\'s what you can do now...',
      },
      payment_success: {
        subject: '💳 Payment received—thank you!',
        body: 'Your payment was processed successfully. View your invoice...',
      },
      payment_failed: {
        subject: '⚠️ Payment issue—action required',
        body: 'We had trouble processing your payment. Please update your payment method...',
      },
      churn: {
        subject: '😢 Sorry to see you go',
        body: 'We\'ll miss you! If you change your mind, we\'d love to have you back...',
      },
    };

    const emailContent = emailMap[event];
    if (emailContent) {
      await this.sendEmail(userEmail, emailContent.subject, emailContent.body, metadata);
    }
  }

  /**
   * Get all email templates
   */
  static getAllTemplates(): EmailTemplate[] {
    return [
      ...this.onboardingSequence.emails,
      ...this.trialSequence.emails,
      ...this.retentionSequence.emails,
      ...this.winBackSequence.emails,
    ];
  }
}
