# AI Executive Assistant - Quick Start Guide

**5-Minute Setup Guide**

---

## ⚡ Quick Setup (3 Steps)

### Step 1: Get Anthropic API Key (2 minutes)

1. Go to: **https://console.anthropic.com/**
2. Sign up or log in
3. Navigate to **API Keys** section
4. Click **"Create Key"**
5. Copy your API key (starts with `sk-ant-api03-...`)

### Step 2: Add API Key (1 minute)

**For Local Development:**
```bash
# Edit /app/.env
ANTHROPIC_API_KEY=sk-ant-api03-YOUR_KEY_HERE
```

**For Vercel Production:**
1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add `ANTHROPIC_API_KEY` = your key
4. Redeploy

### Step 3: Use It! (2 minutes)

1. Start dev server: `npm run dev`
2. Navigate to: **http://localhost:3000/admin/ai-assistant**
3. Select a category (e.g., Marketing Content)
4. Choose action (e.g., Generate LinkedIn Post)
5. Fill in topic: "NFT authentication benefits"
6. Click "Generate Content"
7. Copy and use! 🎉

---

## 📍 Quick Reference

### Access URL
- **Local:** http://localhost:3000/admin/ai-assistant
- **Production:** https://authichain.com/admin/ai-assistant

### API Endpoint
- **URL:** `/api/ai-assistant`
- **Method:** POST
- **Auth:** Admin only

### Files Location
```
/app/lib/AIExecutiveAssistant.js       # Main AI class
/app/lib/ai-assistant-config.js        # Configuration
/app/app/api/ai-assistant/route.ts     # API endpoint
/app/app/admin/ai-assistant/page.tsx   # Admin UI
```

### Test Command
```bash
cd /app
node test-ai-assistant.js
```

---

## 🎯 19 Available Actions

### Sales & Outreach
1. Draft Sales Email
2. Draft Partnership Email

### Marketing Content
3. Generate LinkedIn Post
4. Generate Blog Post
5. Generate Twitter Thread
6. Product Announcement

### User Support
7. Generate Support Response
8. Generate Onboarding Email
9. Generate FAQ Answer

### NFT Content
10. Generate NFT Description
11. Generate Collection Description
12. Improve NFT Metadata

### Executive & Analytics
13. Generate Daily Briefing
14. Analyze Competitor
15. Generate Marketing Strategy
16. Generate Content Calendar

### Utilities
17. Summarize Text
18. Improve Writing
19. Translate Text

---

## 💡 Example Usage

### Generate LinkedIn Post
```json
{
  "action": "generate_linkedin_post",
  "data": {
    "topic": "How NFT authentication protects luxury brands"
  }
}
```

### Draft Sales Email
```json
{
  "action": "draft_sales_email",
  "data": {
    "name": "John Smith",
    "company": "Luxury Corp",
    "title": "CMO",
    "industry": "Fashion"
  }
}
```

### Generate NFT Description
```json
{
  "action": "generate_nft_description",
  "data": {
    "name": "Digital Masterpiece #1",
    "category": "Art",
    "attributes": {"style": "abstract", "rarity": "legendary"},
    "creator": "Jane Doe",
    "story": "Created during the crypto renaissance"
  }
}
```

---

## 💰 Cost

- **Low usage (100 requests/mo):** ~$1.65
- **Medium usage (1,000 requests/mo):** ~$16.50
- **High usage (5,000 requests/mo):** ~$82.50

**ROI:** 75,000%+ (saves 15 min per request at $50/hr)

---

## ❓ Troubleshooting

**"AI Assistant not configured"**
→ Add ANTHROPIC_API_KEY to .env

**"Unauthorized"**
→ Log in as admin user

**"Forbidden"**
→ Grant admin role: `/api/admin/make-admin`

**"Rate limit exceeded"**
→ Wait 1 hour or increase limit in config

---

## 📚 Full Documentation

See: `/authichain_premium/AI_ASSISTANT_IMPLEMENTATION.md`

---

## ✅ Checklist

- [ ] Get Anthropic API key
- [ ] Add to `.env` file
- [ ] Add to Vercel environment variables
- [ ] Restart server
- [ ] Test in admin dashboard
- [ ] Start generating content!

---

**That's it! You're ready to 10x your content production! 🚀**
