<template>
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Movie List</h2>
        <button @click="showAddMovieForm = true" class="btn btn-primary">Add Movie</button>
      </div>
      <div class="flex mb-4">
        <input
          v-model="searchQuery"
          @input="searchMovies"
          class="w-full md:w-1/2 px-4 py-2 rounded-lg text-lg"
          placeholder="Search for a movie"
        />
      </div>
      <MovieList :movies="displayedMovies" @delete="deleteMovie" @edit="editMovie" />
      <AddMovieForm v-if="showAddMovieForm" @close="showAddMovieForm = false" @add="addMovie" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import MovieList from '~/components/MovieList.vue';
  import AddMovieForm from '~/components/AddMovieForm.vue';
  import { useNuxtApp } from '#app';
  
  const { $tmdbApi } = useNuxtApp();
  
  const movies = ref([]);
  const searchQuery = ref('');
  const displayedMovies = ref([]);
  const showAddMovieForm = ref(false);
  
  onMounted(async () => {
    const storedMovies = JSON.parse(localStorage.getItem('movies') || '[]');
    movies.value = storedMovies;
    displayedMovies.value = storedMovies;
  });
  
  watch(searchQuery, async (newQuery) => {
    if (newQuery.trim()) {
      searchMovies();
    } else {
      displayedMovies.value = movies.value;
    }
  });
  
  const searchMovies = async () => {
    try {
      const response = await $tmdbApi.get(`/search/movie`, {
        params: {
          query: searchQuery.value,
        },
      });
      displayedMovies.value = response.data.results.map(movie => ({
        title: movie.title,
        description: movie.overview,
        poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
        id: movie.id,
      }));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
  
  const addMovie = (movie) => {
    movies.value.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies.value));
    displayedMovies.value = movies.value;
  };
  
  const deleteMovie = (index) => {
    movies.value.splice(index, 1);
    localStorage.setItem('movies', JSON.stringify(movies.value));
    displayedMovies.value = movies.value;
  };
  
  const editMovie = (index, updatedMovie) => {
    movies.value[index] = updatedMovie;
    localStorage.setItem('movies', JSON.stringify(movies.value));
    displayedMovies.value = movies.value;
  };
  </script>
  