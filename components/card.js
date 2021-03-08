import React from 'react';
import { Image } from 'react-native';
import { View, ImageBackground, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../constants/theme';

export default Card = (props) => {

    const { action, uri, title, subtitle, key } = props

    return (
        <TouchableOpacity style={styles.container}
            key={key}
            onPress={action}
        >
            <View style={styles.card}>
                <Image style={styles.image} source={{ uri: uri }} />
                <View style={styles.cardFoot}>
                    <View>
                        <Text style={styles.cardTitle}>{title}</Text>
                        <Text style={styles.cardText}>{subtitle}</Text>
                    </View>

                    <View>
                        <Icon name={"chevron-right"}
                            size={30}
                            color="black" />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    card: {
        backgroundColor: theme.colors.lightRed,
        borderRadius: theme.borderRadius.card,
        width: '90%',
        margin: 10,
        borderWidth:1,
        borderColor: theme.colors.lightRed
    },
    cardTitle: {
        maxWidth: '90%',
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.cardTitle,
        color: "black"
    },
    cardText: {
        fontFamily: theme.fonts.regular,
        fontSize: theme.fontSizes.cardText,
        color: "black"
    },
    image: {
        width: '100%',
        height: 140,
        borderTopLeftRadius: theme.borderRadius.card,
        borderTopRightRadius: theme.borderRadius.card,
    },
    cardFoot: {
        margin: 10, flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});