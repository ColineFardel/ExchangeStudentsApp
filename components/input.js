import React from 'react';
import {StyleSheet} from 'react-native';
import theme from '../constants/theme';
import { Input } from 'react-native-elements';

export default AppInput = (props) => {

    const { color, placeholder, action, keyboardType, icon } = props

    return (
        <Input
            placeholder={placeholder}
            style={{
                borderWidth: 0,
                borderRadius: 10,
                width: '90%',
                backgroundColor: color
            }}
            inputStyle={styles.inputStyle}
            placeholderTextColor='white'
            inputContainerStyle={{ borderBottomWidth: 0 }}
            onChangeText={action}
            multiline={true}
            autoFocus={true}
            keyboardType={keyboardType}
            leftIcon={icon}
        />
    )
}
const styles = StyleSheet.create({
    inputStyle: {
        color: 'black',
        fontFamily: theme.fonts.bold,
        padding: 10,
        margin: 10,
        fontSize: theme.fontSizes.cardTitle,
    },
});