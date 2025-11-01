
import crypto from 'crypto';

export interface NOWPaymentsConfig {
  apiKey: string;
  ipnSecret: string;
  sandbox?: boolean;
}

export interface CreatePaymentParams {
  price_amount: number;
  price_currency: string;
  pay_currency: string;
  order_id?: string;
  order_description?: string;
  ipn_callback_url?: string;
  success_url?: string;
  cancel_url?: string;
  customer_email?: string;
  payout_currency?: string;
  payout_extra_id?: string;
}

export interface PaymentResponse {
  payment_id: string;
  payment_status: string;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  pay_currency: string;
  order_id?: string;
  order_description?: string;
  purchase_id?: string;
  outcome_amount?: number;
  outcome_currency?: string;
  payin_extra_id?: string;
  smart_contract?: string;
  network?: string;
  network_precision?: string;
  time_limit?: string;
  burning_percent?: string;
  expiration_estimate_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PaymentStatusResponse {
  payment_id: string;
  payment_status: string;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  actually_paid: number;
  pay_currency: string;
  order_id?: string;
  order_description?: string;
  purchase_id?: string;
  created_at?: string;
  updated_at?: string;
  outcome_amount?: number;
  outcome_currency?: string;
  payin_hash?: string;
}

export interface EstimatedPriceResponse {
  currency_from: string;
  amount_from: number;
  currency_to: string;
  estimated_amount: number;
}

export interface AvailableCurrency {
  code: string;
  name: string;
  logo_url?: string;
  is_popular?: boolean;
  is_stable?: boolean;
  network?: string;
}

export interface IPNCallbackData {
  payment_id: string;
  payment_status: string;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  actually_paid: number;
  pay_currency: string;
  order_id?: string;
  order_description?: string;
  purchase_id?: string;
  outcome_amount?: number;
  outcome_currency?: string;
  payin_hash?: string;
  payin_extra_id?: string;
}

export class NOWPaymentsAPI {
  private apiKey: string;
  private ipnSecret: string;
  private baseURL: string;

  constructor(config: NOWPaymentsConfig) {
    this.apiKey = config.apiKey;
    this.ipnSecret = config.ipnSecret;
    this.baseURL = config.sandbox 
      ? 'https://api-sandbox.nowpayments.io/v1'
      : 'https://api.nowpayments.io/v1';
  }

  private async request<T>(
    endpoint: string,
    method: string = 'GET',
    data?: any
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json',
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`NOWPayments API Error: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('NOWPayments API request failed:', error);
      throw error;
    }
  }

  /**
   * Get API status
   */
  async getStatus(): Promise<{ message: string }> {
    return this.request<{ message: string }>('/status');
  }

  /**
   * Get list of available currencies
   */
  async getAvailableCurrencies(): Promise<{ currencies: string[] }> {
    return this.request<{ currencies: string[] }>('/currencies');
  }

  /**
   * Get estimated price for conversion
   */
  async getEstimatedPrice(params: {
    amount: number;
    currency_from: string;
    currency_to: string;
  }): Promise<EstimatedPriceResponse> {
    const query = new URLSearchParams({
      amount: params.amount.toString(),
      currency_from: params.currency_from,
      currency_to: params.currency_to,
    });
    return this.request<EstimatedPriceResponse>(`/estimate?${query}`);
  }

  /**
   * Get minimum payment amount for a currency
   */
  async getMinimumAmount(currency: string): Promise<{ min_amount: number }> {
    return this.request<{ min_amount: number }>(`/min-amount?currency_from=usd&currency_to=${currency}`);
  }

  /**
   * Create a payment
   */
  async createPayment(params: CreatePaymentParams): Promise<PaymentResponse> {
    return this.request<PaymentResponse>('/payment', 'POST', params);
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(paymentId: string): Promise<PaymentStatusResponse> {
    return this.request<PaymentStatusResponse>(`/payment/${paymentId}`);
  }

  /**
   * Get list of payments
   */
  async listPayments(params?: {
    limit?: number;
    page?: number;
    sortBy?: string;
    orderBy?: 'asc' | 'desc';
    dateFrom?: string;
    dateTo?: string;
  }): Promise<{ data: PaymentStatusResponse[] }> {
    const query = params ? `?${new URLSearchParams(params as any)}` : '';
    return this.request<{ data: PaymentStatusResponse[] }>(`/payment${query}`);
  }

  /**
   * Verify IPN callback signature
   */
  verifyIPNSignature(requestBody: string, receivedSignature: string): boolean {
    const hmac = crypto.createHmac('sha512', this.ipnSecret);
    hmac.update(requestBody);
    const calculatedSignature = hmac.digest('hex');
    return calculatedSignature === receivedSignature;
  }

  /**
   * Parse and verify IPN callback
   */
  parseIPNCallback(requestBody: string, signature: string): IPNCallbackData | null {
    if (!this.verifyIPNSignature(requestBody, signature)) {
      console.error('IPN signature verification failed');
      return null;
    }

    try {
      return JSON.parse(requestBody) as IPNCallbackData;
    } catch (error) {
      console.error('Failed to parse IPN callback data:', error);
      return null;
    }
  }

  /**
   * Get popular cryptocurrencies for quick selection
   */
  getPopularCryptos(): AvailableCurrency[] {
    return [
      { code: 'btc', name: 'Bitcoin', is_popular: true, is_stable: false },
      { code: 'eth', name: 'Ethereum', is_popular: true, is_stable: false },
      { code: 'usdc', name: 'USD Coin', is_popular: true, is_stable: true, network: 'Ethereum' },
      { code: 'usdt', name: 'Tether', is_popular: true, is_stable: true, network: 'Ethereum' },
      { code: 'bnb', name: 'BNB', is_popular: true, is_stable: false },
      { code: 'sol', name: 'Solana', is_popular: true, is_stable: false },
      { code: 'matic', name: 'Polygon', is_popular: true, is_stable: false },
      { code: 'doge', name: 'Dogecoin', is_popular: true, is_stable: false },
      { code: 'ltc', name: 'Litecoin', is_popular: true, is_stable: false },
      { code: 'trx', name: 'TRON', is_popular: true, is_stable: false },
    ];
  }
}

// Export a singleton instance
let nowPaymentsInstance: NOWPaymentsAPI | null = null;

export function getNOWPaymentsInstance(): NOWPaymentsAPI {
  if (!nowPaymentsInstance) {
    const apiKey = process.env.NOWPAYMENTS_API_KEY;
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;
    const sandbox = process.env.NOWPAYMENTS_SANDBOX === 'true';

    if (!apiKey || !ipnSecret) {
      throw new Error('NOWPayments API credentials not configured');
    }

    nowPaymentsInstance = new NOWPaymentsAPI({
      apiKey,
      ipnSecret,
      sandbox,
    });
  }

  return nowPaymentsInstance;
}

