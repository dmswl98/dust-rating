import axios from 'axios';
import { SIDO_GROUP } from '@/utils/constants';

const { VITE_AIR_QUALITY_URL, VITE_AIR_QUALITY_API_KEY } = import.meta.env;

type Flag = null | '통신장애';

interface AirQualityScale {
  pm10Flag: Flag;
  pm25Flag: Flag;
}

interface AirQuality {
  stationName: string;
  pm10Value: string;
  pm25Value: string;
}

export const getAirQuality = async () => {
  try {
    return await Promise.all(
      SIDO_GROUP.map(async (sido) => {
        const response = await axios.get(
          `${VITE_AIR_QUALITY_URL}?sidoName=${sido.cityName}&pageNo=1&numOfRows=10&returnType=json&serviceKey=${VITE_AIR_QUALITY_API_KEY}&ver=1.0`
        );

        if (response.status !== 200) {
          throw new Error('API 에러');
        }

        const airQuality = response.data.response.body.items.filter(
          ({ pm10Flag, pm25Flag }: AirQualityScale) => !pm10Flag && !pm25Flag
        )[0];

        return {
          cityName: sido.cityName,
          fineDustScale: Number(airQuality.pm10Value),
          ultraFineDustScale: Number(airQuality.pm25Value),
        };
      })
    );
  } catch (error) {
    console.error(error);
  }
};

export const getAirQualityByCity = async (city: string) => {
  try {
    const response = await axios.get(
      `${VITE_AIR_QUALITY_URL}?sidoName=${city}&pageNo=1&numOfRows=250&returnType=json&serviceKey=${VITE_AIR_QUALITY_API_KEY}&ver=1.0`
    );

    if (response.status !== 200) {
      throw new Error('API 에러');
    }

    const airQuality = response.data.response.body.items.filter(
      ({ pm10Flag, pm25Flag }: AirQualityScale) => !pm10Flag && !pm25Flag
    );

    return airQuality.map(
      ({ stationName, pm10Value, pm25Value }: AirQuality) => ({
        cityName: stationName,
        fineDustScale: Number(pm10Value),
        ultraFineDustScale: Number(pm25Value),
      })
    );
  } catch (error) {
    console.error(error);
  }
};
