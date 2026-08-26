/**
 * QUANTIRA TECHNOLOGIES - Official Brand Guidelines v1.0 Script
 * Accurately matching the 21-page Brand Guidelines PDF document
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
    <span class="material-symbols-outlined" style="color: #6cbae7; font-size: 1.15rem;">check_circle</span>
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

  function updateSliderFill(input) {
    if (!input || input.type !== 'range') return;
    const min = parseFloat(input.min) || 0;
    const max = parseFloat(input.max) || 100;
    const val = parseFloat(input.value) || 0;
    const percent = ((val - min) / (max - min)) * 100;
    const isDark = document.body.classList.contains('dark-theme');
    const trackColor = isDark ? '#1e293b' : '#e2e8f0';
    input.style.background = `linear-gradient(to right, #2a5ba9 0%, #6cbae7 ${percent}%, ${trackColor} ${percent}%, ${trackColor} 100%)`;
  }

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

    [sizeInput, spacingInput, heightInput].forEach(updateSliderFill);

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
// Quantira SVG Vector Assets Generator (Accurate to PDF Page 4, 5, 7, 9)
// --------------------------------------------------------------------------
const SVG_ASSETS = {
  master_gradient: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="520" height="120">
  <defs>
    <linearGradient id="qDocGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6CBAE7"/>
      <stop offset="100%" stop-color="#2A5BA9"/>
    </linearGradient>
  </defs>
  <!-- Quantira Q Mark (Matching PDF Page 5) -->
  <g transform="translate(20, 15)">
    <!-- Top-Left Segment with Wing -->
    <path d="M 12 44 C 20 44 26 40 32 32 C 40 22 52 16 66 16 C 82 16 95 28 95 45 C 95 50 93 56 90 61 L 76 47 C 77 44 77 42 77 39 C 77 31 71 25 63 25 C 55 25 48 30 45 37 L 31 51 C 29 48 24 45 12 44 Z" fill="url(#qDocGrad)"/>
    <!-- Bottom-Right Segment with Tail -->
    <path d="M 88 56 C 80 56 74 60 68 68 C 60 78 48 84 34 84 C 18 84 5 72 5 55 C 5 50 7 44 10 39 L 24 53 C 23 56 23 58 23 61 C 23 69 29 75 37 75 C 45 75 52 70 55 63 L 69 49 C 71 52 76 55 88 56 Z" fill="url(#qDocGrad)"/>
    <!-- Tail Extension Blade -->
    <path d="M 68 68 L 88 88 L 92 82 L 74 62 Z" fill="url(#qDocGrad)"/>
  </g>
  <!-- Wordmark -->
  <text x="135" y="62" font-family="'Lexend', sans-serif" font-size="38" font-weight="800" fill="#020202" letter-spacing="2.5">QUANTIRA</text>
  <text x="137" y="88" font-family="'Noto Sans', sans-serif" font-size="13" font-weight="600" fill="#020202" letter-spacing="7">TECHNOLOGIES</text>
</svg>`,

  dark_format: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="520" height="120">
  <defs>
    <linearGradient id="qDocGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6CBAE7"/>
      <stop offset="100%" stop-color="#2A5BA9"/>
    </linearGradient>
  </defs>
  <g transform="translate(20, 15)">
    <path d="M 12 44 C 20 44 26 40 32 32 C 40 22 52 16 66 16 C 82 16 95 28 95 45 C 95 50 93 56 90 61 L 76 47 C 77 44 77 42 77 39 C 77 31 71 25 63 25 C 55 25 48 30 45 37 L 31 51 C 29 48 24 45 12 44 Z" fill="url(#qDocGradDark)"/>
    <path d="M 88 56 C 80 56 74 60 68 68 C 60 78 48 84 34 84 C 18 84 5 72 5 55 C 5 50 7 44 10 39 L 24 53 C 23 56 23 58 23 61 C 23 69 29 75 37 75 C 45 75 52 70 55 63 L 69 49 C 71 52 76 55 88 56 Z" fill="url(#qDocGradDark)"/>
    <path d="M 68 68 L 88 88 L 92 82 L 74 62 Z" fill="url(#qDocGradDark)"/>
  </g>
  <text x="135" y="62" font-family="'Lexend', sans-serif" font-size="38" font-weight="800" fill="#FFFFFF" letter-spacing="2.5">QUANTIRA</text>
  <text x="137" y="88" font-family="'Noto Sans', sans-serif" font-size="13" font-weight="600" fill="#FFFFFF" letter-spacing="7">TECHNOLOGIES</text>
</svg>`,

  outline_version: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="520" height="120">
  <g transform="translate(20, 15)">
    <path d="M 12 44 C 20 44 26 40 32 32 C 40 22 52 16 66 16 C 82 16 95 28 95 45 C 95 50 93 56 90 61 L 76 47 C 77 44 77 42 77 39 C 77 31 71 25 63 25 C 55 25 48 30 45 37 L 31 51 C 29 48 24 45 12 44 Z" fill="none" stroke="#2A5BA9" stroke-width="3"/>
    <path d="M 88 56 C 80 56 74 60 68 68 C 60 78 48 84 34 84 C 18 84 5 72 5 55 C 5 50 7 44 10 39 L 24 53 C 23 56 23 58 23 61 C 23 69 29 75 37 75 C 45 75 52 70 55 63 L 69 49 C 71 52 76 55 88 56 Z" fill="none" stroke="#2A5BA9" stroke-width="3"/>
    <path d="M 68 68 L 88 88 L 92 82 L 74 62 Z" fill="none" stroke="#2A5BA9" stroke-width="3"/>
  </g>
  <text x="135" y="62" font-family="'Lexend', sans-serif" font-size="38" font-weight="700" fill="none" stroke="#020202" stroke-width="1.5" letter-spacing="2.5">QUANTIRA</text>
  <text x="137" y="88" font-family="'Noto Sans', sans-serif" font-size="13" font-weight="600" fill="#2A5BA9" letter-spacing="7">TECHNOLOGIES</text>
</svg>`,

  mono_black: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="520" height="120">
  <g transform="translate(20, 15)">
    <path d="M 12 44 C 20 44 26 40 32 32 C 40 22 52 16 66 16 C 82 16 95 28 95 45 C 95 50 93 56 90 61 L 76 47 C 77 44 77 42 77 39 C 77 31 71 25 63 25 C 55 25 48 30 45 37 L 31 51 C 29 48 24 45 12 44 Z" fill="#020202"/>
    <path d="M 88 56 C 80 56 74 60 68 68 C 60 78 48 84 34 84 C 18 84 5 72 5 55 C 5 50 7 44 10 39 L 24 53 C 23 56 23 58 23 61 C 23 69 29 75 37 75 C 45 75 52 70 55 63 L 69 49 C 71 52 76 55 88 56 Z" fill="#020202"/>
    <path d="M 68 68 L 88 88 L 92 82 L 74 62 Z" fill="#020202"/>
  </g>
  <text x="135" y="62" font-family="'Lexend', sans-serif" font-size="38" font-weight="800" fill="#020202" letter-spacing="2.5">QUANTIRA</text>
  <text x="137" y="88" font-family="'Noto Sans', sans-serif" font-size="13" font-weight="600" fill="#020202" letter-spacing="7">TECHNOLOGIES</text>
</svg>`,

  monogram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="qMonoPdf" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6CBAE7"/>
      <stop offset="100%" stop-color="#2A5BA9"/>
    </linearGradient>
  </defs>
  <path d="M 12 44 C 20 44 26 40 32 32 C 40 22 52 16 66 16 C 82 16 95 28 95 45 C 95 50 93 56 90 61 L 76 47 C 77 44 77 42 77 39 C 77 31 71 25 63 25 C 55 25 48 30 45 37 L 31 51 C 29 48 24 45 12 44 Z" fill="url(#qMonoPdf)"/>
  <path d="M 88 56 C 80 56 74 60 68 68 C 60 78 48 84 34 84 C 18 84 5 72 5 55 C 5 50 7 44 10 39 L 24 53 C 23 56 23 58 23 61 C 23 69 29 75 37 75 C 45 75 52 70 55 63 L 69 49 C 71 52 76 55 88 56 Z" fill="url(#qMonoPdf)"/>
  <path d="M 68 68 L 88 88 L 92 82 L 74 62 Z" fill="url(#qMonoPdf)"/>
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
// Design Token Exporters
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
      from: "#6cbae7",
      to: "#2a5ba9",
      gradient: "linear-gradient(135deg, #6cbae7 0%, #2a5ba9 100%)",
      ratio: "20%"
    }
  },
  typography: {
    primaryFont: "Lexend, sans-serif",
    secondaryFont: "Noto Sans, sans-serif"
  },
  pattern: "Block chain pattern originated from quantum bits"
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
  --quantira-blue-gradient: linear-gradient(135deg, #6cbae7 0%, #2a5ba9 100%);
  
  --font-primary: 'Lexend', sans-serif;
  --font-secondary: 'Noto Sans', sans-serif;
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
        title: ['Lexend', 'sans-serif'],
        body: ['Noto Sans', 'sans-serif'],
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
      ? `<span class="material-symbols-outlined" style="font-size: 1.1rem; color: #facc15;">light_mode</span> <span>Light Mode</span>`
      : `<span class="material-symbols-outlined" style="font-size: 1.1rem;">dark_mode</span> <span>Dark Mode</span>`;
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
  const sections = document.querySelectorAll('section[id]');
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
