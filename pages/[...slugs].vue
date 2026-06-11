<template>
    <section class="not-found">
        <div class="not-found__content">
            <h1 class="not-found__titulo">404</h1>
            <h2 class="not-found__subtitulo">Página no encontrada</h2>
            <p class="not-found__mensaje">
                Lo siento, la página que buscas no existe o ha sido movida.
            </p>

            <div class="not-found__navegacion">
                <NuxtLink to="/" class="btn btn--primary">
                    🏠 Ir al inicio
                </NuxtLink>
                <NuxtLink to="/cursos" class="btn btn--secundario">
                    📚 Ver cursos
                </NuxtLink>
                <NuxtLink to="/favoritos" class="btn btn--secundario">
                    ❤️ Mis favoritos
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup>
// Página 404 personalizada - captura todas las rutas no definidas
</script>

<style scoped lang="scss">
.not-found {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;

    &__content {
        padding: 2rem;
        background: linear-gradient(135deg, #f9f9f9 0%, #fff 100%);
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        max-width: 500px;
    }

    &__titulo {
        font-size: 5rem;
        font-weight: 900;
        margin: 0;
        background: linear-gradient(135deg, #42b883, #2182a5);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    &__subtitulo {
        font-size: 1.75rem;
        color: #1a1a2e;
        margin: 1rem 0 0.5rem 0;
    }

    &__mensaje {
        color: #666;
        font-size: 1.1rem;
        margin: 0 0 2rem 0;
        line-height: 1.6;
    }

    &__navegacion {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
}

.btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s;
    cursor: pointer;
    border: none;

    &--primary {
        background: #42b883;
        color: white;

        &:hover {
            background: #369870;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(66, 184, 131, 0.3);
        }
    }

    &--secundario {
        background: #f0f0f0;
        color: #1a1a2e;
        border: 1px solid #ddd;

        &:hover {
            background: #e0e0e0;
            transform: translateY(-2px);
        }
    }

    &:active {
        transform: translateY(0);
    }
}
</style>
