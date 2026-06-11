<template>
    <Transition name="slide">
        <div v-if="toasts.length" class="toast-container">
            <div
                v-for="toast in toasts"
                :key="toast.id"
                :class="['toast', `toast--${toast.tipo}`]"
            >
                <span>{{ toast.mensaje }}</span>
                <button
                    class="toast__close"
                    @click="eliminarToast(toast.id)"
                    aria-label="Cerrar notificación"
                >
                    ✕
                </button>
            </div>
        </div>
    </Transition>
</template>

<script setup>
const { toasts, eliminarToast } = useToast();
</script>

<style scoped lang="scss">
.toast-container {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    pointer-events: none;
}

.toast {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.25rem;
    border-radius: 6px;
    font-weight: 500;
    animation: slideIn 0.3s ease-out;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    pointer-events: auto;

    &--success {
        background: #e8f5ef;
        color: #2d8a5e;
        border-left: 4px solid #42b883;
    }

    &--error {
        background: #ffebee;
        color: #c62828;
        border-left: 4px solid #f44336;
    }

    &--info {
        background: #e3f2fd;
        color: #1976d2;
        border-left: 4px solid #2196f3;
    }

    &__close {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        font-size: 1.25rem;
        opacity: 0.7;
        transition: opacity 0.2s;

        &:hover {
            opacity: 1;
        }
    }
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.slide-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>
