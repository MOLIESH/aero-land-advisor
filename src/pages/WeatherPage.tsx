import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Thermometer, Droplets, Wind, Sun, CloudRain, Eye, RefreshCw, Gauge } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useWeatherData } from "@/hooks/useWeatherData";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const WeatherPage = () => {
  const { currentWeather, weeklyForecast, historicalData, isLoading, refreshWeatherData } = useWeatherData();

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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Weather Insights</h1>
            <p className="text-lg text-muted-foreground">Real-time weather data and forecasts for informed agricultural decisions</p>
          </div>
          <Button onClick={refreshWeatherData} disabled={isLoading} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {/* Current Conditions */}
            <div className="grid md:grid-cols-6 gap-6 mb-8">
              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                  <Thermometer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round(currentWeather.temperature)}°C</div>
                  <p className="text-xs text-muted-foreground">
                    {currentWeather.temperature > 25 ? "Warm for crops" : "Optimal for most crops"}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Humidity</CardTitle>
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round(currentWeather.humidity)}%</div>
                  <p className="text-xs text-muted-foreground">
                    {currentWeather.humidity > 70 ? "High moisture" : "Good moisture level"}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Wind Speed</CardTitle>
                  <Wind className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round(currentWeather.windSpeed)} km/h</div>
                  <p className="text-xs text-muted-foreground">
                    {currentWeather.windSpeed > 20 ? "Strong breeze" : "Light breeze"}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rainfall</CardTitle>
                  <CloudRain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentWeather.rainfall.toFixed(1)} mm</div>
                  <p className="text-xs text-muted-foreground">Last 24 hours</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pressure</CardTitle>
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round(currentWeather.pressure)} hPa</div>
                  <p className="text-xs text-muted-foreground">
                    {currentWeather.pressure > 1013 ? "High pressure" : "Normal pressure"}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">UV Index</CardTitle>
                  {getConditionIcon(currentWeather.condition)}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentWeather.uvIndex}</div>
                  <Badge variant={currentWeather.uvIndex > 7 ? "destructive" : "secondary"} className="mt-1">
                    {currentWeather.uvIndex > 7 ? "High" : "Moderate"}
                  </Badge>
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
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="font-medium text-sm w-10">{day.day}</div>
                          {getConditionIcon(day.condition)}
                          <div>
                            <div className="text-sm font-medium">{day.condition}</div>
                            <div className="text-xs text-muted-foreground">{day.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-right">
                          <div className="text-xs text-muted-foreground">
                            <div>Wind: {day.windSpeed} km/h</div>
                            <div>Humidity: {day.humidity}%</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{day.high}°</span>
                            <span className="text-muted-foreground">{day.low}°</span>
                          </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;