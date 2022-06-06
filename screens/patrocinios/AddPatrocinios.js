import React,{useRef,useState} from 'react'
import AddPatrocinioForm from '../../components/patrocinios/AddPatrocinioForm';
import Toast from 'react-native-easy-toast'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Loading from '../../components/Loading';
import {View} from 'react-native'

export default function AddPatrocinios({navigation}) {
    const toastRef = useRef()
    const [loading, setLoading] = useState(false)
    return (

        <KeyboardAwareScrollView>
            <AddPatrocinioForm 
                toastRef={useRef} 
                setLoading={setLoading} 
            />
            <Loading
                isVisible={loading}
                text="Creando patrocinio"
            />
            <Toast 
                ref={toastRef}
                position="center"
                opacity={0.9}
            />
        </KeyboardAwareScrollView>
    )
}
