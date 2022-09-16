import React from 'react';
import { SafeAreaView, StyleSheet} from 'react-native';
import SelectLanguage from '../components/SelectLanguage';


const LandingScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
           <SelectLanguage route='onboarding'/>
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
})