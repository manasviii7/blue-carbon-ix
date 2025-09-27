import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trees, 
  MapPin, 
  TrendingUp, 
  FileText, 
  CheckCircle, 
  Plus,
  Download,
  Upload,
  Clock,
  IndianRupee,
  Users,
  Activity,
  Target,
  LogOut,
  Waves
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const NGODashboard = () => {
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [addedProjects, setAddedProjects] = useState<any[]>([]);
  const [ecosystemData, setEcosystemData] = useState({
    soilType: '',
    treesCount: 0,
    areaSize: 0,
    rainfall: 0
  });
  const [predictionResults, setPredictionResults] = useState({
    co2PerYear: 0,
    creditsNeeded: 0,
    recommendedEcosystem: ''
  });

  // Sample data
  const ecosystemPrediction = {
    treesPlanted: 12500,
    areaHectares: 450,
    annualRainfall: 1200,
    soilType: "Alluvial",
    co2PerYear: 2800,
    creditsNeeded: 150,
    recommendedEcosystem: "Mangrove Restoration"
  };

  const creditManagement = {
    totalIssued: 45200,
    available: 12800,
    retrieved: 32400,
    totalValueINR: 4520000,
    creditsBalanceByProjects: [
      { name: "Sundarbans Mangrove", credits: 8500, value: 850000 },
      { name: "Chilika Seagrass", credits: 4300, value: 430000 }
    ]
  };

  const recentProjects = [
    {
      id: "1",
      name: "Sundarbans Mangrove Restoration",
      location: "West Bengal",
      status: "verified",
      credits: 8500,
      lastMRV: "2024-09-15",
      co2Sequestered: 2100
    },
    {
      id: "2", 
      name: "Chilika Seagrass Conservation",
      location: "Odisha",
      status: "pending",
      credits: 4300,
      lastMRV: "2024-09-20",
      co2Sequestered: 1050
    }
  ];

  const handleLogout = () => {
    toast({
      title: "Logged Out Successfully",
      description: "You have been logged out of CARBONIX",
    });
    window.location.href = '/';
  };

  const handleGenerateMRV = () => {
    toast({
      title: "MRV Report Downloaded Successfully",
      description: "Your MRV report has been generated and downloaded",
    });
  };

  const handleAddProject = (projectData: any) => {
    const newProject = {
      id: Date.now().toString(),
      ...projectData,
      status: 'pending',
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setAddedProjects(prev => [...prev, newProject]);
    toast({
      title: "Project Saved Successfully",
      description: `${projectData.name} has been added to your projects`,
    });
  };

  const generateAIPrediction = () => {
    if (!ecosystemData.soilType || !ecosystemData.treesCount || !ecosystemData.areaSize || !ecosystemData.rainfall) {
      toast({
        title: "Missing Data",
        description: "Please fill in all ecosystem prediction fields",
        variant: "destructive"
      });
      return;
    }

    // AI prediction logic based on input data
    const baseCO2 = ecosystemData.treesCount * 0.25; // Trees CO2 absorption
    const areaBonus = ecosystemData.areaSize * 2.5; // Area factor
    const rainfallBonus = Math.min(ecosystemData.rainfall / 100, 15); // Rainfall factor
    const soilBonus = ecosystemData.soilType === 'alluvial' ? 1.2 : ecosystemData.soilType === 'coastal' ? 1.1 : 1.0;
    
    const predictedCO2 = Math.round((baseCO2 + areaBonus + rainfallBonus) * soilBonus);
    const creditsNeeded = Math.ceil(predictedCO2 * 0.1);
    const ecosystem = ecosystemData.soilType === 'alluvial' ? 'Mangrove Restoration' : 
                     ecosystemData.soilType === 'coastal' ? 'Seagrass Conservation' : 
                     'Mixed Coastal Ecosystem';

    setPredictionResults({
      co2PerYear: predictedCO2,
      creditsNeeded,
      recommendedEcosystem: ecosystem
    });

    toast({
      title: "AI Prediction Generated",
      description: `Predicted ${predictedCO2} tons CO₂/year sequestration`,
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
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="gradient-secondary p-2 rounded-lg">
              <Waves className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">NGO Dashboard</h1>
              <p className="text-sm text-muted-foreground">Blue Carbon Project Management</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge className="bg-secondary/10 text-secondary">Forest Department Maharashtra</Badge>
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
          <TabsList className="grid w-full grid-cols-5 bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ai-prediction">AI Ecosystem</TabsTrigger>
            <TabsTrigger value="credit-management">Credit Management</TabsTrigger>
            <TabsTrigger value="project-registry">Project Registry</TabsTrigger>
            <TabsTrigger value="mrv-reports">MRV Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-secondary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                      <p className="text-2xl font-bold text-secondary">24</p>
                    </div>
                    <Trees className="h-8 w-8 text-secondary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Credits Issued</p>
                      <p className="text-2xl font-bold text-primary">45.2K</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-accent/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">CO₂ Sequestered</p>
                      <p className="text-2xl font-bold text-accent">12.8K tons</p>
                    </div>
                    <Activity className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pending Verification</p>
                      <p className="text-2xl font-bold text-orange-500">3</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <div>
                          <h4 className="font-medium">{project.name}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {project.location}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge 
                          variant={project.status === 'verified' ? 'default' : 'secondary'}
                          className={project.status === 'verified' ? 'bg-secondary text-white' : ''}
                        >
                          {project.status}
                        </Badge>
                        <div className="text-right">
                          <p className="font-medium">{project.credits} credits</p>
                          <p className="text-sm text-muted-foreground">{project.co2Sequestered} tons CO₂</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Ecosystem Prediction Tab */}
          <TabsContent value="ai-prediction" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  AI Ecosystem Prediction System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Input Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="soilType">Soil Type</Label>
                    <Select value={ecosystemData.soilType} onValueChange={(value) => 
                      setEcosystemData(prev => ({ ...prev, soilType: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alluvial">Alluvial</SelectItem>
                        <SelectItem value="coastal">Coastal Sandy</SelectItem>
                        <SelectItem value="clayey">Clayey</SelectItem>
                        <SelectItem value="saline">Saline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="treesCount">Number of Trees</Label>
                    <Input 
                      id="treesCount" 
                      type="number" 
                      placeholder="e.g., 12500"
                      value={ecosystemData.treesCount}
                      onChange={(e) => setEcosystemData(prev => ({ 
                        ...prev, 
                        treesCount: parseInt(e.target.value) || 0 
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="areaSize">Area (Hectares)</Label>
                    <Input 
                      id="areaSize" 
                      type="number" 
                      placeholder="e.g., 450"
                      value={ecosystemData.areaSize}
                      onChange={(e) => setEcosystemData(prev => ({ 
                        ...prev, 
                        areaSize: parseInt(e.target.value) || 0 
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rainfall">Annual Rainfall (mm)</Label>
                    <Input 
                      id="rainfall" 
                      type="number" 
                      placeholder="e.g., 1200"
                      value={ecosystemData.rainfall}
                      onChange={(e) => setEcosystemData(prev => ({ 
                        ...prev, 
                        rainfall: parseInt(e.target.value) || 0 
                      }))}
                    />
                  </div>
                </div>

                <Button 
                  className="gradient-secondary text-white hover:opacity-90"
                  onClick={generateAIPrediction}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Generate AI Prediction
                </Button>

                {/* Prediction Results */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-secondary/30">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-semibold mb-2">CO₂ Sequestration Prediction</h3>
                      <p className="text-3xl font-bold text-secondary">{predictionResults.co2PerYear || ecosystemPrediction.co2PerYear}</p>
                      <p className="text-sm text-muted-foreground">tons CO₂/year</p>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/30">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-semibold mb-2">Credits Needed to Purchase</h3>
                      <p className="text-3xl font-bold text-primary">{predictionResults.creditsNeeded || ecosystemPrediction.creditsNeeded}</p>
                      <p className="text-sm text-muted-foreground">carbon credits</p>
                    </CardContent>
                  </Card>

                  <Card className="border-accent/30">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-semibold mb-2">Recommended Ecosystem</h3>
                      <p className="text-lg font-bold text-accent">{predictionResults.recommendedEcosystem || ecosystemPrediction.recommendedEcosystem}</p>
                      <p className="text-sm text-muted-foreground">Best for this region</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Environmental Factors Display */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <Trees className="h-8 w-8 text-secondary mx-auto mb-2" />
                    <p className="text-lg font-bold">{ecosystemData.treesCount || ecosystemPrediction.treesPlanted.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Trees Planted</p>
                  </div>
                  
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-lg font-bold">{ecosystemData.areaSize || ecosystemPrediction.areaHectares}</p>
                    <p className="text-sm text-muted-foreground">Area (Hectares)</p>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                    <Activity className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-lg font-bold">{ecosystemData.rainfall || ecosystemPrediction.annualRainfall}mm</p>
                    <p className="text-sm text-muted-foreground">Annual Rainfall</p>
                  </div>
                  
                  <div className="text-center p-4 bg-amber-500/10 rounded-lg">
                    <Target className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                    <p className="text-lg font-bold">{ecosystemData.soilType || ecosystemPrediction.soilType}</p>
                    <p className="text-sm text-muted-foreground">Soil Type</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Credit Management Tab */}
          <TabsContent value="credit-management" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-secondary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Issued Credits</p>
                      <p className="text-2xl font-bold text-secondary">{creditManagement.totalIssued.toLocaleString()}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-secondary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Available Credits</p>
                      <p className="text-2xl font-bold text-primary">{creditManagement.available.toLocaleString()}</p>
                    </div>
                    <Activity className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-accent/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Retrieved Credits</p>
                      <p className="text-2xl font-bold text-accent">{creditManagement.retrieved.toLocaleString()}</p>
                    </div>
                    <Download className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                      <p className="text-2xl font-bold text-green-500">{formatCurrency(creditManagement.totalValueINR)}</p>
                    </div>
                    <IndianRupee className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Credits Balance by Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creditManagement.creditsBalanceByProjects.map((project, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-sm text-muted-foreground">{project.credits} credits available</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-500">{formatCurrency(project.value)}</p>
                        <p className="text-sm text-muted-foreground">Current value</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Project Registry Tab */}
          <TabsContent value="project-registry" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Project
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form id="projectForm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectName">Project Name</Label>
                      <Input 
                        id="projectName" 
                        name="projectName"
                        placeholder="e.g., Mangrove Restoration Phase 2"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" name="location" placeholder="e.g., Sundarbans, West Bengal" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ecosystem">Ecosystem Type</Label>
                      <Select name="ecosystem">
                        <SelectTrigger>
                          <SelectValue placeholder="Select ecosystem type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mangrove">Mangrove</SelectItem>
                          <SelectItem value="seagrass">Seagrass</SelectItem>
                          <SelectItem value="marsh">Tidal Marsh</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="area">Area (Hectares)</Label>
                      <Input id="area" name="area" type="number" placeholder="e.g., 250" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea 
                      id="description" 
                      name="description"
                      placeholder="Describe the project objectives, timeline, and expected outcomes..."
                      rows={4}
                    />
                  </div>
                </form>
                
                <Button 
                  className="gradient-secondary text-white hover:opacity-90"
                  onClick={() => {
                    const form = document.getElementById('projectForm') as HTMLFormElement;
                    if (form) {
                      const formData = new FormData(form);
                      const projectData = {
                        name: (document.getElementById('projectName') as HTMLInputElement)?.value || '',
                        location: (document.getElementById('location') as HTMLInputElement)?.value || '',
                        ecosystem: (document.querySelector('[name="ecosystem"]') as HTMLSelectElement)?.value || '',
                        area: (document.getElementById('area') as HTMLInputElement)?.value || '',
                        description: (document.getElementById('description') as HTMLTextAreaElement)?.value || ''
                      };
                      if (projectData.name && projectData.location) {
                        handleAddProject(projectData);
                        form.reset();
                      } else {
                        toast({
                          title: "Missing Information",
                          description: "Please fill in all required fields",
                          variant: "destructive"
                        });
                      }
                    }
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Register Project
                </Button>

                {/* Display Added Projects */}
                {addedProjects.length > 0 && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Recently Added Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {addedProjects.map((project) => (
                          <div key={project.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-secondary/5">
                            <div>
                              <h4 className="font-medium">{project.name}</h4>
                              <p className="text-sm text-muted-foreground">{project.location} • {project.ecosystem}</p>
                              <p className="text-xs text-muted-foreground">Added: {project.dateAdded}</p>
                            </div>
                            <Badge 
                              variant="secondary"
                              className="bg-orange-500/10 text-orange-500"
                            >
                              {project.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* MRV Reports Tab */}
          <TabsContent value="mrv-reports" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Generate MRV Report with Carbon Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectSelect">Select Project</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose project for MRV" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sundarbans">Sundarbans Mangrove Restoration</SelectItem>
                        <SelectItem value="chilika">Chilika Seagrass Conservation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reportingPeriod">Reporting Period</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="q3-2024">Q3 2024</SelectItem>
                        <SelectItem value="q2-2024">Q2 2024</SelectItem>
                        <SelectItem value="q1-2024">Q1 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Integrated Carbon Calculator */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Activity className="h-5 w-5 text-primary" />
                      Project Carbon Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="biomassData">Biomass Data (tons)</Label>
                        <Input 
                          id="biomassData" 
                          type="number" 
                          placeholder="e.g., 850"
                          defaultValue="850"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sedimentCarbon">Sediment Carbon (tons)</Label>
                        <Input 
                          id="sedimentCarbon" 
                          type="number" 
                          placeholder="e.g., 1250"
                          defaultValue="1250"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="survivalRate">Tree Survival Rate (%)</Label>
                        <Input 
                          id="survivalRate" 
                          type="number" 
                          placeholder="e.g., 92"
                          defaultValue="92"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-secondary">2,800</p>
                        <p className="text-sm text-muted-foreground">tons CO₂ sequestered</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">150</p>
                        <p className="text-sm text-muted-foreground">credits generated</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-500">₹15.0L</p>
                        <p className="text-sm text-muted-foreground">estimated value</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-2">
                  <Label htmlFor="monitoringData">Upload Monitoring Data</Label>
                  <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drop your monitoring files here or click to upload
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Choose Files
                    </Button>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button 
                    className="gradient-primary text-white hover:opacity-90"
                    onClick={handleGenerateMRV}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate MRV Report
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};