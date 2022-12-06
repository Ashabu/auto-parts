import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AddressForm from '../components/AddressForm';
import CartItems from '../components/CartItems';
import PaymentMethod from '../components/PaymentMethod';
import { useAuth } from '../Context/Context';
import { useProduct } from '../Context/ProductsContext';
import { navigate } from '../navigation/Navigation';
import { Colors } from '../utils/AppColors';

const { width } = Dimensions.get('screen');

const CheckoutScreen = ({ route }: any) => {
    const { t } = useTranslation();
    const {shoppingCart} = useProduct();
    const routeObj = route.params
    const carouselRef = useRef<ScrollView>(null);
    const [step, setStep] = useState<number>(0);
    const { isAuthorized } = useAuth();

    const handleAddressData = (data: any) => {
        setStep(2)
    };

    const handleSlide = () => {
        carouselRef.current?.scrollTo({
            x: step * Dimensions.get('screen').width,
            animated: true,
        });
    };
    const handleResetSlide = () => {
        carouselRef.current?.scrollTo({
            x: 0,
            animated: true,
        });
    }
    useEffect(() => {
        handleSlide();

        return () => handleResetSlide();
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
                <PaymentMethod stepBack={() => setStep(1)} onPlaceOrder={() => setStep(3)} />
                <View style={styles.purchaseInfoView}>
                    <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.title}>{t('orderPlaced')}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.loadMoreBtn} onPress={() => {handleResetSlide(); navigate('HomeS')}}>
                            <Text style={styles.loadMoreBtnTitle}>{t('homeTab')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
    purchaseInfoView: {
        width: width,

    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        color: Colors.BLACK
    },
    loadMoreBtn: {
        width: 200,
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#ffdd00',
        marginVertical: 10,
        alignSelf: 'center'
    },
    loadMoreBtnTitle: {
        fontSize: 14,
        textAlign: 'center'
    }
});