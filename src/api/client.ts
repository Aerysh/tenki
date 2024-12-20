import { fetchWeatherApi } from 'openmeteo';

const baseUrl = 'https://api.open-meteo.com/v1/forecast';

type WeatherOptions = {
  latitude: string;
  longitude: string;
  current: string[];
};

/**
 * Fetches weather data from the Open Meteo API.
 */
export const fetchWeatherData = async (options: WeatherOptions) => {
  // Fetch the weather data from the API
  const [data] = await fetchWeatherApi(baseUrl, options);
  // Retrieve the current weather data
  const currentWeather = data.current();

  // Return the current weather information
  return {
    current: {
      temperature: currentWeather?.variables(0)?.value(), // Temperature in Celsius
      relativeHumidity: currentWeather?.variables(1)?.value(), // Relative Humidity in Percentage
      windSpeed: currentWeather?.variables(2)?.value(), // Wind Speed in kilometers per hour
    },
  };
};

/**
 * Rate limit the requests to the Nominatim API.
 * See https://operations.osmfoundation.org/policies/nominatim/
 */
let lastCallTime = 0;
let pendingRequest: Promise<any> | null = null;

/**
 * Fetches geocoding data from the Nominatim API.
 */
export const fetchLocationData = async (location: string) => {
  const currentTime = Date.now();
  const timeSinceLastCall = currentTime - lastCallTime;

  // Prevent multiple requests within 1 second
  if (timeSinceLastCall < 1000) {
    if (pendingRequest) {
      return pendingRequest;
    }
    // Wait until the rate limit is reset
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 - timeSinceLastCall),
    );
  }

  lastCallTime = Date.now();
  pendingRequest = fetch(
    `https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=5`,
    {
      headers: {
        'User-Agent': 'tenki/0.0.1 (https://github.com/aerysh/tenki)',
      },
    },
  ).then((response) => response.json());

  const data = await pendingRequest;
  pendingRequest = null;

  return data;
};
