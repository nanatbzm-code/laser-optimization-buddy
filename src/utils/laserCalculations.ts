import { MaterialData } from "@/data/materialsDatabase";

export interface LaserInputParams {
  material: string;
  thickness: number;
  process: string;
  priority: string; // اولویت کاربر: "سرعت بالا"، "کیفیت بالا"، "هزینه کم"، "دقت بالا"
}

export interface LaserMethod {
  rank: number;
  method: string;
  laserType: string;
  laserPower: number;
  pulseTime: string;
  pulseRate?: string;
  feedRate: number;
  accuracy?: string;
  costLevel: number;
  equipment: string;
  source?: string;
  recommendedFor: string;
}

export type LaserCalculationResult = LaserMethod[];

export function calculateLaserParameters(
  input: LaserInputParams,
  materialsDb: MaterialData[]
): LaserCalculationResult {
  // Find all matching materials for the given inputs
  let matchedMaterials = materialsDb.filter(
    m => m.material.toLowerCase() === input.material.toLowerCase() &&
         m.process.toLowerCase() === input.process.toLowerCase() &&
         input.thickness >= m.thicknessMin &&
         input.thickness <= m.thicknessMax
  );

  // If no exact match, try to find by material and process only
  if (matchedMaterials.length === 0) {
    const sameProcess = materialsDb.filter(
      m => m.process.toLowerCase() === input.process.toLowerCase()
    );
    
    matchedMaterials = sameProcess.filter(
      m => m.material.toLowerCase().includes(input.material.toLowerCase()) ||
           input.material.toLowerCase().includes(m.material.toLowerCase())
    );

    // If still no match, use first materials with same process
    if (matchedMaterials.length === 0 && sameProcess.length > 0) {
      matchedMaterials = sameProcess.slice(0, 3);
    }
  }

  // If no materials found, return empty array
  if (matchedMaterials.length === 0) {
    return [];
  }

  // Convert to LaserMethod format
  const methods: LaserMethod[] = matchedMaterials.map(m => {
    const laserPower = Math.round((m.powerMin + m.powerMax) / 2);
    const feedRate = m.speed || 100;

    return {
      rank: m.rank,
      method: m.method,
      laserType: m.laserType,
      laserPower,
      pulseTime: m.pulseTime,
      pulseRate: m.pulseRate,
      feedRate,
      accuracy: m.accuracy,
      costLevel: m.costLevel,
      equipment: m.equipment,
      source: m.source,
      recommendedFor: m.recommendedFor
    };
  });

  // Sort based on priority
  let sortedMethods = [...methods];
  
  switch (input.priority) {
    case "سرعت بالا":
      sortedMethods.sort((a, b) => {
        const materialA = matchedMaterials.find(m => m.method === a.method);
        const materialB = matchedMaterials.find(m => m.method === b.method);
        return (materialB?.speedScore || 0) - (materialA?.speedScore || 0);
      });
      break;
    
    case "دقت بالا":
      sortedMethods.sort((a, b) => {
        const materialA = matchedMaterials.find(m => m.method === a.method);
        const materialB = matchedMaterials.find(m => m.method === b.method);
        return (materialB?.accuracyScore || 0) - (materialA?.accuracyScore || 0);
      });
      break;
    
    case "کیفیت بالا":
      sortedMethods.sort((a, b) => {
        const materialA = matchedMaterials.find(m => m.method === a.method);
        const materialB = matchedMaterials.find(m => m.method === b.method);
        return (materialB?.qualityScore || 0) - (materialA?.qualityScore || 0);
      });
      break;
    
    case "هزینه کم":
      sortedMethods.sort((a, b) => a.costLevel - b.costLevel);
      break;
    
    default:
      // Keep original rank order
      sortedMethods.sort((a, b) => a.rank - b.rank);
  }

  // Update ranks based on new order
  sortedMethods = sortedMethods.map((method, index) => ({
    ...method,
    rank: index + 1
  }));

  // Return top 5 methods
  return sortedMethods.slice(0, 5);
}

