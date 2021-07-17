import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const key = '1d7aa79772c3dd2ba6dbb3599b5ea86d'

export const getPopularMovies = ({ pageParam = 1 }) => {
  return axios(`/movie/popular?api_key=${key}&page=${pageParam}`).then(
    (result) => result.data,
  );
}

export const getMovieDetail = ({ queryKey }) => {
  const id = queryKey[0]
  return axios(`/movie/${id}?api_key=${key}`).then(
    (result) => result.data,
  );
}