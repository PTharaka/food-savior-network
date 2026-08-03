
import { toast } from "sonner";
import LoggerService from "./LoggerService";

const logger = LoggerService.getInstance();

interface WasteItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  reason: string;
  date: string;
}

interface PredictionResult {
  itemId: string;
  itemName: string;
  currentStock: number;
  predictedWaste: number;
  wasteConfidence: number;
  suggestedAction: 'reduce_ordering' | 'donate_soon' | 'normal' | 'stock_up';
  potentialSavings: number;
}

interface AnalyticsConfig {
  removeArtificialDelays?: boolean;
}

class PredictiveAnalyticsService {
  private static instance: PredictiveAnalyticsService;
  private config: AnalyticsConfig;

  private constructor(config: AnalyticsConfig = {}) {
    this.config = {
      removeArtificialDelays: false,
      ...config
    };
  }

  public static getInstance(config?: AnalyticsConfig): PredictiveAnalyticsService {
    if (!PredictiveAnalyticsService.instance) {
      PredictiveAnalyticsService.instance = new PredictiveAnalyticsService(config);
    }
    return PredictiveAnalyticsService.instance;
  }

  /**
   * Configure the service (e.g., remove delays in production)
   */
  public configure(config: AnalyticsConfig): void {
    this.config = { ...this.config, ...config };
    logger.info('PredictiveAnalyticsService configured', { config: this.config });
  }

  analyzeWastePatterns(wasteHistory: WasteItem[]): Promise<{ patterns: any[], totalWaste: number }> {
    return new Promise((resolve) => {
      const delay = this.config.removeArtificialDelays ? 0 : 1500;
      
      setTimeout(() => {
        // Group waste by item name with pre-computed map for better performance
        const wasteByItem = new Map<string, { 
          totalQuantity: number; 
          occurrences: number; 
          reasons: Map<string, number> 
        }>();

        for (const item of wasteHistory) {
          let itemData = wasteByItem.get(item.name);
          if (!itemData) {
            itemData = { totalQuantity: 0, occurrences: 0, reasons: new Map() };
            wasteByItem.set(item.name, itemData);
          }
          itemData.totalQuantity += item.quantity;
          itemData.occurrences += 1;
          
          const currentCount = itemData.reasons.get(item.reason) || 0;
          itemData.reasons.set(item.reason, currentCount + 1);
        }

        // Calculate total waste
        const totalWaste = wasteHistory.reduce((sum, item) => sum + item.quantity, 0);

        // Convert to array for display
        const patterns = Array.from(wasteByItem.entries()).map(([itemName, data]) => {
          const commonReason = Array.from(data.reasons.entries())
            .sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';
          
          return {
            itemName,
            averageQuantity: data.totalQuantity / data.occurrences,
            frequency: data.occurrences,
            commonReason,
            totalQuantity: data.totalQuantity
          };
        });

        logger.info('Analyzed waste patterns', { patternCount: patterns.length, totalWaste });
        resolve({ patterns, totalWaste });
      }, delay);
    });
  }

  predictFutureWaste(inventory: any[], wasteHistory: WasteItem[]): Promise<PredictionResult[]> {
    return new Promise((resolve) => {
      const delay = this.config.removeArtificialDelays ? 0 : 2000;
      
      setTimeout(() => {
        // Pre-compute waste history map for O(1) lookups instead of filtering repeatedly
        const wasteHistoryMap = new Map<string, WasteItem[]>();
        for (const waste of wasteHistory) {
          const key = waste.name.toLowerCase();
          const existing = wasteHistoryMap.get(key) || [];
          existing.push(waste);
          wasteHistoryMap.set(key, existing);
        }

        const predictions = inventory.map(item => {
          const itemKey = item.name.toLowerCase();
          const itemWasteHistory = wasteHistoryMap.get(itemKey) || [];
          
          // Calculate waste rate based on history
          const wasteRate = itemWasteHistory.length > 0 
            ? itemWasteHistory.reduce((sum, w) => sum + w.quantity, 0) / itemWasteHistory.length / item.quantity
            : Math.random() * 0.3;
          
          // Generate prediction
          const predictedWaste = Math.round(item.quantity * wasteRate * 10) / 10;
          const wasteConfidence = 0.5 + Math.random() * 0.4;
          
          // Determine suggested action
          let suggestedAction: 'reduce_ordering' | 'donate_soon' | 'normal' | 'stock_up' = 'normal';
          if (wasteRate > 0.4) suggestedAction = 'reduce_ordering';
          else if (wasteRate > 0.2) suggestedAction = 'donate_soon';
          else if (wasteRate < 0.05) suggestedAction = 'stock_up';
          
          // Calculate potential savings
          const averageItemCost = 5 + Math.random() * 15;
          const potentialSavings = Math.round(predictedWaste * averageItemCost * 100) / 100;
          
          return {
            itemId: item.id,
            itemName: item.name,
            currentStock: item.quantity,
            predictedWaste,
            wasteConfidence,
            suggestedAction,
            potentialSavings
          };
        });
        
        logger.info('Generated waste predictions', { predictionCount: predictions.length });
        toast.success('Waste predictions updated');
        resolve(predictions);
      }, delay);
    });
  }

  identifySurplusItems(predictions: PredictionResult[]): Promise<PredictionResult[]> {
    return new Promise((resolve) => {
      const delay = this.config.removeArtificialDelays ? 0 : 1000;
      
      setTimeout(() => {
        const surplusItems = predictions.filter(p => 
          p.suggestedAction === 'donate_soon' && p.predictedWaste > 1
        );
        
        logger.info('Identified surplus items for donation', { count: surplusItems.length });
        resolve(surplusItems);
      }, delay);
    });
  }
}

export default PredictiveAnalyticsService;
