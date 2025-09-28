import { useState, useEffect } from 'react';
import { Wheat, Sprout, Zap, Bean, Apple, Sun, TrendingUp, Droplets, Thermometer, TreePine, Gauge } from 'lucide-react';

export interface CropRecommendation {
  id: number;
  crop: string;
  suitability: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  icon: any;
  reason: string;
  benefits: string[];
  riskLevel: 'Very Low' | 'Low' | 'Medium' | 'High';
  expectedYield: string;
  badge: string;
  badgeVariant: 'default' | 'secondary' | 'outline';
  marketPrice: number;
  marketTrend: 'up' | 'down' | 'stable';
  waterRequirement: 'Low' | 'Medium' | 'High';
  growthPeriod: string;
}

export interface LandCondition {
  label: string;
  value: string;
  status: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  icon: any;
  details: string;
}

export const useLandRecommendations = () => {
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [landConditions, setLandConditions] = useState<LandCondition[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    season: 'all',
    riskLevel: 'all',
    waterRequirement: 'all'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateRecommendations();
    generateLandConditions();
  }, [selectedFilters]);

  const generateRecommendations = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const allRecommendations = [
        {
          id: 1,
          crop: "Wheat",
          icon: Wheat,
          suitability: "Excellent" as const,
          reason: "Current weather patterns show optimal temperature (22-26°C) and moderate rainfall perfect for wheat cultivation. Historical data indicates 95% success rate.",
          benefits: ["High yield potential", "Suitable soil moisture", "Optimal growing season", "Good market demand"],
          riskLevel: "Low" as const,
          expectedYield: "4.2 tons/hectare",
          badge: "Recommended",
          badgeVariant: "default" as const,
          marketPrice: 320,
          marketTrend: "up" as const,
          waterRequirement: "Medium" as const,
          growthPeriod: "4-6 months"
        },
        {
          id: 2,
          crop: "Rice",
          icon: Sprout,
          suitability: "Good" as const,
          reason: "Adequate rainfall and temperature conditions support rice cultivation. Water availability is sufficient for paddy requirements.",
          benefits: ["Staple crop", "High water availability", "Consistent demand", "Multiple varieties"],
          riskLevel: "Medium" as const,
          expectedYield: "6.8 tons/hectare",
          badge: "Water Intensive",
          badgeVariant: "secondary" as const,
          marketPrice: 280,
          marketTrend: "stable" as const,
          waterRequirement: "High" as const,
          growthPeriod: "3-5 months"
        },
        {
          id: 3,
          crop: "Corn",
          icon: Zap,
          suitability: "Excellent" as const,
          reason: "Temperature and humidity levels are ideal for corn growth. Soil conditions are well-suited for deep root development.",
          benefits: ["Versatile crop", "Good drought tolerance", "Multiple uses", "Strong market"],
          riskLevel: "Low" as const,
          expectedYield: "8.5 tons/hectare",
          badge: "High Yield",
          badgeVariant: "default" as const,
          marketPrice: 250,
          marketTrend: "up" as const,
          waterRequirement: "Medium" as const,
          growthPeriod: "3-4 months"
        },
        {
          id: 4,
          crop: "Soybeans",
          icon: Bean,
          suitability: "Good" as const,
          reason: "Nitrogen-fixing capabilities make soybeans excellent for soil health. Current conditions support good protein development.",
          benefits: ["Soil improvement", "High protein content", "Export potential", "Nitrogen fixation"],
          riskLevel: "Low" as const,
          expectedYield: "2.8 tons/hectare",
          badge: "Soil Enhancer",
          badgeVariant: "outline" as const,
          marketPrice: 450,
          marketTrend: "up" as const,
          waterRequirement: "Low" as const,
          growthPeriod: "3-4 months"
        },
        {
          id: 5,
          crop: "Tomatoes",
          icon: Apple,
          suitability: "Fair" as const,
          reason: "Greenhouse cultivation recommended due to weather variability. Good potential for high-value crop production.",
          benefits: ["High value crop", "Year-round production", "Local market demand", "Processing options"],
          riskLevel: "Medium" as const,
          expectedYield: "45 tons/hectare",
          badge: "High Value",
          badgeVariant: "secondary" as const,
          marketPrice: 800,
          marketTrend: "stable" as const,
          waterRequirement: "High" as const,
          growthPeriod: "2-3 months"
        },
        {
          id: 6,
          crop: "Sunflowers",
          icon: Sun,
          suitability: "Good" as const,
          reason: "Drought-resistant crop suitable for current rainfall patterns. Good for oil production and bird feed markets.",
          benefits: ["Drought resistant", "Oil production", "Low maintenance", "Pollinator friendly"],
          riskLevel: "Very Low" as const,
          expectedYield: "2.2 tons/hectare",
          badge: "Eco-Friendly",
          badgeVariant: "outline" as const,
          marketPrice: 380,
          marketTrend: "stable" as const,
          waterRequirement: "Low" as const,
          growthPeriod: "3-4 months"
        }
      ];

      // Apply filters
      let filteredRecommendations = allRecommendations;
      
      if (selectedFilters.riskLevel !== 'all') {
        filteredRecommendations = filteredRecommendations.filter(
          rec => rec.riskLevel.toLowerCase().replace(' ', '_') === selectedFilters.riskLevel
        );
      }
      
      if (selectedFilters.waterRequirement !== 'all') {
        filteredRecommendations = filteredRecommendations.filter(
          rec => rec.waterRequirement.toLowerCase() === selectedFilters.waterRequirement
        );
      }

      setRecommendations(filteredRecommendations);
      setIsLoading(false);
    }, 800);
  };

  const generateLandConditions = () => {
    const conditions = [
      { 
        label: "Soil pH", 
        value: (6.5 + Math.random() * 1).toFixed(1), 
        status: "Good" as const, 
        icon: Gauge,
        details: "Slightly acidic to neutral, suitable for most crops"
      },
      { 
        label: "Moisture Level", 
        value: `${Math.round(60 + Math.random() * 20)}%`, 
        status: "Excellent" as const,
        icon: Droplets,
        details: "Optimal moisture retention for plant growth"
      },
      { 
        label: "Sun Exposure", 
        value: `${Math.round(7 + Math.random() * 2)} hrs/day`, 
        status: "Good" as const,
        icon: Sun,
        details: "Adequate sunlight for photosynthesis"
      },
      { 
        label: "Drainage", 
        value: "Well-drained", 
        status: "Excellent" as const,
        icon: TrendingUp,
        details: "Good water permeability prevents root rot"
      },
      { 
        label: "Organic Matter", 
        value: `${(2.5 + Math.random() * 1.5).toFixed(1)}%`, 
        status: "Good" as const,
        icon: TreePine,
        details: "Adequate organic content for soil fertility"
      },
      { 
        label: "Soil Temperature", 
        value: `${Math.round(18 + Math.random() * 8)}°C`, 
        status: "Good" as const,
        icon: Thermometer,
        details: "Temperature range suitable for seed germination"
      }
    ];
    
    setLandConditions(conditions);
  };

  const updateFilters = (newFilters: Partial<typeof selectedFilters>) => {
    setSelectedFilters(prev => ({ ...prev, ...newFilters }));
  };

  const getCropDetails = (cropId: number) => {
    return recommendations.find(rec => rec.id === cropId);
  };

  return {
    recommendations,
    landConditions,
    selectedFilters,
    isLoading,
    updateFilters,
    getCropDetails,
    refreshRecommendations: generateRecommendations
  };
};