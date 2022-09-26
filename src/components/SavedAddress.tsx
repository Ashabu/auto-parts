import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../utils/AppColors';

export interface IAddress {
    deliveryAddress?: string;
    phoneNumber?: string;
    receiverName?: string;
    postalCode?: string;
};

interface ISavedAddressProps {
    onPageMove: (value: number, width: number) => void;
    address: IAddress;
};

const { width } = Dimensions.get('screen');

const SavedAddress: React.FC<ISavedAddressProps> = ({ address, onPageMove }) => {
    const { t } = useTranslation();

    return (
        <View style={{ width: width, padding: 20 }}>
            {
                Object.keys(address).length > 0 &&
                <View style={{ flex: 9 }}>
                    <View style={styles.infoRow}>
                        <Text style={[styles.textStyle, { fontWeight: '700' }]}>{t('deliveryAddress')}</Text>
                        <Text style={[styles.textStyle, { fontWeight: '400' }]}>{address.deliveryAddress}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.textStyle, { fontWeight: '700' }]}>{t('phoneNumber')}</Text>
                        <Text style={[styles.textStyle, { fontWeight: '400' }]}>{address.phoneNumber}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.textStyle, { fontWeight: '700' }]}>{t('receiverName')}</Text>
                        <Text style={[styles.textStyle, { fontWeight: '400' }]}>{address.receiverName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={[styles.textStyle, { fontWeight: '700' }]}>{t('postalCode')}</Text>
                        <Text style={[styles.textStyle, { fontWeight: '400' }]}>{address.postalCode}</Text>
                    </View>
                </View>
            }
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.button} onPress={() => onPageMove(1, width)}>
                    {
                        Object.keys(address).length > 0 ?
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
        </View>
    );
};

export default SavedAddress;

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
    },
});