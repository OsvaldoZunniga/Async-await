<script setup>
defineProps({
  titulo: String,
  profesor: String,
  creditos: Number,
  esFavorito: Boolean
})

const emit = defineEmits(['eliminar', 'toggle-favorito']);

const loading = ref(false);

onMounted(async () => {
  console.log('On mounted!');
})
onUnmounted(() => {
  console.log('On unmounted!');
})
</script>

<template>
  <article class="card">
    <div class="card__header">
      <h3>{{ titulo }}</h3>
      <button
        @click.stop="$emit('toggle-favorito')"
        :class="['card__favorito', { 'card__favorito--activo': esFavorito }]"
        aria-label="Marcar como favorito"
      >
        ♥
      </button>
    </div>
    <p class="profesor">{{ profesor }}</p>
    <span class="creditos">{{ creditos }} créditos</span>
    <div class="card__acciones">
      <button
        @click.stop="$emit('eliminar')"
        class="btn-eliminar"
        aria-label="Eliminar curso"
      >
        Eliminar
      </button>
    </div>
  </article>
</template>

<style scoped lang="scss">
.card {
  border: 1px solid #e0e0e0;
  padding: 1.25rem;
  border-radius: 8px;
  transition: box-shadow 0.2s, border-color 0.2s;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  &:hover {
    border-color: #42b883;
    box-shadow: 0 4px 12px rgba(66, 184, 131, 0.15);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  h3 {
    margin: 0;
    color: #1a1a2e;
    flex: 1;
  }

  &__favorito {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    color: #ddd;
    transition: all 0.2s;

    &:hover {
      color: #ff6b6b;
      transform: scale(1.15);
    }

    &--activo {
      color: #ff6b6b;
    }
  }

  .profesor {
    margin: 0;
    color: #666;
    font-size: 0.95rem;
  }

  .creditos {
    display: inline-block;
    background: #e8f5ef;
    color: #2d8a5e;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.875rem;
    width: fit-content;
  }

  &__acciones {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
}

.btn-eliminar {
  background: #ffebee;
  color: #c62828;
  border: 1px solid #ef5350;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background: #f44336;
    color: white;
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>
