import React, {useEffect, useState} from 'react';
import {FlatList, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {observer} from 'mobx-react-lite';
import {mainStore} from '../../stores';
import {Screen, Button, AutoImage as Image} from '../../components';
import {spacing} from '../../theme';
import { useNavigation } from '@react-navigation/native';

const CONTAINER = {
  backgroundColor: 'transparent',
};
const LIST_CONTAINER = {
  alignItems: 'center',
  flexDirection: 'row',
  padding: 20,
};
const IMAGE = {
  height: 100,
  width: 65,
};
const LIST_TEXT = {
  marginLeft: 10,
  marginRight: 30,
};
const FLAT_LIST = {
  paddingHorizontal: spacing[4],
};
const SEARCH_CONTAINER = {
  paddingHorizontal: spacing[4],
};
const INPUT = {
  color: 'black',
  minHeight: 44,
  fontSize: 18,
  backgroundColor: 'white',
  paddingHorizontal: 10
}

export const MovieFavoriteScreen = observer(() => {
  const {mainStore: store} = mainStore;
  const navigation = useNavigation();

  const [movies, setMovies] = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    mainStore.changeSearch('')
    setMovies([...mainStore.getFavorites])
    setSearchText('')
  }, [store.favorites])

  const searchMovies = () => {
    setMovies([...mainStore.getFavorites])
  }

  return (
    <View>
      <Screen style={CONTAINER} preset="fixed">
        <View style={SEARCH_CONTAINER}>
          <TextInput
            style={INPUT}
            placeholder={"Search"}
            placeholderTextColor={'gray'}
            underlineColorAndroid={'transparent'}
            value={searchText}
            onChangeText={(e) => {
              setSearchText(e)
              mainStore.changeSearch(e)
            }}
          />
          <Button onPress={searchMovies}>
            <Text>Search</Text>
          </Button>
        </View>
        <FlatList
          contentContainerStyle={FLAT_LIST}
          data={movies}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <TouchableOpacity
              style={LIST_CONTAINER}
              onPress={() => {
                navigation.navigate('movieDetail', {id: item.id});
              }}>
              <Image
                source={{
                  uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
                }}
                style={IMAGE}
              />
              <Text style={LIST_TEXT}>
                {item.title} ({parseInt(item.release_date)})
              </Text>
            </TouchableOpacity>
          )}
        />
      </Screen>
    </View>
  );
});
