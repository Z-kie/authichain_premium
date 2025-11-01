
'use client';

import React, { useState } from 'react';
import { SparklesIcon, DocumentTextIcon, EnvelopeIcon, ChatBubbleLeftRightIcon, PhotoIcon, ChartBarIcon, ClipboardDocumentCheckIcon, LightBulbIcon } from '@heroicons/react/24/outline';

// AI Assistant Actions grouped by category
const AI_ACTIONS = {
  sales: {
    icon: EnvelopeIcon,
    color: 'blue',
    actions: [
      {
        id: 'draft_sales_email',
        name: 'Sales Email',
        description: 'Generate personalized sales email',
        fields: [
          { name: 'name', label: 'Prospect Name', type: 'text', required: true },
          { name: 'company', label: 'Company', type: 'text', required: true },
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'industry', label: 'Industry', type: 'text', required: true },
          { name: 'painPoints', label: 'Pain Points (comma-separated)', type: 'text', required: false }
        ]
      },
      {
        id: 'draft_partnership_email',
        name: 'Partnership Email',
        description: 'Generate partnership proposal',
        fields: [
          { name: 'name', label: 'Contact Name', type: 'text', required: true },
          { name: 'company', label: 'Company', type: 'text', required: true },
          { name: 'type', label: 'Partnership Type', type: 'text', required: true },
          { name: 'proposedIntegration', label: 'Proposed Integration', type: 'textarea', required: true }
        ]
      }
    ]
  },
  marketing: {
    icon: SparklesIcon,
    color: 'purple',
    actions: [
      {
        id: 'generate_linkedin_post',
        name: 'LinkedIn Post',
        description: 'Create engaging LinkedIn post',
        fields: [
          { name: 'topic', label: 'Topic', type: 'text', required: true },
          { name: 'options.targetAudience', label: 'Target Audience', type: 'text', required: false },
          { name: 'options.tone', label: 'Tone', type: 'select', options: ['professional', 'conversational', 'thought-leader'], required: false }
        ]
      },
      {
        id: 'generate_blog_post',
        name: 'Blog Post',
        description: 'Write comprehensive blog post',
        fields: [
          { name: 'topic', label: 'Topic', type: 'text', required: true },
          { name: 'length', label: 'Length', type: 'select', options: ['short', 'medium', 'long'], required: false },
          { name: 'keywords', label: 'Keywords (comma-separated)', type: 'text', required: false }
        ]
      },
      {
        id: 'generate_social_content',
        name: 'Social Media Content',
        description: 'Generate platform-specific content',
        fields: [
          { name: 'platform', label: 'Platform', type: 'select', options: ['twitter', 'linkedin', 'instagram', 'facebook'], required: true },
          { name: 'topic', label: 'Topic', type: 'text', required: true },
          { name: 'style', label: 'Style', type: 'select', options: ['professional', 'casual', 'educational'], required: false }
        ]
      },
      {
        id: 'generate_email_campaign',
        name: 'Email Campaign',
        description: 'Create email campaign',
        fields: [
          { name: 'subject', label: 'Subject', type: 'text', required: true },
          { name: 'audience', label: 'Target Audience', type: 'text', required: true },
          { name: 'goal', label: 'Campaign Goal', type: 'text', required: true },
          { name: 'keyPoints', label: 'Key Points (comma-separated)', type: 'text', required: false }
        ]
      }
    ]
  },
  nft: {
    icon: PhotoIcon,
    color: 'green',
    actions: [
      {
        id: 'generate_nft_description',
        name: 'NFT Description',
        description: 'Generate compelling NFT description',
        fields: [
          { name: 'name', label: 'NFT Name', type: 'text', required: true },
          { name: 'category', label: 'Category', type: 'text', required: true },
          { name: 'creator', label: 'Creator', type: 'text', required: true },
          { name: 'story', label: 'Background Story', type: 'textarea', required: false },
          { name: 'rarity', label: 'Rarity', type: 'text', required: false }
        ]
      },
      {
        id: 'generate_collection_description',
        name: 'Collection Description',
        description: 'Generate collection overview',
        fields: [
          { name: 'name', label: 'Collection Name', type: 'text', required: true },
          { name: 'theme', label: 'Theme', type: 'text', required: true },
          { name: 'totalItems', label: 'Total Items', type: 'number', required: true },
          { name: 'creator', label: 'Creator', type: 'text', required: true },
          { name: 'utilities', label: 'Utilities (comma-separated)', type: 'text', required: false }
        ]
      },
      {
        id: 'generate_nft_marketing',
        name: 'NFT Marketing Copy',
        description: 'Generate marketing copy for NFT',
        fields: [
          { name: 'name', label: 'NFT Name', type: 'text', required: true },
          { name: 'category', label: 'Category', type: 'text', required: true },
          { name: 'price', label: 'Price', type: 'text', required: false },
          { name: 'purpose', label: 'Purpose', type: 'select', options: ['listing', 'social', 'email', 'auction'], required: false }
        ]
      }
    ]
  },
  support: {
    icon: ChatBubbleLeftRightIcon,
    color: 'yellow',
    actions: [
      {
        id: 'generate_support_response',
        name: 'Support Response',
        description: 'Generate helpful support response',
        fields: [
          { name: 'category', label: 'Category', type: 'text', required: true },
          { name: 'question', label: 'User Question', type: 'textarea', required: true },
          { name: 'urgency', label: 'Urgency', type: 'select', options: ['low', 'normal', 'high'], required: false }
        ]
      },
      {
        id: 'generate_onboarding_email',
        name: 'Onboarding Email',
        description: 'Create onboarding email',
        fields: [
          { name: 'name', label: 'User Name', type: 'text', required: true },
          { name: 'accountType', label: 'Account Type', type: 'select', options: ['basic', 'pro', 'enterprise'], required: true },
          { name: 'step', label: 'Onboarding Step', type: 'select', options: ['welcome', 'first_mint', 'explore_features', 'upgrade_prompt'], required: true },
          { name: 'signupDate', label: 'Signup Date', type: 'date', required: false }
        ]
      },
      {
        id: 'generate_faq_answer',
        name: 'FAQ Answer',
        description: 'Generate FAQ answer',
        fields: [
          { name: 'question', label: 'FAQ Question', type: 'textarea', required: true },
          { name: 'category', label: 'Category', type: 'text', required: false }
        ]
      }
    ]
  },
  executive: {
    icon: ChartBarIcon,
    color: 'red',
    actions: [
      {
        id: 'generate_daily_briefing',
        name: 'Daily Briefing',
        description: 'Generate executive briefing',
        fields: [
          { name: 'metrics.nftsMinted', label: 'NFTs Minted Yesterday', type: 'number', required: false },
          { name: 'metrics.revenue', label: 'Revenue ($)', type: 'number', required: false },
          { name: 'metrics.activeAuctions', label: 'Active Auctions', type: 'number', required: false },
          { name: 'metrics.newSignups', label: 'New Signups', type: 'number', required: false },
          { name: 'metrics.enterpriseLeads', label: 'Enterprise Leads', type: 'number', required: false }
        ]
      },
      {
        id: 'analyze_competitor',
        name: 'Competitor Analysis',
        description: 'Analyze competitor',
        fields: [
          { name: 'name', label: 'Competitor Name', type: 'text', required: true },
          { name: 'features', label: 'Features (comma-separated)', type: 'textarea', required: true },
          { name: 'pricing', label: 'Pricing', type: 'text', required: true },
          { name: 'strengths', label: 'Strengths (comma-separated)', type: 'text', required: false },
          { name: 'weaknesses', label: 'Weaknesses (comma-separated)', type: 'text', required: false }
        ]
      }
    ]
  },
  utility: {
    icon: LightBulbIcon,
    color: 'gray',
    actions: [
      {
        id: 'summarize_text',
        name: 'Summarize Text',
        description: 'Summarize long text',
        fields: [
          { name: 'text', label: 'Text to Summarize', type: 'textarea', required: true },
          { name: 'maxWords', label: 'Max Words', type: 'number', required: false },
          { name: 'style', label: 'Style', type: 'select', options: ['concise', 'detailed'], required: false }
        ]
      },
      {
        id: 'improve_writing',
        name: 'Improve Writing',
        description: 'Improve and polish text',
        fields: [
          { name: 'text', label: 'Text to Improve', type: 'textarea', required: true },
          { name: 'style', label: 'Tone', type: 'select', options: ['professional', 'casual', 'technical'], required: false },
          { name: 'purpose', label: 'Purpose', type: 'select', options: ['general', 'marketing', 'technical'], required: false }
        ]
      }
    ]
  }
};

