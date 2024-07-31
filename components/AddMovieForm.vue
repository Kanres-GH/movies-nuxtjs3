<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
        <h3 class="text-lg font-bold mb-4">Add Movie</h3>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title:</label>
            <input type="text" v-model="movie.title" id="title" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description:</label>
            <textarea v-model="movie.description" id="description" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
          </div>
          <div class="mb-4">
            <label for="poster" class="block text-gray-700 text-sm font-bold mb-2">Poster URL:</label>
            <input type="text" v-model="movie.poster" id="poster" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div class="flex justify-between items-center">
            <button type="button" @click="$emit('close')" class="bg-red-500 text-white py-2 px-4 rounded-full">Cancel</button>
            <button type="submit" class="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-full">Add Movie</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const movie = ref({
    title: '',
    description: '',
    poster: ''
  });
  
  const submitForm = () => {
    if (movie.value.title.trim() && movie.value.description.trim() && movie.value.poster.trim()) {
      emit('add', { ...movie.value });
      movie.value.title = '';
      movie.value.description = '';
      movie.value.poster = '';
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  