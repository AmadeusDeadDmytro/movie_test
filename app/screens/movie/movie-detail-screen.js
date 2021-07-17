import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {observer} from 'mobx-react';
import {useQuery} from 'react-query';
import {computed} from 'mobx'
import {mainStore} from '../../stores';
import {Screen, Header, AutoImage as Image} from '../../components';
import {spacing} from '../../theme';
import {getMovieDetail} from '../../services/movie-api';

const CONTAINER = {
  backgroundColor: 'transparent',
  paddingHorizontal: spacing[4],
};
const BOLD = {fontWeight: 'bold'};
const HEADER = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
};
const IMAGE = {
  width: 100,
  height: 160,
};
const INFO_BLOCK = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
};
const STATS_BLOCK = {
  flexDirection: 'column',
  justifyContent: 'flex-start',
  marginLeft: 20,
};

const TEXT_BLOCK = {
  flexDirection: 'row',
};
const TEXT = {
  marginLeft: 10,
  maxWidth: 200
};
const TEXT_GENRE = {
  textTransform: 'lowercase',
};
const OVERVIEW = {
  marginTop: 30
};

export const MovieDetailScreen = observer(({route}) => {
  const {id} = route.params;

  const {mainStore: store} = mainStore;
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const [movie, setMovie] = useState(null);

  const isFavorite = computed(() => mainStore.isFavorite(id)).get()

  const {data, error, isLoading, isError} = useQuery(
    [id, 'movie'],
    getMovieDetail,
  );

  useEffect(() => {
    if (data) {
      mainStore.addMovie(id, data);
      setMovie(store.details[id]);
    } else if (store.details[id]) {
      setMovie(store.details[id]);
    }
  }, [data]);

  if (isError) {
    console.log('error', error.message);
  }

  const toggleFavorite = (id) => {
    mainStore.toggleFavorite(id)
  }

  if (!movie) {
    return (
      <View>
        <Screen style={CONTAINER} preset="scroll">
          <Header
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
          />
          <Text>{isLoading || data ? 'Loading...' : 'Failed to load'}</Text>
        </Screen>
      </View>
    );
  }

  return (
    <View>
      <Screen style={CONTAINER} preset="fixed">
        <Header
          leftIcon="back"
          rightIcon={isFavorite ? "is_favorite" : "no_favorite"}
          onLeftPress={goBack}
          onRightPress={() => toggleFavorite(id)}
          style={HEADER}
        />
        <View style={INFO_BLOCK}>
          <Image
            source={{
              uri: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            }}
            style={IMAGE}
          />
          <View style={STATS_BLOCK}>
            <View style={TEXT_BLOCK}>
              <Text style={BOLD}>Title:</Text>
              <Text style={TEXT}>{movie.title}</Text>
            </View>
            <View style={TEXT_BLOCK}>
              <Text style={BOLD}>Budget:</Text>
              <Text style={TEXT}>${movie.budget}</Text>
            </View>
            <View style={TEXT_BLOCK}>
              <Text style={BOLD}>Genres:</Text>
              <View style={TEXT}>
                {movie.genres.map((el, i, arr) => {
                  return (
                    <Text style={TEXT_GENRE} key={i}>
                      {arr[i + 1] ? `${el.name}, ` : el.name}
                    </Text>
                  );
                })}
              </View>
            </View>
            <View style={TEXT_BLOCK}>
              <Text style={BOLD}>Tagline:</Text>
              <Text style={TEXT}>"{movie.tagline}"</Text>
            </View>
          </View>
        </View>
        <View style={TEXT_BLOCK}>
          <Text style={OVERVIEW}>"{movie.overview}"</Text>
        </View>
      </Screen>
    </View>
  );
});
