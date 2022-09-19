import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import AddressForm from '../components/AddressForm';
import CartItems from '../components/CartItems';
import PaymentMethod from '../components/PaymentMethod';
import { useAuth } from '../Context/Context';

const { width } = Dimensions.get('screen');

const CheckoutScreen = ({ route }: any) => {
    const routeObj = route.params
    const carouselRef = useRef<ScrollView>(null);
    const [step, setStep] = useState<number>(0);
    const { isAuthorized } = useAuth();

    const handleAddressData = (data: any) => {
        console.log("data", data);
        setStep(2)
    };

    console.log(routeObj)

    // useEffect(() => {
    //     if(routeObj.step) {
    //         setStep(routeObj.step)
    //     }
    // }, [routeObj])

    // () => handleSubmit(onSubmit)

    const handleSlide = () => {
        carouselRef.current?.scrollTo({
            x: step * Dimensions.get('screen').width,
            animated: true,
        });
    };

    useEffect(() => {
        handleSlide();
    }, [step]);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                ref={carouselRef}
                // onScroll={({ nativeEvent }) => onChange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                scrollEnabled={false}
                horizontal
            >
                <CartItems nextStep={() => setStep(1)} />
                <AddressForm submitAddressData={handleAddressData} stepBack={() => setStep(0)} />
                <PaymentMethod stepBack={() => setStep(1)} />
                <View style={styles.purchaseInfoView}>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
    purchaseInfoView: {
        width: width
    },

});