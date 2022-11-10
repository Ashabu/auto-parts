import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, Keyboard, View, Image, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { navigate } from '../navigation/Navigation';
import { searchItems } from '../Api';
import ProductList from '../components/ProductList';
import { Images } from '../utils/Images';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import {products}  from '../utils/PravusExel'

const SearchScreen = ({route}: any) => {

    const [searchValue, setSearchValue] = useState<string>('');
    const [curPage, setCurPage] = useState<number>(1);
    const [newProducts, setNewProducts] = useState<any[]>([]);
    const [fetchingData, setFetchingData] = useState<boolean>(false);
    const { t } = useTranslation();
    const InputRef = useRef<TextInput>(null);

    useEffect(() => {
        if(route?.params?.data !== undefined) {
            setSearchValue(route?.params?.data)
        }
    }, [route?.params?.data])


    // useFocusEffect(
    //     useCallback(() => {
           
    //     }, [InputRef.current])
    // );
    // console.log('InputRef', InputRef.current?.clear)
    useEffect(() => {
        InputRef.current?.focus();
        return () => InputRef.current?.clear();
    }, [InputRef.current])

    // useEffect(() => {
    //     handleSearchProducts();
    // }, [curPage]);

    // const handleSearchProducts = () => {
    //     if (!searchValue) return;
    //     setFetchingData(true)
    //     searchItems(searchValue, curPage).then(response => {
    //         setFetchingData(false);
    //         let response_data = response.data.map((el: any) => {
    //             el.item_count = 0;
    //             return el
    //         });
    //         if (curPage == 1) {
    //             setProducts(response_data)
    //         } else {
    //             setProducts(prev => {
    //                 return [...prev, ...response_data]
    //             });
    //         };
    //     }).catch((error: any) => {
    //         setFetchingData(false)
    //         console.log(JSON.stringify(error.response.data.message));
    //     });
    // };
    
    const handleSearchProducts = () => {
        if(!searchValue || searchValue == '') return;
        let tempProducts = products.filter(el => el.Name.toLowerCase().includes(searchValue) || el.OEM.includes(searchValue) || el.Brand.toLocaleLowerCase().includes(searchValue));
        setNewProducts(tempProducts)
    }

    const handleOnBlur = () => {
        Keyboard.dismiss();
        if(searchValue) {
            handleSearchProducts();
        }
    }

    return (

        <SafeAreaView style={{ flex: 1 }}>
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
                    autoFocus={true}
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
                        <ActivityIndicator size={'large'} color='#ffdd00' style={{ alignSelf: 'center' }} />
            }
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
        backgroundColor: '#ffdd00',
        marginVertical: 10,
        alignSelf: 'center'
    },
    loadMoreBtnTitle: {
        fontSize: 14,
        textAlign: 'center'
    }
})