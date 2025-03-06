
import { toast } from "sonner";

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

class PredictiveAnalyticsService {
  private static instance: PredictiveAnalyticsService;

  private constructor() {}

  public static getInstance(): PredictiveAnalyticsService {
    if (!PredictiveAnalyticsService.instance) {
      PredictiveAnalyticsService.instance = new PredictiveAnalyticsService();
    }
    return PredictiveAnalyticsService.instance;
  }

  analyzeWastePatterns(wasteHistory: WasteItem[]): Promise<{ patterns: any[], totalWaste: number }> {
    // Mock implementation - in a real app this would use ML algorithms
    return new Promise((resolve) => {
      setTimeout(() => {
        // Group waste by item name
        const wasteByItem = wasteHistory.reduce((acc: any, item) => {
          if (!acc[item.name]) {
            acc[item.name] = { 
              totalQuantity: 0, 
              occurrences: 0, 
              reasons: {} 
            };
          }
          acc[item.name].totalQuantity += item.quantity;
          acc[item.name].occurrences += 1;
          
          if (!acc[item.name].reasons[item.reason]) {
            acc[item.name].reasons[item.reason] = 0;
          }
          acc[item.name].reasons[item.reason] += 1;
          
          return acc;
        }, {});

        // Calculate total waste
        const totalWaste = wasteHistory.reduce((sum, item) => sum + item.quantity, 0);

        // Convert to array for display
        const patterns = Object.entries(wasteByItem).map(([itemName, data]: [string, any]) => ({
          itemName,
          averageQuantity: data.totalQuantity / data.occurrences,
          frequency: data.occurrences,
          commonReason: Object.entries(data.reasons).sort((a: any, b: any) => b[1] - a[1])[0][0],
          totalQuantity: data.totalQuantity
        }));

        console.log('Analyzed waste patterns', patterns);
        resolve({ patterns, totalWaste });
      }, 1500);
    });
  }

  predictFutureWaste(inventory: any[], wasteHistory: WasteItem[]): Promise<PredictionResult[]> {
    // Mock implementation - would use real ML models in production
    return new Promise((resolve) => {
      setTimeout(() => {
        const predictions = inventory.map(item => {
          // Find waste history for this item
          const itemWasteHistory = wasteHistory.filter(w => w.name.toLowerCase() === item.name.toLowerCase());
          
          // Calculate waste rate based on history
          const wasteRate = itemWasteHistory.length > 0 
            ? itemWasteHistory.reduce((sum, w) => sum + w.quantity, 0) / itemWasteHistory.length / item.quantity
            : Math.random() * 0.3; // Random waste rate if no history
          
          // Generate prediction
          const predictedWaste = Math.round(item.quantity * wasteRate * 10) / 10;
          const wasteConfidence = 0.5 + Math.random() * 0.4; // Random confidence between 50% and 90%
          
          // Determine suggested action
          let suggestedAction: 'reduce_ordering' | 'donate_soon' | 'normal' | 'stock_up' = 'normal';
          if (wasteRate > 0.4) suggestedAction = 'reduce_ordering';
          else if (wasteRate > 0.2) suggestedAction = 'donate_soon';
          else if (wasteRate < 0.05) suggestedAction = 'stock_up';
          
          // Calculate potential savings
          const averageItemCost = 5 + Math.random() * 15; // Random cost between $5 and $20
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
        
        console.log('Generated waste predictions', predictions);
        toast.success('Waste predictions updated');
        resolve(predictions);
      }, 2000);
    });
  }

  identifySurplusItems(predictions: PredictionResult[]): Promise<PredictionResult[]> {
    // Identify items that should be donated soon to prevent waste
    return new Promise((resolve) => {
      setTimeout(() => {
        const surplusItems = predictions.filter(p => 
          p.suggestedAction === 'donate_soon' && p.predictedWaste > 1
        );
        
        console.log('Identified surplus items for donation', surplusItems);
        resolve(surplusItems);
      }, 1000);
    });
  }
}

export default PredictiveAnalyticsService;
