import React, { useState, useEffect } from 'react';
import { StyleSheet, PermissionsAndroid, Button, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const GoogleMap = ({ sendData }: any) => {

    const [position, setPosition] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });
    const [address, setAddress] = useState<string>('')

    useEffect(() => {
        try {
            Geolocation.getCurrentPosition((pos) => {
                const crd = pos.coords;
                console.log(pos)
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${crd.latitude},${crd.longitude}&key=AIzaSyAEcJIqCTZ_7yfBQZl0I6EzffHx8qzTyL0`).then(res => {
                    console.log('google maps cord response', res.data.results[0].formatted_address);
                    setAddress( res.data.results[0].formatted_address);
                }).catch((error: any) => {
                    console.log(error)
                });

                setPosition({
                    latitude: crd.latitude,
                    longitude: crd.longitude,
                    latitudeDelta: 0.0421,
                    longitudeDelta: 0.0421,
                });
            })

        } catch (err) {
            console.log(err);
        };
    }, []);
    const getCurLocation = () => {
        sendData(address)
    }
    return (
        <>
            <MapView
                style={styles.map}
                initialRegion={position}
                showsUserLocation={true}
                showsMyLocationButton={true}
                followsUserLocation={true}
                showsCompass={true}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}>
                <Marker
                    title='Yor are here'
                    //  description='This is a description'
                    coordinate={position} />
            </MapView>
            {/* <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyAEcJIqCTZ_7yfBQZl0I6EzffHx8qzTyL0',
        language: 'en',
      }}
    /> */}
            <View style={{width: 200, alignSelf: 'center'}}>
                <Button title='Send Location' onPress={getCurLocation}></Button>
            </View>

        </>
    );
};

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default GoogleMap;