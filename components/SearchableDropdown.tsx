import { View, Text } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';

type SearchableDropdownProps = {
	label: string;
	suggestions: {
		label: string;
		value: string | number;
	}[];
	setSelectedValue: React.Dispatch<React.SetStateAction<ValueType | null>>;
	selectedValue: ValueType | null;
	loading?: boolean;
	zIndex: number;
};

const SearchableDropdown = ({
	label,
	suggestions,
	setSelectedValue,
	selectedValue,
	loading = false,
	zIndex
}: SearchableDropdownProps) => {
	const [open, setOpen] = useState(false);

	return (
		<View className={`mx-4 z-0`}>
			<Text className="my-2 text-secondary font-psemibold">{label}</Text>
			<DropDownPicker
				listMode="SCROLLVIEW"
				open={open}
				setOpen={setOpen}
				items={suggestions}
				setValue={(callback) => {
					setSelectedValue(callback(selectedValue));
				}}
				value={selectedValue}
				multiple={false}
				searchable={true}
				loading={loading}
				zIndex={zIndex}
			/>
		</View>
	);
};

export default SearchableDropdown;
