import axios from 'axios';

const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzM1ZDE1NTk5MmMyZDZiZWY4Y2U3MDM4ZmZkMzI4NSIsIm5iZiI6MTcyMjQyMzE5OS45MDg2NTQsInN1YiI6IjY2YWEwYjYxNzRhOTBmNjRmOGZhOGI5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P0hTVbILYl26RcHUwDY8w85kfAslIHV1KdwhcYe-NG0';

export default defineNuxtPlugin((nuxtApp) => {
  const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  nuxtApp.provide('tmdbApi', tmdbApi);
});
