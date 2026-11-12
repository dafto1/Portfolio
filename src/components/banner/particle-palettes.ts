import type { ParticleColor } from "./particle-engine";

export const NIGHT_PARTICLE_PALETTE: readonly ParticleColor[] = [
  { rgb: "165, 243, 252", core: "#ecfeff", weight: 0.44 },
  { rgb: "103, 232, 249", core: "#cffafe", weight: 0.32 },
  { rgb: "224, 242, 254", core: "#ffffff", weight: 0.16 },
  { rgb: "134, 239, 172", core: "#dcfce7", weight: 0.08 },
];

export const DAY_PARTICLE_PALETTE: readonly ParticleColor[] = [
  { rgb: "255, 255, 255", core: "#ffffff", weight: 0.44 },
  { rgb: "186, 230, 253", core: "#f0f9ff", weight: 0.34 },
  { rgb: "125, 211, 252", core: "#e0f2fe", weight: 0.22 },
];
