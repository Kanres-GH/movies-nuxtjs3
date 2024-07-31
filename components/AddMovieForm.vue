<template>
    <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-4 rounded shadow w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Add New Movie</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="title" class="block text-sm font-bold mb-2">Title</label>
            <input
              id="title"
              v-model="title"
              type="text"
              class="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-sm font-bold mb-2">Description</label>
            <textarea
              id="description"
              v-model="description"
              class="w-full p-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="poster" class="block text-sm font-bold mb-2">Poster URL</label>
            <input
              id="poster"
              v-model="poster"
              type="text"
              class="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div class="flex justify-end">
            <button type="button" @click="$emit('close')" class="btn btn-secondary mr-2">Cancel</button>
            <button type="submit" class="btn btn-primary">Add Movie</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const title = ref('');
  const description = ref('');
  const poster = ref('');
  
  const handleSubmit = () => {
    if (title.value && description.value) {
      const newMovie = {
        title: title.value,
        description: description.value,
        poster: poster.value,
        id: Date.now(),
      };
      emit('add', newMovie);
      $emit('close');
    }
  };
  </script>
  