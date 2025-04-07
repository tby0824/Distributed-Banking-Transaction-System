import jwtDecode from 'jwt-decode'
export const decodeToken = (token) => {
    try {
        return jwtDecode(token)
    } catch {
        return null
    }
}
