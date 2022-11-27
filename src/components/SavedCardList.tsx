import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { vehicleStore } from '../store/Store';
import { Colors } from '../utils/AppColors';


interface ISavedCarList {
  vehicle: any,
  callback: ()=> void;
}
const SavedCardList:React.FC<ISavedCarList> = ({vehicle, callback}) => {
  const {mfrName, vehicleModelSeriesName, currentSelected, description, vehicleModelSeriesId} = vehicle;
  const {removeVehicle, setActiveVehicle} = vehicleStore()
  return (
    <View style={styles.listItem}>
      <View style={{flexDirection: 'row', alignItems:'center'}}>
        <TouchableOpacity style={styles.actionBtn} onPress={()=> {
          setActiveVehicle(vehicleModelSeriesId);
          callback();
        }}>
          <View style={[styles.circle, currentSelected && styles.active]} />
        </TouchableOpacity>
        <View>
          <Text style={styles.carName}>{mfrName}, {description.split('(')[0]}</Text>
        </View>
      </View>
      <TouchableOpacity style={[styles.actionBtn, {backgroundColor: Colors.RED}]} onPress={()=> removeVehicle(vehicleModelSeriesId)}>
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
})