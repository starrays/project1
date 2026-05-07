document.addEventListener('DOMContentLoaded', function() {
    const sidebarAuth = document.getElementById('sidebar-auth');
    const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('currentUser') || 'Pengguna';

    // --- PROTEKSI HALAMAN BOOKING ---
    const currentPage = window.location.pathname.split("/").pop();
    
    if (currentPage === 'booking.html' && !isUserLoggedIn) {
        alert('Akses Ditolak! Anda harus login terlebih dahulu untuk melakukan pemesanan.');
        window.location.href = 'login.html';
        return; 
    }

    // --- UBAH UI SIDEBAR JIKA SUDAH LOGIN ---
    if (isUserLoggedIn && sidebarAuth) {
        // Area ini sekarang HANYA mengganti tombol auth dengan kartu profil.
        // Teks copyright dihapus dari sini agar tidak tercetak ganda.
        sidebarAuth.innerHTML = `
            <div class="profile-card p-3 rounded-4" style="background: var(--input-bg); border: 1px solid var(--border);">
                <div class="d-flex align-items-center gap-3 mb-3">
                    <div class="bg-brand-light rounded-circle d-flex align-items-center justify-content-center" style="width: 45px; height: 45px; background: rgba(59, 130, 246, 0.15);">
                        <i class="bi bi-person-fill text-brand fs-4" style="color: var(--brand);"></i>
                    </div>
                    <div class="overflow-hidden">
                        <h6 class="mb-0 text-white fw-bold text-truncate">${username}</h6>
                        <small class="text-muted" style="font-size: 11px;">Member Terverifikasi</small>
                    </div>
                </div>
                <div class="d-flex flex-column gap-2">
                    <a href="tracking.html" class="btn btn-sm btn-outline-brand text-start border-0 py-2" style="font-size: 13px;">
                        <i class="bi bi-clock-history me-2"></i>Riwayat Sewa
                    </a>
                    <button class="btn btn-sm btn-outline-danger text-start border-0 py-2" id="logoutBtn" style="font-size: 13px; color: #F87171;">
                        <i class="bi bi-box-arrow-right me-2"></i>Keluar Akun
                    </button>
                </div>
            </div>
        `;
        
        document.getElementById('logoutBtn').addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            alert('Anda telah berhasil keluar.');
            window.location.href = 'index.html'; 
        });
    }
});