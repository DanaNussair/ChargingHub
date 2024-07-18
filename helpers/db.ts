import { ChargingPointsType } from '@/types/db';
import { SQLiteDatabase } from 'expo-sqlite';

export const getData = async (db: SQLiteDatabase) => {
	const result = await db.getAllAsync<ChargingPointsType>(
		'SELECT * FROM ChargingPoints'
	);
	return result;
};
