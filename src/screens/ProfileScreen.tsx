import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../Context/Context';
import { navigate } from '../navigation/Navigation';
import { Colors } from '../utils/AppColors';
import { Images } from '../utils/Images';

const ProfileScreen = () => {
  const { isAuthorized, user, handleSignOut } = useAuth();
  const { t } = useTranslation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#1A1A1A', paddingTop: 15 }}>
        {isAuthorized ?
          <View style={{ paddingHorizontal: 20, paddingBottom: 15 }}>
            <Text style={styles.title}>{t('yourID')}: {user?.id}</Text>
          </View>
          :
          <View style={{ paddingHorizontal: 20, paddingBottom: 15 }}>
            <Text style={styles.title}>{t('notAuthorized')} </Text>
            <TouchableOpacity style={styles.signInBtn} onPress={() => navigate('SignIn')}>
              <Text style={styles.btnTitle}>{t('signIn')}</Text>
            </TouchableOpacity>
          </View>
        }

        {
          isAuthorized &&
          <TouchableOpacity style={styles.navBtn} onPress={() => navigate('OrderHistory')}>
            <Image source={Images.WALL_CLOCK} style={styles.iconStyle} />
            <Text style={styles.navBtnTitle}>{t('orderHistory')}</Text>
          </TouchableOpacity>
        }
        {/*unauthorized*/}
        <TouchableOpacity style={styles.navBtn} onPress={() => navigate('Checkout', { screen: "WishList" })}>
          <Image source={Images.HEART_YELLOW} style={styles.iconStyle} />
          <Text style={styles.navBtnTitle}>{t('favorites')} (0)</Text>
        </TouchableOpacity>
        {
          isAuthorized &&
          <TouchableOpacity style={styles.navBtn} onPress={() => navigate('Address')}>
            <Image source={Images.LOCATION_ICON} style={[styles.iconStyle, { height: 23 }]} />
            <Text style={styles.navBtnTitle}>{t('deliveryAddress')}</Text>
          </TouchableOpacity>
        }
        <TouchableOpacity style={styles.navBtn} onPress={() => navigate('ChooseLanguage')}>
          <Image source={Images.LANGUAGE_ICON} style={styles.iconStyle} />
          <Text style={styles.navBtnTitle}>{t('chooseLanguage')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navBtn} onPress={() => navigate('Support')}>
          <Image source={Images.TECH_SUPPORT} style={styles.iconStyle} />
          <Text style={styles.navBtnTitle}>{t('support')}</Text>
        </TouchableOpacity>
        {
          isAuthorized &&
          <TouchableOpacity style={styles.navBtn} onPress={handleSignOut}>
            <Image source={Images.LOGOUT_ICON} style={styles.iconStyle} />
            <Text style={styles.navBtnTitle}>{t('signOut')}</Text>
          </TouchableOpacity>
        }
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  title: {
    color: Colors.WHITE,
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  signInBtn: {
    backgroundColor: Colors.YELLOW,
    marginVertical: 30,
    padding: 20,
  },
  btnTitle: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: Colors.DARK_GREY,
    borderBottomWidth: 1
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: 23
  },
  navBtnTitle: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: 'OpenSans-Regular'
  },

})