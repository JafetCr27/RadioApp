import React, { useState , useEffect } from 'react'
import { map } from 'lodash'
import { Dimensions, StyleSheet, Text, ScrollView,View } from 'react-native'
import { Icon, ListItem, Rating } from 'react-native-elements'
import CarouselImages from '../../components/CarouselImages'
import Loading from '../../components/Loading'

import MapPatrocinio from '../../components/patrocinios/MapPatrocinio'
import { getDocumentById } from '../../utils/actions'
import { formatPhone } from '../../utils/helpers'

export default function Patrocinio({navigation,route}) {
    const {id,name} = route.params
    const [patrocinio, setPatrocinio] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)

    const witthScreen =  Dimensions.get("window").width

    navigation.setOptions( { title : name } )

    useEffect (() =>{
        (async ()=>{
            const response = await getDocumentById("patrocinios",id)
            if (response.statusResponse) {
                setPatrocinio(response.document)
            }else{
                setPatrocinio({})
                Alert.alert("Ha ocurrido un error al cargar el patrocinio, intente mas tarde")
            }
        })()
    },[])
    if (!patrocinio) {
        return <Loading isVisible={true} text="Cargando.."/>
    }
    return (
        
        <ScrollView
            style={styles.viewBody}
        >
            <CarouselImages
                images={patrocinio.images}
                height={250}
                width={witthScreen}
                activeSlide = {activeSlide}
                setActiveSlide = {setActiveSlide}
            
            />
            <TitlePatrocinio
                name={patrocinio.name}
                description={patrocinio.description}
                rating={5}
            />
            <PatrocinioInfo
                name={patrocinio.name}
                location={patrocinio.location}
                address={patrocinio.address}
                email={patrocinio.email}
                phone={formatPhone(patrocinio.callingCode,patrocinio.phone)}
            />
        </ScrollView>
    )
}
function PatrocinioInfo({name,location,address,email,phone}) {

    const listInfo = [
        { text: address, iconName: "map-marker"},
        { text: phone, iconName: "phone"},
        { text: email, iconName: "at"}
    ]

    return(
        <View
            style={styles.viewPatrocinio}
        >
            <Text style = {styles.patrocinioInfoTitle}>Información sobre patrocinio</Text>
            <MapPatrocinio
                location={location}
                name={name}
                height={150}
            />
            {
                map( listInfo,(item,index) => (
                    <ListItem
                        key={index}
                        style={styles.containerListItem}
                    >
                        <Icon
                            type="material-community"
                            name={item.iconName}
                            color="#442484"
                        />
                        <ListItem.Content>
                            <ListItem.Title>{item.text}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>

    )
}
function TitlePatrocinio({name,description,rating}) {
    return(
        
        <View style={styles.viewPatrocioTitle}>
            <View style={styles.viewPatrocinioContainer}>
                <Text style = {styles.namePatrocinio}>{name}</Text>
                <Rating
                     style={styles.rating}
                     imageSize = {20}
                     readonly
                     start
                     startingValue={parseFloat(rating)}
                />
            </View>
            <Text style = {styles.descriptionPatrocinio}>{description}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    viewBody:{
        flex : 1,
        backgroundColor:"#fff"
    },
    viewPatrocioTitle: {
        padding:15
    },
    viewPatrocinioContainer:{
        flexDirection:"row"  
    },
    namePatrocinio:{
        fontWeight:"bold"
    },
    rating:{
        position:"absolute",
        right:0
    },
    descriptionPatrocinio:{
        marginTop:10,
        color:"gray",
        textAlign:"justify"
    },
    viewPatrocinio:{
        margin:15,
        marginTop:25
    },
    patrocinioInfoTitle:{
        fontWeight:"bold",
        fontSize:15,
        marginBottom:15
    },
    containerListItem:{
        borderBottomColor:"a376c7",
        borderBottomWidth:1
    }
})
