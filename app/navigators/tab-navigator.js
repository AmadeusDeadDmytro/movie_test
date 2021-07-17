import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MovieFavoriteScreen, MovieListScreen} from '../screens';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'black',
        labelStyle: {
          fontSize: 18,
        },
      }}>
      <Tab.Screen name="Popular" component={MovieListScreen} />
      <Tab.Screen name="Favorite" component={MovieFavoriteScreen} />
    </Tab.Navigator>
  );
}
