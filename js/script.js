document.addEventListener('DOMContentLoaded', function() {
    // Fungsionalitas menu mobile
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    const welcomeMessageEl = document.getElementById('welcome-message');
    let userName = localStorage.getItem('userName');

    const showPromptModal = () => {
        const modalHtml = `
            <div id="custom-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
                <div class="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
                    <h3 class="text-lg font-bold mb-4">Masukkan Nama Anda</h3>
                    <input type="text" id="name-input" class="w-full p-2 border border-gray-300 rounded-md mb-4" placeholder="Nama Anda...">
                    <button id="submit-name" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Kirim</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        const nameInput = document.getElementById('name-input');
        const submitButton = document.getElementById('submit-name');
        const modal = document.getElementById('custom-modal');

        submitButton.addEventListener('click', () => {
            const name = nameInput.value.trim();
            if (name) {
                localStorage.setItem('userName', name);
                updateWelcomeMessage(name);
            } else {
                updateWelcomeMessage('Pengunjung');
            }
            modal.remove();
        });

        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitButton.click();
            }
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                updateWelcomeMessage('Pengunjung');
                modal.remove();
            }
        });

        nameInput.focus();
    };

    const updateWelcomeMessage = (name) => {
        welcomeMessageEl.textContent = `Selamat datang, ${name}!`;
    };

    if (!userName) {
        showPromptModal();
    } else {
        updateWelcomeMessage(userName);
    }
});

const contactForm = document.getElementById('contact-form');
const messageDisplay = document.getElementById('message-display');
const deleteButtonContainer = document.getElementById('delete-button-container');
const deleteMessageButton = document.getElementById('delete-message-button');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Mengambil nilai dari formulir
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value || 'Tidak Ada';
    const message = document.getElementById('message').value;
    const currentTime = new Date().toLocaleString('id-ID', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    // Membuat konten untuk tampilan pesan
    const displayContent = `
        <p><strong>Waktu saat ini:</strong> ${currentTime}</p>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Tanggal Lahir:</strong> ${dob}</p>
        <p><strong>Jenis Kelamin:</strong> ${gender}</p>
        <p><strong>Pesan:</strong> ${message}</p>
    `;

    messageDisplay.innerHTML = displayContent;
    deleteButtonContainer.classList.remove('hidden');

    // Reset formulir
    contactForm.reset();
});

// Fungsionalitas tombol hapus pesan
deleteMessageButton.addEventListener('click', () => {
    messageDisplay.innerHTML = '<p>Pesan Anda akan muncul di sini setelah Anda mengirimkannya.</p>';
    deleteButtonContainer.classList.add('hidden');
});
