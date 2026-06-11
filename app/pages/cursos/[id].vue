<script setup>
const route = useRoute();
const router = useRouter();
const {
    obtenerPorId,
    toggleFavorito,
    esFavorito,
    eliminarCurso,
    actualizarCurso
} = useCursos();
const { mostrarToast } = useToast();

const curso = computed(() => obtenerPorId(Number(route.params.id)));
const esActuallmenteFavorito = computed(() => curso.value ? esFavorito(curso.value.id) : false);
const mostraFormularioEdicion = ref(false);

const confirmarEliminar = () => {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
        if (curso.value && eliminarCurso(curso.value.id)) {
            mostrarToast('Curso eliminado correctamente', 'success');
            router.push('/cursos');
        }
    }
};

const guardarEdicion = (datosActualizados) => {
    if (curso.value) {
        actualizarCurso(curso.value.id, datosActualizados);
        mostrarToast('Curso actualizado correctamente', 'success');
        mostraFormularioEdicion.value = false;
    }
};

const cancelarEdicion = () => {
    mostraFormularioEdicion.value = false;
};

const toggleFav = () => {
    if (curso.value) {
        toggleFavorito(curso.value.id);
    }
};
</script>

<template>
    <section v-if="curso">
        <NuxtLink to="/cursos" class="back"> ← Volver a cursos </NuxtLink>

        <div class="encabezado">
            <div>
                <h2>{{ curso.titulo }}</h2>
                <p class="descripcion">{{ curso.descripcion }}</p>
            </div>
            <button
                @click="toggleFav"
                :class="['btn-favorito', { 'btn-favorito--activo': esActuallmenteFavorito }]"
                aria-label="Marcar como favorito"
            >
                ♥
            </button>
        </div>

        <!-- Formulario edición -->
        <Transition name="fade">
            <div v-if="mostraFormularioEdicion" class="formulario-seccion">
                <CourseForm
                    :curso-inicial="curso"
                    @guardar="guardarEdicion"
                    @cancelar="cancelarEdicion"
                />
            </div>
        </Transition>

        <!-- Información del curso -->
        <div v-if="!mostraFormularioEdicion" class="contenido-detalle">
            <dl class="detalle">
                <dt>Profesor</dt>
                <dd>{{ curso.profesor }}</dd>
                <dt>Créditos</dt>
                <dd>{{ curso.creditos }}</dd>
            </dl>

            <div class="acciones">
                <button
                    @click="mostraFormularioEdicion = true"
                    class="btn btn--primary"
                >
                    ✏️ Editar
                </button>
                <button
                    @click="confirmarEliminar"
                    class="btn btn--peligro"
                >
                    🗑️ Eliminar
                </button>
            </div>
        </div>
    </section>

    <section v-else class="no-encontrado">
        <h2>❌ Curso no encontrado</h2>
        <p>El curso que buscas no existe o ha sido eliminado.</p>
        <NuxtLink to="/cursos" class="btn btn--primary">
            Ver todos los cursos
        </NuxtLink>
    </section>
</template>

<style scoped lang="scss">
.back {
    display: inline-block;
    color: #42b883;
    text-decoration: none;
    margin-bottom: 1.5rem;
    font-weight: 600;
    transition: text-decoration 0.2s;

    &:hover {
        text-decoration: underline;
    }
}

.encabezado {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.5rem;
    margin-bottom: 2rem;

    h2 {
        color: #1a1a2e;
        margin: 0 0 0.5rem 0;
    }
}

.descripcion {
    line-height: 1.6;
    color: #444;
    margin: 0;
}

.btn-favorito {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #ddd;
    transition: all 0.2s;
    padding: 0;
    flex-shrink: 0;

    &:hover {
        color: #ff6b6b;
        transform: scale(1.15);
    }

    &--activo {
        color: #ff6b6b;
    }
}

.contenido-detalle {
    animation: fadeIn 0.3s ease-in;
}

.detalle {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem 1.5rem;
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f9f9f9;
    border-radius: 8px;

    dt {
        font-weight: 600;
        color: #1a1a2e;
    }

    dd {
        margin: 0;
        color: #666;
    }
}

.acciones {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

.btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &--primary {
        background: #42b883;
        color: white;

        &:hover {
            background: #369870;
        }
    }

    &--peligro {
        background: #f44336;
        color: white;

        &:hover {
            background: #d32f2f;
        }
    }

    &:active {
        transform: scale(0.95);
    }
}

.formulario-seccion {
    margin: 2rem 0;
}

.no-encontrado {
    text-align: center;
    padding: 3rem 1rem;
    background: #ffebee;
    border-radius: 8px;
    border: 2px solid #f44336;

    h2 {
        color: #c62828;
        margin: 0 0 1rem 0;
    }

    p {
        color: #c62828;
        margin: 0 0 1.5rem 0;
    }

    .btn--primary {
        display: inline-block;
        text-decoration: none;
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

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
