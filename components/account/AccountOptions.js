import React,{useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem,Icon } from 'react-native-elements';
import {map} from 'lodash'

import Modal from '../Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeEmailForm from './ChangeNameForm';
import ChangePasswordForm from './ChangePasswordForm';

export default function AccountOptions({user,toastRef,setReloadUser}) {
    
    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)
    const generateOptions = ()=> {
        return [
            {
                title:"Cambiar Nombres y apellidos", 
                iconNameLeft:"account-circle",
                iconColorLeft:"#a7bfd3",
                iconNameRight:"chevron-right",
                iconColorRight:"#a7bfd3",
                onPress: () => selectedComponent("displayName")
            },
            {
                title:"Cambiar Email", 
                iconNameLeft:"at",
                iconNameRight:"chevron-right",
                iconColorRight:"#a7bfd3",
                iconColorLeft:"#a7bfd3",
                onPress: () => selectedComponent("email")
            },
            {
                title:"Cambiar Contraseña", 
                iconNameLeft:"look-reset",
                iconNameRight:"chevron-right",
                iconColorRight:"#a7bfd3",
                iconColorLeft:"#a7bfd3",
                onPress: () => selectedComponent("password")
    
            }
        ]
    }
    const selectedComponent = (key) => {
        console.log(key)
        switch (key) {
            case "displayName" :
                setRenderComponent(
                    <ChangeDisplayNameForm
                        displayName = {user.displayName}
                        setShowModal = {setShowModal}
                        toastRef = {toastRef}
                        setReloadUser = {setReloadUser}
                    />
                )
                break;
            case "email":
                setRenderComponent(
                    <ChangeEmailForm
                        email = {user.email}
                        setShowModal = {setShowModal}
                        toastRef = {toastRef}
                        setReloadUser = {setReloadUser}
                    />
                )
                break;
            case "password":
                setRenderComponent(
                    <ChangePasswordForm
                        setShowModal = {setShowModal}
                        toastRef = {toastRef}
                    />
                )
                break;
        }
        setShowModal(true)    
    }
    const menuOption = generateOptions()

    return (
        <View>
            {
                map ( menuOption, (menu, index) => (
                    <ListItem
                        key ={index}
                        style = {styles.menuItem}
                        bottomDivider
                        onPress = {menu.onPress}
                    >
                        <Icon
                            type="material-community"
                            name={menu.iconNameLeft}
                            color={menu.iconColorLeft}
                        />
                        <ListItem.Content>
                            <ListItem.Title>
                                {menu.title}
                            </ListItem.Title>
                        </ListItem.Content>
                        <Icon
                            type="material-community"
                            name={menu.iconNameRight}
                            color={menu.iconColorRight}
                        />
                    </ListItem>
                ))
            }
            <Modal
                isVisible = {showModal}
                setVisible ={setShowModal}
            >
                {
                    renderComponent
                }
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({

    menuItem:{
        marginLeft:10,
        marginRight:10,
        borderBottomWidth : 1,
        borderBottomColor:"#a7bfd3"
    }
})
