import React from 'react'
import { Button, SafeAreaView, Text, View, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { navigate } from '../../navigation/Navigation';
import { Images } from '../../utils/Images';

const UnauthorizedProfile = () => {
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
        <Text style={styles.title}>You Are Not Authorized </Text>
        <TouchableOpacity style={styles.signInBtn}>
          <Text style={styles.btnTitle}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.navBtn}>
        <Text style={styles.navBtnTitle}>Favorites (0)</Text>
        <Image source={Images.ARROW_LEFT} style={styles.arrowIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navBtn}>
        <Text style={styles.navBtnTitle}>Choose Language</Text>
        <Image source={Images.ARROW_LEFT} style={styles.arrowIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navBtn}>
        <Text style={styles.navBtnTitle}>Support</Text>
        <Image source={Images.ARROW_LEFT} style={styles.arrowIcon} />
      </TouchableOpacity>


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
    backgroundColor: 'yellow',
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