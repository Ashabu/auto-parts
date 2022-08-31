import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { navigate } from '../navigation/Navigation';
const SEARCH_ICON = require('./../../assets/images/search-icon-black.png');

const HomeScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{backgroundColor: '#000', padding: 20}}>
                    <View style={styles.searchView}>
                        <Image source={SEARCH_ICON} style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            selectionColor='#000'
                            placeholder='Search...'
                            placeholderTextColor='#000'
                            onFocus={()=>navigate('Search')}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.addCarButton}>
                    <Text style={styles.addCarTitle}>Add Car</Text>
                </TouchableOpacity>
                <Text>
                    Home Screen
                </Text>
            </ScrollView>

        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {

    },
    searchView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    searchInput: {
        width: '100%',
        paddingHorizontal: 10,
    },
    searchIcon: {
        width: 18,
        height: 19
    },
    addCarButton: {
        backgroundColor: '#ffdd00',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addCarTitle: {
        fontSize: 20
    }
})