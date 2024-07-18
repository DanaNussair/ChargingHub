import { Text, TextProps } from 'react-native';
import React from 'react';

const DefaultText: React.FC<TextProps> = ({ children, ...props }) => {
	return (
		<Text className="text-white font-pregular text-base" {...props}>
			{children}
		</Text>
	);
};

export default DefaultText;
