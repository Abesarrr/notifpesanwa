    // Antrian Pop-up Pesan
    let popupQueue = [
    "Apakah kamu mencintaiku?",
    "Maukah kamu selalu ada buat aku?",
    "Mau jalan bareng minggu ini?",
    "Kamu nggak bakal lupa kan?",
    "Bucin banget ya, aku sayang kamu ❤️"
  ];
  
  // Antrian Pesan WhatsApp
  let whatsappQueue = [
    "Kamu lagi ngapain?",
    "Aku kangen!",
    "Jangan lupa makan, ya!",
    "Tidur yang cukup, sayang ❤️"
  ];
  
  let currentPopupIndex = 0;
  let currentWhatsAppIndex = 0;
  let popupContainer = document.getElementById('popup-container');
  let whatsappContainer = document.getElementById('whatsapp-container');
  
  // Fungsi menampilkan pop-up pesan
  function showPopup() {
    if (currentPopupIndex < popupQueue.length) {
      let popupMessage = document.createElement('div');
      popupMessage.classList.add('ios-notification');
      popupMessage.innerHTML = `
        <div class="ios-notification-content">
          <img class="whatsapp-icon" src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp Logo">
          <div class="ios-notification-text">
            <strong>Notifikasi</strong>
            <p>${popupQueue[currentPopupIndex]}</p>
          </div>
        </div>
      `;
  
      popupMessage.addEventListener('click', () => {
        currentPopupIndex++;
        popupMessage.remove();
        showPopup(); // Tampilkan pop-up berikutnya setelah yang ini dihilangkan
      });
  
      popupContainer.appendChild(popupMessage);
    } else {
      // Jika sudah tidak ada pesan pop-up, mulai WhatsApp
      setTimeout(showWhatsAppMessage, 2000);
    }
  }
  
  // Fungsi menampilkan notifikasi WhatsApp
  function showWhatsAppMessage() {
    if (currentWhatsAppIndex < whatsappQueue.length) {
      let whatsappMessage = document.createElement('div');
      whatsappMessage.classList.add('whatsapp-notification', 'show');
      whatsappMessage.innerHTML = `
        <div class="notification-header">
          <img class="whatsapp-icon" src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp Icon">
          <span class="whatsapp-label">WhatsApp</span>
          <span class="notification-time">Sekarang</span>
        </div>
        <div class="notification-body">
          <div class="contact-info">
            <img class="profile-picture" src="https://media-cgk2-1.cdn.whatsapp.net/v/t61.24694-24/456091415_912028604133604_708572787443467973_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_Q5AaIAN_WEUgJOt0hIDha90wSVZT1WV95gDnf636PLfEWkJY&oe=6722EC39&_nc_sid=5e03e0&_nc_cat=101" alt="Profile Picture">
            <div class="contact-name">Abesar ❤️</div>
          </div>
          <div class="message-text">${whatsappQueue[currentWhatsAppIndex]}</div>
        </div>
      `;
  
      popupContainer.appendChild(whatsappMessage);
  
      setTimeout(() => {
        whatsappMessage.remove();
        currentWhatsAppIndex++;
        showWhatsAppMessage(); // Tampilkan pesan WhatsApp berikutnya setelah yang ini selesai
      }, 5000); // Durasi tiap notifikasi WhatsApp
    } else {
      // Jika semua notifikasi WhatsApp sudah selesai, tampilkan form pesan WhatsApp
      whatsappContainer.classList.remove('hidden');
    }
  }
  
  // Menampilkan popup pertama
  setTimeout(showPopup, 2000); // Mulai menampilkan pop-up setelah 2 detik
  
  // Tombol kirim WhatsApp
  document.getElementById('send-whatsapp').addEventListener('click', () => {
    let message = document.getElementById('whatsapp-message').value;
    if (message) {
      let whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  });
  
  // Time and Date
  function updateTime() {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.toLocaleDateString(undefined, { weekday: 'long' });
    const date = now.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
    
    timeElement.textContent = `${hours}:${minutes}`;
    dateElement.textContent = `${day}, ${date}`;
  }
  
  // Call updateTime every second
  setInterval(updateTime, 1000);
  