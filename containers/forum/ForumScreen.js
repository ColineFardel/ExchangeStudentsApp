import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { deleteTopic, getTopics } from '../../redux/actions/forum';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../constants/theme';
import Foot from '../../components/foot';

export default function ForumScreen({ navigation }) {

    //Header for search bar
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Search
                    searchOpen={searchOpen}
                    color={theme.colors.orange}
                    onPress={() => { setSearchOpen(!searchOpen); updateSearch(''); }}
                    onChangeText={text => updateSearch(text)}
                    search={search}
                />
            )
        })
    })

    //Constants
    const [search, setSearch] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [topicsFiltered, setTopicsFiltered] = useState([]);
    const topics = useSelector(state => state.forumReducer.topics);
    const topicLoaded = useSelector(state => state.forumReducer.topicLoaded);
    const dispatch = useDispatch();
    const fetchTopics = () => dispatch(getTopics());
    const deleteOneTopic = (index) => dispatch(deleteTopic(index));

    useEffect(() => {
        fetchTopics();
        setTopicsFiltered(topics);
    }, [!topicLoaded])

    const updateSearch = (text) => {
        setSearch(text);
        setTopicsFiltered(topics.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())));
    }

    const showTopics = () => {
        return topicsFiltered.map((topic, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => { navigation.navigate('ChatRoom', topic) }}
                    onLongPress={()=>{deleteOneTopic(topic.id)}}
                >
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', width: '90%', flexDirection: 'row', backgroundColor: theme.colors.lightOrange, borderRadius: theme.borderRadius.card, margin: 10, padding: 10 }}>
                        <Text style={{ fontSize: theme.fontSizes.cardTitle, fontFamily: theme.fonts.bold }}>{topic.name}</Text>
                        <Icon name={"chevron-right"}
                            size={20}
                            color="black" />
                    </View>

                </TouchableOpacity>
            )

        })
    }

    if (topicLoaded) {
        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <ScrollView style={{ width: '100%' }}>
                        {showTopics()}
                    </ScrollView>
                </View>

                <Foot
                    color={theme.colors.orange}
                    icon="plus-circle"
                    textTop="You want to create a new topic?"
                    textBottom="No problem! Create one here"
                    iconAction={() => { navigation.navigate('AddTopic') }}
                />
            </View>
        );
    }
    else {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
                <Text>Please wait</Text>
            </View>
        );
    }


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
});