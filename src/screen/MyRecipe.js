/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import axios from 'axios';

const MyRecipe = () => {
  const navigation = useNavigation();
  const credential = useSelector(state => state.authReducer);
  const [recipe, setRecipe] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState('asc');

  const getMyRecipe = async page => {
    try {
      const result = await axios.get(
        'https://jade-lucky-leopard.cyclic.cloud/myRecipe',
        {
          headers: {
            Authorization: `Bearer ${credential.data.token}`,
          },
          params: {
            limit: 2,
            page: page,
            sort: sort,
          },
        },
      );
      console.log(result);
      setRecipe(result.data.data);
      setTotalPages(result.data.pagination.totalPage);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getMyRecipe(currentPage, sort);
  }, [currentPage, sort]);

  const toggleSortOrder = () => {
    if (sort === 'asc') {
      setSort('desc');
    } else {
      setSort('asc');
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const deleteRecipe = async id => {
    try {
      const result = await axios.delete(
        `https://jade-lucky-leopard.cyclic.cloud/deleterecipe/${id}`,
        {
          headers: {
            Authorization: `Bearer ${credential.data.token}`,
          },
        },
      );
      if (result.status === 200) {
        ToastAndroid.showWithGravityAndOffset(
          'Recipe deleted successfully',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        setCurrentPage(1);
        getMyRecipe(1);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <StatusBar backgroundColor={'#E5E5E5'} barStyle={'light-content'} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.iconWrap}>
          <Icon
            name="chevron-left"
            size={20}
            color="#8B8A8F"
            style={{textAlign: 'center'}}
          />
        </TouchableOpacity>
        <Text style={styles.judul}>My Recipe</Text>
      </View>
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 20,
        }}>
        <TouchableOpacity onPress={toggleSortOrder}>
          <Text
            style={{textAlign: 'right', fontWeight: 'bold', color: 'white'}}>
            Urutkan {sort === 'asc' ? '⬇️' : '⬆️'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 20}}>
        <FlatList
          data={recipe}
          vertical
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
                backgroundColor: 'white',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Detail', {
                    image: item.image,
                    ingredients: item.ingredients,
                    title: item.title,
                    author: item.author,
                  })
                }>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={{uri: item.image}}
                    style={{width: 100, height: 100, borderRadius: 5}}
                  />
                  <View
                    style={{
                      marginHorizontal: 10,
                      width: 100,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'black',
                      }}>
                      {item.title}
                    </Text>
                    <Text style={{fontSize: 16}}>{item.category}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={{paddingRight: 10}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('EditRecipe', {id: item.id})
                  }
                  style={{
                    backgroundColor: 'rgba(48, 192, 243, 1)',
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 10,
                  }}>
                  <Text style={styles.textBtn}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteRecipe(item.id)}
                  style={{
                    backgroundColor: 'rgba(245, 126, 113, 1)',
                    padding: 10,
                    borderRadius: 5,
                  }}>
                  <Text style={styles.textBtn}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <View
        style={{
          justifyContent: 'space-around',
          flexDirection: 'row',
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={prevPage}
          disabled={currentPage === 1}
          style={{
            backgroundColor: '#EFC81A',
            padding: 8,
            borderRadius: 5,
            flexDirection: 'row',
            gap: 5,
          }}>
          <Icon
            name="chevron-left"
            size={18}
            color={currentPage === 1 ? 'gray' : 'white'}
          />
          <Text
            style={{
              color: currentPage === 1 ? 'gray' : 'white',
              fontWeight: 'bold',
            }}>
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={nextPage}
          disabled={currentPage === totalPages}
          style={{
            backgroundColor: '#EFC81A',
            padding: 8,
            borderRadius: 5,
            flexDirection: 'row',
            gap: 5,
          }}>
          <Text
            style={{
              color: currentPage === totalPages ? 'gray' : 'white',
              fontWeight: 'bold',
            }}>
            Next
          </Text>
          <Icon
            name="chevron-right"
            size={18}
            color={currentPage === totalPages ? 'gray' : 'white'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  imageWrap: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
  judul: {
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,
    fontWeight: 'bold',
    color: '#EEC302',
    fontSize: 18,
  },
  iconWrap: {
    backgroundColor: '#F8F8FA',
    width: 30,
    borderRadius: 5,
  },
  wrapper: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
  },
  textBtn: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MyRecipe;
