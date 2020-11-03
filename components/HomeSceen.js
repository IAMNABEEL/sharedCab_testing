import React , {useState} from 'react';
import { StyleSheet, Text, View , TouchableOpacity } from 'react-native';
import MenuButton from './MyButtons';
import MyMapView from './MyMapView';


export default function HomeScreen( props ) {
    return(
        <View style={{ flex: 1 }}>
            <MyMapView navigation = {props.navigation} route = {props.route?.params} />
            <MenuButton navigation = {props.navigation} />
        </View>
    );
}


const styles = StyleSheet.create({
    
});