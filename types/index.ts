export type DataItemType = { value: string; label: string };

export type SelectedChargingPointType = {
	address: string;
	chargerType: string;
	availability: string;
};

export type FetchedLocationType = {
	city: string;
	country: string;
	id: string;
};
