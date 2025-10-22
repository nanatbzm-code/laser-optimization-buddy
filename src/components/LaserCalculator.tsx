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
  });

  const [results, setResults] = useState<ReturnType<typeof calculateLaserParameters> | null>(null);
  const [showResults, setShowResults] = useState(false);

  const processes = ["برش", "حکاکی", "جوشکاری"];
  
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
      inputs.process
    );
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-glow border-primary/20">
        <CardHeader className="bg-gradient-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
          <div className="flex items-center gap-3 relative z-10">
            <Calculator className="h-6 w-6 text-primary animate-float" />
            <div>
              <CardTitle className="text-xl">محاسبه پارامترهای لیزر</CardTitle>
              <CardDescription className="mt-1">
                سه پارامتر زیر را وارد کنید
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="material" className="text-base font-medium">نوع ماده</Label>
              <Select
                value={inputs.material}
                onValueChange={(value) => setInputs({ ...inputs, material: value })}
              >
                <SelectTrigger id="material" className="border-primary/20 focus:border-primary transition-colors">
                  <SelectValue placeholder="انتخاب ماده" />
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

            <div className="space-y-2">
              <Label htmlFor="thickness" className="text-base font-medium">ضخامت (mm)</Label>
              <Input
                id="thickness"
                type="number"
                value={inputs.thickness || ""}
                onChange={(e) => setInputs({ ...inputs, thickness: parseFloat(e.target.value) || 0 })}
                placeholder="مثال: 5"
                className="border-primary/20 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="process" className="text-base font-medium">نوع عملیات</Label>
              <Select
                value={inputs.process}
                onValueChange={(value) => setInputs({ ...inputs, process: value })}
              >
                <SelectTrigger id="process" className="border-primary/20 focus:border-primary transition-colors">
                  <SelectValue placeholder="انتخاب عملیات" />
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
          </div>

          <Button
            onClick={handleCalculate}
            disabled={!isFormValid()}
            className="w-full mt-6 bg-gradient-primary hover:shadow-glow transition-all duration-300 shine-effect"
            size="lg"
          >
            <Zap className="mr-2 h-5 w-5" />
            محاسبه پارامترها
          </Button>
        </CardContent>
      </Card>

      {showResults && results && (
        <ResultsDisplay results={results} inputs={inputs} />
      )}
    </div>
  );
};

export default LaserCalculator;
