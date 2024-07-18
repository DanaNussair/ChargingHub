import React, { ReactNode } from 'react';
import { Tabs } from 'expo-router';
import { Dimensions, Text, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

type TabIconProps = {
	icon: ReactNode;
	color: string;
	focused: boolean;
	name: string;
};

const { height } = Dimensions.get('window');

const TabIcon = ({ icon, color, focused, name }: TabIconProps) => {
	return (
		<View className="justify-center items-center gap-2">
			{icon}
			<Text
				className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
				style={{ color }}
			>
				{name}
			</Text>
		</View>
	);
};

const TabsLayout = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarActiveTintColor: '#fff',
					tabBarInactiveTintColor: '#CDCDE0',
					tabBarStyle: {
						backgroundColor: '#027162',
						borderTopWidth: 5,
						borderTopColor: '#027162',
						height: height * 0.1
					}
				}}
			>
				<Tabs.Screen
					name="add"
					options={{
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={
									<FontAwesome6 name="circle-plus" color={color} size={15} />
								}
								color={color}
								focused={focused}
								name="Add"
							/>
						)
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={
									<FontAwesome6 name="user" color={color} solid size={15} />
								}
								color={color}
								focused={focused}
								name="Profile"
							/>
						)
					}}
				/>
			</Tabs>
		</>
	);
};

export default TabsLayout;
