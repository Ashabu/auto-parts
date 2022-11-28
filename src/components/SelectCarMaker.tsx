import React, { FC, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { Colors } from '../utils/AppColors';

interface ISelectCarMakerProps {
    listData?: {
        id?: number,
        name?: string,
        count?: number
    }[],
    callBack: ({ val, data }: any) => void
}


const SelectCarMaker: FC<ISelectCarMakerProps> = ({ listData,callBack }) => {
    const [searchData, setSearchData] = useState<ISelectCarMakerProps["listData"] | undefined>(listData);

    const handleSearch = (value: string) => {
        if (value == '') {
            setSearchData(listData)
        } else {
            let tempListData = listData?.filter(el => el.name?.toLocaleLowerCase().match(value.toLocaleLowerCase()));
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
                        <Text style={styles.listItemText}>{item.name}</Text>
                        <Text style={styles.listItemText}>{`(${item.count})`}</Text>
                    </TouchableOpacity>}
                keyExtractor={({ id }) => id!.toString()}
                onMomentumScrollBegin={() => Keyboard.dismiss()}
            />
        </View>
    );
};

export default SelectCarMaker;

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