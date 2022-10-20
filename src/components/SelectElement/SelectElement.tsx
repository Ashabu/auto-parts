import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SelectElementList from './SelectElementList';
let data = [
  {
    'manuId': 121,
    'modelId': 9003,
    'carId': 214,
    'vehicleTypeDescription': '1.4 TSI',
    'carName': 'VW PASSAT B7 (362) 1.4 TSI'
  },
  {
    'manuId': 121,
    'modelId': 9003,
    'carId': 269,
    'vehicleTypeDescription': '1.8 TSI',
    'carName': 'VW PASSAT B7 (362) 1.8 TSI'
  },
  {
    'manuId': 121,
    'modelId': 9003,
    'carId': 276,
    'vehicleTypeDescription': '2.0 TSI',
    'carName': 'VW PASSAT B7 (362) 2.0 TSI'
  },
  {
    'manuId': 121,
    'modelId': 9003,
    'carId': 293,
    'vehicleTypeDescription': '1.6 TDI',
    'carName': 'VW PASSAT B7 (362) 1.6 TDI'
  },
  {
    'manuId': 121,
    'modelId': 9003,
    'carId': 294,
    'vehicleTypeDescription': '2.0 TDI',
    'carName': 'VW PASSAT B7 (362) 2.0 TDI'
  },
  {
    'manuId': 121,
    'modelId': 9003,
    'carId': 295,
    'vehicleTypeDescription': '2.0 TDI 4motion',
    'carName': 'VW PASSAT B7 (362) 2.0 TDI 4motion'
  },
  {
    'manuId': 121,
    'modelId': 9003,
    'carId': 296,
    'vehicleTypeDescription': '2.0 TDI',
    'carName': 'VW PASSAT B7 (362) 2.0 TDI'
  },
  {
    'manuId': 121,
    'modelId': 9003,
    'carId': 315,
    'vehicleTypeDescription': '1.4 TSI EcoFuel',
    'carName': 'VW PASSAT B7 (362) 1.4 TSI EcoFuel'
  },
  {
    'manuId': 121,
    'modelId': 9004,
    'carId': 317,
    'vehicleTypeDescription': '1.4 TSI',
    'carName': 'VW PASSAT B7 Variant (365) 1.4 TSI'
  },
  {
    'manuId': 121,
    'modelId': 9004,
    'carId': 326,
    'vehicleTypeDescription': '1.8 TSI',
    'carName': 'VW PASSAT B7 Variant (365) 1.8 TSI'
  },
  {
    'manuId': 121,
    'modelId': 9004,
    'carId': 327,
    'vehicleTypeDescription': '1.6 TDI',
    'carName': 'VW PASSAT B7 Variant (365) 1.6 TDI'
  },
  {
    'manuId': 121,
    'modelId': 9004,
    'carId': 346,
    'vehicleTypeDescription': '2.0 TSI',
    'carName': 'VW PASSAT B7 Variant (365) 2.0 TSI'
  },
  {
    'manuId': 121,
    'modelId': 9004,
    'carId': 356,
    'vehicleTypeDescription': '2.0 TDI',
    'carName': 'VW PASSAT B7 Variant (365) 2.0 TDI'
  },
  {
    'manuId': 121,
    'modelId': 9004,
    'carId': 357,
    'vehicleTypeDescription': '2.0 TDI 4motion',
    'carName': 'VW PASSAT B7 Variant (365) 2.0 TDI 4motion'
  },
  {
    'manuId': 121,
    'modelId': 9004,
    'carId': 358,
    'vehicleTypeDescription': '2.0 TDI',
    'carName': 'VW PASSAT B7 Variant (365) 2.0 TDI'
  },
  {
    'manuId': 121,
    'modelId': 9004,
    'carId': 361,
    'vehicleTypeDescription': '1.4 TSI EcoFuel',
    'carName': 'VW PASSAT B7 Variant (365) 1.4 TSI EcoFuel'
  },
  {
    'manuId': 121,
    'modelId': 9003,
    'carId': 7027,
    'vehicleTypeDescription': '3.6 FSI 4motion',
    'carName': 'VW PASSAT B7 (362) 3.6 FSI 4motion'
  },
  {
    'manuId': 121,
    'modelId': 9004,
    'carId': 7033,
    'vehicleTypeDescription': '3.6 FSI 4motion',
    'carName': 'VW PASSAT B7 Variant (365) 3.6 FSI 4motion'
  },
  {
    'manuId': 121,
    'modelId': 9003,
    'carId': 10577,
    'vehicleTypeDescription': '1.4 TSI MultiFuel',
    'carName': 'VW PASSAT B7 (362) 1.4 TSI MultiFuel'
  },
  {
    'manuId': 121,
    'modelId': 9004,
    'carId': 10586,
    'vehicleTypeDescription': '1.4 TSI MultiFuel',
    'carName': 'VW PASSAT B7 Variant (365) 1.4 TSI MultiFuel'
  },
  {
    'manuId': 121,
    'modelId': 9003,
    'carId': 11228,
    'vehicleTypeDescription': '2.0 TDI',
    'carName': 'VW PASSAT B7 (362) 2.0 TDI'
  },
  {
    'manuId': 121,
    'modelId': 9004,
    'carId': 11233,
    'vehicleTypeDescription': '2.0 TDI',
    'carName': 'VW PASSAT B7 Variant (365) 2.0 TDI'
  },
  {
    'manuId': 121,
    'modelId': 9003,
    'carId': 12010,
    'vehicleTypeDescription': '1.8 TSI',
    'carName': 'VW PASSAT B7 (362) 1.8 TSI'
  },
  {
    'manuId': 121,
    'modelId': 9004,
    'carId': 12011,
    'vehicleTypeDescription': '1.8 TSI',
    'carName': 'VW PASSAT B7 Variant (365) 1.8 TSI'
  },
  {
    'manuId': 121,
    'modelId': 9004,
    'carId': 56871,
    'vehicleTypeDescription': '2.0 TDI',
    'carName': 'VW PASSAT B7 Variant (365) 2.0 TDI'
  }
]

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

export default SelectElement;

const styles = StyleSheet.create({
  selectWrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
    elevation: 10
  }
})