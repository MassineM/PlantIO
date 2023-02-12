// This file is used to define the Plantation model / interface

import { Spot } from './spot';

export interface Plantation {
  key?: string;
  plantRef: string;
  name: string;
  description: string;
  recommendedHumd: string;
  recommendedTemp: string;
  recommendedLum: string;
  spots: Spot[];
}
