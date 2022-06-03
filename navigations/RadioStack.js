import { createStackNavigator } from '@react-navigation/stack'
////////////////////////////////////////////////////
import RadioScreen from '../screens/Radio';

const Stack = createStackNavigator()

export default function RadioStack() {
    return (
        <Stack.Navigator
             screenOptions={{
              headerShown: false,
            }}
        >
            <Stack.Screen
                name="restaurants"
                component={RadioScreen}                
            />
        </Stack.Navigator>
    )
}