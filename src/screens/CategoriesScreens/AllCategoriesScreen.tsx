import React from 'react'
import {Text, View, FlatList, TouchableOpacity, TextInput, Keyboard, StyleSheet} from 'react-native';
import { useCategoriesStore } from '../../store/Store';
import {useState} from 'react';
import {IGetMainCategoriesResponse} from '../../Api/types';
import {Colors} from '../../utils/AppColors';

const AllCategoriesScreen = () => {
  const {categories} = useCategoriesStore() 
  const [searchData, setSearchData] = useState<IGetMainCategoriesResponse["data"]["array"] | undefined>(categories);
  
  const handleSearch = (value: string) => {
    if (value == '') {
        setSearchData(categories)
    } else {
        let tempListData = categories?.filter(el => el.assemblyGroupName?.toLocaleLowerCase().match(value.toLocaleLowerCase()));
        setSearchData(tempListData);
    }
}

  return (
    <View style={styles.selectWrapper}>
      <View >
        <TextInput
          placeholder='Search...'
          style={{ minHeight: 44, paddingVertical: 13, paddingHorizontal: 20 }}
          onChangeText={(text: string) => handleSearch(text)}
        />
      </View>
      <FlatList
        keyboardShouldPersistTaps="always"
        data={searchData}
        initialNumToRender={20}
        renderItem={({ item }) =>
          <TouchableOpacity style={styles.listItem} >
            <Text style={styles.listItemText}>{item.assemblyGroupName}</Text>
          </TouchableOpacity>}
        keyExtractor={({ assemblyGroupNodeId }) => assemblyGroupNodeId!.toString()}
        onMomentumScrollBegin={() => Keyboard.dismiss()}
      />
    </View>
  );
};

export default AllCategoriesScreen;


const styles = StyleSheet.create({
  selectWrapper: {
      flex: 1,
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