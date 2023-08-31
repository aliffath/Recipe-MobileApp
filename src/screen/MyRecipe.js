/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const MyRecipe = () => {
  const navigation = useNavigation();
  const [recipe, setRecipe] = useState([
    {
      title: 'Margherita',
      level: 'Spicy',
      location: 'In Veg Pizza',
      image: require('../assets/margherita.png'),
    },
    {
      title: 'Veg Loaded',
      level: 'Spicy',
      location: 'In Veg Pizza',
      image: require('../assets/vegloaded.png'),
    },
  ]);
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

      <View style={{marginTop: 30}}>
        <FlatList
          data={recipe}
          vertical
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.imageWrap}>
              <Image source={item.image} style={{width: 64, height: 64}} />
              <View style={{paddingLeft: 20}}>
                <Text style={styles.text}>{item.title}</Text>
                <Text style={{fontSize: 13, color: '#6E80B0'}}>
                  {item.location}
                </Text>
                <Text style={styles.text}>{item.level}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
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
});

export default MyRecipe;
