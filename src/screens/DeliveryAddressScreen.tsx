import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import AddressForm from '../components/AddressForm';
import SavedAddress, { IAddress } from '../components/SavedAddress';
import { getData } from '../services/StorageService';





const DeliveryAddressScreen = () => {
    const carouselRef = useRef<ScrollView>(null);

    const [address, setAddress] = useState<IAddress>({});


    useEffect(() => {
        handleGetAddress();
    }, [])

    const handleScrollPage = (step: number, width: number) => {
        carouselRef.current?.scrollTo({
            x: step * width,
            animated: true
        });
        if (step == 0) {
            handleGetAddress
        }
    };

    const handleGetAddress = () => {
        getData('address').then(res => {
            if (res) {
                let response = JSON.parse(res);
                setAddress(response);
            };
        }).catch(e => {
            Alert.alert('Error', JSON.parse(JSON.stringify(e.response.data.message)));
        })
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                ref={carouselRef}
                // onScroll={({ nativeEvent }) => onChange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                scrollEnabled={true}
                horizontal>
                <SavedAddress onPageMove={handleScrollPage} address={address} />
                <AddressForm onPageMove={handleScrollPage} isForEdit />
            </ScrollView >



        </SafeAreaView >
    );
};

export default DeliveryAddressScreen;

