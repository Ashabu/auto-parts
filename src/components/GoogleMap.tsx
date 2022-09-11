import React, { useState, useEffect } from 'react';
import { StyleSheet, PermissionsAndroid, Button, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const GoogleMap = ({ sendData }: any) => {

    const [position, setPosition] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });

    useEffect(() => {
        try {
            Geolocation.getCurrentPosition((pos) => {
                const crd = pos.coords;
                console.log(pos)
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
        sendData(position)
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
            <Button title='Get Location' onPress={getCurLocation}></Button>
        </>
    );
};

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default GoogleMap;