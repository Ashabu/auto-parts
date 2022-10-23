import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SelectElementList from './SelectElementList';


interface ISelectElementProps {
  showList: boolean,
  onSelect?: () => void,
  callBack?:({val, data}: any)=> void
  listData?: any[],
  displayName?: string,

}

const SelectElement: React.FC<ISelectElementProps> = ({ onSelect, showList, listData, displayName, callBack }) => {
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  useEffect(() => {
    if(showList == true) {
      setOpenSelect(true)
    } else {
      setOpenSelect(false)
    }
  }, [showList])
  const handleCloseSelect = (data: any) => {
    callBack!({
      val: false,
      data: data
    });
  }
  return (
    openSelect ?
      <View style={styles.selectWrapper}>
        <FlatList
          ListHeaderComponent={() =>
            <TouchableOpacity style={{ padding: 10 }} onPress={handleCloseSelect}>
              <Text>Close</Text>
            </TouchableOpacity>
          }
          data={listData}
          renderItem={({ item }) => <SelectElementList data={item} displayName={displayName} onSelect ={(item: any) => handleCloseSelect(item)}/>}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
      : 
      null
  );
};

export default React.memo(SelectElement);

const styles = StyleSheet.create({
  selectWrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
    elevation: 10
  }
})