////////////////////////////////////////////////////
import RadioStack from './RadioStack';
import AccountStack from './AccountStack';
import FavoritesStack from './FavoritesStack';
import SearchStack from './SearchStack';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'

 const Tab = createBottomTabNavigator();

 export default function Navigation() {

    const screenOptions = (route,color) =>{
        let iconName = ""
        switch (route.name) {
            case "restaurants":
                iconName = "radio"
                break;
            case "patrocinios":
                iconName ="playlist-music"
                break;
            case "search":
                iconName ="newspaper"
                break;
            case "account":
                iconName ="home-circle"
                break;
        }
        return (
            <Icon
                name={iconName}
                type="material-community"
                size={35}
                color={color}
            />
        )
    } 
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="restaurants"
                screenOptions={{
                    inactiveTintColor:"#a17dd1",
                    activeTintColor:"#442484",
                }}
                screenOptions={ ( { route } ) => ( {
                    tabBarIcon:( { color } ) => screenOptions(route,color),
                    headerShown:false
                })}
            >
                <Tab.Screen
                    name="restaurants"
                    component={RadioStack}
                    options = {{title:"Gravity Radio CR"}}
                />
                <Tab.Screen
                    name="patrocinios"
                    component={FavoritesStack}
                    options = {{title:"Patrocinadores"}}
                />
                <Tab.Screen
                    name="search"
                    component={SearchStack}
                    options = {{title:"Noticias"}}
                />
                <Tab.Screen
                    name="account"
                    component={AccountStack}
                    options = {{title:"Cuenta"}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
 }
