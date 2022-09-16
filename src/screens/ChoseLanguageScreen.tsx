import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import SelectLanguage from '../components/SelectLanguage';

const ChoseLanguageScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <SelectLanguage/>
        </SafeAreaView>
    );
};

export default ChoseLanguageScreen;