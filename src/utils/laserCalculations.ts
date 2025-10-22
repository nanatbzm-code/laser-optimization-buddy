import { MaterialData } from "@/data/materialsDatabase";

export interface LaserInputParams {
  material: string;
  thickness: number;
  process: string;
}

export interface LaserCalculationResult {
  laserType: string;
  laserPower: number;
  maxFeedRate: number;
  beamWidth: number;
}

export function calculateLaserParameters(
  input: LaserInputParams,
  materialsDb: MaterialData[]
): LaserCalculationResult {
  // Find exact or closest matching material
  let matchedMaterial = materialsDb.find(
    m => m.material.toLowerCase() === input.material.toLowerCase() &&
         m.process.toLowerCase() === input.process.toLowerCase() &&
         input.thickness >= m.thicknessMin &&
         input.thickness <= m.thicknessMax
  );

  // If no exact match, find closest by material and process
  if (!matchedMaterial) {
    const sameProcess = materialsDb.filter(
      m => m.process.toLowerCase() === input.process.toLowerCase()
    );
    
    matchedMaterial = sameProcess.find(
      m => m.material.toLowerCase().includes(input.material.toLowerCase()) ||
           input.material.toLowerCase().includes(m.material.toLowerCase())
    );

    // If still no match, use first material with same process
    if (!matchedMaterial && sameProcess.length > 0) {
      matchedMaterial = sameProcess[0];
    }

    // Last resort: use first material in database
    if (!matchedMaterial && materialsDb.length > 0) {
      matchedMaterial = materialsDb[0];
    }
  }

  if (!matchedMaterial) {
    return {
      laserType: "Fiber Laser",
      laserPower: 1000,
      maxFeedRate: 50,
      beamWidth: 0.1
    };
  }

  // Calculate laser power (average of min and max)
  const laserPower = (matchedMaterial.powerMin + matchedMaterial.powerMax) / 2;

  // Calculate beam width based on laser type and power
  let beamWidth = 0.1; // default mm
  if (matchedMaterial.laserType.includes("CO2")) {
    beamWidth = 0.15 + (laserPower / 10000);
  } else if (matchedMaterial.laserType.includes("Fiber")) {
    beamWidth = 0.05 + (laserPower / 15000);
  } else if (matchedMaterial.laserType.includes("Nd:YAG")) {
    beamWidth = 0.08 + (laserPower / 12000);
  }

  // Calculate max feed rate
  let maxFeedRate = matchedMaterial.speed || 50;
  
  // Adjust based on thickness
  if (input.thickness > 5) {
    maxFeedRate *= 0.7;
  } else if (input.thickness > 10) {
    maxFeedRate *= 0.5;
  }

  // Adjust based on process
  if (input.process.toLowerCase().includes("برش") || input.process.toLowerCase().includes("cutting")) {
    maxFeedRate *= 1.2;
  } else if (input.process.toLowerCase().includes("جوش") || input.process.toLowerCase().includes("welding")) {
    maxFeedRate *= 0.8;
  }

  return {
    laserType: matchedMaterial.laserType,
    laserPower: Math.round(laserPower),
    maxFeedRate: Math.round(maxFeedRate * 10) / 10,
    beamWidth: Math.round(beamWidth * 1000) / 1000
  };
}

