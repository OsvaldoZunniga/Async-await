const STORAGE_KEY = 'nuxt_cursos_app';
const FAVORITES_KEY = 'nuxt_cursos_favoritos';

// Datos por defecto
const datosDefault = [
    {
        id: 1,
        titulo: 'Introducción a la Programación',
        profesor: 'Dr. Juan Pérez',
        creditos: 3,
        descripcion: 'Aprende los fundamentos de la programación utilizando Python.'
    },
    {
        id: 2,
        titulo: 'Estructuras de Datos',
        profesor: 'Dra. María Gómez',
        creditos: 4,
        descripcion: 'Explora las estructuras de datos comunes y su implementación en Java.'
    },
    {
        id: 3,
        titulo: 'Desarrollo Web',
        profesor: 'Ing. Carlos Rodríguez',
        creditos: 3,
        descripcion: 'Crea aplicaciones web modernas utilizando HTML, CSS y JavaScript.'
    }
];

const cursos = ref([...datosDefault]);
const favoritos = ref(new Set());
const datosHidratados = ref(false);

// Cargar datos desde localStorage o usar valores por defecto
function cargarDatos() {
    if (process.client) {
        try {
            const datosGuardados = localStorage.getItem(STORAGE_KEY);
            const favoritosGuardados = localStorage.getItem(FAVORITES_KEY);
            
            cursos.value = datosGuardados ? JSON.parse(datosGuardados) : [...datosDefault];
            favoritos.value = new Set(favoritosGuardados ? JSON.parse(favoritosGuardados) : []);
        } catch (error) {
            console.error('Error al cargar datos de localStorage:', error);
            cursos.value = [...datosDefault];
            favoritos.value = new Set();
        }
    }
}

// Guardar cursos en localStorage
function guardarCursos() {
    if (process.client) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cursos.value));
        } catch (error) {
            console.error('Error al guardar cursos:', error);
        }
    }
}

// Guardar favoritos en localStorage
function guardarFavoritos() {
    if (process.client) {
        try {
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favoritos.value)));
        } catch (error) {
            console.error('Error al guardar favoritos:', error);
        }
    }
}

export function useCursos() {
    // Cargar localStorage tras el montaje para evitar mismatches de hidratacion.
    if (process.client && !datosHidratados.value) {
        onMounted(() => {
            if (!datosHidratados.value) {
                cargarDatos();
                datosHidratados.value = true;
            }
        });
    }

    const filtros = reactive({
        busqueda: '',
        creditoMin: 0,
        creditoMax: 10,
        profesor: '',
        ordenamiento: 'ninguno'
    });

    const obtenerProfesores = computed(() => {
        return [...new Set(cursos.value.map(c => c.profesor))].sort();
    });

    const cursosFiltrados = computed(() => {
        let resultado = cursos.value.filter(curso => {
            // Filtro de búsqueda
            const coincideBusqueda = curso.titulo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                curso.descripcion.toLowerCase().includes(filtros.busqueda.toLowerCase());

            // Filtro de créditos
            const coincideCreditos = curso.creditos >= filtros.creditoMin && curso.creditos <= filtros.creditoMax;

            // Filtro de profesor
            const coincideProfesor = !filtros.profesor || curso.profesor === filtros.profesor;

            return coincideBusqueda && coincideCreditos && coincideProfesor;
        });

        // Ordenamiento
        if (filtros.ordenamiento === 'az') {
            resultado.sort((a, b) => a.titulo.localeCompare(b.titulo));
        } else if (filtros.ordenamiento === 'za') {
            resultado.sort((a, b) => b.titulo.localeCompare(a.titulo));
        } else if (filtros.ordenamiento === 'creditos-asc') {
            resultado.sort((a, b) => a.creditos - b.creditos);
        } else if (filtros.ordenamiento === 'creditos-desc') {
            resultado.sort((a, b) => b.creditos - a.creditos);
        }

        return resultado;
    });

    const cursosFavoritos = computed(() => {
        return cursosFiltrados.value.filter(c => favoritos.value.has(c.id));
    });

    const contadorFavoritos = computed(() => favoritos.value.size);

    const obtenerPorId = (id) => {
        return cursos.value.find(c => c.id === id);
    };

    const crearCurso = (curso) => {
        const nuevoId = Math.max(...cursos.value.map(c => c.id), 0) + 1;
        const nuevoCurso = { ...curso, id: nuevoId };
        cursos.value.push(nuevoCurso);
        guardarCursos();
        return nuevoCurso;
    };

    const actualizarCurso = (id, datosActualizados) => {
        const indice = cursos.value.findIndex(c => c.id === id);
        if (indice !== -1) {
            cursos.value[indice] = { ...cursos.value[indice], ...datosActualizados };
            guardarCursos();
            return cursos.value[indice];
        }
        return null;
    };

    const eliminarCurso = (id) => {
        const indice = cursos.value.findIndex(c => c.id === id);
        if (indice !== -1) {
            cursos.value.splice(indice, 1);
            favoritos.value.delete(id);
            guardarCursos();
            guardarFavoritos();
            return true;
        }
        return false;
    };

    const toggleFavorito = (id) => {
        if (favoritos.value.has(id)) {
            favoritos.value.delete(id);
        } else {
            favoritos.value.add(id);
        }
        guardarFavoritos();
    };

    const esFavorito = (id) => {
        return favoritos.value.has(id);
    };

    const limpiarFiltros = () => {
        filtros.busqueda = '';
        filtros.creditoMin = 0;
        filtros.creditoMax = 10;
        filtros.profesor = '';
        filtros.ordenamiento = 'ninguno';
    };

    return {
        cursos,
        filtros,
        cursosFiltrados,
        cursosFavoritos,
        contadorFavoritos,
        obtenerProfesores,
        obtenerPorId,
        crearCurso,
        actualizarCurso,
        eliminarCurso,
        toggleFavorito,
        esFavorito,
        limpiarFiltros,
        cargarDatos
    };
}
