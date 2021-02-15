import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import { AppLoading } from 'expo-app-loading';


export default function FAQScreen() {

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


    const [faqs, setFAQs] = useState([]);

    useEffect(() => {
        getFAQs();
    }, [])

    const getFAQs = () => {
        const url = 'https://exchangestudentsapp-fardel.herokuapp.com/faq';

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setFAQs(data);
            })
            .catch((error) => {
                Alert.alert('Error', error);
            });
    }

    const [currentIndex, setCurrentIndex] = React.useState(null);

    const showFAQs = () => {
        return faqs.map((data, index) => {
            return (
                <TouchableOpacity
                    key={data.question}
                    onPress={() => { setCurrentIndex(index) }}
                    style={{
                        width: "100%", alignItems: 'center',
                    }}
                >
                    <View style={styles.card}>
                        <Text style={{ fontFamily: "MontserratBold", fontSize: 20, color: "black" }}>{data.question}</Text>
                        {index === currentIndex && (
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
                    {showFAQs()}
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
                            onPress={() => { }} />
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
        flex: 1,
        backgroundColor: '#6DD07D',
        width: '100%',
        flexDirection: 'row',
    },
    content: {
        flex: 10,
        width: '100%',
    },
    text: {
        fontFamily: 'MontserratBold',
        fontSize: 16,
        color: 'white',
    }
});
