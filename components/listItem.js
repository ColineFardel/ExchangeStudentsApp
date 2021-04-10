import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../constants/theme';

export default AppListItem = (props) => {
    const { onPressAction, onLongPressAction, title, color, subtitle, secondsubtitle, uri } = props

    return (
        <TouchableOpacity style={styles.container}
            onPress={onPressAction}
            onLongPress={onLongPressAction}>
            <View style={{
                backgroundColor: color, marginTop: 10, marginBottom: 10,
                width: '90%', borderRadius: theme.borderRadius.card,
                alignItems: 'center', borderWidth: 1, borderColor: color
            }}>
                {uri && (
                    <Image style={styles.image} source={{ uri: uri }} />
                )}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: '90%', padding: 5 }}>
                        <Text style={styles.title}>{title}</Text>
                        {subtitle && (
                            <Text style={styles.subtitle}>{subtitle}</Text>
                        )}
                        {secondsubtitle && (
                            <Text style={styles.subtitle}>{secondsubtitle}</Text>
                        )}
                    </View>
                    <View>
                        <Icon name={"chevron-right"}
                            size={20}
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.cardTitle
    },
    subtitle: {
        fontFamily: theme.fonts.regular,
        fontSize: theme.fontSizes.cardText
    },
    image: {
        width: '100%',
        height: 140,
        borderTopLeftRadius: theme.borderRadius.card,
        borderTopRightRadius: theme.borderRadius.card,
    },
    // item: {
    //     backgroundColor
    // },
});