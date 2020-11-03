import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
import { StyleSheet, Text, View , TouchableOpacity , Modal , SafeAreaView } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useDispatch , useSelector } from 'react-redux';
import AppStyles from '../styles/themeStyles';
import MenuButton from './MyButtons';
import { set } from 'react-native-reanimated';



export default function NotificationScreen( props ) {
    const[stackNavigation , setStackNavigation] = useState(props.navigation)
    return(
        <View style={{flex : 1}}>
            <View style={AppStyles.container}>   
                <Text>Notification Screen </Text>
            </View>
            <MenuButton navigation = {props.navigation} />
        </View>
        
    );
}


const styles = StyleSheet.create({
    
});