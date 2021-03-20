import React from 'react';
import { Image } from 'react-native';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';

export default function ImagesScreen({ route }) {

    const windowWidth = Dimensions.get('window').width;

    const id = route.params;

    const uri = 'https://exchangestudentsapp-fardel.herokuapp.com/img/' + id;

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '100%' }}
                snapToInterval={windowWidth}
                horizontal>
                <Image style={styles.image} source={{ uri: uri }} />
                {/* <Image style={styles.image} source={{ uri: uri }} /> */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'contain'
    },
});
