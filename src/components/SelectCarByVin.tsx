import React, { FC, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { Colors } from '../utils/AppColors';

interface ISelectCarMakerProps {
    listData?: {
        manuId?: number,
        modelId?: number,
        carId?: number,
        vehicleTypeDescription?: string,
        carName?: string
    }[],
    callBack: ({ val, data }: any) => void
};


const SelectCarByVin: FC<ISelectCarMakerProps> = ({ listData, callBack }) => {
    console.log(listData?.map(item => {
        console.log(item)
    }))

    return (
        <View style={styles.selectWrapper}>
            <FlatList
                data={listData}
                initialNumToRender={20}
                renderItem={({ item }) =>
                    <TouchableOpacity style={styles.listItem} onPress={() => callBack({ val: false, data: item })}>
                        <Text style={styles.listItemText}>{item.carName}</Text>
                    </TouchableOpacity>}
                keyExtractor={(_, index) => index.toString()}

            />
        </View>
    );
};

export default SelectCarByVin;

const styles = StyleSheet.create({
    selectWrapper: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#FFFFFF',
        zIndex: 10,
        elevation: 10
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 13,
        paddingHorizontal: 20,
        borderBottomColor: Colors.DARK_GREY,
        borderBottomWidth: 1
    },
    listItemText: {
        color: Colors.BLACK,
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '400'
    }

})