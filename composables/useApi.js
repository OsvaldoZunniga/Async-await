export function useApi(url) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchData() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com${url}`)
      if (!res.ok) throw new Error(`Error ${res.status}`)
      data.value = await res.json()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  fetchData()
  return { data, loading, error, reload: fetchData }
}