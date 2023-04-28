import axios from 'axios';
import { SIDO_GROUP } from '@/utils/constants';
import type { DustValidity, Dust } from '@/types/dust';

const { VITE_AIR_QUALITY_URL, VITE_AIR_QUALITY_API_KEY } = import.meta.env;

interface DustStation extends Dust {
  stationName: string;
}

export const getSidoAirQualities = async () => {
  try {
    return await Promise.all(
      SIDO_GROUP.map(async (sido) => {
        const response = await axios.get(
          `${VITE_AIR_QUALITY_URL}?sidoName=${sido.sidoName}&pageNo=1&numOfRows=10&returnType=json&serviceKey=${VITE_AIR_QUALITY_API_KEY}&ver=1.0`
        );

        if (response.status !== 200) {
          throw new Error('API 에러');
        }

        const airQuality = response.data.response.body.items.find(
          (scale: DustValidity) =>
            !scale.pm10Flag &&
            !scale.pm25Flag &&
            Number(scale.pm10Value) &&
            Number(scale.pm25Value) &&
            Number(scale.pm10Grade) &&
            Number(scale.pm25Grade)
        );

        return {
          sidoName: sido.sidoName,
          fineDustScale: Number(airQuality.pm10Value),
          fineDustGrade: Number(airQuality.pm10Grade),
          ultraFineDustScale: Number(airQuality.pm25Value),
          ultraFineDustGrade: Number(airQuality.pm25Grade),
        };
      })
    );
  } catch (error) {
    console.error(error);
  }
};

export const getSidoAirQuality = async (sido: string) => {
  try {
    const response = await axios.get(
      `${VITE_AIR_QUALITY_URL}?sidoName=${sido}&pageNo=1&numOfRows=10&returnType=json&serviceKey=${VITE_AIR_QUALITY_API_KEY}&ver=1.0`
    );

    if (response.status !== 200) {
      throw new Error('API 에러');
    }

    const airQuality = response.data.response.body.items.find(
      (scale: DustValidity) =>
        !scale.pm10Flag &&
        !scale.pm25Flag &&
        Number(scale.pm10Value) &&
        Number(scale.pm25Value) &&
        Number(scale.pm10Grade) &&
        Number(scale.pm25Grade)
    );

    return {
      cityName: airQuality.stationName,
      fineDustScale: Number(airQuality.pm10Value),
      fineDustGrade: Number(airQuality.pm10Grade),
      ultraFineDustScale: Number(airQuality.pm25Value),
      ultraFineDustGrade: Number(airQuality.pm25Grade),
      dataTime: airQuality.dataTime,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getCityAirQualities = async (sido: string) => {
  try {
    const response = await axios.get(
      `${VITE_AIR_QUALITY_URL}?sidoName=${sido}&pageNo=1&numOfRows=250&returnType=json&serviceKey=${VITE_AIR_QUALITY_API_KEY}&ver=1.0`
    );

    if (response.status !== 200) {
      throw new Error('API 에러');
    }

    const airQualities = response.data.response.body.items.filter(
      (scale: DustValidity) =>
        !scale.pm10Flag &&
        !scale.pm25Flag &&
        Number(scale.pm10Value) &&
        Number(scale.pm25Value) &&
        Number(scale.pm10Grade) &&
        Number(scale.pm25Grade)
    );

    return airQualities.map((airQuality: DustStation) => ({
      cityName: airQuality.stationName,
      fineDustScale: Number(airQuality.pm10Value),
      fineDustGrade: Number(airQuality.pm10Grade),
      ultraFineDustScale: Number(airQuality.pm25Value),
      ultraFineDustGrade: Number(airQuality.pm25Grade),
      dataTime: airQuality.dataTime,
    }));
  } catch (error) {
    console.error(error);
  }
};
