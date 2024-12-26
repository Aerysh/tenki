import { WeatherOptions, WeatherStore } from '@/types/api';
import { fetchWeatherApi } from 'openmeteo';
import { create } from 'zustand';

const baseUrl = 'https://api.open-meteo.com/v1/forecast';
export const useWeatherStore = create<WeatherStore>((set) => ({
  current: {},
  loading: false,
  fetchWeather: async (options: WeatherOptions) => {
    try {
      set({ loading: true });

      const [data] = await fetchWeatherApi(baseUrl, options);
      const currentWeather = data.current();

      const variables = Array.from(
        { length: 7 },
        (_, i) => currentWeather?.variables(i)?.value() ?? 0,
      );

      set({
        current: {
          temperature: variables[0],
          relativeHumidity: variables[1],
          apparentTemperature: variables[2],
          isDay: variables[3],
          precipitation: variables[4],
          weatherCode: variables[5],
          windSpeed: variables[6],
        },
      });
    } catch (error) {
      if (typeof error === 'string') {
        throw new Error(error);
      } else {
        throw new Error('An unexpected error occurred');
      }
    } finally {
      set({ loading: false });
    }
  },
}));
