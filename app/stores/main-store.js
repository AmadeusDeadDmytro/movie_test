import React from 'react';
import {makeAutoObservable} from 'mobx';

class MainStore {
  constructor() {
    makeAutoObservable(this);
  }

  mainStore = {
    movies: [],
    details: {},
    favorites: [],
    search: '',
  };

  addMovies(pages) {
    this.mainStore.movies = pages.reduce((acc, current) => {
      return [...acc, ...current.results];
    }, []);
  }
  r;

  addMovie(id, movie) {
    this.mainStore.details[id] = {...movie};
  }

  toggleFavorite(id) {
    const arr = [...this.mainStore.favorites];
    const index = arr.indexOf(id);

    if (index === -1) {
      arr.push(id);
    } else {
      arr.splice(index, 1);
    }

    this.mainStore.favorites = arr;
  }

  isFavorite(id) {
    return this.mainStore.favorites.includes(id);
  }

  changeSearch(str) {
    this.mainStore.search = str;
  }

  get getFavorites() {
    return Object.values(this.mainStore.details).filter(
      el =>
        this.mainStore.favorites.includes(el.id) &&
        el.title.includes(this.mainStore.search),
    );
  }
}

export const mainStore = new MainStore();
