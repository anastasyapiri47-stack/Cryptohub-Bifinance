// Fungsi untuk menampilkan halaman yang berbeda
function showPage(pageId, clickedLink) {
    // Sembunyikan semua halaman
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Hapus kelas 'active' dari semua tautan navigasi
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.classList.remove('bg-yellow-400/20', 'text-yellow-400');
        link.classList.add('text-gray-300', 'hover:text-white', 'hover:bg-white/10');
    });

    // Tampilkan halaman yang dipilih
    const activeSection = document.getElementById(pageId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Tambahkan kelas 'active' ke tautan yang diklik
    if (clickedLink) {
        clickedLink.classList.add('active');
        clickedLink.classList.remove('text-gray-300', 'hover:text-white', 'hover:bg-white/10');
        clickedLink.classList.add('bg-yellow-400/20', 'text-yellow-400');
    }

    // Sembunyikan menu mobile setelah klik (opsional)
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.remove('is-open');
    }
}

// Fungsi untuk menampilkan pesan notifikasi
function showMessage(message) {
  const msgBox = document.getElementById('messageBox');
  msgBox.textContent = message;
  msgBox.classList.remove('hidden');
  msgBox.classList.add('show');
  setTimeout(() => {
    msgBox.classList.remove('show');
    msgBox.classList.add('hidden');
  }, 3000);
}

// Fungsionalitas menu hamburger dan Gathering
document.addEventListener('DOMContentLoaded', () => {
    // --- Fungsionalitas Menu Navigasi ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-open');
        });
    }
    
    // Atur halaman utama agar aktif saat halaman dimuat
    const initialPage = document.getElementById('home-page');
    if (initialPage) {
        initialPage.classList.add('active');
    }

    // --- Fungsionalitas Halaman Gathering ---
    const inviteForm = document.getElementById('inviteForm');
    const guestNameInput = document.getElementById('guestNameInput');
    const guestForm = document.getElementById('guestForm');
    const invitationContent = document.getElementById('invitationContent');
    const guestNameSpan = document.getElementById('guestName');

    // Memuat nama tamu dari localStorage saat halaman dimuat
    const savedName = localStorage.getItem('guestName');
    if (savedName) {
        guestNameSpan.textContent = savedName;
        guestForm.classList.add('hidden');
        invitationContent.classList.remove('hidden');
    }

    // Menangani pengiriman formulir nama tamu
    inviteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const guestName = guestNameInput.value.trim();
        if (guestName) {
            localStorage.setItem('guestName', guestName);
            guestNameSpan.textContent = guestName;
            guestForm.classList.add('hidden');
            invitationContent.classList.remove('hidden');
        } else {
            showMessage('Nama tidak boleh kosong!');
        }
    });
});

// Salin tautan undangan
function copyInvitationLink() {
    const link = window.location.href;
    navigator.clipboard.writeText(link).then(() => {
        showMessage('Link undangan berhasil disalin!');
    }).catch(err => {
        showMessage('Gagal menyalin link.');
    });
}

// Ganti nama tamu
function editGuestName() {
    document.getElementById('invitationContent').classList.add('hidden');
    document.getElementById('guestForm').classList.remove('hidden');
    localStorage.removeItem('guestName');
}

// Bagikan ke WhatsApp
function shareWhatsApp() {
    const message = 'Saya diundang ke CryptoHub Gathering! Join sekarang: ' + window.location.href;
    window.open('https://wa.me/?text=' + encodeURIComponent(message), '_blank');
}

// Bagikan ke Web
function shareweb() {
    const message = 'Saya diundang ke CryptoHub Gathering! Join sekarang: ' + window.location.href;
    window.open('https://bifinanceas.com/h5/#/' + encodeURIComponent(window.location.href) + '&text=' + encodeURIComponent(message), '_blank');
}