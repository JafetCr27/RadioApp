import { createStackNavigator } from '@react-navigation/stack'
////////////////////////////////////////////////////
import RadioScreen from '../screens/Radio';

const Stack = createStackNavigator()

export default function RadioStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="restaurants"
                component={RadioScreen}
                options= {{title:"Gravity Radio App"}}
            />
        </Stack.Navigator>
    )
}