interface LocationData {
	display_name: string;
	lat: string;
	lon: string;
}

export const getLocationData = async (
	location: string
): Promise<LocationData[]> => {
	try {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/search?format=json&limit=5&city=${location}`,
			{
				headers: {
					'User-Agent': 'tenki/0.0.1 (https://github.com/aerysh/tenki)',
				},
			}
		);

		return response.json();
	} catch (error) {
		throw new Error('Failed to fetch location data');
	}
};
