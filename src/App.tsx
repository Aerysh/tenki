import { useState } from 'react';
import { Container, Divider, Panel, Stack, Text } from 'rsuite';
import { fetchWeatherData } from './api/client';
import SearchBar from './components/searchBar';
import WeatherDisplay from './components/weatherDisplay';

function App() {
	const [weatherData, setWeatherData] = useState<any>();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const handleSearch = async (searchKeyword: string) => {
		setIsLoading(true);
		try {
			const response = await fetchWeatherData({
				latitude: searchKeyword.split(',')[0],
				longitude: searchKeyword.split(',')[1],
				current: ['temperature_2m', 'relative_humidity_2m', 'wind_speed_10m'],
			});

			setWeatherData(response);
		} catch (error) {
			console.error(error);
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Container>
			<Stack alignItems="center" justifyContent="center">
				<Panel
					header="Weather App"
					bordered
					style={{ width: '100%', minWidth: 576 }}
				>
					<SearchBar onSearch={handleSearch} />
					{isLoading ? (
						<>
							<Divider />
							<p>Loading...</p>
						</>
					) : isError ? (
						<>
							<Divider />
							<p>Error loading weather data</p>
						</>
					) : weatherData ? (
						<>
							<Divider />
							<WeatherDisplay weatherData={weatherData} />
						</>
					) : null}
				</Panel>
			</Stack>
			<Stack
				alignItems="center"
				justifyContent="center"
				style={{ marginTop: '20px' }}
			>
				<Text size="sm">
					Weather data provided by{' '}
					<a
						href="https://open-meteo.com/"
						target="_blank"
						rel="noreferrer noopener"
					>
						Open-Meteo
					</a>{' '}
					and location data provided by{' '}
					<a
						href="https://nominatim.openstreetmap.org/"
						target="_blank"
						rel="noreferrer noopener"
					>
						OpenStreetMap Nominatim
					</a>
					.
				</Text>
			</Stack>
		</Container>
	);
}

export default App;
