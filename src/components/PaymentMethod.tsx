import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { Images } from '../utils/Images';

const { width } = Dimensions.get('screen');

const PaymentMethod = ({stepBack, onPlaceOrder}: any) => {
    return (
        <View style={{flex: 1, justifyContent:'space-between'}}>
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
            <View style={styles.footerContainer}>
                <TouchableOpacity style={[styles.button, styles.buttonBack]} onPress={stepBack}>
                    <Text style={styles.btnText}>
                        Back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonNext]} onPress={onPlaceOrder}>
                    <Text style={styles.btnText}>
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PaymentMethod;

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
})