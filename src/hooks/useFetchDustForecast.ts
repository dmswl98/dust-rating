import axios from 'axios';

const { VITE_AIR_QUALITY_API_KEY, VITE_MINU_DUST_FRCST_DSPTH_URL } = import.meta
  .env;

const getToday = () => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month =
    date.getMonth() < 10
      ? '0' + (date.getMonth() + 1)
      : (date.getMonth() + 1).toString();
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const today = year + '-' + month + '-' + day;

  return today;
};

export const useFetchDustForecast = () => {
  const fetchDustForecast = async () => {
    try {
      const forecast = await axios
        .get(
          `${VITE_MINU_DUST_FRCST_DSPTH_URL}?searchDate=${getToday()}&returnType=json&serviceKey=${VITE_AIR_QUALITY_API_KEY}&numOfRows=100&pageNo=1`
        )
        .then((res) => res.data.response.body.items[0]);

      return forecast;
    } catch (err) {
      console.error(err);
      throw new Error('fetchDustForecast Error');
    }
  };

  return { fetchDustForecast };
};

export default useFetchDustForecast;
