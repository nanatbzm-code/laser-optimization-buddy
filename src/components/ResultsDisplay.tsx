import { LaserCalculationResult, LaserInputParams } from "@/utils/laserCalculations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Gauge, Maximize2, Activity } from "lucide-react";

interface ResultsDisplayProps {
  results: LaserCalculationResult;
  inputs: LaserInputParams;
}

const ResultsDisplay = ({ results, inputs }: ResultsDisplayProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-glow border-primary/20">
        <CardHeader className="bg-gradient-secondary relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
          <div className="flex items-center gap-3 relative z-10">
            <Activity className="h-6 w-6 text-primary animate-float" />
            <CardTitle className="text-xl">نتایج محاسبات</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Results Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Laser Type */}
            <Card className="border-2 border-primary/30 shadow-md hover:shadow-glow transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg"></div>
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Zap className="h-4 w-4" />
                    <span className="text-sm">نوع لیزر</span>
                  </div>
                  <div className="text-2xl font-bold gradient-text">
                    {results.laserType}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Laser Power */}
            <Card className="border-2 border-blue-500/30 shadow-md hover:shadow-glow transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-lg"></div>
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Activity className="h-4 w-4" />
                    <span className="text-sm">توان لیزر</span>
                  </div>
                  <div className="text-2xl font-bold gradient-text">
                    {results.laserPower} W
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Max Feed Rate */}
            <Card className="border-2 border-green-500/30 shadow-md hover:shadow-glow transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-lg"></div>
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Gauge className="h-4 w-4" />
                    <span className="text-sm">نرخ پیشروی</span>
                  </div>
                  <div className="text-2xl font-bold gradient-text">
                    {results.maxFeedRate} mm/s
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Beam Width */}
            <Card className="border-2 border-purple-500/30 shadow-md hover:shadow-glow transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-lg"></div>
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Maximize2 className="h-4 w-4" />
                    <span className="text-sm">عرض بیم لیزر</span>
                  </div>
                  <div className="text-2xl font-bold gradient-text">
                    {results.beamWidth} mm
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Input Summary */}
          <Card className="mt-6 border border-primary/10 bg-secondary/30">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 text-sm text-muted-foreground">ورودی‌های محاسبه:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">نوع ماده:</span>
                  <span className="font-medium mr-2">{inputs.material}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">ضخامت:</span>
                  <span className="font-medium mr-2">{inputs.thickness} mm</span>
                </div>
                <div>
                  <span className="text-muted-foreground">نوع عملیات:</span>
                  <span className="font-medium mr-2">{inputs.process}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
