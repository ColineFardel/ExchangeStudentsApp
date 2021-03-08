import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import ItemDetails from '../../components/details';

export default function OfferDetails({ navigation, route }) {

    const offer = route.params;

    return (
        <ItemDetails
            item={offer}
            backButton={() => navigation.goBack()}
        />
    )
}