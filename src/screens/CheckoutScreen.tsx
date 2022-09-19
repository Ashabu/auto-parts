import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm, Controller, useController, Control, FieldValues } from 'react-hook-form';
import { Button, Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AddressForm from '../components/AddressForm';
import CheckoutList from '../components/CheckoutList';
import GoogleMap from '../components/GoogleMap';
import { useAuth } from '../Context/Context';
import { useCartItems } from '../Context/useProducts';
import { goBack, navigate } from '../navigation/Navigation';

import { getData } from '../services/StorageService';
import { Images } from '../utils/Images';

const { width } = Dimensions.get('screen');


const CheckoutScreen = ({ route }: any) => {
    const routeObj = route.params
    const [checkoutItems, setCheckoutItems] = useState<any[]>([]);
    const carouselRef = useRef<ScrollView>(null);
    const [price, setPrice] = useState<number>(0);
    const [address, setAddress] = useState<any>()

    const [step, setStep] = useState<number>(0);

    const { cartItems, totalCost } = useCartItems();
    const { isAuthorized } = useAuth();


    const handleAddressData = (data: any) => {

        console.log("data",data)
    }

    console.log(routeObj)




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

    const handleCheckoutStep = () => {
        if (step == 0 && !isAuthorized) {
            return navigate("SignIn", {
                redirectRoute: 'Checkout',
                redirectScreen: 'CheckoutS'
            });
        };
        if (step > 1) {
            if(!address)
            return;
        };
        setStep(prev => prev + 1);
    }

    useEffect(() => {
        if (step < 0) {
            goBack();
        }
        if (step > 2) {
            return;
        }
        handleSlide();
    }, [step])


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
                <View style={styles.cartItemsView}>
                    {
                        cartItems.map((item: any, index: number) => (
                            <CheckoutList item={item} key={index} />
                        ))
                    }
                    <View style={{ borderTopWidth: 1, borderTopColor: '#CFCFCF' }}>
                        <Text style={styles.totalPriceText}>
                            Total Price $ {totalCost}
                        </Text>
                    </View>
                </View>
                <AddressForm submitAddressData={handleAddressData} checkoutStep ={step}/>
                <View style={styles.deliveryAddressView}>
                    <Text style={styles.deliveryTextStyle}>
                        Select Payment Method
                    </Text>
                    <View style={{ marginBottom: 15 }}>
                        <Image source={Images.CASH_ON_DELIVERY} style={{ alignSelf: 'center', marginBottom: 15 }} />
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>Pay with cash upon delivery</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                            <Text style={{ fontSize: 18 }}>Subtotal</Text>
                            <Text style={{ fontSize: 18 }}>$ 1,114.00</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                            <Text style={{ fontSize: 18 }}>Shipping</Text>
                            <Text style={{ fontSize: 18 }}>$0.00</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#CFCFCF', marginVertical: 5 }}>
                            <Text style={{ fontSize: 18 }}>Total</Text>
                            <Text style={{ fontSize: 18 }}>$ 1,114.00</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.purchaseInfoView}>

                </View>
            </ScrollView>
            <View style={styles.footerContainer}>
                <TouchableOpacity style={[styles.button, styles.buttonBack]} onPress={() => setStep(prev => prev - 1)}>
                    <Text style={styles.btnText}>
                        Back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonNext]} onPress={handleCheckoutStep}>
                    <Text style={styles.btnText}>
                        Next
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row'
    },
    btnText: {
        fontSize: 20,
        textAlign: 'center'
    },
    button: {
        flex: 1,
        padding: 20
    },
    buttonBack: {
        backgroundColor: '#CFCFCF',
    },
    buttonNext: {
        backgroundColor: '#ffdd00'
    },
    totalPriceText: {
        fontSize: 20,
        textAlign: 'right',
        margin: 10
    },
    cartItemsView: {
        width: width,
    },
    deliveryAddressView: {
        width: width,
        padding: 15

    },
    purchaseInfoView: {
        width: width
    },
    inputLabelText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '700',
        marginVertical: 10
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: '#CFCFCF',
    },
    deliveryTextStyle: {
        fontSize: 18,
        marginBottom: 15
    },
    input: {
        backgroundColor: "#fff",
        borderColor: "#fff",
        borderWidth: 1,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 8,
    },
    errorMessage: {
        fontSize: 14,
        color: '#e11818',
        marginVertical: 5
    },
    borderRed: {
        borderColor: '#e11818'
    }
})