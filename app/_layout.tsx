import { useFonts } from 'expo-font';
import React, { Suspense, useEffect, useState } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { SQLiteProvider } from 'expo-sqlite';
import { ActivityIndicator, Text, View } from 'react-native';

SplashScreen.preventAutoHideAsync();

const loadSQLiteDb = async () => {
	const dbName = 'ChargingHub.db';
	const dbAsset = require('../assets/ChargingHub.db');
	const dbUri = Asset.fromModule(dbAsset).uri;
	const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

	const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
	if (!fileInfo.exists) {
		await FileSystem.makeDirectoryAsync(
			`${FileSystem.documentDirectory}SQLite`,
			{ intermediates: true }
		);
		await FileSystem.downloadAsync(dbUri, dbFilePath);
	}
};

const RootLayout = () => {
	const [dbLoaded, setDBLoaded] = useState<boolean>(false);
	const [fontsLoaded, error] = useFonts({
		'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
		'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
		'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
		'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
		'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
		'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
		'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
		'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
		'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf')
	});

	useEffect(() => {
		if (error) throw error;

		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, error]);

	useEffect(() => {
		loadSQLiteDb()
			.then(() => {
				setDBLoaded(true);
			})
			.catch((e) => console.error(e));
	}, []);

	if (!fontsLoaded && !error) {
		return null;
	}

	if (!dbLoaded) {
		return (
			<View className="flex-1">
				<ActivityIndicator size={'large'} />
				<Text>Loading Database...</Text>
			</View>
		);
	}

	return (
		<Suspense
			fallback={
				<View className="flex-1">
					<ActivityIndicator size="large" />
					<Text>Loading...</Text>
				</View>
			}
		>
			<SQLiteProvider useSuspense={true} databaseName="ChargingHub.db">
				<Stack
					screenOptions={{
						title: '',
						headerTintColor: '#027162'
					}}
				>
					<Stack.Screen
						name="index"
						options={{ headerShown: false, title: 'Home' }}
					/>
				</Stack>
			</SQLiteProvider>
		</Suspense>
	);
};

export default RootLayout;
