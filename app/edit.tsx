import { Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useChargingPoints } from '@/contexts/ChargingPointsContextProvider';
import { router, useLocalSearchParams } from 'expo-router';
import ModalPicker from '../components/ModalPicker';
import { FetchedLocationType, SelectedChargingPointType } from '@/types';
import useFetch from '@/hooks/useFetch';
import { AVAILABILITY, TYPES } from '@/constants';

const Edit = () => {
	const [selectedValue, setSelectedValue] = useState<SelectedChargingPointType>(
		{
			address: null,
			chargerType: null,
			availability: null
		}
	);
	const { id } = useLocalSearchParams();
	const { chargingPoints, modifyPoint } = useChargingPoints();
	const { data } = useFetch<FetchedLocationType>(
		'get',
		'https://6696ddf20312447373c3f57e.mockapi.io/api/locations'
	);

	const locationSuggestions = useMemo(() => {
		return data.map((item: FetchedLocationType) => {
			const title =
				item.city && item.country ? `${item.city}, ${item.country}` : '';

			return {
				label: title,
				value: title
			};
		});
	}, [data]);

	const currentChargingPoint = useMemo(() => {
		const point = chargingPoints.find((el) => el.id === Number(id));
		setSelectedValue({ ...point, chargerType: point?.charging_type });
		return point;
	}, [chargingPoints, id]);

	const onSubmit = async (chargingPoint: SelectedChargingPointType) => {
		if (
			selectedValue.address &&
			selectedValue.chargerType &&
			selectedValue.availability
		) {
			await modifyPoint({
				...chargingPoint,
				charging_type: chargingPoint.chargerType
			});
		}
		router.back();
	};

	return (
		<View className="flex-1 justify-between">
			<View>
				<ModalPicker
					label="Location"
					defaultValue={currentChargingPoint?.address}
					selectedValue={selectedValue.address}
					onSelectValue={(value) =>
						setSelectedValue((prev) => ({ ...prev, address: value }))
					}
					data={locationSuggestions}
				/>
				<ModalPicker
					label="Charging Type"
					defaultValue={currentChargingPoint?.charging_type}
					selectedValue={selectedValue.chargerType}
					onSelectValue={(value) =>
						setSelectedValue((prev) => ({ ...prev, chargerType: value }))
					}
					data={TYPES}
				/>
				<ModalPicker
					label="Availability"
					defaultValue={currentChargingPoint?.availability}
					selectedValue={selectedValue.availability}
					onSelectValue={(value) =>
						setSelectedValue((prev) => ({ ...prev, availability: value }))
					}
					data={AVAILABILITY}
				/>
			</View>
			<TouchableOpacity
				onPress={() => onSubmit(selectedValue)}
				className="m-10 bg-secondary p-2 justify-center items-center rounded"
				activeOpacity={0.8}
			>
				<Text className="text-white font-psemibold">Submit</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Edit;
