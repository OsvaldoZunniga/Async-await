<template>
    <section class="favoritos-page">
        <h2>❤ Mis Favoritos</h2>

        <div v-if="cursosFavoritos.length > 0" class="favoritos-lista">
            <div class="favoritos-grid">
                <div
                    v-for="curso in cursosFavoritos"
                    :key="curso.id"
                    class="curso-item"
                >
                    <CursoCard
                        :titulo="curso.titulo"
                        :profesor="curso.profesor"
                        :creditos="curso.creditos"
                        :es-favorito="true"
                        @toggle-favorito="toggleFavorito(curso.id)"
                        @eliminar="confirmarEliminar(curso.id)"
                    />
                    <NuxtLink
                        :to="`/cursos/${curso.id}`"
                        class="curso-item__link-detalles"
                    >
                        Ver detalles →
                    </NuxtLink>
                </div>
            </div>

            <div class="favoritos-stats">
                <p>Tienes <strong>{{ contadorFavoritos }}</strong> {{ contadorFavoritos === 1 ? 'curso favorito' : 'cursos favoritos' }}</p>
            </div>
        </div>

        <div v-else class="estado-vacio">
            <p>😢 Aún no tienes cursos marcados como favoritos.</p>
            <p>¡Marca tus cursos favoritos desde la lista de cursos!</p>
            <NuxtLink to="/cursos" class="btn btn--primary">
                Ir a cursos
            </NuxtLink>
        </div>
    </section>
</template>

<script setup>
const {
    cursosFavoritos,
    contadorFavoritos,
    toggleFavorito,
    eliminarCurso
} = useCursos();

const { mostrarToast } = useToast();

const confirmarEliminar = (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
        if (eliminarCurso(id)) {
            mostrarToast('Curso eliminado correctamente', 'success');
        }
    }
};
</script>

<style lang="scss" scoped>
.favoritos-page {
    h2 {
        color: #1a1a2e;
        margin: 0 0 1.5rem 0;
        font-size: 1.75rem;
    }
}

.favoritos-lista {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.favoritos-grid {
    display: grid;
    gap: 1.5rem;
}

.curso-item {
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

.favoritos-stats {
    text-align: center;
    padding: 1.5rem;
    background: #e8f5ef;
    border-radius: 8px;
    color: #2d8a5e;

    p {
        margin: 0;
        font-weight: 600;
    }

    strong {
        color: #ff6b6b;
    }
}

.estado-vacio {
    text-align: center;
    padding: 3rem 1rem;
    background: #f9f9f9;
    border-radius: 8px;
    border: 2px dashed #ddd;

    p {
        color: #666;
        font-size: 1.1rem;
        margin: 0 0 1rem 0;

        &:first-child {
            font-size: 1.3rem;
        }
    }

    .btn--primary {
        display: inline-block;
        background: #42b883;
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.2s;

        &:hover {
            background: #369870;
        }
    }
}
</style>
