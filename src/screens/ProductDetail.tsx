import React, { useEffect } from 'react'
import { Text, View, FlatList, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { GetArticles } from '../Api';
import {vehicleStore, useCategoriesStore} from '../store/Store';
import { Colors } from '../utils/AppColors';

const ProductDetail = ({ route }: any) => {
    const { linkageTargetId, linkageTargetType, carId, assemblyGroupNodeId } = route?.params?.data
    const {savedVehicles} = vehicleStore();
    const [articles, setArticles] = useState<any[]>([]);
    const {setOemNumbers} = useCategoriesStore();
    const handleProductsCategory = (type: string = 'GET_SINGLE_ARTICLE') => {
        let data = {
            assemblyGroupNodeId: assemblyGroupNodeId,
            linkageTargetId: savedVehicles[0].linkageTargetId,
            linkageTargetType:  'P'
        }

        GetArticles(type, data).then(res => {
            const response = res.data.articles;
            let oemNumbers: any[] = [];
            response?.map(el => {
                el.oemNumbers.map(item => {
                    if(item.articleNumber){
                        oemNumbers.push(item.articleNumber)
                    };
                });
            });
            let uniqueOemNumbers = [... new Set(oemNumbers)]
            setOemNumbers(uniqueOemNumbers || []);
            setArticles(res.data.articles || []);
        }).catch(err => {
            console.log(JSON.stringify(err.response))
        })
    };

    useEffect(() => {
        if(assemblyGroupNodeId){ 
            handleProductsCategory()
        }
    
    }, [assemblyGroupNodeId])
    return (
        <SafeAreaView>
            <FlatList
                data={articles}
                contentContainerStyle={{ flexGrow: 1 }}
                maxToRenderPerBatch={20}
                renderItem={({ item }) =>
                    <View style={{ borderWidth: 1, borderColor: '#000', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                        <Text style={{fontSize: 20, fontWeight: '700', color: Colors.BLACK}}>Brand: {item?.mfrName}</Text>
                        {
                            item?.oemNumbers.map((item: any, index: number) => (
                                <Text style={{color: Colors.BLACK}} key={index}>{item.articleNumber}</Text>
                            ))
                        }
                    </View>
                }
                keyExtractor={({ articleNumber }) => articleNumber.toString()}
            />
        </SafeAreaView>
    )
}

export default ProductDetail