/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../ScreensofAPP/Login';
import Register from '../ScreensofAPP/Register';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SongInput from '../ScreensofAPP/SongInput';
import MainPage from '../ScreensofAPP/MainPage';
import BatchInput from '../ScreensofAPP/BatchInput';
import Api from '../ScreensofAPP/Api';




const Stack = createNativeStackNavigator();
function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name="Login" component={Login}
/>
                <Stack.Screen name="Register" component={Register}
                />
                <Stack.Screen name="SongInput" component={SongInput}
                />
                <Stack.Screen name="MainPage" component={MainPage}
                />  
                <Stack.Screen name="BatchInput" component={BatchInput}
                /> 
                                <Stack.Screen name="Api" component={Api}
                />  
            </Stack.Navigator>

        </NavigationContainer>

    );
    
};

export default App;