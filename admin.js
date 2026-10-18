// admin.js - Logika Panel Pengelola Ndalem Pitik

let currentData = null;

// ==========================================
// 1. Inisialisasi & Autentikasi
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  currentData = typeof getSiteData === 'function' ? getSiteData() : DEFAULT_DATA;

  checkAuth();
  setupNavigation();
  setupEventListeners();
  loadAllDataIntoForms();
});

function checkAuth() {
  const isAuthed = sessionStorage.getItem('ndalem_pitik_admin_authed');
  const loginScreen = document.getElementById('login-screen');

  if (isAuthed === 'true') {
    loginScreen.style.display = 'none';
  } else {
    loginScreen.style.display = 'flex';
  }
}

// Form Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pinInput = document.getElementById('login-pin-input').value.trim();
    const correctPin = (currentData.adminSettings && currentData.adminSettings.pin) ? currentData.adminSettings.pin : 'admin123';

    if (pinInput === correctPin) {
      sessionStorage.setItem('ndalem_pitik_admin_authed', 'true');
      document.getElementById('login-screen').style.display = 'none';
      showToast('Selamat datang di Panel Admin Ndalem Pitik!', 'success');
    } else {
      showToast('PIN yang Anda masukkan salah!', 'error');
    }
  });
}

// Tombol Logout
const btnLogout = document.getElementById('btn-logout');
if (btnLogout) {
  btnLogout.addEventListener('click', () => {
    sessionStorage.removeItem('ndalem_pitik_admin_authed');
    document.getElementById('login-pin-input').value = '';
    document.getElementById('login-screen').style.display = 'flex';
    showToast('Anda telah keluar dari panel admin.', 'info');
  });
}

// ==========================================
// 2. Navigasi Tab
// ==========================================
function setupNavigation() {
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
}

