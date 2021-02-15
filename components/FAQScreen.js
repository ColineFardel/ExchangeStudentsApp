import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';

export default function FAQScreen() {

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
                        width: "100%", backgroundColor: 'yellow', alignItems: 'center'
                    }}
                >
                    <View style={styles.card}>
                        <Text>{data.question}</Text>
                        {index === currentIndex && (
                            <View>
                                <Text>{data.answer}</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            )
        })
    }

    return (
        <View style={styles.container}>
            <Text>This is faq screen</Text>

            {showFAQs()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    card: {
        backgroundColor: 'red',
        borderRadius: 10,
        width: '90%',
        padding: 10,
        margin: 10,
    }
});
