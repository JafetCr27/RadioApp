import React, {useState,useEffect,useCallback} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import Loading from '../../components/Loading';
import {useFocusEffect} from '@react-navigation/native'
import { size } from 'lodash'

import * as firebase from 'firebase'
import { getPatrocinios, getMorePatrocinios } from '../../utils/actions';
import ListPatrocinios from '../../components/patrocinios/ListPatrocinios';

export default function Patrocinios({navigation}) {

    const [user, setUser] = useState(null)
    const [startPatrocinio, setStartPatrocinio] = useState(null)
    const [patrocinios, setPatrocinios] = useState([])
    const [loading, setLoading] = useState(false)


    const limitPatrocinio = 7
    useFocusEffect(
        useCallback(() => {
            async function getData(){
                setLoading(true)
                const response = await getPatrocinios(limitPatrocinio)
                if (response.statusResponse) {
                    setStartPatrocinio(response.startRestaurant)
                    setPatrocinios(response.restaurants)
                }
                setLoading(false)
            }
            getData()
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
   const handleLoadMore = async() => {
    if (!startPatrocinio) {
        return
    }

    setLoading(true)
    const response = await getMorePatrocinios(limitPatrocinio, startPatrocinio)
    if (response.statusResponse) {
        setStartPatrocinio(response.startRestaurant)
        setPatrocinios([...patrocinios, ...response.restaurants])
    }
    setLoading(false)
}

    return (
        <View
            style={styles.viewBody}
        >
            {
                size(patrocinios) > 0 ? (
                    <ListPatrocinios
                        patrocinios={patrocinios}
                        navigation = {navigation}
                        handleLoadMore = {handleLoadMore}
                    />
                ) : (
                    <View style={styles.notFoundView}>
                        <Text style={styles.notFoundText}>No hay patrocinadores registrados.</Text>
                    </View>
                )
            }
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
    },
    notFoundView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    notFoundText: {
        fontSize: 18,
        fontWeight: "bold"
    }
})