import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, PermissionsAndroid, Alert, ActivityIndicator, Image, Keyboard } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { GetVehiclesByVin, GetLinkageTargets } from '../Api';
import callGoogleVisionAsync from '../Api/googleVisionService';
import SelectElement from '../components/SelectElement/SelectElement';
import { VIMLIST } from '../utils/VimList';
import { IGetVehiclesByVinResponse, IgGtLinkageTargetsResponse } from '../Api/types';
import SelectCarMaker from '../components/SelectCarMaker';
import SelectCarModel from '../components/SelectCarModel';
import SelectCarModification from '../components/SelectCarModification';
import SelectCarByVin from '../components/SelectCarByVin';
import { Colors } from '../utils/AppColors';
import { Images } from '../utils/Images';
import { navigate } from '../navigation/Navigation';
import { vehicleStore } from '../store/Store';
import MainCategories from './CategoriesScreens/MainCategories';

const AddCarScreen = () => {
    const saveVehicle = vehicleStore(state => state.saveVehicle)
    const [vin, setVin] = useState<string>('');
    //vehicles by vin
    const [searchByVinLoader, setSearchByVinLoader] = useState<boolean>(false);
    const [vehiclesByVin, setVehiclesByVinData] = useState<{
        manuId?: number,
        modelId?: number,
        carId?: number,
        vehicleTypeDescription?: string,
        carName?: string
    }[] | undefined>([]);
    const [showVehiclesByVin, setShowVehiclesByVin] = useState<boolean>(false);
    const [selectedCarByVin, setSelectedCarByVin] = useState<{
        manuId?: number,
        modelId?: number,
        carId?: number,
        vehicleTypeDescription?: string,
        carName?: string
    }[]>([])

    //vehicles by Car Maker
    const [searchByCarMakerLoader, setSearchCarMakerLoader] = useState<boolean>(false);
    const [vehiclesByCarMaker, setVehiclesByCarMaker] = useState<{
        id?: number,
        name?: string,
        count?: number
    }[] | undefined>([]);
    const [showVehiclesByCarMaker, setShowVehiclesByCarMaker] = useState<boolean>(false);
    const [selectedCarMaker, setSelectedCarMaker] = useState<{
        id?: number,
        name?: string,
        count?: number
    } | undefined>({})

    //vehicles by Car Model
    const [searchByCarModelLoader, setSearchCarModelLoader] = useState<boolean>(false);
    const [vehiclesByCarModel, setVehiclesByCarModel] = useState<{
        id?: number,
        name?: string,
        count?: number
    }[] | undefined>([]);
    const [showVehiclesByCarModel, setShowVehiclesByCarModel] = useState<boolean>(false);
    const [selectedCarModel, setSelectedCarModel] = useState<{
        id?: number,
        name?: string,
        count?: number
    } | undefined>({});

    const [searchByModelSeriesLoader, setSearchModelSeriesLoader] = useState<boolean>(false);
    const [vehiclesByModelSeries, setVehiclesByModelSeries] = useState<IgGtLinkageTargetsResponse["linkageTargets"]>([]);
    const [showVehiclesByModelSeries, setShowVehiclesByModelSeries] = useState<boolean>(false);
    const [selectedModelSeries, setSelectedModelSeries] = useState<{
        description?: string,
        linkageTargetId?: number,
        linkageTargetType?: string

    } | undefined>({});


    const onPress = () => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'cameraPermission',
                message: 'needAccesToCamera',
                buttonNegative: 'cancel',
                buttonPositive: 'ok',
            },
        ).then(granted => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                launchCamera({ mediaType: 'photo', includeBase64: true, quality: 0.5 }, async (media: any) => {
                    if (!!media && media.assets) {
                        const googleText = await callGoogleVisionAsync(media.assets[0].base64);
                        if (googleText.code == 403) {
                            Alert.alert(JSON.stringify(googleText.code), googleText.message);
                            return;
                        };
                        const matches = googleText?.text;
                        console.log('googleText ==>', googleText.text.trim());
                        if (matches) {
                            try {
                                const vmies = matches.match(/[A-HJ-NPR-Z0-9]{17}/);
                                console.log('>>>>>>>>>>>>', vmies);
                                for (let i = 0; i < VIMLIST.length; i++) {
                                    const index = vmies.findIndex((m: any) => m.startsWith(VIMLIST[i]));
                                    if (index >= 0) {
                                        console.log(vmies[index]);
                                        setVin(vmies[index]), () => {
                                        }
                                        return;
                                        //return matches[index];
                                    };
                                };
                            } catch (err) { console.log(err) }
                        };
                    };
                });
            };
        });
    };




    const handleGetVehiclesByVin = () => {
        if (!vin || vin == '') {
            return
        }
        setSearchByVinLoader(true);
        try {
            GetVehiclesByVin(vin).then(res => {
                console.log('by viiiin ===>' ,res.data.data.matchingModels?.array?.[0].modelName)
                if(res.data?.data?.matchingVehicles?.array) {
                    setVehiclesByVinData(res.data.data.matchingVehicles?.array);

                } else {
                    setVehiclesByVinData([{
                        vehicleTypeDescription: res.data.data.matchingManufacturers?.array?.[0]?.manuName + ','+res.data.data.matchingModels?.array?.[0].modelName,
                        manuId:res.data.data.matchingManufacturers?.array?.[0]?.manuId,
                        modelId: undefined
                    }]);
                    console.log(res.data.data.matchingManufacturers?.array)
                }
                // setVehiclesByVinData(res.data.data.matchingVehicles?.array);
                setShowVehiclesByVin(true);
                setSearchByVinLoader(false);

            }).catch(err => {
                setSearchByVinLoader(false);
                throw new Error(err)
            });
        } catch (err: any) {
            setSearchByVinLoader(false);
            console.log(JSON.parse(JSON.stringify(err.response.data)))
        };
    };

    const handleGetVehiclesByCarMaker = () => {
        let data = {
            includeMfrFacets: true
        };
        setSearchCarMakerLoader(true);
        try {
            GetLinkageTargets(data).then(res => {
                setVehiclesByCarMaker(res.data.mfrFacets?.counts);
                setShowVehiclesByCarMaker(true);
                setSearchCarMakerLoader(false);

            }).catch(err => {
                setSearchCarMakerLoader(false);
                throw new Error(err)
            });
        } catch (err: any) {
            setSearchCarMakerLoader(false);
            console.log(JSON.parse(JSON.stringify(err.response.data)))
        };
    };

    const handleGetVehiclesByCarModel = () => {
        let data = {
            includeVehicleModelSeriesFacets: true,
            mfrIds: selectedCarMaker?.id
        }
        setSearchCarModelLoader(true)
        try {
            GetLinkageTargets(data).then(res => {
                setVehiclesByCarModel(res.data.vehicleModelSeriesFacets?.counts);
                setShowVehiclesByCarModel(true);
                setSearchCarModelLoader(false)
            }).catch(err => {
                setSearchCarModelLoader(false)
                throw new Error(err)
            });
        } catch (err: any) {
            setSearchCarModelLoader(false)
            console.log(JSON.parse(JSON.stringify(err.response.data)))
        };
    };

    const handleGetVehiclesByModelSeries = () => {
        setSearchModelSeriesLoader(true);
        let data = {
            vehicleModelSeriesIds: selectedCarModel?.id,
            mfrIds: selectedCarMaker?.id
        }
        try {
            GetLinkageTargets(data).then(res => {
                console.log(res.data.linkageTargets);
                setVehiclesByModelSeries(res.data.linkageTargets);
                setShowVehiclesByModelSeries(true);
                setSearchModelSeriesLoader(false);
            }).catch(err => {
                throw new Error(err)
            });
        } catch (err: any) {
            setSearchModelSeriesLoader(false);
            console.log(JSON.parse(JSON.stringify(err.response.data)))
        };
    };

    const handleSelectCarByVin = ({ val, data }: { val: boolean, data: { manuId?: number, modelId?: number, carId?: number, vehicleTypeDescription?: string, carName?: string } }) => {
        setShowVehiclesByVin(val);
        saveVehicle({...data, isActive: true})
        setSelectedCarByVin(prev => {
            return [...prev, data]
        })
    }

    const handelSelectCarMaker = ({ val, data }: { val: boolean, data: { id?: number, name?: string, count?: number } }) => {
        setShowVehiclesByCarMaker(val);
        setSelectedCarMaker(data);
        setSelectedCarModel(undefined);
        setSelectedModelSeries(undefined);
    };

    const handelSelectCarModel = ({ val, data }: { val: boolean, data: { id?: number, name?: string, count?: number } }) => {
        setShowVehiclesByCarModel(val);
        setSelectedCarModel(data)
    };

    const handleSelectCarModification = ({ val, data }: { val: boolean, data: any }) => {
        setShowVehiclesByModelSeries(val);
        setSelectedModelSeries(data);
    };



    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            {showVehiclesByVin && <SelectCarByVin listData={vehiclesByVin} callBack={handleSelectCarByVin} />}
            {showVehiclesByCarMaker && <SelectCarMaker listData={vehiclesByCarMaker} callBack={handelSelectCarMaker} />}
            {showVehiclesByCarModel && <SelectCarModel listData={vehiclesByCarModel} callBack={handelSelectCarModel} />}
            {showVehiclesByModelSeries && <SelectCarModification listData={vehiclesByModelSeries} callBack={handleSelectCarModification} />}


            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.scanButton} onPress={onPress}>
                    <Text style={styles.labelText}>
                        Scan Vin
                    </Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.vinInput}
                    value={vin}
                    onChangeText={(text: string) => setVin(text)}
                    onBlur={() => { console.log('onBlur'); Keyboard.dismiss() }} />
            </View>
            <TouchableOpacity style={styles.searchButton} onPress={handleGetVehiclesByVin}>
                {
                    searchByVinLoader ?
                        <ActivityIndicator size='small' color='#000' />
                        :
                        <Text style={styles.labelText}>
                            Search
                        </Text>
                }
            </TouchableOpacity>
            <View>
                {selectedCarByVin?.map((el, index: number) => (
                    <Text key={index} style={{ fontSize: 20, paddingVertical: 5 }}>
                        {el.carName}
                    </Text>
                ))}

            </View>
            <View>
                <Text style={styles.addCarManuallyTitle}>Or Add Car Manually</Text>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.addCarManuallyButton} onPress={handleGetVehiclesByCarMaker}>
                        <View style={styles.paginationBox}>
                            <Text style={styles.indexNumber}>1</Text>
                        </View>
                        <View style={styles.labelBox}>
                            {
                                searchByCarMakerLoader ?
                                    <ActivityIndicator size='small' color='#000' />
                                    :
                                    selectedCarMaker?.name ?
                                        <Text style={styles.labelText}>{selectedCarMaker.name}</Text>
                                        :
                                        <Text style={styles.labelText}>Car Maker</Text>
                            }
                            {/* <Image source={Images.ARROW_RIGHT_BLACK} style={{ width: 6, height: 10 }} /> */}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.addCarManuallyButton} disabled={vehiclesByCarMaker!?.length > 0 ? false : true}
                        onPress={handleGetVehiclesByCarModel}>
                        <View style={[styles.paginationBox, { backgroundColor: vehiclesByCarMaker!?.length > 0 ? Colors.YELLOW : Colors.GREY_SECONDARY }]}>
                            <Text style={styles.indexNumber}>2</Text>
                        </View>
                        <View style={styles.labelBox}>
                            {
                                searchByCarModelLoader ?
                                    <ActivityIndicator size='small' color='#000' />
                                    :
                                    selectedCarModel?.name ?
                                        <Text style={styles.labelText}>{selectedCarModel.name}</Text>
                                        :
                                        <Text style={styles.labelText}>Model</Text>
                            }
                            {/* <Image source={Images.ARROW_RIGHT_BLACK} style={{ width: 6, height: 10 }} /> */}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addCarManuallyButton} disabled={vehiclesByCarModel!?.length > 0 ? false : true}
                        onPress={handleGetVehiclesByModelSeries}>
                        <View style={[styles.paginationBox, , { backgroundColor: vehiclesByCarModel!?.length > 0 ? Colors.YELLOW : Colors.GREY_SECONDARY }]}>
                            <Text style={styles.indexNumber}>3</Text>
                        </View>
                        <View style={styles.labelBox}>
                            {
                                searchByModelSeriesLoader ?
                                    <ActivityIndicator size='small' color='#000' />
                                    :
                                    selectedModelSeries?.description ?
                                        <Text style={styles.labelText}>{selectedModelSeries.description}</Text>
                                        :
                                        <Text style={styles.labelText}>Modification</Text>
                            }
                            {/* <Image source={Images.ARROW_RIGHT_BLACK} style={{ width: 6, height: 10 }} /> */}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <TouchableOpacity style={[styles.searchButton, {marginTop: 40}]} onPress={()=> 
                {
                    navigate('HomeS');
                    saveVehicle({...selectedModelSeries, currentSelected: true})
                }}>
                    <Text style={styles.labelText}>Search Products</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default AddCarScreen;

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        marginBottom: 20
    },
    vinInput: {
        minHeight: 52,
        flex: 1,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: Colors.GREY_SECONDARY,
        fontSize: 18,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    scanButton: {
        width: 150,
        minHeight: 52,
        backgroundColor: Colors.YELLOW,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center'
    },
    searchButton: {
        minHeight: 52,
        paddingVertical: 12,
        backgroundColor: Colors.YELLOW,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonTitle: {
        fontSize: 20,
        textAlign: 'center'
    },
    addCarManuallyTitle: {
        fontSize: 20,
        color: Colors.BLACK,
        marginVertical: 20,
        fontWeight: '500'
    },
    bottomContainer: {

    },
    addCarManuallyButton: {
        flexDirection: 'row',
        backgroundColor: Colors.WHITE,
        marginBottom: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.GREY_SECONDARY

    },
    paginationBox: {
        paddingHorizontal: 22,
        paddingVertical: 12,
        backgroundColor: Colors.YELLOW,
        borderTopLeftRadius: 9,
        borderBottomLeftRadius: 9,
    },
    indexNumber: {
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 28,
        color: Colors.BLACK
    },

    labelBox: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    labelText: {
        fontWeight: '400',
        fontSize: 20,
        lineHeight: 28,
        color: Colors.DARK_GREY
    }
});

