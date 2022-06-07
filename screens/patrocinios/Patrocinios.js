import React, {useState,useEffect,useCallback} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import Loading from '../../components/Loading';
import {useFocusEffect} from '@react-navigation/native'

import * as firebase from 'firebase'
import { getPatrocinios } from '../../utils/actions';

export default function Patrocinios({navigation}) {

    const [user, setUser] = useState(null)
    const [startPatrocinio, setStartPatrocinio] = useState(null)
    const [patrocinios, setPatrocinios] = useState([])
    const [loading, setLoading] = useState(false)


    const limitPatrocinio = 7
    console.log("patrocinios",patrocinios)

    useFocusEffect(
        useCallback( async () => {
            setLoading(true)
            const response = await getPatrocinios(limitPatrocinio)
            if (response.statusResponse) {
                setStartPatrocinio(response.startRestaurant)
                setPatrocinios(response.restaurants)
            }
            setLoading(false)

        }, [] )

    )

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo)=>{
            userInfo ? setUser(true):setUser(false)
        })
    },[])

   if (user === null) {
       return <Loading isVisible={true} text="Cargando..."/>
   }

    return (
        <View
            style={styles.viewBody}
        >
            <Text>Patrocinios</Text>
            {
                user && (
                    <Icon
                        type = "material-community"
                        name = "plus"
                        color = "#442484"
                        reverse
                        containerStyle = {styles.btnContainer}
                        onPress={()=> navigation.navigate("add-patrocinios")}
                    />
                )
            }
            <Loading isVisible={ loading } text="Cargando patrocinios"/>
        </View>
    )
}
 
const styles = StyleSheet.create({

    viewBody:{
        flex:1
    },
    btnContainer:{
        position:"absolute",
        bottom:10,
        right:10,
        shadowColor:"black",
        shadowOffset:{width:2,height:2},
        shadowOpacity:0.5
    }
})