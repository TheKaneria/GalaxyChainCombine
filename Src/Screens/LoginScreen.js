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

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showpass, setShowPass] = useState(false);
  const {Loginapi, login_loading} = useLoginContext();

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
              source={require('../Assets/Logo1.png')}
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
          backgroundColor: colors.themecolor1,
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
                marginVertical: '10%',
              }}>
              <Text
                style={{
                  fontFamily: 'NunitoSans_10pt-Bold',
                  color: colors.white,
                  fontSize: 25,
                  fontWeight: 'bold',
                }}>
                Welcome Galaxy Chains
              </Text>
            </View>

            <View
              style={{
                width: '95%',
                alignSelf: 'center',
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderRadius: 10,
                paddingVertical: '10%',
              }}>
              <View
                style={{
                  width: '90%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginBottom: '10%',
                }}>
                <Text
                  style={{
                    fontFamily: 'NunitoSans_10pt-ExtraBold',
                    color: colors.white,
                    marginLeft: 2,
                    fontSize: 16,
                    marginBottom: 5,
                    fontWeight: 'bold',
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
                    color={colors.themecolor1}
                    size={25}
                  />
                </View>
              </View>
              <TouchableOpacity
                // onPress={() => props.navigation.navigate('DashBoard')}
                onPress={() => Submit()}
                style={{
                  backgroundColor: colors.themecolor,
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
