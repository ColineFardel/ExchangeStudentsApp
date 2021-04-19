import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../constants/theme';

export default FilterButton = (props) => {

    const { text, action, color } = props;
    const [selected, setSelected] = useState(false);

    return (
        <TouchableOpacity
            style={{ backgroundColor: selected ? color : 'white', padding: 5, borderRadius: theme.borderRadius.chat, borderWidth: 1, borderColor: color, margin:3 }}
            onPress={() => {
                action();
                setSelected(!selected);
            }}
        >
            <Text style={{
                fontFamily: theme.fonts.bold,
                fontSize: theme.fontSizes.footText,
                color: selected ? 'white' : color,
                borderColor: 'black'
            }}>{text}</Text>
        </TouchableOpacity>
    )

}
const styles = StyleSheet.create({
    text: {
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.footText,
        color: theme.colors.footTextColor,
        borderColor: 'black'
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