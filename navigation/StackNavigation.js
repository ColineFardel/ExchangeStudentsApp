import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FAQ from '../containers/faq/FAQScreen';
import AddFAQ from '../containers/faq/AddFAQScreen';
import ModifyFAQ from '../containers/faq/ModifyFAQScreen';
import Home from '../containers/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import Request from '../containers/market/RequestScreen';
import Offer from '../containers/market/OfferScreen';
import AddRequest from '../containers/market/AddRequestScreen';
import theme from '../constants/theme';
import AddOffer from '../containers/market/AddOfferScreen';
import Forum from '../containers/forum/ForumScreen';
import AddTopic from '../containers/forum/AddTopicScreen';
import ChatRoom from '../containers/forum/ChatRoomScreen';
import Images from '../containers/market/ImagesScreen';
import Details from '../containers/market/DetailsScreen';
import Courses from '../containers/course/CourseScreen';
import AddCourse from '../containers/course/AddCourseScreen';

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

const RequestStackNavigation = ({ navigation, route }) => {

    if (route.state && route.state.index > 0) {
        navigation.setOptions({ tabBarVisible: false })
    }
    else {
        navigation.setOptions({ tabBarVisible: true })
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
            <Stack.Screen name="RequestDetails" component={Details} options={{ headerShown: false }} />
            <Stack.Screen name="Images" component={Images} />
        </Stack.Navigator>
    )
}
const OfferStackNavigation = ({ navigation, route }) => {
    if (route.state && route.state.index > 0) {
        navigation.setOptions({ tabBarVisible: false })
    }
    else {
        navigation.setOptions({ tabBarVisible: true })
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
            <Stack.Screen name="AddOffer" component={AddOffer} options={{ headerShown: false }} />
            <Stack.Screen name="OfferDetails" component={Details} options={{ headerShown: false }} />
            <Stack.Screen name="Images" component={Images} />
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

const ForumStackNavigation = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.orange,
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}>
            <Stack.Screen
                name="Forum"
                component={Forum}
                options={{
                    title: 'Forum',
                    headerLeft: () => (
                        <Icon.Button name="ios-menu"
                            size={25}
                            backgroundColor={theme.colors.orange}
                            onPress={() => { navigation.openDrawer() }} />
                    )
                }} />
            <Stack.Screen name="AddTopic" component={AddTopic} options={{ headerShown: false }} />
            <Stack.Screen name="ChatRoom" component={ChatRoom} />
        </Stack.Navigator>
    )
}

const CoursesStackNavigation = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.blue,
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}>
            <Stack.Screen
                name="Courses"
                component={Courses}
                options={{
                    title: 'Courses',
                    headerLeft: () => (
                        <Icon.Button name="ios-menu"
                            size={25}
                            backgroundColor={theme.colors.blue}
                            onPress={() => { navigation.openDrawer() }} />
                    )
                }} />
            <Stack.Screen name="AddCourse" component={AddCourse} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export { FAQStackNavigation, RequestStackNavigation, OfferStackNavigation, HomeStackNavigation, ForumStackNavigation, CoursesStackNavigation };