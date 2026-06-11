<template>
    <section class="fetch-page">
        <h2>Ejemplo async/await con API</h2>
        <p>Endpoint: https://jsonplaceholder.typicode.com/todos</p>

        <div class="actions">
            <button @click="cargarTodos" :disabled="loading">
                {{ loading ? "Cargando..." : "Volver a cargar" }}
            </button>
        </div>

        <p v-if="loading" class="estado">Cargando datos...</p>
        <p v-else-if="error" class="estado estado--error">{{ error }}</p>

        <ul v-else class="todos-list">
            <li v-for="todo in todos" :key="todo.id" class="todo-item">
                <span :class="['badge', todo.completed ? 'ok' : 'pending']">
                    {{ todo.completed ? "Completado" : "Pendiente" }}
                </span>
                <span>{{ todo.id }}. {{ todo.title }}</span>
            </li>
        </ul>
    </section>
</template>
<script setup>
const url = "https://jsonplaceholder.typicode.com/todos";
const todos = ref([]);
const loading = ref(false);
const error = ref(""); // TODO---

const cargarTodos = async () => {
    loading.value = true;
    error.value = "";
    try {
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        todos.value = data;
    } catch (err) {
        error.value = "Error al cargar los datos";
    } finally {
        loading.value = false;
    }
};

onMounted(async () => {
    await cargarTodos();
    //console.log("Datos cargados:", todos.value);
});
</script>

<style scoped>
.fetch-page {
    max-width: 800px;
}

h2 {
    margin-bottom: 0.5rem;
    color: #1a1a2e;
}

p {
    color: #444;
}

.actions {
    margin: 1rem 0;
}

button {
    background: #42b883;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 0.6rem 1rem;
    font-weight: 600;
    cursor: pointer;
}

button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.estado {
    margin-top: 1rem;
    font-weight: 600;
}

.estado--error {
    color: #c62828;
}

.todos-list {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
    display: grid;
    gap: 0.75rem;
}

.todo-item {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    background: #f8f8f8;
    border: 1px solid #ececec;
    border-radius: 8px;
    padding: 0.75rem;
}

.badge {
    font-size: 0.75rem;
    font-weight: 700;
    border-radius: 999px;
    padding: 0.2rem 0.55rem;
}

.ok {
    background: #e8f5ef;
    color: #2e7d32;
}

.pending {
    background: #fff3e0;
    color: #ef6c00;
}
</style>