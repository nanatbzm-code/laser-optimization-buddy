import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Database, Beaker } from "lucide-react";
import LaserCalculator from "@/components/LaserCalculator";
import MaterialsDatabase from "@/components/MaterialsDatabase";
import TestCases from "@/components/TestCases";
import { LaserInputParams } from "@/utils/laserCalculations";

const Index = () => {
  const [activeTab, setActiveTab] = useState("calculator");

  const handleLoadTestCase = (testCase: LaserInputParams) => {
    setActiveTab("calculator");
    // Trigger test case load in calculator
    window.dispatchEvent(new CustomEvent("loadTestCase", { detail: testCase }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground shadow-glow relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <h1 className="text-5xl font-bold mb-3 animate-fade-in">سیستم محاسبات لیزر</h1>
          <p className="text-primary-foreground/90 text-xl animate-fade-in">
            محاسبه پارامترهای بهینه برای عملیات حکاکی، برشکاری و جوشکاری
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir="rtl">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-1 bg-secondary/50 backdrop-blur-sm border border-primary/10 shadow-md">
            <TabsTrigger
              value="calculator"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow py-3 transition-all duration-300"
            >
              <Calculator className="h-5 w-5" />
              <span className="font-medium">محاسبه‌گر</span>
            </TabsTrigger>
            <TabsTrigger
              value="database"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow py-3 transition-all duration-300"
            >
              <Database className="h-5 w-5" />
              <span className="font-medium">پایگاه داده</span>
            </TabsTrigger>
            <TabsTrigger
              value="tests"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow py-3 transition-all duration-300"
            >
              <Beaker className="h-5 w-5" />
              <span className="font-medium">نمونه‌های تست</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="mt-0">
            <LaserCalculator />
          </TabsContent>

          <TabsContent value="database" className="mt-0">
            <MaterialsDatabase />
          </TabsContent>

          <TabsContent value="tests" className="mt-0">
            <TestCases onLoadTestCase={handleLoadTestCase} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-muted-foreground text-sm">
            <p>سیستم محاسبات پارامترهای لیزر - نسخه 1.0</p>
            <p className="mt-2">تمامی محاسبات بر اساس داده‌های تخصصی و مقالات معتبر انجام شده است</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
