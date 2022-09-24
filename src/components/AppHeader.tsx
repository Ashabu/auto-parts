import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { goBack, navigate } from '../navigation/Navigation';
import { Colors } from '../utils/AppColors';
import { Images } from '../utils/Images';

interface IHeaderProps {
    hasBack?: boolean
}

const AppHeader: React.FC<IHeaderProps> = ({ hasBack }) => {
    const {t} = useTranslation();
    return (
        <View style={styles.headerWrap}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goBack()} disabled={hasBack == false }>
                    <Image source={Images.BACK_ARROW_WHITE} style={{ width: 15, height: 15 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Home', { screen: 'HomeS' })}>
                    <Image source={Images.APP_LOGO} resizeMode='contain' style={{ width: 132, height: 29 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Home', { screen: 'HomeS' })}>
                    <Image source={Images.ADD_CAR} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Checkout', { screen: 'WishList' })}>
                    <Image source={Images.CART_GREY} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.searchInput} onPress={() => navigate('Search')}>
                <Image source={Images.SEARCH_BLACK} style={{ width: 15, height: 15, marginRight: 15 }} />
                    <Text style={styles.placeHolderText}>{t('searchCarParts')}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AppHeader;

const styles = StyleSheet.create({
    headerWrap: {
        backgroundColor: Colors.BLACK,
        padding: 20
    },
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        padding: 15,
        marginTop: 15
    },
    placeHolderText: {
       fontSize: 15
    },

})