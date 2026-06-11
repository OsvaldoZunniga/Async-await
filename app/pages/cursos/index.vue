<template>
    <section class="cursos-page">
        <div class="cursos-page__header">
            <h2>Mis Cursos</h2>
            <button
                @click="mostrarFormulario = !mostrarFormulario"
                class="btn btn--primary"
            >
                {{ mostrarFormulario ? 'Cancelar' : '+ Nuevo Curso' }}
            </button>
        </div>

        <!-- Formulario crear/editar -->
        <Transition name="fade">
            <div v-if="mostrarFormulario" class="formulario-seccion">
                <CourseForm
                    :curso-inicial="cursoEnEdicion"
                    @guardar="guardarCurso"
                    @cancelar="cancelarFormulario"
                />
            </div>
        </Transition>

        <!-- Filtros -->
        <FilterPanel
            :filtros="filtros"
            :obtener-profesores="obtenerProfesores"
            @limpiar="limpiarFiltros"
        />

        <!-- Lista de cursos -->
        <div class="cursos-page__lista">
            <div
                v-if="cursosFiltrados.length > 0"
                class="cursos-grid"
            >
                <div
                    v-for="curso in cursosFiltrados"
                    :key="curso.id"
                    class="curso-item"
                >
                    <CursoCard
                        :titulo="curso.titulo"
                        :profesor="curso.profesor"
                        :creditos="curso.creditos"
                        :es-favorito="esFavorito(curso.id)"
                        @eliminar="confirmarEliminar(curso.id)"
                        @toggle-favorito="toggleFavorito(curso.id)"
                    />
                    <NuxtLink
                        :to="`/cursos/${curso.id}`"
                        class="curso-item__link-detalles"
                    >
                        Ver detalles →
                    </NuxtLink>
                    <button
                        @click="iniciarEdicion(curso)"
                        class="btn-editar"
                    >
                        Editar
                    </button>
                </div>
            </div>
            <div v-else class="estado-vacio">
                <p>{{ mensajeVacio }}</p>
                <button @click="limpiarFiltros" class="btn btn--secundario">
                    Limpiar filtros
                </button>
            </div>
        </div>

        <div class="cursos-stats">
            <span>Total: {{ cursos.length }} cursos</span>
            <span>Mostrados: {{ cursosFiltrados.length }}</span>
            <span v-if="contadorFavoritos > 0">Favoritos: {{ contadorFavoritos }}</span>
        </div>
    </section>
</template>

<script setup>
const {
    cursos,
    filtros,
    cursosFiltrados,
    contadorFavoritos,
    obtenerProfesores,
    crearCurso,
    actualizarCurso,
    eliminarCurso,
    toggleFavorito,
    esFavorito,
    limpiarFiltros: limpiarFiltrosComposable
} = useCursos();

const { mostrarToast } = useToast();

const mostrarFormulario = ref(false);
const cursoEnEdicion = ref(null);

const guardarCurso = (datosCurso) => {
    if (cursoEnEdicion.value) {
        actualizarCurso(cursoEnEdicion.value.id, datosCurso);
        mostrarToast('Curso actualizado correctamente', 'success');
    } else {
        crearCurso(datosCurso);
        mostrarToast('Curso creado correctamente', 'success');
    }
    cancelarFormulario();
};

const iniciarEdicion = (curso) => {
    cursoEnEdicion.value = curso;
    mostrarFormulario.value = true;
};

const cancelarFormulario = () => {
    mostrarFormulario.value = false;
    cursoEnEdicion.value = null;
};

const confirmarEliminar = (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
        if (eliminarCurso(id)) {
            mostrarToast('Curso eliminado correctamente', 'success');
        }
    }
};

const limpiarFiltros = () => {
    limpiarFiltrosComposable();
};

const mensajeVacio = computed(() => {
    if (filtros.busqueda || filtros.profesor || filtros.creditoMin > 0 || filtros.creditoMax < 10) {
        return 'No se encontraron cursos con los filtros aplicados.';
    }
    return 'No hay cursos. ¡Crea uno nuevo para comenzar!';
});
</script>

<style lang="scss" scoped>
.cursos-page {
    h2 {
        color: #1a1a2e;
        margin: 0 0 1.5rem 0;
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;

        h2 {
            margin: 0;
        }
    }
}

.formulario-seccion {
    margin-bottom: 2rem;
}

.cursos-grid {
    display: grid;
    gap: 1.5rem;
}

.curso-item {
    position: relative;

    &__link-detalles {
        display: inline-block;
        margin-top: 0.75rem;
        color: #42b883;
        text-decoration: none;
        font-weight: 600;
        transition: text-decoration 0.2s;

        &:hover {
            text-decoration: underline;
        }
    }
}

.btn-editar {
    margin-left: 0.75rem;
    background: #2196f3;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.2s;

    &:hover {
        background: #1976d2;
    }

    &:active {
        transform: scale(0.95);
    }
}

.estado-vacio {
    text-align: center;
    padding: 3rem 1rem;
    color: #888;

    p {
        margin: 0 0 1.5rem 0;
        font-size: 1.1rem;
    }
}

.cursos-stats {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e0e0e0;
    display: flex;
    gap: 2rem;
    justify-content: center;
    color: #666;
    font-size: 0.95rem;
}

.btn {
    &--primary {
        background: #42b883;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            background: #369870;
        }
    }

    &--secundario {
        background: #e0e0e0;
        color: #1a1a2e;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            background: #d0d0d0;
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
