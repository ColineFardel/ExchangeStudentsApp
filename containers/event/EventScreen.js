import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../constants/theme';
import Foot from '../../components/foot';
import AppSnackBar from '../../components/snackbar';
import Loading from '../../components/loading';
import AppListItem from '../../components/listItem';
import { deleteEvent, getEvents, setVisibleFalse } from '../../redux/actions/events';

export default function EventScreen({ navigation }) {

    //Header for search bar
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Search
                    searchOpen={searchOpen}
                    color={theme.colors.pink}
                    onPress={() => { setSearchOpen(!searchOpen); updateSearch(''); }}
                    onChangeText={text => updateSearch(text)}
                    search={search}
                />
            )
        })
    })

    //Constants
    const visible = useSelector(state => state.forumReducer.snackBarVisible);
    const message = useSelector(state => state.forumReducer.snackBarMessage);
    const [search, setSearch] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [eventsFiltered, setEventsFiltered] = useState([]);
    const events = useSelector(state => state.eventReducer.events);
    const eventLoaded = useSelector(state => state.eventReducer.eventLoaded);
    const dispatch = useDispatch();
    const fetchEvents = () => dispatch(getEvents());
    const deleteOneEvent = (index) => dispatch(deleteEvent(index));
    const removeSnackBar = () => dispatch(setVisibleFalse());

    useEffect(() => {
        fetchEvents();
        setEventsFiltered(events);
    }, [!eventLoaded])

    //Search bar function
    const updateSearch = (text) => {
        setSearch(text);
        setEventsFiltered(events.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())));
    }

    //Render list of events
    const showEvents = () => {
        return eventsFiltered.map((event, index) => {
            return (
                <AppListItem
                    color={theme.colors.lightPink}
                    title={event.name}
                    subtitle={event.location}
                    secondsubtitle={event.date}
                    onPressAction={() => { navigation.navigate('EventDetails', event) }}
                    onLongPressAction={() => { deleteOneEvent(event.id) }}
                    key={index}
                />
            )
        })
    }

    if (eventLoaded) {
        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>

                    <ScrollView style={{ width: '100%' }}>
                        {showEvents()}
                    </ScrollView>
                </View>
                <AppSnackBar
                    visible={visible}
                    onDismiss={() => removeSnackBar()}
                    message={message}
                    color={theme.colors.pink}
                />
                <Foot
                    color={theme.colors.pink}
                    icon="plus-circle"
                    textTop="You want to create a new event?"
                    textBottom="No problem! Create one here"
                    iconAction={() => { navigation.navigate('AddEvent') }}
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
