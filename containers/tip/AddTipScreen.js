import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, Image } from 'react-native';
import AppInput from '../../components/input';
import { addTip, addTipWithImg } from '../../redux/actions/tip';
import { useDispatch } from 'react-redux';
import theme from '../../constants/theme';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

export default function AddTipScreen({ navigation }) {
    //Constants
    const [tip, setTip] = useState('');
    const [photo, setPhoto] = useState(null);
    const dispatch = useDispatch();
    const saveTip = (tip) => dispatch(addTip(tip));
    const saveTipWithImg = (tip) => dispatch(addTipWithImg(tip));

    //Open the user's library to choose an image
    const selectPicture = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            fileName: true,
        });

        if (!result.cancelled) {
            setPhoto({
                name: result.fileName ||
                    result.uri.substr(result.uri.lastIndexOf('/') + 1),
                uri: result.uri,
                type: 'image/png'
            });
        }
    }
    
    //Save the tip in the database
    const saveTheTip = () => {
        let canBeSaved = true;

        if (!tip.name) {
            Alert.alert('Fill every fields', 'You must enter the name of the tip');
            canBeSaved = false;
        }
        if (!tip.description) {
            Alert.alert('Fill every fields', 'You must enter the description of the tip');
            canBeSaved = false;
        }
        if (!tip.tag) {
            Alert.alert('Fill every fields', 'You must enter the tag of the tip');
            canBeSaved = false;
        }

        if (canBeSaved) {
            if (photo) {
                const data = new FormData();
                data.append('file', { name: photo.name, type: photo.type, uri: photo.uri });
                data.append('name', tip.name);
                data.append('desc', tip.description);
                data.append('tag', tip.tag);
                if (!tip.location)
                    data.append('location', "");
                else
                    data.append('location', tip.location);
                saveTipWithImg(data);
            }
            else {
                saveTip(tip);
            }
            navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Create your own tip</Text>
                <ScrollView style={{ width: '100%' }}>
                    <AppInput
                        placeholder="Type the name of the tip"
                        color={theme.colors.lightPurple}
                        action={value => setTip({ ...tip, name: value })}
                    />
                    <AppInput
                        placeholder="Type the description of the tip"
                        color={theme.colors.lightPurple}
                        action={value => setTip({ ...tip, description: value })}
                    />
                    <AppInput
                        placeholder="Type the tag of the tip"
                        color={theme.colors.lightPurple}
                        action={value => setTip({ ...tip, tag: value })}
                    />
                    <AppInput
                        placeholder="Type the location of the tip"
                        color={theme.colors.lightPurple}
                        action={value => setTip({ ...tip, location: value })}
                    />
                    <Button
                        buttonStyle={styles.addImgButton}
                        titleStyle={styles.addImgButtonText}
                        onPress={() => { selectPicture() }}
                        title="Add a picture"
                    />
                    {photo && (
                        <Image
                            source={{ uri: photo.uri }}
                            style={{ width: '100%', height: 500 }}
                        />
                    )}
                </ScrollView>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    raised={true}
                    buttonStyle={styles.sendButton}
                    titleStyle={styles.sendButtonText}
                    onPress={() => saveTheTip()}
                    title="SEND" />
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    title: {
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.screenTitle,
        color: theme.colors.purple,
        marginTop: 15,
        marginBottom: 20,
        textAlign: 'center'
    },
    sendButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: theme.colors.purple,
        borderRadius: theme.borderRadius.button,
    },
    sendButtonText: {
        color: theme.colors.purple,
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.buttonText,
        width: '70%'
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 15,
        flex: 1,
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 15,
    },
    addImgButton: {
        backgroundColor: theme.colors.lightPurple,
        borderRadius: theme.borderRadius.button,
        marginTop: 15,
        marginBottom: 35,
        width: '90%',
        alignSelf: 'center',
    },
    addImgButtonText: {
        color: 'white',
        fontFamily: theme.fonts.bold,
        fontSize: theme.fontSizes.cardTitle,
    },
});
