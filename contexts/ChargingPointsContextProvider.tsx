import React, {
	createContext,
	useState,
	useEffect,
	ReactNode,
	useContext,
	useCallback
} from 'react';
import {
	getChargingPoints,
	addChargingPoint,
	deleteChargingPoint,
	modifyChargingPoint
} from '@/helpers/db';
import { useSQLiteContext } from 'expo-sqlite';
import { SQLAddPointsType, SQLChargingPointsType } from '@/types/db';

interface ChargingPointsContextType {
	chargingPoints: SQLChargingPointsType[];
	addPoint: (chargingPoint: SQLAddPointsType) => Promise<void>;
	refreshPoints: () => Promise<void>;
	deletePoint: (chargingPoint: SQLChargingPointsType) => Promise<void>;
	modifyPoint: (chargingPoint: SQLChargingPointsType) => Promise<void>;
}

const ChargingPointsContext = createContext<
	ChargingPointsContextType | undefined
>(undefined);

export const ChargingPointsProvider = ({
	children
}: {
	children: ReactNode;
}) => {
	const [chargingPoints, setChargingPoints] = useState<
		SQLChargingPointsType[] | []
	>([]);
	const db = useSQLiteContext();

	const fetchChargingPoints = useCallback(async () => {
		try {
			const points = await getChargingPoints(db);
			setChargingPoints(points);
		} catch (error) {
			console.error('Failed to fetch charging points', error);
		}
	}, [db]);

	const addPoint = async (chargingPoint: SQLAddPointsType) => {
		try {
			await addChargingPoint(db, chargingPoint);
			await fetchChargingPoints(); // Refresh the list after adding a new point
		} catch (error) {
			console.error('Failed to add charging point', error);
		}
	};

	const deletePoint = async (chargingPoint: SQLChargingPointsType) => {
		try {
			if (chargingPoint.id) {
				await deleteChargingPoint(db, chargingPoint.id);
				await fetchChargingPoints();
			}
		} catch (error) {
			console.error('Failed to add charging point', error);
		}
	};

	const modifyPoint = async (chargingPoint: SQLChargingPointsType) => {
		try {
			await modifyChargingPoint(db, chargingPoint);
			await fetchChargingPoints();
		} catch (error) {
			console.error('Failed to add charging point', error);
		}
	};

	const refreshPoints = async () => {
		await fetchChargingPoints();
	};

	useEffect(() => {
		fetchChargingPoints();
	}, [fetchChargingPoints]);

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
