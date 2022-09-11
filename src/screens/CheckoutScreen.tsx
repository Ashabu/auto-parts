import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import CheckoutList from '../components/CheckoutList';
import { getData } from '../services/StorageService';

const CheckoutScreen = ({ route }: any) => {
    const [checkoutItems, setCheckoutItems] = useState<any[]>([]);

    const handleCheckoutItems = () => {
        getData('checkout_items').then(data => {
            console.log('data ====>', data)
            if (data) {
                let parsedData = JSON.parse(data)
                setCheckoutItems(parsedData)
            };
        });
    };

    useEffect(() => {
        handleCheckoutItems();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                keyExtractor={(item) => item.id}
                data={checkoutItems}
                renderItem={({ item }) => {
                    console.log('item.item_count', item.item_count)
                    return (
                        <CheckoutList item={item} />
                    )
                }} />

        </SafeAreaView>
    );
};

export default CheckoutScreen;