import { View, TouchableOpacity, Text } from 'react-native';
import { SetStateAction, useMemo, useState } from 'react';
import { ValueType } from 'react-native-dropdown-picker';
import { useSQLiteContext } from 'expo-sqlite';

import { getData } from '@/helpers/db';
import SearchableDropdown from '@/components/SearchableDropdown';
import useFetch from '@/hooks/useFetch';

const AVAILABILITY = [
	{ label: 'Occupied', value: 'occupied' },
	{ label: 'Available', value: 'available' },
	{ label: 'Offline', value: 'offline' }
];

const TYPES = [
	{
		label: 'Fast charger',
		value: 'fast'
	},
	{ label: 'Standard charger', value: 'standard' },
	{ label: 'Slow charger', value: 'slow' }
];

type FetchedItemType = {
	city: string;
	country: string;
	id: string;
};

type SelectedValueType = {
	location: ValueType | null;
	chargerType: ValueType | null;
	availability: ValueType | null;
};

const AddChargingPoint = () => {
	const db = useSQLiteContext();
	const [selectedValue, setSelectedValue] = useState<SelectedValueType>({
		location: null,
		chargerType: null,
		availability: null
	});

	const { loading, data } = useFetch<FetchedItemType>(
		'get',
		'https://6696ddf20312447373c3f57e.mockapi.io/api/locations'
	);

	const suggestions = useMemo(() => {
		return data.map((item: FetchedItemType) => {
			const title =
				item.city && item.country ? `${item.city}, ${item.country}` : '';

			return {
				label: title,
				value: title
			};
		});
	}, [data]);

	function onValueSelected(
		value: SetStateAction<ValueType | null>,
		stateToChange: string
	) {
		setSelectedValue((prev) => ({ ...prev, [stateToChange]: value }));
	}

	const addChargingPoint = async (chargingPoint: SelectedValueType) => {
		db.withTransactionAsync(async () => {
			await db.runAsync(
				'INSERT INTO ChargingPoints (address, charging_type, availability) VALUES (?, ?, ?);',
				[
					chargingPoint.location,
					chargingPoint.chargerType,
					chargingPoint.availability
				]
			);

			await getData(db);
		});

		setSelectedValue({
			location: null,
			chargerType: null,
			availability: null
		});
	};

	return (
		<View className="flex-1 justify-between">
			<View>
				<SearchableDropdown
					label="Location"
					loading={loading}
					suggestions={suggestions}
					selectedValue={selectedValue.location}
					setSelectedValue={(value) => onValueSelected(value, 'location')}
					zIndex={3000}
				/>
				<SearchableDropdown
					label="Charger type"
					suggestions={TYPES}
					selectedValue={selectedValue.chargerType}
					setSelectedValue={(value) => onValueSelected(value, 'chargerType')}
					zIndex={2000}
				/>
				<SearchableDropdown
					label="Availability"
					suggestions={AVAILABILITY}
					selectedValue={selectedValue.availability}
					setSelectedValue={(value) => onValueSelected(value, 'availability')}
					zIndex={1000}
				/>
			</View>

			<TouchableOpacity
				disabled={
					!selectedValue.location ||
					!selectedValue.availability ||
					!selectedValue.chargerType
				}
				onPress={() => addChargingPoint(selectedValue)}
				className="m-4 bg-secondary p-2 justify-center items-center rounded"
				activeOpacity={0.8}
			>
				<Text className="text-white font-psemibold">Submit</Text>
			</TouchableOpacity>
		</View>
	);
};

export default AddChargingPoint;
