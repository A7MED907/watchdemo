export type StepId = 'case' | 'dial' | 'hands' | 'strap' | 'review';

export interface BaseOption {
  id: string;
  name: string;
  priceAdjustment: number; // in EGP
  description: string;
  thumbnail: string;
  category: 'case' | 'dial' | 'hands' | 'strap';
}

export interface CaseOption extends BaseOption {
  category: 'case';
  material: string;
  finish: string;
  color: string; // hex or color token
  bezelColor: string;
  accentColor: string;
  diameter: string;
  thickness: string;
  waterResistance: string;
  lugWidth: string;
}

export interface DialOption extends BaseOption {
  category: 'dial';
  dialColor: string;
  textureType: 'sunburst' | 'matte' | 'guilloche' | 'aventurine' | 'brushed';
  markersColor: string;
  markersStyle: 'classic-indices' | 'roman' | 'arabic-minimal' | 'bauhaus-dots';
  hasDateWindow: boolean;
  subDials: boolean;
  accentTone: string;
}

export interface HandsOption extends BaseOption {
  category: 'hands';
  style: 'classic-dauphine' | 'sword-lume' | 'slim-baton' | 'skeleton-haute' | 'arrow-sports';
  mainColor: string;
  lumeColor: string;
  secondHandColor: string;
  secondHandStyle: 'counterweight-circle' | 'minimal-needle' | 'red-arrow' | 'blued-steel';
}

export interface StrapOption extends BaseOption {
  category: 'strap';
  type: 'bracelet' | 'leather' | 'suede' | 'rubber' | 'nato';
  material: string;
  color: string;
  accentColor: string;
  stitchColor?: string;
  texture: 'steel-links' | 'alligator' | 'smooth-leather' | 'perforated-rubber' | 'striped-nato';
  hardwareColor: string;
}

export interface CustomWatchConfig {
  caseId: string;
  dialId: string;
  handsId: string;
  strapId: string;
  customEngraving?: string;
  glassReflection: boolean;
}

export interface PresetBuild {
  id: string;
  name: string;
  subtitle: string;
  story: string;
  config: CustomWatchConfig;
  badge?: string;
  calculatedPrice: number;
}
