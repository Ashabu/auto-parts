import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Images } from '../utils/Images';
import { useLang } from '../Context/Context';
import { navigate } from '../navigation/Navigation';
import { storeData } from '../services/StorageService';


interface ISelectLanguageProps {
    route?: string
}


const SelectLanguage: React.FC<ISelectLanguageProps> = ({ route }) => {
    const { handleSetLang, lang } = useLang();
    console.log('ISelectLanguageProps', lang)

    const Langs = [
        {
            id: 0,
            title: 'English',
            lang_key: 'en',
            icon: Images.FLAG_US
        },
        {
            id: 1,
            title: 'ქართული',
            lang_key: 'ka',
            icon: Images.FLAG_GEO
        },
        {
            id: 2,
            title: 'Русский',
            lang_key: 'ru',
            icon: Images.FLAG_RU
        }
    ]

    const handleButtonPress = (lang: string) => {
        handleSetLang(lang);
        if (route) {
            navigate(route);
        }

    };
    return (
        <View style={styles.container}>
            {
                Langs.map(el => (
                    <TouchableOpacity
                        style={{backgroundColor: el.lang_key == lang? '#ffdd004d' : undefined , width: '100%'}}
                        key={el.id}
                        onPress={() => handleButtonPress(el.lang_key)} >
                        <View style={styles.langButton}>
                            <Image source={el.icon} style={styles.flag} />
                            <Text style={styles.title}>{el.title}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
};

export default SelectLanguage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
       justifyContent: 'center'
    },
    langButton: {
        width: 150,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        marginVertical: 20,
        paddingVertical: 10
    },
    flag: {
        width: 50,
        height: 31
    },
    title: {
        fontSize: 16,
        marginLeft: 20,
        fontWeight: '700'
    }
})