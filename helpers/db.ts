import { SQLAddPointsType, SQLChargingPointsType } from '@/types/db';
import { SQLiteDatabase } from 'expo-sqlite';

export const getChargingPoints = async (db: SQLiteDatabase) => {
	return await db.getAllAsync<SQLChargingPointsType>(
		'SELECT * FROM ChargingPoints'
	);
};

export const addChargingPoint = async (
	db: SQLiteDatabase,
	chargingPoint: SQLAddPointsType
) => {
	return db.withTransactionAsync(async () => {
		await db.runAsync(
			'INSERT INTO ChargingPoints (address, charging_type, availability) VALUES (?, ?, ?);',
			[
				chargingPoint.address,
				chargingPoint.charging_type,
				chargingPoint.availability
			]
		);
	});
};

export const deleteChargingPoint = async (db: SQLiteDatabase, id: number) => {
	return db.withTransactionAsync(async () => {
		await db.runAsync(`DELETE FROM ChargingPoints WHERE id = ?;`, [id]);
	});
};

export const modifyChargingPoint = async (
	db: SQLiteDatabase,
	chargingPoint: SQLChargingPointsType
) => {
	return db.withTransactionAsync(async () => {
		await db.runAsync(
			`UPDATE ChargingPoints SET address = ?, charging_type = ?, availability = ? WHERE id = ?;`,
			[
				chargingPoint.address,
				chargingPoint.charging_type,
				chargingPoint.availability,
				chargingPoint.id
			]
		);
	});
};
