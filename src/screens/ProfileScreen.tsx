import React from 'react';
import { useTranslation } from 'react-i18next';
import {Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {useAuth} from '../Context/Context';
import {navigate} from '../navigation/Navigation';
import {Images} from '../utils/Images';

const ProfileScreen = () => {
    const { isAuthorized, user, handleSignOut } = useAuth();
    const {t} = useTranslation();
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ backgroundColor: '#000', padding: 20 }}>
          <View style={styles.searchView}>
            <Image source={Images.SEARCH_BLACK} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              selectionColor='#000'
              placeholder= {`${t('search')}...`}
              placeholderTextColor='#000'
              onFocus={() => navigate('Search')}
            />
          </View>
        </View>
        <View style={{ backgroundColor: '#000', paddingHorizontal: 20 }}>
          {isAuthorized ?
            <Text style={styles.title}>{t('yourID')}: {user?.id}</Text>
            :
            <>
              <Text style={styles.title}>{t('notAuthorized')} </Text>
              <TouchableOpacity style={styles.signInBtn} onPress={() => navigate('SignIn')}>
                <Text style={styles.btnTitle}>{t('signIn')}</Text>
              </TouchableOpacity>
            </>
          }
        </View>
        {
          isAuthorized &&
          <TouchableOpacity style={styles.navBtn} onPress={()=> navigate('OrderHistory')}>
            <Text style={styles.navBtnTitle}>{t('orderHistory')}</Text>
            <Image source={Images.ARROW_LEFT} style={styles.arrowIcon} />
          </TouchableOpacity>
        }
        {/*unauthorized*/}
        <TouchableOpacity style={styles.navBtn} onPress={() => navigate('Checkout', {screen : "WishList"})}>
          <Text style={styles.navBtnTitle}>{t('favorites')} (0)</Text>
          <Image source={Images.ARROW_LEFT} style={styles.arrowIcon} />
        </TouchableOpacity>
        {
          isAuthorized &&
          <TouchableOpacity style={styles.navBtn} onPress={()=>navigate('Address')}>
            <Text style={styles.navBtnTitle}>{t('deliveryAddress')}</Text>
            <Image source={Images.ARROW_LEFT} style={styles.arrowIcon} />
          </TouchableOpacity>
        }
        <TouchableOpacity style={styles.navBtn} onPress={()=> navigate('ChooseLanguage')}>
          <Text style={styles.navBtnTitle}>{t('chooseLanguage')}</Text>
          <Image source={Images.ARROW_LEFT} style={styles.arrowIcon} />
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.navBtn} onPress={() => navigate('Support')}>
          <Text style={styles.navBtnTitle}>{t('support')}</Text>
          <Image source={Images.ARROW_LEFT} style={styles.arrowIcon} />
        </TouchableOpacity>
        {
          isAuthorized &&
          <TouchableOpacity style={styles.navBtn} onPress={handleSignOut}>
            <Text style={styles.navBtnTitle}>{t('signOut')}</Text>
            <Image source={Images.ARROW_LEFT} style={styles.arrowIcon} />
          </TouchableOpacity>
        }
      </SafeAreaView>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    searchView: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      paddingHorizontal: 10,
    },
    searchInput: {
      width: '100%',
      paddingHorizontal: 10,
    },
    searchIcon: {
      width: 18,
      height: 19
    },
    title: {
      color: '#FFFFFF',
      fontSize: 16
    },
    signInBtn: {
      backgroundColor: '#ffdd00',
      marginVertical: 30,
      padding: 20,
    },
    btnTitle: {
      fontSize: 18,
      color: '#000',
      textAlign: 'center'
    },
    navBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#000',
      padding: 20,
      borderBottomColor: '#cfcfcf',
      borderBottomWidth: 0.5
    },
    navBtnTitle: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    arrowIcon: {
      width: 14,
      height: 14
    }
  })