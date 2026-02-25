class AuthService {
    constructor() {
        this.userIdKey = 'userId';
    }

    saveUserId(userId) {
        localStorage.setItem(this.userIdKey, userId.toString());
    }

    getUserId() {
        return localStorage.getItem(this.userIdKey);
    }

    isAuthenticated() {
        return this.getUserId() !== null;
    }

    logout() {
        localStorage.removeItem(this.userIdKey);
    }

    redirectToLogin() {
        window.location.href = 'login.html';
    }

    redirectToHome() {
        window.location.href = 'index.html';
    }

    redirectToDashboard() {
        window.location.href = 'dashboard.html';
    }

    requireAuth() {
        if (!this.isAuthenticated()) {
            this.redirectToHome();
            return false;
        }
        return true;
    }

    requireGuest() {
        if (this.isAuthenticated()) {
            this.redirectToDashboard();
            return false;
        }
        return true;
    }
}

window.AuthService = AuthService;