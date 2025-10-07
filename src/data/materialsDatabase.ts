export interface MaterialData {
  process: string;
  category: string;
  material: string;
  thicknessMin: number;
  thicknessMax: number;
  laserType: string;
  powerMin: number;
  powerMax: number;
  pulseTime: string;
  equipment: string;
  speed?: number;
  focusZone?: number;
}

export const materialsDatabase: MaterialData[] = [
  // Engraving - Metals
  {
    process: "حکاکی",
    category: "فلزی",
    material: "فولاد کربنی",
    thicknessMin: 0.1,
    thicknessMax: 2,
    laserType: "لیزر فایبر",
    powerMin: 20,
    powerMax: 100,
    pulseTime: "20-200 نانو ثانیه",
    equipment: "MOPA، JPT"
  },
  {
    process: "حکاکی",
    category: "فلزی",
    material: "فولاد ضد زنگ",
    thicknessMin: 0.1,
    thicknessMax: 2,
    laserType: "لیزر فایبر",
    powerMin: 20,
    powerMax: 100,
    pulseTime: "20-200 نانو ثانیه",
    equipment: "RMI، Maxphotonics"
  },
  {
    process: "حکاکی",
    category: "فلزی",
    material: "آلومینیوم",
    thicknessMin: 0.1,
    thicknessMax: 2,
    laserType: "لیزر فایبر",
    powerMin: 20,
    powerMax: 100,
    pulseTime: "100-250 نانو ثانیه",
    equipment: "RMI، Maxphotonics"
  },
  {
    process: "حکاکی",
    category: "فلزی",
    material: "مس",
    thicknessMin: 0.1,
    thicknessMax: 2,
    laserType: "لیزر فایبر",
    powerMin: 20,
    powerMax: 100,
    pulseTime: "200-500 نانو ثانیه",
    equipment: "RMI، Maxphotonics"
  },
  {
    process: "حکاکی",
    category: "فلزی",
    material: "برنج",
    thicknessMin: 0.1,
    thicknessMax: 2,
    laserType: "لیزر فایبر",
    powerMin: 20,
    powerMax: 100,
    pulseTime: "100-400 نانو ثانیه",
    equipment: "RMI، Maxphotonics"
  },
  // Engraving - Non-metals
  {
    process: "حکاکی",
    category: "غیر فلزی",
    material: "پلاکسی گلس",
    thicknessMin: 0.1,
    thicknessMax: 5,
    laserType: "CO₂ لیزر",
    powerMin: 10,
    powerMax: 50,
    pulseTime: "10.6 میکرو ثانیه",
    equipment: "Epilog، Trotec"
  },
  {
    process: "حکاکی",
    category: "غیر فلزی",
    material: "چوب",
    thicknessMin: 0.1,
    thicknessMax: 10,
    laserType: "CO₂ لیزر",
    powerMin: 10,
    powerMax: 100,
    pulseTime: "10.6 میکرو ثانیه",
    equipment: "Universal، Boss Laser"
  },
  {
    process: "حکاکی",
    category: "غیر فلزی",
    material: "چرم",
    thicknessMin: 0.5,
    thicknessMax: 10,
    laserType: "CO₂ لیزر",
    powerMin: 20,
    powerMax: 100,
    pulseTime: "10.6 میکرو ثانیه",
    equipment: "Thunder Laser، Aeon"
  },
  // Cutting - Metals
  {
    process: "برشکاری",
    category: "فلزی",
    material: "فولاد کربنی",
    thicknessMin: 0.5,
    thicknessMax: 25,
    laserType: "لیزر فایبر",
    powerMin: 500,
    powerMax: 6000,
    pulseTime: "10-100 میکرو ثانیه",
    equipment: "IPG، Raycus"
  },
  {
    process: "برشکاری",
    category: "فلزی",
    material: "فولاد ضد زنگ",
    thicknessMin: 0.5,
    thicknessMax: 20,
    laserType: "لیزر فایبر",
    powerMin: 500,
    powerMax: 4000,
    pulseTime: "10-100 میکرو ثانیه",
    equipment: "Trumpf، Bystronic"
  },
  {
    process: "برشکاری",
    category: "فلزی",
    material: "آلومینیوم",
    thicknessMin: 0.5,
    thicknessMax: 15,
    laserType: "لیزر فایبر",
    powerMin: 700,
    powerMax: 4000,
    pulseTime: "10-500 میکرو ثانیه",
    equipment: "Amada، Mazak"
  },
  {
    process: "برشکاری",
    category: "فلزی",
    material: "مس",
    thicknessMin: 0.5,
    thicknessMax: 10,
    laserType: "لیزر فایبر",
    powerMin: 1000,
    powerMax: 3000,
    pulseTime: "1-200 نانو ثانیه",
    equipment: "Bodor، Han's Laser"
  },
  // Cutting - Non-metals
  {
    process: "برشکاری",
    category: "غیر فلزی",
    material: "پلاکسی گلس",
    thicknessMin: 1,
    thicknessMax: 20,
    laserType: "CO₂ لیزر",
    powerMin: 50,
    powerMax: 200,
    pulseTime: "10-100 میکرو ثانیه",
    equipment: "Epilog، Trotec"
  },
  {
    process: "برشکاری",
    category: "غیر فلزی",
    material: "چوب",
    thicknessMin: 1,
    thicknessMax: 30,
    laserType: "CO₂ لیزر",
    powerMin: 50,
    powerMax: 300,
    pulseTime: "50-150 میکرو ثانیه",
    equipment: "Universal، Boss Laser"
  },
  // Welding
  {
    process: "جوشکاری",
    category: "فلزی",
    material: "استیل ضد زنگ",
    thicknessMin: 1,
    thicknessMax: 1,
    laserType: "لیزر فایبر",
    powerMin: 260,
    powerMax: 500,
    pulseTime: "میکرو ثانیه",
    equipment: "ARTIZONO",
    speed: 800,
    focusZone: 2
  },
  {
    process: "جوشکاری",
    category: "فلزی",
    material: "استیل ضد زنگ",
    thicknessMin: 2,
    thicknessMax: 2,
    laserType: "لیزر فایبر",
    powerMin: 600,
    powerMax: 1000,
    pulseTime: "میکرو ثانیه",
    equipment: "ARTIZONO",
    speed: 800,
    focusZone: 2
  },
  {
    process: "جوشکاری",
    category: "فلزی",
    material: "آلومینیوم",
    thicknessMin: 1,
    thicknessMax: 1,
    laserType: "لیزر فایبر",
    powerMin: 480,
    powerMax: 500,
    pulseTime: "میکرو ثانیه",
    equipment: "ARTIZONO",
    speed: 700,
    focusZone: 1
  },
  {
    process: "جوشکاری",
    category: "فلزی",
    material: "آلومینیوم",
    thicknessMin: 2,
    thicknessMax: 2,
    laserType: "لیزر فایبر",
    powerMin: 780,
    powerMax: 1000,
    pulseTime: "میکرو ثانیه",
    equipment: "ARTIZONO",
    speed: 800,
    focusZone: 2
  },
  {
    process: "جوشکاری",
    category: "فلزی",
    material: "مس",
    thicknessMin: 1,
    thicknessMax: 1,
    laserType: "لیزر فایبر",
    powerMin: 650,
    powerMax: 1000,
    pulseTime: "میکرو ثانیه",
    equipment: "ARTIZONO",
    speed: 600,
    focusZone: 0
  },
  {
    process: "جوشکاری",
    category: "فلزی",
    material: "فولاد کم کربن",
    thicknessMin: 1,
    thicknessMax: 1,
    laserType: "لیزر فایبر",
    powerMin: 300,
    powerMax: 500,
    pulseTime: "میکرو ثانیه",
    equipment: "ARTIZONO",
    speed: 500,
    focusZone: 0
  }
];
