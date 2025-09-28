import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, TrendingUp, RefreshCw } from "lucide-react";
import { useLandRecommendations } from "@/hooks/useLandRecommendations";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const LandRecommendationsPage = () => {
  const { 
    recommendations, 
    landConditions, 
    selectedFilters, 
    isLoading, 
    updateFilters, 
    refreshRecommendations 
  } = useLandRecommendations();

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "very low": return "text-green-600";
      case "low": return "text-green-500";
      case "medium": return "text-yellow-500";
      case "high": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability.toLowerCase()) {
      case "excellent": return "text-green-600 bg-green-50 border-green-200";
      case "good": return "text-blue-600 bg-blue-50 border-blue-200";
      case "fair": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Land Recommendations</h1>
            <p className="text-lg text-muted-foreground">AI-powered crop and land use suggestions based on current conditions</p>
          </div>
          <Button onClick={refreshRecommendations} disabled={isLoading} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Filters */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle>Filter Recommendations</CardTitle>
            <CardDescription>Customize recommendations based on your preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Risk Level</label>
                <Select 
                  value={selectedFilters.riskLevel} 
                  onValueChange={(value) => updateFilters({ riskLevel: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="very_low">Very Low</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Water Requirement</label>
                <Select 
                  value={selectedFilters.waterRequirement} 
                  onValueChange={(value) => updateFilters({ waterRequirement: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select water requirement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Requirements</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Season</label>
                <Select 
                  value={selectedFilters.season} 
                  onValueChange={(value) => updateFilters({ season: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Seasons</SelectItem>
                    <SelectItem value="spring">Spring</SelectItem>
                    <SelectItem value="summer">Summer</SelectItem>
                    <SelectItem value="fall">Fall</SelectItem>
                    <SelectItem value="winter">Winter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Land Conditions */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle>Current Land Conditions</CardTitle>
            <CardDescription>Real-time analysis of your land's suitability factors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              {landConditions.map((condition, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <condition.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground mb-1">{condition.label}</div>
                  <div className="text-lg font-semibold">{condition.value}</div>
                  <Badge variant="outline" className="mt-1">{condition.status}</Badge>
                  <p className="text-xs text-muted-foreground mt-2">{condition.details}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {recommendations.length} recommendations based on current filters
              </p>
            </div>

            {/* Recommendations Grid */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {recommendations.map((rec) => (
                <Card key={rec.id} className="shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
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
                        <div>
                          <span className="text-muted-foreground">Water Need:</span>
                          <span className="ml-2 font-medium text-foreground">{rec.waterRequirement}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Growth Period:</span>
                          <span className="ml-2 font-medium text-foreground">{rec.growthPeriod}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Market Price:</span>
                          <span className={`ml-2 font-medium ${rec.marketTrend === 'up' ? 'text-green-600' : rec.marketTrend === 'down' ? 'text-red-600' : 'text-foreground'}`}>
                            ${rec.marketPrice}/ton {rec.marketTrend === 'up' ? '↑' : rec.marketTrend === 'down' ? '↓' : '→'}
                          </span>
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

                      <Button className="w-full" variant="outline">
                        View Detailed Analysis
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {recommendations.length === 0 && (
              <Card className="shadow-card">
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No recommendations match your current filters.</p>
                  <Button onClick={() => updateFilters({ riskLevel: 'all', waterRequirement: 'all', season: 'all' })}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}

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