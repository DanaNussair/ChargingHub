import { ChargingPointsType } from '@/types/db';
import { SQLiteDatabase } from 'expo-sqlite';

export const getChargingPoints = async (db: SQLiteDatabase) => {
	const result = await db.getAllAsync<ChargingPointsType>(
		'SELECT * FROM ChargingPoints'
	);
	return result;
};

export const addChargingPoint = async (
	db: SQLiteDatabase,
	chargingPoint: ChargingPointsType
) => {
	db.withTransactionAsync(async () => {
		await db.runAsync(
			'INSERT INTO ChargingPoints (address, charging_type, availability) VALUES (?, ?, ?);',
			[
				chargingPoint.address,
				chargingPoint.charging_type,
				chargingPoint.availability
			]
		);

		await getChargingPoints(db);
	});
};

export const deleteChargingPoint = async (db: SQLiteDatabase, id: number) => {
	db.withTransactionAsync(async () => {
		await db.runAsync(`DELETE FROM ChargingPoints WHERE id = ?;`, [id]);
		await getChargingPoints(db);
	});
};
