import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface INotificationProps {
  notification?: string | undefined | null,
  position?: 'Top' | 'Bottom',
  timeOutTime: number
}


const NotificationBox: React.FC<INotificationProps> = ({ notification, position = 'Bottom', timeOutTime = 3000, }) => {
  const [message, setMessage] = useState<string | undefined>('');
  const messageTimeOut = useRef<any>(null);




  const handleMessage = () => {
    if (messageTimeOut.current) clearTimeout(messageTimeOut.current);
    setMessage(notification);
    messageTimeOut.current = setTimeout(() => {
      console.log('in timeout')
      setMessage('');
    }, timeOutTime)
  };

  useEffect(() => {
    handleMessage();

    return () => {
      clearTimeout(messageTimeOut.current)
    }
  }, [notification])

  return (
    message && 
    <View style={[styles.container, {top: position == 'Top'? 80 : undefined, bottom: position == 'Bottom'? 20 : undefined}]}>
      <View style={styles.box}>
        <Text style={styles.notifyText}>this is a notification</Text>
      </View>
    </View>
  );
};

export default NotificationBox;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    elevation: 999999999,
    left: 0,
    zIndex: 999999,
    width: '100%',
    paddingHorizontal: 20,
    
  },

  box: {
    backgroundColor: '#0000001c',
    borderRadius: 10

  },
  notifyText: {
    flex: 1,
    textAlign: 'center', 
    marginVertical: 10,
    fontSize: 16,
    color: '#FFFFFF'
    
  }
})