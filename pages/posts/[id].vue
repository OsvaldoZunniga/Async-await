<script setup>
const route = useRoute()
const { data: post, loading, error, reload } = useApi(`/posts/${route.params.id}`)
</script>

<template>
  <div>
    <NuxtLink to="/posts">← Volver</NuxtLink>
    <button @click="reload">Recargar</button>

    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="!post">Sin datos</div>
    <div v-else>
      <h1>{{ post.title }}</h1>
      <p>{{ post.body }}</p>
      <p>User ID: {{ post.userId }}</p>
    </div>
  </div>
</template>