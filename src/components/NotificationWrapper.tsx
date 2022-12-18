import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNotificationState } from '../Context/NotificationContext'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../utils/AppColors';

const NotificationWrapper = ({children}: any) => {
    const { message } = useNotificationState();
    return (
        <SafeAreaView style={styles.notifyView}>
            {
                message && 
                <View style={styles.notifyContainer}>
                <Text style={styles.notifyText}>
                    {message}
                </Text>
            </View>
            }
            {children}
        </SafeAreaView>
    )
}

export default NotificationWrapper

const styles = StyleSheet.create({
    notifyView: {
        flex: 1,
        
    },
    notifyContainer: {
        position: 'absolute',
        bottom: 170,
        zIndex: 9,
        alignSelf: 'center',
        width: '80%',
        padding: 15,
        borderColor: Colors.GREY,
        borderRadius: 7,
        backgroundColor: `${Colors.YELLOW}60`
    },

    notifyText: {
        textAlign: 'center',
        fontSize: 14,
        color: Colors.GREY,
        fontWeight: '500'
        
    }   
})