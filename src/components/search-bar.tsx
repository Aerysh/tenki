import React, { useCallback, useState } from 'react';
import { SelectPicker } from 'rsuite';
import debounce from 'debounce';
import { getLocationData } from '@/lib/location-api';

interface SearchBarProps {
	onSearch: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [inputValue, setInputValue] = useState('');
	const [options, setOptions] = useState<{ label: string; value: string }[]>(
		[]
	);

	const handleInputChange = debounce(
		useCallback(
			async (value: string) => {
				if (value !== inputValue) {
					setInputValue(value);

					if (value.length > 2) {
						try {
							const response = await getLocationData(value);
							const data = response.map(
								(item: { display_name: string; lat: string; lon: string }) => ({
									label: item.display_name,
									value: item.lat + ',' + item.lon,
								})
							);

							setOptions(data);
						} catch (error) {
							console.error(error);
						}
					}
				}
			},
			[inputValue]
		),
		1000
	);
	const handleSelect = useCallback(
		(value: string) => {
			if (value) {
				onSearch(value);
			}
		},
		[onSearch]
	);

	return (
		<SelectPicker
			data={options}
			value={inputValue}
			onChange={handleInputChange as any}
			placeholder="Search..."
			onSearch={(searchKeyword) => handleInputChange(searchKeyword)}
			searchable
			block
			onSelect={handleSelect}
		/>
	);
};
