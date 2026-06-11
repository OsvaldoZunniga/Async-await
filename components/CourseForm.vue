<template>
    <form @submit.prevent="enviarFormulario" class="form-curso">
        <div class="form-grupo">
            <label for="titulo">Título *</label>
            <input
                id="titulo"
                v-model="formulario.titulo"
                type="text"
                placeholder="Ej: Introducción a Python"
                required
                minlength="3"
            />
            <span v-if="errores.titulo" class="error">{{ errores.titulo }}</span>
        </div>

        <div class="form-grupo">
            <label for="profesor">Profesor *</label>
            <input
                id="profesor"
                v-model="formulario.profesor"
                type="text"
                placeholder="Ej: Dr. Juan Pérez"
                required
                minlength="3"
            />
            <span v-if="errores.profesor" class="error">{{ errores.profesor }}</span>
        </div>

        <div class="form-grupo">
            <label for="creditos">Créditos *</label>
            <input
                id="creditos"
                v-model.number="formulario.creditos"
                type="number"
                min="1"
                max="10"
                required
            />
            <span v-if="errores.creditos" class="error">{{ errores.creditos }}</span>
        </div>

        <div class="form-grupo">
            <label for="descripcion">Descripción *</label>
            <textarea
                id="descripcion"
                v-model="formulario.descripcion"
                placeholder="Descripción del curso..."
                required
                minlength="10"
                rows="4"
            ></textarea>
            <span v-if="errores.descripcion" class="error">{{ errores.descripcion }}</span>
        </div>

        <div class="form-acciones">
            <button type="submit" class="btn btn--primary">
                {{ esEdicion ? 'Actualizar' : 'Crear' }} Curso
            </button>
            <button type="button" class="btn btn--secundario" @click="cancelar">
                Cancelar
            </button>
        </div>
    </form>
</template>

<script setup>
const props = defineProps({
    cursoInicial: Object
});

const emit = defineEmits(['guardar', 'cancelar']);

const esEdicion = computed(() => !!props.cursoInicial);

const formulario = reactive({
    titulo: props.cursoInicial?.titulo || '',
    profesor: props.cursoInicial?.profesor || '',
    creditos: props.cursoInicial?.creditos || 3,
    descripcion: props.cursoInicial?.descripcion || ''
});

const errores = reactive({
    titulo: '',
    profesor: '',
    creditos: '',
    descripcion: ''
});

const validar = () => {
    errores.titulo = '';
    errores.profesor = '';
    errores.creditos = '';
    errores.descripcion = '';

    let esValido = true;

    if (!formulario.titulo.trim() || formulario.titulo.length < 3) {
        errores.titulo = 'El título debe tener al menos 3 caracteres';
        esValido = false;
    }

    if (!formulario.profesor.trim() || formulario.profesor.length < 3) {
        errores.profesor = 'El profesor debe tener al menos 3 caracteres';
        esValido = false;
    }

    if (formulario.creditos < 1 || formulario.creditos > 10) {
        errores.creditos = 'Los créditos deben estar entre 1 y 10';
        esValido = false;
    }

    if (!formulario.descripcion.trim() || formulario.descripcion.length < 10) {
        errores.descripcion = 'La descripción debe tener al menos 10 caracteres';
        esValido = false;
    }

    return esValido;
};

const enviarFormulario = () => {
    if (validar()) {
        emit('guardar', {
            titulo: formulario.titulo,
            profesor: formulario.profesor,
            creditos: formulario.creditos,
            descripcion: formulario.descripcion
        });
    }
};

const cancelar = () => {
    emit('cancelar');
};
</script>

<style scoped lang="scss">
.form-curso {
    background: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-grupo {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
        font-weight: 600;
        color: #1a1a2e;
    }

    input,
    textarea {
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

    textarea {
        resize: vertical;
    }
}

.error {
    color: #c62828;
    font-size: 0.875rem;
}

.form-acciones {
    display: flex;
    gap: 1rem;
    padding-top: 0.5rem;
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

        &:active {
            transform: scale(0.98);
        }
    }

    &--secundario {
        background: #e0e0e0;
        color: #1a1a2e;

        &:hover {
            background: #d0d0d0;
        }
    }
}
</style>
