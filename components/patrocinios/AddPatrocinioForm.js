import React, {useState,useEffect} from 'react'
import { StyleSheet, View, ScrollView, Alert, Dimensions,Text } from 'react-native'
import { Input, Button,Icon, Avatar ,Image} from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal'
import { map , size , filter , isEmpty } from 'lodash'
import MapView from 'react-native-maps';
import uuid from 'random-uuid-v4'

import { loadImageFromGallery,getCurrentLocation,validateEmail } from '../../utils/helpers';
import Modal from '../../components/Modal'
import { uploadImage, getCurrentUser, addDocumentWithoutId } from '../../utils/actions';

const widthScreen = Dimensions.get("window").width

export default function AddPatrocinioForm({ toastRef,setLoading, navigation}) {
      
    const [formData, setFormData] = useState(defaultValues())
    const [errorName, setErrorName] = useState(null)    
    const [errorDescription, setErrorDescription] = useState(null)    
    const [errorEmail, setErrorEmail] = useState(null)    
    const [errorAddress, setErrorAddress] = useState(null)    
    const [errorPhone, setErrorPhone] = useState(null)    
    const [imagesSelected, setImagesSelected] = useState([])
    const [isVisibleMap,setIsVisibleMap] = useState(false)
    const [locationPatrocinio, setLocationPatrocinio] = useState(null)
    const addPatrocinio = async () =>{
        if (!validForm()) {
            return
        }
        setLoading(true)
        const responseUploadImage = await uploadImages()
        const patrocinio = {
            name : formData.name,
            address : formData.address,
            email : formData.email,
            callingCode : formData.callingCode,
            description : formData.description,
            address : formData.address,
            location : locationPatrocinio,
            images:imagesSelected,
            raitng:0,
            raitngTotal:0,
            quantityVotng:0,
            createAt: new Date(),
            createBy: getCurrentUser().uid
        }
        const responseAddDocument = await addDocumentWithoutId("patrocinios",patrocinio)
        setLoading(false)
        if (!responseAddDocument.statusResponse) {
            toastRef.current.show("Error al ingresar el patrocinio")
            setLoading(false)
            return
        }
         navigation.navigate("patrocinios")
    }
    const uploadImages = async () =>{
        const imagesUrl = []
        await Promise.all(
            map( imagesSelected, async ( image ) => {
                const response = await uploadImage(image,"Patrocinios",uuid())
                if (response.statusResponse) {
                    imagesUrl.push(response.url)
                }
            })
        )
        return imagesUrl
    }
    const validForm = () =>{
        clearErrors()
        let isValid = true

        if (isEmpty(formData.name)) {
            setErrorName("Debes ingresar un nombre")
            isValid = false
        }
        if (isEmpty(formData.address)) {
            setErrorAddress("Debes ingresar la direción")
            isValid = false
        }
        if (isEmpty(formData.phone)) {
            setErrorPhone("Debes ingresar un teléfono")
            isValid = false
        }
        if (size(formData.phone)>8) {
            setErrorPhone("Solo puedes ingresar 8 dígitos")
            isValid = false
        }
        if (isEmpty(formData.description)) {
            setErrorDescription("Debes ingresar una descripción")
            isValid = false
        }

        if (!isEmpty(formData.email)) {
           
            if (!validateEmail(formData.email)) {
                setErrorEmail("Debes ingresar un email válido.")
                isValid = false
            }
        }

        if (!locationPatrocinio) {
            toastRef.current.show("Selecciona una ubicacion en el mapa")
            isValid = false
        }
        else if(size(imagesSelected) === 0)
        {
            toastRef.current.show("Debe seleccionar al menos una imagen")
            isValid = false
        }
        return isValid
    }
    const clearErrors = () =>{
        setErrorName(null)
        setErrorDescription(null)
        setErrorAddress(null)
        setErrorEmail(null)
        setErrorPhone(null)
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
                setIsVisibleMap={setIsVisibleMap}
                locationPatrocinio={locationPatrocinio}
            />
            <UploadImage 
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title="Crear patrocinio"
                onPress={addPatrocinio}
                buttonStyle={styles.btnAddPatrocinio}
            />
            <MapPatrocinio
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                setLocationPatrocinio={setLocationPatrocinio}
                toastRef={toastRef}
            />
        </ScrollView>
    )

}

function MapPatrocinio({ isVisibleMap, setIsVisibleMap,setLocationPatrocinio, toastRef }){
    
    const [newRegion, setNewRegion] = useState(null)

    useEffect(() => {
        (async() => {
            const response = await getCurrentLocation()
            if (response.status) {
                setNewRegion(response.location)
            }
        })()
    }, [])
    
    const confirmLocation = () =>{
        setLocationPatrocinio(newRegion)
        toastRef.current.show("Ubicación actualiizada")
        setIsVisibleMap(false);
    }
    return(
        <Modal isVisible={isVisibleMap} setVisible={setIsVisibleMap}>
        <View>
            {
                 newRegion && (
                    <MapView 
                        style={styles.map} 
                        initialRegion={newRegion}
                        showsUserLocation
                        onRegionChange={(region)=>setNewRegion(region)}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude:newRegion.latitude,
                                longitude:newRegion.longitude

                            }}
                            draggable
                        />

                    </MapView>
                 )
    
            }
            <View style={styles.viewMapBtn}>
                <Button
                    title={"Guardar ubicación"}
                    containerStyle={styles.viewMapBtnContainerSave}
                    buttonStyle={styles.viewMapBtnSave}
                    onPress={confirmLocation}
                />
                <Button
                    title={"Cancelar ubicación"}
                    containerStyle={styles.viewMapBtnContainerCancel}
                    buttonStyle={styles.viewMapBtnCancel}
                    onPress={()=>setIsVisibleMap(false)}
                />
            </View>

        </View>
        </Modal>

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
function UploadImage ({toastRef,imagesSelected,setImagesSelected}) {

    const imageSelec = async () => {
        const response = await loadImageFromGallery([4,3])
        if(!response.status){
            toastRef.current.show("Debe seleccionar una imagen",3000)
            return
        }
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
                        size={40}

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
function FormAdd({formData,setFormData,errorName,errorDescription,errorAddress,errorEmail,errorPhone,setIsVisibleMap,locationPatrocinio}){
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
                rightIcon={{
                    type : "material-community",
                    name : "google-maps",
                    color : locationPatrocinio ? "orange": "#c2c2c2",
                    onPress : () => setIsVisibleMap(true),
                    
                }}
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
                placeholder="Describe tu empresa..."
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
    },
    map: {
        width: "100%",
        height: 550
    },
    viewMapBtn:{
        flexDirection:"row",
        justifyContent:"center",
        marginTop:10
    },
    viewMapBtnContainerSave:{
        paddingRight:5
    },
    viewMapBtnContainerCancel:{
        paddingLeft:5
    },
    viewMapBtnCancel:{
        backgroundColor:"#a65273"
    },
    viewMapBtnSave:{
        backgroundColor:"#442484"
    }
})
