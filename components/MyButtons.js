import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
import { IconButton } from 'react-native-paper';
import { Dimensions , View , StyleSheet } from 'react-native';

import AppStyles from '../styles/themeStyles';


export default function MenuButton(props) {
    return(
        <View style={styles.menuButtonStyle} >
            <StatusBar style='auto' />
            <IconButton
                style = {{ backgroundColor :AppStyles.themeColor.backgroundColor  , borderRadius : 50 }}
                icon="menu"
                size={30}
                onPress={() => { props.navigation.toggleDrawer() }}
            />
        </View>
    );
}









const styles = StyleSheet.create({
    menuButtonStyle : {
        position: 'absolute',//use absolute position to show button on top of the map
        top: '2%', //for center align
        left: '2%',
        alignSelf: 'flex-start' //for align to left
    }
});