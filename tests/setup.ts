jest.mock('@react-native-picker/picker', () => {
	const React = require('React');
	const RealComponent = jest.requireActual('@react-native-picker/picker');

	class Picker extends React.Component {
		static Item = (props: { children: never }) => {
			return React.createElement('Item', props, props.children);
		};

		render() {
			return React.createElement('Picker', this.props, this.props.children);
		}
	}
	Picker.propTypes = RealComponent.propTypes;
	return {
		Picker
	};
});
