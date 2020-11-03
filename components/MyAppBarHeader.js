import React , {useState} from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import AppStyles from '../styles/themeStyles';


export default function MyAppBarHeader(props) {
    return(
       
        <Appbar.Header style={styles.appbarHeaderStyles}>
            <Appbar.Action icon="arrow-left" onPress={() => props.props.navigation.pop()} />
            <Appbar.Content title={props.props.route.params.headerTitle} />
        </Appbar.Header>
    );
}


const styles = StyleSheet.create({
    appbarHeaderStyles :{
        backgroundColor : AppStyles.themeColor.backgroundColor,
        height : AppStyles.screen.height/12
    }
});