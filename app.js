/**
 * SOLIS DYNAMICS - Interactive Brand Guidelines Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initCopyButtons();
  initTypographyPlayground();
  initLogoStageControls();
  initAssetDownloads();
  initTokenExporters();
  initThemeToggle();
  initSidebarSearch();
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--solis-plasma)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Auto remove after 3s
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
// Typography Live Playground
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
    const font = fontInput ? fontInput.value : 'Outfit';
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
      stage.classList.toggle('light-bg');
      const isLight = stage.classList.contains('light-bg');
      toggleBgBtn.textContent = isLight ? 'Dark Background' : 'Light Background';
    });
  }
}

// --------------------------------------------------------------------------
// SVG Asset Generator & Direct Download
// --------------------------------------------------------------------------
const SVG_ASSETS = {
  master_color: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 120" width="480" height="120">
  <defs>
    <linearGradient id="solisGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF6B00"/>
      <stop offset="60%" stop-color="#FFA800"/>
      <stop offset="100%" stop-color="#00F0FF"/>
    </linearGradient>
  </defs>
  <!-- Solar Monogram Symbol -->
  <g transform="translate(20, 15)">
    <circle cx="45" cy="45" r="42" fill="none" stroke="url(#solisGlow)" stroke-width="6" stroke-dasharray="180 50" stroke-linecap="round"/>
    <circle cx="45" cy="45" r="28" fill="none" stroke="#FF6B00" stroke-width="4" opacity="0.6"/>
    <circle cx="45" cy="45" r="14" fill="#FFA800"/>
    <ellipse cx="45" cy="45" rx="38" ry="12" fill="none" stroke="#00F0FF" stroke-width="3" transform="rotate(-30 45 45)"/>
  </g>
  <!-- Wordmark -->
  <text x="130" y="65" font-family="'Outfit', 'Space Grotesk', sans-serif" font-size="44" font-weight="800" fill="#F8FAFC" letter-spacing="4">SOLIS</text>
  <text x="132" y="92" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#FF6B00" letter-spacing="9">DYNAMICS</text>
</svg>`,

  dark_mono: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 120" width="480" height="120">
  <g transform="translate(20, 15)">
    <circle cx="45" cy="45" r="42" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-dasharray="180 50" stroke-linecap="round"/>
    <circle cx="45" cy="45" r="28" fill="none" stroke="#FFFFFF" stroke-width="4" opacity="0.6"/>
    <circle cx="45" cy="45" r="14" fill="#FFFFFF"/>
    <ellipse cx="45" cy="45" rx="38" ry="12" fill="none" stroke="#FFFFFF" stroke-width="3" transform="rotate(-30 45 45)"/>
  </g>
  <text x="130" y="65" font-family="'Outfit', sans-serif" font-size="44" font-weight="800" fill="#FFFFFF" letter-spacing="4">SOLIS</text>
  <text x="132" y="92" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" letter-spacing="9" opacity="0.85">DYNAMICS</text>
</svg>`,

  light_mono: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 120" width="480" height="120">
  <g transform="translate(20, 15)">
    <circle cx="45" cy="45" r="42" fill="none" stroke="#090A0F" stroke-width="6" stroke-dasharray="180 50" stroke-linecap="round"/>
    <circle cx="45" cy="45" r="28" fill="none" stroke="#090A0F" stroke-width="4" opacity="0.6"/>
    <circle cx="45" cy="45" r="14" fill="#090A0F"/>
    <ellipse cx="45" cy="45" rx="38" ry="12" fill="none" stroke="#090A0F" stroke-width="3" transform="rotate(-30 45 45)"/>
  </g>
  <text x="130" y="65" font-family="'Outfit', sans-serif" font-size="44" font-weight="800" fill="#090A0F" letter-spacing="4">SOLIS</text>
  <text x="132" y="92" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#090A0F" letter-spacing="9" opacity="0.85">DYNAMICS</text>
</svg>`,

  monogram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="monoGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF6B00"/>
      <stop offset="50%" stop-color="#FFA800"/>
      <stop offset="100%" stop-color="#00F0FF"/>
    </linearGradient>
  </defs>
  <g transform="translate(15, 15)">
    <circle cx="45" cy="45" r="42" fill="none" stroke="url(#monoGlow)" stroke-width="6" stroke-dasharray="180 50" stroke-linecap="round"/>
    <circle cx="45" cy="45" r="28" fill="none" stroke="#FF6B00" stroke-width="4" opacity="0.6"/>
    <circle cx="45" cy="45" r="14" fill="#FFA800"/>
    <ellipse cx="45" cy="45" rx="38" ry="12" fill="none" stroke="#00F0FF" stroke-width="3" transform="rotate(-30 45 45)"/>
  </g>
</svg>`,

  favicon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#090A0F"/>
  <circle cx="32" cy="32" r="22" fill="none" stroke="#FF6B00" stroke-width="4" stroke-linecap="round"/>
  <circle cx="32" cy="32" r="8" fill="#FFA800"/>
  <ellipse cx="32" cy="32" rx="20" ry="6" fill="none" stroke="#00F0FF" stroke-width="2" transform="rotate(-30 32 32)"/>
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
        downloadFile(`solis-dynamics-${assetKey.replace('_', '-')}.svg`, svgData, 'image/svg+xml');
      }
    });
  });

  const downloadAllBtn = document.getElementById('downloadAllAssetsBtn');
  if (downloadAllBtn) {
    downloadAllBtn.addEventListener('click', () => {
      Object.keys(SVG_ASSETS).forEach((key, index) => {
        setTimeout(() => {
          downloadFile(`solis-dynamics-${key.replace('_', '-')}.svg`, SVG_ASSETS[key], 'image/svg+xml');
        }, index * 200);
      });
    });
  }
}

// --------------------------------------------------------------------------
// Design Token Exporters (JSON, CSS Variables, Tailwind)
// --------------------------------------------------------------------------
const DESIGN_TOKENS = {
  brand: "SOLIS Dynamics",
  version: "1.0.0",
  colors: {
    primary: {
      plasma: "#FF6B00",
      amber: "#FFA800",
      cyan: "#00F0FF",
      obsidian: "#090A0F",
      lumen: "#F8FAFC"
    },
    neutrals: {
      slate900: "#0F131F",
      slate800: "#1E293B",
      slate500: "#64748B",
      slate300: "#94A3B8"
    },
    semantic: {
      success: "#10B981",
      warning: "#F59E0B",
      danger: "#EF4444",
      info: "#3B82F6"
    }
  },
  typography: {
    display: "Outfit, Space Grotesk, sans-serif",
    body: "Plus Jakarta Sans, sans-serif",
    mono: "JetBrains Mono, monospace",
    scale: {
      displayXl: "64px",
      displayL: "48px",
      h1: "36px",
      h2: "28px",
      h3: "22px",
      body: "16px",
      small: "14px",
      caption: "12px"
    }
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
    "3xl": "64px"
  },
  radii: {
    sm: "6px",
    md: "12px",
    lg: "18px",
    xl: "24px",
    pill: "9999px"
  }
};

function initTokenExporters() {
  const exportJsonBtn = document.getElementById('exportJsonTokensBtn');
  const exportCssBtn = document.getElementById('exportCssTokensBtn');
  const exportTailwindBtn = document.getElementById('exportTailwindTokensBtn');

  if (exportJsonBtn) {
    exportJsonBtn.addEventListener('click', () => {
      downloadFile('solis-tokens.json', JSON.stringify(DESIGN_TOKENS, null, 2), 'application/json');
    });
  }

  if (exportCssBtn) {
    exportCssBtn.addEventListener('click', () => {
      const cssContent = `:root {
  /* SOLIS Dynamics Design Tokens */
  --solis-plasma: ${DESIGN_TOKENS.colors.primary.plasma};
  --solis-amber: ${DESIGN_TOKENS.colors.primary.amber};
  --solis-cyan: ${DESIGN_TOKENS.colors.primary.cyan};
  --solis-obsidian: ${DESIGN_TOKENS.colors.primary.obsidian};
  --solis-lumen: ${DESIGN_TOKENS.colors.primary.lumen};
  
  --solis-slate-900: ${DESIGN_TOKENS.colors.neutrals.slate900};
  --solis-slate-800: ${DESIGN_TOKENS.colors.neutrals.slate800};
  --solis-slate-500: ${DESIGN_TOKENS.colors.neutrals.slate500};
  --solis-slate-300: ${DESIGN_TOKENS.colors.neutrals.slate300};
  
  --font-display: '${DESIGN_TOKENS.typography.display}';
  --font-sans: '${DESIGN_TOKENS.typography.body}';
  --font-mono: '${DESIGN_TOKENS.typography.mono}';
  
  --radius-sm: ${DESIGN_TOKENS.radii.sm};
  --radius-md: ${DESIGN_TOKENS.radii.md};
  --radius-lg: ${DESIGN_TOKENS.radii.lg};
  --radius-xl: ${DESIGN_TOKENS.radii.xl};
}`;
      downloadFile('solis-tokens.css', cssContent, 'text/css');
    });
  }

  if (exportTailwindBtn) {
    exportTailwindBtn.addEventListener('click', () => {
      const twContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        solis: {
          plasma: '${DESIGN_TOKENS.colors.primary.plasma}',
          amber: '${DESIGN_TOKENS.colors.primary.amber}',
          cyan: '${DESIGN_TOKENS.colors.primary.cyan}',
          obsidian: '${DESIGN_TOKENS.colors.primary.obsidian}',
          lumen: '${DESIGN_TOKENS.colors.primary.lumen}',
        }
      },
      fontFamily: {
        display: ['Outfit', 'Space Grotesk', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
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
  
  // Check stored preference, default to light-theme
  const savedTheme = localStorage.getItem('solis-theme');
  if (savedTheme === 'dark') {
    document.body.classList.remove('light-theme');
  } else {
    document.body.classList.add('light-theme');
  }

  function updateButtonUi() {
    if (!toggleBtn) return;
    const isLight = document.body.classList.contains('light-theme');
    toggleBtn.innerHTML = isLight
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg> <span>Dark Mode</span>`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg> <span>Light Mode</span>`;
  }

  updateButtonUi();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('solis-theme', isLight ? 'light' : 'dark');
      updateButtonUi();
      showToast(isLight ? 'Switched to Light Mode' : 'Switched to Dark Mode');
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
// Sidebar Search Filter
// --------------------------------------------------------------------------
function initSidebarSearch() {
  const searchInput = document.getElementById('sidebarSearch');
  const navLinks = document.querySelectorAll('.nav-link');
  const navGroups = document.querySelectorAll('.nav-group');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    navLinks.forEach((link) => {
      const text = link.textContent.toLowerCase();
      if (text.includes(query)) {
        link.style.display = 'flex';
      } else {
        link.style.display = 'none';
      }
    });

    navGroups.forEach((group) => {
      const visibleLinks = group.querySelectorAll('.nav-link[style="display: flex;"], .nav-link:not([style*="display: none"])');
      const hasVisible = Array.from(group.querySelectorAll('.nav-link')).some((l) => l.style.display !== 'none');
      group.style.display = hasVisible ? 'block' : 'none';
    });
  });
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
