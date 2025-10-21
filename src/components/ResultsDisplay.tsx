import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Activity, Clock, Zap, Target, Gauge, Maximize2 } from "lucide-react";
import { LaserCalculationResult } from "@/utils/laserCalculations";
import { LaserInputParams } from "@/utils/laserCalculations";
import { Progress } from "@/components/ui/progress";

interface ResultsDisplayProps {
  results: LaserCalculationResult;
  inputs: LaserInputParams;
}

const ResultsDisplay = ({ results, inputs }: ResultsDisplayProps) => {
  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "عالی":
        return "bg-success text-success-foreground";
      case "خوب":
        return "bg-accent text-accent-foreground";
      case "متوسط":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-destructive text-destructive-foreground";
    }
  };

  const powerDiff = ((results.recommendedPower - inputs.power) / inputs.power) * 100;
  const pulseDiff = ((results.recommendedPulseRate - inputs.pulseRate) / inputs.pulseRate) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Primary Output Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md border-accent/20 hover:shadow-glow transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="h-4 w-4 text-accent" />
              نوع لیزر
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="absolute inset-0 bg-gradient-accent opacity-5 rounded-lg"></div>
            <div className="space-y-2 relative z-10">
              <div className="text-2xl font-bold text-foreground">
                {results.laserType}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-primary/20 hover:shadow-glow transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              توان لیزر
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-lg"></div>
            <div className="space-y-2 relative z-10">
              <div className="text-3xl font-bold gradient-text">
                {results.laserPower}
                <span className="text-lg text-muted-foreground ml-1">W</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-success/20 hover:shadow-glow transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Gauge className="h-4 w-4 text-success" />
              حداکثر نرخ پیشروی
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="absolute inset-0 bg-gradient-accent opacity-5 rounded-lg"></div>
            <div className="space-y-2 relative z-10">
              <div className="text-3xl font-bold gradient-text">
                {results.maxFeedRate}
                <span className="text-lg text-muted-foreground ml-1">mm/min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-warning/20 hover:shadow-glow transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Maximize2 className="h-4 w-4 text-warning" />
              عرض بیم لیزر
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="absolute inset-0 bg-gradient-card opacity-5 rounded-lg"></div>
            <div className="space-y-2 relative z-10">
              <div className="text-3xl font-bold gradient-text">
                {results.beamWidth}
                <span className="text-lg text-muted-foreground ml-1">mm</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-md border-primary/20 hover:shadow-glow transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              توان پیشنهادی
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-lg"></div>
            <div className="space-y-2 relative z-10">
              <div className="text-3xl font-bold gradient-text">
                {results.recommendedPower}
                <span className="text-lg text-muted-foreground ml-1">W</span>
              </div>
              {Math.abs(powerDiff) > 5 && (
                <Badge
                  variant={powerDiff > 0 ? "destructive" : "default"}
                  className="text-xs"
                >
                  {powerDiff > 0 ? "+" : ""}
                  {powerDiff.toFixed(1)}% نسبت به ورودی
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-accent/20 hover:shadow-glow-accent transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4 text-accent" />
              نرخ پالس پیشنهادی
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="absolute inset-0 bg-gradient-accent opacity-5 rounded-lg"></div>
            <div className="space-y-2 relative z-10">
              <div className="text-3xl font-bold gradient-text">
                {results.recommendedPulseRate.toLocaleString()}
                <span className="text-lg text-muted-foreground ml-1">Hz</span>
              </div>
              {Math.abs(pulseDiff) > 5 && (
                <Badge
                  variant={pulseDiff > 0 ? "destructive" : "default"}
                  className="text-xs"
                >
                  {pulseDiff > 0 ? "+" : ""}
                  {pulseDiff.toFixed(1)}% نسبت به ورودی
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-success/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              زمان عملیات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {results.calculatedTime}
              <span className="text-lg text-muted-foreground ml-1">ثانیه</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {(results.calculatedTime / 60).toFixed(1)} دقیقه
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Results */}
      <Card className="shadow-lg border-border/50">
        <CardHeader className="bg-gradient-secondary">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            نتایج تفصیلی
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Energy Consumption */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">مصرف انرژی</span>
              <span className="text-2xl font-bold text-primary">
                {results.energyConsumption.toFixed(3)} kWh
              </span>
            </div>
            <Progress value={Math.min((results.energyConsumption * 100) / 10, 100)} className="h-2" />
            <p className="text-xs text-muted-foreground">
              هزینه تقریبی: {(results.energyConsumption * 1500).toFixed(0)} تومان (با نرخ 1500 تومان/کیلووات‌ساعت)
            </p>
          </div>

          {/* Quality Estimate */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-foreground block">برآورد کیفیت</span>
            <Badge className={`${getQualityColor(results.qualityEstimate)} text-base px-4 py-1`}>
              {results.qualityEstimate}
            </Badge>
          </div>

          {/* Penetration Estimate */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-foreground block">برآورد نفوذ</span>
            <p className="text-foreground bg-secondary p-3 rounded-lg border border-border">
              {results.penetrationEstimate}
            </p>
          </div>

          {/* Matched Material Info */}
          {results.matchedMaterial && (
            <div className="space-y-2 pt-4 border-t border-border">
              <span className="text-sm font-medium text-foreground block">اطلاعات پایگاه داده</span>
              <div className="bg-accent/10 p-4 rounded-lg space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-muted-foreground">دستگاه‌های مرتبط:</span>
                    <p className="text-foreground font-medium">{results.matchedMaterial.equipment}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">محدوده ضخامت:</span>
                    <p className="text-foreground font-medium">
                      {results.matchedMaterial.thicknessMin}-{results.matchedMaterial.thicknessMax} mm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Warnings */}
      {results.warnings.length > 0 && (
        <Card className="shadow-lg border-warning/50">
          <CardHeader className="bg-warning/10">
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              هشدارها و توصیه‌ها
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {results.warnings.map((warning, index) => (
                <Alert key={index} className="border-warning/30">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <AlertDescription className="text-foreground mr-2">
                    {warning}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResultsDisplay;
