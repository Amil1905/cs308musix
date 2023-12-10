/* eslint-disable prettier/prettier */
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
import Recommendation from '../ScreensofAPP/Recommendation';
import Dashboard from '../ScreensofAPP/Dashboard';
import SongPage from '../ScreensofAPP/Delete';
import MusicFriendsPage from '../ScreensofAPP/Friends';
import Unratedsongs from '../ScreensofAPP/Unratedsongs';
import FriendsScreen from '../ScreensofAPP/Showfriends';
import ExportSongsPage from '../ScreensofAPP/DataExport';
import AllSongsPage from '../ScreensofAPP/AllSongs';
import StatisticsScreen from '../ScreensofAPP/Statistics';
import TopArtists from '../ScreensofAPP/TopArtists';
import Graphs from '../ScreensofAPP/Graph';




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
                                                <Stack.Screen name="Recommendation" component={Recommendation}
                />  
                                                <Stack.Screen name="Dashboard" component={Dashboard}
                />
                <Stack.Screen name="Delete" component={SongPage}
                />  
                    
                <Stack.Screen name="Friends" component={MusicFriendsPage}
                />  
                     <Stack.Screen name="Unratedsongs" component={Unratedsongs}
                />
                                  <Stack.Screen name="Showfriends" component={FriendsScreen}
                />    
                              
                                  <Stack.Screen name="DataExport" component={ExportSongsPage}
                /> 
                                                 <Stack.Screen name="AllSongs" component={AllSongsPage}
                />
                                                                 <Stack.Screen name="Statistics" component={StatisticsScreen}
                />      
                                                                                 <Stack.Screen name="TopArtists" component={TopArtists}
                /> 
                                                                                                 <Stack.Screen name="Graphs" component={Graphs}
                />       
            </Stack.Navigator>

        </NavigationContainer>

    );
    
};

export default App;