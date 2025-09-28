import { useState, useEffect } from 'react';

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  rainfall: number;
  visibility: number;
  condition: string;
  pressure: number;
  uvIndex: number;
}

export interface ForecastDay {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: string;
  precipitation: number;
  windSpeed: number;
  humidity: number;
}

export interface HistoricalDataPoint {
  month: string;
  avgTemp: number;
  rainfall: number;
  humidity: number;
}

export const useWeatherData = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData>({
    temperature: 24,
    humidity: 65,
    windSpeed: 12,
    rainfall: 2.5,
    visibility: 10,
    condition: "Partly Cloudy",
    pressure: 1013,
    uvIndex: 6
  });

  const [weeklyForecast, setWeeklyForecast] = useState<ForecastDay[]>([]);
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate real-time weather updates
  useEffect(() => {
    const updateWeather = () => {
      setCurrentWeather(prev => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 10)),
        windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5) * 4),
        pressure: prev.pressure + (Math.random() - 0.5) * 5,
      }));
    };

    // Generate initial forecast data
    const generateForecast = () => {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Heavy Rain'];
      
      const forecast = days.map((day, index) => {
        const baseTemp = 25 + (Math.random() - 0.5) * 10;
        const date = new Date();
        date.setDate(date.getDate() + index);
        
        return {
          day,
          date: date.toISOString().split('T')[0],
          high: Math.round(baseTemp + Math.random() * 5),
          low: Math.round(baseTemp - Math.random() * 8),
          condition: conditions[Math.floor(Math.random() * conditions.length)],
          precipitation: Math.round(Math.random() * 15),
          windSpeed: Math.round(5 + Math.random() * 15),
          humidity: Math.round(45 + Math.random() * 40)
        };
      });
      
      setWeeklyForecast(forecast);
    };

    // Generate historical data
    const generateHistoricalData = () => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const data = months.map(month => ({
        month,
        avgTemp: Math.round(18 + Math.random() * 15),
        rainfall: Math.round(30 + Math.random() * 120),
        humidity: Math.round(45 + Math.random() * 30)
      }));
      
      setHistoricalData(data);
    };

    generateForecast();
    generateHistoricalData();
    setIsLoading(false);

    // Update weather every 30 seconds
    const interval = setInterval(updateWeather, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const refreshWeatherData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentWeather(prev => ({
        ...prev,
        temperature: 20 + Math.random() * 15,
        humidity: 40 + Math.random() * 50,
        windSpeed: Math.random() * 25,
        rainfall: Math.random() * 10,
        visibility: 8 + Math.random() * 7,
        pressure: 995 + Math.random() * 35,
        uvIndex: Math.round(Math.random() * 11)
      }));
      setIsLoading(false);
    }, 1000);
  };

  return {
    currentWeather,
    weeklyForecast,
    historicalData,
    isLoading,
    refreshWeatherData
  };
};