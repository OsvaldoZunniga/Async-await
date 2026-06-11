<template>
    <div class="app">
        <AppHeader />
        <ToastNotification />
        <main class="app__container">
            <slot />
        </main>
        <footer class="app__footer">
            <p>&copy; 2024 My Nuxt App. All rights reserved.</p>
        </footer>
    </div>
</template>

<script setup></script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;

    &__container {
        margin: 0 auto;
        padding: 2rem 1rem;
        max-width: 800px;
        width: 100%;
    }

    &__footer {
        text-align: center;
        padding: 1rem;
        background: #f5f5f5;
        color: #666;
        font-size: 0.875rem;
    }
}
</style>
