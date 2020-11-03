import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
import { StyleSheet, Text, View , TouchableOpacity } from 'react-native';
import { useDispatch , useSelector } from 'react-redux';
import AppStyles from '../styles/themeStyles';
import MainDrawerNavigator from './MainDrawerNavigator';



export default function MainApp() {
    const counter = useSelector(state => state.counter)
    return(
        <MainDrawerNavigator />
    );
}


