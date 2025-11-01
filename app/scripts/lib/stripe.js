"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRIPE_PRICE_IDS = exports.stripe = void 0;
var stripe_1 = require("stripe");
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set');
}
exports.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-08-27.basil',
});
exports.STRIPE_PRICE_IDS = {
    PRO: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_monthly_29',
    BRAND: process.env.STRIPE_BRAND_PRICE_ID || 'price_brand_monthly_99',
};
