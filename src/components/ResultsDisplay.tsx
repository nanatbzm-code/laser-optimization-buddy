import { LaserCalculationResult, LaserInputParams } from "@/utils/laserCalculations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Activity, Clock, Target, DollarSign, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ResultsDisplayProps {
  results: LaserCalculationResult;
  inputs: LaserInputParams;
}

const ResultsDisplay = ({ results, inputs }: ResultsDisplayProps) => {
  const renderCostStars = (level: number) => {
    return "★".repeat(level) + "☆".repeat(4 - level);
  };

  if (!results || results.length === 0) {
    return (
      <Card className="shadow-glow border-primary/20">
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">هیچ روش مناسبی یافت نشد.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Input Summary Card */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="space-y-1">
              <span className="text-muted-foreground text-xs">جنس ماده</span>
              <p className="font-semibold text-foreground">{inputs.material}</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground text-xs">ضخامت</span>
              <p className="font-semibold text-foreground">{inputs.thickness} mm</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground text-xs">نوع عملیات</span>
              <p className="font-semibold text-foreground">{inputs.process}</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground text-xs">اولویت</span>
              <p className="font-semibold text-foreground">{inputs.priority}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Methods Results */}
      <div className="space-y-4">
        {results.map((method, index) => (
          <Card 
            key={index} 
            className={`shadow-lg border-2 transition-all duration-300 hover:shadow-glow hover:scale-[1.02] ${
              index === 0 
                ? 'border-primary/40 bg-gradient-to-br from-primary/10 to-transparent' 
                : 'border-primary/20'
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <Badge 
                    variant={index === 0 ? "default" : "secondary"} 
                    className="text-lg px-3 py-1"
                  >
                    رتبه {method.rank}
                  </Badge>
                  <div>
                    <CardTitle className="text-xl gradient-text">
                      {method.method}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {method.laserType}
                    </p>
                  </div>
                </div>
                {index === 0 && (
                  <Award className="h-8 w-8 text-primary animate-float" />
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Main Parameters Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="bg-secondary/30 rounded-lg p-3 border border-primary/10">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Zap className="h-3.5 w-3.5" />
                    <span className="text-xs">توان لیزر</span>
                  </div>
                  <p className="text-lg font-bold">{method.laserPower} W</p>
                </div>

                <div className="bg-secondary/30 rounded-lg p-3 border border-primary/10">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-xs">زمان پالس</span>
                  </div>
                  <p className="text-sm font-bold leading-tight">{method.pulseTime}</p>
                </div>

                {method.pulseRate && (
                  <div className="bg-secondary/30 rounded-lg p-3 border border-primary/10">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Activity className="h-3.5 w-3.5" />
                      <span className="text-xs">نرخ پالس</span>
                    </div>
                    <p className="text-sm font-bold leading-tight">{method.pulseRate}</p>
                  </div>
                )}

                <div className="bg-secondary/30 rounded-lg p-3 border border-primary/10">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Activity className="h-3.5 w-3.5" />
                    <span className="text-xs">سرعت</span>
                  </div>
                  <p className="text-lg font-bold">{method.feedRate} mm/s</p>
                </div>

                {method.accuracy && (
                  <div className="bg-secondary/30 rounded-lg p-3 border border-primary/10">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Target className="h-3.5 w-3.5" />
                      <span className="text-xs">دقت</span>
                    </div>
                    <p className="text-lg font-bold">{method.accuracy}</p>
                  </div>
                )}

                <div className="bg-secondary/30 rounded-lg p-3 border border-primary/10">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <DollarSign className="h-3.5 w-3.5" />
                    <span className="text-xs">هزینه</span>
                  </div>
                  <p className="text-xl font-bold text-yellow-500">
                    {renderCostStars(method.costLevel)}
                  </p>
                </div>
              </div>

              {/* Equipment and Source */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-primary/10">
                <div>
                  <span className="text-xs text-muted-foreground">دستگاه پیشنهادی:</span>
                  <p className="font-medium text-sm mt-1">{method.equipment}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">پیشنهاد برای:</span>
                  <p className="font-medium text-sm mt-1">
                    <Badge variant="outline" className="text-xs">
                      {method.recommendedFor}
                    </Badge>
                  </p>
                </div>
                {method.source && (
                  <div className="md:col-span-2">
                    <span className="text-xs text-muted-foreground">منبع:</span>
                    <p className="text-xs mt-1 text-muted-foreground italic">{method.source}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;
