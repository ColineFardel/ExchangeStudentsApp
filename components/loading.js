import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';

export default Loading = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Loading...</Text>
            <Text style={styles.text}>Please wait</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    text: {
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.screenTitle
    },
});


