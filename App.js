import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons} from '@expo/vector-icons'
import { createStackNavigator} from '@react-navigation/stack'
import Mainpage from './pages/Mainpage';
import Settings from './pages/Settings';
import f1 from './pages/f1';
import f2 from './pages/f2';
import f3 from './pages/f3';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStackScreen(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Mainpage}/>
      <Stack.Screen name="f1" component={f1}/>
      <Stack.Screen name="f2" component={f2}/>
      <Stack.Screen name="f3" component={f3}/>
    </Stack.Navigator>
  )
}
function SettingsStackScreen(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings}/>
    </Stack.Navigator>
  )
}

export default function App() {


  return (
    
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'md-home';
          }
          else if (route.name === 'Settings'){
            iconName = 'md-settings';
          }
          return <Ionicons name={iconName} size={size} color={color}/>;
        },
      })}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
      </NavigationContainer>
   
  );
}
