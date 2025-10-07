import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Calculator, AlertTriangle, CheckCircle2, Zap } from "lucide-react";
import { calculateLaserParameters, LaserInputParams } from "@/utils/laserCalculations";
import { materialsDatabase } from "@/data/materialsDatabase";
import ResultsDisplay from "./ResultsDisplay";

const LaserCalculator = () => {
  const [inputs, setInputs] = useState<LaserInputParams>({
    material: "",
    thickness: 0,
    process: "",
    laserType: "",
    speed: 0,
    pathLength: 0,
    pulseRate: 0,
    power: 0,
  });

  const [results, setResults] = useState<ReturnType<typeof calculateLaserParameters> | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Listen for test case loading events
  useEffect(() => {
    const handleLoadTestCase = (event: CustomEvent<LaserInputParams>) => {
      setInputs(event.detail);
      setShowResults(false);
    };

    window.addEventListener("loadTestCase" as any, handleLoadTestCase);
    return () => {
      window.removeEventListener("loadTestCase" as any, handleLoadTestCase);
    };
  }, []);

  const processes = ["حکاکی", "برشکاری", "جوشکاری"];
  const laserTypes = ["لیزر فایبر", "CO₂ لیزر", "لیزر UV"];
  
  const materials = Array.from(
    new Set(materialsDatabase.map((m) => m.material))
  );

  const handleCalculate = () => {
    const result = calculateLaserParameters(inputs, materialsDatabase);
    setResults(result);
    setShowResults(true);
  };

  const isFormValid = () => {
    return (
      inputs.material &&
      inputs.thickness > 0 &&
      inputs.process &&
      inputs.laserType &&
      inputs.speed > 0 &&
      inputs.pulseRate > 0 &&
      inputs.power > 0
    );
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-border/50">
        <CardHeader className="bg-gradient-primary text-primary-foreground">
          <div className="flex items-center gap-3">
            <Calculator className="h-6 w-6" />
            <div>
              <CardTitle className="text-2xl">محاسبه‌گر پارامترهای لیزر</CardTitle>
              <CardDescription className="text-primary-foreground/80 mt-1">
                ورود مشخصات عملیات و دریافت توصیه‌های بهینه
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Process Type */}
            <div className="space-y-2">
              <Label htmlFor="process" className="text-foreground font-medium">
                نوع عملیات
              </Label>
              <Select
                value={inputs.process}
                onValueChange={(value) => setInputs({ ...inputs, process: value })}
              >
                <SelectTrigger id="process" className="bg-background">
                  <SelectValue placeholder="انتخاب کنید..." />
                </SelectTrigger>
                <SelectContent>
                  {processes.map((process) => (
                    <SelectItem key={process} value={process}>
                      {process}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Material */}
            <div className="space-y-2">
              <Label htmlFor="material" className="text-foreground font-medium">
                نوع ماده
              </Label>
              <Select
                value={inputs.material}
                onValueChange={(value) => setInputs({ ...inputs, material: value })}
              >
                <SelectTrigger id="material" className="bg-background">
                  <SelectValue placeholder="انتخاب کنید..." />
                </SelectTrigger>
                <SelectContent>
                  {materials.map((material) => (
                    <SelectItem key={material} value={material}>
                      {material}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Thickness */}
            <div className="space-y-2">
              <Label htmlFor="thickness" className="text-foreground font-medium">
                ضخامت (میلی‌متر)
              </Label>
              <Input
                id="thickness"
                type="number"
                step="0.1"
                min="0"
                value={inputs.thickness || ""}
                onChange={(e) =>
                  setInputs({ ...inputs, thickness: parseFloat(e.target.value) || 0 })
                }
                placeholder="مثال: 2.5"
                className="bg-background"
              />
            </div>

            {/* Laser Type */}
            <div className="space-y-2">
              <Label htmlFor="laserType" className="text-foreground font-medium">
                نوع لیزر
              </Label>
              <Select
                value={inputs.laserType}
                onValueChange={(value) => setInputs({ ...inputs, laserType: value })}
              >
                <SelectTrigger id="laserType" className="bg-background">
                  <SelectValue placeholder="انتخاب کنید..." />
                </SelectTrigger>
                <SelectContent>
                  {laserTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Speed */}
            <div className="space-y-2">
              <Label htmlFor="speed" className="text-foreground font-medium">
                سرعت پیشروی (mm/s)
              </Label>
              <Input
                id="speed"
                type="number"
                min="0"
                value={inputs.speed || ""}
                onChange={(e) =>
                  setInputs({ ...inputs, speed: parseFloat(e.target.value) || 0 })
                }
                placeholder="مثال: 800"
                className="bg-background"
              />
            </div>

            {/* Path Length */}
            <div className="space-y-2">
              <Label htmlFor="pathLength" className="text-foreground font-medium">
                طول مسیر (میلی‌متر) - اختیاری
              </Label>
              <Input
                id="pathLength"
                type="number"
                min="0"
                value={inputs.pathLength || ""}
                onChange={(e) =>
                  setInputs({ ...inputs, pathLength: parseFloat(e.target.value) || 0 })
                }
                placeholder="مثال: 1000"
                className="bg-background"
              />
            </div>

            {/* Pulse Rate */}
            <div className="space-y-2">
              <Label htmlFor="pulseRate" className="text-foreground font-medium">
                نرخ پالس (Hz)
              </Label>
              <Input
                id="pulseRate"
                type="number"
                min="0"
                value={inputs.pulseRate || ""}
                onChange={(e) =>
                  setInputs({ ...inputs, pulseRate: parseFloat(e.target.value) || 0 })
                }
                placeholder="مثال: 5000"
                className="bg-background"
              />
            </div>

            {/* Power */}
            <div className="space-y-2">
              <Label htmlFor="power" className="text-foreground font-medium">
                توان (Watt)
              </Label>
              <Input
                id="power"
                type="number"
                min="0"
                value={inputs.power || ""}
                onChange={(e) =>
                  setInputs({ ...inputs, power: parseFloat(e.target.value) || 0 })
                }
                placeholder="مثال: 1000"
                className="bg-background"
              />
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button
              onClick={handleCalculate}
              disabled={!isFormValid()}
              className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
              size="lg"
            >
              <Zap className="mr-2 h-5 w-5" />
              محاسبه پارامترها
            </Button>
          </div>
        </CardContent>
      </Card>

      {showResults && results && <ResultsDisplay results={results} inputs={inputs} />}
    </div>
  );
};

export default LaserCalculator;
