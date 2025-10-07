import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Beaker, Play } from "lucide-react";
import { testCases } from "@/utils/laserCalculations";

interface TestCasesProps {
  onLoadTestCase: (testCase: typeof testCases[0]) => void;
}

const TestCases = ({ onLoadTestCase }: TestCasesProps) => {
  return (
    <Card className="shadow-lg border-border/50">
      <CardHeader className="bg-gradient-secondary">
        <div className="flex items-center gap-3">
          <Beaker className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-xl">نمونه‌های تست</CardTitle>
            <CardDescription className="mt-1">
              سه نمونه از عملیات‌های مختلف برای آزمایش سیستم
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testCases.map((testCase, index) => (
            <Card key={index} className="border-2 border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <Badge variant="outline" className="text-xs">
                    نمونه {index + 1}
                  </Badge>
                  <Badge className="bg-primary text-primary-foreground text-xs">
                    {testCase.process}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ماده:</span>
                    <span className="font-medium text-foreground">{testCase.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ضخامت:</span>
                    <span className="font-medium text-foreground">{testCase.thickness} mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">لیزر:</span>
                    <span className="font-medium text-foreground text-xs">{testCase.laserType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">توان:</span>
                    <span className="font-medium text-foreground">{testCase.power} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">سرعت:</span>
                    <span className="font-medium text-foreground">{testCase.speed} mm/s</span>
                  </div>
                </div>

                <Button
                  onClick={() => onLoadTestCase(testCase)}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="sm"
                >
                  <Play className="mr-2 h-4 w-4" />
                  بارگذاری نمونه
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestCases;
