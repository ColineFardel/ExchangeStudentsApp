import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default Search = (props) => {

    const { color, search, onPress, onChangeText, searchOpen } = props;

    return (
        <View style={styles.header}>
            <Icon.Button name={searchOpen ? 'times' : 'search'}
                size={20}
                color="white"
                backgroundColor={color}
                onPress={onPress} />
            {searchOpen && (
                <TextInput
                    placeholder="Search..."
                    style={styles.searchBar}
                    value={search}
                    onChangeText={onChangeText}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
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
});