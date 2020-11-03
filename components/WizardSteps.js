import React,{useState , useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity , Keyboard , Modal ,Picker ,ScrollView} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import MyAppBarHeader from './MyAppBarHeader';
import { Divider, TextInput} from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AppStyles from '../styles/themeStyles';

export default function WizardStep(props) {
		

		const[ pickLocation , setPickLocation ] = useState(props.route.params.data.pickUpObject.address);
		const[ dropLocation , setDropLocation ] = useState(props.route.params.data.dropOffObject.address);
        const[ date , setDate ] = useState();
		const[ time , setTime ] = useState();
		const[ isModalVisible , setIsModalVisible ] = useState(false);
        const[ whichPicker , setWhichPicker ] = useState('');
        const[ isDatePickerVisible , setIsDatePickerVisible ] = useState(false);
		const[ currentStep , setCurrentStep] = useState(0);
		const[ steps , setSteps] = useState(['Departure Info', 'Ride Info', 'Confirmation']);

		const[ pickerItems , setPickerItems ] = useState([]);
		const[ currentModel , setCurrentModel ] = useState('');
		const[ vehicleType , setVehicleType ] = useState('Any');
		const[ rideType , setRideType ] = useState('Shared');
		const[ numberOfSeats , setNumberOfSeats ] = useState(1);
        


		const dateTimeFormatter = (data , type) => {
			
			if(type == 'date'){
				var months = ["January","February","March","April","May","June","July",
								"August","September","October","November","December" ];	
				let newDate = data.getDate()+" "+ months[data.getMonth()] +' '+data.getFullYear();
				setDate(newDate)
			
			}else{
				let hours = data.getHours() == 0 ? 12 : data.getHours();
				let meridies = hours > 12 ? 'PM' : 'AM';
				let newHours = hours > 12 ? hours - 12 : hours 
				let newTime  = newHours +':'+ data.getMinutes() +':'+data.getSeconds() + " "+meridies;
				setTime(newTime)
			}
			hideDatePicker();
		}

        const showDatePicker = () => {
            setIsDatePickerVisible(true);
        };
        
        const hideDatePicker = () => {
            setIsDatePickerVisible(false);
        };

        const setCurrentPicker = (value) => {
            if(value == 'date'){
                setWhichPicker('date')
            }else{
                setWhichPicker('time')
            }
            showDatePicker()
		}

		const hanldeModelValue = (itemValue) => {
			if(currentModel == 'Vehicle'){
				setVehicleType(itemValue)
			}else if(currentModel == 'Ride'){
				setRideType(itemValue);
			}else{
				setNumberOfSeats(itemValue)
			}
			setIsModalVisible(false)
		}

		const handleModel = ( model ) => {
			if(model == 'Vehicle'){
				var items = [
					{lable : "Any" , value : "Any" },
					{lable : "Economy ( 1001-1600cc )" , value : "Economy ( 1001-1600cc )" },
					{lable : "Luxury ( Upto 1600cc )" , value : "Luxury ( Upto 1600cc )" },
				]
				setPickerItems(items);
			}
			else if(model == 'Ride'){
				var items = [
					{lable : "Shared" , value : "Shared" } ,  
					{lable : "Full_Book" , value : "Full_Book" } ,  
				]
				setPickerItems(items);
			}
			else{
				var items = [
					{lable : "1" , value : "1" } ,  
					{lable : "2" , value : "2" } ,  
					{lable : "3" , value : "3" } ,  
					{lable : "4" , value : "4" } ,  
				]
				setPickerItems(items);
			}
		
			setCurrentModel(model)
			setIsModalVisible(true)
		}


		const selectedValueOFCurrentModel = () =>{
			if(currentModel == 'Vehicle'){
				return vehicleType;
			}else if(currentModel == 'Ride'){
				return rideType;
			}
				return numberOfSeats;
			
		}
		

		
		useEffect(() => {
		
			let date = new Date()
			dateTimeFormatter(date , 'date');
			dateTimeFormatter(date , 'time');
		}, []);
		

		return (
			<View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#f6f6f6'}}>

                <DateTimePickerModal
					headerTextIOS = {'Pick ' + whichPicker}
                    isVisible={isDatePickerVisible}
                    mode={whichPicker}
                    onConfirm={(data) =>  { dateTimeFormatter(data , whichPicker)}}
                    onCancel={hideDatePicker}
                />
				
				<Modal
					animationType='fade'
					transparent={true}
					visible={isModalVisible}
				>
					<View style={{backgroundColor:  '#00000040', color:'#FFFFFF' }}>
						<View style={{marginTop : '50%' , marginHorizontal: '3%', paddingTop:'10%' ,backgroundColor:'#ffffff' , borderRadius:10}}>
							<View style={{alignItems:'center' , paddingBottom:'20%'}}><Text style = {{ fontSize : 20 }}>Pick {currentModel} </Text></View>
							<Divider></Divider>
							<Picker
								selectedValue={selectedValueOFCurrentModel()}
								onValueChange={(itemValue) => {hanldeModelValue(itemValue)}}
							>
							{
								pickerItems.map( item => {
									return <Picker.Item label={item.lable} value={item.value} />
								})
							}
								
								
							</Picker>
						</View>
						<View style={{ marginHorizontal: '3%',backgroundColor:'#ffffff' , borderRadius:10 ,marginVertical:'2.5%' }}>
							<TouchableOpacity
							    style={{alignItems:"center" , paddingVertical:'6%'}}
								onPress={() => {setIsModalVisible(false)}}
							>
								<Text style = {{ fontSize : 20 , color:'blue'}}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>

				<MyAppBarHeader props = {props} />

				<View style={{alignItems: 'center' , marginTop:'10%'}}>
					<View style={{width: 280, height: 70}}>
						<View style={{alignItems: 'center'}}>
							<View style={{height: 2, backgroundColor: '#ff9e09', width: '78%', position: 'absolute', top: 13, zIndex: 10}} />
						</View>
						<View style={{flexDirection: 'row', width: '100%', position: 'absolute', zIndex: 20}}>
							{steps.map((label, i) =>
								<View key={i} style={{alignItems: 'center', width: '33.3%'}}>
									{i > currentStep && i != currentStep && /* Not selected */
										<View style={[styles.stepsStyle ,{ backgroundColor: '#fff', borderColor: '#ff9e09' }]}>
											<Text style={{fontSize: 15, color: '#ff9e09'}}>{i+1}</Text>
										</View>
									}
									{i < currentStep && /* Checked */
										<View style={[styles.stepsStyle ,{ backgroundColor: '#0faf9a', borderColor: '#0faf9a' }]}>
											<Ionicons name="md-checkmark" size={20} color="#fff" />
										</View>
									}
									{i == currentStep && /* Selected */
										<View style={[styles.stepsStyle ,{ backgroundColor: '#ff9e09', borderColor: '#ff9e09' }]}>
											<Text style={{fontSize: 13, color: '#ffffff'}}>{i+1}</Text>
										</View>
									}
									<Text style={{fontSize: 12}}>{label}</Text>
								</View>
							)}
						</View>
					</View>
				</View>
				
				<View style={{flex:1 }}>
					{currentStep == 0 &&
						<View style={{height: '85%' ,justifyContent:'center' ,marginHorizontal:'6%'   }}>
							<TouchableOpacity
								style={styles.touchableOpacity}
								onPress={() => {setCurrentPicker('date')}}
							>
								<Text style = {{ fontSize : 20}}><Text style = {{ fontWeight: "bold" }}>Date :</Text> {date}</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.touchableOpacity}
								onPress={() => {setCurrentPicker('time')}}
							>
								<Text style = {{ fontSize : 20}}><Text style = {{ fontWeight: "bold" }}>Time :</Text> {time}</Text>
							</TouchableOpacity>

							
						</View>
					}	
					{currentStep == 1 &&	
						<View style={{height: '85%', justifyContent:'center' ,marginHorizontal:'6%'}}>
							
							<TouchableOpacity
								style={styles.touchableOpacity}
								onPress={() => {handleModel('Vehicle')}}
							>
								<Text style = {{ fontSize : 18}}><Text style = {{ fontWeight: "bold" }}>Vehicle type :</Text> {vehicleType}</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.touchableOpacity}
								onPress={() => {handleModel('Ride')}}
							>
								<Text style = {{ fontSize : 18}}><Text style = {{ fontWeight: "bold" }}>Ride type :</Text> {rideType}</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.touchableOpacity}
								onPress={() => {handleModel('Seat')}}
							>
								<Text style = {{ fontSize : 18}}><Text style = {{ fontWeight: "bold" }}>Number Of Seats :</Text> {numberOfSeats}</Text>
							</TouchableOpacity>
						</View>
					}	
					{currentStep == 2 &&	
						<View style={styles.confirmationStyle}>
						<ScrollView style={{borderRadius : 10 }}>
						<TextInput
							label="Pick-UP Location"
							value={pickLocation}
							disabled = {true}
						/>
						<TextInput
							label="Drop-OFF Location"
							value={dropLocation}
							disabled = {true}
						/>
						<TextInput
							label="Date"
							value={date}
							disabled = {true}
						/>
						<TextInput
							label="Time"
							value={time}
							disabled = {true}
						/>
						<TextInput
							label="Vehicle-Type"
							value={vehicleType}
							disabled = {true}
						/>
						<TextInput
							label="Ride-Type"
							value={rideType}
							disabled = {true}
						/>
						<TextInput
							label="Number-Of-Seats"
							value={numberOfSeats}
							disabled = {true}
						/>
						</ScrollView>
						</View>
					}	

					<View style={{flexDirection: 'row', justifyContent: 'space-between' , flex:1 , paddingTop:'4%' }}>
						{currentStep > 0 ?
							<TouchableOpacity style={[styles.centerElement, { left: 20 }]} onPress={() => {
								if(currentStep > 0){
									setCurrentStep(currentStep - 1);
								}
							}}>
								<Text >Back</Text>
							</TouchableOpacity>
							: <Text> </Text>
						}
						{(currentStep+1) < steps.length /* add other conditions here */ &&
							<TouchableOpacity style={[styles.centerElement, {right: 20 }]} onPress={() => {
								if((currentStep+1) < steps.length){
									setCurrentStep(currentStep + 1);
								}
							}}>
								<Text >Next</Text>
							</TouchableOpacity>
						}
						{(currentStep+1) == steps.length /* add other conditions here */ &&
							<TouchableOpacity style={[styles.centerElement, {right: 20 }]} onPress={() => {
								console.log('Finish');
							}}>
								<Text >Confirm</Text>
							</TouchableOpacity>
						}
					</View>
				</View>
			</View>
		);
	}





const styles = StyleSheet.create({
	centerElement: {
		justifyContent: 'center', 
		alignItems: 'center' , 
		width: 80,
		height: 35,
		backgroundColor: '#ff9e09',
		elevation: 10,
		borderRadius: 20
	},
	touchableOpacity: {
		paddingStart : "8%",
		padding : 15 , 
		borderWidth : 2 ,
		borderColor : AppStyles.themeColor.backgroundColor,
		borderRadius : 10 ,
		marginTop : '2%'
	},
	stepsStyle: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 33,
		height: 30,
		borderWidth: 2,
		borderRadius: 15,
		marginBottom: 10
	},
	confirmationStyle : {
		borderWidth : 2 ,
		borderColor : AppStyles.themeColor.backgroundColor,
		borderRadius : 10 ,
		height: '85%',
		justifyContent:'center' ,
		marginHorizontal:'6%'
	}
	
	
	
});
