document.addEventListener('DOMContentLoaded', function() {
    const authService = new AuthService();
    const apiService = new ApiService();
    
    authService.requireGuest();
    
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = loginForm.querySelector('button[type="submit"]');
        
        const formData = {
            username: document.getElementById('username').value.trim(),
            password: document.getElementById('password').value
        };
        
        UIUtils.clearMessage('message');
        
        if (!formData.username || !formData.password) {
            UIUtils.showMessage('message', 'Заполните все поля', 'error');
            return;
        }
        
        UIUtils.setButtonLoading(submitButton, true);
        UIUtils.disableForm('loginForm', true);
        
        try {
            const response = await apiService.login({
                username: formData.username,
                password: formData.password
            });
            
            authService.saveUserId(response.userId);
            UIUtils.showMessage('message', 'Добро пожаловать в библиотеку! Перенаправление...', 'success');
            
            await UIUtils.delay(1500);
            authService.redirectToDashboard();
            
        } catch (error) {
            UIUtils.showMessage('message', error.message, 'error');
        } finally {
            UIUtils.setButtonLoading(submitButton, false);
            UIUtils.disableForm('loginForm', false);
        }
    });
});