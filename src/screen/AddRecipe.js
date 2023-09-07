/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';

import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {postRecipe} from '../storages/action/product';

const AddRecipe = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {isLoading, isError, errorMessage} = useSelector(
    state => state.productReducer,
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [inputData, setInputData] = useState({
    title: '',
    ingredients: '',
    category_id: '1',
    photo_url: '',
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

  const addRecipe = async () => {
    try {
      let formData = new FormData();
      formData.append('title', inputData.title);
      formData.append('ingredients', inputData.ingredients);
      formData.append('category_id', inputData.category_id);
      if (selectedImage) {
        formData.append('image', {
          uri: selectedImage.uri,
          name: selectedImage.fileName,
          type: selectedImage.type,
        });
      }

      await dispatch(postRecipe(formData));

      ToastAndroid.show('Berhasil menambahkan resep!', ToastAndroid.SHORT);

      setTimeout(() => {
        navigation.navigate('MyRecipe');
      }, 2000);
    } catch (error) {
      console.log(error);
      if (isError) {
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(
          'Terjadi kesalahan saat menambahkan resep.',
          ToastAndroid.SHORT,
        );
      }
    }
  };

  const onChangeInput = (name, value) => {
    setInputData({...inputData, [name]: value});
  };

  const categoryOptions = [
    {label: 'Main course', value: '1'},
    {label: 'Desert', value: '2'},
    {label: 'Appetizer', value: '3'},
  ];
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
              Add Your Recipe
            </Text>
          </View>

          <View style={{marginHorizontal: 20}}>
            <TextInput
              onChangeText={value => onChangeInput('title', value)}
              value={inputData.title}
              placeholder="Title"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                fontFamily: 'Poppins-SemiBold',
              }}
            />
            <TextInput
              onChangeText={value => onChangeInput('ingredients', value)}
              value={inputData.ingredients}
              placeholder="Ingredients"
              multiline={true}
              numberOfLines={6}
              style={{
                marginTop: 20,
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                fontFamily: 'Poppins-SemiBold',
                fontSize: 17,
              }}
            />
            <Picker
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                marginTop: 20,

                fontFamily: 'Poppins-SemiBold',
              }}
              selectedValue={selectedOption}
              onValueChange={itemValue => {
                setSelectedOption(itemValue);
                setInputData({...inputData, category_id: itemValue});
              }}>
              {categoryOptions.map(option => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text>Maks File 1MB</Text>
              {selectedImage && (
                <Image
                  resizeMode="cover"
                  style={{height: 200, width: 200}}
                  source={{uri: selectedImage.uri}}
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
              onPress={addRecipe}
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
                Add Recipe
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default AddRecipe;
