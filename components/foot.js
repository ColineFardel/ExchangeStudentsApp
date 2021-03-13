import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../constants/theme';

export default Foot = (props) => {

    const { color, icon, textTop, textBottom, iconAction } = props;

    return (
        <View style={{ backgroundColor: color, width: '100%', flexDirection: 'row', minHeight: 50, }}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{textTop}</Text>
                <Text style={styles.text}>{textBottom}</Text>
            </View>
            <View style={styles.iconContainer}>
                <Icon.Button name={icon}
                    size={50}
                    color="white"
                    backgroundColor={color}
                    onPress={iconAction} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    text: {
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.footText,
        color: theme.colors.footTextColor,
    },
    textContainer: {
        flex: 4,
        alignItems: "center",
        justifyContent: "center"
    },
    iconContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});


