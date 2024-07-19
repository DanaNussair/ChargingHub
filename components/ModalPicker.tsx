import { View, Text, Modal, Pressable, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { DataItemType } from '@/types';
import { FontAwesome6 } from '@expo/vector-icons';

type ModalPickerProps = {
	label: string;
	defaultValue?: string | undefined;
	data: DataItemType[];
	selectedValue: string | undefined;
	onSelectValue: (value: string) => void;
};

const ModalPicker = ({
	label,
	defaultValue = undefined,
	data = [],
	selectedValue,
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
				className="relative"
			>
				<Pressable onPress={onClose} className="absolute p-2 right-1">
					<FontAwesome6 name="xmark" size={25} color="#027162" />
				</Pressable>
				<View className="mt-[35px]">
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
				</View>
			</Modal>
		</View>
	);
};

export default ModalPicker;
