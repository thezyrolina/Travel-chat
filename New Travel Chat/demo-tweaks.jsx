// demo-tweaks.jsx — Tweaks panel for Zyro Japan Demo
//
// Drives 8 CSS custom properties on the .phone element + the html.theme-light
// flag for stage/page colors. Persists via the host's __edit_mode_set_keys
// protocol (see tweaks-panel.jsx).

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "preset": "Zyro",
  "primary": "#6B3FD4",
  "accent": "#D4F05A",
  "font": "Work Sans",
  "radius": 18,
  "bubbleRadius": 20,
  "pad": 14,
  "border": 0
}/*EDITMODE-END*/;

// ── Presets — full-look swaps; selecting one writes all sub-keys at once ─────
const PRESETS = {
  Zyro:    { primary:'#6B3FD4', accent:'#D4F05A', font:'Work Sans',  radius:18, bubbleRadius:20, pad:14, border:0 },
  Sakura:  { primary:'#E15A8A', accent:'#FFD2DC', font:'Fraunces',   radius:24, bubbleRadius:24, pad:16, border:0 },
  Indigo:  { primary:'#3D5AFE', accent:'#FFD541', font:'IBM Plex Sans', radius:8, bubbleRadius:10, pad:14, border:0 },
  Mono:    { primary:'#1A0F3D', accent:'#FFFFFF', font:'JetBrains Mono', radius:0, bubbleRadius:4, pad:12, border:1 },
  Editorial:{ primary:'#1F4D2C', accent:'#E8DC8B', font:'Fraunces',   radius:6, bubbleRadius:8, pad:18, border:1 },
  Bubble:  { primary:'#8B5CF6', accent:'#22D3EE', font:'Quicksand',   radius:28, bubbleRadius:28, pad:18, border:0 },
};

const FONT_OPTIONS = ['Work Sans', 'Fraunces', 'IBM Plex Sans', 'JetBrains Mono', 'Quicksand', 'DM Sans'];

// Inject Google Fonts once
(function loadFonts() {
  if (document.getElementById('z-tweak-fonts')) return;
  const families = FONT_OPTIONS.map(f => `family=${f.replace(/ /g,'+')}:wght@400;500;600;700`).join('&');
  const link = document.createElement('link');
  link.id = 'z-tweak-fonts';
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
  document.head.appendChild(link);
})();

