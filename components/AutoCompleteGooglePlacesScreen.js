import React , {useState} from 'react';
import { StyleSheet, Text, View , TouchableOpacity , Modal , SafeAreaView } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import AppStyles from '../styles/themeStyles';
import MyAppBarHeader from './MyAppBarHeader';
import HomeScreen from './HomeSceen';




const latitudeDelta3 = 0.0922
const longitudeDelta3 = latitudeDelta3 * AppStyles.screen.width/AppStyles.screen.height



export default function AutoCompleteGooglePlacesScreen( props ) {

    const getData = ( Address ) => {
        Geocoder.init("AIzaSyDgOeL1TnDOy7ePEdvdcNs9sE2EDypRJ2Y")
        Geocoder.from(Address.description)
            .then(json => {
                var location = json.results[0].geometry.location;
                props.navigation.navigate('HomeScreen' , {
                    address : Address.description ,
                    latitude : location.lat ,
                    longitude : location.lng ,
                    inputFeild : props.route.params.headerTitle ,
                    counter : props.route.params.counter
                })
            })
            .catch(error => alert(error));  
    }



    return(
        <View style={{flex : 1}}>
            <MapView  
                style = {styles.map} 
                provider={PROVIDER_GOOGLE}
                initialRegion = {{
                    latitude : 31.5204 ,
                    longitude: 74.3587 ,
                    latitudeDelta : latitudeDelta3,
                    longitudeDelta : longitudeDelta3
                }}
            >
            </MapView>   
            <MyAppBarHeader props = {props} />
            <View style={styles.viewStyle}>  
                <GooglePlacesAutocomplete
                    placeholder = "Searh Location"
                    autoFocus={true}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                    listViewDisplayed='auto'    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row =>  row.description } // custom description render
                    onPress={(data, details) => { // 'details' is provided when fetchDetails = true
                        getData(data)
                    }}
                    
                    onKeyPress = {(e) => {
                        if(e.nativeEvent.key == "done"){
                        }
                    }}
                    query={{
                        key: 'AIzaSyDgOeL1TnDOy7ePEdvdcNs9sE2EDypRJ2Y',
                        language: 'en', // language of the results
                    }}

                    // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                    // currentLocationLabel="Current location"
                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GoogleReverseGeocodingQuery={{
                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    }}
                    GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance',
                        type: 'cafe'
                    }}
                    
                    GooglePlacesDetailsQuery={{
                        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                        fields: 'formatted_address',
                    }}

                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                    // predefinedPlaces={[homePlace, workPlace]}

                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    // renderLeftButton={()  =>  <Text>Custom text after the input</Text>}
                    // renderRightButton={() => <Text>Custom text after the input</Text>}
                />
            </View>  
            {/* <ExitButton navigation = {props.navigation} /> */}
        </View>
    );
}


const styles = StyleSheet.create({
    map : {
        ...StyleSheet.absoluteFillObject,
    },
    viewStyle : {
        position:'absolute',
        top : '12%' ,
        alignSelf : 'center' ,
        width: AppStyles.screen.width ,
        backgroundColor : AppStyles.themeColor.backgroundColor
    },
});