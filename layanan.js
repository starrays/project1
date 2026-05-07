// Data kendaraan
const vehicles = {
  // ── MOBIL ──
  avanza: {
    name: 'TOYOTA AVANZA',
    sub: 'Cocok untuk kebutuhan harian dan perjalanan keluarga kecil',
    type: 'City Car',
    typeColor: 'var(--brand)',
    img: 'avanza.jpeg',
    specs: [
      { icon: 'bi-people-fill',    val: '4–7',       lbl: 'Penumpang' },
      { icon: 'bi-gear-fill',      val: 'Manual/AT', lbl: 'Transmisi' },
      { icon: 'bi-fuel-pump-fill', val: 'Pertamax',  lbl: 'Bahan Bakar' },
      { icon: 'bi-bag-fill',       val: 'Luas',      lbl: 'Bagasi' },
    ],
    features: [
      { text: 'AC Dingin & Nyaman',             ok: true },
      { text: 'Asuransi Perjalanan',            ok: true },
      { text: 'GPS Tracker',                    ok: true },
      { text: 'Antar-Jemput Gratis (r. 15 km)', ok: true },
      { text: 'Sopir (Tambah Rp 150.000/hari)', ok: false },
    ],
    priceOld: 'Rp 400.000',
    price: 'Rp 300.000',
  },
  innova: {
    name: 'TOYOTA INNOVA',
    sub: 'MPV premium untuk perjalanan antarkota dan wisata keluarga',
    type: 'MPV Premium',
    typeColor: 'var(--brand)',
    img: 'innova.jpeg',
    specs: [
      { icon: 'bi-people-fill',       val: '7–8',       lbl: 'Penumpang' },
      { icon: 'bi-gear-fill',         val: 'Automatic', lbl: 'Transmisi' },
      { icon: 'bi-fuel-pump-fill',    val: 'Pertamax',  lbl: 'Bahan Bakar' },
      { icon: 'bi-shield-check-fill', val: 'All Risk',  lbl: 'Asuransi' },
    ],
    features: [
      { text: 'AC Dingin & Nyaman',             ok: true },
      { text: 'Asuransi All Risk',              ok: true },
      { text: 'GPS Tracker',                    ok: true },
      { text: 'Antar-Jemput Gratis (r. 25 km)', ok: true },
      { text: 'Pilihan + Sopir (Rp 150.000/hari)', ok: true },
    ],
    priceOld: 'Rp 650.000',
    price: 'Rp 500.000',
  },
  hiace: {
    name: 'TOYOTA HIACE',
    sub: 'Kendaraan eksekutif untuk acara formal dan rombongan',
    type: 'Eksekutif',
    typeColor: 'var(--accent)', /* Orange */
    img: 'toyota hiace.jpeg',
    specs: [
      { icon: 'bi-people-fill',        val: '8–16',      lbl: 'Penumpang' },
      { icon: 'bi-gear-fill',          val: 'Manual/AT', lbl: 'Transmisi' },
      { icon: 'bi-fuel-pump-fill',     val: 'Diesel',    lbl: 'Bahan Bakar' },
      { icon: 'bi-camera-video-fill',  val: 'GPS+CCTV',  lbl: 'Keamanan' },
    ],
    features: [
      { text: 'AC Double Blower',               ok: true },
      { text: 'Sopir Profesional Termasuk',     ok: true },
      { text: 'Asuransi All Risk',              ok: true },
      { text: 'Antar-Jemput Gratis (r. 40 km)', ok: true },
      { text: 'Air Mineral + Charger USB',      ok: true },
    ],
    priceOld: 'Rp 1.200.000',
    price: 'Rp 950.000',
  },

  // ── MOTOR ──
  vario: {
    name: 'HONDA VARIO 125',
    sub: 'Pilihan paling hemat dan praktis untuk aktivitas harian',
    type: 'Motor Matic',
    typeColor: 'var(--brand)',
    img: 'honda vario.jpeg',
    specs: [
      { icon: 'bi-people-fill',       val: '2',      lbl: 'Penumpang' },
      { icon: 'bi-gear-fill',         val: 'Matic',  lbl: 'Transmisi' },
      { icon: 'bi-fuel-pump-fill',    val: 'Bensin', lbl: 'Bahan Bakar' },
      { icon: 'bi-shield-check-fill', val: 'Ya',     lbl: 'Asuransi' },
    ],
    features: [
      { text: '2 Helm SNI (Gratis)', ok: true },
      { text: 'Jas Hujan 1 Buah',    ok: true },
      { text: 'STNK & Asuransi',     ok: true },
      { text: 'Kunci Cadangan',      ok: true },
      { text: 'GPS Tracker',         ok: false },
    ],
    priceOld: 'Rp 120.000',
    price: 'Rp 85.000',
  },
  nmax: {
    name: 'YAMAHA NMAX 155',
    sub: 'Elegan dan cocok untuk aktivitas harian',
    type: 'Maxi Motor',
    typeColor: 'var(--brand)',
    img: 'yamaha nmax.jpeg',
    specs: [
      { icon: 'bi-people-fill',       val: '2',      lbl: 'Penumpang' },
      { icon: 'bi-gear-fill',         val: 'Matic',  lbl: 'Transmisi' },
      { icon: 'bi-fuel-pump-fill',    val: 'Bensin', lbl: 'Bahan Bakar' },
      { icon: 'bi-shield-check-fill', val: 'Ya',     lbl: 'Asuransi' },
    ],
    features: [
      { text: '2 Helm SNI (Gratis)', ok: true },
      { text: 'Jas Hujan 1 Buah',    ok: true },
      { text: 'STNK & Asuransi',     ok: true },
      { text: 'Kunci Cadangan',      ok: true },
      { text: 'GPS Tracker',         ok: false },
    ],
    priceOld: 'Rp 150.000',
    price: 'Rp 100.000',
  },
  crf: {
    name: 'HONDA CRF 450X',
    sub: 'Motor petualangan kelas atas untuk medan off-road dan wisata alam',
    type: 'Adventure',
    typeColor: 'var(--accent)', /* Orange */
    img: 'honda CRF 450X.jpeg',
    specs: [
      { icon: 'bi-people-fill',       val: '2',       lbl: 'Penumpang' },
      { icon: 'bi-gear-fill',         val: 'Manual',  lbl: 'Transmisi' },
      { icon: 'bi-fuel-pump-fill',    val: 'Bensin',  lbl: 'Bahan Bakar' },
      { icon: 'bi-shield-check-fill', val: 'All Risk',lbl: 'Asuransi' },
    ],
    features: [
      { text: 'Helm Full Face + Sarung Tangan', ok: true },
      { text: 'Jas Hujan 2 Buah',               ok: true },
      { text: 'Asuransi All Risk',              ok: true },
      { text: 'GPS Tracker + Box Belakang',     ok: true },
      { text: 'Peta Wisata Gratis',             ok: true },
    ],
    priceOld: 'Rp 320.000',
    price: 'Rp 250.000',
  },
};

