document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Login ekranındaki input alanlarını al
  const usernameInput = document.getElementById('username').value;
  const passwordInput = document.getElementById('password').value;
  const feedback = document.getElementById('login-feedback');

  // Local storage'dan kayıtlı kullanıcı adı ve şifreyi al
  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  // Kullanıcı adı ve şifre doğrulama
  if (usernameInput === storedUsername && passwordInput === storedPassword) {
    // Başarılı giriş, anasayfaya yönlendirme
    window.location.href = 'index.html';
  } else {
    // Başarısız giriş, hata mesajı göster
    feedback.textContent = 'Login failed. Username or password is incorrect.';
    feedback.className = 'mt-2 text-sm text-red-500';
  }
});
