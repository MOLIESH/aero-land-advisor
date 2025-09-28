import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { AlertTriangle, Wind, Factory, Car, Leaf, Bell, TrendingDown, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const AlertForm = () => {
  const [threshold, setThreshold] = useState("100");
  const [email, setEmail] = useState("");
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-sm font-medium">AQI Threshold</div>
        <Input value={threshold} onChange={(e) => setThreshold(e.target.value)} placeholder="e.g. 100" />
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium">Email (optional)</div>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
      </div>
      <div className="flex justify-end">
        <Button onClick={() => {
          toast({ title: "Alert set", description: `We'll notify you when AQI > ${threshold}.` });
        }}>Save Alert</Button>
      </div>
    </div>
  );
};

const PollutionAlertsPage = () => {
  const currentAQI = {
    value: 65,
    level: "Moderate",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    description: "Air quality is acceptable; however, there may be a concern for sensitive individuals."
  };

  const pollutants = [
    { name: "PM2.5", value: 35, unit: "μg/m³", status: "Moderate", trend: "stable" },
    { name: "PM10", value: 68, unit: "μg/m³", status: "Moderate", trend: "down" },
    { name: "O3", value: 85, unit: "ppb", status: "Good", trend: "down" },
    { name: "NO2", value: 42, unit: "ppb", status: "Good", trend: "up" },
    { name: "SO2", value: 12, unit: "ppb", status: "Good", trend: "stable" },
    { name: "CO", value: 2.1, unit: "ppm", status: "Good", trend: "down" }
  ];

  const historicalAQI = [
    { date: "2024-01-01", aqi: 45 },
    { date: "2024-01-02", aqi: 52 },
    { date: "2024-01-03", aqi: 48 },
    { date: "2024-01-04", aqi: 62 },
    { date: "2024-01-05", aqi: 68 },
    { date: "2024-01-06", aqi: 65 },
    { date: "2024-01-07", aqi: 58 }
  ];

  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "Moderate AQI Alert",
      message: "Air quality index has reached moderate levels. Sensitive individuals should consider limiting outdoor activities.",
      timestamp: "2 hours ago",
      severity: "medium"
    },
    {
      id: 2,
      type: "info",
      title: "Improving Conditions",
      message: "PM10 levels have decreased by 15% compared to yesterday. Air quality is trending better.",
      timestamp: "4 hours ago",
      severity: "low"
    },
    {
      id: 3,
      type: "caution",
      title: "Agricultural Impact Notice",
      message: "Current air quality may affect crop growth. Consider protective measures for sensitive plants.",
      timestamp: "6 hours ago",
      severity: "medium"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "good": return "text-green-600 bg-green-50 border-green-200";
      case "moderate": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "unhealthy": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-red-500" />;
      case "down": return <TrendingDown className="h-4 w-4 text-green-500" />;
      default: return <div className="h-4 w-4 rounded-full bg-gray-400" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "info": return <Leaf className="h-5 w-5 text-blue-500" />;
      case "caution": return <Wind className="h-5 w-5 text-orange-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Pollution Alerts</h1>
          <p className="text-lg text-muted-foreground">Real-time air quality monitoring and environmental alerts</p>
        </div>

        {/* Current AQI */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle>Current Air Quality Index (AQI)</CardTitle>
            <CardDescription>Real-time air quality assessment for your location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full lg:w-auto">
                <div className="text-center">
                  <div className="text-4xl font-bold text-foreground mb-1">{currentAQI.value}</div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${currentAQI.color} ${currentAQI.bgColor} ${currentAQI.borderColor}`}>
                    {currentAQI.level}
                  </div>
                </div>
                <div className="flex-1 max-w-md w-full">
                  <p className="text-sm text-muted-foreground mb-3">{currentAQI.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(currentAQI.value / 150) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                    <span>150+</span>
                  </div>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Bell className="h-4 w-4 mr-2" />
                    Set Alert
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Set AQI Alert</DialogTitle>
                    <DialogDescription>Get notified when AQI exceeds a threshold.</DialogDescription>
                  </DialogHeader>
                  <AlertForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Pollutant Levels */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Pollutant Breakdown</CardTitle>
                <CardDescription>Individual pollutant concentrations and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pollutants.map((pollutant, index) => (
                    <div key={index} className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{pollutant.name}</div>
                        {getTrendIcon(pollutant.trend)}
                      </div>
                      <div className="text-2xl font-bold mb-1">
                        {pollutant.value} <span className="text-sm font-normal text-muted-foreground">{pollutant.unit}</span>
                      </div>
                      <Badge variant="outline" className={getStatusColor(pollutant.status)}>
                        {pollutant.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pollution Sources */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Pollution Sources</CardTitle>
              <CardDescription>Main contributors to air quality</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <Factory className="h-5 w-5 text-gray-600" />
                    <span className="text-sm">Industrial</span>
                  </div>
                  <span className="text-sm font-medium">35%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <Car className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">Vehicle Emissions</span>
                  </div>
                  <span className="text-sm font-medium">40%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <Wind className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Natural</span>
                  </div>
                  <span className="text-sm font-medium">15%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <Leaf className="h-5 w-5 text-orange-600" />
                    <span className="text-sm">Agriculture</span>
                  </div>
                  <span className="text-sm font-medium">10%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* AQI Trend */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>7-Day AQI Trend</CardTitle>
              <CardDescription>Air quality index over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={historicalAQI}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value) => [value, "AQI"]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="aqi" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary) / 0.2)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Active Alerts */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>Latest pollution and air quality notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-3 rounded-lg border bg-card">
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm mb-1">{alert.title}</div>
                        <p className="text-xs text-muted-foreground mb-2 break-words">{alert.message}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                          <Badge 
                            variant={alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "default" : "secondary"}
                            className="text-xs flex-shrink-0"
                          >
                            {alert.severity}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agricultural Impact */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Agricultural Impact Assessment</CardTitle>
            <CardDescription>How current air quality affects farming and crop health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
                <Leaf className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="font-medium text-green-800">Crop Health</div>
                <div className="text-2xl font-bold text-green-600 mb-1">Good</div>
                <p className="text-xs text-green-700">Current air quality has minimal impact on crop growth</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <Wind className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                <div className="font-medium text-yellow-800">Air Circulation</div>
                <div className="text-2xl font-bold text-yellow-600 mb-1">Moderate</div>
                <p className="text-xs text-yellow-700">Some stagnation may affect plant respiration</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200 sm:col-span-2 lg:col-span-1">
                <Factory className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="font-medium text-blue-800">Pollutant Exposure</div>
                <div className="text-2xl font-bold text-blue-600 mb-1">Low</div>
                <p className="text-xs text-blue-700">Acceptable levels for most agricultural activities</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PollutionAlertsPage;