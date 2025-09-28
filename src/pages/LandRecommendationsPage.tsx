import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Wheat, Grape, TreePine, Carrot, Star, TrendingUp, Droplets, Sun, Calendar, DollarSign, AlertCircle, CheckCircle, Download, Share2, Bookmark } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { toast } from "@/hooks/use-toast";

const LandRecommendationsPage = () => {
  const recommendations = [
    {
      id: 1,
      crop: "Wheat",
      suitability: "Excellent",
      icon: Wheat,
      reason: "Current weather patterns show optimal temperature (22-26°C) and moderate rainfall perfect for wheat cultivation. Historical data indicates 95% success rate.",
      benefits: ["High yield potential", "Suitable soil moisture", "Optimal growing season"],
      riskLevel: "Low",
      expectedYield: "4.2 tons/hectare",
      badge: "Recommended",
      badgeVariant: "default" as const,
      detailedAnalysis: {
        plantingSeason: "October - November",
        harvestSeason: "May - June",
        growthDuration: "7-8 months",
        waterRequirement: "500-600mm",
        soilPh: "6.0-7.5",
        temperature: "15-25°C",
        marketPrice: "$320/ton",
        profitMargin: "35%",
        investmentCost: "$1,200/hectare",
        expectedRevenue: "$1,344/hectare",
        yieldHistory: [
          { year: "2021", yield: 3.8, price: 280 },
          { year: "2022", yield: 4.1, price: 295 },
          { year: "2023", yield: 4.3, price: 310 },
          { year: "2024", yield: 4.2, price: 320 }
        ],
        monthlyProgress: [
          { month: "Oct", progress: 10, activity: "Planting" },
          { month: "Nov", progress: 25, activity: "Germination" },
          { month: "Dec", progress: 40, activity: "Tillering" },
          { month: "Jan", progress: 60, activity: "Stem Extension" },
          { month: "Feb", progress: 75, activity: "Heading" },
          { month: "Mar", progress: 85, activity: "Flowering" },
          { month: "Apr", progress: 95, activity: "Grain Fill" },
          { month: "May", progress: 100, activity: "Harvest" }
        ],
        risks: [
          { type: "Weather", level: "Low", description: "Drought risk during grain filling" },
          { type: "Disease", level: "Medium", description: "Rust and mildew in humid conditions" },
          { type: "Market", level: "Low", description: "Stable demand and pricing" }
        ],
        requirements: [
          "Well-drained soil",
          "Regular irrigation during dry spells",
          "Fertilizer application at planting",
          "Pest monitoring and control"
        ]
      }
    },
    {
      id: 2,
      crop: "Grapes",
      suitability: "Good",
      icon: Grape,
      reason: "Temperature and humidity levels are favorable for grape cultivation. Recent rainfall patterns support healthy vine development.",
      benefits: ["Good market demand", "Suitable climate", "Lower water requirements"],
      riskLevel: "Medium",
      expectedYield: "12 tons/hectare", 
      badge: "Good Option",
      badgeVariant: "secondary" as const,
      detailedAnalysis: {
        plantingSeason: "February - March",
        harvestSeason: "August - September",
        growthDuration: "6-7 months",
        waterRequirement: "400-500mm",
        soilPh: "6.0-7.0",
        temperature: "20-30°C",
        marketPrice: "$1,200/ton",
        profitMargin: "28%",
        investmentCost: "$2,500/hectare",
        expectedRevenue: "$14,400/hectare",
        yieldHistory: [
          { year: "2021", yield: 11.5, price: 1100 },
          { year: "2022", yield: 12.2, price: 1150 },
          { year: "2023", yield: 11.8, price: 1180 },
          { year: "2024", yield: 12.0, price: 1200 }
        ],
        monthlyProgress: [
          { month: "Feb", progress: 15, activity: "Planting" },
          { month: "Mar", progress: 30, activity: "Bud Break" },
          { month: "Apr", progress: 50, activity: "Shoot Growth" },
          { month: "May", progress: 70, activity: "Flowering" },
          { month: "Jun", progress: 85, activity: "Fruit Set" },
          { month: "Jul", progress: 95, activity: "Veraison" },
          { month: "Aug", progress: 100, activity: "Harvest" }
        ],
        risks: [
          { type: "Weather", level: "Medium", description: "Frost damage during flowering" },
          { type: "Disease", level: "High", description: "Powdery mildew and botrytis" },
          { type: "Market", level: "Medium", description: "Price volatility in wine market" }
        ],
        requirements: [
          "Trellis system installation",
          "Pruning and training",
          "Disease prevention program",
          "Quality control for wine grapes"
        ]
      }
    },
    {
      id: 3,
      crop: "Pine Trees",
      suitability: "Excellent",
      icon: TreePine,
      reason: "Long-term weather analysis shows excellent conditions for forestry. Sustainable option with environmental benefits.",
      benefits: ["Carbon sequestration", "Long-term investment", "Soil conservation"],
      riskLevel: "Very Low",
      expectedYield: "150 m³/hectare",
      badge: "Eco-Friendly",
      badgeVariant: "outline" as const,
      detailedAnalysis: {
        plantingSeason: "November - February",
        harvestSeason: "Year 15-20",
        growthDuration: "15-20 years",
        waterRequirement: "600-800mm",
        soilPh: "5.5-6.5",
        temperature: "10-25°C",
        marketPrice: "$80/m³",
        profitMargin: "45%",
        investmentCost: "$3,000/hectare",
        expectedRevenue: "$12,000/hectare",
        yieldHistory: [
          { year: "2010", yield: 140, price: 65 },
          { year: "2015", yield: 145, price: 70 },
          { year: "2020", yield: 148, price: 75 },
          { year: "2024", yield: 150, price: 80 }
        ],
        monthlyProgress: [
          { month: "Nov", progress: 5, activity: "Planting" },
          { month: "Dec", progress: 10, activity: "Establishment" },
          { month: "Jan", progress: 15, activity: "Root Development" },
          { month: "Feb", progress: 20, activity: "Growth Begins" },
          { month: "Mar", progress: 25, activity: "Active Growth" },
          { month: "Apr", progress: 30, activity: "Seasonal Growth" },
          { month: "May", progress: 35, activity: "Peak Growth" },
          { month: "Jun", progress: 40, activity: "Maintenance" }
        ],
        risks: [
          { type: "Weather", level: "Low", description: "Drought stress in young trees" },
          { type: "Disease", level: "Low", description: "Root rot in poorly drained areas" },
          { type: "Market", level: "Low", description: "Stable timber demand" }
        ],
        requirements: [
          "Site preparation and drainage",
          "Regular weeding and maintenance",
          "Thinning at year 8-10",
          "Fire protection measures"
        ]
      }
    },
    {
      id: 4,
      crop: "Carrots",
      suitability: "Good",
      icon: Carrot,
      reason: "Current soil conditions and weather patterns are suitable for root vegetable cultivation. Short growing season fits weather forecast.",
      benefits: ["Quick harvest cycle", "High nutrition value", "Good storage life"],
      riskLevel: "Low",
      expectedYield: "35 tons/hectare",
      badge: "Quick Harvest",
      badgeVariant: "secondary" as const,
      detailedAnalysis: {
        plantingSeason: "March - April",
        harvestSeason: "July - August",
        growthDuration: "3-4 months",
        waterRequirement: "300-400mm",
        soilPh: "6.0-7.0",
        temperature: "15-25°C",
        marketPrice: "$450/ton",
        profitMargin: "40%",
        investmentCost: "$800/hectare",
        expectedRevenue: "$15,750/hectare",
        yieldHistory: [
          { year: "2021", yield: 32, price: 420 },
          { year: "2022", yield: 34, price: 430 },
          { year: "2023", yield: 33, price: 440 },
          { year: "2024", yield: 35, price: 450 }
        ],
        monthlyProgress: [
          { month: "Mar", progress: 20, activity: "Planting" },
          { month: "Apr", progress: 40, activity: "Germination" },
          { month: "May", progress: 70, activity: "Leaf Growth" },
          { month: "Jun", progress: 90, activity: "Root Development" },
          { month: "Jul", progress: 100, activity: "Harvest" }
        ],
        risks: [
          { type: "Weather", level: "Medium", description: "Heavy rainfall can cause splitting" },
          { type: "Disease", level: "Medium", description: "Leaf blight and root rot" },
          { type: "Market", level: "Low", description: "Consistent demand for fresh produce" }
        ],
        requirements: [
          "Deep, loose soil preparation",
          "Consistent moisture management",
          "Thinning at 3-4 weeks",
          "Regular pest monitoring"
        ]
      }
    }
  ];

  const landConditions = [
    { label: "Soil pH", value: "6.8", status: "Optimal", icon: TrendingUp },
    { label: "Moisture Level", value: "65%", status: "Good", icon: Droplets },
    { label: "Sun Exposure", value: "8 hrs/day", status: "Excellent", icon: Sun },
    { label: "Drainage", value: "Well-drained", status: "Good", icon: TrendingUp }
  ];

  

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability.toLowerCase()) {
      case "excellent": return "text-green-600 bg-green-50 border-green-200";
      case "good": return "text-blue-600 bg-blue-50 border-blue-200";
      case "fair": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "very low": return "text-green-600";
      case "low": return "text-green-500";
      case "medium": return "text-yellow-500";
      case "high": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const DetailedAnalysisDialog = ({ recommendation }: { recommendation: any }) => {
    const data = recommendation.detailedAnalysis;
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full" variant="outline">
            View Detailed Analysis
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="bg-gradient-land p-2 rounded-lg">
                <recommendation.icon className="h-6 w-6 text-white" />
              </div>
              {recommendation.crop} - Detailed Analysis
            </DialogTitle>
            <DialogDescription>
              Comprehensive analysis including financial projections, growth timeline, and risk assessment
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="risks">Risks & Requirements</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Growing Conditions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Planting Season:</span>
                      <span className="font-medium">{data.plantingSeason}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Harvest Season:</span>
                      <span className="font-medium">{data.harvestSeason}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Growth Duration:</span>
                      <span className="font-medium">{data.growthDuration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Water Requirement:</span>
                      <span className="font-medium">{data.waterRequirement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Soil pH:</span>
                      <span className="font-medium">{data.soilPh}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Temperature:</span>
                      <span className="font-medium">{data.temperature}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Yield History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={data.yieldHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="yield" stroke="#8884d8" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Investment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{data.investmentCost}</div>
                    <p className="text-sm text-muted-foreground">Initial cost per hectare</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Expected Revenue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{data.expectedRevenue}</div>
                    <p className="text-sm text-muted-foreground">Revenue per hectare</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Profit Margin
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{data.profitMargin}</div>
                    <p className="text-sm text-muted-foreground">Expected profit margin</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Price History</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.yieldHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="price" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Growth Timeline</CardTitle>
                  <CardDescription>Monthly progress and key activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.monthlyProgress.map((month: any, index: number) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{month.month}</span>
                          <span className="text-sm text-muted-foreground">{month.activity}</span>
                          <span className="text-sm font-medium">{month.progress}%</span>
                        </div>
                        <Progress value={month.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risks" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {data.risks.map((risk: any, index: number) => (
                      <div key={index} className="p-3 rounded-lg border">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{risk.type}</span>
                          <Badge variant="outline" className={getRiskColor(risk.level)}>
                            {risk.level}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{risk.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {data.requirements.map((req: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <Separator />

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save Analysis
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
            <Button size="sm" onClick={() => {
              const payload = {
                crop: recommendation.crop,
                suitability: recommendation.suitability,
                summary: recommendation.reason,
                details: data,
              };
              const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${recommendation.crop}-analysis.json`;
              a.click();
              URL.revokeObjectURL(url);
              toast({ title: "Report exported", description: `${recommendation.crop} analysis downloaded.` });
            }}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Land Recommendations</h1>
          <p className="text-lg text-muted-foreground">AI-powered crop and land use suggestions based on current conditions</p>
        </div>

        {/* Current Land Conditions */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle>Current Land Conditions</CardTitle>
            <CardDescription>Real-time analysis of your land's suitability factors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              {landConditions.map((condition, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-muted/30">
                  <condition.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground mb-1">{condition.label}</div>
                  <div className="text-lg font-semibold">{condition.value}</div>
                  <Badge variant="outline" className="mt-1">{condition.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="shadow-card hover:shadow-elevated transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-land p-2 rounded-lg">
                      <rec.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{rec.crop}</CardTitle>
                      <div className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getSuitabilityColor(rec.suitability)}`}>
                        {rec.suitability} Match
                      </div>
                    </div>
                  </div>
                  <Badge variant={rec.badgeVariant}>{rec.badge}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">{rec.reason}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Risk Level:</span>
                      <span className={`ml-2 font-medium ${getRiskColor(rec.riskLevel)}`}>
                        {rec.riskLevel}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expected Yield:</span>
                      <span className="ml-2 font-medium text-foreground">{rec.expectedYield}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Benefits:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {rec.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <Star className="h-3 w-3 mr-2 text-primary" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <DetailedAnalysisDialog recommendation={rec} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Insights */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Seasonal Planning</CardTitle>
              <CardDescription>Optimal planting and harvesting timeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <div>
                    <div className="font-medium">Spring Planting</div>
                    <div className="text-sm text-muted-foreground">March - April</div>
                  </div>
                  <Badge variant="outline">Optimal</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <div>
                    <div className="font-medium">Summer Crops</div>
                    <div className="text-sm text-muted-foreground">May - July</div>
                  </div>
                  <Badge variant="secondary">Good</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <div>
                    <div className="font-medium">Fall Harvest</div>
                    <div className="text-sm text-muted-foreground">September - November</div>
                  </div>
                  <Badge variant="outline">Recommended</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Market Insights</CardTitle>
              <CardDescription>Current market trends and pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <div>
                    <div className="font-medium">Wheat</div>
                    <div className="text-sm text-muted-foreground">High demand</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">$320/ton</div>
                    <div className="text-xs text-green-600">↑ 12%</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <div>
                    <div className="font-medium">Grapes</div>
                    <div className="text-sm text-muted-foreground">Stable demand</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-blue-600">$1,200/ton</div>
                    <div className="text-xs text-blue-600">↑ 5%</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <div>
                    <div className="font-medium">Carrots</div>
                    <div className="text-sm text-muted-foreground">Growing demand</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-orange-600">$450/ton</div>
                    <div className="text-xs text-orange-600">↑ 8%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandRecommendationsPage;