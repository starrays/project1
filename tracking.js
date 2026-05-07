document.addEventListener('DOMContentLoaded', function() {
    const trackBtn = document.getElementById('trackBtn');
    const latestBtn = document.getElementById('useLatestBooking');
    const input = document.getElementById('trackingCodeInput');
    const resultArea = document.getElementById('trackingResult');
    const emptyArea = document.getElementById('trackingEmpty');

    function renderTracking(booking) {
        if (!booking) return;

        if (booking.statusIndex === 1 && !booking.paymentMethod && !booking.isFinished) {
            booking.statusIndex = 0;
        }

        emptyArea.classList.add('hidden');
        resultArea.classList.remove('hidden');

        const statuses = ['Pembayaran', 'Konfirmasi', 'Disiapkan', 'Dijemput', 'Selesai'];
        const stepProgress = (booking.statusIndex / (statuses.length - 1)) * 100;
        
        const stepperHtml = statuses.map((s, i) => `
            <div class="step-item ${i < booking.statusIndex ? 'done' : ''} ${i === booking.statusIndex ? 'active' : ''}">
                <div class="step-dot">${i < booking.statusIndex || booking.isFinished ? '<i class="bi bi-check"></i>' : i + 1}</div>
                <div class="step-label">${s}</div>
            </div>
        `).join('');
        
        document.getElementById('statusStepper').innerHTML = `
            <div class="progress-line" id="stepperLine" style="width: ${stepProgress}%"></div>
            ${stepperHtml}
        `;

        document.getElementById('trackingVehicle').innerHTML = `
            <div class="p-3 rounded-4 border border-secondary text-center h-100 d-flex flex-column justify-content-center" style="background:var(--input-bg)">
                <img src="${booking.vehicle.img}" class="img-fluid rounded-3 mb-3 mx-auto" style="height:120px; width:100%; object-fit:cover; border: 1px solid var(--border);">
                <h6 class="mb-1 fw-bold">${booking.vehicle.name}</h6>
                <span class="badge bg-brand-light text-brand px-3 mx-auto" style="font-size:11px">${booking.vehicle.type}</span>
            </div>`;

        let paymentStatusHtml = '';
        if (booking.statusIndex === 0) {
            paymentStatusHtml = `<strong class="text-warning"><i class="bi bi-hourglass-split me-1"></i> Menunggu Pembayaran</strong>`;
        } else {
            paymentStatusHtml = `<strong class="text-success"><i class="bi bi-shield-check me-1"></i> Lunas Tertagih (${booking.paymentMethod || '-'})</strong>`;
        }

        document.getElementById('trackingPayment').innerHTML = `
            <div class="detail-mini">
                <small>Kode Referensi</small>
                <strong class="text-white mb-3 d-block">${booking.code}</strong>
                <small>Total Tagihan</small>
                <h4 class="text-brand fw-bolder mb-3">Rp ${booking.total.toLocaleString('id-ID')}</h4>
                <small>Status Pembayaran</small>
                ${paymentStatusHtml}
            </div>`;

        const paymentBlock = document.getElementById('paymentActionBlock');
        const progressBlock = document.getElementById('progressActionBlock');
        const nextProgressBtn = document.getElementById('nextProgressBtn');
        const finishBadge = document.getElementById('finishBadge');

        paymentBlock.classList.add('hidden');
        progressBlock.classList.add('hidden');
        finishBadge.classList.add('hidden');

        if (booking.isFinished || booking.statusIndex === 4) {
            finishBadge.classList.remove('hidden');
        } else if (booking.statusIndex === 0) {
            paymentBlock.classList.remove('hidden');
        } else if (booking.statusIndex >= 1 && booking.statusIndex < 4) {
            progressBlock.classList.remove('hidden');
            
            if (booking.statusIndex === 1) {
                nextProgressBtn.innerHTML = 'Kirim Perintah: Siapkan Kendaraan';
                nextProgressBtn.className = 'btn btn-outline-brand w-100 fw-bold py-2';
            } else if (booking.statusIndex === 2) {
                nextProgressBtn.innerHTML = 'Kirim Perintah: Jemput Penumpang';
                nextProgressBtn.className = 'btn btn-outline-brand w-100 fw-bold py-2';
            } else if (booking.statusIndex === 3) {
                nextProgressBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Selesaikan Pesanan';
                nextProgressBtn.className = 'btn btn-success w-100 fw-bold py-2';
            }
        }

        document.getElementById('trackingDetails').innerHTML = `
            <div class="row g-3">
                <div class="col-6">
                    <div class="detail-mini"><small>Nama Penyewa</small><strong>${booking.customer}</strong></div>
                </div>
                <div class="col-6">
                    <div class="detail-mini"><small>Durasi Sewa</small><strong>${booking.duration}</strong></div>
                </div>
                <div class="col-12">
                    <div class="detail-mini"><small>Destinasi Utama / Tujuan</small><strong>${booking.destination}</strong></div>
                </div>
                <div class="col-12">
                    <div class="detail-mini"><small>Waktu & Titik Penjemputan</small><strong>${booking.date} (${booking.time} WIB) - ${booking.pickup}</strong></div>
                </div>
            </div>`;

        const fillWidth = stepProgress; 
        setTimeout(() => {
            document.getElementById('routeFill').style.width = fillWidth + '%';
            document.getElementById('carMarker').style.left = `calc(15% + (70% * ${fillWidth / 100}))`;
        }, 100);

        const mapNote = document.getElementById('mapNote');
        if (booking.isFinished || booking.statusIndex === 4) {
            mapNote.className = "alert border-0 bg-success bg-opacity-10 text-success mb-0 d-flex align-items-center";
            mapNote.innerHTML = `<i class="bi bi-check-circle-fill me-3 fs-4"></i> <span>Pesanan telah diselesaikan. Kendaraan telah dikembalikan ke pool EasyGo.</span>`;
        } else if (booking.statusIndex === 0) {
            mapNote.className = "alert border-0 bg-warning bg-opacity-10 text-warning mb-0 d-flex align-items-center";
            mapNote.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-3 fs-4"></i> <span>Menunggu pelunasan. Unit akan segera diproses setelah pembayaran diterima.</span>`;
        } else {
            mapNote.className = "alert border-0 bg-brand-light text-brand mb-0 d-flex align-items-center";
            mapNote.innerHTML = `<i class="bi bi-info-circle-fill me-3 fs-4"></i> <span>Status saat ini: Unit dalam proses <strong>${statuses[booking.statusIndex]}</strong>. Tim kami sedang bekerja.</span>`;
        }
    }

    function processTrackingCall(code) {
        let allOrders = JSON.parse(localStorage.getItem('easygo_orders')) || [];
        const foundIndex = allOrders.findIndex(o => o.code === code);

        if (foundIndex !== -1) {
            resultArea.style.opacity = '0';
            setTimeout(() => {
                renderTracking(allOrders[foundIndex]);
                resultArea.style.opacity = '1';
                resultArea.style.transition = 'opacity 0.5s ease-in-out';
            }, 300);
        } else {
            alert('Kode Booking "' + code + '" tidak ditemukan di dalam sistem.');
        }
    }

    trackBtn.addEventListener('click', () => {
        const code = input.value.trim().toUpperCase();
        if(!code) {
            alert('Masukkan kode booking terlebih dahulu!');
            return;
        }
        processTrackingCall(code);
    });

    latestBtn.addEventListener('click', () => {
        const lastCode = localStorage.getItem('last_booking_code');
        if (lastCode) {
            input.value = lastCode;
            processTrackingCall(lastCode);
        } else {
            alert('Belum ada riwayat booking yang tersimpan di perangkat ini.');
        }
    });

    document.getElementById('confirmPayBtn').addEventListener('click', () => {
        const code = input.value.trim().toUpperCase();
        const selectedMethod = document.querySelector('input[name="payMethod"]:checked').value;
        
        let allOrders = JSON.parse(localStorage.getItem('easygo_orders')) || [];
        let index = allOrders.findIndex(o => o.code === code);
        
        if (index !== -1) {
            allOrders[index].statusIndex = 1; 
            allOrders[index].paymentMethod = selectedMethod;
            localStorage.setItem('easygo_orders', JSON.stringify(allOrders));
            
            alert(`Pembayaran dengan ${selectedMethod} berhasil!`);
            renderTracking(allOrders[index]);
        }
    });

    document.getElementById('nextProgressBtn').addEventListener('click', () => {
        const code = input.value.trim().toUpperCase();
        
        let allOrders = JSON.parse(localStorage.getItem('easygo_orders')) || [];
        let index = allOrders.findIndex(o => o.code === code);
        
        if (index !== -1 && allOrders[index].statusIndex < 4) {
            allOrders[index].statusIndex += 1; // Maju 1 langkah
            
            if (allOrders[index].statusIndex === 4) {
                allOrders[index].isFinished = true; // Tandai selesai
                alert('Pesanan berhasil diselesaikan. Terima kasih telah mempercayakan perjalanan Anda bersama EasyGo!');
            }
            
            localStorage.setItem('easygo_orders', JSON.stringify(allOrders));
            renderTracking(allOrders[index]); 
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const codeFromURL = urlParams.get('code');
    if (codeFromURL) {
        input.value = codeFromURL;
        processTrackingCall(codeFromURL);
    }
});