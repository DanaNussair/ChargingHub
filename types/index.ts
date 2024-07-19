export type PickerItemType = { value: string; label: string };

export type SelectedChargingPointType = {
	address: PickerItemType | null;
	chargerType: PickerItemType | null;
	availability: PickerItemType | null;
};

export type FetchedLocationType = {
	city: string;
	country: string;
	id: string;
};
