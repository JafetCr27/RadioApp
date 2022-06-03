import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button,Icon } from 'react-native-elements';
import { size } from 'lodash'
import { useNavigation } from '@react-navigation/native'

import { registerUser } from '../../utils/actions'
import Loading from '../Loading'
import { validateEmail } from '../../utils/helpers';


export default function RegisterForm() {
    
    const navigation = useNavigation()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setformData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirm, setErrorConfirm] = useState("")
    const [loading, setLoading] = useState(false)

    function defaultFormValues () {
        return {email:"",password:"",confirm:""}
    }

    const onChange = (e,type) =>{
        setformData({...formData, [type] : e.nativeEvent.text})

    }
    const doRegisterUser = async () =>{
        if (!validateData()) {
            return;
        }
        setLoading(true);
        const result = await registerUser(formData.email, formData.password)
        setLoading(false);
        if (!result.statusResponse) 
        {
            setErrorEmail(result.error);
            return
        }
        navigation.navigate("account")
    }
    const validateData = () => {
        setErrorConfirm("");
        setErrorEmail("");
        setErrorPassword("")
        let isValid = true
        if (!validateEmail(formData.email)) {
            setErrorEmail("Debes ingresar un email válido.")
            isValid = false
        }
        if (size(formData.password) < 6) {
            setErrorPassword("Debes ingresar una contraseña de al menos 6 caracteres.")
            isValid = false
        }
        if (size(formData.confirm) < 6) {
            setErrorPassword("Debes ingresar una confirmación de contraseña al menos 6 caracteres.")
            isValid = false
        }
        if (formData.password !== formData.confirm) {
            setErrorPassword("Las contraseñas no coinciden")
            setErrorConfirm("Las contraseñas no coinciden")
            isValid = false
        }

        return isValid
    }
    return (

        <View
            style={styles.form}
        >
            <Input
                containerStyle ={styles.input}
                placeholder = "Ingresa tu email"
                onChange={(e)=> onChange(e, "email")}
                keyboardType= "email-address"
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                containerStyle ={styles.input}
                placeholder = "Ingresa tu contraseña"
                password = {true}
                secureTextEntry ={!showPassword}
                onChange={(e)=> onChange(e, "password")}
                errorMessage={errorPassword}
                defaultValue={formData.password}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ showPassword ?  "eye-off-outline":"eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                containerStyle ={styles.input}
                password = {true}
                secureTextEntry ={!showPassword}
                placeholder = "Confirma tu contraseña"
                onChange={(e)=> onChange(e, "confirm")}
                errorMessage={errorConfirm}
                defaultValue={formData.confirm}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ showPassword ?  "eye-off-outline":"eye-outline"}
                        iconStyle={styles.icon}
                        onPress={()=>  setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title = "Registrar nuevo usuario"
                containerStyle = {styles.btnContainer}
                buttonStyle = {styles.btn}
                onPress = {()=> doRegisterUser()}
            />
            <Loading
                isVisible={loading}
                text="Creando cuenta..."
            />
        </View>
    )
}
const styles = StyleSheet.create({
    form:{
        marginHorizontal:40
    },
    input:{
        width:"100%"
    },
    btnContainer:{
        marginTop:20,
        width:"95%",
        alignSelf:"center"
    },
    btn:{
        backgroundColor:"#442484"
    },
    icon:{
      color:"#c1c1c1"  
    }
})
