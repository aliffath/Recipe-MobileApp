/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {postRegister} from '../storages/action/auth';
const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {isLoading, isError, isSuccess, messageError} = useSelector(
    state => state.authReducer,
  );

  const handleRegister = async event => {
    event.preventDefault();
    dispatch(postRegister(name, email, password));

    if (isError) {
      ToastAndroid.showWithGravityAndOffset(
        messageError,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (isSuccess) {
      ToastAndroid.showWithGravityAndOffset(
        'Registration successful!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View style={styles.imgWrap}>
        <Image source={require('../assets/logo.png')} style={styles.imgstyle} />
      </View>
      <View style={styles.headerWrap}>
        <Text style={styles.welcome}>Welcome !</Text>
        <Text style={styles.textHead}>Register to Recipe App</Text>
      </View>

      <View style={styles.inputIcon}>
        <View style={styles.iconWrap}>
          <Icon name="user" size={25} color="#8B8A8F" />
        </View>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Enter Username"
          />
        </View>
      </View>

      <View style={styles.inputIcon}>
        <View style={styles.iconWrap}>
          <Icon name="envelope" size={25} color="#8B8A8F" />
        </View>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Enter Email"
          />
        </View>
      </View>

      <View style={styles.inputIcon}>
        <View style={styles.iconWrap}>
          <Icon name="lock" size={25} color="#8B8A8F" />
        </View>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Enter Password"
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={styles.forgotPass}>
        <Text>Forgot Password?</Text>
      </View>
      {isLoading && <ActivityIndicator size="large" color="#EFC81A" />}
      <TouchableOpacity style={styles.buttonWrap} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{marginTop: 20, marginRight: 20}}>
        <Text
          style={{textAlign: 'center'}}
          onPress={() => navigation.navigate('Login')}>
          Have an account? <Text style={{color: '#EFC81A'}}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imgWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  imgstyle: {
    height: 150,
    width: 150,
  },
  headerWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#EFC81A',
  },
  textHead: {
    fontSize: 17,
    color: '#C4C4C4',
  },
  inputIcon: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
  },
  iconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: '#F5F5F5',
  },
  inputWrap: {
    backgroundColor: '#F5F5F5',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    flex: 1,
  },
  forgotPass: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginHorizontal: 20,
    marginTop: 10,
    color: '#999999',
  },
  buttonWrap: {
    marginTop: 20,
    backgroundColor: '#EFC81A',
    paddingVertical: 12,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Register;
