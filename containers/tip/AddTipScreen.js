import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, Image } from 'react-native';
import AppInput from '../../components/input';
import { addTip, addTipWithImg } from '../../redux/actions/tip';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../constants/theme';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AddTipScreen({ navigation }) {

    //Constants for Tip
    const [tip, setTip] = useState('');
    const [photo, setPhoto] = useState(null);
    const dispatch = useDispatch();
    const saveTip = (tip, token) => dispatch(addTip(tip, token));
    const saveTipWithImg = (tip, token) => dispatch(addTipWithImg(tip, token));

    //Constants for user
    const token = useSelector(state => state.authReducer.token);
    const user = useSelector(state => state.authReducer.user);

    //Open the user's library to choose a picture
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

    //Open user's camero to take a picture
    const takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
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

    //Show alert for user to choose how to add a picture
    const pictureOption = () => {
        Alert.alert('Add a picture', 'Choose which way you would like to add a picture', [
            { text: 'Camera roll', onPress: () => { takePicture() } },
            { text: 'Gallery', onPress: () => { selectPicture() } }
        ]);
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

                data.append('userId', user.id);
                saveTipWithImg(data, token);
            }
            else {
                saveTip({ ...tip, user: user }, token);
            }
            navigation.goBack();
        }
    }

    const setTag = (value) => {
        let tag = '';
        if (value.charAt(0) !== '#') {
            tag = '#' + value;
            setTip({ ...tip, tag: tag });
        }
        else setTip({ ...tip, tag: value });
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
                        action={value => setTag(value)}
                        icon={<Icon name='hashtag'
                            size={20}
                            color={theme.colors.lightPurple} />}
                    />
                    <AppInput
                        placeholder="Type the location of the tip"
                        color={theme.colors.lightPurple}
                        action={value => setTip({ ...tip, location: value })}
                    />
                    <Button
                        buttonStyle={styles.addImgButton}
                        titleStyle={styles.addImgButtonText}
                        onPress={() => { pictureOption() }}
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
