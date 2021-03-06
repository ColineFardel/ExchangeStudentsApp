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
import CourseChatRoom from '../containers/course/ChatRoomScreen';
import ModifyCourse from '../containers/course/ModifyCourseScreen';
import Tips from '../containers/tip/TipScreen';
import AddTip from '../containers/tip/AddTipScreen';
import TipDetails from '../containers/tip/TipDetailsScreen';
import Events from '../containers/event/EventScreen';
import AddEvent from '../containers/event/AddEventScreen';
import EventDetails from '../containers/event/EventDetailsScreen';
import Login from '../containers/authentication/LoginScreen';
import Signup from '../containers/authentication/SignupScreen';

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
            <Stack.Screen name="AddFAQ" component={AddFAQ} />
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

            <Stack.Screen name="AddRequest" component={AddRequest} />
            <Stack.Screen name="RequestDetails" component={Details} options={{ headerShown: false }} />
            <Stack.Screen name="MarketImage" component={Images} />
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
            <Stack.Screen name="AddOffer" component={AddOffer} />
            <Stack.Screen name="OfferDetails" component={Details} options={{ headerShown: false }} />
            <Stack.Screen name="MarketImage" component={Images} />
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
            <Stack.Screen name="OfferDetails" component={Details} options={{ headerShown: false }} />
            <Stack.Screen name="RequestDetails" component={Details} options={{ headerShown: false }} />
            <Stack.Screen name="TipDetails" component={TipDetails} options={{ headerShown: false }} />
            <Stack.Screen name="EventDetails" component={EventDetails} options={{ headerShown: false }} />
            <Stack.Screen name="MarketImage" component={Images} />
            <Stack.Screen name="TipImage" component={Images} />
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
            <Stack.Screen name="AddTopic" component={AddTopic} />
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
            <Stack.Screen name="AddCourse" component={AddCourse} />
            <Stack.Screen name="ModifyCourse" component={ModifyCourse} />
            <Stack.Screen name="ChatRoom" component={CourseChatRoom} />
        </Stack.Navigator>
    )
}

const TipStackNavigation = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.purple,
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}>
            <Stack.Screen
                name="Tips"
                component={Tips}
                options={{
                    title: 'Tips',
                    headerLeft: () => (
                        <Icon.Button name="ios-menu"
                            size={25}
                            backgroundColor={theme.colors.purple}
                            onPress={() => { navigation.openDrawer() }} />
                    )
                }} />
            <Stack.Screen name="AddTip" component={AddTip} />
            <Stack.Screen name="TipDetails" component={TipDetails} options={{ headerShown: false }} />
            <Stack.Screen name="TipImage" component={Images} />
        </Stack.Navigator>
    )
}

const EventStackNavigation = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.pink,
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}>
            <Stack.Screen
                name="Events"
                component={Events}
                options={{
                    title: 'Events',
                    headerLeft: () => (
                        <Icon.Button name="ios-menu"
                            size={25}
                            backgroundColor={theme.colors.pink}
                            onPress={() => { navigation.openDrawer() }} />
                    )
                }} />
            <Stack.Screen name="AddEvent" component={AddEvent} />
            <Stack.Screen name="EventDetails" component={EventDetails} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const AuthStackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export { FAQStackNavigation, RequestStackNavigation, OfferStackNavigation, HomeStackNavigation, ForumStackNavigation, CoursesStackNavigation, TipStackNavigation, EventStackNavigation, AuthStackNavigation };