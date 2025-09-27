import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  Truck, 
  Factory, 
  Zap, 
  Package,
  TrendingUp,
  AlertTriangle,
  Target,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CarbonCalculatorProps {
  onCalculate: (results: {
    totalEmissions: number;
    creditsNeeded: number;
    recommendedActions: string[];
  }) => void;
}

export const CarbonCalculator = ({ onCalculate }: CarbonCalculatorProps) => {
  const { toast } = useToast();
  const [results, setResults] = useState<any>(null);
  
  // Form data for different emission sources
  const [transportData, setTransportData] = useState({
    fuelType: '',
    fuelConsumption: 0,
    vehicleCount: 0,
    employeeCommute: 0
  });

  const [manufacturingData, setManufacturingData] = useState({
    processType: '',
    energyConsumption: 0,
    rawMaterials: 0,
    wasteGenerated: 0
  });

  const [operationsData, setOperationsData] = useState({
    electricityUsage: 0,
    naturalGasUsage: 0,
    facilitySize: 0,
    employeeCount: 0
  });

  const [logisticsData, setLogisticsData] = useState({
    shippingMode: '',
    shippingDistance: 0,
    packagingType: '',
    packagingMaterials: 0
  });

  const calculateEmissions = () => {
    // Emission factors (simplified for demo)
    const emissionFactors = {
      diesel: 2.68, // kg CO2 per liter
      petrol: 2.31,
      electricity: 0.85, // kg CO2 per kWh
      naturalGas: 2.03, // kg CO2 per cubic meter
      shipping: {
        truck: 0.1, // kg CO2 per km
        ship: 0.03,
        air: 0.5
      }
    };

    let totalEmissions = 0;

    // Transport emissions
    if (transportData.fuelType && transportData.fuelConsumption) {
      const fuelEmissions = transportData.fuelConsumption * 
        (emissionFactors[transportData.fuelType as keyof typeof emissionFactors] as number || 2.5) * 
        transportData.vehicleCount * 12; // Monthly to annual
      totalEmissions += fuelEmissions;
    }

    // Employee commute
    totalEmissions += transportData.employeeCommute * 250 * 0.2; // 250 working days

    // Manufacturing emissions
    totalEmissions += manufacturingData.energyConsumption * emissionFactors.electricity * 12;
    totalEmissions += manufacturingData.rawMaterials * 0.5; // Simplified factor
    totalEmissions += manufacturingData.wasteGenerated * 0.3;

    // Operations emissions
    totalEmissions += operationsData.electricityUsage * emissionFactors.electricity * 12;
    totalEmissions += operationsData.naturalGasUsage * emissionFactors.naturalGas * 12;
    totalEmissions += operationsData.facilitySize * 0.05; // Per sq ft
    totalEmissions += operationsData.employeeCount * 4; // Per employee annual average

    // Logistics emissions
    if (logisticsData.shippingMode && logisticsData.shippingDistance) {
      const shippingEmissions = logisticsData.shippingDistance * 
        (emissionFactors.shipping[logisticsData.shippingMode as keyof typeof emissionFactors.shipping] || 0.1) * 12;
      totalEmissions += shippingEmissions;
    }
    totalEmissions += logisticsData.packagingMaterials * 0.8; // Packaging materials

    // Convert to tons
    totalEmissions = Math.round(totalEmissions / 1000);

    // Calculate credits needed (1 credit = 1 metric ton CO2)
    const creditsNeeded = totalEmissions; // 1 metric ton CO2 = 1 credit

    // Generate recommendations
    const recommendations = [];
    if (transportData.fuelConsumption > 1000) {
      recommendations.push("Consider switching to electric or hybrid vehicles for fleet");
    }
    if (operationsData.electricityUsage > 10000) {
      recommendations.push("Implement solar panels or renewable energy sources");
    }
    if (manufacturingData.wasteGenerated > 100) {
      recommendations.push("Optimize waste management and recycling processes");
    }
    if (logisticsData.shippingMode === 'air') {
      recommendations.push("Consider sea or land transportation for non-urgent shipments");
    }

    const calculationResults = {
      totalEmissions,
      creditsNeeded,
      recommendedActions: recommendations,
      breakdown: {
        transport: Math.round((transportData.fuelConsumption * 2.5 * transportData.vehicleCount * 12 + transportData.employeeCommute * 250 * 0.2) / 1000),
        manufacturing: Math.round((manufacturingData.energyConsumption * 0.85 * 12 + manufacturingData.rawMaterials * 0.5 + manufacturingData.wasteGenerated * 0.3) / 1000),
        operations: Math.round((operationsData.electricityUsage * 0.85 * 12 + operationsData.naturalGasUsage * 2.03 * 12 + operationsData.facilitySize * 0.05 + operationsData.employeeCount * 4) / 1000),
        logistics: Math.round((logisticsData.shippingDistance * 0.1 * 12 + logisticsData.packagingMaterials * 0.8) / 1000)
      }
    };

    setResults(calculationResults);
    onCalculate(calculationResults);

    toast({
      title: "Carbon Footprint Calculated",
      description: `Total emissions: ${totalEmissions} tons CO₂. Credits needed: ${creditsNeeded} (1 metric ton CO₂ = 1 credit)`,
    });
  };

  const resetCalculator = () => {
    setTransportData({ fuelType: '', fuelConsumption: 0, vehicleCount: 0, employeeCommute: 0 });
    setManufacturingData({ processType: '', energyConsumption: 0, rawMaterials: 0, wasteGenerated: 0 });
    setOperationsData({ electricityUsage: 0, naturalGasUsage: 0, facilitySize: 0, employeeCount: 0 });
    setLogisticsData({ shippingMode: '', shippingDistance: 0, packagingType: '', packagingMaterials: 0 });
    setResults(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Corporate Carbon Calculator
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Calculate your industry-level carbon emissions across all operations
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetCalculator}>
              Reset
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="transport" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="transport" className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Transport
              </TabsTrigger>
              <TabsTrigger value="manufacturing" className="flex items-center gap-2">
                <Factory className="h-4 w-4" />
                Manufacturing
              </TabsTrigger>
              <TabsTrigger value="operations" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Operations
              </TabsTrigger>
              <TabsTrigger value="logistics" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Logistics
              </TabsTrigger>
            </TabsList>

            {/* Transport Tab */}
            <TabsContent value="transport" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Select value={transportData.fuelType} onValueChange={(value) => 
                    setTransportData(prev => ({ ...prev, fuelType: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="petrol">Petrol</SelectItem>
                      <SelectItem value="cng">CNG</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fuelConsumption">Fuel Consumption (L/month)</Label>
                  <Input
                    id="fuelConsumption"
                    type="number"
                    placeholder="e.g., 5000"
                    value={transportData.fuelConsumption}
                    onChange={(e) => setTransportData(prev => ({ 
                      ...prev, 
                      fuelConsumption: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vehicleCount">Vehicle Count</Label>
                  <Input
                    id="vehicleCount"
                    type="number"
                    placeholder="e.g., 50"
                    value={transportData.vehicleCount}
                    onChange={(e) => setTransportData(prev => ({ 
                      ...prev, 
                      vehicleCount: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="employeeCommute">Employee Commute (person-km/month)</Label>
                  <Input
                    id="employeeCommute"
                    type="number"
                    placeholder="e.g., 25000"
                    value={transportData.employeeCommute}
                    onChange={(e) => setTransportData(prev => ({ 
                      ...prev, 
                      employeeCommute: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Manufacturing Tab */}
            <TabsContent value="manufacturing" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="processType">Manufacturing Process Type</Label>
                  <Select value={manufacturingData.processType} onValueChange={(value) => 
                    setManufacturingData(prev => ({ ...prev, processType: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select process type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="steel">Steel Production</SelectItem>
                      <SelectItem value="cement">Cement Manufacturing</SelectItem>
                      <SelectItem value="chemical">Chemical Processing</SelectItem>
                      <SelectItem value="textile">Textile Manufacturing</SelectItem>
                      <SelectItem value="automotive">Automotive Assembly</SelectItem>
                      <SelectItem value="food">Food Processing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="energyConsumption">Energy Consumption (kWh/month)</Label>
                  <Input
                    id="energyConsumption"
                    type="number"
                    placeholder="e.g., 100000"
                    value={manufacturingData.energyConsumption}
                    onChange={(e) => setManufacturingData(prev => ({ 
                      ...prev, 
                      energyConsumption: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rawMaterials">Raw Materials (tons/month)</Label>
                  <Input
                    id="rawMaterials"
                    type="number"
                    placeholder="e.g., 500"
                    value={manufacturingData.rawMaterials}
                    onChange={(e) => setManufacturingData(prev => ({ 
                      ...prev, 
                      rawMaterials: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="wasteGenerated">Waste Generated (tons/month)</Label>
                  <Input
                    id="wasteGenerated"
                    type="number"
                    placeholder="e.g., 50"
                    value={manufacturingData.wasteGenerated}
                    onChange={(e) => setManufacturingData(prev => ({ 
                      ...prev, 
                      wasteGenerated: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Operations Tab */}
            <TabsContent value="operations" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="electricityUsage">Electricity Usage (kWh/month)</Label>
                  <Input
                    id="electricityUsage"
                    type="number"
                    placeholder="e.g., 25000"
                    value={operationsData.electricityUsage}
                    onChange={(e) => setOperationsData(prev => ({ 
                      ...prev, 
                      electricityUsage: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="naturalGasUsage">Natural Gas Usage (m³/month)</Label>
                  <Input
                    id="naturalGasUsage"
                    type="number"
                    placeholder="e.g., 5000"
                    value={operationsData.naturalGasUsage}
                    onChange={(e) => setOperationsData(prev => ({ 
                      ...prev, 
                      naturalGasUsage: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="facilitySize">Facility Size (sq ft)</Label>
                  <Input
                    id="facilitySize"
                    type="number"
                    placeholder="e.g., 50000"
                    value={operationsData.facilitySize}
                    onChange={(e) => setOperationsData(prev => ({ 
                      ...prev, 
                      facilitySize: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="employeeCount">Employee Count</Label>
                  <Input
                    id="employeeCount"
                    type="number"
                    placeholder="e.g., 200"
                    value={operationsData.employeeCount}
                    onChange={(e) => setOperationsData(prev => ({ 
                      ...prev, 
                      employeeCount: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Logistics Tab */}
            <TabsContent value="logistics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shippingMode">Shipping Mode</Label>
                  <Select value={logisticsData.shippingMode} onValueChange={(value) => 
                    setLogisticsData(prev => ({ ...prev, shippingMode: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shipping mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="truck">Truck</SelectItem>
                      <SelectItem value="ship">Ship</SelectItem>
                      <SelectItem value="air">Air Cargo</SelectItem>
                      <SelectItem value="rail">Rail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shippingDistance">Shipping Distance (km/month)</Label>
                  <Input
                    id="shippingDistance"
                    type="number"
                    placeholder="e.g., 10000"
                    value={logisticsData.shippingDistance}
                    onChange={(e) => setLogisticsData(prev => ({ 
                      ...prev, 
                      shippingDistance: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="packagingType">Packaging Type</Label>
                  <Select value={logisticsData.packagingType} onValueChange={(value) => 
                    setLogisticsData(prev => ({ ...prev, packagingType: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select packaging type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardboard">Cardboard</SelectItem>
                      <SelectItem value="plastic">Plastic</SelectItem>
                      <SelectItem value="metal">Metal</SelectItem>
                      <SelectItem value="mixed">Mixed Materials</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="packagingMaterials">Packaging Materials (kg/month)</Label>
                  <Input
                    id="packagingMaterials"
                    type="number"
                    placeholder="e.g., 1000"
                    value={logisticsData.packagingMaterials}
                    onChange={(e) => setLogisticsData(prev => ({ 
                      ...prev, 
                      packagingMaterials: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center pt-6">
            <Button 
              onClick={calculateEmissions}
              className="gradient-primary text-white hover:opacity-90 px-8 py-3"
              size="lg"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Calculate Carbon Footprint
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <Card className="border-secondary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              Carbon Footprint Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-6 bg-red-500/10 rounded-lg">
                <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-500">{results.totalEmissions}</p>
                <p className="text-sm text-muted-foreground">tons CO₂/year</p>
              </div>
              
              <div className="text-center p-6 bg-primary/10 rounded-lg">
                <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-primary">{results.creditsNeeded}</p>
                <p className="text-sm text-muted-foreground">credits needed</p>
              </div>
              
              <div className="text-center p-6 bg-green-500/10 rounded-lg">
                <Calculator className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-500">₹{(results.creditsNeeded * 100).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">estimated cost</p>
              </div>
            </div>

            {/* Emission Breakdown */}
            <div className="space-y-4">
              <h4 className="font-semibold">Emission Breakdown by Category</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border border-border/50 rounded-lg">
                  <Truck className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                  <p className="font-medium">{results.breakdown.transport}</p>
                  <p className="text-xs text-muted-foreground">Transport</p>
                </div>
                <div className="text-center p-4 border border-border/50 rounded-lg">
                  <Factory className="h-6 w-6 text-red-500 mx-auto mb-2" />
                  <p className="font-medium">{results.breakdown.manufacturing}</p>
                  <p className="text-xs text-muted-foreground">Manufacturing</p>
                </div>
                <div className="text-center p-4 border border-border/50 rounded-lg">
                  <Zap className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                  <p className="font-medium">{results.breakdown.operations}</p>
                  <p className="text-xs text-muted-foreground">Operations</p>
                </div>
                <div className="text-center p-4 border border-border/50 rounded-lg">
                  <Package className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <p className="font-medium">{results.breakdown.logistics}</p>
                  <p className="text-xs text-muted-foreground">Logistics</p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            {results.recommendedActions.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-3">AI Recommendations for Reduction</h4>
                <div className="space-y-2">
                  {results.recommendedActions.map((action: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-secondary/10 rounded-lg">
                      <Target className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{action}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};