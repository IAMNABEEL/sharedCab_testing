import React, { useEffect } from 'react';
import { StyleSheet, Text, Image, View, Dimensions } from 'react-native';
import * as firebase from 'firebase';

const deviceWith = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function GetStart({ navigation }) {

	useEffect(() => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				navigation.navigate('HomeScreen');
			} else {
				navigation.navigate('RegisterScreen');
			}
		});
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: '#FF9E09' }}>
			<View style={styles.appTitle}>
				<Text onPress={()=> navigation.navigate('RegisterScreen')} style={styles.firstTitle}>shared</Text>
				<Text style={styles.secondTitle}>CAB</Text>
			</View>
			<View style={styles.bottom}>
				<Image
					style={{
						width: deviceWith,
						height: deviceHeight / 3,
						position: 'absolute',
						bottom: 0,
						opacity: 0.6,
						resizeMode: 'cover',
					}}
					source={require('../images/background.png')}
				></Image>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	bottom: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 0,
	},
	appTitle: {
		alignItems: 'center',
		justifyContent: 'flex-end',
		flex: 1
	},
	firstTitle: {
		fontSize: deviceWith / 4,
		color: '#323232',
		fontWeight: 'bold',
		margin: 0,
	},
	secondTitle: {
		fontSize: deviceWith / 6,
		marginTop: deviceHeight / -30,
		color: '#F5F0F0',
		fontWeight: 'bold',
	},
});
