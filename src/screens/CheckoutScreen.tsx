import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import AddressForm from '../components/AddressForm';
import CartItems from '../components/CartItems';
import PaymentMethod from '../components/PaymentMethod';
import { useAuth } from '../Context/Context';
import { useProduct } from '../Context/ProductsContext';
import { navigate } from '../navigation/Navigation';
import { Colors } from '../utils/AppColors';
import { Images } from '../utils/Images';

const { width } = Dimensions.get('screen');

const CheckoutScreen = ({ route }: any) => {
    const { t } = useTranslation();
    const { shoppingCart } = useProduct();
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
            {
                shoppingCart.length == 0 ?
                    <>
                        <View style={styles.container}>
                            <Image source={Images.FAVORITES_ICON} style={{ width: 82, height: 74, alignSelf: 'center' }} />
                            <Text style={styles.etitle}>
                                {'Cart Is Empty'}
                            </Text>
                            {/* <Text style={styles.subtitle}>
                                {t('wishListEmpty')}
                            </Text> */}
                        </View>
                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.button} onPress={() => navigate('Search')}>
                                <Text style={styles.buttonTitle}>{t('buy')}</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    :
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
                                <TouchableOpacity style={styles.loadMoreBtn} onPress={() => { handleResetSlide(); navigate('HomeS') }}>
                                    <Text style={styles.loadMoreBtnTitle}>{t('homeTab')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>}
        </SafeAreaView>
    );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 9,
        justifyContent: 'center'
    },
    footer: {
        flex: 1,
    },
    etitle: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginVertical: 10,
        color: Colors.BLACK
    },
    subtitle: {
        textAlign: 'center',
        color: Colors.BLACK
    },
    button: {
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: '#ffdd00',
        width: 180,
        alignSelf: 'center'
    },
    buttonTitle: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center'
    },
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