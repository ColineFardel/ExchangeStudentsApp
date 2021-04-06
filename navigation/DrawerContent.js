import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Title, Drawer, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../constants/theme';

export function DrawerContent(props) {

    const logoff = () => {
        /*
        firebase.auth()
            .signOut()
            .then(() => {
                console.log('User signed out!');
            })
        */
    }

    //const [user, setUser] = useState('');

    // useEffect(() => {
    //     firebase.auth().onAuthStateChanged(user => {
    //         setUser(user);
    //     });
    // }, [])

    //Icons
    //For forum -> forum
    //For event -> calendar-blank
    //For courses -> book
    //For tip -> lightbulb outline

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ marginLeft: 15 }}>
                            <Title style={styles.title}>Your name</Title>
                            <Text>Email</Text>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            style={{ backgroundColor: theme.colors.cyan }}
                            labelStyle={{ color: 'white', fontFamily: theme.fonts.bold }}
                            label="Home"
                            onPress={() => { props.navigation.navigate('Home') }}
                            icon={() => (
                                <Icon
                                    name="home"
                                    color="white"
                                    size={20} />
                            )} />
                        <DrawerItem
                            style={{ backgroundColor: theme.colors.green }}
                            labelStyle={{ color: 'white', fontFamily: theme.fonts.bold }}
                            label="FAQ"
                            onPress={() => { props.navigation.navigate('FAQ') }}
                            icon={() => (
                                <Icon
                                    name="comment-question"
                                    color="white"
                                    size={20} />
                            )} />
                        <DrawerItem
                            style={{ backgroundColor: theme.colors.orange }}
                            labelStyle={{ color: 'white', fontFamily: theme.fonts.bold }}
                            label="Forum"
                            onPress={() => { props.navigation.navigate('Forum') }}
                            icon={() => (
                                <Icon
                                    name="forum"
                                    color="white"
                                    size={20} />
                            )} />
                        <DrawerItem
                            style={{ backgroundColor: theme.colors.red }}
                            labelStyle={{ color: 'white', fontFamily: theme.fonts.bold }}
                            label="Market"
                            onPress={() => { props.navigation.navigate('Market') }}
                            icon={() => (
                                <Icon
                                    name="shopping-outline"
                                    color="white"
                                    size={20} />
                            )} />
                        <DrawerItem
                            style={{ backgroundColor: theme.colors.pink }}
                            labelStyle={{ color: 'white', fontFamily: theme.fonts.bold }}
                            label="Events"
                            onPress={() => { }}
                            icon={() => (
                                <Icon
                                    name="calendar-blank"
                                    color="white"
                                    size={20} />
                            )} />
                        <DrawerItem
                            style={{ backgroundColor: theme.colors.purple }}
                            labelStyle={{ color: 'white', fontFamily: theme.fonts.bold }}
                            label="Tips"
                            onPress={() => { props.navigation.navigate('Tips') }}
                            icon={() => (
                                <Icon
                                    name="lightbulb-outline"
                                    color="white"
                                    size={20} />
                            )} />
                        <DrawerItem
                            style={{ backgroundColor: theme.colors.blue }}
                            labelStyle={{ color: 'white', fontFamily: theme.fonts.bold }}
                            label="Courses"
                            onPress={() => { props.navigation.navigate('Courses') }}
                            icon={() => (
                                <Icon
                                    name="book"
                                    color="white"
                                    size={20} />
                            )} />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    label="Sign out"
                    onPress={() => logoff()}
                    icon={() => (
                        <Icon
                            name="exit-to-app"
                            color="black"
                            size={20} />
                    )} />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
})