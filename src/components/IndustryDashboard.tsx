import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  TrendingDown, 
  ShoppingCart, 
  Bot,
  IndianRupee,
  Factory,
  Truck,
  Zap,
  Package,
  AlertTriangle,
  CheckCircle,
  Target,
  LogOut,
  MessageSquare,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CarbonCalculator } from "./CarbonCalculator";
import { AIChatbot } from "./AIChatbot";

export const IndustryDashboard = () => {
  const { toast } = useToast();
  const [calculatorResults, setCalculatorResults] = useState({
    totalEmissions: 0,
    creditsNeeded: 0,
    recommendedActions: []
  });

  // Sample industry data
  const industryStats = {
    currentEmissions: 8450,
    targetReduction: 30,
    creditsOwned: 2100,
    creditsPurchased: 1850,
    totalSpent: 185000,
    complianceStatus: "On Track"
  };

  const recentTransactions = [
    {
      id: "TXN001",
      type: "purchase",
      credits: 500,
      amount: 50000,
      date: "2024-09-20",
      project: "Sundarbans Mangrove"
    },
    {
      id: "TXN002", 
      type: "purchase",
      credits: 300,
      amount: 30000,
      date: "2024-09-15",
      project: "Chilika Seagrass"
    }
  ];

  const handleLogout = () => {
    toast({
      title: "Logged Out Successfully", 
      description: "You have been logged out of CARBONIX",
    });
    window.location.href = '/';
  };

  const handleBuyCredits = (amount: number) => {
    toast({
      title: "Credits Purchase Initiated",
      description: `Purchasing ${amount} carbon credits for ₹${amount * 100}`,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="gradient-primary p-2 rounded-lg">
              <Factory className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Industry Dashboard</h1>
              <p className="text-sm text-muted-foreground">Carbon Management & Compliance</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge className="bg-primary/10 text-primary">Tata Steel Limited</Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="calculator">Carbon Calculator</TabsTrigger>
            <TabsTrigger value="ai-advisor">AI Advisor</TabsTrigger>
            <TabsTrigger value="marketplace">Credit Marketplace</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Current Emissions</p>
                      <p className="text-2xl font-bold text-red-500">{industryStats.currentEmissions}</p>
                      <p className="text-xs text-muted-foreground">tons CO₂/year</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-secondary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Target Reduction</p>
                      <p className="text-2xl font-bold text-secondary">{industryStats.targetReduction}%</p>
                      <p className="text-xs text-muted-foreground">by 2025</p>
                    </div>
                    <Target className="h-8 w-8 text-secondary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Credits Owned</p>
                      <p className="text-2xl font-bold text-primary">{industryStats.creditsOwned}</p>
                      <p className="text-xs text-muted-foreground">carbon credits</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Invested</p>
                      <p className="text-2xl font-bold text-green-500">{formatCurrency(industryStats.totalSpent)}</p>
                      <p className="text-xs text-muted-foreground">in credits</p>
                    </div>
                    <IndianRupee className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Compliance Status */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    Compliance Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Current Status</span>
                      <Badge className="bg-secondary text-white">{industryStats.complianceStatus}</Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div className="bg-secondary h-3 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      75% towards carbon neutrality target for 2025
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-primary" />
                    Emission Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Factory className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Manufacturing</span>
                      </div>
                      <span className="font-medium">4,200 tons</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">Transportation</span>
                      </div>
                      <span className="font-medium">2,800 tons</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">Energy</span>
                      </div>
                      <span className="font-medium">1,450 tons</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Recent Credit Purchases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        <div>
                          <h4 className="font-medium">{transaction.project}</h4>
                          <p className="text-sm text-muted-foreground">
                            {transaction.credits} credits • {transaction.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-500">{formatCurrency(transaction.amount)}</p>
                        <p className="text-sm text-muted-foreground">₹{transaction.amount/transaction.credits}/credit</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Carbon Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6">
            <CarbonCalculator onCalculate={setCalculatorResults} />
          </TabsContent>

          {/* AI Advisor Tab */}
          <TabsContent value="ai-advisor" className="space-y-6">
            {/* NGO Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-secondary" />
                  AI-Recommended NGO Partners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-secondary/20 hover:border-secondary/40 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">Forest Department Maharashtra</h4>
                          <p className="text-sm text-muted-foreground">Mangrove Restoration Specialist</p>
                        </div>
                        <Badge className="bg-secondary/10 text-secondary">95% Match</Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Available Credits:</span>
                          <span className="font-medium">8,500 credits</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Price Range:</span>
                          <span className="font-medium text-green-500">₹95-100/credit</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>CO₂ Capacity:</span>
                          <span className="font-medium">2,800 tons/year</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Location:</span>
                          <span className="font-medium">West Bengal, Maharashtra</span>
                        </div>
                        <div className="pt-2">
                          <p className="text-xs text-muted-foreground">
                            🎯 Perfect for your 8,450 ton emissions. Verified projects with strong MRV track record.
                          </p>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full mt-4 gradient-secondary text-white hover:opacity-90"
                        onClick={() => toast({
                          title: "NGO Connection Initiated",
                          description: "Connecting with Forest Department Maharashtra for carbon credit partnership",
                        })}
                      >
                        Connect with NGO
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">Coastal Conservation Trust</h4>
                          <p className="text-sm text-muted-foreground">Seagrass & Coastal Restoration</p>
                        </div>
                        <Badge className="bg-primary/10 text-primary">89% Match</Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Available Credits:</span>
                          <span className="font-medium">4,300 credits</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Price Range:</span>
                          <span className="font-medium text-green-500">₹85-95/credit</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>CO₂ Capacity:</span>
                          <span className="font-medium">1,050 tons/year</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Location:</span>
                          <span className="font-medium">Odisha, Tamil Nadu</span>
                        </div>
                        <div className="pt-2">
                          <p className="text-xs text-muted-foreground">
                            🌊 Cost-effective option for partial emissions offset. Strong in seagrass restoration.
                          </p>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full mt-4 gradient-primary text-white hover:opacity-90"
                        onClick={() => toast({
                          title: "NGO Connection Initiated", 
                          description: "Connecting with Coastal Conservation Trust for seagrass credit partnership",
                        })}
                      >
                        Connect with NGO
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                  <h4 className="font-semibold text-accent mb-2">AI Recommendation Summary</h4>
                  <p className="text-sm text-muted-foreground">
                    Based on your 8,450 tons CO₂ emissions, we recommend purchasing 2,100 credits from Forest Department Maharashtra (primary) 
                    and 1,500 credits from Coastal Conservation Trust (secondary) for optimal cost-effectiveness and regional impact.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <Card className="border-primary/20">
                <CardContent className="p-6 text-center">
                  <Bot className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">AI Reduction Strategies</h3>
                  <p className="text-sm text-muted-foreground">
                    Get personalized recommendations to reduce your carbon footprint
                  </p>
                </CardContent>
              </Card>

              <Card className="border-secondary/20">
                <CardContent className="p-6 text-center">
                  <ShoppingCart className="h-8 w-8 text-secondary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Credit Purchase Optimization</h3>
                  <p className="text-sm text-muted-foreground">
                    Optimize when and how many credits to purchase for best value
                  </p>
                </CardContent>
              </Card>

              <Card className="border-accent/20">
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Compliance Planning</h3>
                  <p className="text-sm text-muted-foreground">
                    Plan your path to carbon neutrality with AI guidance
                  </p>
                </CardContent>
              </Card>
            </div>

            <AIChatbot />
          </TabsContent>

          {/* Credit Marketplace Tab */}
          <TabsContent value="marketplace" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-secondary/20 hover:border-secondary/40 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">Sundarbans Mangrove Credits</CardTitle>
                  <Badge className="w-fit bg-secondary/10 text-secondary">Verified</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Available:</span>
                      <span className="font-medium">1,250 credits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Price per credit:</span>
                      <span className="font-medium text-green-500">₹100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Location:</span>
                      <span className="font-medium">West Bengal</span>
                    </div>
                    <Button 
                      className="w-full gradient-secondary text-white hover:opacity-90"
                      onClick={() => handleBuyCredits(500)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Buy Credits
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">Chilika Seagrass Credits</CardTitle>
                  <Badge className="w-fit bg-primary/10 text-primary">Verified</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Available:</span>
                      <span className="font-medium">800 credits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Price per credit:</span>
                      <span className="font-medium text-green-500">₹95</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Location:</span>
                      <span className="font-medium">Odisha</span>
                    </div>
                    <Button 
                      className="w-full gradient-primary text-white hover:opacity-90"
                      onClick={() => handleBuyCredits(300)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Buy Credits
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-accent/20 hover:border-accent/40 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">Kerala Backwater Restoration</CardTitle>
                  <Badge className="w-fit bg-accent/10 text-accent">Verified</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Available:</span>
                      <span className="font-medium">950 credits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Price per credit:</span>
                      <span className="font-medium text-green-500">₹105</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Location:</span>
                      <span className="font-medium">Kerala</span>
                    </div>
                    <Button 
                      className="w-full gradient-ocean text-white hover:opacity-90"
                      onClick={() => handleBuyCredits(400)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Buy Credits
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bulk Purchase */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Bulk Credit Purchase
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="creditAmount">Number of Credits</Label>
                    <Input id="creditAmount" type="number" placeholder="e.g., 1000" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxPrice">Max Price per Credit (₹)</Label>
                    <Input id="maxPrice" type="number" placeholder="e.g., 100" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="projectType">Preferred Project Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mangrove">Mangrove</SelectItem>
                        <SelectItem value="seagrass">Seagrass</SelectItem>
                        <SelectItem value="marsh">Tidal Marsh</SelectItem>
                        <SelectItem value="any">Any</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  className="gradient-primary text-white hover:opacity-90"
                  onClick={() => {
                    const creditAmount = (document.getElementById('creditAmount') as HTMLInputElement)?.value;
                    const maxPrice = (document.getElementById('maxPrice') as HTMLInputElement)?.value;
                    if (creditAmount && maxPrice) {
                      toast({
                        title: "Bulk Order Submitted",
                        description: `Order for ${creditAmount} credits at ₹${maxPrice} max per credit has been submitted`,
                      });
                    } else {
                      toast({
                        title: "Missing Information",
                        description: "Please fill in credit amount and max price",
                        variant: "destructive"
                      });
                    }
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Submit Bulk Order
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};