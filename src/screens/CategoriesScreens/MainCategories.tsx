import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GetParentCategories } from '../../Api';
import { navigate } from '../../navigation/Navigation';
import { useCategoriesStore } from '../../store/Store';
import { Colors } from '../../utils/AppColors';
import ProductDetailScreen from '../ProductDetailScreen';

const boxWidth = Dimensions.get('screen').width / 3;
const boxHeight = Dimensions.get('screen').height / 3;

const MainCategories = () => {

  const { categories, setCategories } = useCategoriesStore();
  const getCategories = () => {
    GetParentCategories(3820).then(res => {
      setCategories(res.data.data.array);
    }).catch(err => {
      console.log(JSON.stringify(err.response))
    })
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={styles.container}>
      {
        categories?.length > 0 && categories.splice(0, 11).map(el => (
          <TouchableOpacity style={styles.categoryBox} key={el.assemblyGroupNodeId} onPress = {() => navigate('ProductDetail', {data: {assemblyGroupNodeId: el.assemblyGroupNodeId}})}>
            <Text style={styles.categoryNameText}>{el.assemblyGroupName}</Text>
          </TouchableOpacity>
        ))
      }
       <TouchableOpacity style={styles.categoryBox} onPress={() => navigate('AllCategories')}>
            <Text style={styles.categoryNameText}>All Categories</Text>
          </TouchableOpacity>
    </View>
  );
};

export default MainCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap'
  },
  categoryBox: {
    width: boxWidth,
    height: boxWidth,
    borderWidth: 1,
    borderColor: Colors.BLACK,
    alignItems:'center',
    justifyContent: 'center'
  },
  categoryNameText: {
    fontSize: 14,
    fontWeight: 'bold'
  }
})