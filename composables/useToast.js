const toasts = ref([]);

export function useToast() {
    const mostrarToast = (mensaje, tipo = 'info', duracion = 3000) => {
        const id = Date.now();
        const toast = {
            id,
            mensaje,
            tipo, // 'success', 'error', 'info'
            duracion
        };
        toasts.value.push(toast);

        if (duracion > 0) {
            setTimeout(() => {
                eliminarToast(id);
            }, duracion);
        }

        return id;
    };

    const eliminarToast = (id) => {
        const indice = toasts.value.findIndex(t => t.id === id);
        if (indice !== -1) {
            toasts.value.splice(indice, 1);
        }
    };

    return {
        toasts: readonly(toasts),
        mostrarToast,
        eliminarToast
    };
}
