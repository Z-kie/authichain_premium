-- Add NOWPayments specific tracking table
CREATE TABLE IF NOT EXISTS "CryptoPayment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "transactionId" TEXT NOT NULL UNIQUE,
    "userId" TEXT NOT NULL,
    "nowpaymentsId" TEXT UNIQUE,
    "paymentId" TEXT,
    "orderId" TEXT,
    "orderDescription" TEXT,
    "priceAmount" DECIMAL(20,8) NOT NULL,
    "priceCurrency" TEXT NOT NULL DEFAULT 'USD',
    "payAmount" DECIMAL(20,8),
    "payCurrency" TEXT NOT NULL,
    "payAddress" TEXT,
    "actuallyPaid" DECIMAL(20,8),
    "actuallyPaidCurrency" TEXT,
    "purchaseId" TEXT,
    "amountReceived" DECIMAL(20,8),
    "payinHash" TEXT,
    "payinExtraId" TEXT,
    "smartContract" TEXT,
    "network" TEXT,
    "networkPrecision" TEXT,
    "timeLimit" TEXT,
    "burningPercent" TEXT,
    "expirationEstimateDate" TIMESTAMP,
    "paymentStatus" TEXT NOT NULL DEFAULT 'waiting',
    "ipnCallbackUrl" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmedAt" TIMESTAMP,
    "completedAt" TIMESTAMP,
    "failedAt" TIMESTAMP,
    "metadata" JSONB,
    
    CONSTRAINT "CryptoPayment_transactionId_fkey" 
        FOREIGN KEY ("transactionId") 
        REFERENCES "Transaction"("id") 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

CREATE INDEX "CryptoPayment_userId_idx" ON "CryptoPayment"("userId");
CREATE INDEX "CryptoPayment_nowpaymentsId_idx" ON "CryptoPayment"("nowpaymentsId");
CREATE INDEX "CryptoPayment_paymentStatus_idx" ON "CryptoPayment"("paymentStatus");
CREATE INDEX "CryptoPayment_createdAt_idx" ON "CryptoPayment"("createdAt");
CREATE INDEX "CryptoPayment_payAddress_idx" ON "CryptoPayment"("payAddress");

COMMENT ON TABLE "CryptoPayment" IS 'NOWPayments cryptocurrency payment tracking';
