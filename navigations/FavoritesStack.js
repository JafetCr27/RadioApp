import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
// ////////////////////////////////////////////////////
import Patrocinios from '../screens/patrocinios/Patrocinios'
import AddPatrocinios from '../screens/patrocinios/AddPatrocinios';

const Stack = createStackNavigator()

export default function FavoritesStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
          >
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
        </Stack.Navigator>
    )
}