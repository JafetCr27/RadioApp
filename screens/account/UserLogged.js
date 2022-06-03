import React,{useState,useRef,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';
import {useNavigation} from '@react-navigation/native'
import Toast from 'react-native-easy-toast';


import { closeSession , getCurrentUser } from '../../utils/actions'
import  Loading  from '../../components/Loading'
import InfoUser from '../../components/account/InfoUser';
import AccountOptions from '../../components/account/AccountOptions';

export default function UserLogged() {

    const toastRef = useRef()
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [user, setUser] = useState(null)
    const [reloadUser, setReloadUser] = useState(false)

    useEffect(() => {
        setUser(getCurrentUser())
        setReloadUser(false)
    }, [reloadUser])

    return (
        <View style={styles.container}>
           {
                user &&  ( 
                    <View>
                        <InfoUser 
                            user = {user} 
                            setLoading={setLoading} 
                            setLoadingText={setLoadingText} 
                        />
                        <AccountOptions 
                            user = {user}
                            toastRef = {toastRef}
                            setReloadUser={setReloadUser}
                        />
                    </View>
                )
           } 
            <Button
                title="Cerrar sesión"
                buttonStyle={styles.btnCloseSession}
                titleStyle ={styles.btnCloseSessionTitle}
                onPress = {()=> {
                    closeSession()
                    navigation.navigate("restaurants")
                }}
            />
            <Toast 
                ref = { toastRef }
                position ="center"
                opacity = { 0.9 }
                style={{backgroundColor:'#442484'}}
                textStyle={{color:'#FFFFFF'}}
            />
            <Loading
                isVisible = { loading }
                Text = { loadingText }
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        minHeight:"100%",
        backgroundColor:"#F9F9F9",
    },
    btnContainer:{
        
    },
    btnCloseSession:{
        margin:30,
        borderRadius:5,
        backgroundColor:"#FFFF",
        borderTopWidth:1,
        borderTopColor:"#442484",
        borderWidth:1,
        borderColor:"#442484",
        paddingVertical:10
    },
    btnCloseSessionTitle:{
        color:"#442484"
    }
})
