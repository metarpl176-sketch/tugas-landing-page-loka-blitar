// 1. Ambil tombol hamburger dan menu berdasarkan id nya
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

// 2.Saat hamburger diklik,tambah/hapus class "open" pada menu
hamburger.addEventListener('click', function () {
    menu.classList.toggle('open');  //toggle = kalau belum ada ditambah,kalau sudah ada dihapus

});

// 3.(Opsional) Menu menutup otomatis setelah salah satu link diklik 
menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        menu.classList.remove('open');
    });
});

// Fungsi bantu: menyamakan tampilan hamburger dengan kondisi menu.
// - Jika menu terbuka  -> hamburger diberi class "active" (berubah jadi X)
// - Jika menu tertutup -> class "active" dihapus (kembali jadi 3 garis)
function sinkronHamburger() {
    const terbuka = menu.classList.contains('open');   // true jika menu sedang terbuka
    hamburger.classList.toggle('active', terbuka);     // toggle(nama, true/false): true = tambah, false = hapus
    hamburger.setAttribute('aria-expanded', terbuka);  // memberi tahu pembaca layar status menu
}

// TAMBAHAN 1: setiap kali hamburger diklik, sesuaikan bentuknya (3 garis / X).
// Event ini berjalan SETELAH event lama, jadi class "open" sudah berubah lebih dulu.
hamburger.addEventListener('click', sinkronHamburger);

// TAMBAHAN 2: setelah link menu diklik (menu menutup), kembalikan hamburger ke 3 garis.
menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', sinkronHamburger);
});

// TAMBAHAN 3: klik di luar menu -> menu tertutup.
document.addEventListener('click', function (event) {
    // closest() mengecek apakah yang diklik berada di dalam menu atau hamburger
    const klikDiDalam = event.target.closest('#menu') || event.target.closest('#hamburger');
    if (!klikDiDalam) {
        menu.classList.remove('open');   // tutup menu
        sinkronHamburger();
    }
});

// TAMBAHAN 4: tekan tombol Esc di keyboard -> menu tertutup.
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        menu.classList.remove('open');
        sinkronHamburger();
    }
});

// TAMBAHAN 5: jika layar dilebarkan sampai tampilan desktop, reset menu
// supaya tidak ada sisa class "open" dari tampilan HP.
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {      // innerWidth = lebar jendela browser saat ini
        menu.classList.remove('open');
        sinkronHamburger();
    }
});