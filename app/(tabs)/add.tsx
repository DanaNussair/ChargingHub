import { View, TouchableOpacity, Text } from 'react-native';
import { useMemo, useState } from 'react';

import useFetch from '@/hooks/useFetch';
import { useChargingPoints } from '@/contexts/ChargingPointsContextProvider';
import { PickerItemType, SelectedChargingPointType } from '@/types';
import { AVAILABILITY, TYPES } from '@/constants';
import ModalPicker from '@/components/ModalPicker';

type FetchedItemType = {
	city: string;
	country: string;
	id: string;
};

const AddChargingPoint = () => {
	const { addPoint } = useChargingPoints();
	const [selectedValue, setSelectedValue] = useState<SelectedChargingPointType>(
		{
			address: null,
			chargerType: null,
			availability: null
		}
	);

	const { data } = useFetch<FetchedItemType>(
		'get',
		'https://6696ddf20312447373c3f57e.mockapi.io/api/locations'
	);

	const locationSuggestions = useMemo(() => {
		return data.map((item: FetchedItemType) => {
			const title =
				item.city && item.country ? `${item.city}, ${item.country}` : '';

			return {
				label: title,
				value: title
			};
		});
	}, [data]);

	function onValueSelected(value: PickerItemType, stateToChange: string) {
		setSelectedValue((prev) => ({ ...prev, [stateToChange]: value }));
	}

	const onSubmit = async (chargingPoint: SelectedChargingPointType) => {
		if (
			selectedValue.address &&
			selectedValue.chargerType &&
			selectedValue.availability
		) {
			await addPoint({
				...chargingPoint,
				charging_type: chargingPoint.chargerType
			});

			setSelectedValue({
				address: null,
				chargerType: null,
				availability: null
			});
		}
	};

	return (
		<View className="flex-1 justify-between">
			<View>
				<ModalPicker
					label="Location"
					selectedValue={selectedValue.address}
					onSelectValue={(value) => onValueSelected(value, 'address')}
					data={locationSuggestions}
				/>
				<ModalPicker
					label="Charging Type"
					selectedValue={selectedValue.chargerType}
					onSelectValue={(value) => onValueSelected(value, 'chargerType')}
					data={TYPES}
				/>
				<ModalPicker
					label="Availability"
					selectedValue={selectedValue.availability}
					onSelectValue={(value) => onValueSelected(value, 'availability')}
					data={AVAILABILITY}
				/>
			</View>

			<TouchableOpacity
				disabled={
					!selectedValue.address ||
					!selectedValue.availability ||
					!selectedValue.chargerType
				}
				onPress={() => onSubmit(selectedValue)}
				className="m-4 bg-secondary p-2 justify-center items-center rounded"
				activeOpacity={0.8}
			>
				<Text className="text-white font-psemibold">Submit</Text>
			</TouchableOpacity>
		</View>
	);
};

export default AddChargingPoint;
