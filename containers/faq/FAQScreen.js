import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { getFAQs } from '../../redux/actions/faq';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../constants/theme';

export default function FAQScreen({ navigation }) {

    //Header
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.header}>
                    <Icon.Button name={searchOpen ? 'times' : 'search'}
                        size={20}
                        color="white"
                        backgroundColor={theme.colors.green}
                        onPress={() => { setSearchOpen(!searchOpen); updateSearch(''); }} />
                    {searchOpen && (
                        <TextInput
                            placeholder="Search..."
                            style={styles.searchBar}
                            value={search}
                            onChangeText={text => updateSearch(text)}
                        />
                    )}
                </View>
            )
        })
    })

    // //Loading the fonts
    // const [loaded] = useFonts({
    //     Montserrat: require('../assets/myfonts/Montserrat-Regular.ttf'),
    //     MontserratBold: require('../assets/myfonts/Montserrat-Bold.ttf'),
    // });

    //Constants
    const [search, setSearch] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [faqsFiltered, setFaqsFiltered] = useState([]);
    const [currentIndex, setCurrentIndex] = React.useState(null);

    const faqs = useSelector(state => state.faqReducer.faqs);
    const faqLoaded = useSelector(state => state.faqReducer.faqLoaded);
    const dispatch = useDispatch();
    const fetchFaqs = () => dispatch(getFAQs());

    //Search bar function
    const updateSearch = (text) => {
        setSearch(text);
        setFaqsFiltered(faqs.filter((item) => item.question.toLowerCase().includes(text.toLowerCase())));
        console.log('updating search');
    }

    useEffect(() => {
        fetchFaqs();

        setFaqsFiltered(faqs.sort((a, b) => {
            if (a.tag < b.tag)
                return -1;
            if (a.tag > b.tag)
                return 1;
            if (a.tag === null)
                return 1;
            if (b.tag === null)
                return -1;
            return 0;
        }));
    }, [!faqLoaded])

    const showFAQs = () => {
        return faqsFiltered.map((data, index) => {
            let closed = true;
            if (index === currentIndex)
                closed = false;
            return (
                <TouchableOpacity
                    key={data.question}
                    onPress={() => { setCurrentIndex(index) }}
                    onLongPress={() => navigation.navigate('ModifyFAQ', data)}
                    style={{
                        width: "100%", alignItems: 'center',
                    }}
                >
                    <View style={styles.card}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.cardTitle}>{data.question}</Text>
                            <Icon name={closed ? "chevron-right" : "chevron-down"}
                                size={20}
                                color="black" />
                        </View>

                        {data.tag && (
                            <Text style={styles.cardText}>{data.tag}</Text>
                        )}

                        {!closed && (
                            <View>
                                <Text style={styles.cardText}>{data.answer}</Text>

                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            )
        })
    }

    return (
        <View style={styles.container}>

            <View style={styles.content}>
                <ScrollView style={{ width: '100%' }}>
                    {showFAQs()}
                </ScrollView>
            </View>

            <View style={styles.foot}>
                <View style={{ flex: 4, alignItems: "center", justifyContent: "center" }}>
                    <Text style={styles.text}>Those questions did'nt help you?</Text>
                    <Text style={styles.text}>No problem! Ask your question here</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Icon.Button name="question-circle"
                        size={50}
                        color="white"
                        backgroundColor={theme.colors.green}
                        onPress={() => { navigation.navigate('AddFAQ', getFAQs) }} />
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchBar: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 15
    },
    card: {
        backgroundColor: theme.colors.lightGreen,
        borderRadius: 10,
        width: '90%',
        padding: 10,
        margin: 10,
    },
    foot: {
        backgroundColor: theme.colors.green,
        width: '100%',
        flexDirection: 'row',
        minHeight: 50,
    },
    content: {
        flex: 10,
        width: '100%',
    },
    text: {
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.footText,
        color: theme.colors.footTextColor,
    },
    cardText: {
        fontFamily: theme.fonts.regular,
        fontSize: theme.fontSizes.cardText,
        color: "black"
    },
    input: {
        borderWidth: 0,
        width: '50%',
        backgroundColor: theme.colors.green,
    },
    cardTitle: {
        maxWidth: '90%',
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.cardTitle,
        color: "black"
    }
});