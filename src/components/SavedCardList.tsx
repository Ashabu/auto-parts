import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../utils/AppColors';

interface ISavedCarList {
  vehicle: any,
  callback: (id: number) => void;
  removeCar: (id: number) => void;
};

const SavedCardList: React.FC<ISavedCarList> = ({ vehicle, callback, removeCar }) => {
  const { mfrName, currentSelected, description, vehicleModelSeriesId } = vehicle;

  return (
    <View style={styles.listItem}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => callback(vehicleModelSeriesId)}>
          <View style={[styles.circle, currentSelected && styles.active]} />
        </TouchableOpacity>
        <View>
          <Text
            style={styles.carName}>{
              mfrName}, {description.split('(')[0]}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.actionBtn, { backgroundColor: Colors.RED }]}
        onPress={() => removeCar(vehicleModelSeriesId)}>
        <Text
          style={styles.deleteText}>
          -
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default SavedCardList;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 10,
    color: Colors.BLACK
  },
  deleteBtn: {

  },
  deleteText: {
    fontSize: 30
  }
});