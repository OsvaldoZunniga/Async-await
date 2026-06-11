<template>
    <header class="app-header">
        <NuxtLink to="/" class="app-header__logo"> My Nuxt App </NuxtLink>

        <nav>
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/cursos">Cursos</NuxtLink>
            <NuxtLink to="/favoritos" class="nav-favoritos">
                Favoritos
                <span v-if="contadorFavoritos > 0" class="badge">{{ contadorFavoritos }}</span>
            </NuxtLink>
            <NuxtLink to="/about">About</NuxtLink>
        </nav>
    </header>
</template>

<script setup>
const { contadorFavoritos } = useCursos();
</script>

<style lang="scss">
.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #1a1a2e;
    color: #fff;

    &__logo {
        font-size: 1.25rem;
        font-weight: bold;
        color: #fff;
        text-decoration: none;
    }

    nav {
        display: flex;
        align-items: center;
        gap: 0;

        a {
            color: #ccc;
            padding: 0.5rem 1.25rem;
            text-decoration: none;
            transition: color 0.3s, background 0.3s;
            position: relative;

            &:hover {
                color: #42b883;
            }

            &.router-link-active {
                color: #42b883;
                background: rgba(66, 184, 131, 0.1);
            }
        }
    }
}

.nav-favoritos {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.5rem;
    height: 1.5rem;
    background: #ff6b6b;
    color: white;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: bold;
}
</style>
