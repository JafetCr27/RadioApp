import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input , Button ,Icon} from 'react-native-elements';
import {isEmpty,size} from 'lodash'
import { reauthenticate, updatePassword } from '../../utils/actions';

export default function ChangePasswordForm({ setShowModal, toastRef })
{
    const [newPassword, setNewPassword] = useState(null)
    const [currentPassword, setCurrentPasword] = useState(null)
    const [confirmPassword, setConfirmPasword] = useState(null)

    const [errorNewPassword, setErrorNewPassword] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setloading] = useState(false)

    const onSubmit = async () => {
        if (!validateForm()) {
            return
        }
        setloading(true)
        console.log(currentPassword)
        const resultReauthenticate = await reauthenticate(currentPassword)
        if (!resultReauthenticate.statusResponse) {
            setloading(false)
            setErrorNewPassword(resultReauthenticate.error)
            console.log(resultReauthenticate.error)
            return
        }
        const resultUpdatePassword = await updatePassword(newPassword)
        setloading(false)

        if (!resultUpdatePassword.statusResponse) {
            setErrorNewPassword(resultUpdatePassword.error)
            console.log(resultUpdatePassword.error)
            return
        }

        toastRef.current.show("Contraseña actualizada",3000)
        setShowModal(false)
    }
    const validateForm = () => {
        setErrorNewPassword(null)
        setErrorCurrentPassword(null)
        setErrorConfirmPassword(null)
        let isvalid = true
        if (isEmpty(currentPassword)) {
            setErrorCurrentPassword("Debes ingresar tu contraseña actual.")
            isvalid = false
        }
        if (size(newPassword) < 6 ) {
            setErrorNewPassword("Debes ingresar tu contraseña mayor a 6 caracteres")
            isvalid = false
        }
        if (size(confirmPassword) < 6 ) {
            setErrorConfirmPassword("Debes ingresar tu contraseña mayor a 6 caracteres")
            isvalid = false
        }
        if (newPassword !== confirmPassword) {
            setErrorNewPassword("Contraseñas no coinciden")
            setErrorConfirmPassword("Contraseñas no coinciden")
            isvalid = false
        }
        if (newPassword === currentPassword) {
            setErrorNewPassword("La contraseña debe ser diferente a la actual")
            setErrorCurrentPassword("La contraseña debe ser diferente a la actual")
            setErrorConfirmPassword("La contraseña debe ser diferente a la actual")
            isvalid = false
        }
        return isvalid
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa tu contraseña actual.."
                containerStyle={styles.input}
                defaultValue = {currentPassword}
                onChange = {(e) => setCurrentPasword(e.nativeEvent.text)}
                errorMessage={errorCurrentPassword}
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
            <Input
                placeholder="Ingresa tu nueva contraseña.."
                containerStyle={styles.input}
                defaultValue = {newPassword} 
                onChange = {(e) => setNewPassword(e.nativeEvent.text)}
                errorMessage={errorNewPassword}
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
            <Input
                placeholder="Confirmar contraseña.."
                containerStyle={styles.input}
                defaultValue = {confirmPassword}
                onChange = {(e) => setConfirmPasword(e.nativeEvent.text)}
                errorMessage={errorConfirmPassword}
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
                title = "Actualizar contraseña"
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
