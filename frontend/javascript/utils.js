class UIUtils {
    static showMessage(elementId, message, type = 'error') {
        const messageElement = document.getElementById(elementId);
        if (messageElement) {
            messageElement.innerHTML = `<div class="${type}">${message}</div>`;
        }
    }

    static clearMessage(elementId) {
        const messageElement = document.getElementById(elementId);
        if (messageElement) {
            messageElement.innerHTML = '';
        }
    }

    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validatePassword(password) {
        if (password.length < 6) {
            return 'Пароль должен содержать минимум 6 символов';
        }
        return null;
    }

    static validateUsername(username) {
        if (username.length < 3) {
            return 'Имя пользователя должно содержать минимум 3 символа';
        }
        if (username.length > 20) {
            return 'Имя пользователя не должно превышать 20 символов';
        }
        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            return 'Имя пользователя может содержать только буквы и цифры';
        }
        return null;
    }

    static disableForm(formId, disabled = true) {
        const form = document.getElementById(formId);
        if (form) {
            const inputs = form.querySelectorAll('input, button');
            inputs.forEach(input => {
                input.disabled = disabled;
            });
        }
    }

    static setButtonLoading(buttonElement, loading = true) {
        if (loading) {
            buttonElement.disabled = true;
            buttonElement.dataset.originalText = buttonElement.textContent;
            buttonElement.textContent = 'Загрузка...';
        } else {
            buttonElement.disabled = false;
            buttonElement.textContent = buttonElement.dataset.originalText || buttonElement.textContent;
        }
    }

    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

window.UIUtils = UIUtils;