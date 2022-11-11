import React, { useEffect } from 'react'
import { Text, View, FlatList, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { GetArticles } from '../Api';
import { vehicleStore } from '../store/Store';

const ProductDetail = ({ route }: any) => {
    const { linkageTargetId, linkageTargetType, carId, assemblyGroupNodeId } = route?.params?.data
    const {savedVehicles} = vehicleStore();
    console.log(route.params.data)
    const [articles, setArticles] = useState<any[]>([]);
    const handleProductsCategory = (type: string = 'GET_SINGLE_ARTICLE', assemblyGroupNodeId?: string) => {
        let data = {
            assemblyGroupNodeId: route?.params?.assemblyGroupNodeId,
            linkageTargetId: savedVehicles[0].linkageTargetId,
            linkageTargetType:  'P'
        }

        GetArticles(type, data).then(res => {
            setArticles(res.data.articles || []);
        }).catch(err => {
            console.log(JSON.stringify(err.response))
        })
    };

    useEffect(() => {
        if(assemblyGroupNodeId){ 
            console.log(assemblyGroupNodeId)
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
                        <Text style={{fontSize: 20, fontWeight: '700'}}>Brand: {item?.mfrName}</Text>
                        {
                            item?.oemNumbers.map((item: any, index: number) => (
                                <Text key={index}>{item.articleNumber}</Text>
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