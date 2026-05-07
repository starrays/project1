document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const packageSelect = document.getElementById('packageSelect');
    const durationSelect = document.getElementById('rentalDuration');
    const summaryContainer = document.getElementById('bookingSummary');
    const alertBox = document.getElementById('bookingAlert');

    // 1. DATA KENDARAAN
    const RENT_PACKAGES = [
        { id: 'avanza', name: 'TOYOTA AVANZA', price: 300000, img: 'avanza.jpeg', type: 'City Car' },
        { id: 'innova', name: 'TOYOTA INNOVA', price: 500000, img: 'innova.jpeg', type: 'MPV Premium' },
        { id: 'hiace', name: 'TOYOTA HIACE', price: 950000, img: 'toyota hiace.jpeg', type: 'Eksekutif' },
        { id: 'vario', name: 'HONDA VARIO 125', price: 85000, img: 'honda vario.jpeg', type: 'Motor Matic' },
        { id: 'nmax', name: 'YAMAHA NMAX 155', price: 100000, img: 'yamaha nmax.jpeg', type: 'Maxi Motor' },
        { id: 'crf', name: 'HONDA CRF 450X', price: 250000, img: 'honda CRF 450X.jpeg', type: 'Adventure' }
    ];

    // 2. ISI DROPDOWN
    RENT_PACKAGES.forEach(pkg => {
        const opt = document.createElement('option');
        opt.value = pkg.id;
        opt.textContent = `${pkg.name} - Rp ${pkg.price.toLocaleString('id-ID')}`;
        packageSelect.appendChild(opt);
    });

    // 3. TANGKAP PARAMETER URL DARI HALAMAN LAYANAN (Auto-Select)
    const urlParams = new URLSearchParams(window.location.search);
    const selectedUnit = urlParams.get('unit');
    if (selectedUnit) {
        packageSelect.value = selectedUnit;
    }

    // 4. UPDATE RINGKASAN HARGA
    function updateSummary() {
        const pkg = RENT_PACKAGES.find(p => p.id === packageSelect.value);
        const days = parseInt(durationSelect.value) || 0;
        if (pkg && days > 0) {
            const total = pkg.price * days;
            summaryContainer.innerHTML = `
                <div class="summary-row" style="display:flex;justify-content:space-between;margin-bottom:10px;">
                    <span style="color:var(--muted)">Unit:</span><span>${pkg.name}</span>
                </div>
                <div class="summary-row" style="display:flex;justify-content:space-between;margin-bottom:10px;">
                    <span style="color:var(--muted)">Durasi:</span><span>${days} Hari</span>
                </div>
                <div style="border-top:1px dashed var(--border);padding-top:10px;margin-top:10px;display:flex;justify-content:space-between;align-items:center;">
                    <span style="font-weight:700">Total:</span><span style="color:var(--brand);font-weight:800;font-size:1.2rem">Rp ${total.toLocaleString('id-ID')}</span>
                </div>`;
        } else {
            summaryContainer.innerHTML = `<p class="text-muted small text-center my-4">Pilih kendaraan dan durasi di samping untuk melihat rincian harga.</p>`;
        }
    }
    
    packageSelect.onchange = updateSummary;
    durationSelect.onchange = updateSummary;
    
    // Panggil sekali saat load (jika auto-select aktif)
    updateSummary(); 

    // 5. LOGIKA SIMPAN DATA (SUBMIT)
    if (bookingForm) {
        bookingForm.onsubmit = function(e) {
            e.preventDefault();

            // Cek Login (Pengecekan ganda selain ceklogin.js)
            if (localStorage.getItem('isLoggedIn') !== 'true') {
                alertBox.style.display = 'block';
                alertBox.className = 'alert error';
                alertBox.innerHTML = 'Gagal! Anda harus login terlebih dahulu.';
                window.scrollTo(0, 0);
                setTimeout(() => window.location.href = 'login.html', 2000);
                return;
            }

            // Buat Kode Booking Acak (BGIDN-XXXX)
            const randomID = Math.floor(1000 + Math.random() * 9000);
            const bookingCode = "BGIDN-" + randomID;

            // Ambil Paket Kendaraan
            const pkg = RENT_PACKAGES.find(p => p.id === packageSelect.value);

            // Objek Data Booking
            const newOrder = {
                code: bookingCode,
                statusIndex: 1, // Default: Konfirmasi
                customer: document.getElementById('customerName').value,
                vehicle: { name: pkg.name, type: pkg.type, img: pkg.img },
                date: document.getElementById('rentalDate').value,
                time: document.getElementById('rentalTime').value,
                pickup: document.getElementById('pickupLocation').value,
                destination: document.getElementById('destination').value,
                total: pkg.price * parseInt(durationSelect.value),
                duration: durationSelect.value + " Hari"
            };

            // Simpan ke "Database" (LocalStorage)
            let allOrders = JSON.parse(localStorage.getItem('easygo_orders')) || [];
            allOrders.push(newOrder);
            localStorage.setItem('easygo_orders', JSON.stringify(allOrders));

            // Simpan yang terakhir untuk akses cepat
            localStorage.setItem('last_booking_code', bookingCode);

            // Tampilkan Pesan Berhasil
            alertBox.style.display = 'block';
            alertBox.className = 'alert success';
            alertBox.innerHTML = `<strong>Berhasil!</strong> Kode Lacak Anda: <span style="font-size:1.2rem">${bookingCode}</span>. Mengalihkan ke halaman Tracking...`;
            window.scrollTo(0,0);

            // Redirect ke halaman tracking setelah 2 detik
            setTimeout(() => {
                window.location.href = 'tracking.html';
            }, 2500);
        };
    }
});