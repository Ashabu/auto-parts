import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, NativeScrollEvent, Dimensions, Image } from 'react-native';
import { navigate } from '../navigation/Navigation';
import { storeData } from '../services/StorageService';
import { Images } from '../utils/Images';
import {useCartItems} from '../Context/useProducts';

const ProductDetailScreen = ({ route }: any) => {
    const { stock_quantity, name, price } = route.params.item;
    // const { cartItems, handleAddItem } = useCart()
    const {cartItems, handleAddItem} = useCartItems();
    const carouselRef = useRef<ScrollView>(null);
    const slideStyle = {
        width: Dimensions.get('screen').width,
    };
    const [activeTab, setActiveTab] = useState<number>(0);

    const data = [
        {
            title: '',
        },
        {
            title: '',
        },
        {
            title: '',
        },
    ]

    const onChange = (nativeEvent: NativeScrollEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(
                nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
            );
            if (slide != activeTab) {
                setActiveTab(slide);
            };
        };
    };

    const handleMoveTab = (index: number) => {
        setActiveTab(index);
        console.log(carouselRef.current)


        carouselRef.current?.scrollTo({
            x: index * Dimensions.get('screen').width,
            animated: true,
        });
    };

    const handleAddItemToCheckout = () => {
        route.params.item.item_count++;
        handleAddItem( route.params.item)
    }

    const handleGoToCheckout = () => {
        if (stock_quantity > 0) {
            handleAddItemToCheckout()
                navigate('Checkout', {
                    screen: 'CheckoutS',
                });
        };
        return;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ height: 60 }}></View>
            <View style={{ flex: 3 }}>
                <View style={styles.infoBox}>
                    <Text>Mark</Text>
                    <Text> KYB</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text>OEM</Text>
                    <Text> A204321106</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>{name}</Text>
                    <Text style={styles.textStyle}>${price}</Text>
                </View>
            </View>
            <View style={{ flex: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={[styles.tabBtn, activeTab == 0 ? styles.btnActive : {}]}
                        onPress={() => handleMoveTab(0)} >
                        <Text style={styles.textStyle}>Description</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabBtn, activeTab == 1 ? styles.btnActive : {}]}
                        onPress={() => handleMoveTab(1)}>
                        <Text style={styles.textStyle}>Features</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabBtn, activeTab == 2 ? styles.btnActive : {}]}
                        onPress={() => handleMoveTab(2)}>
                        <Text style={styles.textStyle}>Reviews</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <ScrollView
                        ref={carouselRef}
                        onScroll={({ nativeEvent }) => onChange(nativeEvent)}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        horizontal
                        scrollEnabled>
                        {
                            data.map((item: any, index: number) => (
                                <View key={index} style={slideStyle}>
                                    <Text>{item.title}</Text>
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <TouchableOpacity>
                        <Image source={Images.FAVORITES_ICON} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleAddItemToCheckout}>
                        <Image source={Images.CART_GREY} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: stock_quantity > 0 ? '#ffdd00' : 'red' }]}
                    activeOpacity={1}
                    onPress={handleGoToCheckout}
                >
                    {
                        stock_quantity > 0 ?
                            <Text style={styles.actionBtnTitle}>BUY NOW</Text>
                            :
                            <Text style={styles.actionBtnTitle}>OUT OF STOCK</Text>
                    }
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoBox: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#CFCFCF',
        borderRadius: 5,
        marginVertical: 10
    },
    textStyle: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 2
    },
    tabBtn: {
        flex: 1,
        paddingVertical: 15,
        backgroundColor: '#CFCFCF'
    },
    btnActive: {
        borderBottomWidth: 2,
        borderBottomColor: '#ffdd00'
    },
    actionBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionBtnTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center'
    }

})