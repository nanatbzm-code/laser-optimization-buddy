import { MaterialData } from "@/data/materialsDatabase";

export interface LaserInputParams {
  material: string;
  thickness: number;
  process: string;
  laserType: string;
  speed: number;
  pathLength?: number;
  operationTime?: number;
  pulseRate: number;
  power: number;
}

export interface LaserCalculationResult {
  recommendedPower: number;
  recommendedPulseRate: number;
  calculatedTime: number;
  energyConsumption: number;
  qualityEstimate: string;
  penetrationEstimate: string;
  warnings: string[];
  matchedMaterial?: MaterialData;
  laserType: string;
  laserPower: number;
  maxFeedRate: number;
  beamWidth: number;
}

export function calculateLaserParameters(
  input: LaserInputParams,
  materialsDb: MaterialData[]
): LaserCalculationResult {
  // Find matching material in database
  const matchedMaterial = materialsDb.find(
    (mat) =>
      mat.material === input.material &&
      mat.process === input.process &&
      input.thickness >= mat.thicknessMin &&
      input.thickness <= mat.thicknessMax &&
      mat.laserType === input.laserType
  );

  const warnings: string[] = [];

  // Calculate recommended power based on thickness and material
  let recommendedPower = input.power;
  if (matchedMaterial) {
    const thicknessRatio =
      (input.thickness - matchedMaterial.thicknessMin) /
      (matchedMaterial.thicknessMax - matchedMaterial.thicknessMin);
    recommendedPower =
      matchedMaterial.powerMin +
      thicknessRatio * (matchedMaterial.powerMax - matchedMaterial.powerMin);

    // Check if input power is within acceptable range
    if (
      input.power < matchedMaterial.powerMin * 0.8 ||
      input.power > matchedMaterial.powerMax * 1.2
    ) {
      warnings.push(
        `توان ورودی (${input.power}W) خارج از محدوده پیشنهادی است. محدوده مناسب: ${matchedMaterial.powerMin}-${matchedMaterial.powerMax}W`
      );
    }
  } else {
    warnings.push(
      "مشخصات دقیق این ماده در پایگاه داده یافت نشد. محاسبات بر اساس تخمین انجام شده است."
    );
  }

  // Calculate recommended pulse rate based on material and process
  let recommendedPulseRate = input.pulseRate;
  if (input.process === "حکاکی") {
    // For engraving, higher pulse rate for finer detail
    recommendedPulseRate = Math.max(20000, input.pulseRate);
  } else if (input.process === "برشکاری") {
    // For cutting, moderate pulse rate
    recommendedPulseRate = Math.min(10000, Math.max(5000, input.pulseRate));
  } else if (input.process === "جوشکاری") {
    // For welding, lower pulse rate for deeper penetration
    recommendedPulseRate = Math.min(5000, input.pulseRate);
  }

  // Calculate operation time
  let calculatedTime = input.operationTime || 0;
  if (input.pathLength && input.speed) {
    calculatedTime = (input.pathLength / input.speed) * 60; // Convert to seconds
  }

  // Calculate energy consumption (kWh)
  const energyConsumption = (input.power * calculatedTime) / (1000 * 3600);

  // Estimate quality based on parameters
  let qualityEstimate = "متوسط";
  const powerEfficiency = matchedMaterial
    ? input.power /
      ((matchedMaterial.powerMin + matchedMaterial.powerMax) / 2)
    : 1;

  if (powerEfficiency > 0.9 && powerEfficiency < 1.1) {
    qualityEstimate = "عالی";
  } else if (powerEfficiency > 0.7 && powerEfficiency < 1.3) {
    qualityEstimate = "خوب";
  } else if (powerEfficiency < 0.5 || powerEfficiency > 1.5) {
    qualityEstimate = "ضعیف";
    warnings.push("پارامترهای انتخابی ممکن است کیفیت پایینی ایجاد کند");
  }

  // Estimate penetration depth (simplified model)
  const penetrationFactor = (input.power * 0.001) / (input.speed * 0.1);
  let penetrationEstimate = "";
  if (input.process === "برشکاری") {
    if (penetrationFactor > input.thickness * 1.5) {
      penetrationEstimate = "نفوذ کامل با احتمال سوختن لبه‌ها";
      warnings.push("توان بیش از حد می‌تواند باعث سوختگی لبه‌ها شود");
    } else if (penetrationFactor > input.thickness * 0.9) {
      penetrationEstimate = "نفوذ کامل مناسب";
    } else {
      penetrationEstimate = "نفوذ ناکافی - برش ممکن است کامل نشود";
      warnings.push("توان یا زمان کافی نیست - برش ممکن است ناقص باشد");
    }
  } else if (input.process === "جوشکاری") {
    penetrationEstimate = `عمق نفوذ تقریبی: ${(penetrationFactor * 0.5).toFixed(2)} میلی‌متر`;
  } else {
    penetrationEstimate = `عمق حکاکی تقریبی: ${(penetrationFactor * 0.1).toFixed(3)} میلی‌متر`;
  }

  // Check for equipment limitations
  if (input.power > 6000) {
    warnings.push("توان درخواستی از حداکثر توان معمول دستگاه‌ها (6000W) بیشتر است");
  }

  if (input.speed > 2000) {
    warnings.push("سرعت بسیار بالا - ممکن است دقت کاهش یابد");
  }

  if (calculatedTime > 3600) {
    warnings.push("زمان عملیات بیش از 1 ساعت - توصیه به تقسیم کار");
  }

  // Calculate beam width based on laser type and power
  let beamWidth = 0.1; // Default 0.1mm
  if (input.laserType === "لیزر فایبر") {
    beamWidth = 0.05 + (recommendedPower / 10000); // Fiber lasers: 0.05-0.3mm
  } else if (input.laserType === "CO₂ لیزر") {
    beamWidth = 0.1 + (recommendedPower / 5000); // CO2 lasers: 0.1-0.5mm
  } else if (input.laserType === "لیزر Nd:YAG") {
    beamWidth = 0.08 + (recommendedPower / 8000); // Nd:YAG lasers: 0.08-0.4mm
  }
  beamWidth = Math.min(beamWidth, 0.5); // Cap at 0.5mm

  // Calculate maximum feed rate based on material, thickness, and power
  let maxFeedRate = input.speed;
  if (matchedMaterial) {
    // Base feed rate on material thermal properties and laser power
    const powerRatio = recommendedPower / ((matchedMaterial.powerMin + matchedMaterial.powerMax) / 2);
    const thicknessFactor = 1 / (input.thickness * 0.5 + 0.5);
    
    if (input.process === "برشکاری") {
      maxFeedRate = Math.round(500 * powerRatio * thicknessFactor);
    } else if (input.process === "حکاکی") {
      maxFeedRate = Math.round(1000 * powerRatio);
    } else if (input.process === "جوشکاری") {
      maxFeedRate = Math.round(300 * powerRatio * thicknessFactor);
    }
    
    maxFeedRate = Math.max(100, Math.min(maxFeedRate, 3000)); // Between 100-3000 mm/min
  }

  return {
    recommendedPower: Math.round(recommendedPower),
    recommendedPulseRate: Math.round(recommendedPulseRate),
    calculatedTime: Math.round(calculatedTime * 10) / 10,
    energyConsumption: Math.round(energyConsumption * 1000) / 1000,
    qualityEstimate,
    penetrationEstimate,
    warnings,
    matchedMaterial,
    laserType: input.laserType,
    laserPower: Math.round(recommendedPower),
    maxFeedRate: Math.round(maxFeedRate),
    beamWidth: Math.round(beamWidth * 1000) / 1000,
  };
}

// Test cases
export const testCases: LaserInputParams[] = [
  {
    material: "فولاد کربنی",
    thickness: 2,
    process: "برشکاری",
    laserType: "لیزر فایبر",
    speed: 800,
    pathLength: 1000,
    pulseRate: 5000,
    power: 1000,
  },
  {
    material: "آلومینیوم",
    thickness: 1,
    process: "جوشکاری",
    laserType: "لیزر فایبر",
    speed: 700,
    operationTime: 120,
    pulseRate: 3000,
    power: 480,
  },
  {
    material: "چوب",
    thickness: 5,
    process: "حکاکی",
    laserType: "CO₂ لیزر",
    speed: 500,
    pathLength: 500,
    pulseRate: 20000,
    power: 50,
  },
];
