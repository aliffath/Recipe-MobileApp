/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, StatusBar, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Search = () => {
  const [search, setSearch] = useState('');
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 30,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            backgroundColor: '#EFEFEF',
          }}>
          <Icon name="search" size={20} color="#8B8A8F" />
        </View>

        <TextInput
          value={search}
          onChangeText={text => setSearch(text)}
          style={{
            backgroundColor: '#EFEFEF',
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            flex: 1,
          }}
          placeholder="Search Here"
        />
      </View>
    </View>
  );
};

export default Search;
