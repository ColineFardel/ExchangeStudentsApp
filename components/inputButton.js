import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import theme from '../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

export default InputButton = (props) => {

    const { color, text, action, icon } = props

    return (
        <TouchableOpacity
            style={{
                backgroundColor: color, width: '90%', flexDirection: 'row', padding: 15,
                alignItems: 'center', borderRadius: theme.borderRadius.card, justifyContent: 'space-between',
                marginBottom: 30
            }}
            onPress={action}>
            <Text style={styles.text}>{text}</Text>
            <Icon name={icon}
                size={20}
                color="white" />
        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: theme.fontSizes.cardTitle,
        fontFamily: theme.fonts.bold,
        color: 'white',
    }
});