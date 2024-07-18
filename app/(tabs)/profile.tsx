import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ChargingPointsType } from '@/types/db';
import { useSQLiteContext } from 'expo-sqlite';
import { getData } from '@/helpers/db';
import { TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';

const Item = ({
	chargingPoint,
	deleteChargingPoint
}: {
	chargingPoint: ChargingPointsType;
	deleteChargingPoint: (id: number) => void;
}) => {
	return (
		<View className="bg-white m-4 p-2 rounded shadow-sm flex-row justify-between">
			<View className="w-2/3 justify-center">
				<Text className="font-pregular">
					<Text className="font-pbold">Location: </Text>
					{chargingPoint.address}
				</Text>
				<Text className="font-pregular">
					<Text className="font-pbold">Charging Type:</Text>{' '}
					{chargingPoint.charging_type}
				</Text>
				<Text className="font-pregular">
					<Text className="font-pbold">Availability:</Text>{' '}
					{chargingPoint.availability}
				</Text>
			</View>
			<View className="p-2 flex-1 justify-end items-end gap-4">
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => deleteChargingPoint(chargingPoint.id)}
				>
					<FontAwesome6 name="trash" color="#027162" size={22} />
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => router.push('/edit')}
				>
					<FontAwesome6 name="pencil" color="#027162" size={22} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const Profile = () => {
	const [data, setData] = useState<ChargingPointsType[]>([]);
	const db = useSQLiteContext();

	useEffect(() => {
		db.withTransactionAsync(async () => {
			const results = await getData(db);
			setData(results);
		});
	}, [db]);

	const deleteChargingPoint = async (id: number) => {
		db.withTransactionAsync(async () => {
			await db.runAsync(`DELETE FROM ChargingPoints WHERE id = ?;`, [id]);
			const results = await getData(db);
			setData(results);
		});
	};

	return (
		<FlatList
			data={data}
			renderItem={({ item }) => (
				<Item chargingPoint={item} deleteChargingPoint={deleteChargingPoint} />
			)}
		/>
	);
};

export default Profile;
