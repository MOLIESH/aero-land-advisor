import { useState, useEffect } from 'react';

export interface PollutionData {
  aqi: number;
  level: 'Good' | 'Moderate' | 'Unhealthy for Sensitive Groups' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

export interface Pollutant {
  name: string;
  value: number;
  unit: string;
  status: 'Good' | 'Moderate' | 'Unhealthy';
  trend: 'up' | 'down' | 'stable';
  limit: number;
}

export interface PollutionAlert {
  id: number;
  type: 'warning' | 'info' | 'caution' | 'danger';
  title: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  isRead: boolean;
}

export interface HistoricalAQI {
  date: string;
  aqi: number;
  timestamp: number;
}

export const usePollutionData = () => {
  const [currentAQI, setCurrentAQI] = useState<PollutionData>({
    aqi: 65,
    level: 'Moderate',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    description: 'Air quality is acceptable; however, there may be a concern for sensitive individuals.'
  });

  const [pollutants, setPollutants] = useState<Pollutant[]>([]);
  const [alerts, setAlerts] = useState<PollutionAlert[]>([]);
  const [historicalData, setHistoricalData] = useState<HistoricalAQI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return { level: 'Good', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' };
    if (aqi <= 100) return { level: 'Moderate', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' };
    if (aqi <= 200) return { level: 'Unhealthy', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' };
    if (aqi <= 300) return { level: 'Very Unhealthy', color: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' };
    return { level: 'Hazardous', color: 'text-red-800', bgColor: 'bg-red-100', borderColor: 'border-red-300' };
  };

  useEffect(() => {
    generatePollutantData();
    generateAlerts();
    generateHistoricalData();
    setIsLoading(false);

    // Update pollution data every 2 minutes
    const interval = setInterval(() => {
      updatePollutionData();
    }, 120000);

    return () => clearInterval(interval);
  }, []);

  const generatePollutantData = () => {
    const pollutantData: Pollutant[] = [
      { name: "PM2.5", value: 25 + Math.random() * 30, unit: "μg/m³", status: "Moderate", trend: "stable", limit: 35 },
      { name: "PM10", value: 40 + Math.random() * 40, unit: "μg/m³", status: "Moderate", trend: "down", limit: 150 },
      { name: "O3", value: 60 + Math.random() * 40, unit: "ppb", status: "Good", trend: "down", limit: 70 },
      { name: "NO2", value: 30 + Math.random() * 20, unit: "ppb", status: "Good", trend: "up", limit: 53 },
      { name: "SO2", value: 5 + Math.random() * 15, unit: "ppb", status: "Good", trend: "stable", limit: 35 },
      { name: "CO", value: 1 + Math.random() * 3, unit: "ppm", status: "Good", trend: "down", limit: 9 }
    ];

    // Update status based on values
    pollutantData.forEach(pollutant => {
      const percentage = (pollutant.value / pollutant.limit) * 100;
      if (percentage <= 50) pollutant.status = "Good";
      else if (percentage <= 100) pollutant.status = "Moderate";
      else pollutant.status = "Unhealthy";
    });

    setPollutants(pollutantData);
  };

  const generateAlerts = () => {
    const alertsData: PollutionAlert[] = [
      {
        id: 1,
        type: "warning",
        title: "Moderate AQI Alert",
        message: "Air quality index has reached moderate levels. Sensitive individuals should consider limiting outdoor activities.",
        timestamp: "2 hours ago",
        severity: "medium",
        isRead: false
      },
      {
        id: 2,
        type: "info",
        title: "Improving Conditions",
        message: "PM10 levels have decreased by 15% compared to yesterday. Air quality is trending better.",
        timestamp: "4 hours ago",
        severity: "low",
        isRead: false
      },
      {
        id: 3,
        type: "caution",
        title: "Agricultural Impact Notice",
        message: "Current air quality may affect crop growth. Consider protective measures for sensitive plants.",
        timestamp: "6 hours ago",
        severity: "medium",
        isRead: true
      },
      {
        id: 4,
        type: "info",
        title: "Weather Change Expected",
        message: "Wind patterns expected to improve air circulation in the next 24 hours.",
        timestamp: "8 hours ago",
        severity: "low",
        isRead: true
      }
    ];

    setAlerts(alertsData);
  };

  const generateHistoricalData = () => {
    const data: HistoricalAQI[] = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        aqi: 45 + Math.random() * 40,
        timestamp: date.getTime()
      });
    }
    
    setHistoricalData(data);
  };

  const updatePollutionData = () => {
    const newAQI = Math.max(20, Math.min(150, currentAQI.aqi + (Math.random() - 0.5) * 20));
    const aqiData = getAQILevel(newAQI);
    
    setCurrentAQI({
      aqi: Math.round(newAQI),
      level: aqiData.level as any,
      color: aqiData.color,
      bgColor: aqiData.bgColor,
      borderColor: aqiData.borderColor,
      description: getAQIDescription(newAQI)
    });

    // Update pollutants
    setPollutants(prev => prev.map(pollutant => ({
      ...pollutant,
      value: Math.max(0, pollutant.value + (Math.random() - 0.5) * 10),
      trend: Math.random() > 0.5 ? (Math.random() > 0.5 ? 'up' : 'down') : 'stable'
    })));
  };

  const getAQIDescription = (aqi: number): string => {
    if (aqi <= 50) return "Air quality is satisfactory, and air pollution poses little or no risk.";
    if (aqi <= 100) return "Air quality is acceptable; however, there may be a concern for sensitive individuals.";
    if (aqi <= 150) return "Members of sensitive groups may experience health effects. The general public is less likely to be affected.";
    if (aqi <= 200) return "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.";
    if (aqi <= 300) return "Health alert: The risk of health effects is increased for everyone.";
    return "Health warning of emergency conditions: everyone is more likely to be affected.";
  };

  const markAlertAsRead = (alertId: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const dismissAlert = (alertId: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const refreshPollutionData = () => {
    setIsLoading(true);
    setTimeout(() => {
      updatePollutionData();
      generatePollutantData();
      setIsLoading(false);
    }, 1000);
  };

  const getUnreadAlertsCount = () => {
    return alerts.filter(alert => !alert.isRead).length;
  };

  return {
    currentAQI,
    pollutants,
    alerts,
    historicalData,
    isLoading,
    updatePollutionData,
    markAlertAsRead,
    dismissAlert,
    refreshPollutionData,
    getUnreadAlertsCount
  };
};