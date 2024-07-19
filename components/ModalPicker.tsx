import { View, Text, Modal, Pressable, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { PickerItemType } from '@/types';

type ModalPickerProps = {
	label: string;
	defaultValue?: string | undefined;
	data: PickerItemType[];
	selectedValue: PickerItemType | null;
	onSelectValue: (value: PickerItemType) => void;
};

const ModalPicker = ({
	label,
	defaultValue = undefined,
	data = [],
	selectedValue = { value: '', label: '' },
	onSelectValue
}: ModalPickerProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const textInputRef = useRef<TextInput>(null);

	const onClose = () => {
		setIsOpen(false);
		textInputRef.current?.blur();
	};

	return (
		<View className="p-2">
			<Text className="my-2 text-secondary font-psemibold">{label}</Text>
			<TextInput
				className="border-2 p-2 bg-white"
				placeholder={label}
				defaultValue={selectedValue || defaultValue}
				ref={textInputRef}
				onPress={() => setIsOpen(true)}
			/>
			<Modal
				visible={isOpen}
				animationType="slide"
				onRequestClose={onClose}
				onDismiss={onClose}
				presentationStyle="formSheet"
			>
				<Pressable onPress={onClose}>
					<Text>Close</Text>
				</Pressable>
				<Picker
					selectedValue={selectedValue}
					onValueChange={(itemValue) => {
						if (itemValue) onSelectValue(itemValue);
						setIsOpen(false);
					}}
					itemStyle={{
						height: '100%'
					}}
				>
					{data.map((item) => {
						return (
							<Picker.Item
								key={item.value}
								label={item.label}
								value={item.value}
							/>
						);
					})}
				</Picker>
			</Modal>
		</View>
	);
};

export default ModalPicker;
