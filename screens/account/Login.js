import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Divider } from 'react-native-elements';
import {useNavigation} from '@react-navigation/native'
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import { Avatar } from "react-native-elements";

 
import LoginForm from '../../components/account/LoginForm';

export default function Login() {
    
    return (
        <KeyboardAwareScrollView>
            <View style={styles.containerImg}>
                <Avatar
                    rounded
                    size="xlarge"
                    source={
                        require("../../assets/p3.jpg")
                    }
                />
            </View>
            <View
                style = {styles.container}
            >
                <LoginForm/>               
                <CreateAccountg />
            </View>
            <Divider
                style={styles.divider}
            />
        </KeyboardAwareScrollView>
    )
}

function CreateAccountg(props){
    const navigation = useNavigation()
    return (
        <Text 
            style={styles.register}
            onPress={ () => navigation.navigate("register")}
        >
            ¿Aún no tienes una cuenta? {" "}
            <Text
                style={styles.btnRegister}
            >
                Regístrate
                </Text>       
        </Text>               
    )
}

const styles = StyleSheet.create({
    // image:{
    //     height:150,
    //     width:"100%",
    //     marginBottom:20,
    //     marginTop:10
    // },
    container:{
        marginHorizontal:30,

    },
    containerImg:{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#F9F9F9",
        paddingVertical: 25,
    },
    divider:{
        backgroundColor:"#442484",
        margin:40
    },
    register:{
        marginTop:15,
        marginHorizontal:10,
        alignSelf:"center"
    },
    btnRegister:{
        color:"#442484",
        fontWeight:"bold",
    }
})
