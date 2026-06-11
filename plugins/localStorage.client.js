export default defineNuxtPlugin(() => {
  // Cargar datos de localStorage al inicializar la app
  if (process.client) {
    const STORAGE_KEY = 'nuxt_cursos_app';
    const FAVORITES_KEY = 'nuxt_cursos_favoritos';
    
    // Verificar si hay datos en localStorage y cargarlos
    try {
      const datosGuardados = localStorage.getItem(STORAGE_KEY);
      const favoritosGuardados = localStorage.getItem(FAVORITES_KEY);
      
      if (datosGuardados) {
        console.log('Datos cargados desde localStorage');
      }
      if (favoritosGuardados) {
        console.log('Favoritos cargados desde localStorage');
      }
    } catch (error) {
      console.error('Error al cargar datos en plugin:', error);
    }
  }
});
