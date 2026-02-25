class ApiService {
    constructor() {
        this.baseUrl = 'http://localhost:8000';
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.detail || 'Ошибка запроса');
            }
            
            return data;
        } catch (error) {
            if (error.name === 'TypeError') {
                throw new Error('Ошибка соединения с сервером');
            }
            throw error;
        }
    }

    async register(userData) {
        return this.request('/api/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    async login(credentials) {
        return this.request('/api/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    }

    async getUserInfo(userId) {
        return this.request(`/api/user/${userId}`, {
            method: 'GET'
        });
    }
}

window.ApiService = ApiService;