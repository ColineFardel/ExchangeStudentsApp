import React from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import theme from '../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

export default Chat = (props) => {

    const { chat, color, isUser, userColor } = props;

    return (
        <View style={{
            justifyContent: isUser ? 'flex-end' : 'flex-start',
            alignItems: isUser ? 'flex-end' : 'flex-start',
        }}>
            <Text style={styles.time}>{chat.time}</Text>
            <View style={{ backgroundColor: isUser ? userColor : color, borderRadius: theme.borderRadius.chat, padding: 10, maxWidth:'90%', marginLeft:5, marginRight:5 }}>

                {!isUser && (
                    <Text style={styles.user}>Someone</Text>
                )}
                <Text style={styles.chatText}>{chat.text}</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    chatText: {
        color: 'white',
        fontFamily: theme.fonts.regular
    },
    time: {
        fontFamily:theme.fonts.regular,
        marginTop:10,
        marginLeft:15,
        marginRight:15
    },
    user: {
        color: theme.colors.orange,
        fontFamily: theme.fonts.bold
    }
});