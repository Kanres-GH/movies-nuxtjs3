<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="(movie, index) in movies" :key="movie.id" class="p-4 bg-gray-100 rounded shadow transform transition duration-500 hover:scale-105">
        <div class="poster-container mb-4">
          <img :src="movie.poster" alt="Movie Poster" class="poster-img" v-if="movie.poster"/>
        </div>
        <h3 class="text-lg font-bold">{{ movie.title }}</h3>
        <p class="text-sm">{{ movie.description }}</p>
        <div class="flex justify-between mt-2">
          <button @click="edit(index)" class="btn">Edit</button>
          <button @click="deleteMovie(index)" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['movies']);
  const emit = defineEmits(['delete', 'edit']);
  
  const deleteMovie = (index) => {
    emit('delete', index);
  };
  
  const edit = (index) => {
    const newTitle = prompt('Edit movie title:', props.movies[index].title);
    const newDescription = prompt('Edit movie description:', props.movies[index].description);
    const newPoster = prompt('Edit movie poster URL:', props.movies[index].poster);
    if (newTitle && newDescription && newPoster) {
      const updatedMovie = { ...props.movies[index], title: newTitle, description: newDescription, poster: newPoster };
      emit('edit', index, updatedMovie);
    }
  };
  </script>
  
  <style scoped>
  .poster-container {
    width: 100%;
    height: 0;
    padding-bottom: 150%;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
  }
  
  .poster-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    .poster-container {
      padding-bottom: 200%;
    }
  }
  
  .btn {
    @apply bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-full;
    transition: transform 0.3s ease, background-color 0.3s ease;
    font-size: 1.25rem;
  }
  
  .btn:hover {
    transform: scale(1.1);
  }
  
  .btn-danger {
    @apply bg-gradient-to-r from-red-400 to-pink-500;
  }
  </style>
  