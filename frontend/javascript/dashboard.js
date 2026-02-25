document.addEventListener('DOMContentLoaded', function() {
    const authService = new AuthService();
    const apiService = new ApiService();
    
    if (!authService.requireAuth()) {
        return;
    }
    
    const userId = authService.getUserId();
    document.getElementById('userIdDisplay').textContent = userId;
    
    loadUserInfo(userId);
    
    window.logout = function() {
        if (confirm('Вы уверены, что хотите выйти из библиотеки?')) {
            authService.logout();
            authService.redirectToHome();
        }
    };
    
    async function loadUserInfo(userId) {
        try {
            const userInfo = await apiService.getUserInfo(userId);
            
            const usernameElement = document.getElementById('usernameDisplay');
            const emailElement = document.getElementById('emailDisplay');
            
            if (usernameElement) {
                usernameElement.textContent = userInfo.username;
            }
            if (emailElement) {
                emailElement.textContent = userInfo.email;
            }
            
        } catch (error) {
            console.error('Ошибка загрузки информации о читателе:', error);
        }
    }
});