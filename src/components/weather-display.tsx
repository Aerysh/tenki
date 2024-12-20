import React from 'react';
import { VStack, Heading, Text, HStack } from 'rsuite';

interface WeatherDisplayProps {
	weatherData: any;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
	weatherData,
}) => {
	return (
		<>
			<HStack alignItems="center" justifyContent="center">
				<HStack alignItems="center" justifyContent="center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={48}
						height={48}
						viewBox="0 0 24 24"
					>
						<path
							fill="currentColor"
							d="M15 13V5a3 3 0 0 0-6 0v8a5 5 0 1 0 6 0m-3-9a1 1 0 0 1 1 1v3h-2V5a1 1 0 0 1 1-1"
						></path>
					</svg>
					<VStack alignItems="center" justifyContent="center">
						<Heading level={3}>
							{weatherData.current.temperature.toFixed(1)} C
						</Heading>
						<Text>Temperature</Text>
					</VStack>
				</HStack>
			</HStack>
			<HStack alignItems="center" justifyContent="space-between">
				<HStack alignItems="center" justifyContent="center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={48}
						height={48}
						viewBox="0 0 24 24"
					>
						<path
							fill="currentColor"
							d="M12 20a6 6 0 0 1-6-6c0-4 6-10.75 6-10.75S18 10 18 14a6 6 0 0 1-6 6"
						></path>
					</svg>
					<VStack alignItems="center" justifyContent="center">
						<Heading level={3}>
							{weatherData.current.relativeHumidity.toFixed(1)} %
						</Heading>
						<Text>Relative Humidity</Text>
					</VStack>
				</HStack>
				<HStack alignItems="center" justifyContent="center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={48}
						height={48}
						viewBox="0 0 24 24"
					>
						<path
							fill="currentColor"
							d="M4 10a1 1 0 0 1-1-1a1 1 0 0 1 1-1h8a2 2 0 0 0 2-2a2 2 0 0 0-2-2c-.55 0-1.05.22-1.41.59a.973.973 0 0 1-1.42 0c-.39-.39-.39-1.03 0-1.42C9.9 2.45 10.9 2 12 2a4 4 0 0 1 4 4a4 4 0 0 1-4 4zm15 2a1 1 0 0 0 1-1a1 1 0 0 0-1-1c-.28 0-.53.11-.71.29a.996.996 0 0 1-1.41 0c-.38-.39-.38-1.02 0-1.41C17.42 8.34 18.17 8 19 8a3 3 0 0 1 3 3a3 3 0 0 1-3 3H5a1 1 0 0 1-1-1a1 1 0 0 1 1-1zm-1 6H4a1 1 0 0 1-1-1a1 1 0 0 1 1-1h14a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-.83 0-1.58-.34-2.12-.88c-.38-.39-.38-1.02 0-1.41a.996.996 0 0 1 1.41 0c.18.18.43.29.71.29a1 1 0 0 0 1-1a1 1 0 0 0-1-1"
						></path>
					</svg>
					<VStack alignItems="center" justifyContent="center">
						<Heading level={3}>
							{weatherData.current.windSpeed.toFixed(1)} km/h
						</Heading>
						<Text>Wind Speed</Text>
					</VStack>
				</HStack>
			</HStack>
		</>
	);
};
