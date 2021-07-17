import React, {useEffect} from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useInfiniteQuery} from 'react-query';
import {mainStore} from '../../stores';
import {Screen, Header, AutoImage as Image} from '../../components';
import {spacing} from '../../theme';
import {getPopularMovies} from '../../services/movie-api';

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

export const MovieListScreen = observer(({navigation}) => {
  const {mainStore: store} = mainStore;
  const {data, error, fetchNextPage, isLoading, isError} = useInfiniteQuery(
    'movies',
    getPopularMovies,
    {
      getNextPageParam: lastPage =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    },
  );

  if (isError) {
    console.log({error});
  }

  useEffect(() => {
    if (data?.pages) {
      mainStore.addMovies(data.pages);
    }
  }, [data])

  return (
    <View>
      <Screen style={CONTAINER} preset="fixed">
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            contentContainerStyle={FLAT_LIST}
            data={[...store.movies]}
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
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              fetchNextPage();
            }}
          />
        )}
      </Screen>
    </View>
  );
});