function switchTab(tabId) {
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
  const panes = document.querySelectorAll('.tab-pane');
  const titleEl = document.getElementById('page-current-title');

  navItems.forEach(item => {
    if (item.getAttribute('data-tab') === tabId) {
      item.classList.add('active');
      if (titleEl) {
        titleEl.textContent = item.textContent.trim();
      }
    } else {
      item.classList.remove('active');
    }
  });

  panes.forEach(pane => {
    if (pane.id === tabId) {
      pane.classList.add('active');
    } else {
      pane.classList.remove('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 3. Load Data ke Form
// ==========================================
function loadAllDataIntoForms() {
  if (!currentData) return;

  // Header & Sidebar Brand
  const sidebarFarm = document.getElementById('sidebar-farm-name');
  if (sidebarFarm && currentData.general) sidebarFarm.textContent = currentData.general.farmName || 'Ndalem Pitik';

  // Stats Dashboard
  const statProd = document.getElementById('stat-products-count');
  if (statProd && currentData.catalog) statProd.textContent = (currentData.catalog.products || []).length;

  const statTesti = document.getElementById('stat-testimonials-count');
  if (statTesti && currentData.testimonials) statTesti.textContent = (currentData.testimonials.items || []).length;

  const statWa = document.getElementById('stat-wa-number');
  if (statWa && currentData.general) statWa.textContent = currentData.general.waNumber || '-';

  // 1. Katalog Header
  if (currentData.catalog) {
    setValue('cat-tag-input', currentData.catalog.sectionTag);
    setValue('cat-title-input', currentData.catalog.sectionTitle);
    setValue('cat-sub-input', currentData.catalog.sectionSubtitle);
  }
  renderProductList();

  // 2. Hero Section
  if (currentData.hero) {
    setValue('hero-badge-input', currentData.hero.badge);
    setValue('hero-title-input', currentData.hero.title);
    setValue('hero-desc-input', currentData.hero.description);
    setValue('hero-btn-wa-input', currentData.hero.btnWaText);
    setValue('hero-msg-wa-input', currentData.hero.waConsultMessage);
    const heroPreview = document.getElementById('hero-img-preview');
    if (heroPreview && currentData.hero.image) heroPreview.src = currentData.hero.image;
  }

  // 3. 3 Highlights
  renderHighlightsForm();

  // 4. Why Us
  if (currentData.whyUs) {
    setValue('why-tag-input', currentData.whyUs.tag);
    setValue('why-title-input', currentData.whyUs.title);
    setValue('why-desc-input', currentData.whyUs.desc);
    renderWhyItemsForm();
  }

  // 5. Order Steps
  if (currentData.howToOrder) {
    setValue('order-tag-input', currentData.howToOrder.tag);
    setValue('order-title-input', currentData.howToOrder.title);
    setValue('order-desc-input', currentData.howToOrder.desc);
    renderOrderStepsForm();
  }

  // 6. Testimoni
  if (currentData.testimonials) {
    setValue('testi-tag-input', currentData.testimonials.tag);
    setValue('testi-title-input', currentData.testimonials.title);
    setValue('testi-desc-input', currentData.testimonials.desc);
  }
  renderTestimonialList();

  // 7. Kontak & Footer
  if (currentData.general) {
    setValue('contact-name-input', currentData.general.farmName);
    setValue('contact-tagline-input', currentData.general.tagline);
    setValue('contact-wa-input', currentData.general.waNumber);
    setValue('contact-phone-input', currentData.general.phone);
    setValue('contact-email-input', currentData.general.email);
    setValue('contact-copy-input', currentData.general.copyright);
    setValue('contact-address-input', currentData.general.address);
  }
}

function setValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val !== undefined ? val : '';
}

function getValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

// ==========================================
// 4. Render Form Dinamis
// ==========================================
function renderHighlightsForm() {
  const container = document.getElementById('highlights-form-grid');
  if (!container || !currentData.featuresHighlight) return;

  container.innerHTML = currentData.featuresHighlight.map((feat, idx) => `
    <div style="background: #faf9f6; padding: 1.2rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
      <h4 style="font-size: 0.95rem; margin-bottom: 0.8rem; color: var(--primary-forest);">Fitur Highlight #${idx + 1}</h4>
      <div class="form-group">
        <label class="form-label">Judul Singkat</label>
        <input type="text" class="form-control" id="feat-title-${idx}" value="${feat.title || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Keterangan</label>
        <textarea class="form-control" id="feat-desc-${idx}" rows="2">${feat.desc || ''}</textarea>
      </div>
    </div>
  `).join('');
}

function renderWhyItemsForm() {
  const container = document.getElementById('why-items-container');
  if (!container || !currentData.whyUs || !currentData.whyUs.items) return;

  container.innerHTML = `
    <h4 style="font-size: 1rem; margin-bottom: 1rem; color: var(--primary-forest);">3 Poin Penjelasan Keunggulan</h4>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
      ${currentData.whyUs.items.map((item, idx) => `
        <div style="background: #faf9f6; padding: 1.2rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <div class="form-group">
            <label class="form-label">Nomor (Contoh: 01, 02)</label>
            <input type="text" class="form-control" id="why-num-${idx}" value="${item.num || `0${idx+1}`}">
          </div>
          <div class="form-group">
            <label class="form-label">Judul Poin</label>
            <input type="text" class="form-control" id="why-item-title-${idx}" value="${item.title || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Penjelasan</label>
            <textarea class="form-control" id="why-item-desc-${idx}" rows="2">${item.desc || ''}</textarea>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderOrderStepsForm() {
  const container = document.getElementById('order-steps-container');
  if (!container || !currentData.howToOrder || !currentData.howToOrder.steps) return;

  container.innerHTML = currentData.howToOrder.steps.map((step, idx) => `
    <div style="background: #faf9f6; padding: 1.2rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
      <h4 style="font-size: 0.95rem; margin-bottom: 0.8rem; color: var(--primary-forest);">Langkah #${step.number || idx + 1}</h4>
      <div class="form-group">
        <label class="form-label">Judul Langkah</label>
        <input type="text" class="form-control" id="step-title-${idx}" value="${step.title || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Penjelasan</label>
        <textarea class="form-control" id="step-desc-${idx}" rows="2">${step.desc || ''}</textarea>
      </div>
    </div>
  `).join('');
}

// ==========================================
// 5. Manajemen Produk (Katalog)
// ==========================================
function renderProductList() {
  const container = document.getElementById('admin-product-list');
  if (!container || !currentData.catalog) return;

  const products = currentData.catalog.products || [];

  if (products.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: #fff; border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
        <p style="color: #888;">Belum ada produk. Klik tombol <strong>"Tambah Produk Baru"</strong> di atas.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(p => {
    let catBadgeClass = 'badge-ayam';
    let catLabel = 'Ayam Kampung';
    if (p.category === 'telur') {
      catBadgeClass = 'badge-telur';
      catLabel = 'Telur';
    } else if (p.category === 'pakan') {
      catBadgeClass = 'badge-pakan';
      catLabel = 'Pakan';
    }

    let statusBadgeClass = 'badge-ready';
    let statusLabel = 'Ready';
    if (p.status === 'habis') {
      statusBadgeClass = 'badge-habis';
      statusLabel = 'Habis';
    } else if (p.status === 'preorder') {
      statusBadgeClass = 'badge-preorder';
      statusLabel = 'Pre-Order';
    }

    return `
      <div class="product-item-card">
        <img src="${p.image || 'assets/kuntara.jpg'}" alt="${p.title}" class="pic-thumb">
        <div class="pic-body">
          <div class="pic-badges">
            <span class="badge-pill ${catBadgeClass}">${catLabel}</span>
            <span class="badge-pill ${statusBadgeClass}">${statusLabel}</span>
            ${p.badge ? `<span class="badge-pill" style="background: #e0e0e0; color: #333;">${p.badge}</span>` : ''}
          </div>
          <h4 class="pic-title">${p.title}</h4>
          <p class="pic-desc">${p.desc}</p>
          <div class="pic-price">${p.price} <span style="font-size: 0.8rem; font-weight: normal; color: #666;">${p.unit || ''}</span></div>
          <div class="pic-actions">
            <button class="btn-card-action edit" onclick="editProduct('${p.id}')">
              ✏️ Edit
            </button>
            <button class="btn-card-action delete" onclick="deleteProduct('${p.id}')">
              🗑️ Hapus
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Modal Produk
const btnAddProduct = document.getElementById('btn-add-product');
if (btnAddProduct) {
  btnAddProduct.addEventListener('click', () => {
    document.getElementById('modal-product-title').textContent = 'Tambah Produk Baru';
    setValue('p-id', '');
    setValue('p-title', '');
    setValue('p-category', 'ayam');
    setValue('p-badge', 'Ayam Unggul');
    setValue('p-price', 'Rp 9.500');
    setValue('p-unit', '/ Ekor');
    setValue('p-status', 'ready');
    setValue('p-wamsg', '');
    setValue('p-desc', '');
    setValue('p-img-url', '');
    document.getElementById('p-img-preset').value = 'assets/kuntara.jpg';
    document.getElementById('p-img-preview').src = 'assets/kuntara.jpg';
    openModal('modal-product');
  });
}

window.editProduct = function(id) {
  const p = (currentData.catalog.products || []).find(item => item.id === id);
  if (!p) return;

  document.getElementById('modal-product-title').textContent = 'Edit Produk';
  setValue('p-id', p.id);
  setValue('p-title', p.title);
  setValue('p-category', p.category || 'ayam');
  setValue('p-badge', p.badge || '');
  setValue('p-price', p.price || '');
  setValue('p-unit', p.unit || '');
  setValue('p-status', p.status || 'ready');
  setValue('p-wamsg', p.waMessage || '');
  setValue('p-desc', p.desc || '');

  const presetSelect = document.getElementById('p-img-preset');
  const imgPreview = document.getElementById('p-img-preview');
  imgPreview.src = p.image || 'assets/kuntara.jpg';

  if (p.image && p.image.startsWith('assets/')) {
    presetSelect.value = p.image;
    setValue('p-img-url', '');
  } else {
    presetSelect.value = 'custom';
    setValue('p-img-url', p.image || '');
  }

  openModal('modal-product');
};

window.deleteProduct = function(id) {
  if (!confirm('Yakin ingin menghapus produk ini dari katalog?')) return;

  currentData.catalog.products = currentData.catalog.products.filter(p => p.id !== id);
  saveSiteData(currentData);
  renderProductList();
  loadAllDataIntoForms();
  showToast('Produk berhasil dihapus.', 'success');
};

const btnSaveProduct = document.getElementById('btn-save-product');
if (btnSaveProduct) {
  btnSaveProduct.addEventListener('click', () => {
    const title = getValue('p-title');
    if (!title) {
      alert('Nama produk wajib diisi!');
      return;
    }

    const id = getValue('p-id') || `prod-${Date.now()}`;
    const category = getValue('p-category');
    const badge = getValue('p-badge');
    const price = getValue('p-price');
    const unit = getValue('p-unit');
    const status = getValue('p-status');
    const waMessage = getValue('p-wamsg');
    const desc = getValue('p-desc');
    const image = document.getElementById('p-img-preview').src || 'assets/kuntara.jpg';

    const newProd = { id, title, category, badge, price, unit, status, waMessage, desc, image };

    const existingIdx = (currentData.catalog.products || []).findIndex(p => p.id === id);
    if (existingIdx >= 0) {
      currentData.catalog.products[existingIdx] = newProd;
    } else {
      currentData.catalog.products.push(newProd);
    }

    saveSiteData(currentData);
    renderProductList();
    closeModal('modal-product');
    loadAllDataIntoForms();
    showToast('Produk berhasil disimpan!', 'success');
  });
}

// Preset foto produk & Upload
const pPreset = document.getElementById('p-img-preset');
if (pPreset) {
  pPreset.addEventListener('change', () => {
    if (pPreset.value !== 'custom') {
      document.getElementById('p-img-preview').src = pPreset.value;
      setValue('p-img-url', '');
    }
  });
}

const pImgUrl = document.getElementById('p-img-url');
if (pImgUrl) {
  pImgUrl.addEventListener('input', () => {
    if (pImgUrl.value.trim()) {
      document.getElementById('p-img-preview').src = pImgUrl.value.trim();
      pPreset.value = 'custom';
    }
  });
}

const pImgFile = document.getElementById('p-img-file');
if (pImgFile) {
  pImgFile.addEventListener('change', (e) => {
    handleImageUpload(e.target.files[0], (dataUrl) => {
      document.getElementById('p-img-preview').src = dataUrl;
      pPreset.value = 'custom';
      setValue('p-img-url', '');
    });
  });
}

// ==========================================
// 6. Manajemen Testimoni
// ==========================================
function renderTestimonialList() {
  const container = document.getElementById('admin-testi-list');
  if (!container || !currentData.testimonials) return;

  const items = currentData.testimonials.items || [];

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; background: #fff; border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
        <p style="color: #888;">Belum ada testimoni. Klik <strong>"Tambah Testimoni"</strong> di atas.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(t => `
    <div class="product-item-card" style="padding: 1.4rem;">
      <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.8rem;">
        <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--secondary-gold); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700;">
          ${t.avatar || (t.name ? t.name.charAt(0) : 'U')}
        </div>
        <div>
          <h4 style="font-size: 1rem; color: var(--primary-forest);">${t.name}</h4>
          <p style="font-size: 0.8rem; color: #777;">${t.role}</p>
        </div>
      </div>
      <p style="font-size: 0.88rem; font-style: italic; color: #555; margin-bottom: 1.2rem; flex-grow: 1;">"${t.text}"</p>
      <div class="pic-actions">
        <button class="btn-card-action edit" onclick="editTesti('${t.id}')">✏️ Edit</button>
        <button class="btn-card-action delete" onclick="deleteTesti('${t.id}')">🗑️ Hapus</button>
      </div>
    </div>
  `).join('');
}

const btnAddTesti = document.getElementById('btn-add-testi');
if (btnAddTesti) {
  btnAddTesti.addEventListener('click', () => {
    document.getElementById('modal-testi-title').textContent = 'Tambah Testimoni';
    setValue('t-id', '');
    setValue('t-name', '');
    setValue('t-role', '');
    setValue('t-avatar', '');
    setValue('t-text', '');
    openModal('modal-testimonial');
  });
}

window.editTesti = function(id) {
  const t = (currentData.testimonials.items || []).find(item => item.id === id);
  if (!t) return;

  document.getElementById('modal-testi-title').textContent = 'Edit Testimoni';
  setValue('t-id', t.id);
  setValue('t-name', t.name);
  setValue('t-role', t.role);
  setValue('t-avatar', t.avatar || (t.name ? t.name.charAt(0) : ''));
  setValue('t-text', t.text);
  openModal('modal-testimonial');
};

window.deleteTesti = function(id) {
  if (!confirm('Hapus testimoni ini?')) return;
  currentData.testimonials.items = currentData.testimonials.items.filter(t => t.id !== id);
  saveSiteData(currentData);
  renderTestimonialList();
  loadAllDataIntoForms();
  showToast('Testimoni berhasil dihapus.', 'success');
};

const btnSaveTesti = document.getElementById('btn-save-testi');
if (btnSaveTesti) {
  btnSaveTesti.addEventListener('click', () => {
    const name = getValue('t-name');
    const text = getValue('t-text');
    if (!name || !text) {
      alert('Nama dan isi testimoni wajib diisi!');
      return;
    }

    const id = getValue('t-id') || `testi-${Date.now()}`;
    const role = getValue('t-role');
    const avatar = getValue('t-avatar') || (name ? name.charAt(0).toUpperCase() : 'U');

    const newTesti = { id, name, role, avatar, text };
    const idx = (currentData.testimonials.items || []).findIndex(t => t.id === id);
    if (idx >= 0) {
      currentData.testimonials.items[idx] = newTesti;
    } else {
      currentData.testimonials.items.push(newTesti);
    }

    saveSiteData(currentData);
    renderTestimonialList();
    closeModal('modal-testimonial');
    loadAllDataIntoForms();
    showToast('Testimoni berhasil disimpan!', 'success');
  });
}

// Hero Image Preset & Upload
const heroPreset = document.getElementById('hero-img-preset');
if (heroPreset) {
  heroPreset.addEventListener('change', () => {
    document.getElementById('hero-img-preview').src = heroPreset.value;
  });
}

const heroFile = document.getElementById('hero-img-file');
if (heroFile) {
  heroFile.addEventListener('change', (e) => {
    handleImageUpload(e.target.files[0], (dataUrl) => {
      document.getElementById('hero-img-preview').src = dataUrl;
    });
  });
}

// ==========================================
// 7. Simpan Semua Perubahan
// ==========================================
function setupEventListeners() {
  const btnSaveAll = document.getElementById('btn-save-all');
  if (btnSaveAll) {
    btnSaveAll.addEventListener('click', saveAllChanges);
  }

  // Unduh data.js untuk GitHub
  const btnDownload = document.getElementById('btn-download-datajs');
  if (btnDownload) {
    btnDownload.addEventListener('click', downloadDataJs);
  }

  // Ganti PIN
  const btnChangePin = document.getElementById('btn-change-pin');
  if (btnChangePin) {
    btnChangePin.addEventListener('click', () => {
      const newPin = getValue('settings-new-pin');
      if (!newPin) {
        alert('Masukkan PIN baru terlebih dahulu!');
        return;
      }
      if (!currentData.adminSettings) currentData.adminSettings = {};
      currentData.adminSettings.pin = newPin;
      saveSiteData(currentData);
      setValue('settings-new-pin', '');
      showToast('PIN Admin berhasil diperbarui!', 'success');
    });
  }

  // Reset Data
  const btnReset = document.getElementById('btn-reset-data');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (!confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh materi ke data standar bawaan? Semua perubahan akan hilang.')) return;
      resetSiteData();
      currentData = getSiteData();
      loadAllDataIntoForms();
      showToast('Seluruh data berhasil di-reset ke standar.', 'info');
    });
  }
}

function saveAllChanges() {
  // 1. Hero
  if (!currentData.hero) currentData.hero = {};
  currentData.hero.badge = getValue('hero-badge-input');
  currentData.hero.title = getValue('hero-title-input');
  currentData.hero.description = getValue('hero-desc-input');
  currentData.hero.btnWaText = getValue('hero-btn-wa-input');
  currentData.hero.waConsultMessage = getValue('hero-msg-wa-input');
  currentData.hero.image = document.getElementById('hero-img-preview').src || 'assets/hero.jpg';

  // 2. Highlights (3 Fitur)
  if (Array.isArray(currentData.featuresHighlight)) {
    currentData.featuresHighlight.forEach((feat, idx) => {
      feat.title = getValue(`feat-title-${idx}`) || feat.title;
      feat.desc = getValue(`feat-desc-${idx}`) || feat.desc;
    });
  }

  // 3. Why Us
  if (!currentData.whyUs) currentData.whyUs = {};
  currentData.whyUs.tag = getValue('why-tag-input');
  currentData.whyUs.title = getValue('why-title-input');
  currentData.whyUs.desc = getValue('why-desc-input');
  if (Array.isArray(currentData.whyUs.items)) {
    currentData.whyUs.items.forEach((item, idx) => {
      item.num = getValue(`why-num-${idx}`) || item.num;
      item.title = getValue(`why-item-title-${idx}`) || item.title;
      item.desc = getValue(`why-item-desc-${idx}`) || item.desc;
    });
  }

  // 4. Order Steps
  if (!currentData.howToOrder) currentData.howToOrder = {};
  currentData.howToOrder.tag = getValue('order-tag-input');
  currentData.howToOrder.title = getValue('order-title-input');
  currentData.howToOrder.desc = getValue('order-desc-input');
  if (Array.isArray(currentData.howToOrder.steps)) {
    currentData.howToOrder.steps.forEach((step, idx) => {
      step.title = getValue(`step-title-${idx}`) || step.title;
      step.desc = getValue(`step-desc-${idx}`) || step.desc;
    });
  }

  // 5. Testimonials Header
  if (!currentData.testimonials) currentData.testimonials = {};
  currentData.testimonials.tag = getValue('testi-tag-input');
  currentData.testimonials.title = getValue('testi-title-input');
  currentData.testimonials.desc = getValue('testi-desc-input');

  // 6. Catalog Header
  if (!currentData.catalog) currentData.catalog = {};
  currentData.catalog.sectionTag = getValue('cat-tag-input');
  currentData.catalog.sectionTitle = getValue('cat-title-input');
  currentData.catalog.sectionSubtitle = getValue('cat-sub-input');

  // 7. General & Contact
  if (!currentData.general) currentData.general = {};
  currentData.general.farmName = getValue('contact-name-input') || 'Ndalem Pitik';
  currentData.general.tagline = getValue('contact-tagline-input');
  currentData.general.waNumber = getValue('contact-wa-input');
  currentData.general.phone = getValue('contact-phone-input');
  currentData.general.email = getValue('contact-email-input');
  currentData.general.copyright = getValue('contact-copy-input');
  currentData.general.address = getValue('contact-address-input');

  // Simpan ke LocalStorage
  saveSiteData(currentData);
  loadAllDataIntoForms();
  showToast('✅ Semua perubahan materi website berhasil disimpan!', 'success');
}

// ==========================================
// 8. Generator File data.js untuk GitHub
// ==========================================
function downloadDataJs() {
  saveAllChanges();

  const fileContent = `// data.js - Data Master untuk Ndalem Pitik
// File ini menyimpan seluruh konten website yang dapat dikelola via Admin Panel

const DEFAULT_DATA = ${JSON.stringify(currentData, null, 2)};

const STORAGE_KEY = "ndalem_pitik_site_data";

// Helper Functions
function getSiteData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
    const parsed = JSON.parse(raw);
    return deepMerge(JSON.parse(JSON.stringify(DEFAULT_DATA)), parsed);
  } catch (err) {
    console.error("Gagal membaca data dari localStorage:", err);
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveSiteData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error("Gagal menyimpan data ke localStorage:", err);
    return false;
  }
}

function resetSiteData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    return false;
  }
}

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && !Array.isArray(source[key]) && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}
`;

  const blob = new Blob([fileContent], { type: 'application/javascript;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.js';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('File data.js berhasil diunduh! Silakan ganti data.js di folder proyek.', 'success');
}

// ==========================================
// 9. Helper: Modal, Toast & Image Compressor
// ==========================================
window.openModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('show');
};

window.closeModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('show');
};

function showToast(msg, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.className = `show ${type}`;

  setTimeout(() => {
    toast.className = '';
  }, 3500);
}

// Otomatis kompres gambar besar menggunakan Canvas HTML5
function handleImageUpload(file, callback) {
  if (!file || !file.type.startsWith('image/')) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const maxDim = 800;
      let width = img.width;
      let height = img.height;

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
      callback(compressedDataUrl);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
