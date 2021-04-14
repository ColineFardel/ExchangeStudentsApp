import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, SectionList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addChat, getChats } from '../../redux/actions/forum';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../constants/theme';
import moment from "moment-timezone";
import Chat from '../../components/chat';
import * as firebase from 'firebase';

export default function ChatRoomScreen({ navigation, route }) {

    //Header for search bar
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: topic.name
        })
    })

    //Constants
    const chats = useSelector(state => state.forumReducer.chats);
    const userChats = useSelector(state => state.forumReducer.userChats);
    const chatLoaded = useSelector(state => state.forumReducer.chatLoaded);
    const topic = route.params;
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const fetchChats = (topicId) => dispatch(getChats(topicId));
    const newChat = (chat) => dispatch(addChat(chat));

    useEffect(() => {
        fetchChats(topic.id);
        firebaseChats();
    }, [!chatLoaded])

    //Save a chat in the database
    const saveNewChat = () => {
        if (message.trim()) {
            const time = moment().tz("Europe/Helsinki").format('LT');
            const date = moment().tz("Europe/Helsinki").format('LL');
            let chat = { text: message, date: date, time: time, topic: topic }
            newChat(chat);
            addChatFirebase(chat);
            setMessage('');
        }
    }

    //Fetch the chats if the firebase database has been changed
    const firebaseChats = () => {
        const ref = topic.name + topic.id;
        firebase.database().ref(ref).on('value', snapshot => {
            fetchChats(topic.id);
        });
    }

    //Save a chat in the firebase database
    const addChatFirebase = (chat) => {
        const ref = topic.name + topic.id;
        firebase.database().ref(ref).set(chat).then(() => {
            console.log('The chat has been saved in firebase');
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <SectionList
                    style={{ width: '100%', marginBottom: 15 }}
                    inverted
                    sections={chats}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) =>
                        <Chat
                            chat={item}
                            color={theme.colors.grey}
                            userColor={theme.colors.orange}
                            isUser={userChats.some((userChat) => userChat.id === item.id)}
                        />
                    }
                    renderSectionFooter={({ section: { date } }) => (
                        <Text style={styles.header}>{date}</Text>)}
                />
            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                        placeholder='Write your message here'
                        value={message}
                        onChangeText={text => setMessage(text)}
                        placeholderTextColor={theme.colors.lightGrey}
                        style={styles.chatInput}
                        multiline={true}
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
            <StatusBar style="auto" />
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
    chatInput: {
        fontSize: theme.fontSizes.chat,
        backgroundColor: theme.colors.grey,
        borderRadius: theme.borderRadius.chat,
        padding: 10,
        width: '100%',
        marginLeft: 10,
        color: 'white'
    },
    sendButton: {
        backgroundColor: theme.colors.orange,
        borderRadius: theme.borderRadius.chatButton,
        padding: 10
    },
    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    header: {
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.cardTitle,
        justifyContent: 'center',
        alignSelf: 'center',
    },
});
