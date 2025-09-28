import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplets, Wind, Sun, CloudRain, Eye } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const WeatherPage = () => {
  // Mock current weather data
  const currentWeather = {
    temperature: 24,
    humidity: 65,
    windSpeed: 12,
    rainfall: 2.5,
    visibility: 10,
    condition: "Partly Cloudy"
  };

  // Mock forecast data
  const weeklyForecast = [
    { day: "Mon", high: 26, low: 18, condition: "Sunny" },
    { day: "Tue", high: 24, low: 16, condition: "Cloudy" },
    { day: "Wed", high: 22, low: 14, condition: "Rainy" },
    { day: "Thu", high: 25, low: 17, condition: "Partly Cloudy" },
    { day: "Fri", high: 27, low: 19, condition: "Sunny" },
    { day: "Sat", high: 23, low: 15, condition: "Cloudy" },
    { day: "Sun", high: 25, low: 18, condition: "Partly Cloudy" }
  ];

  // Mock historical temperature data
  const historicalData = [
    { month: "Jan", avgTemp: 20, rainfall: 45 },
    { month: "Feb", avgTemp: 22, rainfall: 38 },
    { month: "Mar", avgTemp: 25, rainfall: 52 },
    { month: "Apr", avgTemp: 28, rainfall: 68 },
    { month: "May", avgTemp: 30, rainfall: 85 },
    { month: "Jun", avgTemp: 32, rainfall: 125 },
    { month: "Jul", avgTemp: 31, rainfall: 140 },
    { month: "Aug", avgTemp: 30, rainfall: 120 },
    { month: "Sep", avgTemp: 28, rainfall: 95 },
    { month: "Oct", avgTemp: 26, rainfall: 75 },
    { month: "Nov", avgTemp: 23, rainfall: 60 },
    { month: "Dec", avgTemp: 21, rainfall: 50 }
  ];

  const getConditionIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny": return <Sun className="h-5 w-5 text-yellow-500" />;
      case "rainy": return <CloudRain className="h-5 w-5 text-blue-500" />;
      case "cloudy": return <Droplets className="h-5 w-5 text-gray-500" />;
      default: return <Sun className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Weather Insights</h1>
          <p className="text-lg text-muted-foreground">Real-time weather data and forecasts for informed agricultural decisions</p>
        </div>

        {/* Current Conditions */}
        <div className="grid md:grid-cols-6 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
              <Thermometer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentWeather.temperature}°C</div>
              <p className="text-xs text-muted-foreground">Optimal for most crops</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Humidity</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentWeather.humidity}%</div>
              <p className="text-xs text-muted-foreground">Good moisture level</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wind Speed</CardTitle>
              <Wind className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentWeather.windSpeed} km/h</div>
              <p className="text-xs text-muted-foreground">Light breeze</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rainfall</CardTitle>
              <CloudRain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentWeather.rainfall} mm</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visibility</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentWeather.visibility} km</div>
              <p className="text-xs text-muted-foreground">Clear conditions</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Condition</CardTitle>
              {getConditionIcon(currentWeather.condition)}
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold">{currentWeather.condition}</div>
              <Badge variant="secondary" className="mt-1">Favorable</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* 7-Day Forecast */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>7-Day Forecast</CardTitle>
              <CardDescription>Weather outlook for the week ahead</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyForecast.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <div className="font-medium text-sm w-10">{day.day}</div>
                      {getConditionIcon(day.condition)}
                      <div className="text-sm text-muted-foreground">{day.condition}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{day.high}°</span>
                      <span className="text-muted-foreground">{day.low}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Temperature Trend */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Temperature Trend</CardTitle>
              <CardDescription>Historical average temperature by month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="avgTemp" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Rainfall Pattern */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Rainfall Pattern</CardTitle>
            <CardDescription>Monthly rainfall distribution for optimal crop planning</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rainfall" fill="hsl(var(--weather-blue))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherPage;