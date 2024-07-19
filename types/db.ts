export interface SQLChargingPointsType {
	id: number;
	address: string;
	charging_type: string;
	availability: string;
	created_at?: string;
	updated_at?: string;
}

export interface SQLAddPointsType {
	address: string;
	charging_type: string;
	availability: string;
}
