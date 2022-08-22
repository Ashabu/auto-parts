import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput,  TouchableOpacity, View } from 'react-native';

const HomeScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1}}>
                <View style={styles.searchView}>
                    <TextInput
                        style={styles.searchInput}
                        selectionColor = '#FFFFFF'
                        placeholder='Search...'
                        placeholderTextColor='#FFFFFF'
                    />
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
        height: 60,
        backgroundColor: '#000',
        alignItems: 'center'
    },
    searchInput: {
        width: '80%',
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 2,
        padding: 7
    },
    addCarButton: {
        backgroundColor: 'yellow',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addCarTitle: {
        fontSize: 20
    }
})