import React  from 'react';
import { Text, View  } from 'react-native';

export default function LoginScreen( {navigation} ) {
    return(
        <View style={{flex : 1, justifyContent:"center"}}>
        <Text>This Is Login Screen</Text>
                <Text onPress={() => {navigation.navigate('HomeScreen')}}>Go to Home Screen </Text>
        </View>
        
    );
}
