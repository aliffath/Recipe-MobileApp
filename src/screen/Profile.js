/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {logout} from '../storages/action/auth';

function Profile() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(false);

    dispatch(logout());

    navigation.navigate('Login');
  };
  return (
    <View style={{flex: 1, backgroundColor: '#EEC302'}}>
      <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
      <View
        style={{justifyContent: 'center', alignItems: 'center', flex: 1 / 2}}>
        <Image
          source={require('../assets/woman.jpg')}
          style={{width: 100, height: 100, borderRadius: 100 / 2}}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 10,
            color: 'white',
          }}>
          Women
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}>
        <View
          style={{marginHorizontal: 30, marginTop: 30, flexDirection: 'row'}}>
          <Icon name="user" size={20} color="#EEC302" />
          <Text style={{paddingLeft: 10}}>Edit Profile</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile')}
            style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
            <Icon name="chevron-right" size={20} color="#8B8A8F" />
          </TouchableOpacity>
        </View>

        <View
          style={{marginHorizontal: 30, marginTop: 30, flexDirection: 'row'}}>
          <Icon name="utensils" size={20} color="#EEC302" />
          <Text style={{paddingLeft: 10}}>My Recipe</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyRecipe')}
            style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
            <Icon name="chevron-right" size={20} color="#8B8A8F" />
          </TouchableOpacity>
        </View>

        <View
          style={{marginHorizontal: 30, marginTop: 30, flexDirection: 'row'}}>
          <Icon name="bookmark" size={20} color="#EEC302" />
          <Text style={{paddingLeft: 10}}>Saved Recipe</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SavedRecipe')}
            style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
            <Icon name="chevron-right" size={20} color="#8B8A8F" />
          </TouchableOpacity>
        </View>

        <View
          style={{marginHorizontal: 30, marginTop: 30, flexDirection: 'row'}}>
          <Icon name="thumbs-up" size={20} color="#EEC302" />
          <Text style={{paddingLeft: 10}}>Liked Recipe</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('LikedRecipe')}
            style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
            <Icon name="chevron-right" size={20} color="#8B8A8F" />
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              marginHorizontal: 30,
              marginTop: 150,
              backgroundColor: '#EFC81A',
              paddingVertical: 12,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 9,
              elevation: 3,
            }}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>Logout</Text>
            </TouchableOpacity>
          </View>
          {/* Konfirmasi Modal */}
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{flex: 1 / 2}}></View>
              <View
                style={{
                  padding: 20,
                  borderRadius: 10,
                }}>
                <Text style={{fontWeight: 'bold'}}>
                  Apakah Anda ingin logout?
                </Text>
                <Button title="Ya" onPress={handleLogout} />
                <Button title="Tidak" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
}

export default Profile;
