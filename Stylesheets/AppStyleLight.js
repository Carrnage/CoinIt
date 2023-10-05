import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 5,
		borderRadius: 5,
		borderWidth: 5,
		flexDirection: 'column',
	},
	textInput: {
		borderColor: 'black',
		borderWidth: 2,
		padding: 9,
		borderRadius: 6,
	},
	button: {
		borderColor: 'black',
		borderWidth: 2,
		padding: 6,
		borderRadius: 6,
		backgroundColor: 'dodgerblue',
	},
	camera: {
		flex: 1,
	},
	title: {
		fontSize: 'xx-large',
		textShadowColor: 'grey',
		textShadowRadius: 5,
		fontWeight: 'bold',
	},
	spacer: {
		padding: 6,
	},
	text: {
		fontSize: 'large',
	},
	buttonText: {
		fontSize: 'large',
		color: 'white',
	},
});
