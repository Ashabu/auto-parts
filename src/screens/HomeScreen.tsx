import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import NotificationBox from '../components/NotificationBox';
import { useLang } from '../Context/Context';
import { navigate } from '../navigation/Navigation';
import { Colors } from '../utils/AppColors';
import { vehicleStore } from '../store/Store';
import SavedCardList from '../components/SavedCardList';


const HomeScreen = () => {
    const SavedVehicles = vehicleStore(state => state.savedVehicles);
    const { t, i18n } = useTranslation();
    const { lang } = useLang();
    const [isSelecting, setIsSelecting] = useState<boolean>(false);

    console.log('active Car', SavedVehicles[0]);

    useEffect(() => {
        i18n.changeLanguage(lang)
    }, [lang])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <NotificationBox notification='this is a astification' position='Bottom' timeOutTime={3000} /> */}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
               {SavedVehicles.length> 0 && 
                <TouchableOpacity style={styles.addCarButton} onPress={() => setIsSelecting(!isSelecting)}>
                    <Text style={styles.addCarTitle}>{SavedVehicles?.[0].mfrName}, {SavedVehicles?.[0].description.split('(')[0]}</Text>
                </TouchableOpacity>
                }
                {
                    SavedVehicles.length > 0 && isSelecting?
                        SavedVehicles.splice(1, SavedVehicles.length) .map((v, index) => (
                            <SavedCardList key={index} vehicle={v} callback = {() => setIsSelecting(false)}/>  
                        ))
                        :
                        <TouchableOpacity style={styles.addCarButton} onPress={() => navigate('AddCar')}>
                            <Text style={styles.addCarTitle}>{t("addCar")}</Text>
                            <Text style={styles.addCarTitle}>+</Text>
                        </TouchableOpacity>

                }

              
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
        backgroundColor: Colors.WHITE,
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