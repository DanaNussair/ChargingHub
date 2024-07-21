import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ModalPicker from '@/components/ModalPicker';
import { DataItemType } from '@/types';

describe('ModalPicker', () => {
	const label = 'Select Item';
	const data: DataItemType[] = [
		{ label: 'Item 1', value: '1' },
		{ label: 'Item 2', value: '2' },
		{ label: 'Item 3', value: '3' }
	];
	const selectedValue = '1';
	const onSelectValue = jest.fn();

	it('renders correctly', () => {
		const { getByPlaceholderText, getByText } = render(
			<ModalPicker
				label={label}
				data={data}
				selectedValue={selectedValue}
				onSelectValue={onSelectValue}
			/>
		);

		expect(getByText(label)).toBeTruthy();
		expect(getByPlaceholderText(label)).toBeTruthy();
	});

	it('opens the modal when TextInput is pressed', () => {
		const { getByPlaceholderText, getByTestId } = render(
			<ModalPicker
				label={label}
				data={data}
				selectedValue={selectedValue}
				onSelectValue={onSelectValue}
			/>
		);

		fireEvent.press(getByPlaceholderText(label));
		expect(getByTestId('modal')).toBeTruthy();
	});

	it('selects an item and closes the modal', async () => {
		const { getByPlaceholderText, getByTestId, queryByTestId } = render(
			<ModalPicker
				label={label}
				data={data}
				selectedValue={selectedValue}
				onSelectValue={onSelectValue}
			/>
		);

		fireEvent.press(getByPlaceholderText(label));
		expect(getByTestId('modal')).toBeTruthy();

		const picker = getByTestId('picker');
		fireEvent(picker, 'onValueChange', '2');

		await waitFor(() => {
			expect(onSelectValue).toHaveBeenCalledWith('2');
			expect(queryByTestId('modal')).toBeNull();
		});
	});

	it('closes the modal when close button is pressed', () => {
		const { getByPlaceholderText, getByTestId, queryByRole } = render(
			<ModalPicker
				label={label}
				data={data}
				selectedValue={selectedValue}
				onSelectValue={onSelectValue}
			/>
		);

		fireEvent.press(getByPlaceholderText(label));
		expect(getByTestId('modal')).toBeTruthy();

		fireEvent.press(getByTestId('close-button'));
		expect(queryByRole('dialog')).toBeNull();
	});
});
