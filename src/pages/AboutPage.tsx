import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">About AEROWISE</h1>
          <p className="text-lg text-muted-foreground">Smart agriculture insights for weather, land, and environment</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>Empowering farmers with intelligence</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                AEROWISE helps farmers make data-driven decisions by combining real-time weather, land suitability, and environmental
                monitoring into a single, easy-to-use platform.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>What You Can Do</CardTitle>
              <CardDescription>Key capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Analyze weather patterns and forecasts tailored to agriculture</li>
                <li>Get AI-powered crop and land use recommendations</li>
                <li>Monitor pollution and environmental impacts</li>
                <li>Search land areas by region, state, soil, and irrigation</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;


