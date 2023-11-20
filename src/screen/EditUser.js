/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {updateProfile} from '../storages/action/auth';

const EditUser = () => {
  const navigation = useNavigation();
  const credential = useSelector(state => state.authReducer);
  const id = credential.data?.dataUser?.id;
  const {isLoading, isError, messageError, data} = useSelector(
    state => state.authReducer,
  );
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);

  const [inputData, setInputData] = useState({
    name: '',
    photo: '',
  });

  const cameraLaunch = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    await launchCamera(options, res => {
      if (res.assets && res.assets.length > 0) {
        setSelectedImage(res.assets[0]);
      }
    });
  };

  const galleryLaunch = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    await launchImageLibrary(options, res => {
      if (res.assets && res.assets.length > 0) {
        setSelectedImage(res.assets[0]);
      }
    });
  };

  const updateUser = async e => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append('name', inputData?.name);

      if (selectedImage && selectedImage.uri) {
        formData.append('photo', {
          uri: selectedImage.uri,
          name: selectedImage.fileName,
          type: selectedImage.type,
        });
      } else if (inputData.image) {
        formData.append('photo', {
          uri: inputData.photo,
          name: selectedImage.fileName,
          type: selectedImage.type,
        });
      }

      await dispatch(updateProfile(formData, id));
      ToastAndroid.show(
        'Berhasil memperbarui Profile,Silahkan Login Kembali',
        ToastAndroid.SHORT,
      );

      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    } catch (error) {
      console.log(error);
      if (isError) {
        ToastAndroid.show(messageError, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Terjadi kesalahan saat update.', ToastAndroid.SHORT);
      }
    }
  };

  const onChangeInput = (name, value) => {
    setInputData({...inputData, [name]: value});
  };

  return (
    <>
      <ScrollView>
        <View>
          <View style={{marginVertical: 30}}>
            <Text
              style={{
                fontSize: 25,
                fontFamily: 'Poppins-SemiBold',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#EFC81A',
              }}>
              Edit Your Profile
            </Text>
          </View>
          <View>
            <View style={{marginHorizontal: 20}}>
              <TextInput
                onChangeText={value => onChangeInput('name', value)}
                value={inputData?.name}
                placeholder="Name"
                style={{
                  paddingLeft: 15,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  fontFamily: 'Poppins-SemiBold',
                }}
              />

              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Text>Maks File 1MB</Text>
                {selectedImage && selectedImage.uri && (
                  <Image
                    resizeMode="cover"
                    style={{height: 200, width: 200}}
                    source={{uri: selectedImage.uri}}
                  />
                )}
                {!selectedImage && inputData.image && (
                  <Image
                    resizeMode="cover"
                    style={{height: 200, width: 200}}
                    source={{uri: inputData.image}}
                  />
                )}
              </View>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  onPress={() => cameraLaunch()}
                  style={{
                    backgroundColor: '#00E092',
                    padding: 10,
                    width: 100,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Poppins-Medium',
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Take Foto
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => galleryLaunch()}
                  style={{
                    backgroundColor: '#00E092',
                    padding: 10,
                    width: 100,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Poppins-Medium',
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Gallery
                  </Text>
                </TouchableOpacity>
              </View>

              {isLoading && <ActivityIndicator size="large" color="#EFC81A" />}
              <TouchableOpacity
                onPress={updateUser}
                style={{
                  borderRadius: 10,
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    padding: 15,
                    textAlign: 'center',
                    fontFamily: 'Poppins-Bold',
                    color: 'white',
                    backgroundColor: '#EFC81A',
                    borderRadius: 10,
                    fontWeight: 'bold',
                  }}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default EditUser;
