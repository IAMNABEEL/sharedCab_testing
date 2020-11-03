import { StyleSheet , Dimensions } from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default StyleSheet.create({
    themeColor: {
        // backgroundColor : '#ff9e09',
        flex : 1,
    },
    container: {
        flex : 1,
        // backgroundColor: '#e6d70b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    screen : {
        height : windowHeight , 
        width  : windowWidth
    }
});



  