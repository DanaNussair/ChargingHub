import { View } from 'react-native';
import React, { useMemo } from 'react';
import ModalPicker from './ModalPicker';
import { FetchedLocationType, SelectedChargingPointType } from '@/types';
import useFetch from '@/hooks/useFetch';
import { AVAILABILITY, TYPES } from '@/constants';
import { SQLChargingPointsType } from '@/types/db';

type SelectPointsDataProps = {
	formData: SelectedChargingPointType;
	fillForm: React.Dispatch<React.SetStateAction<SelectedChargingPointType>>;
	defaultState?: SQLChargingPointsType;
};

const SelectPointsData = ({
	fillForm,
	formData,
	defaultState
}: SelectPointsDataProps) => {
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

	return (
		<View>
			<ModalPicker
				label="Location"
				defaultValue={defaultState?.address}
				selectedValue={formData.address}
				onSelectValue={(value) =>
					fillForm((prev) => ({ ...prev, address: value }))
				}
				data={locationSuggestions}
			/>
			<ModalPicker
				label="Charging Type"
				defaultValue={defaultState?.charging_type}
				selectedValue={formData.chargerType}
				onSelectValue={(value) =>
					fillForm((prev) => ({ ...prev, chargerType: value }))
				}
				data={TYPES}
			/>
			<ModalPicker
				label="Availability"
				defaultValue={defaultState?.availability}
				selectedValue={formData.availability}
				onSelectValue={(value) =>
					fillForm((prev) => ({ ...prev, availability: value }))
				}
				data={AVAILABILITY}
			/>
		</View>
	);
};

export default SelectPointsData;
