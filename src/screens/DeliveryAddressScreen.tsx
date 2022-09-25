import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../utils/AppColors';

const DeliveryAddressScreen = () => {
    const [edit, setEdit] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <View style={{ flex: 9}}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.infoRow}>
                        <Text style={[styles.textStyle, {fontWeight: '700'}]}>Город</Text>
                        <Text style={[styles.textStyle, {fontWeight: '400'}]}>Тбилиси</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.textStyle, {fontWeight: '700'}]}>Улица</Text>
                        <Text style={[styles.textStyle, {fontWeight: '400'}]}>Шалва Нуцубидзе</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.textStyle, {fontWeight: '700'}]}>Корпус</Text>
                        <Text style={[styles.textStyle, {fontWeight: '400'}]}>18</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.textStyle, {fontWeight: '700'}]}>Номер подъезда</Text>
                        <Text style={[styles.textStyle, {fontWeight: '400'}]}>2</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.textStyle, {fontWeight: '700'}]}>Квартира</Text>
                        <Text style={[styles.textStyle, {fontWeight: '400'}]}>14</Text>
                    </View>
                </ScrollView>
            </View>

            <View style={{ flex: 1, justifyContent: 'center' }}>
                <TouchableOpacity style={styles.button}>
                    {
                        edit ?
                            <Text style={styles.buttonTitle}>
                                Изменить адрес
                            </Text>
                            :
                            <Text style={styles.buttonTitle}>
                                Добавить адрес
                            </Text>
                    }
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

export default DeliveryAddressScreen;

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.YELLOW,
        borderRadius: 10,
        paddingVertical: 15
    },
    buttonTitle: {
        fontSize: 17,
        lineHeight: 23,
        color: Colors.BLACK,
        textAlign: 'center',
        fontFamily: 'OpenSans-Regular',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomColor: Colors.GREY_SECONDARY,
        borderBottomWidth: 1,
    },
    textStyle: {
        fontSize: 16,
        lineHeight: 22,
        color: Colors.BLACK,
        textAlign: 'center',
        fontFamily: 'OpenSans-Regular',
    },
    valueText: {
        fontWeight: '700',
    }
})