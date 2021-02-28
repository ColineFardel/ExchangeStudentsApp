import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FAQ from '../components/FAQScreen';
import AddFAQ from '../components/AddFAQScreen';
import ModifyFAQ from '../components/ModifyFAQScreen';
import Market from '../components/MarketScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScreenStackHeaderRightView } from 'react-native-screens';

const Stack = createStackNavigator();

const FAQStackNavigation = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#6DD07D',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}>
            <Stack.Screen
                name="FAQ"
                component={FAQ}
                options={{
                    title: 'FAQ',
                    headerLeft: () => (
                        <Icon.Button name="ios-menu"
                            size={25}
                            backgroundColor="#6DD07D"
                            onPress={() => { navigation.openDrawer() }} />
                    )

                }} />
            <Stack.Screen name="AddFAQ" component={AddFAQ} options={{ headerShown: false }} />
            <Stack.Screen name="ModifyFAQ" component={ModifyFAQ} />
        </Stack.Navigator>
    )
}

const MarketStackNavigation = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'red',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}>
            <Stack.Screen
                name="Market"
                component={Market}
                options={{
                    title: 'Market',
                    headerLeft: () => (
                        <Icon.Button name="ios-menu"
                            size={25}
                            backgroundColor="red"
                            onPress={() => { navigation.openDrawer() }} />
                    )
                }} />
        </Stack.Navigator>
    )
}

export { FAQStackNavigation, MarketStackNavigation };