import { useMemo, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { SelectedChargingPointType } from '@/types';
import { useChargingPoints } from '@/contexts/ChargingPointsContextProvider';
import SelectPointsData from '@/components/SelectPointsData';
import { Text, TouchableOpacity, View } from 'react-native';

const Edit = () => {
	const { modifyPoint } = useChargingPoints();
	const { id } = useLocalSearchParams();
	const { chargingPoints } = useChargingPoints();

	const [selectedValue, setSelectedValue] = useState<SelectedChargingPointType>(
		{ address: '', availability: '', chargerType: '' }
	);

	const currentChargingPoint = useMemo(() => {
		const point = chargingPoints.find((el) => el.id === Number(id));
		setSelectedValue({
			address: point?.address || '',
			availability: point?.availability || '',
			chargerType: point?.charging_type || ''
		});
		return point;
	}, [chargingPoints, id]);

	const onSubmit = async () => {
		if (
			selectedValue.address &&
			selectedValue.chargerType &&
			selectedValue.availability &&
			id
		) {
			await modifyPoint({
				...selectedValue,
				charging_type: selectedValue.chargerType,
				id: Number(id)
			});
		}
		router.back();
	};

	return (
		<View className="flex-1 justify-between">
			<SelectPointsData
				formData={selectedValue}
				fillForm={setSelectedValue}
				defaultState={currentChargingPoint}
			/>
			<TouchableOpacity
				onPress={onSubmit}
				className="m-10 bg-secondary p-2 justify-center items-center rounded"
				activeOpacity={0.8}
			>
				<Text className="text-white font-psemibold">Submit</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Edit;
