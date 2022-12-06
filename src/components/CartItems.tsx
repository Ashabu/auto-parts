import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import CheckoutList from './CheckoutList';
import { useProduct, useProductDispatch } from '../Context/ProductsContext';
import { goBack } from '../navigation/Navigation';
import { Colors } from '../utils/AppColors';

const { width } = Dimensions.get('screen');

const CartItems = ({ nextStep }: any) => {
    const { shoppingCart } = useProduct();
    const dispatch = useProductDispatch();
    const [totalCost, setTotalCost] = useState<number>(0);

    const calculateTotalCost = () => {
        let tempCost: number = 0;
        shoppingCart.forEach(item => {
            tempCost += (item.count * item.RetilePRiceOFPremix)
        });
        setTotalCost(tempCost);
        dispatch({totalCost: tempCost})
    };

    useEffect(() => {
        calculateTotalCost()
    }, [shoppingCart])


    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <ScrollView contentContainerStyle={styles.cartItemsView}>
                {
                    shoppingCart?.map((item: any, index: number) => (
                        <CheckoutList item={item} key={index} isCheckout/>
                    ))
                }
                <View style={{ borderTopWidth: 1, borderTopColor: '#CFCFCF' }}>
                    <Text style={styles.totalPriceText}>
                        Total Price $ {totalCost}
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.footerContainer}>
                <TouchableOpacity style={[styles.button, styles.buttonBack]} onPress={() => goBack()}>
                    <Text style={styles.btnText}>
                        Back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonNext]} onPress={nextStep}>
                    <Text style={styles.btnText}>
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CartItems;

const styles = StyleSheet.create({
    cartItemsView: {
        width: width,
    },
    totalPriceText: {
        fontSize: 20,
        textAlign: 'right',
        margin: 10,
        color: Colors.BLACK
    },
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
})