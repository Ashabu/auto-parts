import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { Colors } from '../../utils/AppColors';

const SelectElementList = ({data, displayName, onSelect}: any) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={()=> onSelect(data)}>
        <Text>{data[displayName]}</Text>
    </TouchableOpacity>
  );
};

export default SelectElementList;

const styles = StyleSheet.create({
  listItem : {
    borderWidth: 1,
    borderColor: Colors.YELLOW,
    borderRadius: 7,
    marginVertical: 5,
    padding: 10
  }
})