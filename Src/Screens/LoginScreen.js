import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../Utils/colors';
import * as Animatable from 'react-native-animatable';
import Shimmer from 'react-native-shimmer';
import Toast from 'react-native-simple-toast';
import {useLoginContext} from '../Context/login_context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';

const DATA = [
  {
    id: '1',
    name: 'Galaxy Chains',
    url: 'https://theapplified.com/galaxychain/api/v1/',
    acc: 'application/x.galaxychain.v1+json',
  },
  {
    id: '2',
    name: 'Galaxy Conveyors',
    url: 'https://theapplified.com/galaxyconveyors/api/v1/',
    acc: 'application/x.galaxychain.v1+json',
  },
];

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showpass, setShowPass] = useState(false);
  const {Loginapi, login_loading} = useLoginContext();
  const [name, setName] = useState(DATA[0].name);
  const [selectedItem, setSelectedItem] = useState(DATA[0]);

  const email_validation =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const Submit = () => {
    if (email === '') {
      Toast.show('Enter Email ID..!!!');
    } else if (email_validation.test(email) === false) {
      Toast.show('Enter Valid Email ID..!!!');
    } else if (password === '') {
      Toast.show('Enter password..!!!');
    } else {
      const formdata = new FormData();
      formdata.append('email', email);
      formdata.append('password', password);

      Loginapi(formdata, props);
    }
  };

  useEffect(() => {
    // Set initial values in AsyncStorage
    AsyncStorage.setItem('id', DATA[0].id);
    AsyncStorage.setItem('url', DATA[0].url);
    AsyncStorage.setItem('acc', DATA[0].acc);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      <Animatable.View
        animation={'fadeInDownBig'}
        style={{
          flex: 2,
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Shimmer opacity={1} animationOpacity={0.3} duration={1500}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Image
              source={
                name === 'Galaxy Chains'
                  ? require('../Assets/Logo1.png')
                  : name === 'Galaxy Conveyors'
                  ? require('../Assets/LogoC1.png')
                  : require('../Assets/Logo1.png')
              }
              resizeMode="contain"
              style={{width: 250, height: 100}}
            />
          </View>
        </Shimmer>
      </Animatable.View>

      <Animatable.View
        animation={'fadeInUpBig'}
        style={{
          flex: 4,
          backgroundColor:
            name === 'Galaxy Chains'
              ? 'red'
              : name === 'Galaxy Conveyors'
              ? colors.themecolor2
              : 'red',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}>
        <KeyboardAvoidingView
          // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          behavior={Platform.OS === 'ios' ? 'position' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 70}
          style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View
              style={{
                width: '90%',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginVertical: '5%',
              }}>
              <Text
                style={{
                  fontFamily: 'NunitoSans_10pt-Bold',
                  color: colors.white,
                  fontSize: 22,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Welcome to {name ? name : 'Galaxy Chains'}
              </Text>
            </View>

            <View
              style={{
                width: '95%',
                alignSelf: 'center',
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderRadius: 10,
                paddingVertical: '10%',
                marginTop: '2%',
              }}>
              <View
                style={{
                  width: '95%',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    color: colors.white,
                    marginLeft: 5,
                    fontSize: 16,
                    marginBottom: 5,
                  }}>
                  {' '}
                  Company
                </Text>
                <Dropdown
                  style={{
                    height: 50,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    marginHorizontal: '2%',
                    marginBottom: '5%',
                  }}
                  placeholderStyle={{
                    paddingHorizontal: '3%',
                    color: colors.themecolor,
                    fontSize: 15,
                    fontFamily: 'NunitoSans_10pt-SemiBold',
                  }}
                  selectedTextStyle={{
                    color: colors.themecolor,
                    fontSize: 16,
                    fontFamily: 'NunitoSans_10pt-SemiBold',
                    paddingHorizontal: '3%',
                  }}
                  dropdownPosition="auto"
                  itemContainerStyle={{
                    backgroundColor: colors.whitesomke,
                    borderColor: colors.whitesomke,
                  }}
                  itemTextStyle={{
                    color: colors.themecolor,
                    fontFamily: 'NunitoSans_10pt-SemiBold',
                  }}
                  data={DATA}
                  maxHeight={300}
                  labelField="name"
                  value={selectedItem.id} // Set the selected value
                  valueField="id"
                  placeholder={'Select Mode'}
                  onChange={item => {
                    setName(item.name);
                    setSelectedItem(item); // Update state with the selected item
                    AsyncStorage.setItem('id', item.id);
                    AsyncStorage.setItem('url', item.url);
                    AsyncStorage.setItem('acc', item.acc);
                  }}
                />
              </View>

              <View
                style={{
                  width: '90%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginBottom: '5%',
                }}>
                <Text
                  style={{
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    color: colors.white,
                    marginLeft: 2,
                    fontSize: 16,
                    marginBottom: 5,
                  }}>
                  Email
                </Text>
                <TextInput
                  onChangeText={val => setEmail(val)}
                  placeholder="Enter Your Email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={{
                    backgroundColor: 'rgba(255,255,255,1)',
                    paddingLeft: 10,
                    borderRadius: 8,
                    fontFamily: 'NunitoSans_10pt-Regular',
                    fontSize: 16,
                    fontWeight: '800',
                    color: colors.themecolor,
                  }}
                />
              </View>

              <View
                style={{
                  width: '90%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    color: colors.white,
                    marginLeft: 2,
                    fontSize: 16,
                    marginBottom: 5,
                  }}>
                  Password
                </Text>
                <View
                  style={{
                    backgroundColor: 'rgba(255,255,255,1)',
                    borderRadius: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TextInput
                    onChangeText={val => setPassword(val)}
                    placeholder="Enter Your Password"
                    style={{
                      fontFamily: 'NunitoSans_10pt-Regular',
                      fontSize: 16,
                      marginHorizontal: '2%',
                      color: colors.themecolor,
                      fontWeight: '800',
                      width: '80%',
                    }}
                    secureTextEntry={!showpass}
                  />
                  <Ionicons
                    onPress={() => {
                      setShowPass(!showpass);
                    }}
                    name={showpass ? 'eye' : 'eye-off'}
                    style={{
                      marginHorizontal: '4%',
                    }}
                    color={
                      name === 'Galaxy Chains'
                        ? colors.themecolor1
                        : name === 'Galaxy Conveyors'
                        ? colors.themecolor2
                        : colors.themecolor1
                    }
                    size={25}
                  />
                </View>
              </View>
              <TouchableOpacity
                // onPress={() => props.navigation.navigate('DashBoard')}
                onPress={() => Submit()}
                style={{
                  backgroundColor:
                    name === 'Galaxy Chains'
                      ? colors.themecolor
                      : name === 'Galaxy Conveyors'
                      ? colors.themecolor2
                      : colors.themecolor,
                  width: 100,
                  marginTop: '10%',
                  alignItems: 'center',
                  alignSelf: 'center',
                  padding: 10,
                  elevation: 10,
                  borderRadius: 5,
                }}>
                {login_loading ? (
                  <ActivityIndicator color={colors.white} size="small" />
                ) : (
                  <Text
                    style={{
                      fontFamily: 'NunitoSans_10pt-Bold',
                      color: colors.white,
                    }}>
                    LOGIN
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Animatable.View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
