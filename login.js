document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); 

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let errorContainer = document.getElementById("errorMessage");

    function showError(message) {
        errorContainer.innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> ${message}`;
        errorContainer.classList.remove("hidden");
        errorContainer.style.display = "block"; // Memastikan terlihat
    }

    function hideError() {
        errorContainer.classList.add("hidden");
        errorContainer.style.display = "none";
    }

    hideError();

    // Validasi Sederhana
    if (username === "" || password === "") {
        showError("Username dan password wajib diisi!");
        return;
    }

    if (password.length < 8) {
        showError("Password minimal 8 karakter!");
        return;
    }

    // --- PROSES LOGIN BERHASIL ---
    // Menyimpan status login ke memori browser
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', username);

    alert("Login berhasil! Selamat datang, " + username + ".");
    
    // Redirect ke Beranda
    window.location.href = "index.html"; 
});