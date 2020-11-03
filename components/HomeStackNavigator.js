import React , {useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeSceen';
import Loading from './loading';
import Login from './login';
import Register from './register';
import onBoarding from './onBoarding';
import AutoCompleteGooglePlacesScreen from './AutoCompleteGooglePlacesScreen';
import WizardStep from './WizardSteps';
import { View } from 'react-native';


const Stack = createStackNavigator();


export default function HomeStackNavigator( props ){
    return(
        <Stack.Navigator initialRouteName="LoadingScreen" screenOptions={{headerShown : false}}>
            <Stack.Screen name="LoadingScreen" navigation={props.navigation}  component={Loading} />
            <Stack.Screen name="RegisterScreen" navigation={props.navigation}  component={Register} />
            <Stack.Screen name="onBoardingScreen" navigation={props.navigation}  component={onBoarding} />
            <Stack.Screen name="LoginScreen" navigation={props.navigation}  component={Login} />
            <Stack.Screen name="HomeScreen" navigation={props.navigation}  component={HomeScreen} />
            <Stack.Screen name="AutoCompleteGooglePlacesScreen" component={AutoCompleteGooglePlacesScreen} />
            <Stack.Screen name="WizardStep" component={WizardStep} />
        </Stack.Navigator>
    );
}