import React , {useState} from 'react';
import { NavigationContainer  } from '@react-navigation/native';
import { createDrawerNavigator  } from '@react-navigation/drawer' ;
import HomeStackNavigator from './HomeStackNavigator';
import NotificationScreen from './NotificationScreen';


const Drawer = createDrawerNavigator();



function DrawerNavigator(){
    return(
        <Drawer.Navigator initialRouteName="HomeStackNavigator"  >
            <Drawer.Screen name="HomeStackNavigator"  component={HomeStackNavigator} />
            <Drawer.Screen name="NotificationScreen"  component={NotificationScreen} />
        </Drawer.Navigator>
    );
  
}



export default function MainDrawerNavigator() {
    return(
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
    );
}