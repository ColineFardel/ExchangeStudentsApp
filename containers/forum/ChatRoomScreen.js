import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { addChat, getChats, getTopics } from '../../redux/actions/forum';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../constants/theme';
import Foot from '../../components/foot';
import AppInput from '../../components/input';
import { Input, Button } from 'react-native-elements';
import moment from "moment";

export default function ChatRoomScreen({ navigation, route }) {

    //Constants
    const chats = useSelector(state => state.forumReducer.chats);
    const chatLoaded = useSelector(state => state.forumReducer.chatLoaded);
    const topic = route.params;
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const fetchChats = (topicId) => dispatch(getChats(topicId));
    const newChat = (chat) => dispatch(addChat(chat));

    useEffect(() => {
        fetchChats(topic.id);
    }, [!chatLoaded])

    const saveNewChat = () => {
        const time = moment().format('LT');
        const date = moment().format('L');
        let chat = { text: message, date: date, time: time, topic: topic }
        newChat(chat);
        setMessage('');
    }

    const showChats = () => {
        return chats.map((chat, index) => {
            return (
                <View>
                    <Text>{chat.time}</Text>
                    <Text style={{ backgroundColor: theme.colors.grey, color: 'white', padding: 10, borderRadius: theme.borderRadius.chat, margin: 5 }}>{chat.text}</Text>
                </View>

            )
        });
    }

    return (
        <View style={styles.container}>
            <Text>Chat room</Text>
            <View style={styles.content}>
                <ScrollView>
                    {showChats()}
                </ScrollView>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                        placeholder='Write your message here'
                        value={message}
                        onChangeText={text => setMessage(text)}
                        placeholderTextColor={theme.colors.lightGrey}
                        style={styles.chatInput}
                    />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon
                        name='send'
                        size={20}
                        color='white'
                        style={styles.sendButton}
                        onPress={() => { saveNewChat() }}
                    />
                </View>
            </View>
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
    listContainer: {
        flex: 1,
        width: '100%',
    },
    inputStyle: {
        color: 'black',
        fontFamily: theme.fonts.bold,
        padding: 10,
        margin: 10,
        fontSize: theme.fontSizes.cardTitle,
    },
    chatInput: {
        fontSize: 16,
        backgroundColor: 'grey',
        borderRadius: 30,
        padding: 10,
        width: '100%',
        marginLeft: 10,
        color: 'white'
    },
    sendButton: {
        backgroundColor: theme.colors.orange,
        borderRadius: 30,
        padding: 10
    },
    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
});
