<script setup>
const { data: posts, loading, error, reload } = useApi('/posts')

const search = ref('')
const filtered = computed(() =>
  (posts.value ?? []).filter(p =>
    p.title.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>

<template>
  <div>
    <input v-model="search" placeholder="Buscar post..." />
    <p>{{ filtered.length }} de {{ posts?.length ?? 0 }} resultados</p>
    <button @click="reload">Recargar</button>

    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="filtered.length === 0">Sin resultados</div>
    <ul v-else>
      <li v-for="post in filtered" :key="post.id">
        <NuxtLink :to="`/posts/${post.id}`">{{ post.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>