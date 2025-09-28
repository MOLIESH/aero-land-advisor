import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Ruler, Droplets, Leaf, Filter, ArrowUpDown } from "lucide-react";

type LandArea = {
  id: number;
  name: string;
  region: string;
  state: string;
  sizeHectares: number;
  soilType: string;
  irrigation: "None" | "Drip" | "Sprinkler" | "Flood";
  suitability: "Excellent" | "Good" | "Fair" | "Poor";
};

const AREAS: LandArea[] = [
  // Tamil Nadu Areas (10)
  { id: 1, name: "Cauvery Delta Farm", region: "South", state: "Tamil Nadu", sizeHectares: 95, soilType: "Alluvial", irrigation: "Flood", suitability: "Excellent" },
  { id: 2, name: "Nilgiri Terrace", region: "South", state: "Tamil Nadu", sizeHectares: 40, soilType: "Loam", irrigation: "Sprinkler", suitability: "Good" },
  { id: 3, name: "Coimbatore Plains", region: "South", state: "Tamil Nadu", sizeHectares: 120, soilType: "Red Soil", irrigation: "Drip", suitability: "Excellent" },
  { id: 4, name: "Madurai Fields", region: "South", state: "Tamil Nadu", sizeHectares: 85, soilType: "Black Soil", irrigation: "Sprinkler", suitability: "Good" },
  { id: 5, name: "Salem Agricultural Zone", region: "South", state: "Tamil Nadu", sizeHectares: 65, soilType: "Red Loam", irrigation: "Drip", suitability: "Good" },
  { id: 6, name: "Tirunelveli Estate", region: "South", state: "Tamil Nadu", sizeHectares: 75, soilType: "Alluvial", irrigation: "Flood", suitability: "Excellent" },
  { id: 7, name: "Erode Farmlands", region: "South", state: "Tamil Nadu", sizeHectares: 50, soilType: "Red Soil", irrigation: "Sprinkler", suitability: "Good" },
  { id: 8, name: "Tiruchirapalli Basin", region: "South", state: "Tamil Nadu", sizeHectares: 110, soilType: "Alluvial", irrigation: "Flood", suitability: "Excellent" },
  { id: 9, name: "Kanchipuram Fields", region: "South", state: "Tamil Nadu", sizeHectares: 45, soilType: "Red Loam", irrigation: "Drip", suitability: "Fair" },
  { id: 10, name: "Thanjavur Delta", region: "South", state: "Tamil Nadu", sizeHectares: 130, soilType: "Alluvial", irrigation: "Flood", suitability: "Excellent" },
  { id: 11, name: "Vellore Agricultural Plot", region: "South", state: "Tamil Nadu", sizeHectares: 35, soilType: "Red Soil", irrigation: "Sprinkler", suitability: "Fair" },
  { id: 12, name: "Dindigul Farm", region: "South", state: "Tamil Nadu", sizeHectares: 60, soilType: "Black Soil", irrigation: "Drip", suitability: "Good" },
  
  // Other States
  { id: 13, name: "Godavari Plains", region: "South", state: "Andhra Pradesh", sizeHectares: 180, soilType: "Alluvial", irrigation: "Flood", suitability: "Excellent" },
  { id: 14, name: "Konkan Coastal Plot", region: "West", state: "Maharashtra", sizeHectares: 60, soilType: "Laterite", irrigation: "Drip", suitability: "Good" },
  { id: 15, name: "Ganga Basin Field", region: "North", state: "Uttar Pradesh", sizeHectares: 150, soilType: "Alluvial", irrigation: "Flood", suitability: "Good" },
  { id: 16, name: "Doaba Greens", region: "North", state: "Punjab", sizeHectares: 110, soilType: "Loam", irrigation: "Sprinkler", suitability: "Excellent" },
  { id: 17, name: "Sundarbans Edge", region: "East", state: "West Bengal", sizeHectares: 55, soilType: "Silty Clay", irrigation: "None", suitability: "Fair" },
  { id: 18, name: "Aravalli Foothills", region: "West", state: "Rajasthan", sizeHectares: 75, soilType: "Sandy", irrigation: "Drip", suitability: "Fair" },
];

const getSuitabilityBadgeVariant = (s: LandArea["suitability"]) => {
  switch (s) {
    case "Excellent":
      return "default" as const;
    case "Good":
      return "secondary" as const;
    case "Fair":
      return "outline" as const;
    default:
      return "outline" as const;
  }
};

const normalize = (value: string) => value.toLowerCase().trim();

