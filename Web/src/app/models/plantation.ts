// This file is used to define the Plantation model / interface

export interface Plantation {
  key?: string;
  plantRef: string;
  name: string;
  description: string;
  recommandHumd: string;
  recommandLum: string;
  recommandTemp: string;
  spots: any[];
}
