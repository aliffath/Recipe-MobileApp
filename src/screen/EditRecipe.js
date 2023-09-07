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
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute, useNavigation} from '@react-navigation/native';
import {updateMenu, getDetailmenu} from '../storages/action/product';

const EditRecipe = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params;
  const {isLoading, isError, errorMessage, data} = useSelector(
    state => state.productReducer,
  );
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(data?.data?.category_id);
  const [inputData, setInputData] = useState({
    title: '',
    ingredients: '',
    category_id: '',
    image: '',
  });

  useEffect(() => {
    dispatch(getDetailmenu(id));
  }, []);

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

  const updateRecipe = async () => {
    try {
      let formData = new FormData();
      formData.append('title', inputData?.title);
      formData.append('ingredients', inputData?.ingredients);
      formData.append('category_id', inputData?.category_id);

      if (selectedImage && selectedImage.uri) {
        formData.append('image', {
          uri: selectedImage.uri,
          name: selectedImage.fileName,
          type: selectedImage.type,
        });
      } else if (inputData.image) {
        formData.append('image', {
          uri: inputData.image,
          name: selectedImage.fileName,
          type: selectedImage.type,
        });
      }

      await dispatch(updateMenu(formData, id));
      ToastAndroid.show('Berhasil memperbarui resep!', ToastAndroid.SHORT);

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

  useEffect(() => {
    if (data) {
      setInputData({
        title: data?.data?.title,
        ingredients: data?.data?.ingredients,
        category_id: data?.data?.category_id,
        image: data?.data?.image,
      });
    }
  }, [data]);

  const categoryOptions = [
    {label: 'Appetizer', value: '1'},
    {label: 'Main Course', value: '2'},
    {label: 'Dessert', value: '3'},
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
              Edit Your Recipe
            </Text>
          </View>
          <View>
            <View style={{marginHorizontal: 20}}>
              <TextInput
                onChangeText={value => onChangeInput('title', value)}
                value={inputData?.title}
                placeholder="Title"
                style={{
                  padding: 20,
                  paddingLeft: 15,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  fontFamily: 'Poppins-SemiBold',
                }}
              />
              <TextInput
                onChangeText={value => onChangeInput('ingredients', value)}
                value={inputData?.ingredients}
                placeholder="Ingredients"
                multiline={true}
                numberOfLines={6}
                style={{
                  paddingLeft: 15,
                  marginTop: 20,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  fontFamily: 'Poppins-SemiBold',
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
                  onChangeInput('category_id', itemValue);
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
                onPress={updateRecipe}
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
                  Update Recipe
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default EditRecipe;
