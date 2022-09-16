import React, { useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { WooWorker } from '../api-ecommerce';
import NotificationBox from '../components/NotificationBox';
import { navigate } from '../navigation/Navigation';
const SEARCH_ICON = require('./../../assets/images/search-icon-black.png');

const HomeScreen = () => {


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NotificationBox notification='this is a astification' position='Bottom' timeOutTime={3000} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ backgroundColor: '#000', padding: 20 }}>
                    <View style={styles.searchView}>
                        <Image source={SEARCH_ICON} style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            selectionColor='#000'
                            placeholder='Search...'
                            placeholderTextColor='#000'
                            onFocus={() => navigate('Search')}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.addCarButton} onPress={() => navigate('AddCar')}>
                    <Text style={styles.addCarTitle}>Add Car</Text>
                    <Text style={styles.addCarTitle}>+</Text>
                </TouchableOpacity>

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffdd00',
        padding: 20,

    },
    addCarTitle: {
        fontSize: 20
    }
})