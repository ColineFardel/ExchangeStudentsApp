import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RequestStackNavigation, OfferStackNavigation } from '../navigation/StackNavigation';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
        screenOptions={({route})=>({
            tabBarIcon:({focused, color, size})=>{
                let iconName;

                if(route.name === 'Request'){
                    iconName = 'arrow-down';
                }
                else if(route.name === 'Offer'){
                    iconName = 'arrow-up';
                }

                return <Icon name={iconName} color={color} size={size}/>
            }
        })}
        tabBarOptions={{
            activeTintColor: 'red',
            inactiveTintColor: 'gray',
          }}
        >
            <Tab.Screen name="Request" component={RequestStackNavigation} />
            <Tab.Screen name="Offer" component={OfferStackNavigation} />
        </Tab.Navigator>
    )
}