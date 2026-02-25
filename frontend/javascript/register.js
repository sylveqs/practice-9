document.addEventListener('DOMContentLoaded', function() {
    const authService = new AuthService();
    const apiService = new ApiService();
    
    authService.requireGuest();
    
    const registerForm = document.getElementById('registerForm');
    
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = registerForm.querySelector('button[type="submit"]');
        const messageDiv = document.getElementById('message');
        
        const formData = {
            username: document.getElementById('username').value.trim(),
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value
        };
        
        UIUtils.clearMessage('message');
        
        const usernameError = UIUtils.validateUsername(formData.username);
        if (usernameError) {
            UIUtils.showMessage('message', usernameError, 'error');
            return;
        }
        
        if (!UIUtils.isValidEmail(formData.email)) {
            UIUtils.showMessage('message', 'Введите корректный email', 'error');
            return;
        }
        
        const passwordError = UIUtils.validatePassword(formData.password);
        if (passwordError) {
            UIUtils.showMessage('message', passwordError, 'error');
            return;
        }
        
        if (formData.password !== formData.confirmPassword) {
            UIUtils.showMessage('message', 'Пароли не совпадают!', 'error');
            return;
        }
        
        UIUtils.setButtonLoading(submitButton, true);
        UIUtils.disableForm('registerForm', true);
        
        try {
            const response = await apiService.register({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            
            authService.saveUserId(response.userId);
            UIUtils.showMessage('message', 'Регистрация прошла успешно! Перенаправление...', 'success');
            
            await UIUtils.delay(1500);
            authService.redirectToDashboard();
            
        } catch (error) {
            UIUtils.showMessage('message', error.message, 'error');
        } finally {
            UIUtils.setButtonLoading(submitButton, false);
            UIUtils.disableForm('registerForm', false);
        }
    });
});