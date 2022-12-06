import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';
import { Images } from '../utils/Images';
import { navigate } from '../navigation/Navigation';
import { useTranslation } from 'react-i18next';
import CheckoutList from '../components/CheckoutList';
import { useProduct, useProductDispatch } from '../Context/ProductsContext';
import { Colors } from '../utils/AppColors';

const { width } = Dimensions.get('screen');

const WishListScreen = () => {
    const { t } = useTranslation()
    const { wishList } = useProduct();
    const dispatch = useProductDispatch();

    const handleBuyWishlist = () => {
        let tempWishlist = wishList;
        dispatch({ shoppingCart: tempWishlist, wishList: [] });
        <TouchableOpacity style={styles.button} onPress={() => navigate('Checkout', {screen: 'CheckoutS'})}>
            <Text style={styles.buttonTitle}>{t('buy')}</Text>
        </TouchableOpacity>
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                wishList.length == 0 ?
                    <>
                        <View style={styles.container}>
                            <Image source={Images.FAVORITES_ICON} style={{ width: 82, height: 74, alignSelf: 'center' }} />
                            <Text style={styles.title}>
                                {t('wishListEmpty')}
                            </Text>
                        </View>
                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.button} onPress={() => navigate('Search')}>
                                <Text style={styles.buttonTitle}>{t('buy')}</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    :
                    <>
                        <ScrollView contentContainerStyle={styles.cartItemsView}>
                            {
                                wishList?.map((item: any, index: number) => (
                                    <CheckoutList
                                        item={item}
                                        key={index}
                                        isCheckout
                                        isWishList />
                                ))
                            }
                            <View style={{ borderTopWidth: 1, borderTopColor: '#CFCFCF' }}>
                            </View>
                        </ScrollView>
                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.button} onPress={handleBuyWishlist}>
                                <Text style={styles.buttonTitle}>{t('buy')}</Text>
                            </TouchableOpacity>
                        </View>
                    </>

            }


        </SafeAreaView>
    );
};

export default WishListScreen;

const styles = StyleSheet.create({
    cartItemsView: {
        width: width,
    },
    container: {
        flex: 9,
        justifyContent: 'center'
    },
    footer: {
        flex: 1,
    },
    title: {
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
    }
})