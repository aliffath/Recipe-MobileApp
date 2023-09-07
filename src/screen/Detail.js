/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, useRoute} from '@react-navigation/native';

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {image, ingredients, title, author} = route.params;
  const ingredientsSplit = ingredients.split(',');

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <ImageBackground source={{uri: image}} style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeTab')}
          style={styles.arrow}>
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>

        <View style={{marginTop: 120, marginHorizontal: 25}}>
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Icon
              name="thumbs-up"
              size={25}
              color="#EFC81A"
              style={styles.like}
            />
            <Icon
              name="bookmark"
              size={25}
              color="white"
              style={styles.bookmark}
            />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={{color: 'white'}}>By Chef {author}</Text>
        </View>
      </ImageBackground>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <View>
            <TouchableOpacity>
              <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black'}}>
                Ingredients
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: 30,
            backgroundColor: '#FAF7ED',
            marginHorizontal: 40,
          }}>
          {ingredientsSplit.map((ingredient, index) => (
            <Text key={index}>- {ingredient}</Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  arrow: {
    flex: 1 / 2,
    paddingHorizontal: 25,
    marginTop: 50,
  },
  like: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    textAlign: 'center',
    borderRadius: 5,
  },
  bookmark: {
    marginLeft: 20,
    width: 30,
    height: 30,
    backgroundColor: '#EEC302',
    textAlign: 'center',
    borderRadius: 5,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default Detail;
