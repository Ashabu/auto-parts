import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { navigate } from '../navigation/Navigation';
import { Colors } from '../utils/AppColors';
import { Images } from '../utils/Images';

const ProductList = ({ product }: any) => {
    const { Name,  RetilePRiceOFPremix  } = product;

    const handleProductPress = () => {
        navigate("ProductDetails", {
            item: product
        });
    };

    return (
        <TouchableOpacity style={styles.productWrap} onPress={handleProductPress}>
            <Image source={Images.NO_IMAGE} style={{ width: 100, height: 100, resizeMode: 'cover' }} />
            <View style={styles.productRight}>
                <Text style={styles.title} >
                    {Name}
                </Text>
                <Text style={styles.price}>
                    ${RetilePRiceOFPremix}
                </Text>
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
        fontSize: 16,
        marginBottom: 10,
        color: Colors.BLACK
    },
    price: {
        fontSize: 20,
        color: Colors.BLACK
    }
})