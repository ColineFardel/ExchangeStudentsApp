import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getTips, setVisibleFalse, deleteTip } from '../../redux/actions/tip';
import theme from '../../constants/theme';
import Foot from '../../components/foot';
import AppSnackBar from '../../components/snackbar';
import Loading from '../../components/loading';
import AppListItem from '../../components/listItem';

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
    const deleteOneTip = (index) => dispatch(deleteTip(index));
    const removeSnackBar = () => dispatch(setVisibleFalse());

    //Search bar function
    const updateSearch = (text) => {
        setSearch(text);
        setTipsFiltered(tips.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())));
    }

    useEffect(() => {
        fetchTips();
        setTipsFiltered(tips);
    }, [!tipLoaded])

    const showTips = () => {
        return tipsFiltered.map((tip, index) => {
            const uri = 'https://exchangestudentsapp-fardel.herokuapp.com/img/' + tip.img;

            if (tip.img > 0) {
                return (
                    <AppListItem
                        key={index}
                        onPressAction={() => { navigation.navigate('TipDetails', tip) }}
                        onLongPressAction={() => { deleteOneTip(tip.id) }}
                        title={tip.name}
                        color={theme.colors.lightPurple}
                        subtitle={tip.tag}
                        uri={uri}
                    />
                )
            }
            else {
                return (
                    <AppListItem
                        key={index}
                        onPressAction={() => { navigation.navigate('TipDetails', tip) }}
                        onLongPressAction={() => { deleteOneTip(tip.id) }}
                        title={tip.name}
                        color={theme.colors.lightPurple}
                        subtitle={tip.tag}
                    />
                )
            }
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
        justifyContent: 'center',
        width: '100%',
    },
    listContainer: {
        flex: 1,
        width: '100%',
    },
    image: {
        width: '100%',
        height: 140,
        borderTopLeftRadius: theme.borderRadius.card,
        borderTopRightRadius: theme.borderRadius.card,
    },
});
