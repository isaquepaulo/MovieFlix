const tokenKey = 'authData'

type LoginResponse = {
    access_token: string,
    token_type: string,
    refresh_token: string
    expires_in: number,
    scope: string,
    userName: string,
    userId: number

}

export const saveAuthData = (obj: LoginResponse) => {
    localStorage.setItem(tokenKey, JSON.stringify(obj));
}

export const getAuthData = () => {
    const str = localStorage.getItem(tokenKey) ?? "{}";
    const obj = JSON.parse(str);
    return obj as LoginResponse;
}

export const removeAuthData = () => {
    localStorage.removeItem(tokenKey);
}