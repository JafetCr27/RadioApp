import React, {useState} from 'react'
import { StyleSheet, View, ScrollView, Alert, Dimensions } from 'react-native'
import { Input, Button,Icon, Avatar ,Image} from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal'

import { map , size , filter } from 'lodash'
import { loadImageFromGallery } from '../../utils/helpers';

const widthScreen = Dimensions.get("window").width

export default function AddPatrocinioForm({ toasRef,setLoading, navigation}) {
      
    const [formData, setFormData] = useState(defaultValues())
    const [errorName, setErrorName] = useState(null)    
    const [errorDescription, setErrorDescription] = useState(null)    
    const [errorEmail, setErrorEmail] = useState(null)    
    const [errorAddress, setErrorAddress] = useState(null)    
    const [errorPhone, setErrorPhone] = useState(null)    
    const [imagesSelected, setImagesSelected] = useState([])


    const addPatrocinio = () =>{
        console.log(formData)
        console.log("Fuck Yeah!!")
    }


    return (
        <ScrollView style={styles.viewContainer}>
            
            <ImagePatrocinio
                imagePatrocinio = {imagesSelected[0]}
            />
            <FormAdd 
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorDescription={errorDescription}
                errorAddress={errorAddress}
                errorEmail={errorEmail}
                errorPhone={errorPhone}
            />
            <UploadImage 
                toasRef={toasRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title="Crear patrocinio"
                onPress={addPatrocinio}
                buttonStyle={styles.btnAddPatrocinio}
            />
        </ScrollView>
    )

}
function ImagePatrocinio( { imagePatrocinio } ){
    return(

        <View style={ styles.viewPhoto }>
            <Image
                style={
                    {
                        width  : widthScreen,
                        height : 200
                    }
                }
                source={
                    imagePatrocinio 
                    ? {uri:imagePatrocinio}
                    : require("../../assets/noImage.png")
                }
            />
        </View>
    )
}
function UploadImage ({toasRef,imagesSelected,setImagesSelected}) {

    const imageSelec = async () => {
        const response = await loadImageFromGallery([4,3])
        if(!response.status){
            toasRef.current.show("Debe seleccionar una imagen",3000)
            return
        }
        console.log("aqui")
        setImagesSelected([...imagesSelected,response.image])

    }
    const removeImage = (image) =>{
        Alert.alert(
            "Eliminar Imagen",
            "¿Esta seguro de eliminar la imagen?",
            [
                {
                    text:"No",
                    style:"cancel"
                },
                {
                    text:"Si",
                    onPress : () => {
                       setImagesSelected(
                           filter(imagesSelected,(imageUrl) => imageUrl !== image)
                       )
                    }
                },
             
            ],
            {
                cancelable:true
            }
        )
    }
    return (

        <ScrollView 
            horizontal
            style={styles.viewImage}
        >
            {
                size(imagesSelected) < 10 && (

                    <Icon
                        type="material-community"
                        name="camera"
                        color="#7a7a7a"
                        containerStyle={styles.containerIcon}
                        onPress={imageSelec}
                    />
                )
            }
            {
                map ( imagesSelected, (imagePatrocinio,index ) => (

                    <Avatar
                        key={index}
                        style={styles.miniatureStyle}     
                        source={{uri:imagePatrocinio}}
                        onPress={()=> removeImage(imagePatrocinio)}
                    />
                )
            )}

        </ScrollView>
    )
}
function FormAdd({formData,setFormData,errorName,errorDescription,errorAddress,errorEmail,errorPhone}){
    const [country, setCountry] = useState("CR")
    const [calligCode, setCalligCode] = useState("506")
    const [phone, setPhone] = useState("")

    const onChange = (e, type) => {
        setFormData({ ...formData , [type] : e.nativeEvent.text })
    }


    return(
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre de patrocinio"
                defaultValue={formData.name}
                onChange={(e)=> onChange(e,"name")}
                errorMessage={errorName}
            />
            <Input
                placeholder="Dirección"
                defaultValue={formData.address}
                onChange={(e)=> onChange(e,"address")}
                errorMessage={errorAddress}
            />
            <Input
                keyboardType="email-address"
                placeholder="Email"
                defaultValue={formData.email}
                onChange={(e)=> onChange(e,"email")}
                errorMessage={errorEmail}
            />
            <View style={styles.phoneView}>
                <CountryPicker 
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerStyle={styles.contryPicket}
                    countryCode = {country}
                    onSelect={(country)=>{
                        setFormData(
                            {...formData,
                                "country" : country.cca2,
                                "callingCode" : country.callingCode[0]
                            })
                        setCountry(country.cca2)
                        setCalligCode(country.callingCode[0])
                    }}
                />
                <Input
                    placeholder="WhatsApp..."
                    keyboardType="phone-pad"
                    containerStyle={styles.inputPhone}
                    defaultValue={formData.phone}
                    onChange={(e)=> onChange(e,"phone")}
                    errorMessage={errorPhone}
                />
            </View>
        <Input
                placeholder="Descripción..."
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.description}
                onChange={(e)=> onChange(e,"description")}
                errorMessage={errorDescription}
            />
        </View>
    )
}
const defaultValues = () =>{
    return {
        name:"",
        description:"",
        address:"",
        phone:"",
        faceBook:"",
        instagram:"",
        country:"CR",
        callingCode:"506",
        email:""
    }
}
const styles = StyleSheet.create({
    viewContainer:{
        height:"100%"
    },
    viewForm:{
        marginVertical:10,
        marginHorizontal:10
    },
    textArea:{
        height:100,
        width:"100%"
    },
    phoneView:{
        width:"80%",
        flexDirection:"row"
    },
    inputPhone:{
        width:"80%"
    },
    btnAddPatrocinio:{
        margin:20,
        backgroundColor:"#442484"
    },
    viewImage:{
         flexDirection: "row",
         marginHorizontal: 20,
         marginTop: 30
    },
    containerIcon:{
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 80,
        width: 80,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle:{
        width:80,
        height:80,
        marginRight:10
    },
    viewPhoto:{
        alignItems:"center",
        height:200,
        marginBottom:20
    }
})
