import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { deleteTopic, getTopics, setVisibleFalse } from '../../redux/actions/forum';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../constants/theme';
import Foot from '../../components/foot';
import AppSnackBar from '../../components/snackbar';
import Loading from '../../components/loading';
import AppListItem from '../../components/listItem';

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

    //Constants for Forum
    const dispatch = useDispatch();
    const topics = useSelector(state => state.forumReducer.topics);
    const topicLoaded = useSelector(state => state.forumReducer.topicLoaded);
    const fetchTopics = (token) => dispatch(getTopics(token));
    const deleteOneTopic = (index, token) => dispatch(deleteTopic(index, token));

    //Constants for snack bar
    const visible = useSelector(state => state.forumReducer.snackBarVisible);
    const message = useSelector(state => state.forumReducer.snackBarMessage);
    const removeSnackBar = () => dispatch(setVisibleFalse());

    //Constants for filtering
    const [search, setSearch] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [topicsFiltered, setTopicsFiltered] = useState([]);

    //Constants for user
    const token = useSelector(state => state.authReducer.token);
    const user = useSelector(state => state.authReducer.user);

    useEffect(() => {
        fetchTopics(token);
        setTopicsFiltered(topics);
    }, [!topicLoaded])

    //Search bar function
    const updateSearch = (text) => {
        setSearch(text);
        setTopicsFiltered(topics.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())));
    }

    //Render list of topics
    const showTopics = () => {
        return topicsFiltered.map((topic, index) => {
            return (
                <AppListItem
                    color={theme.colors.lightOrange}
                    title={topic.name}
                    onPressAction={() => { navigation.navigate('ChatRoom', topic) }}
                    onLongPressAction={user.role === "ADMIN" ? () => { deleteOneTopic(topic.id, token) } : () => { }}
                    key={index}
                />
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
                <AppSnackBar
                    visible={visible}
                    onDismiss={() => removeSnackBar()}
                    message={message}
                    color={theme.colors.orange}
                />
                <Foot
                    color={theme.colors.orange}
                    icon="plus-circle"
                    textTop="You want to create a new topic?"
                    textBottom="No problem! Create one here"
                    iconAction={() => { navigation.navigate('AddTopic') }}
                />
                <StatusBar style="auto" />
            </View>
        );
    }
    else {
        return (
            <Loading />
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
