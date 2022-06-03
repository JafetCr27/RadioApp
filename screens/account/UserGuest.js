import React from 'react'
import { StyleSheet, Text, ScrollView,Image } from 'react-native'
import {Button} from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'

export default function UserGuest() {
    
    const navigation = useNavigation()
    return (
        <ScrollView
            centerContent
            style={styles.viewBody}
        >
            <Image
                source={require("../../assets/motoOb.png")}
                resizeMode= "contain"
                style= {
                    styles.image
                }
            />
            <Text
                style={styles.title}
            >
                Consulta tu perfil en Gravity Radio
            </Text>
            <Text
                style={styles.description}
            >
                Lorem ipsum dolor sit amet consectetur adipiscing elit nulla leo fusce, cursus tellus arcu per litora curae molestie lectus nam donec,
                magna nascetur eget habitasse etiam dictum tempus quisque ultricies. Nostra orci gravida class porta lacinia ornare potenti molestie
            </Text>
            <Button
                title="Ir a mi perfil"
                buttonStyle={styles.button}
                onPress={() => navigation.navigate("login")}
            />
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    viewBody:{
        marginTop:25,
        marginHorizontal:30
    },
    image:{
        height:300,
        width:"100%",
        marginBottom:10,
    },
    title:{
        fontWeight:"bold",
        textAlign:"center",
        marginVertical:10,
        fontSize:19
    },
    description:{
        textAlign:"center",
        marginBottom:20,
        color:"#a65273"
    },
    button:{
        backgroundColor:"#442484"
    }
})