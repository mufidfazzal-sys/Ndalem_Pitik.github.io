// script.js - Ndalem Pitik Dynamic Renderer & Interactions

document.addEventListener('DOMContentLoaded', () => {
  // 1. Ambil data dari data.js / LocalStorage
  const data = typeof getSiteData === 'function' ? getSiteData() : null;
  if (!data) {
    console.warn('Data master Ndalem Pitik tidak ditemukan.');
    return;
  }

  // Helper WhatsApp Link
  function makeWaUrl(phone, text) {
    const cleanPhone = (phone || '').replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text || '')}`;
  }

  // ==========================================
  // 2. Render Header & Kontak
  // ==========================================
  const headerLogo = document.querySelector('header .logo');
  if (headerLogo && data.general) {
    headerLogo.innerHTML = `
      <img src="${data.general.logo || 'assets/logo.png'}" alt="Logo ${data.general.farmName}" style="height: 40px; width: auto; object-fit: contain; border-radius: 50%;">
      ${data.general.farmName}
    `;
  }

  const headerWaBtn = document.querySelector('header .nav-btn');
  if (headerWaBtn && data.general) {
    headerWaBtn.href = makeWaUrl(data.general.waNumber, `Halo ${data.general.farmName}, saya ingin tanya mengenai produk peternakan Anda.`);
  }

  const floatingWa = document.querySelector('.floating-wa');
  if (floatingWa && data.general) {
    floatingWa.href = makeWaUrl(data.general.waNumber, `Halo ${data.general.farmName}, saya ingin tanya-tanya produk.`);
  }

  // ==========================================
  // 3. Render Hero Section
  // ==========================================
  if (data.hero) {
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
      heroBadge.innerHTML = `<span class="hero-badge-dot"></span> ${data.hero.badge || '100% Organik & Berkualitas Tinggi'}`;
    }

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && data.hero.title) {
      heroTitle.textContent = data.hero.title;
    }

    const heroDesc = document.querySelector('.hero-desc');
    if (heroDesc && data.hero.description) {
      heroDesc.textContent = data.hero.description;
    }

    const heroWaBtn = document.querySelector('.hero-actions .btn-secondary');
    if (heroWaBtn && data.general) {
      heroWaBtn.textContent = data.hero.btnWaText || 'Hubungi WhatsApp';
      heroWaBtn.href = makeWaUrl(data.general.waNumber, data.hero.waConsultMessage || `Halo ${data.general.farmName}, saya ingin berkonsultasi mengenai pemesanan.`);
    }

    const heroImg = document.getElementById('hero-display-img');
    if (heroImg && data.hero.image) {
      heroImg.src = data.hero.image;
    }
  }

  // ==========================================
  // 4. Render Highlight Features
  // ==========================================
  const highlightContainer = document.querySelector('.features-highlight');
  if (highlightContainer && Array.isArray(data.featuresHighlight)) {
    const iconSvgs = [
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    ];

    highlightContainer.innerHTML = data.featuresHighlight.map((feat, idx) => `
      <div class="highlight-card">
        <div class="highlight-icon-box">
          ${iconSvgs[idx % iconSvgs.length]}
        </div>
        <div>
          <h3 class="highlight-title">${feat.title}</h3>
          <p class="highlight-desc">${feat.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // 5. Render Katalog Produk
  // ==========================================
  const catalogHeading = document.querySelector('#katalog .section-heading');
  if (catalogHeading && data.catalog) {
    catalogHeading.innerHTML = `
      <span class="section-tag">${data.catalog.sectionTag || 'Daftar Produk'}</span>
      <h2 class="section-title">${data.catalog.sectionTitle || 'Produk Pilihan Terbaik untuk Kebutuhan Anda'}</h2>
      <p>${data.catalog.sectionSubtitle || 'Silakan filter kategori produk di bawah ini untuk melihat detail produk unggulan peternakan kami.'}</p>
    `;
  }

  const catalogGrid = document.getElementById('catalog-products');
  if (catalogGrid && data.catalog && Array.isArray(data.catalog.products)) {
    catalogGrid.innerHTML = data.catalog.products.map(product => {
      let statusClass = 'status-instock';
      let statusLabel = 'Ready';

      if (product.status === 'habis') {
        statusClass = 'status-outofstock';
        statusLabel = 'Habis';
      } else if (product.status === 'preorder') {
        statusClass = 'status-preorder';
        statusLabel = 'Pre-Order';
      }

      const orderUrl = makeWaUrl(
        data.general.waNumber,
        product.waMessage || `Halo ${data.general.farmName}, saya tertarik untuk memesan ${product.title}.`
      );

      return `
        <div class="catalog-card" data-cat="${product.category}">
          <div class="card-img-box">
            ${product.badge ? `<span class="card-badge">${product.badge}</span>` : ''}
            <img src="${product.image || 'assets/kuntara.jpg'}" alt="${product.title}">
          </div>
          <div class="card-body">
            <h3 class="card-title">${product.title}</h3>
            <p class="card-desc">${product.desc}</p>
            <div class="card-meta">
              <span class="card-price">${product.price} <span class="card-unit">${product.unit || ''}</span></span>
              <span class="card-status ${statusClass}"><span class="status-dot"></span> ${statusLabel}</span>
            </div>
            <a href="${orderUrl}" target="_blank" class="btn-order-wa">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              Pesan via WhatsApp
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // 6. Filter Buttons Interaction
  // ==========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const catalogCards = document.querySelectorAll('.catalog-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const category = button.getAttribute('data-category');

      catalogCards.forEach(card => {
        const cardCat = card.getAttribute('data-cat');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ==========================================
  // 7. Render Keunggulan (Why Us)
  // ==========================================
  if (data.whyUs) {
    const whySection = document.getElementById('keunggulan');
    if (whySection) {
      const whyTag = whySection.querySelector('.section-tag');
      if (whyTag) whyTag.textContent = data.whyUs.tag || 'Mengapa Ndalem Pitik?';

      const whyTitle = whySection.querySelector('.section-title');
      if (whyTitle) whyTitle.textContent = data.whyUs.title;

      const whyDesc = whySection.querySelector('.section-container > .why-grid > div > p');
      if (whyDesc) whyDesc.textContent = data.whyUs.desc;

      const whyList = whySection.querySelector('.why-list');
      if (whyList && Array.isArray(data.whyUs.items)) {
        whyList.innerHTML = data.whyUs.items.map(item => `
          <div class="why-item">
            <div class="why-num">${item.num}</div>
            <div>
              <h4 class="why-item-title">${item.title}</h4>
              <p class="why-desc">${item.desc}</p>
            </div>
          </div>
        `).join('');
      }

      const whyImg = whySection.querySelector('.hero-img-wrapper img');
      if (whyImg && data.whyUs.image) {
        whyImg.src = data.whyUs.image;
      }
    }
  }

  // ==========================================
  // 8. Render Cara Order
  // ==========================================
  if (data.howToOrder) {
    const orderSection = document.getElementById('cara-order');
    if (orderSection) {
      const tag = orderSection.querySelector('.section-tag');
      if (tag) tag.textContent = data.howToOrder.tag;

      const title = orderSection.querySelector('.section-title');
      if (title) title.textContent = data.howToOrder.title;

      const desc = orderSection.querySelector('.section-heading p');
      if (desc) desc.textContent = data.howToOrder.desc;

      const stepsGrid = orderSection.querySelector('.steps-grid');
      if (stepsGrid && Array.isArray(data.howToOrder.steps)) {
        stepsGrid.innerHTML = data.howToOrder.steps.map(step => `
          <div class="step-card">
            <div class="step-number">${step.number}</div>
            <h3 class="step-title">${step.title}</h3>
            <p>${step.desc}</p>
          </div>
        `).join('');
      }
    }
  }

  // ==========================================
  // 9. Render Testimoni
  // ==========================================
  if (data.testimonials) {
    const testiSection = document.getElementById('testimoni');
    if (testiSection) {
      const tag = testiSection.querySelector('.section-tag');
      if (tag) tag.textContent = data.testimonials.tag;

      const title = testiSection.querySelector('.section-title');
      if (title) title.textContent = data.testimonials.title;

      const desc = testiSection.querySelector('.section-heading p');
      if (desc) desc.textContent = data.testimonials.desc;

      const testiGrid = testiSection.querySelector('.testimonial-grid');
      if (testiGrid && Array.isArray(data.testimonials.items)) {
        testiGrid.innerHTML = data.testimonials.items.map(t => `
          <div class="testi-card">
            <p class="testi-text">"${t.text}"</p>
            <div class="testi-author">
              <div class="author-avatar">${t.avatar || (t.name ? t.name.charAt(0) : 'U')}</div>
              <div>
                <h4 class="author-name">${t.name}</h4>
                <p class="author-role">${t.role}</p>
              </div>
            </div>
          </div>
        `).join('');
      }
    }
  }

  // ==========================================
  // 10. Render Footer Kontak
  // ==========================================
  if (data.general) {
    const footerLogo = document.querySelector('footer .footer-logo');
    if (footerLogo) {
      footerLogo.innerHTML = `
        <img src="${data.general.logo || 'assets/logo.png'}" alt="Logo ${data.general.farmName}" style="height: 40px; width: auto; object-fit: contain; border-radius: 50%;">
        ${data.general.farmName}
      `;
    }

    const footerDesc = document.querySelector('.footer-desc');
    if (footerDesc && data.general.tagline) {
      footerDesc.textContent = `${data.general.farmName} — ${data.general.tagline}`;
    }

    const contactDiv = document.querySelector('footer .footer-main > div:nth-child(4)');
    if (contactDiv) {
      contactDiv.innerHTML = `
        <h4 class="footer-title">Hubungi Kami</h4>
        <p style="color: var(--accent-sage); font-size: 0.9rem; margin-bottom: 0.8rem; white-space: pre-line;">
          ${data.general.address || ''}
        </p>
        <p style="color: var(--accent-sage); font-size: 0.9rem;">
          WhatsApp: ${data.general.phone || data.general.waNumber || ''}<br>
          Email: ${data.general.email || ''}
        </p>
      `;
    }

    const copyrightEl = document.getElementById('footer-copyright');
    if (copyrightEl && data.general.copyright) {
      copyrightEl.textContent = data.general.copyright;
    }
  }

  // ==========================================
  // 11. Header Scroll Effect & Smooth Scrolling
  // ==========================================
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
