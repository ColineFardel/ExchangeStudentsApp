import React from 'react';
import { StyleSheet, Text } from 'react-native';
import theme from '../constants/theme';
import { Snackbar } from 'react-native-paper';

export default AppSnackBar = (props) => {

    const { color, message, onDismiss, visible } = props;

    return (
        <Snackbar
            style={{ backgroundColor: color, marginBottom: 80 }}
            visible={visible}
            onDismiss={onDismiss}
            duration={4000}
        >
            <Text style={styles.text}>{message}</Text>

        </Snackbar>
    );
}
const styles = StyleSheet.create({
    text: {
        fontFamily: theme.fonts.bold
    },
});


