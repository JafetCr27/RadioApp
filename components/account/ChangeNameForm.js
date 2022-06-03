import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input , Button ,Icon} from 'react-native-elements';
import {isEmpty} from 'lodash'

import { reauthenticate, updateEmail } from '../../utils/actions';
import { validateEmail } from '../../utils/helpers';

export default function ChangeNameForm({ email,setShowModal, toastRef, setReloadUser })
{
    const [newEmail, setNewEmail] = useState(email)
    const [password, setPasword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setloading] = useState(false)

    const onSubmit = async () => {
        if (!validateForm()) {
            return
        }
        setloading(true)
        const resultReauthenticate = await reauthenticate(password)
        if (!resultReauthenticate.statusResponse) {
            setloading(false)
            setErrorPassword("Contraseña incorrecta...")
            return
        }
        const resultEmail = await updateEmail(newEmail)
        setloading(false)

        if (!resultEmail.statusResponse) {
            setError(result.error)
            return
        }
        setReloadUser(true)
        toastRef.current.show("Información actualizada",3000)
        setShowModal(false)

    }
    const validateForm = () => {
        setErrorEmail(null)
        setErrorPassword(null)
        let isvalid = true

        if (!validateEmail(newEmail)) {
            setErrorEmail("Debes ingresar un email válido")
            isvalid = false
        }
        if (newEmail === email) {
            setErrorEmail("Debes ingresar un email diferente al actual")
            isvalid = false
        }
        if (isEmpty(password)) {
            setErrorPassword("Debes ingresar tu contraseña actual")
            isvalid = false
        }
        return isvalid
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa el nuevo email.."
                containerStyle={styles.input}
                defaultValue = {email}
                keyboardType="email-address"
                onChange = {(e) => setNewEmail(e.nativeEvent.text)}
                errorMessage={errorEmail}
                rightIcon = {{
                    type:"material-community",
                    name:"at",
                    color:"#c2c2c2"
                }}
            />
            <Input
                placeholder="Ingresa tu contraseña.."
                containerStyle={styles.input}
                defaultValue = {password}
                onChange = {(e) => setPasword(e.nativeEvent.text)}
                errorMessage={errorPassword}
                password={ true }
                secureTextEntry={!showPassword}
                rightIcon = {
                    <Icon
                        type="material-community"
                        name = { showPassword ?  "eye-off-outline":"eye-outline"}
                       // iconStyle={ { color:"#c2c2c" } }
                        onPress={ () => setShowPassword(!showPassword)}
                    />
                 }
            />
             <Button
                title = "Actualizar"
                containerStyle = {styles.btnContainer}
                buttonStyle = {styles.btn}
                onPress = {onSubmit}
                loading = {loading}
            />
         </View>
    )
}
const styles = StyleSheet.create({
    view:{
        alignItems:"center",
        paddingVertical:10
    },
    input:{
        marginBottom:10
    },
    btnContainer:{
        width:"95%"
    },
    btn:{
        backgroundColor:"#442484"
    }
})
