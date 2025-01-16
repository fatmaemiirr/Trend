const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const passwordFeedback = document.getElementById('password-feedback');
const registerButton = document.getElementById('register-button');

// Şifre kurallarını doğrulama fonksiyonu
function validatePassword(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isValidLength = password.length >= 8 && password.length <= 16;

  if (hasUpperCase && hasSpecialChar && isValidLength) {
    passwordFeedback.textContent = 'Successful';
    passwordFeedback.className = 'mt-2 text-sm text-green-500';
    registerButton.disabled = false;
    return true;
  } else {
    passwordFeedback.textContent = 'Unsuccessful';
    passwordFeedback.className = 'mt-2 text-sm text-red-500';
    registerButton.disabled = true;
    return false;
  }
}

// Şifre girişini kontrol et
passwordInput.addEventListener('input', (e) => {
  validatePassword(e.target.value);
});

// Form gönderme işlemi
document.getElementById('register-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (validatePassword(password)) {
    // Verileri localStorage'a kaydet
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    // Login sayfasına yönlendirme
    window.location.href = 'login.html';
  }
});

// İlk girişte register sayfasını kontrol et
document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    window.location.href = 'index.html';
  }
});

// Sign up butonuna tıklayınca login sayfasına yönlendirme
document.getElementById('sign-up').addEventListener('click', () => {
  window.location.href = 'login.html';
});