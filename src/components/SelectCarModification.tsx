import React, { FC, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { Colors } from '../utils/AppColors';
import { IgGtLinkageTargetsResponse } from '../Api/types';

interface ISelectCarModificationProps {
    listData?: IgGtLinkageTargetsResponse["linkageTargets"],
    callBack: ({ val, data }: any) => void
}


const SelectCarModification: FC<ISelectCarModificationProps> = ({ listData, callBack }) => {
    const [searchData, setSearchData] = useState<ISelectCarModificationProps["listData"] | undefined>(listData);

    const handleSearch = (value: string) => {
        if (value == '') {
            setSearchData(listData)
        } else {
            let tempListData = listData?.filter(el => el.description?.toLocaleLowerCase().match(value.toLocaleLowerCase()));
            setSearchData(tempListData);
        }
    }

    return (
        <View style={styles.selectWrapper}>
            <View >
                <TextInput
                    placeholder='Search...'
                    style={{ minHeight: 44, paddingVertical: 13, paddingHorizontal: 20, color: Colors.BLACK }}
                    onChangeText={(text: string) => handleSearch(text)}
                />
            </View>
            <FlatList
                keyboardShouldPersistTaps="always"
                data={searchData}
                initialNumToRender={20}
                renderItem={({ item }) =>
                    <TouchableOpacity style={styles.listItem} onPress={() => callBack({ val: false, data: item })}>
                        <Text style={styles.listItemText}>{item.description}</Text>
                        {item?.beginYearMonth && item?.endYearMonth && <Text style={styles.listItemText}>{`(${item?.beginYearMonth?.replace('-', '/')} - ${item?.endYearMonth?.replace('-', '/')})`}</Text>}
                    </TouchableOpacity>}
                keyExtractor={({ linkageTargetId }) => linkageTargetId!.toString()}
                onMomentumScrollBegin={() => Keyboard.dismiss()}
            />
        </View>
    );
};

export default SelectCarModification;

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