export default function AIAssistantPage() {
  const [selectedCategory, setSelectedCategory] = useState('marketing');
  const [selectedAction, setSelectedAction] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleActionSelect = (action: any) => {
    setSelectedAction(action);
    setFormData({});
    setResult('');
    setError('');
  };

  const handleInputChange = (fieldName: string, value: any) => {
    const keys = fieldName.split('.');
    if (keys.length > 1) {
      setFormData((prev: any) => {
        const newData = { ...prev };
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) current[keys[i]] = {};
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        return newData;
      });
    } else {
      setFormData((prev: any) => ({ ...prev, [fieldName]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');

    try {
      // Process form data (convert comma-separated strings to arrays)
      const processedData: any = {};
      Object.keys(formData).forEach(key => {
        const value = formData[key];
        if (typeof value === 'string' && (key.includes('Points') || key.includes('keywords') || key.includes('utilities') || key.includes('features') || key.includes('strengths') || key.includes('weaknesses'))) {
          processedData[key] = value.split(',').map((v: string) => v.trim()).filter(Boolean);
        } else {
          processedData[key] = value;
        }
      });

      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: selectedAction.id,
          data: processedData
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }

      setResult(data.result);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error('AI Assistant Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CategoryIcon = AI_ACTIONS[selectedCategory as keyof typeof AI_ACTIONS].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <SparklesIcon className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Executive Assistant
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            AI-powered content generation for AuthiChain • Powered by Claude Sonnet 4
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Category Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Categories</h2>
              <div className="space-y-2">
                {Object.entries(AI_ACTIONS).map(([key, category]) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedCategory(key);
                        setSelectedAction(null);
                        setResult('');
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        selectedCategory === key
                          ? 'bg-purple-100 text-purple-700 shadow-md'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium capitalize">{key}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <div className="grid gap-6">
              {/* Action Selection */}
              {!selectedAction && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CategoryIcon className="w-6 h-6 text-purple-600" />
                    <h2 className="text-2xl font-bold capitalize">{selectedCategory} Tools</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {AI_ACTIONS[selectedCategory as keyof typeof AI_ACTIONS].actions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleActionSelect(action)}
                        className="p-5 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:shadow-lg transition-all text-left group"
                      >
                        <h3 className="font-bold text-lg text-gray-800 group-hover:text-purple-600 mb-1">
                          {action.name}
                        </h3>
                        <p className="text-gray-600 text-sm">{action.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Form */}
              {selectedAction && (
                <>
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">{selectedAction.name}</h2>
                      <button
                        onClick={() => setSelectedAction(null)}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                      >
                        ← Back to {selectedCategory}
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {selectedAction.fields.map((field: any) => (
                        <div key={field.name}>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          {field.type === 'textarea' ? (
                            <textarea
                              value={formData[field.name] || ''}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              required={field.required}
                              rows={4}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                            />
                          ) : field.type === 'select' ? (
                            <select
                              value={formData[field.name] || ''}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              required={field.required}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                              <option value="">Select {field.label.toLowerCase()}</option>
                              {field.options?.map((option: string) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={field.type}
                              value={formData[field.name] || ''}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              required={field.required}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                            />
                          )}
                        </div>
                      ))}

                      {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-red-700 text-sm font-medium">{error}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Generating with AI...</span>
                          </>
                        ) : (
                          <>
                            <SparklesIcon className="w-5 h-5" />
                            <span>Generate Content</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  {/* Result Display */}
                  {result && (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                          <ClipboardDocumentCheckIcon className="w-6 h-6 text-green-600" />
                          Generated Content
                        </h3>
                        <button
                          onClick={copyToClipboard}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition flex items-center gap-2"
                        >
                          {copied ? '✓ Copied!' : '📋 Copy'}
                        </button>
                      </div>
                      <div className="prose max-w-none bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                          {result}
                        </pre>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
