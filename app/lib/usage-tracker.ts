
import { db } from './prisma';
import { UsageType, SubscriptionTier } from './types';
import { canUploadNft } from './subscription-plans';

export class UsageTracker {
  static async trackUsage(userId: string, action: UsageType): Promise<void> {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    await db.usageRecord.upsert({
      where: {
        userId_action_month_year: {
          userId,
          action,
          month,
          year
        }
      },
      update: {
        count: {
          increment: 1
        }
      },
      create: {
        userId,
        action,
        month,
        year,
        count: 1
      }
    });
  }

  static async getCurrentMonthUsage(
    userId: string, 
    action: UsageType
  ): Promise<number> {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const record = await db.usageRecord.findUnique({
      where: {
        userId_action_month_year: {
          userId,
          action,
          month,
          year
        }
      }
    });

    return record?.count ?? 0;
  }

  static async canPerformAction(
    userId: string,
    action: UsageType,
    userTier: SubscriptionTier
  ): Promise<boolean> {
    if (action === UsageType.NFT_UPLOAD) {
      const currentUsage = await this.getCurrentMonthUsage(userId, action);
      return canUploadNft(currentUsage, userTier);
    }

    // For other actions, implement specific logic as needed
    return true;
  }

  static async getUsageStats(userId: string, month?: number, year?: number) {
    const now = new Date();
    const targetMonth = month ?? now.getMonth() + 1;
    const targetYear = year ?? now.getFullYear();

    const records = await db.usageRecord.findMany({
      where: {
        userId,
        month: targetMonth,
        year: targetYear
      }
    });

    return records.reduce((acc: Record<string, number>, record: any) => {
      acc[record.action] = record.count;
      return acc;
    }, {} as Record<UsageType, number>);
  }
}
