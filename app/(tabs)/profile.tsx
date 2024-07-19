import { View, Text, FlatList, ScrollView, RefreshControl } from 'react-native';
import React from 'react';
import { SQLChargingPointsType } from '@/types/db';
import { TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useChargingPoints } from '@/contexts/ChargingPointsContextProvider';

const Item = ({
	chargingPoint,
	deleteChargingPoint
}: {
	chargingPoint: SQLChargingPointsType;
	deleteChargingPoint: (id: number) => void;
}) => {
	const { refreshPoints } = useChargingPoints();
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(async () => {
		setRefreshing(true);
		await refreshPoints();
		setRefreshing(false);
	}, [refreshPoints]);

	return (
		<ScrollView
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
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
						onPress={() => deleteChargingPoint(chargingPoint.id || NaN)}
					>
						<FontAwesome6 name="trash" color="#027162" size={22} />
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() =>
							router.push({
								pathname: '/edit',
								params: { id: chargingPoint.id }
							})
						}
					>
						<FontAwesome6 name="pencil" color="#027162" size={22} />
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
};

const Profile = () => {
	const { chargingPoints: data, deletePoint } = useChargingPoints();

	if (!data.length) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text className="font-pbold text-lg text-secondary">
					No charging points to show
				</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={data}
			renderItem={({ item }) => (
				<Item
					chargingPoint={item}
					deleteChargingPoint={async () => await deletePoint(item)}
				/>
			)}
		/>
	);
};

export default Profile;
