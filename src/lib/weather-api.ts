import { WeatherOptions } from '@/types/api';
import { fetchWeatherApi } from 'openmeteo';

const baseUrl = 'https://api.open-meteo.com/v1/forecast';
export const getWeatherData = async (options: WeatherOptions) => {
	const [data] = await fetchWeatherApi(baseUrl, options);
	const currentWeather = data.current();

	return {
		current: {
			temperature: currentWeather?.variables(0)?.value(), // Temperature in Celsius
			relativeHumidity: currentWeather?.variables(1)?.value(), // Relative Humidity in Percentage
			windSpeed: currentWeather?.variables(2)?.value(), // Wind Speed in kilometers per hour
		},
	};
};
