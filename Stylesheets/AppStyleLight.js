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
	containerColumn: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		width: '100%',
		justifyContent: 'space-evenly',
		margin: 5,
		flexDirection: 'column',
	},
	containerScroll: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		flexDirection: 'column',
	},
	titleBox: {
		flex: 0.5,
		justifyContent: 'center'
	},
	textInput: {
		borderColor: 'black',
		borderWidth: 2,
		width: '50%',
		padding: 9,
		borderRadius: 6,
	},
	button: {
		borderColor: 'black',
		width: '50%',
		borderWidth: 2,
		padding: 6,
		borderRadius: 6,
		alignItems: 'center',
		backgroundColor: 'dodgerblue',
	},
	pinButton: {
		borderColor: 'black',
		borderWidth: 2,
		padding: 6,
		borderRadius: 6,
		alignItems: 'center',
		backgroundColor: 'dodgerblue',
	},
	camera: {
		flex: 1,
	},
	title: {
		justifyContent: 'center',
		fontSize: 40,
		textShadowColor: 'grey',
		textShadowRadius: 5,
		fontWeight: 'bold',
	},
	spacer: {
		padding: 6,
	},
	text: {
		fontSize: 14,
	},
	buttonText: {
		fontSize: 14,
		color: 'white',
	},
	pinText: {
		fontSize: 30,
		color: 'white',
	},

});
