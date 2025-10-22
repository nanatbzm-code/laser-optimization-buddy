import { Calculator } from "lucide-react";
import LaserCalculator from "@/components/LaserCalculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground shadow-glow relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <h1 className="text-5xl font-bold mb-3 animate-fade-in">سیستم محاسبات لیزر</h1>
          <p className="text-primary-foreground/90 text-xl animate-fade-in">
            محاسبه پارامترهای بهینه برای عملیات حکاکی، برش و جوشکاری
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <LaserCalculator />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-muted-foreground text-sm">
            <p>سیستم محاسبات پارامترهای لیزر - نسخه 2.0</p>
            <p className="mt-2">تمامی محاسبات بر اساس داده‌های تخصصی و مقالات معتبر انجام شده است</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
