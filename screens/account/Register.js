import React from 'react'
import { StyleSheet, Image} from 'react-native'
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import RegisterForm from '../../components/account/RegisterForm';

export default function Register() {
    return (
        <KeyboardAwareScrollView
            contentContainerStyle = {styles.container}
        >
            <Image
                 source={require("../../assets/restaurantLogo.png")}
                 resizeMode= "contain"
                 style ={styles.image}
            />
            <RegisterForm/>
        </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
    image:{
        height:150,
        width:"100%",
        marginBottom:20,
        marginTop:10
    }
})
