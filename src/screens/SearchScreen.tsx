import React, { useState } from 'react';
import { Text, Keyboard, View, Image, TextInput, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { navigate } from '../navigation/Navigation';
const SEARCH_ICON = require('./../../assets/images/search-icon-black.png');
const FILTER_ICON = require('./../../assets/images/filter-icon.png')

const SearchScreen = () => {
    const [searchValue, setSearchValue] = useState<string>('');

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.searchView}>
                <Image source={SEARCH_ICON} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    selectionColor='#000'
                    placeholder='Search Product By Name'
                    placeholderTextColor='#000'
                    value={searchValue}
                    onChangeText={(text: string) => setSearchValue(text)}
                    onBlur={() => console.log('onblur')}
                    autoCapitalize="none"
                    autoFocus={true}
                />
                <TouchableOpacity style={styles.filterIconButton}>
                    <Image source={FILTER_ICON} style={styles.filterIcon} />
                </TouchableOpacity>
            </View>
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

    }
})