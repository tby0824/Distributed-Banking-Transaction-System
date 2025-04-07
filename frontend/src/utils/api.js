export const apiFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token')
    const headers = options.headers || {}
    if (token) headers['Authorization'] = `Bearer ${token}`
    options.headers = headers

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)
    options.signal = controller.signal

    try {
        const response = await fetch(url, options)
        clearTimeout(timeoutId)
        const contentType = response.headers.get('content-type') || ''
        let payload
        if (contentType.includes('application/json')) payload = await response.json()
        else payload = await response.text()
        if (!response.ok) {
            if (typeof payload === 'object' && payload.error) throw new Error(payload.error)
            throw new Error(payload)
        }
        return payload
    } catch (err) {
        clearTimeout(timeoutId)
        if (err.name === 'AbortError') throw new Error('Request timed out')
        throw err
    }
}
