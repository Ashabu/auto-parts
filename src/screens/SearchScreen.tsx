import React, { useEffect, useState } from 'react';
import { Text, Keyboard, View, Image, TextInput, SafeAreaView, StyleSheet, TouchableOpacity,  FlatList, ActivityIndicator } from 'react-native';
import { navigate } from '../navigation/Navigation';
import { searchItems } from '../Api';
import ProductList from '../components/ProductList';
import { Images } from '../utils/Images';


const SearchScreen = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [curPage, setCurPage] = useState<number>(1);
    const [products, setProducts] = useState<any[]>([]);
    const [fetchingData, setFetchingData] = useState<boolean>(false);


    useEffect(() => {
        handleSearchProducts();
    }, [curPage]);

    const handleSearchProducts = () => {
        if (!searchValue) return;
        setFetchingData(true)
        searchItems(searchValue, curPage).then(response => {
            setFetchingData(false);
            if (curPage == 1) {
                setProducts(response.data)
            } else {
                setProducts(prev => {
                    return [...prev, ...response.data]
                });
            };
        }).catch((error: any) => {
            setFetchingData(false)
            console.log(JSON.parse(JSON.stringify(error.response.data.message)));
        });
    };

    const handleOnBlur = () => {
        Keyboard.dismiss();
        setCurPage(prev => prev + 1)
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            <View style={styles.searchView}>
                <Image source={Images.SEARCH_BLACK} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    selectionColor='#000'
                    placeholder='Search Product By Name'
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
                products.length === 0 && !fetchingData ?
                    <Text>No Products To Show</Text>
                    :
                    products.length !== 0 ?
                        <FlatList
                            data={products}
                            renderItem={({ item }) => <ProductList product={item} />}
                            keyExtractor={(item) => item.id}
                            ListFooterComponent={() =>
                                <TouchableOpacity style={styles.loadMoreBtn} onPress={() => setCurPage(prev => prev + 1)}>
                                    {
                                        fetchingData ?
                                            <ActivityIndicator size={'small'} color='#FFFFFF' />
                                            :
                                            <Text style={styles.loadMoreBtnTitle}>More</Text>
                                    }
                                </TouchableOpacity>
                            } 
                            />
                        :
                        <ActivityIndicator size={'large'} color='#ffdd00' />
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