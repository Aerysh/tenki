export interface WeatherStore {
  current: {
    temperature?: number;
    apparentTemperature?: number;
    relativeHumidity?: number;
    isDay?: number;
    precipitation?: number;
    weatherCode?: number;
    windSpeed?: number;
  };
  loading: boolean;
  fetchWeather: (options: WeatherOptions) => Promise<void>;
}

export type WeatherOptions = {
  latitude?: number;
  longitude?: number;
  current: string[];
};
