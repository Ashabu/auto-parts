import React, { useEffect, useRef, useState } from 'react';
import { Text, Keyboard, View, Image, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native';
import ProductList from '../components/ProductList';
import { Images } from '../utils/Images';
import { useTranslation } from 'react-i18next';
import {  useIsFocused } from '@react-navigation/native';
import { products } from '../utils/PravusExel'
import { useCategoriesStore } from '../store/Store';
import { Colors } from '../utils/AppColors';
import {useCar} from '../Context/CarsContext';

const SearchScreen = ({ route }: any) => {

    const [searchValue, setSearchValue] = useState<string>('');
    const [curPage, setCurPage] = useState<number>(1);
    const [newProducts, setNewProducts] = useState<any[]>([]);
    const [fetchingData, setFetchingData] = useState<boolean>(false);
    const { t } = useTranslation();
    const InputRef = useRef<TextInput>(null);
    const isFocused = useIsFocused();
    const { savedCars } = useCar();

    const { oemNumberArray } = useCategoriesStore();

    useEffect(() => {
        if (route?.params?.data !== undefined) {
            setSearchValue(route?.params?.data)
        }
    }, [route?.params?.data])

    useEffect(() => {
        if (isFocused) {
            searchByOemNumbers();
        }
    }, [isFocused])

    
    useEffect(() => {
        InputRef.current?.focus();
        return () => InputRef.current?.clear();
    }, [InputRef.current])


    const searchByOemNumbers = () => {
        let tempProducts: any[] = []
        if (oemNumberArray.length > 0) {
            oemNumberArray.forEach(el => {
                let x = products.filter(item => item.OEM == el);
                if (x.length > 0) {
                    tempProducts = [...tempProducts, ...x]
                };
            });
        };
        setNewProducts(tempProducts);
    };





    const handleSearchProducts = () => {
        if (!searchValue || searchValue == '') return;
        let tempProducts = products.filter(el => 
            el.Name.toLowerCase().includes(searchValue) 
            || el.OEM.includes(searchValue) 
            || el.Brand.toLocaleLowerCase().includes(searchValue));
        setNewProducts(tempProducts)
    }

    const handleOnBlur = () => {
        Keyboard.dismiss();
        if (searchValue) {
            handleSearchProducts();
        }
    }

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.addCarButton} >
                    <Text style={styles.addCarTitle}>{savedCars?.[0]?.mfrName}, {savedCars?.[0]?.description?.split('(')[0]}</Text>
                </View>
            <KeyboardAvoidingView behavior='position'>
            <View style={styles.searchView}>
                <Image source={Images.SEARCH_BLACK} style={styles.searchIcon} />
                <TextInput
                    ref={InputRef}
                    style={styles.searchInput}
                    selectionColor='#000'
                    placeholder={`${t('searchProducts')}`}
                    placeholderTextColor='#000'
                    value={searchValue}
                    onChangeText={(text: string) => setSearchValue(text)}
                    onBlur={handleSearchProducts}
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.filterIconButton} onPress={handleOnBlur}>
                    <Image source={Images.FILTER_ICON} style={styles.filterIcon} />
                </TouchableOpacity>
            </View>
            {
                newProducts.length === 0 && !fetchingData ?
                    <Text style={{ textAlign: 'center' }}>{t('noProducts')}</Text>
                    :
                    newProducts.length !== 0 ?
                        <FlatList
                            onScroll={()=>Keyboard.dismiss()}
                            data={newProducts}
                            renderItem={({ item }) => <ProductList product={item} />}
                            keyExtractor={(item) => item.Code}
                        // commented out till connected back to API Call
                        // ListFooterComponent={() =>
                        //     <TouchableOpacity style={styles.loadMoreBtn} onPress={() => setCurPage(prev => prev + 1)}>
                        //         {
                        //             fetchingData ?
                        //                 <ActivityIndicator size={'small'} color='#FFFFFF' />
                        //                 :
                        //                 <Text style={styles.loadMoreBtnTitle}>More</Text>
                        //         }
                        //     </TouchableOpacity>
                        // }
                        />
                        :
                        <ActivityIndicator size={'large'} color={Colors.YELLOW} style={{ alignSelf: 'center' }} />
            }
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({

    searchView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        paddingHorizontal: 10,
        margin: 20
    },
    searchInput: {
        width: '85%',
        paddingHorizontal: 10,
        minHeight: 48
    },
    searchIcon: {
        width: 18,
        height: 19
    },
    filterIcon: {
        width: 20,
        height: 15
    },
    filterIconButton: {
        borderLeftWidth: 1,
        borderLeftColor: '#CFCFCF',
        padding: 5
    },
    loadMoreBtn: {
        width: 200,
        padding: 15,
        borderRadius: 5,
        backgroundColor: Colors.YELLOW,
        marginVertical: 10,
        alignSelf: 'center'
    },
    loadMoreBtnTitle: {
        fontSize: 14,
        textAlign: 'center'
    },
    addCarButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.YELLOW,
        paddingVertical: 10,
        paddingHorizontal: 20

    },
    addCarTitle: {
        fontSize: 16
    },
})