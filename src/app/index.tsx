import { AdditionalDetails } from '@/components/additional-details';
import { Container } from '@/components/container';
import { CurrentWeather } from '@/components/current-weather';
import { useWeatherStore } from '@/lib/weather-api';
import { useEffect, useState } from 'react';
import wmoDescriptions from '../data/wmo-codes.json';

export const App = () => {
  const { current, loading, fetchWeather } = useWeatherStore();

  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
      },
      (error) => {
        console.error(error);
      },
    );
  }, []);

  useEffect(() => {
    if (location?.latitude !== undefined && location?.longitude !== undefined) {
      fetchWeather({
        latitude: location?.latitude,
        longitude: location?.longitude,
        current: [
          'temperature_2m',
          'relative_humidity_2m',
          'apparent_temperature',
          'is_day',
          'precipitation',
          'weather_code',
          'wind_speed_10m',
        ],
      });
    }
  }, [fetchWeather, location?.latitude, location?.longitude]);

  useEffect(() => {
    if (current.isDay === 1) {
      document.querySelector('html')?.setAttribute('data-theme', 'light');
    } else {
      document.querySelector('html')?.setAttribute('data-theme', 'dark');
    }
  }, [current?.isDay]);

  const weatherDescription = wmoDescriptions[
    (current.weatherCode ?? 0).toString() as keyof typeof wmoDescriptions
  ] || {
    day: { description: 'Unknown' },
  };

  const { description } = current.isDay
    ? weatherDescription.day
    : weatherDescription.night;

  if (loading) {
    return (
      <Container>
        <span className="loading loading-spinner loading-lg" />
      </Container>
    );
  }

  return (
    <Container>
      <div className="card card-bordered bg-base-100 shadow-xl">
        <div className="card-body">
          <CurrentWeather
            temperature={current.temperature}
            weatherCondition={description}
          />
          <AdditionalDetails
            feelsLike={current.apparentTemperature ?? 0}
            windSpeed={current.windSpeed ?? 0}
            humidity={current.relativeHumidity ?? 0}
            precipitation={current.precipitation ?? 0}
          />
        </div>
      </div>
    </Container>
  );
};
