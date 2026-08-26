/**
 * QUANTIRA TECHNOLOGIES - Official Brand Guidelines v1.0 Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initCopyButtons();
  initTypographyPlayground();
  initLogoStageControls();
  initAssetDownloads();
  initTokenExporters();
  initThemeToggle();
  initScrollSpy();
});

// --------------------------------------------------------------------------
// Toast Notification Utility
// --------------------------------------------------------------------------
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6cbae7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// --------------------------------------------------------------------------
// Click to Copy Values
// --------------------------------------------------------------------------
function initCopyButtons() {
  document.querySelectorAll('[data-copy], [data-copy-target]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      let textToCopy = el.getAttribute('data-copy');
      const targetSelector = el.getAttribute('data-copy-target');
      
      if (targetSelector) {
        const targetEl = document.querySelector(targetSelector);
        if (targetEl) {
          textToCopy = targetEl.textContent.trim();
        }
      }
      
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const preview = textToCopy.length > 25 ? textToCopy.substring(0, 25) + '...' : textToCopy;
        showToast(`Copied "${preview}" to clipboard!`);
      }).catch(() => {
        showToast(`Copied to clipboard!`);
      });
    });
  });
}

// --------------------------------------------------------------------------
// Typography Live Playground (Lexend & Noto Sans)
// --------------------------------------------------------------------------
function initTypographyPlayground() {
  const textElem = document.getElementById('playgroundText');
  const sizeInput = document.getElementById('typeSize');
  const sizeVal = document.getElementById('typeSizeVal');
  const weightInput = document.getElementById('typeWeight');
  const fontInput = document.getElementById('typeFont');
  const spacingInput = document.getElementById('typeSpacing');
  const spacingVal = document.getElementById('typeSpacingVal');
  const heightInput = document.getElementById('typeHeight');
  const heightVal = document.getElementById('typeHeightVal');
  const cssOutput = document.getElementById('generatedCss');

  if (!textElem) return;

  function updateTypeStyles() {
    const size = sizeInput ? sizeInput.value : 48;
    const weight = weightInput ? weightInput.value : 700;
    const font = fontInput ? fontInput.value : 'Lexend';
    const spacing = spacingInput ? spacingInput.value : -0.5;
    const height = heightInput ? heightInput.value : 1.2;

    if (sizeVal) sizeVal.textContent = `${size}px`;
    if (spacingVal) spacingVal.textContent = `${spacing}px`;
    if (heightVal) heightVal.textContent = `${height}`;

    textElem.style.fontSize = `${size}px`;
    textElem.style.fontWeight = weight;
    textElem.style.fontFamily = `'${font}', sans-serif`;
    textElem.style.letterSpacing = `${spacing}px`;
    textElem.style.lineHeight = height;

    if (cssOutput) {
      cssOutput.textContent = `font-family: '${font}', sans-serif; font-size: ${size}px; font-weight: ${weight}; line-height: ${height}; letter-spacing: ${spacing}px;`;
    }
  }

  [sizeInput, weightInput, fontInput, spacingInput, heightInput].forEach((input) => {
    if (input) {
      input.addEventListener('input', updateTypeStyles);
    }
  });

  updateTypeStyles();
}

// --------------------------------------------------------------------------
// Logo Stage Controls (Grid Overlay & Theme Toggle)
// --------------------------------------------------------------------------
function initLogoStageControls() {
  const toggleGridBtn = document.getElementById('toggleGridBtn');
  const gridOverlay = document.getElementById('logoGridOverlay');
  const toggleBgBtn = document.getElementById('toggleStageBgBtn');
  const stage = document.getElementById('primaryLogoStage');

  if (toggleGridBtn && gridOverlay) {
    toggleGridBtn.addEventListener('click', () => {
      gridOverlay.classList.toggle('active');
      toggleGridBtn.classList.toggle('active');
      showToast(gridOverlay.classList.contains('active') ? 'Construction grid enabled' : 'Construction grid disabled');
    });
  }

  if (toggleBgBtn && stage) {
    toggleBgBtn.addEventListener('click', () => {
      stage.classList.toggle('dark-bg');
      const isDark = stage.classList.contains('dark-bg');
      toggleBgBtn.textContent = isDark ? 'Light Background' : 'Dark Background';
    });
  }
}

// --------------------------------------------------------------------------
// Quantira SVG Vector Assets Generator (Phi + Planet + Quantum Circuits)
// --------------------------------------------------------------------------
const SVG_ASSETS = {
  master_gradient: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="520" height="120">
  <defs>
    <linearGradient id="qGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6CBAE7"/>
      <stop offset="100%" stop-color="#2A5BA9"/>
    </linearGradient>
  </defs>
  <!-- Quantira Stylized Q Mark (Phi + Planet + Quantum Circuit) -->
  <g transform="translate(20, 15)">
    <!-- Planetary Core Orb -->
    <circle cx="45" cy="45" r="32" fill="none" stroke="url(#qGrad)" stroke-width="6"/>
    <!-- Phi (Ø) Diagonal Quantum Axis -->
    <line x1="22" y1="68" x2="68" y2="22" stroke="url(#qGrad)" stroke-width="5" stroke-linecap="round"/>
    <!-- Planetary Orbit Ring -->
    <ellipse cx="45" cy="45" rx="42" ry="14" fill="none" stroke="#6CBAE7" stroke-width="2.5" transform="rotate(-30 45 45)"/>
    <!-- Quantum Circuit Nodes -->
    <circle cx="22" cy="68" r="4.5" fill="#2A5BA9"/>
    <circle cx="68" cy="22" r="4.5" fill="#6CBAE7"/>
    <!-- Q Tail Circuit Terminal -->
    <path d="M 54 54 L 75 75 L 85 75" fill="none" stroke="url(#qGrad)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="85" cy="75" r="4.5" fill="#2A5BA9"/>
  </g>
  <!-- Wordmark: QUANTIRA TECHNOLOGIES -->
  <text x="135" y="62" font-family="'Lexend', sans-serif" font-size="38" font-weight="800" fill="#020202" letter-spacing="2.5">QUANTIRA</text>
  <text x="137" y="88" font-family="'Noto Sans', sans-serif" font-size="13" font-weight="600" fill="#2A5BA9" letter-spacing="7">TECHNOLOGIES</text>
</svg>`,

  dark_format: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="520" height="120">
  <defs>
    <linearGradient id="qGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6CBAE7"/>
      <stop offset="100%" stop-color="#2A5BA9"/>
    </linearGradient>
  </defs>
  <g transform="translate(20, 15)">
    <circle cx="45" cy="45" r="32" fill="none" stroke="url(#qGradDark)" stroke-width="6"/>
    <line x1="22" y1="68" x2="68" y2="22" stroke="url(#qGradDark)" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="45" cy="45" rx="42" ry="14" fill="none" stroke="#6CBAE7" stroke-width="2.5" transform="rotate(-30 45 45)"/>
    <circle cx="22" cy="68" r="4.5" fill="#6CBAE7"/>
    <circle cx="68" cy="22" r="4.5" fill="#6CBAE7"/>
    <path d="M 54 54 L 75 75 L 85 75" fill="none" stroke="url(#qGradDark)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="85" cy="75" r="4.5" fill="#6CBAE7"/>
  </g>
  <text x="135" y="62" font-family="'Lexend', sans-serif" font-size="38" font-weight="800" fill="#FFFFFF" letter-spacing="2.5">QUANTIRA</text>
  <text x="137" y="88" font-family="'Noto Sans', sans-serif" font-size="13" font-weight="600" fill="#6CBAE7" letter-spacing="7">TECHNOLOGIES</text>
</svg>`,

  outline_version: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="520" height="120">
  <g transform="translate(20, 15)">
    <circle cx="45" cy="45" r="32" fill="none" stroke="#2A5BA9" stroke-width="3"/>
    <line x1="22" y1="68" x2="68" y2="22" stroke="#2A5BA9" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="45" cy="45" rx="42" ry="14" fill="none" stroke="#2A5BA9" stroke-width="2" stroke-dasharray="4 4" transform="rotate(-30 45 45)"/>
    <circle cx="22" cy="68" r="3" fill="none" stroke="#2A5BA9" stroke-width="2"/>
    <circle cx="68" cy="22" r="3" fill="none" stroke="#2A5BA9" stroke-width="2"/>
    <path d="M 54 54 L 75 75 L 85 75" fill="none" stroke="#2A5BA9" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="85" cy="75" r="3" fill="none" stroke="#2A5BA9" stroke-width="2"/>
  </g>
  <text x="135" y="62" font-family="'Lexend', sans-serif" font-size="38" font-weight="700" fill="none" stroke="#020202" stroke-width="1.5" letter-spacing="2.5">QUANTIRA</text>
  <text x="137" y="88" font-family="'Noto Sans', sans-serif" font-size="13" font-weight="600" fill="#2A5BA9" letter-spacing="7">TECHNOLOGIES</text>
</svg>`,

  mono_black: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="520" height="120">
  <g transform="translate(20, 15)">
    <circle cx="45" cy="45" r="32" fill="none" stroke="#020202" stroke-width="6"/>
    <line x1="22" y1="68" x2="68" y2="22" stroke="#020202" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="45" cy="45" rx="42" ry="14" fill="none" stroke="#020202" stroke-width="2.5" transform="rotate(-30 45 45)"/>
    <circle cx="22" cy="68" r="4.5" fill="#020202"/>
    <circle cx="68" cy="22" r="4.5" fill="#020202"/>
    <path d="M 54 54 L 75 75 L 85 75" fill="none" stroke="#020202" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="85" cy="75" r="4.5" fill="#020202"/>
  </g>
  <text x="135" y="62" font-family="'Lexend', sans-serif" font-size="38" font-weight="800" fill="#020202" letter-spacing="2.5">QUANTIRA</text>
  <text x="137" y="88" font-family="'Noto Sans', sans-serif" font-size="13" font-weight="600" fill="#020202" letter-spacing="7">TECHNOLOGIES</text>
</svg>`,

  monogram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="qMonoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6CBAE7"/>
      <stop offset="100%" stop-color="#2A5BA9"/>
    </linearGradient>
  </defs>
  <g transform="translate(15, 15)">
    <circle cx="45" cy="45" r="32" fill="none" stroke="url(#qMonoGrad)" stroke-width="6"/>
    <line x1="22" y1="68" x2="68" y2="22" stroke="url(#qMonoGrad)" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="45" cy="45" rx="42" ry="14" fill="none" stroke="#6CBAE7" stroke-width="2.5" transform="rotate(-30 45 45)"/>
    <circle cx="22" cy="68" r="4.5" fill="#2A5BA9"/>
    <circle cx="68" cy="22" r="4.5" fill="#6CBAE7"/>
    <path d="M 54 54 L 75 75 L 85 75" fill="none" stroke="url(#qMonoGrad)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="85" cy="75" r="4.5" fill="#2A5BA9"/>
  </g>
</svg>`
};

function downloadFile(filename, content, type = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Downloaded ${filename}`);
}

function initAssetDownloads() {
  document.querySelectorAll('[data-download-svg]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const assetKey = btn.getAttribute('data-download-svg');
      const svgData = SVG_ASSETS[assetKey];
      if (svgData) {
        downloadFile(`quantira-${assetKey.replace('_', '-')}.svg`, svgData, 'image/svg+xml');
      }
    });
  });

  const downloadAllBtn = document.getElementById('downloadAllAssetsBtn');
  if (downloadAllBtn) {
    downloadAllBtn.addEventListener('click', () => {
      Object.keys(SVG_ASSETS).forEach((key, index) => {
        setTimeout(() => {
          downloadFile(`quantira-${key.replace('_', '-')}.svg`, SVG_ASSETS[key], 'image/svg+xml');
        }, index * 200);
      });
    });
  }
}

// --------------------------------------------------------------------------
// Design Token Exporters (Quantira Technologies Specs)
// --------------------------------------------------------------------------
const QUANTIRA_TOKENS = {
  brand: "Quantira Technologies",
  version: "1.0",
  location: "Hyderabad, India",
  colorSystem: {
    dominantCanvas: {
      name: "Pure White",
      hex: "#ffffff",
      rgb: "255, 255, 255",
      cmyk: "0, 0, 0, 0",
      ratio: "50%"
    },
    structureText: {
      name: "Core Black",
      hex: "#020202",
      rgb: "2, 2, 2",
      cmyk: "0, 0, 0, 99",
      ratio: "30%"
    },
    accentCTA: {
      name: "Blue Gradient",
      gradient: "linear-gradient(135deg, #6cbae7 0%, #2a5ba9 100%)",
      from: "#6cbae7",
      to: "#2a5ba9",
      ratio: "20%"
    }
  },
  typography: {
    primaryFont: "Lexend, sans-serif",
    secondaryFont: "Noto Sans, sans-serif",
    monoFont: "JetBrains Mono, monospace"
  },
  geometry: "Isometric cube / blockchain quantum lattice"
};

function initTokenExporters() {
  const exportJsonBtn = document.getElementById('exportJsonTokensBtn');
  const exportCssBtn = document.getElementById('exportCssTokensBtn');
  const exportTailwindBtn = document.getElementById('exportTailwindTokensBtn');

  if (exportJsonBtn) {
    exportJsonBtn.addEventListener('click', () => {
      downloadFile('quantira-tokens.json', JSON.stringify(QUANTIRA_TOKENS, null, 2), 'application/json');
    });
  }

  if (exportCssBtn) {
    exportCssBtn.addEventListener('click', () => {
      const cssContent = `:root {
  /* Quantira Technologies Brand Tokens (v1.0) */
  --quantira-pure-white: #ffffff;
  --quantira-core-black: #020202;
  --quantira-blue-light: #6cbae7;
  --quantira-blue-deep: #2a5ba9;
  --quantira-gradient: linear-gradient(135deg, #6cbae7 0%, #2a5ba9 100%);
  
  --font-primary: 'Lexend', sans-serif;
  --font-secondary: 'Noto Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}`;
      downloadFile('quantira-tokens.css', cssContent, 'text/css');
    });
  }

  if (exportTailwindBtn) {
    exportTailwindBtn.addEventListener('click', () => {
      const twContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        quantira: {
          white: '#ffffff',
          black: '#020202',
          cyan: '#6cbae7',
          blue: '#2a5ba9',
        }
      },
      fontFamily: {
        primary: ['Lexend', 'sans-serif'],
        secondary: ['Noto Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    }
  }
};`;
      downloadFile('tailwind.config.js', twContent, 'application/javascript');
    });
  }
}

// --------------------------------------------------------------------------
// Theme Toggle & Print Trigger
// --------------------------------------------------------------------------
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  
  const savedTheme = localStorage.getItem('quantira-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }

  function updateButtonUi() {
    if (!toggleBtn) return;
    const isDark = document.body.classList.contains('dark-theme');
    toggleBtn.innerHTML = isDark
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg> <span>Light Mode</span>`
      : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg> <span>Dark Mode</span>`;
  }

  updateButtonUi();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      localStorage.setItem('quantira-theme', isDark ? 'dark' : 'light');
      updateButtonUi();
      showToast(isDark ? 'Switched to Dark Mode' : 'Switched to Light Mode');
    });
  }

  const printBtn = document.getElementById('printPdfBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

// --------------------------------------------------------------------------
// ScrollSpy for Active Sidebar Links
// --------------------------------------------------------------------------
function initScrollSpy() {
  const sections = document.querySelectorAll('.brand-section, .hero-banner');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 180;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
