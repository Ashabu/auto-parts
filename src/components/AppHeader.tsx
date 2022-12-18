import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { goBack, navigate } from '../navigation/Navigation';
import { Colors } from '../utils/AppColors';
import { Images } from '../utils/Images';

interface IHeaderProps {
    hasBack?: boolean
    hasSearch?: boolean
}

const AppHeader: React.FC<IHeaderProps> = ({ hasBack, hasSearch = true }) => {
    const { t } = useTranslation();
    return (
        <View style={styles.headerWrap}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goBack()} disabled={hasBack == false} style={{ minWidth: 30 }}>
                    {hasBack && <Image source={Images.BACK_ARROW_WHITE} style={{ width: 15, height: 15 }} />}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Home', { screen: 'HomeS' })}>
                    <Image source={Images.APP_LOGO} resizeMode='contain' style={{ width: 132, height: 29 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('AddCar')}>
                    <Image source={Images.ADD_CAR} style={{ width: 46, height: 40 }} />
                </TouchableOpacity>
            </View>
            {
                hasSearch &&
                <TouchableOpacity style={styles.searchInput} onPress={() => navigate('Search')}>
                    <Image source={Images.SEARCH_BLACK} style={{ width: 15, height: 15, marginRight: 15 }} />
                    <Text style={styles.placeHolderText}>{t('searchCarParts')}</Text>
                </TouchableOpacity>
            }
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