import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../utils/AppColors';

const SavedCardList = () => {
  return (
    <View style={styles.listItem}>
      <View style={{flexDirection: 'row', alignItems:'center'}}>
        <TouchableOpacity style={styles.actionBtn}>
          <View style={styles.circle} />
        </TouchableOpacity>
        <View>
          <Text style={styles.carName}>Toyota Camry v2.0</Text>
        </View>
      </View>
      <TouchableOpacity style={[styles.actionBtn, {backgroundColor: Colors.RED}]}>
        <Text style={styles.deleteText}>-</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SavedCardList;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent:'space-between',
    borderColor: Colors.YELLOW,
    borderWidth: 1
  },
  actionBtn: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.YELLOW
  },
  active: {
    backgroundColor: Colors.YELLOW
  },
  carName: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10
  },
  deleteBtn: {

  },
  deleteText: {
    fontSize: 30
  }
})