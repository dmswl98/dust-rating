import { FINE_DUST, ULTRA_FINE_DUST } from '@/utils/constants';

type Flag = null | '통신장애';

export type SortType = typeof FINE_DUST | typeof ULTRA_FINE_DUST;

export type GradeType = 'NONE' | 'GOOD' | 'NORMAL' | 'BAD' | 'DANGER';

export interface DustScale {
  pm10Value: string;
  pm25Value: string;
  pm10Grade: string;
  pm25Grade: string;
}

export interface DustValidity extends DustScale {
  pm10Flag: Flag;
  pm25Flag: Flag;
}

export interface Dust extends DustScale {
  dataTime: string;
}

export interface DustFigures {
  fineDustScale: number;
  fineDustGrade: number;
  ultraFineDustScale: number;
  ultraFineDustGrade: number;
}

export interface MarkerInfo extends DustFigures {
  name: string;
}

export interface SidoDustInfo extends DustFigures {
  sidoName: string;
}

export interface CityDustInfo extends DustFigures {
  cityName: string;
  dataTime: string;
}

export interface DustHistory extends DustFigures {
  hour: string;
}

export interface DustForecast {
  imageUrl1: string;
  imageUrl2: string;
  imageUrl3: string;
  informCause: string;
  informOverall: string;
}
