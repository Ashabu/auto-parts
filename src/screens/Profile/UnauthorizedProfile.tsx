import React from 'react'
import { Button, SafeAreaView, Text, View, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../Context/Context';
import { navigate } from '../../navigation/Navigation';
import { Images } from '../../utils/Images';

const UnauthorizedProfile = () => {
  const { isAuthorized, user, handleSignOut } = useAuth();
  console.log('user', user)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#000', padding: 20 }}>
        <View style={styles.searchView}>
          <Image source={Images.SEARCH_BLACK} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            selectionColor='#000'
            placeholder='Search...'
            placeholderTextColor='#000'
            onFocus={() => navigate('Search')}
          />
        </View>
      </View>
      <View style={{ backgroundColor: '#000', paddingHorizontal: 20 }}>
        {isAuthorized ?
          <Text style={styles.title}>Your ID: {user?.id}</Text>
          :
          <>
            <Text style={styles.title}>You Are Not Authorized </Text>
            <TouchableOpacity style={styles.signInBtn} onPress={() => navigate('Sign In')}>
              <Text style={styles.btnTitle}>Sign In</Text>
            </TouchableOpacity>
          </>
        }
      </View>
      {
        isAuthorized &&
        <TouchableOpacity style={styles.navBtn}>
          <Text style={styles.navBtnTitle}>Order History</Text>
          <Image source={Images.ARROW_LEFT} style={styles.arrowIcon} />
        </TouchableOpacity>
      }
      {/*unauthorized*/}
      <TouchableOpacity style={styles.navBtn}>
        <Text style={styles.navBtnTitle}>Favorites (0)</Text>
        <Image source={Images.ARROW_LEFT} style={styles.arrowIcon} />
      </TouchableOpacity>
      {
        isAuthorized &&
        <TouchableOpacity style={styles.navBtn}>
          <Text style={styles.navBtnTitle}>Delivery Address</Text>
          <Image source={Images.ARROW_LEFT} style={styles.arrowIcon} />
        </TouchableOpacity>
      }
      <TouchableOpacity style={styles.navBtn}>
        <Text style={styles.navBtnTitle}>Choose Language</Text>
        <Image source={Images.ARROW_LEFT} style={styles.arrowIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navBtn}>
        <Text style={styles.navBtnTitle}>Support</Text>
        <Image source={Images.ARROW_LEFT} style={styles.arrowIcon} />
      </TouchableOpacity>
      {
        isAuthorized &&
        <TouchableOpacity style={styles.navBtn} onPress={handleSignOut}>
          <Text style={styles.navBtnTitle}>Log Out</Text>
          <Image source={Images.ARROW_LEFT} style={styles.arrowIcon} />
        </TouchableOpacity>
      }
    </SafeAreaView>
  );
};

export default UnauthorizedProfile;

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
    fontSize: 18,
  },
  arrowIcon: {
    width: 14,
    height: 14
  }
})