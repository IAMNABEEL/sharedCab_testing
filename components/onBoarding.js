import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({ selected }) => {
	let backgroundColor;
	backgroundColor = selected ? '#fff' : '#BEC1CB';

	return <View style={{ width: 10, height: 10, marginHorizontal: 3, borderRadius: 50, backgroundColor }}></View>;
};

const Skip = ({ ...props }) => (
	<TouchableOpacity {...props}>
		<Text style={styles.onBoardingButton}>Skip</Text>
	</TouchableOpacity>
);

const Next = ({ ...props }) => (
	<TouchableOpacity {...props}>
		<Text style={styles.onBoardingButton}>Next</Text>
	</TouchableOpacity>
);

const Done = ({ ...props }) => (
	<TouchableOpacity {...props}>
		<Text style={styles.onBoardingButton}>Done</Text>
	</TouchableOpacity>
);

export default function OnBoardingScreen({ navigation }) {
	return (
		<Onboarding
			SkipButtonComponent={Skip}
			NextButtonComponent={Next}
			DoneButtonComponent={Done}
			DotComponent={Dots}
			onSkip={() => navigation.navigate('HomeScreen')}
			onDone={() => navigation.navigate('HomeScreen')}
			pages={[
				{
					backgroundColor: '#fff',
					image: (
						<Image
							style={{ width: 260, height: 150 }}
							source={require('../images/loading-screen-car.png')}
						/>
					),
					title: <Text style={styles.onBoardingTitle}>Book Ride</Text>,
					subtitle: (
						<Text style={styles.onBoardingSubTitle}>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
							been the industry's standard dummy text ever since the 1500s.
						</Text>
					),
				},
				{
					backgroundColor: '#FF9E09',
					image: (
						<Image
							style={{ width: 260, height: 150 }}
							source={require('../images/loading-screen-car.png')}
						/>
					),
					title: <Text style={styles.onBoardingTitle}>Share Ride</Text>,
					subtitle: (
						<Text style={styles.onBoardingSubTitle}>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
							been the industry's standard dummy text ever since the 1500s.
						</Text>
					),
				},
				{
					backgroundColor: '#FF9E09',
					image: (
						<Image
							style={{ width: 260, height: 150 }}
							source={require('../images/loading-screen-car.png')}
						/>
					),
					title: <Text style={styles.onBoardingTitle}>Offer Ride</Text>,
					subtitle: (
						<Text style={styles.onBoardingSubTitle}>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
							been the industry's standard dummy text ever since the 1500s.
						</Text>
					),
				},
			]}
		/>
	);
}

const styles = StyleSheet.create({
	onBoardingButton: {
		fontSize: 18,
		color: '#000',
		marginHorizontal: 15,
	},
	onBoardingTitle: {
		fontSize: 50,
		fontWeight: 'bold',
		color: '#000',
	},

	onBoardingSubTitle: {
		fontSize: 18,
		color: '#000',
		textAlign: 'center',
	},
});
