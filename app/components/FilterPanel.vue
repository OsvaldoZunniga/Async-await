<template>
    <div class="filtros-panel">
        <h3>Filtros y ordenamiento</h3>
        
        <div class="filtro-grupo">
            <label for="busqueda">Buscar:</label>
            <input
                id="busqueda"
                v-model="filtros.busqueda"
                type="text"
                placeholder="Buscar por título o descripción..."
                class="filtro-input"
            />
        </div>

        <div class="filtro-grupo">
            <label for="profesor">Profesor:</label>
            <select
                id="profesor"
                v-model="filtros.profesor"
                class="filtro-select"
            >
                <option value="">Todos los profesores</option>
                <option v-for="prof in obtenerProfesores" :key="prof" :value="prof">
                    {{ prof }}
                </option>
            </select>
        </div>

        <div class="filtro-grupo">
            <label>Rango de créditos: {{ filtros.creditoMin }} - {{ filtros.creditoMax }}</label>
            <div class="rango-creditos">
                <input
                    v-model.number="filtros.creditoMin"
                    type="range"
                    min="0"
                    max="10"
                    class="filtro-range"
                />
                <input
                    v-model.number="filtros.creditoMax"
                    type="range"
                    min="0"
                    max="10"
                    class="filtro-range"
                />
            </div>
        </div>

        <div class="filtro-grupo">
            <label for="ordenamiento">Ordenar por:</label>
            <select
                id="ordenamiento"
                v-model="filtros.ordenamiento"
                class="filtro-select"
            >
                <option value="ninguno">Sin ordenamiento</option>
                <option value="az">Título A-Z</option>
                <option value="za">Título Z-A</option>
                <option value="creditos-asc">Créditos (menor a mayor)</option>
                <option value="creditos-desc">Créditos (mayor a menor)</option>
            </select>
        </div>

        <button @click="limpiar" class="btn-limpiar">
            Limpiar filtros
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    filtros: Object,
    obtenerProfesores: Array
});
const emit = defineEmits(['limpiar']);

const filtros = computed({
    get: () => props.filtros,
    set: (val) => {
        Object.assign(props.filtros, val);
    }
});

const limpiar = () => {
    emit('limpiar');
};
</script>

<style scoped lang="scss">
.filtros-panel {
    background: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    margin-bottom: 1.5rem;

    h3 {
        margin: 0 0 1rem 0;
        color: #1a1a2e;
        font-size: 1.1rem;
    }
}

.filtro-grupo {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.25rem;

    label {
        font-weight: 600;
        color: #1a1a2e;
        font-size: 0.95rem;
    }
}

.filtro-input,
.filtro-select {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: #42b883;
        box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.1);
    }
}

.rango-creditos {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.filtro-range {
    cursor: pointer;
}

.btn-limpiar {
    width: 100%;
    padding: 0.75rem;
    background: #e0e0e0;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #d0d0d0;
    }

    &:active {
        transform: scale(0.98);
    }
}
</style>
