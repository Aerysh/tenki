import { fetchWeatherApi } from 'openmeteo';
import { WeatherOptions } from '@/types/api';

const baseUrl = 'https://api.open-meteo.com/v1/forecast';

export const fetchWeatherData = async (options: WeatherOptions) => {
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

let lastCallTime = 0;
let pendingRequest: Promise<any> | null = null;

export const fetchLocationData = async (location: string) => {
	const currentTime = Date.now();
	const timeSinceLastCall = currentTime - lastCallTime;

	if (timeSinceLastCall < 1000) {
		if (pendingRequest) {
			return pendingRequest;
		}
		await new Promise((resolve) =>
			setTimeout(resolve, 1000 - timeSinceLastCall)
		);
	}

	lastCallTime = Date.now();
	pendingRequest = fetch(
		`https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=5`,
		{
			headers: {
				'User-Agent': 'tenki/0.0.1 (https://github.com/aerysh/tenki)',
			},
		}
	).then((response) => response.json());

	const data = await pendingRequest;
	pendingRequest = null;

	return data;
};