// Fungsi membuka modal pop-up detail
// ... (Data vehicles Anda tetap sama)

function openDetail(key) {
  const v = vehicles[key];
  if (!v) return;

  document.getElementById('modalVehicleName').textContent = v.name;

  const imgWrap = document.getElementById('modalImgWrap');
  imgWrap.innerHTML = `
    <span class="badge-type" style="background:${v.typeColor};">${v.type}</span>
    <img src="${v.img}" alt="${v.name}">
  `;

  document.getElementById('modalSub').textContent = v.sub;

  const specsEl = document.getElementById('modalSpecs');
  specsEl.innerHTML = v.specs.map(s => `
    <div class="spec-item">
      <i class="bi ${s.icon}"></i>
      <div>
        <div class="spec-val">${s.val}</div>
        <div class="spec-lbl">${s.lbl}</div>
      </div>
    </div>
  `).join('');

  const featEl = document.getElementById('modalFeatures');
  featEl.innerHTML = v.features.map(f => `
    <li class="${f.ok ? '' : 'no'}">
      <i class="bi ${f.ok ? 'bi-check-circle-fill' : 'bi-dash-circle-fill'}"></i>
      ${f.text}
    </li>
  `).join('');

  document.getElementById('modalPriceOld').textContent = v.priceOld;
  document.getElementById('modalPrice').innerHTML = `${v.price} <small>/ hari</small>`;

  // PERUBAHAN DI SINI: Kirim parameter ?unit=key ke halaman booking
  const priceRow = document.querySelector('.price-row');
  priceRow.innerHTML = `
    <div>
      <div class="price-old" id="modalPriceOld">${v.priceOld}</div>
      <div class="price-main" id="modalPrice">${v.price} <small>/ hari</small></div>
    </div>
    <a href="booking.html?unit=${key}" class="btn-book text-decoration-none">Lanjutkan Pesanan</a>
  `;

  const modal = new bootstrap.Modal(document.getElementById('vehicleDetailModal'));
  modal.show();
}