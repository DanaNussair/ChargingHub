import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LocationTrackingLight } from '@/constants/svgs';
import DefaultText from '@/components/Text';
import { router } from 'expo-router';

const App = () => {
	return (
		<SafeAreaView className="bg-secondary h-full w-full">
			<ScrollView>
				<View className="items-center justify-center h-[80px] w-full">
					<DefaultText className="font-pbold text-xl">
						Charging Hub!
					</DefaultText>
				</View>
				<View className="items-center justify-center">
					<LocationTrackingLight />
				</View>
				<View className="flex-1 gap-10 items-center p-14 h-full">
					<DefaultText className="font-pmedium leading-5 w-full">
						Easily manage your EV charging points. Add, track, and update
						charging points with ease. ChargeHub keeps you powered up on the go!
					</DefaultText>
					<DefaultText className="text-center font-pmedium w-full">
						Stay charged with ChargeHub!
					</DefaultText>
					<TouchableOpacity
						className="bg-primary p-5 justify-center items-center rounded-md w-full"
						activeOpacity={0.9}
						onPress={() => router.push('/add')}
					>
						<Text className="text-secondary text-lg font-pbold">
							Start charging
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default App;
