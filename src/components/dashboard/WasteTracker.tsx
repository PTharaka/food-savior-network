
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Barcode, FileSpreadsheet, AlertTriangle } from 'lucide-react';
import { toast } from "sonner";
import POSIntegrationService from '@/services/POSIntegrationService';
import PredictiveAnalyticsService from '@/services/PredictiveAnalyticsService';
import DonationAlertService from '@/services/DonationAlertService';

type WasteItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  reason: string;
  date: string;
};

const WasteTracker: React.FC = () => {
  const [items, setItems] = useState<WasteItem[]>([
    { id: '1', name: 'Lettuce', quantity: 2.5, unit: 'kg', reason: 'Spoiled', date: '2023-11-01' },
    { id: '2', name: 'Bread', quantity: 4, unit: 'loaves', reason: 'Expired', date: '2023-11-02' },
    { id: '3', name: 'Tomatoes', quantity: 1.5, unit: 'kg', reason: 'Damaged', date: '2023-11-03' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState<Partial<WasteItem>>({
    name: '',
    quantity: 0,
    unit: '',
    reason: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [showPOSModal, setShowPOSModal] = useState(false);
  const [posConnected, setPosConnected] = useState(false);
  const [atRiskItems, setAtRiskItems] = useState<any[]>([]);
  
  const posService = POSIntegrationService.getInstance();
  const predictionService = PredictiveAnalyticsService.getInstance();
  const donationService = DonationAlertService.getInstance();

  useEffect(() => {
    // Check if POS is connected
    const checkConnection = async () => {
      const connected = await posService.isConnectedToPOS();
      setPosConnected(connected);
    };
    checkConnection();
    
    // Generate predictions for demo purposes
    runPredictions();
  }, []);

  const runPredictions = async () => {
    try {
      // Mock inventory data for demonstration
      const mockInventory = [
        { id: 'prod_1', name: 'Organic Lettuce', quantity: 15, expiryDate: '2023-11-10', category: 'Produce' },
        { id: 'prod_2', name: 'Artisan Bread', quantity: 8, expiryDate: '2023-11-08', category: 'Bakery' },
        { id: 'prod_3', name: 'Fresh Milk', quantity: 12, expiryDate: '2023-11-12', category: 'Dairy' },
      ];
      
      const predictions = await predictionService.predictFutureWaste(mockInventory, items);
      const surplusItems = await predictionService.identifySurplusItems(predictions);
      
      setAtRiskItems(surplusItems);
      
      // Create donation alerts for items at risk
      if (surplusItems.length > 0) {
        surplusItems.forEach(item => {
          donationService.createDonationAlert(
            item.itemName, 
            Math.ceil(item.predictedWaste), 
            mockInventory.find(i => i.name === item.itemName)?.expiryDate || '2023-11-10'
          );
        });
      }
    } catch (error) {
      console.error('Error generating predictions:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [id]: id === 'quantity' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSaveItem = async () => {
    if (!newItem.name || !newItem.unit || !newItem.reason) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // Create a new waste item
      const newWasteItem: WasteItem = {
        id: `waste_${Date.now()}`,
        name: newItem.name || '',
        quantity: newItem.quantity || 0,
        unit: newItem.unit || '',
        reason: newItem.reason || '',
        date: newItem.date || new Date().toISOString().split('T')[0]
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Update local state
      setItems(prev => [newWasteItem, ...prev]);
      setNewItem({
        name: '',
        quantity: 0,
        unit: '',
        reason: '',
        date: new Date().toISOString().split('T')[0]
      });
      setShowForm(false);
      toast.success('Waste item added successfully');
      
      // Run predictions to update at-risk items
      runPredictions();
    } catch (error) {
      console.error('Error saving waste item:', error);
      toast.error('Failed to save waste item');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state
      setItems(prev => prev.filter(item => item.id !== id));
      toast.success('Item deleted successfully');
      
      // Run predictions to update at-risk items
      runPredictions();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  const handleScanBarcode = () => {
    // Mock implementation of barcode scanning
    toast.info('Barcode scanner activated. Scan a product to log waste.');
    setTimeout(() => {
      setNewItem({
        name: 'Organic Apples',
        quantity: 1.5,
        unit: 'kg',
        reason: '',
        date: new Date().toISOString().split('T')[0]
      });
      setShowForm(true);
      toast.success('Product scanned successfully');
    }, 2000);
  };

  const handleImportData = async () => {
    if (!posConnected) {
      toast.error('Please connect to your POS system first');
      setShowPOSModal(true);
      return;
    }
    
    setLoading(true);
    try {
      // Get first active connection
      const connections = await posService.getConnections();
      const activeConnection = connections.find(conn => conn.status === 'active');
      
      if (!activeConnection) {
        toast.error('No active POS connection found');
        return;
      }
      
      // Import data from POS
      await posService.syncInventory(activeConnection.id);
      toast.success('Data imported successfully from POS');
    } catch (error) {
      console.error('Error importing data:', error);
      toast.error('Failed to import data');
    } finally {
      setLoading(false);
    }
  };

  const handleConnectPOS = async () => {
    setLoading(true);
    try {
      await posService.connectToPOS({
        provider: 'square',
        apiKey: 'demo-api-key',
        storeId: 'demo-store',
        syncFrequency: 'daily'
      });
      setPosConnected(true);
      setShowPOSModal(false);
    } catch (error) {
      console.error('Error connecting to POS:', error);
      toast.error('Failed to connect to POS system');
    } finally {
      setLoading(false);
    }
  };

  const createDonationAlert = async (itemName: string, quantity: number) => {
    try {
      await donationService.createDonationAlert(
        itemName,
        quantity,
        new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 3 days from now
      );
      toast.success(`Donation alert created for ${itemName}`);
    } catch (error) {
      console.error('Error creating donation alert:', error);
      toast.error('Failed to create donation alert');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-wastewise-dark-gray">Waste Tracker</h2>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleScanBarcode}
          >
            <Barcode size={16} /> Scan Barcode
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleImportData}
            disabled={loading || !posConnected}
          >
            <FileSpreadsheet size={16} /> Import Data
          </Button>
          <Button 
            className="bg-wastewise-green text-white hover:bg-wastewise-dark-green flex items-center gap-2"
            onClick={() => setShowForm(!showForm)}
            disabled={loading}
          >
            <Plus size={16} /> {showForm ? 'Cancel' : 'Add Waste Item'}
          </Button>
        </div>
      </div>

      {atRiskItems.length > 0 && (
        <Card className="border-amber-300 bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <AlertTriangle size={18} /> Items at Risk of Waste
            </CardTitle>
            <CardDescription>
              Our AI has identified these items as having a high probability of becoming waste soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {atRiskItems.map((item) => (
                <div key={item.itemId} className="flex justify-between items-center p-3 bg-white rounded-lg border border-amber-200">
                  <div>
                    <h4 className="font-medium">{item.itemName}</h4>
                    <p className="text-sm text-wastewise-gray">
                      Currently: {item.currentStock} in stock • Predicted waste: {item.predictedWaste} ({Math.round(item.wasteConfidence * 100)}% confidence)
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="text-wastewise-green border-wastewise-green"
                    size="sm"
                    onClick={() => createDonationAlert(item.itemName, Math.ceil(item.predictedWaste))}
                  >
                    Create Donation Alert
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Waste Item</CardTitle>
            <CardDescription>Log a new waste item to track</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Item Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g., Lettuce" 
                  value={newItem.name} 
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    placeholder="0" 
                    value={newItem.quantity || ''} 
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input 
                    id="unit" 
                    placeholder="kg, pounds, etc." 
                    value={newItem.unit} 
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Input 
                  id="reason" 
                  placeholder="Why was this item wasted?" 
                  value={newItem.reason} 
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  type="date" 
                  value={newItem.date} 
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button 
                  className="bg-wastewise-green text-white hover:bg-wastewise-dark-green"
                  onClick={handleSaveItem}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Item'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-wastewise-light-gray">
            <thead className="bg-wastewise-beige">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-wastewise-dark-gray uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-wastewise-dark-gray uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-wastewise-dark-gray uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-wastewise-dark-gray uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-wastewise-dark-gray uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-wastewise-light-gray">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-wastewise-light-gray/10">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-wastewise-dark-gray">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-wastewise-gray">{item.quantity} {item.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-wastewise-gray">{item.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-wastewise-gray">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <button 
                      className="text-wastewise-green hover:text-wastewise-dark-green mr-4"
                      onClick={() => {
                        setNewItem({
                          ...item,
                          id: undefined
                        });
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gamification Element */}
      <Card className="bg-wastewise-green/5 border-wastewise-green">
        <CardHeader>
          <CardTitle className="text-wastewise-dark-green">Sustainability Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-wastewise-green">${(items.length * 12.5).toFixed(2)}</div>
              <div className="text-sm text-wastewise-gray">Cost Savings</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-wastewise-green">{(items.reduce((sum, item) => sum + item.quantity, 0) * 0.5).toFixed(1)} kg</div>
              <div className="text-sm text-wastewise-gray">CO₂ Emissions Prevented</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-wastewise-green">Eco-Warrior</div>
              <div className="text-sm text-wastewise-gray">Your Sustainability Badge</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* POS Connection Modal would go here - simplified for this implementation */}
    </div>
  );
};

export default WasteTracker;
