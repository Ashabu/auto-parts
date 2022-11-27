import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetArticles } from '../Api';
import { navigate } from '../navigation/Navigation';

const ProductsScreen = ({ route }: any) => {

  const [categories, setCategories] = useState<any[]>([]);



  const handleProductsCategory = (type: string, assemblyGroupNodeId?: string) => {
    let data = {
      assemblyGroupNodeId: assemblyGroupNodeId,
      linkageTargetId: route?.params?.data?.linkageTargetId !== undefined ? route?.params?.data?.linkageTargetId : route?.params?.data?.carId,
      linkageTargetType: route?.params?.data?.linkageTargetType !== undefined ? route?.params?.data?.linkageTargetType : 'P'
    }
    GetArticles(type, data).then(res => {
      setCategories(res.data.assemblyGroupFacets.counts)
    }).catch(err => {
      console.log(JSON.stringify(err.response))
    })
  }


  const handleProductsCategorys = (type: string = 'GET_SINGLE_ARTICLE', assemblyGroupNodeId?: string) => {
    let data = {
      assemblyGroupNodeId:assemblyGroupNodeId,
      linkageTargetId: route?.params?.data?.linkageTargetId !== undefined ? route?.params?.data?.linkageTargetId : route?.params?.data?.carId,
      linkageTargetType: route?.params?.data?.linkageTargetType !== undefined ? route?.params?.data?.linkageTargetType : 'P'
    }

    GetArticles(type, data).then(res => {
      let oemNumber;
     
      res.data.articles?.map((el, index) => {
        // if(el.oemNumbers[0].articleNumber !== undefined) {
        //   oemNumber = el.oemNumbers[0].articleNumber
        // }
        el.oemNumbers.map(item => {
          if(item.articleNumber) {
            oemNumber = item.articleNumber
          }
        })
      });
      navigate('Search', {
        data: oemNumber || ''
      })
      
    }).catch(err => {
      console.log(JSON.stringify(err.response))
    })
  };

  useEffect(() => {
    if (!route?.params?.data) {
      return;
    } else {
      handleProductsCategory('GET_CATEGORIES');
    }


  }, [route?.params?.data]);





  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      {categories.length > 0 ?
        <FlatList
          data={categories}
          contentContainerStyle={{ flexGrow: 1 }}
          numColumns={4}
          maxToRenderPerBatch={30}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={{ width: (Dimensions.get('screen').width - 40) / 4, height: (Dimensions.get('screen').width - 40) / 4, borderWidth: 1, borderColor: '#000', alignItems: 'center', justifyContent: 'center', margin: 5 }}
                onPress={() => handleProductsCategorys('GET_SINGLE_ARTICLE', item.assemblyGroupNodeId)
                  //   navigate('ProductDetail', {
                  //   data: {
                  //     assemblyGroupNodeId: item.assemblyGroupNodeId,
                  //     linkageTargetId: route?.params?.data?.linkageTargetId !== undefined ? route?.params?.data?.linkageTargetId :  route?.params?.data?.carId,
                  //     linkageTargetType: route?.params?.data?.linkageTargetType !== undefined ? route?.params?.data?.linkageTargetType : 'P'
                  //   }
                  // })
                }>
                <Text>{item.assemblyGroupName}</Text>
              </TouchableOpacity>

            )
          }
          }
          keyExtractor={({ assemblyGroupNodeId }) => assemblyGroupNodeId.toString()}
        />
        :
        <Text>No Results found</Text>
      }



    </SafeAreaView>
  )
}

export default ProductsScreen

// onPress={()=> navigate('Products', {
//   data: {
//           linkageTargetId: selectedModelSeries?.linkageTargetId,
//           linkageTargetType:  selectedModelSeries?.linkageTargetType,
//           carId: selectedCarByVin[0].carId
//   }
// })}>
// onPress={() => handleProductsCategory('GET_SINGLE_ARTICLE', item.assemblyGroupNodeId)}>