const LandAreasPage = () => {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "size" | "suitability">("name");
  const [filterState, setFilterState] = useState<string>("all");
  const [filterSuitability, setFilterSuitability] = useState<string>("all");

  const results = useMemo(() => {
    let filtered = AREAS;
    
    // Text search
    const q = normalize(query);
    if (q) {
      filtered = filtered.filter((a) => {
        const haystack = [
          a.name,
          a.region,
          a.state,
          a.soilType,
          a.irrigation,
          a.suitability,
          String(a.sizeHectares),
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
    }

    // State filter
    if (filterState !== "all") {
      filtered = filtered.filter((a) => a.state === filterState);
    }

    // Suitability filter
    if (filterSuitability !== "all") {
      filtered = filtered.filter((a) => a.suitability === filterSuitability);
    }

    // Sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "size":
          return b.sizeHectares - a.sizeHectares;
        case "suitability":
          const order = { "Excellent": 4, "Good": 3, "Fair": 2, "Poor": 1 };
          return order[b.suitability] - order[a.suitability];
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [query, sortBy, filterState, filterSuitability]);

  const states = Array.from(new Set(AREAS.map(a => a.state))).sort();
  const suitabilities = ["Excellent", "Good", "Fair", "Poor"];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Land Areas</h1>
          <p className="text-lg text-muted-foreground">Search and explore available land areas and their characteristics</p>
        </div>

        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle>Search Land Areas</CardTitle>
            <CardDescription>Find by name, state (e.g. Tamil Nadu), region, soil, irrigation, or suitability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search e.g. 'Tamil Nadu', 'Loam', 'North', '120'"
                className="pl-9"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">State</label>
                <Select value={filterState} onValueChange={setFilterState}>
                  <SelectTrigger>
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {states.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Suitability</label>
                <Select value={filterSuitability} onValueChange={setFilterSuitability}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Suitability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Suitability</SelectItem>
                    {suitabilities.map(suit => (
                      <SelectItem key={suit} value={suit}>{suit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={(value: "name" | "size" | "suitability") => setSortBy(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="size">Size (Largest First)</SelectItem>
                    <SelectItem value="suitability">Suitability (Best First)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">{results.length} result{results.length === 1 ? "" : "s"}</div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setQuery("");
                  setFilterState("all");
                  setFilterSuitability("all");
                  setSortBy("name");
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {results.length === 0 ? (
          <div className="text-center py-16 border rounded-lg bg-muted/30">
            <div className="text-foreground font-medium mb-1">No land areas found</div>
            <div className="text-sm text-muted-foreground">Try different keywords or clear the search</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {results.map((a) => (
              <Card key={a.id} className="shadow-card hover:shadow-elevated transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg truncate">{a.name}</CardTitle>
                      <CardDescription className="truncate">{a.region} Region</CardDescription>
                    </div>
                    <Badge variant={getSuitabilityBadgeVariant(a.suitability)} className="ml-2 flex-shrink-0">{a.suitability}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium text-foreground truncate">{a.region}, {a.state}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ruler className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-medium text-foreground">{a.sizeHectares} ha</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">Soil:</span>
                      <span className="font-medium text-foreground">{a.soilType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">Irrigation:</span>
                      <span className="font-medium text-foreground">{a.irrigation}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Below Recommendations Section */}
        <div className="mt-12">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Below Recommendations</CardTitle>
              <CardDescription>Land areas with lower suitability scores that may still be viable options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {AREAS.filter(a => a.suitability === "Fair" || a.suitability === "Poor").map((a) => (
                  <Card key={`below-${a.id}`} className="border-orange-200 bg-orange-50/30">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-lg truncate">{a.name}</CardTitle>
                          <CardDescription className="truncate">{a.region} Region</CardDescription>
                        </div>
                        <Badge variant="outline" className="ml-2 flex-shrink-0 border-orange-300 text-orange-700">{a.suitability}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-muted-foreground">Location:</span>
                          <span className="font-medium text-foreground truncate">{a.region}, {a.state}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ruler className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-muted-foreground">Size:</span>
                          <span className="font-medium text-foreground">{a.sizeHectares} ha</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-muted-foreground">Soil:</span>
                          <span className="font-medium text-foreground">{a.soilType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-muted-foreground">Irrigation:</span>
                          <span className="font-medium text-foreground">{a.irrigation}</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-orange-200">
                        <p className="text-xs text-orange-700">
                          {a.suitability === "Fair" 
                            ? "May require additional investment or specific conditions" 
                            : "Consider for alternative uses or with significant improvements"
                          }
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandAreasPage;


