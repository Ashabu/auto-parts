import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { WooWorker } from '../api-ecommerce';
import NotificationBox from '../components/NotificationBox';
import { useLang } from '../Context/Context';
import { navigate } from '../navigation/Navigation';
import { Colors } from '../utils/AppColors';


const HomeScreen = () => {
    const {t, i18n} = useTranslation();
    const {lang} = useLang();

    useEffect(() => {
        i18n.changeLanguage(lang)
    }, [lang])

   
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NotificationBox notification='this is a astification' position='Bottom' timeOutTime={3000} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
               
                <TouchableOpacity style={styles.addCarButton} onPress={() => navigate('AddCar')}>
                    <Text style={styles.addCarTitle}>{t("addCar")}</Text>
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
        backgroundColor:Colors.WHITE,
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
        backgroundColor: Colors.YELLOW,
        padding: 20,

    },
    addCarTitle: {
        fontSize: 20
    }
})