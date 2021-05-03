import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAnsweredFAQs, getFAQs, setVisibleFalse } from '../../redux/actions/faq';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../constants/theme';
import Foot from '../../components/foot';
import Search from '../../components/search';
import Loading from '../../components/loading';

export default function FAQScreen({ navigation }) {

    //Header for search bar
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Search
                    searchOpen={searchOpen}
                    color={theme.colors.green}
                    onPress={() => { setSearchOpen(!searchOpen); updateSearch(''); }}
                    onChangeText={text => updateSearch(text)}
                    search={search}
                />
            )
        })
    })

    //Constants for filtering
    const [search, setSearch] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [faqsFiltered, setFaqsFiltered] = useState([]);

    //Constants for FAQ
    const dispatch = useDispatch();
    const [currentIndex, setCurrentIndex] = useState(null);
    const faqs = useSelector(state => state.faqReducer.faqs);
    const faqLoaded = useSelector(state => state.faqReducer.faqLoaded);
    const fetchFaqs = (token) => dispatch(getFAQs(token));
    const fetchAnsweredFaqs = (token) => dispatch(getAnsweredFAQs(token));

    //Constants for user
    const token = useSelector(state => state.authReducer.token);
    const user = useSelector(state => state.authReducer.user);

    //Constants for snack bar
    const visible = useSelector(state => state.faqReducer.snackBarVisible);
    const message = useSelector(state => state.faqReducer.snackBarMessage);
    const removeSnackBar = () => dispatch(setVisibleFalse());

    //Search bar function
    const updateSearch = (text) => {
        setSearch(text);
        setFaqsFiltered(faqs.filter((item) => item.question.toLowerCase().includes(text.toLowerCase())));
    }

    useEffect(() => {
        console.log(user);
        if (user.role === 'ADMIN') {
            fetchFaqs(token);
            console.log("admin");
        }
        else {
            fetchAnsweredFaqs(token);
            console.log("user");
        }
        setFaqsFiltered(faqs);
    }, [!faqLoaded])

    //Render list of FAQs
    const showFAQs = () => {
        return faqsFiltered.map((faq, index) => {
            let closed = true;
            if (index === currentIndex)
                closed = false;
            return (
                <TouchableOpacity
                    key={faq.question}
                    onPress={() => { setCurrentIndex(index) }}
                    onLongPress={user.role === "ADMIN" ? () => navigation.navigate('ModifyFAQ', faq) : () => { }}
                    style={{ width: "100%", alignItems: 'center' }}>
                    <View style={styles.card}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.cardTitle}>{faq.question}</Text>
                            <Icon name={closed ? "chevron-right" : "chevron-down"}
                                size={20}
                                color="black" />
                        </View>
                        {faq.tag && (
                            <Text style={styles.cardText}>{faq.tag}</Text>
                        )}
                        {!closed && (
                            <Text style={styles.cardText}>{faq.answer}</Text>
                        )}
                    </View>
                </TouchableOpacity>
            )
        })
    }

    if (faqLoaded) {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <ScrollView style={{ width: '100%' }}>
                        {showFAQs()}
                    </ScrollView>
                </View>
                <AppSnackBar
                    visible={visible}
                    onDismiss={() => removeSnackBar()}
                    message={message}
                    color={theme.colors.green}
                />
                <Foot
                    color={theme.colors.green}
                    icon="question-circle"
                    textTop="Those questions didn't help you?"
                    textBottom="No problem! Ask your question here"
                    iconAction={() => { navigation.navigate('AddFAQ', getFAQs) }}
                />
                <StatusBar style="auto" />
            </View>
        )
    }
    else {
        return (
            <Loading />
        )
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
    card: {
        backgroundColor: theme.colors.lightGreen,
        borderRadius: theme.borderRadius.card,
        width: '90%',
        padding: 10,
        margin: 10,
    },
    content: {
        flex: 10,
        width: '100%',
    },
    cardText: {
        fontFamily: theme.fonts.regular,
        fontSize: theme.fontSizes.cardText,
        color: "black"
    },
    cardTitle: {
        maxWidth: '90%',
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.cardTitle,
        color: "black"
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
