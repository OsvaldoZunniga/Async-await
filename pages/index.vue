<template>
    <section>
        <h2>Bienvenido al curso de Vue 3 + Nuxt</h2>
        <p>
            Aprenderás componentes, reactividad, routing, layouts y composables con un proyecto base
            listo para extender.
        </p>

        <div class="demo">
            <p>Ejemplo rápido de reactividad con <code>ref</code>:</p>
            <p>Contador: {{ contador }}</p>
            <button @click="contador++">Incrementar</button> 
        </div>

        <NuxtLink to="/cursos" class="btn-link"> Ver cursos → </NuxtLink>
    </section>
</template>
<script setup>
const contador = ref(0);
</script>
<style scoped>
h2 {
    color: #1a1a2e;
    margin-bottom: 1rem;
}

p {
    line-height: 1.6;
    color: #444;
}

.demo {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f9f9f9;
    border-radius: 8px;
}

.demo button {
    background: #42b883;
    color: white;
    border: none;
    padding: 0.5rem 1.25rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
}

.demo button:hover {
    background: #369870;
}

.btn-link {
    display: inline-block;
    color: #42b883;
    font-weight: 600;
    text-decoration: none;
}

.btn-link:hover {
    text-decoration: underline;
}
</style>