// ── Color math helpers ──────────────────────────────────────────────────────
function hexToRgb(hex) {
  const h = hex.replace('#','');
  const v = h.length === 3 ? h.split('').map(c=>c+c).join('') : h;
  return [parseInt(v.slice(0,2),16), parseInt(v.slice(2,4),16), parseInt(v.slice(4,6),16)];
}
function lighten(hex, amt) {
  const [r,g,b] = hexToRgb(hex);
  const m = (c) => Math.round(c + (255 - c) * amt);
  return `rgb(${m(r)},${m(g)},${m(b)})`;
}
function darken(hex, amt) {
  const [r,g,b] = hexToRgb(hex);
  const m = (c) => Math.round(c * (1 - amt));
  return `rgb(${m(r)},${m(g)},${m(b)})`;
}
function rgbaFromHex(hex, a) {
  const [r,g,b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}

// ── Apply tweaks → CSS vars on .phone + html.theme-light flag ───────────────
function applyTweaks(t) {
  const phone = document.querySelector('.phone');
  if (!phone) return;
  const html = document.documentElement;

  // Theme flag (page background gradient & phone bezel)
  if (t.theme === 'light') html.classList.add('theme-light');
  else html.classList.remove('theme-light');

  const p = t.primary, a = t.accent;
  const isLight = t.theme === 'light';

  // Font
  phone.style.setProperty('--tk-font', `'${t.font}', -apple-system, system-ui, sans-serif`);
  phone.style.setProperty('--tk-accent', a);
  phone.style.setProperty('--tk-primary', p);

  // Header gradient — derived from primary
  if (isLight) {
    phone.style.setProperty('--tk-header-grad', 'transparent');
    phone.style.setProperty('--tk-header-border', 'transparent');
    phone.style.setProperty('--tk-header-ink', '#1A0F3D');
    phone.style.setProperty('--tk-header-ink-2', 'rgba(26,15,61,0.55)');
    phone.style.setProperty('--tk-stage-grad', 'transparent');
    phone.style.setProperty('--tk-reveal-grad', 'transparent');
    phone.style.background = '#FAFAFC';
    phone.style.setProperty('--tk-bubble-them', '#FFFFFF');
    phone.style.setProperty('--tk-bubble-them-ink', '#1A0F3D');
    phone.style.setProperty('--tk-bubble-me', p);
    phone.style.setProperty('--tk-bubble-me-ink', '#FFFFFF');
  } else {
    phone.style.setProperty('--tk-header-grad', 'transparent');
    phone.style.setProperty('--tk-header-border', 'transparent');
    phone.style.setProperty('--tk-header-ink', '#FFFFFF');
    phone.style.setProperty('--tk-header-ink-2', 'rgba(255,255,255,0.55)');
    phone.style.setProperty('--tk-stage-grad', 'transparent');
    phone.style.setProperty('--tk-reveal-grad', 'transparent');
    phone.style.background = darken(p, 0.5);
    phone.style.setProperty('--tk-bubble-them', '#FFFFFF');
    phone.style.setProperty('--tk-bubble-them-ink', '#1A0F3D');
    phone.style.setProperty('--tk-bubble-me', '#1A0F3D');
    phone.style.setProperty('--tk-bubble-me-ink', '#FFFFFF');
  }

  // Geometry
  phone.style.setProperty('--tk-radius', t.radius + 'px');
  phone.style.setProperty('--tk-bubble-radius', t.bubbleRadius + 'px');
  phone.style.setProperty('--tk-pad', t.pad + 'px');
  phone.style.setProperty('--tk-border', t.border + 'px');
  phone.style.setProperty('--tk-border-color', isLight ? 'rgba(26,15,61,0.12)' : 'rgba(0,0,0,0.18)');
}

function ZyroTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply on every change + initial mount
  React.useEffect(() => { applyTweaks(t); }, [t]);

  const applyPreset = (name) => {
    const p = PRESETS[name];
    if (!p) return;
    setTweak({ preset: name, ...p });
  };

  return (
    <TweaksPanel title="Zyro Tweaks">
      <TweakSection label="Theme" />
      <TweakRadio label="Mode" value={t.theme} options={['dark','light']}
                  onChange={(v) => setTweak('theme', v)} />
      <TweakSelect label="Preset" value={t.preset} options={Object.keys(PRESETS)}
                   onChange={applyPreset} />

      <TweakSection label="Color" />
      <TweakColor label="Primary" value={t.primary}
                  onChange={(v) => setTweak({ primary: v, preset: 'Custom' })} />
      <TweakColor label="Accent"  value={t.accent}
                  onChange={(v) => setTweak({ accent: v, preset: 'Custom' })} />

      <TweakSection label="Type" />
      <TweakSelect label="Font" value={t.font} options={FONT_OPTIONS}
                   onChange={(v) => setTweak({ font: v, preset: 'Custom' })} />

      <TweakSection label="Spacing &amp; Borders" />
      <TweakSlider label="Card radius" value={t.radius} min={0} max={32} unit="px"
                   onChange={(v) => setTweak({ radius: v, preset: 'Custom' })} />
      <TweakSlider label="Bubble radius" value={t.bubbleRadius} min={2} max={32} unit="px"
                   onChange={(v) => setTweak({ bubbleRadius: v, preset: 'Custom' })} />
      <TweakSlider label="Bubble padding" value={t.pad} min={8} max={24} unit="px"
                   onChange={(v) => setTweak({ pad: v, preset: 'Custom' })} />
      <TweakSlider label="Border weight" value={t.border} min={0} max={3} unit="px"
                   onChange={(v) => setTweak({ border: v, preset: 'Custom' })} />
    </TweaksPanel>
  );
}

window.ZyroTweaks = ZyroTweaks;
