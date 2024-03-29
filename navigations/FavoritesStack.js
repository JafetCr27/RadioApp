import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
// ////////////////////////////////////////////////////
import Patrocinios from '../screens/patrocinios/Patrocinios'
import AddPatrocinios from '../screens/patrocinios/AddPatrocinios';
import Patrocinio from '../screens/patrocinios/Patrocinio';

const Stack = createStackNavigator()

export default function FavoritesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="patrocinios"
                component={Patrocinios}
                options={{title:"Patrocinadores"}}
                
            />
            <Stack.Screen
                name="add-patrocinios"
                component={AddPatrocinios}
                options={{title:"Crear Patrocinadores"}}
            />
            <Stack.Screen
                name="patrocinio"
                component={Patrocinio}
            />
        </Stack.Navigator>
    )
}