import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNotificationDispatch } from '../Context/NotificationContext';
import { useProduct, useProductDispatch } from '../Context/ProductsContext';
import { navigate } from '../navigation/Navigation';
import { Colors } from '../utils/AppColors';
import { Images } from '../utils/Images';

const ProductList = ({ product, hideIcons = false, showBasket }: any) => {
    const { Name, RetilePRiceOFPremix } = product;
    const { shoppingCart, wishList } = useProduct();
    const notifyDispatch = useNotificationDispatch()

    const handleAddItem = (type: string, product: any) => {
        let tempCart = type == 'SHOPPING_CART' ? shoppingCart : wishList;
        let pIndex = tempCart.findIndex(p => p.ARticle == product.ARticle);
        pIndex < 0 ? tempCart.push({ ...product, count: 1 }) : tempCart[pIndex].count += 1;
        if (type == 'SHOPPING_CART') {
            if (showBasket) {
                let tempWishlist = tempCart.filter(p => p.ARticle !== product.ARticle);
                dispatch({ wishList: tempWishlist });
                notifyDispatch({message: 'Item Added To Wishlist'});

            }
            dispatch({ shoppingCart: tempCart });
            notifyDispatch({message: 'Item Added To Card'});
        } else {
            dispatch({ wishList: tempCart });
            notifyDispatch({message: 'Item Added To Wishlist'});
        };
    };

    const handleRemoveIcon = () => {
        let tempArray = showBasket ? wishList : shoppingCart;
        let tempItems = tempArray.filter(p => p.ARticle !== product.ARticle);
        if (showBasket) {
            dispatch({ wishList: tempItems })
        } else {
            dispatch({ shoppingCart: tempItems })
        }

    }



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
            {
                !hideIcons ?
                    <View style={styles.actionButtons}>
                        <TouchableOpacity onPress={() => handleAddItem('SHOPPING_CART', product)}>
                            <Image source={Images.CART_BLACK} style={{ width: 25, height: 25, marginVertical: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleAddItem('WISHLIST', product)}>
                            <Image source={Images.HEART_YELLOW} style={{ width: 25, height: 25, marginVertical: 5 }} />
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.actionButtons}>
                        {
                            showBasket &&
                            <TouchableOpacity onPress={() => handleAddItem('SHOPPING_CART', product)}>
                                <Image source={Images.CART_BLACK} style={{ width: 25, height: 25, marginVertical: 5 }} />
                            </TouchableOpacity>

                        }
                        <TouchableOpacity onPress={handleRemoveIcon}>
                            <Image source={require('./../../assets/images/delete-icon.png')} style={{ width: 25, height: 25, marginVertical: 5 }} />
                        </TouchableOpacity>
                    </View>


            }
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
        justifyContent: 'center',
        alignItems: 'center'
    }
})