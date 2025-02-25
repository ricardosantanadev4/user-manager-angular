export class AppState {

    private tokenKey = 'authToken';

    get token(): string {
        return sessionStorage.getItem(this.tokenKey) || '';
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