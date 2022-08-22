import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const FLAG_US = require('./../../assets/images/flag-us.png');
const FLAG_GEO = require('./../../assets/images/flag-geo.png');
const FLAG_RU = require('./../../assets/images/flag-ru.png');


const LandingScreen = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.langButton}>
                <Image source={FLAG_US} style={styles.flag} />
                <Text style={styles.title}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.langButton}>
                <Image source={FLAG_GEO} style={styles.flag} />
                <Text style={styles.title}>ქართული</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.langButton}>
                <Image source={FLAG_RU} style={styles.flag} />
                <Text style={styles.title}>Русский</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LandingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    langButton: {
        width: 150,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10
    },
    flag: {
        width: 50,
        height: 31
    },
    title: {
        fontSize: 16
    }
})