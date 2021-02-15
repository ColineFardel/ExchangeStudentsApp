import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ marginLeft: 15 }}>
                            <Title style={styles.title}>Email</Title>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            label="FAQ"
                            onPress={() => { props.navigation.navigate('FAQ') }}
                            icon={() => (
                                <Icon
                                    name="home-outline"
                                    color="black"
                                    size={20} />
                            )} />
                        <DrawerItem
                            label="Market"
                            onPress={() => { props.navigation.navigate('Market') }}
                            icon={() => (
                                <Icon
                                    name="bookmark-outline"
                                    color="black"
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