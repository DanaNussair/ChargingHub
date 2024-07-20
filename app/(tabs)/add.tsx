import { SelectedChargingPointType } from '@/types';
import SelectPointsData from '@/components/SelectPointsData';
import { useChargingPoints } from '@/contexts/ChargingPointsContextProvider';
import { Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

const AddChargingPoint = () => {
	const { addPoint } = useChargingPoints();
	const [selectedValue, setSelectedValue] = useState<SelectedChargingPointType>(
		{ address: '', availability: '', chargerType: '' }
	);
	const onSubmit = async (chargingPoint: SelectedChargingPointType) => {
		if (
			chargingPoint.address &&
			chargingPoint.chargerType &&
			chargingPoint.availability
		) {
			await addPoint({
				address: chargingPoint.address,
				charging_type: chargingPoint.chargerType,
				availability: chargingPoint.availability
			});
			setSelectedValue({ address: '', availability: '', chargerType: '' });
		}
	};

	return (
		<View className="flex-1 justify-between">
			<SelectPointsData formData={selectedValue} fillForm={setSelectedValue} />
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

export default AddChargingPoint;
