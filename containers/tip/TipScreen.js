import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { getTips, setVisibleFalse } from '../../redux/actions/tip';
import theme from '../../constants/theme';
import Foot from '../../components/foot';
import AppSnackBar from '../../components/snackbar';
import Loading from '../../components/loading';

export default function TipScreen({ navigation }) {

    //Header for search bar
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Search
                    searchOpen={searchOpen}
                    color={theme.colors.purple}
                    onPress={() => { setSearchOpen(!searchOpen); updateSearch(''); }}
                    onChangeText={text => updateSearch(text)}
                    search={search}
                />
            )
        })
    })

    const [search, setSearch] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [tipsFiltered, setTipsFiltered] = useState([]);
    const visible = useSelector(state => state.tipReducer.snackBarVisible);
    const message = useSelector(state => state.tipReducer.snackBarMessage);
    const tips = useSelector(state => state.tipReducer.tips);
    const tipLoaded = useSelector(state => state.tipReducer.tipLoaded);
    const dispatch = useDispatch();
    const fetchTips = () => dispatch(getTips());
    const removeSnackBar = () => dispatch(setVisibleFalse());

    //Search bar function
    const updateSearch = (text) => {
        setSearch(text);
        setTipsFiltered(tips.filter((item)=> item.name.toLowerCase().includes(text.toLowerCase())));
        //setFaqsFiltered(faqs.filter((item) => item.question.toLowerCase().includes(text.toLowerCase())));
    }

    useEffect(() => {
        fetchTips();
        setTipsFiltered(tips);
    }, [!tipLoaded])

    const showTips = () => {
        return tipsFiltered.map((tip, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => { navigation.navigate('TipDetails', tip) }}
                //onLongPress={() => { deleteOneTopic(topic.id) }}
                >
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', width: '90%', flexDirection: 'row', backgroundColor: theme.colors.lightPurple, borderRadius: theme.borderRadius.card, margin: 10, padding: 10 }}>
                        <View>
                            <Text style={{ fontSize: theme.fontSizes.cardTitle, fontFamily: theme.fonts.bold }}>{tip.name}</Text>
                            <Text style={{ fontSize: theme.fontSizes.cardTitle, fontFamily: theme.fonts.regular }}>{tip.tag}</Text>
                        </View>
                        <Icon name={"chevron-right"}
                            size={20}
                            color="black" />
                    </View>
                </TouchableOpacity>
            )
        })
    }

    if (tipLoaded) {
        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <ScrollView style={{ width: '100%' }}>
                        {showTips()}
                    </ScrollView>
                </View>
                <AppSnackBar
                    visible={visible}
                    onDismiss={() => removeSnackBar()}
                    message={message}
                    color={theme.colors.purple}
                />
                <Foot
                    color={theme.colors.purple}
                    icon="plus-circle"
                    textTop="You want to create a new tip?"
                    textBottom="No problem! Create one here"
                    iconAction={() => { navigation.navigate('AddTip') }}
                />
                <StatusBar style="auto" />
            </View>
        )
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
