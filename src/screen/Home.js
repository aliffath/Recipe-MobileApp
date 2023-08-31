/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const login = useSelector(state => state.authReducer);
  const [getRecipe, setGetRecipe] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [popular, setPopular] = useState([
    {title: 'Orange La Pasta', image: require('../assets/3.png')},
    {title: 'Spicy Ramenyu', image: require('../assets/4.png')},
    {title: 'Lobster Toast', image: require('../assets/5.png')},
    {title: 'Dessert', image: require('../assets/4.png')},
    {title: 'Soup', image: require('../assets/4.png')},
  ]);

  useEffect(() => {
    fetchData();
  }, [searchQuery]);
  const fetchData = async () => {
    try {
      const getDataRecipe = await axios.get(
        'https://jade-lucky-leopard.cyclic.cloud/recipes',
        {
          headers: {
            Authorization: `Bearer ${login.data.token}`,
          },
          params: {
            limit: 5,
            searchBY: 'title',
            search: searchQuery,
          },
        },
      );
      setGetRecipe(getDataRecipe.data.data);
      console.log(getDataRecipe.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
      <View style={styles.searchWrap}>
        <View style={styles.iconWrap}>
          <Icon name="search" size={20} color="#8B8A8F" />
        </View>
        <TextInput
          style={styles.inputWrap}
          placeholder="Search"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.newRecipe}>New Recipes</Text>
      </View>
      <View style={{marginTop: 20, marginLeft: 10}}>
        <FlatList
          data={getRecipe}
          horizontal
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Detail', {
                  image: item.image,
                  ingredients: item.ingredients,
                  title: item.title,
                  author: item.author,
                })
              }>
              <View style={{padding: 10}}>
                <ImageBackground
                  source={{uri: item.image}}
                  style={{
                    width: 160,
                    height: 200,
                  }}
                  resizeMode={'cover'}>
                  <View style={{flex: 1}}>
                    <View style={{flex: 1}}></View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          paddingBottom: 20,
                          paddingLeft: 30,
                        }}>
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            fontSize: 16,
                          }}>
                          {item.title}
                        </Text>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.newRecipe}>Popular Recipes</Text>
      </View>
      <View style={{flex: 1, marginTop: 20, marginLeft: 20}}>
        <FlatList
          data={popular}
          vertical
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={{flexDirection: 'row', padding: 5}}>
              <Image source={item.image} style={{width: 64, height: 64}} />
              <View style={{paddingLeft: 10}}>
                <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                <View style={{flexDirection: 'row', paddingTop: 9}}>
                  <Icon name="star" size={17} color="#FFB200" solid />
                  <Text style={{paddingLeft: 3}}>4.4</Text>
                  <Text style={{paddingLeft: 6, color: '#6E80B0'}}>
                    Seafood
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchWrap: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 30,
  },
  iconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: '#EFEFEF',
  },
  inputWrap: {
    backgroundColor: '#EFEFEF',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    flex: 1,
  },
  textWrap: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  newRecipe: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
});

export default Home;
