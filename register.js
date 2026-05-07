document.getElementById("registerform").addEventListener("submit", function(event) {
    let isValid = true;

    // Fungsi bantuan untuk menampilkan error individu
    function setFieldError(fieldId, errorMessage) {
        const inputEl = document.getElementById(fieldId);
        const errorEl = document.getElementById("error-" + fieldId);

        if (errorMessage) {
            if (inputEl) inputEl.classList.add("input-error");
            if (errorEl) {
                errorEl.innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> ${errorMessage}`;
                errorEl.classList.remove("hidden");
            }
            isValid = false;
        } else {
            if (inputEl) inputEl.classList.remove("input-error");
            if (errorEl) {
                errorEl.classList.add("hidden");
                errorEl.innerHTML = "";
            }
        }
    }

    // Ambil nilai dari setiap form
    let nama = document.getElementById("nama").value.trim();
    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let nohp = document.getElementById("nohp").value.trim();
    let password = document.getElementById("password").value;
    let confirmpassword = document.getElementById("confirmpassword").value;
    let tanggal = document.getElementById("tanggal").value;
    let gender = document.querySelector('input[name="gender"]:checked');
    let foto = document.getElementById("foto").files[0];
    let alamat = document.getElementById("alamat").value.trim();
    let setuju = document.getElementById("setuju").checked;

    // 1. VALIDASI NAMA
    if (nama === "" || nama.length < 3) {
        setFieldError("nama", "Nama minimal 3 karakter");
    } else {
        setFieldError("nama", "");
    }

    // 2. VALIDASI USERNAME
    let existingusers = ["admin", "user1"];
    let userpattern = /^[a-zA-Z0-9]+$/;
    if (username === "") {
        setFieldError("username", "Username tidak boleh kosong");
    } else if (!username.match(userpattern)) {
        setFieldError("username", "Hanya huruf & angka tanpa spasi");
    } else if (existingusers.includes(username)) {
        setFieldError("username", "Username sudah digunakan");
    } else {
        setFieldError("username", "");
    }

    // 3. VALIDASI EMAIL
    let emailpattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,3}$/;
    if (email === "") {
        setFieldError("email", "Email tidak boleh kosong");
    } else if (!email.match(emailpattern)) {
        setFieldError("email", "Format email tidak valid");
    } else {
        setFieldError("email", "");
    }

    // 4. VALIDASI NO HP
    let hpPattern = /^[0-9]{10,13}$/;
    if (nohp === "") {
        setFieldError("nohp", "No HP tidak boleh kosong");
    } else if (!nohp.match(hpPattern)) {
        setFieldError("nohp", "Harus 10-13 digit angka");
    } else {
        setFieldError("nohp", "");
    }

    // 5. VALIDASI PASSWORD
    if (password === "") {
        setFieldError("password", "Password tidak boleh kosong");
    } else if (password.length < 8) {
        setFieldError("password", "Minimal 8 karakter");
    } else {
        setFieldError("password", "");
    }

    // 6. VALIDASI KONFIRMASI PASSWORD
    if (confirmpassword === "") {
        setFieldError("confirmpassword", "Konfirmasi password tidak boleh kosong");
    } else if (password !== confirmpassword) {
        setFieldError("confirmpassword", "Password tidak cocok");
    } else {
        setFieldError("confirmpassword", "");
    }

    // 7. VALIDASI TANGGAL LAHIR & HITUNG UMUR OTOMATIS
    if (tanggal === "") {
        setFieldError("tanggal", "Tanggal lahir wajib diisi");
    } else {
        let today = new Date();
        let inputdate = new Date(tanggal);
        
        if (inputdate > today) {
            setFieldError("tanggal", "Tanggal lahir tidak valid (di masa depan)");
        } else {
            // Kalkulasi Umur Presisi
            let age = today.getFullYear() - inputdate.getFullYear();
            let m = today.getMonth() - inputdate.getMonth();
            
            if (m < 0 || (m === 0 && today.getDate() < inputdate.getDate())) {
                age--;
            }

            // Pengecekan syarat 17 - 60 tahun
            if (age < 17 || age > 60) {
                setFieldError("tanggal", `Umur Anda terhitung ${age} tahun. Syarat pendaftaran adalah 17 - 60 tahun.`);
            } else {
                setFieldError("tanggal", "");
            }
        }
    }

    // 8. VALIDASI JENIS KELAMIN
    if (!gender) {
        setFieldError("gender", "Pilih jenis kelamin");
    } else {
        setFieldError("gender", "");
    }

    // 9. VALIDASI FOTO KTP/KK
    if (foto) {
        let allowed = ["image/jpeg", "image/png"];
        if (!allowed.includes(foto.type)) {
            setFieldError("foto", "Format harus JPG/PNG");
        } else if (foto.size > 1000000) {
            setFieldError("foto", "Ukuran file maksimal 1MB");
        } else {
            setFieldError("foto", "");
        }
    } else {
        setFieldError("foto", "Silakan upload foto identitas");
    }

    // 10. VALIDASI ALAMAT
    if (alamat === "") {
        setFieldError("alamat", "Masukkan alamat domisili");
    } else {
        setFieldError("alamat", "");
    }

    // 11. VALIDASI PERSETUJUAN
    if (!setuju) {
        setFieldError("setuju", "Anda harus menyetujui syarat & ketentuan");
    } else {
        setFieldError("setuju", "");
    }

    // CEK KESELURUHAN FORM SEBELUM SUBMIT
    if (!isValid) {
        event.preventDefault(); // Hentikan proses jika ada error
    } else {
        event.preventDefault(); // Mencegah form reload halaman default
        
        // Simpan username ke lokal (opsional, agar saat login otomatis ada data, tapi simulasi saja)
        alert("Registrasi berhasil! Silakan login dengan akun baru Anda.");
        window.location.href = "login.html"; // Redirect ke halaman login via JavaScript
    }
});