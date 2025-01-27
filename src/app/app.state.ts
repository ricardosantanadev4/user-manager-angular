export class AppState {

    private tokenKey = 'authToken';

    // get token(): string {
    //     return sessionStorage.getItem(this.tokenKey) || '';
    // }

    get token(): string | null {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('token');
        }
        return null; // Ou um valor padrão apropriado
    }

    set token(token: string) {
        if (token) {
            sessionStorage.setItem(this.tokenKey, token);
        } else {
            sessionStorage.removeItem(this.tokenKey);
        }
    }

    clearToken() {
        sessionStorage.removeItem(this.tokenKey);
    }
}