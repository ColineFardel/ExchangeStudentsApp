import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { getFAQs } from '../../redux/actions/faq';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../constants/theme';

export default function ForumScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>This is the forums</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
});
