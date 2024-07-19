import React, {
	createContext,
	useState,
	useEffect,
	ReactNode,
	useContext
} from 'react';
import {
	getChargingPoints,
	addChargingPoint,
	deleteChargingPoint,
	modifyChargingPoint
} from '@/helpers/db';
import { useSQLiteContext } from 'expo-sqlite';
import { ChargingPointsType } from '@/types/db';

interface ChargingPoint {
	id: number;
	address: string;
	charging_type: string;
	availability: string;
	created_at: string;
	updated_at: string;
}

interface ChargingPointsContextType {
	chargingPoints: ChargingPoint[];
	addPoint: (chargingPoint: ChargingPointsType) => Promise<void>;
	refreshPoints: () => Promise<void>;
	deletePoint: (chargingPoint: ChargingPointsType) => Promise<void>;
	modifyPoint: (chargingPoint: ChargingPointsType) => Promise<void>;
}

const ChargingPointsContext = createContext<
	ChargingPointsContextType | undefined
>(undefined);

export const ChargingPointsProvider = ({
	children
}: {
	children: ReactNode;
}) => {
	const [chargingPoints, setChargingPoints] = useState<ChargingPoint[]>([]);
	const db = useSQLiteContext();

	const fetchChargingPoints = async () => {
		try {
			const points = await getChargingPoints(db);
			setChargingPoints(points);
		} catch (error) {
			console.error('Failed to fetch charging points', error);
		}
	};

	const addPoint = async (chargingPoint: ChargingPointsType) => {
		try {
			await addChargingPoint(db, chargingPoint);
			await fetchChargingPoints(); // Refresh the list after adding a new point
		} catch (error) {
			console.error('Failed to add charging point', error);
		}
	};

	const deletePoint = async (chargingPoint: ChargingPointsType) => {
		try {
			await deleteChargingPoint(db, chargingPoint.id);
			await fetchChargingPoints(); // Refresh the list after adding a new point
		} catch (error) {
			console.error('Failed to add charging point', error);
		}
	};

	const modifyPoint = async (chargingPoint: ChargingPointsType) => {
		console.log('modifyPoint');
		try {
			await modifyChargingPoint(db, chargingPoint);
			await fetchChargingPoints(); // Refresh the list after adding a new point
		} catch (error) {
			console.error('Failed to add charging point', error);
		}
	};

	const refreshPoints = async () => {
		await fetchChargingPoints();
	};

	useEffect(() => {
		fetchChargingPoints();
	}, []);

	return (
		<ChargingPointsContext.Provider
			value={{
				chargingPoints,
				addPoint,
				refreshPoints,
				deletePoint,
				modifyPoint
			}}
		>
			{children}
		</ChargingPointsContext.Provider>
	);
};

export const useChargingPoints = () => {
	const context = useContext(ChargingPointsContext);
	if (context === undefined) {
		throw new Error(
			'useChargingPoints must be used within a ChargingPointsProvider'
		);
	}
	return context;
};
