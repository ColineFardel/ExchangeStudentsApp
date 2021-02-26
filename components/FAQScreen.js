import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { getFAQs } from '../redux/actions/faq';
import { useDispatch, useSelector } from 'react-redux';

export default function FAQScreen({ navigation }) {

    const [search, setSearch] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [faqsFiltered, setFaqsFiltered] = useState([]);

    const updateSearch = (text) => {
        setSearch(text);
        setFaqsFiltered(faqs.filter((item) => item.question.toLowerCase().includes(text.toLowerCase())));
        console.log('updating search');
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon.Button name={searchOpen ? 'times':'search'}
                        size={20}
                        color="white"
                        backgroundColor="#6DD07D"
                        onPress={() => { setSearchOpen(!searchOpen) }} />
                    {searchOpen && (
                        <TextInput
                            placeholder="Search..."
                            style={{ backgroundColor: 'white', borderRadius: 20, paddingLeft: 10, paddingRight: 10, marginRight: 15 }}
                            value={search}
                            onChangeText={text => updateSearch(text)}
                        />
                    )}
                </View>
            )
        })
    })

    const [loaded] = useFonts({
        Montserrat: require('../assets/myfonts/Montserrat-Regular.ttf'),
        MontserratBold: require('../assets/myfonts/Montserrat-Bold.ttf'),
    });

    // async loadFonts(){
    //     await Font.loadAsync({
    //         Montserrat: require('../assets/myfonts/Montserrat-Regular.ttf'),
    //     });
    // };

    // const [fontLoaded, setFontLoaded] = useState(false);

    // const loadFonts = () => {
    //     return Font.loadAsync({
    //         Montserrat: require('../assets/myfonts/Montserrat-Regular.ttf'),
    //     })
    // }

    const faqs = useSelector(state => state.faqReducer.faqs);
    const faqLoaded = useSelector(state => state.faqReducer.faqLoaded);
    const dispatch = useDispatch();

    const fetchFaqs = () => dispatch(getFAQs());

    useEffect(() => {
        fetchFaqs();
        setFaqsFiltered(faqs);
    }, [!faqLoaded])

    const [currentIndex, setCurrentIndex] = React.useState(null);

    const showFAQs = () => {
        return faqsFiltered.map((data, index) => {
            let closed = true;
            if (index === currentIndex)
                closed = false;
            return (
                <TouchableOpacity
                    key={data.question}
                    onPress={() => { setCurrentIndex(index) }}
                    onLongPress={() => console.log('long press')}
                    style={{
                        width: "100%", alignItems: 'center',
                    }}
                >
                    <View style={styles.card}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ maxWidth: '90%', fontFamily: "MontserratBold", fontSize: 20, color: "black" }}>{data.question}</Text>
                            <Icon name={closed ? "chevron-right" : "chevron-down"}
                                size={20}
                                color="black" />
                        </View>


                        {!closed && (
                            <View>
                                <Text style={{ fontFamily: "Montserrat", fontSize: 18, color: "black" }}>{data.answer}</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            )
        })
    }

    if (!loaded) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }
    else {
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
                            backgroundColor="#6DD07D"
                            onPress={() => { navigation.navigate('AddFAQ', getFAQs) }} />
                    </View>

                </View>
            </View>
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
        backgroundColor: '#6DD07D',
        opacity: 0.5,
        borderRadius: 10,
        width: '90%',
        padding: 10,
        margin: 10,
    },
    foot: {
        backgroundColor: '#6DD07D',
        width: '100%',
        flexDirection: 'row',
        minHeight: 50,
    },
    content: {
        flex: 10,
        width: '100%',
    },
    text: {
        fontFamily: 'MontserratBold',
        fontSize: 16,
        color: 'white',
    },
    input: {
        borderWidth: 0,
        width: '50%',
        backgroundColor: '#6DD07D',
    },
});
