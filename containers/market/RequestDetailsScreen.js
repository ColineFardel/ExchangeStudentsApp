import React from 'react';
import ItemDetails from '../../components/details';

export default function RequestDetails({ navigation, route }) {

    const request = route.params;

    return (
        <ItemDetails
            item={request}
            backButton={() => navigation.goBack()}
        />
    )
}
