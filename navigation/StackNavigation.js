import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FAQ from '../containers/faq/FAQScreen';
import AddFAQ from '../containers/faq/AddFAQScreen';
import ModifyFAQ from '../containers/faq/ModifyFAQScreen';
import Market from '../containers/market/MarketScreen';
import Home from '../containers/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import Request from '../containers/market/RequestScreen';
import Offer from '../containers/market/OfferScreen';
import AddRequest from '../containers/market/AddRequestScreen';
import theme from '../constants/theme';
import RequestDetails from '../containers/market/RequestDetailsScreen';

const Stack = createStackNavigator();

const FAQStackNavigation = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.green,
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
                            backgroundColor={theme.colors.green}
                            onPress={() => { navigation.openDrawer() }} />
                    )

                }} />
            <Stack.Screen name="AddFAQ" component={AddFAQ} options={{ headerShown: false }} />
            <Stack.Screen name="ModifyFAQ" component={ModifyFAQ} />
        </Stack.Navigator>
    )
}

// const MarketStackNavigation = ({ navigation }) => {
//     return (
//         <Stack.Navigator
//             screenOptions={{
//                 headerStyle: {
//                     backgroundColor: 'red',
//                 },
//                 headerTintColor: 'white',
//                 headerTitleStyle: {
//                     fontWeight: 'bold',
//                 }
//             }}>
//             <Stack.Screen
//                 name="Market"
//                 component={Market}
//                 options={{
//                     title: 'Market',
//                     headerLeft: () => (
//                         <Icon.Button name="ios-menu"
//                             size={25}
//                             backgroundColor="red"
//                             onPress={() => { navigation.openDrawer() }} />
//                     )
//                 }} />
//         </Stack.Navigator>
//     )
// }

const RequestStackNavigation = ({ navigation, route }) => {

    if(route.state && route.state.index>0){
        navigation.setOptions({tabBarVisible : false})
    }
    else{
        navigation.setOptions({tabBarVisible : true})
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.red,
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}>
            <Stack.Screen
                name="Request"
                component={Request}
                options={{
                    title: 'Request',
                    headerLeft: () => (
                        <Icon.Button name="ios-menu"
                            size={25}
                            backgroundColor={theme.colors.red}
                            onPress={() => { navigation.openDrawer() }} />
                    )
                }} />

            <Stack.Screen name="AddRequest" component={AddRequest} options={{ headerShown: false }} />
            <Stack.Screen name="RequestDetails" component={RequestDetails} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
const OfferStackNavigation = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.red,
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}>
            <Stack.Screen
                name="Offer"
                component={Offer}
                options={{
                    title: 'Offer',
                    headerLeft: () => (
                        <Icon.Button name="ios-menu"
                            size={25}
                            backgroundColor={theme.colors.red}
                            onPress={() => { navigation.openDrawer() }} />
                    )
                }} />
        </Stack.Navigator>
    )
}

const HomeStackNavigation = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.cyan,
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    title: 'Home',
                    headerLeft: () => (
                        <Icon.Button name="ios-menu"
                            size={25}
                            backgroundColor={theme.colors.cyan}
                            onPress={() => { navigation.openDrawer() }} />
                    )
                }} />
        </Stack.Navigator>
    )
}

export { FAQStackNavigation, RequestStackNavigation, OfferStackNavigation, HomeStackNavigation };