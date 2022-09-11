import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { Button, Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CheckoutList from '../components/CheckoutList';
import GoogleMap from '../components/GoogleMap';
import { useCart } from '../Context/Context';
import { getData } from '../services/StorageService';
import { Images } from '../utils/Images';

const { width } = Dimensions.get('screen');

const CheckoutScreen = ({ route }: any) => {
    const [checkoutItems, setCheckoutItems] = useState<any[]>([]);
    const carouselRef = useRef<ScrollView>(null);
    const [price, setPrice] = useState<number>(0);
    const [step, setStep] = useState<number>(0);
    const [showMap, setShowMap] = useState<boolean>(false);
    const { cartItems } = useCart();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            deliveryAddress: '',
            phoneNumber: '',
            name: '',
            postalCode: '',

        }
    });
    const onSubmit = (data: any) => console.log(data);

    const getMapData =(data: any) => {
        console.log(data);
        setShowMap(false);
    } 

    let Price = () => {
        let totalPrice = 0;
        for (let i = 0; i < cartItems.length; i++) {
            totalPrice += (Number(cartItems[i].price) * Number(cartItems[i].item_count))
        }
        setPrice(totalPrice)

    };

    useEffect(() => {
        Price();
    }, [cartItems]);

    const handleOrderStep = () => {
        carouselRef.current?.scrollTo({
            x: step * Dimensions.get('screen').width,
            animated: true,
        });
    };

    useEffect(() => {
        handleOrderStep();
        if (step == 2) {
        }
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
                            Total Price $ {price}
                        </Text>
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.deliveryAddressView}>
                    <Text style={styles.inputLabelText}>
                        Delivery Address
                    </Text>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.inputStyle}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="deliveryAddress"
                    />
                    <Text style={styles.inputLabelText}>
                        Contact Phone
                    </Text>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.inputStyle}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="phoneNumber"
                    />
                    <Text style={styles.inputLabelText}>
                        Receiver Name
                    </Text>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.inputStyle}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="name"
                    />
                    <Text style={styles.inputLabelText}>
                        Postal Code
                    </Text>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.inputStyle}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="postalCode"
                    />
                    <TouchableOpacity onPress={() => setShowMap(true)} style={{padding: 10, backgroundColor: 'blue', marginTop: 15, borderRadius: 10}}>
                          <Text style={{color: '#fff', alignSelf: 'center'}}>
                            Use Google Map
                          </Text>
                        </TouchableOpacity>
                    <Modal visible={showMap}>
                        <GoogleMap sendData={getMapData} />
                    </Modal>
                </ScrollView>
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
                <TouchableOpacity style={[styles.button, styles.buttonNext]} onPress={() => setStep(prev => prev + 1)}>
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
    }
})