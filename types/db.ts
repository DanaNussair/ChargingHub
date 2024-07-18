export type ChargingType = 'fast' | 'standard' | 'slow';
export type AvailabilityType = 'occupied' | 'available' | 'offline';

export interface ChargingPointsType {
	id: number;
	address: string;
	charging_type: ChargingType;
	availability: AvailabilityType;
	created_at: string;
	updated_at: string;
}
