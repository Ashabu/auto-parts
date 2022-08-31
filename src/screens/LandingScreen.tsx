import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { useLang } from '../Context/Context';
import { navigate } from '../navigation/Navigation';
import { storeData } from '../services/StorageService';
import { Images } from '../utils/Images';






const LandingScreen = () => {

    const { handleSetLang } = useLang();

    const handleButtonPress = (lang: string) => {
        handleSetLang(lang);
        storeData("appLang", lang)
        navigate('onboarding');
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.langButton} onPress={() => handleButtonPress('en')}>
                <Image source={Images.FLAG_US} style={styles.flag} />
                <Text style={styles.title}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.langButton} onPress={() => handleButtonPress('ka')}>
                <Image source={Images.FLAG_GEO} style={styles.flag} />
                <Text style={styles.title}>ქართული</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.langButton} onPress={() => handleButtonPress('ru')}>
                <Image source={Images.FLAG_RU} style={styles.flag} />
                <Text style={styles.title}>Русский</Text>
            </TouchableOpacity>
        </SafeAreaView>
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