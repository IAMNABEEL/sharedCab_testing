import React , {useState , useEffect} from 'react';
import { StyleSheet , View , Dimensions , Keyboard , Text , Platform , Linking ,Alert, ActivityIndicator , TextInput} from 'react-native';
import { IconButton , RadioButton } from 'react-native-paper';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import {Item, Input, Label } from 'native-base';

import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import Polyline from '@mapbox/polyline';
import AppStyles from '../styles/themeStyles';

const latitudeDelta3 = 0.0922
const longitudeDelta3 = latitudeDelta3 * AppStyles.screen.width/AppStyles.screen.height


export default function MyMapView( props ){
    
    // pickInput , DropOffInput 
    const[ pickInput , setPickInput ] = useState(null)
    const[ dropInput , setDropInput ] = useState(null)

    // Error Msg for Location
    const[ errorMsg  , setErrorMsg  ] = useState(null);

    // pick , drop coords
    const[ pickLatitude  , setPickLatitude  ] = useState(null)
    const[ pickLongitude , setPickLongitude ] = useState(null)
    const[ dropLatitude  , setDropLatitude  ] = useState(null)
    const[ dropLongitude , setDropLongitude ] = useState(null)

    // Coords for polyline
    const[coords , setCoords] = useState()

    // fetch route
    const[ isfetchRoute , setIsFetchRoute ] = useState(false)
      
    /// counter for input fields
    const[ myCounter , setMyCounter ] = useState(0)


    // conditional Rendering
    const[ isInputFieldVisible , setIsInputFieldVisible ] = useState( true  )
    const[ isNextButtonVisible , setisNextButtonVisible ] = useState( false )

    
    

    const counterFunc = ( inputFeild ) => {
        if(inputFeild == "pickUp" && pickInput === null){
            return myCounter + 1
        }else if(inputFeild == "dropOff" && dropInput === null){
            return myCounter + 1
        }
        return myCounter
    }

    const getPickDropObject = () => {

        let pickUpObject = {
            lat : pickLatitude , 
            lng : pickLongitude ,
            address : pickInput
        }
        let dropOffObject = {
            lat : dropLatitude , 
            lng : dropLongitude ,
            address : dropInput
        }


        return { pickUpObject : pickUpObject , dropOffObject : dropOffObject }
    }

    const getData = (lat , lng) => {
        Geocoder.init("AIzaSyDgOeL1TnDOy7ePEdvdcNs9sE2EDypRJ2Y")
        Geocoder.from(lat, lng)
        .then(json => {
            var addressComponent = json.results[0].address_components[0];
            setPickInput(json.results[0].formatted_address)
            setMyCounter(1)
            setPickLatitude(lat)
            setPickLongitude(lng)
        })
        .catch(error => console.warn(error));
    }

    const getDirections = async (inputFeild , lat , long) => {
        try {
            let resp = null
            if(inputFeild === 'Pick-UP Location'){
                resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?mode=driving&key=AIzaSyDgOeL1TnDOy7ePEdvdcNs9sE2EDypRJ2Y&origin=${lat},${long}&destination=${dropLatitude},${dropLongitude}`)
            }else{
                resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?mode=driving&key=AIzaSyDgOeL1TnDOy7ePEdvdcNs9sE2EDypRJ2Y&origin=${pickLatitude},${pickLongitude}&destination=${lat},${long}`)
            }
            
            let respJson = await resp.json();
            const response = respJson.routes[0]
            const distanceTime = response.legs[0]
            const distance = distanceTime.distance.text
            const time = distanceTime.duration.text
            
            const route = respJson.routes[0].overview_polyline.points;
            const points = Polyline.decode(route);
            
            const coords = points.map(point => {
                return {
                latitude: point[0],
                longitude: point[1]
                }
            })
            setCoords(coords);

        } catch(error) {
          console.log('Error: ', error)
        }
    }


    const fetchCurrentLocation = async () => {

        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location is Denied \n\t\t Please turn ON location');
        }

        let location = await Location.getCurrentPositionAsync({});
        getData(location.coords.latitude , location.coords.longitude)
    }

    

    useEffect( () => {
        console.disableYellowBox = true;

        if(props.route == null){
            fetchCurrentLocation();
        }
        else{
            let address     = props.route.address
            let counter     = props.route.counter
            let latitude    = props.route.latitude
            let longitude   = props.route.longitude
            let inputFeild  = props.route.inputFeild

            if(inputFeild === 'Pick-UP Location'){
                setPickInput(address)
                setMyCounter(counter)
                setPickLatitude(latitude)
                setPickLongitude(longitude)
              
            }else{
                setDropInput(address)
                setMyCounter(counter)
                setDropLatitude(latitude)
                setDropLongitude(longitude)
               
            }
            if(counter == 2){
                setIsFetchRoute(true)
                getDirections( inputFeild , latitude , longitude)
                setTimeout(function(){ setIsFetchRoute(false) } , 5000)
                setIsInputFieldVisible(false)
            }
        }
        
        

    } , [props]);

    if( isfetchRoute ){
        return(
            <View style={{flex : 1}}>
                <View style={AppStyles.container}>   
                    <Text>Fetching Route</Text>
                    <ActivityIndicator style={{marginTop : 50}} size="large" color="red" />
                </View>
            </View>
        );
    }

    else if( pickLongitude ){
        return(
            <View style = {{flex : 1}}>  
                <MapView  
                    style = {styles.map} 
                    // provider={PROVIDER_GOOGLE}
                    initialRegion = {{
                        latitude : pickLatitude ,
                        longitude: pickLongitude ,
                        latitudeDelta : latitudeDelta3,
                        longitudeDelta : longitudeDelta3
                    }}
                    showsUserLocation = { true }
                    
                >
                {
                    pickLongitude == null ? <View></View> :
                        <MapView.Marker
                            title='Pick-UP location'
                            pinColor={AppStyles.themeColor.backgroundColor}
                            coordinate={{ latitude : pickLatitude , longitude : pickLongitude }}
                        />
                }
                {
                    dropLongitude == null ? <View></View> :
                        <MapView.Marker
                            title='Drop-OFF location'
                            pinColor={AppStyles.themeColor.backgroundColor}
                            coordinate={{ latitude : dropLatitude , longitude : dropLongitude }}
                        />
                }

                <MapView.Polyline
                    strokeWidth={2}
                    strokeColor="red"
                    coordinates={coords}
                />
          
                </MapView>   
                
                { isInputFieldVisible === false 

                    ? ///// it is if part rendering
                    
                    <View style={{flex : 1}} >
                        <View style={styles.leftButtonStyle}>
                            <IconButton
                                style = {{backgroundColor : AppStyles.themeColor.backgroundColor }}
                                icon="arrow-left"
                                color="red"
                                size={35}
                                onPress={() =>  { setisNextButtonVisible(true)  , setIsInputFieldVisible(true)}}
                            />
                        </View>
                        
                        
                        <View style={styles.rightButtonStyle}>
                            <IconButton
                                style = {{backgroundColor : AppStyles.themeColor.backgroundColor }}
                                icon="arrow-right"
                                color='red'
                                size={35}
                                onPress={() => {
                                    Alert.alert(
                                        "Alert",
                                        "What to do Next",
                                        [
                                            {
                                                text: "Create Plan", 
                                                // props. navigation.navigate('WizardStep', { data: getPickDropObject()  }
                                                onPress: () => props.navigation.navigate('WizardStep', { data: getPickDropObject() , headerTitle : 'Create Plan'  }),
                                            },
                                            { 
                                                text: "Find Driver",
                                                onPress: () => console.log(getPickDropObject()),
                                               
                                            }
                                        ],
                                        { cancelable: false }
                                    );
                                }}
                            />
                        </View>
                            
                    </View>
                                        
                    : ////// it is else part rendering

                    <View style={ styles.viewStyle } >  
                        {
                            isNextButtonVisible == false ? null 
                            
                            : /// else part rendering
                            <View style={styles.rightButtonOnInputFeildsStyle}>
                                <IconButton
                                    style = {{backgroundColor : AppStyles.themeColor.backgroundColor }}
                                    icon="arrow-right"
                                    color="red"
                                    size={35}
                                    onPress={() =>  { setIsInputFieldVisible(false)}}
                                />
                            </View>
                        }
                        
                        <View style={{paddingTop : 20 , backgroundColor : "#fff"}}>
                        {/* <Item floatingLabel>
                            <Label style={{paddingStart:5}}>Pick-UP Location</Label>
                            <Input 
                                style = {styles.TextInput}
                                    autoFocus = { false }
                                    label = "Pick-UP Location"
                                    value={pickInput}
                                    onTouchStart ={() => {Keyboard.dismiss() , props.navigation.navigate('AutoCompleteGooglePlacesScreen' , {headerTitle : 'Pick-UP Location' , counter : counterFunc('pickUp') } ) }}
                                    onFocus = {() => Keyboard.dismiss()}
                            />
                        </Item>
                        <Item style={{marginTop:5}} floatingLabel>
                            <Label style={{paddingStart:5}}>Drop-OFF Location</Label>
                            <Input 
                            onPress={()=> console.log('Working')}
                                 style = {styles.TextInput}
                                    autoFocus =  { false } 
                                    label = "Drop-OFF Location"
                                    value={dropInput}
                                    onTouchStart ={() => {Keyboard.dismiss() , props.navigation.navigate('AutoCompleteGooglePlacesScreen',  {headerTitle : 'Drop-OFF Location', counter :  counterFunc('dropOff') } ) }}
                                    onFocus = {() =>  Keyboard.dismiss()}
                            />
                        </Item> */}
                            <View style={{padding:'2%' }}>
                                <TextInput
                                    style = {styles.TextInput}
                                    autoFocus = { false }
                                    label = "Pick-UP Location"
                                    value={pickInput}
                                    onTouchStart ={() => {Keyboard.dismiss() , props.navigation.navigate('AutoCompleteGooglePlacesScreen' , {headerTitle : 'Pick-UP Location' , counter : counterFunc('pickUp') } ) }}
                                    onFocus = {() => Keyboard.dismiss()}
                                />
                            </View>
                            
                            <View style={{padding:'2%'}}>
                                <TextInput
                                    style = {styles.TextInput}
                                    autoFocus =  { true } 
                                    label = "Drop-OFF Location"
                                    value={dropInput}
                                    onTouchStart ={() => {Keyboard.dismiss() , props.navigation.navigate('AutoCompleteGooglePlacesScreen',  {headerTitle : 'Drop-OFF Location', counter :  counterFunc('dropOff') } ) }}
                                    onFocus = {() =>  Keyboard.dismiss()}
                                />
                            </View>
                        </View>
                    </View> 
                }
                
            </View>
        );
    }else{
        return(
            <View style={{flex : 1}}>
                <View style={AppStyles.container}>   
                    <Text>{ errorMsg ? errorMsg : "We are Getting Your Location" }</Text>
                </View>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    map : {
        ...StyleSheet.absoluteFillObject,
    },
    viewStyle : {
        position:'absolute',
        bottom : '0%' ,
        alignSelf : 'center' , 
        width :AppStyles.screen.width
    },
    leftButtonStyle : {
        position : 'absolute',
        bottom : '3%' ,
        left   : '2%'
    },
    rightButtonStyle : {
        position : 'absolute',
        bottom : '3%' ,
        right   : '2%'
    },
    rightButtonOnInputFeildsStyle : {
        bottom : '9%' ,
        right   : '2%' ,
        alignSelf : 'flex-end'
    },
    TextInput : {
        marginTop:10,
        padding: 10,
        borderRadius:10,
		fontSize: AppStyles.screen.width / 20,
		width: AppStyles.screen.width/1.1,

	},
});