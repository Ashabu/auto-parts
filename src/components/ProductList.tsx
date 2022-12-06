import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useProductDispatch } from '../Context/ProductsContext';
import { navigate } from '../navigation/Navigation';
import { Colors } from '../utils/AppColors';
import { Images } from '../utils/Images';

const ProductList = ({ product }: any) => {
    const { Name, RetilePRiceOFPremix } = product;

    const handleProductPress = () => {
        navigate("ProductDetails", {
            item: product
        });
    };
    const dispatch = useProductDispatch();


    return (
        <TouchableOpacity style={styles.productWrap} onPress={handleProductPress}>
            <Image source={Images.NO_IMAGE} style={{ width: 60, height: 60, resizeMode: 'cover' }} />
            <View style={styles.productRight}>
                <Text style={styles.title} >
                    {Name}
                </Text>
                <Text style={styles.price}>
                    ${RetilePRiceOFPremix}
                </Text>
            </View>
            <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => dispatch({ shoppingCart: [{ ...product, count: 1 }] })}>
                    <Image source={Images.CART_BLACK} style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dispatch({ wishList: product })}>
                    <Image source={Images.HEART_YELLOW} style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default ProductList;

const styles = StyleSheet.create({
    productWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#CFCFCF',
    },
    productRight: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 14,
        marginBottom: 10,
        color: Colors.BLACK
    },
    price: {
        fontSize: 20,
        color: Colors.BLACK
    },
    actionButtons: {
        width: 60,
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})