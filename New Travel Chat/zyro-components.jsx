// Zyro — shared components (REVISED for purple/lime Figma style)
// Exports: ZLogo, ZCreature, ZTrustBar, ZPassport, ZButton, ZBubble, ZTypingBubble, ZHeader, ZScorePill, ZTabBar

function ZLogo({ size = 22, color = '#fff' }) {
  return (
    <svg width={size} height={size * 0.85} viewBox="0 0 40 34" fill="none">
      <path d="M6 4 L34 4 L10 26 L34 26 L34 30 L6 30 L30 8 L6 8 Z" fill={color}/>
    </svg>
  );
}

// ─── ZCreature — real mascot image ─────────────────────────────
function ZCreature({ size = 140, mood = 'happy', breathing = true, style = {} }) {
  const moodTransform = {
    happy:   'none',
    curious: 'none',
    secure:  'scale(1.02)',
    shy:     'translateY(2px)',
  }[mood] || 'none';
  return (
    <div className={breathing ? 'z-breathe' : ''}
      style={{ width: size, height: size, display: 'inline-block', ...style }}>
      <img src="zyro-mascot.png" alt="Zyro"
        draggable={false}
        style={{
          width: '100%', height: '100%',
          objectFit: 'contain',
          transform: moodTransform,
          transition: 'transform 0.3s ease',
          filter: 'drop-shadow(0 6px 14px rgba(43,31,160,0.4))',
          userSelect: 'none',
          pointerEvents: 'none',
          display: 'block',
        }} />
    </div>
  );
}

// ─── Trust bar ─────────────────────────────────────────────────
function ZTrustBar({ score, showLabel = true, compact = false, onWhite = false, earning, label = 'Trust score' }) {
  const [pulse, setPulse] = React.useState(false);
  const prev = React.useRef(score);
  React.useEffect(() => {
    if (score !== prev.current) {
      setPulse(true);
      setTimeout(() => setPulse(false), 500);
      prev.current = score;
    }
  }, [score]);

  const labelColor = onWhite ? 'var(--z-ink-3)' : 'rgba(255,255,255,0.7)';
  const scoreColor = onWhite ? 'var(--z-ink)' : '#fff';

  return (
    <div style={{ width: '100%' }}>
      {showLabel && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: compact ? 6 : 10,
        }}>
          <div style={{
            fontSize: compact ? 11 : 12, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: labelColor, fontWeight: 600,
          }}>{label}</div>
          <div className={'z-mono ' + (pulse ? 'z-score-pulse' : '')} style={{
            fontSize: compact ? 14 : 17, fontWeight: 500, color: scoreColor,
            display: 'inline-flex', alignItems: 'baseline', gap: 3,
            transformOrigin: 'right center',
          }}>
            {score}<span style={{ fontSize: compact ? 10 : 12, opacity: 0.6 }}>/100</span>
          </div>
        </div>
      )}
      <div className={"z-trustbar-track" + (onWhite ? ' on-white' : '')}>
        <div className="z-trustbar-fill" style={{ width: `${score}%` }} />
      </div>
      {earning !== undefined && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: 8, fontSize: 12, color: labelColor,
        }}>
          <span>Est. monthly earning</span>
          <span className="z-mono" style={{ color: scoreColor, fontWeight: 500 }}>${earning.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
}

// ─── Passport tiles ────────────────────────────────────────────
const PASSPORT_TILES = [
  { key: 'phone',   label: 'Phone',    icon: '☎', points: 5 },
  { key: 'email',   label: 'Email',    icon: '✉', points: 5 },
  { key: 'name',    label: 'Name',     icon: 'A', points: 5 },
  { key: 'taste',   label: 'Taste',    icon: '♪', points: 5 },
  { key: 'diet',    label: 'Diet',     icon: '◉', points: 5 },
  { key: 'travel',  label: 'Travel',   icon: '✈', points: 5 },
  { key: 'values',  label: 'Values',   icon: '♥', points: 5 },
  { key: 'kyc',     label: 'Identity', icon: '◊', points: 20 },
  { key: 'linked1', label: 'Spotify',  icon: 'S', points: 10 },
  { key: 'linked2', label: 'Bank',     icon: '▤', points: 10 },
  { key: 'circle',  label: 'Circle',   icon: '◎', points: 10 },
  { key: 'chat',    label: 'Chat',     icon: '◐', points: 15 },
];

function ZPassport({ signals, onTileClick, onWhite = true }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
      {PASSPORT_TILES.map(t => {
        const filled = signals[t.key];
        return (
          <button key={t.key} onClick={() => onTileClick && onTileClick(t.key)} style={{
            height: 68, borderRadius: 14,
            background: filled
              ? (onWhite ? 'var(--z-primary-wash)' : 'rgba(212,240,90,0.18)')
              : (onWhite ? 'rgba(26,15,61,0.04)' : 'rgba(255,255,255,0.08)'),
            border: filled
              ? '1px solid ' + (onWhite ? 'rgba(91,63,255,0.2)' : 'rgba(212,240,90,0.35)')
              : '1px solid transparent',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 4,
            color: filled
              ? (onWhite ? 'var(--z-primary-ink)' : 'var(--z-lime)')
              : (onWhite ? 'var(--z-ink-3)' : 'rgba(255,255,255,0.6)'),
            transition: 'all 0.25s',
            position: 'relative',
          }}>
            <div style={{ fontSize: 17, fontWeight: 600 }}>{t.icon}</div>
            <div style={{ fontSize: 10, fontWeight: 500 }}>{t.label}</div>
            {filled && (
              <div style={{
                position: 'absolute', top: 5, right: 5,
                width: 7, height: 7, borderRadius: '50%', background: 'var(--z-verified)',
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Button ────────────────────────────────────────────────────
function ZButton({ children, onClick, variant = 'lime', disabled, style, icon }) {
  const base = {
    height: 56, padding: '0 24px', borderRadius: 9999,
    fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 8, width: '100%', transition: 'transform 0.12s, opacity 0.12s',
    opacity: disabled ? 0.4 : 1, cursor: disabled ? 'not-allowed' : 'pointer',
    ...style,
  };
  const variants = {
    lime:   { background: 'var(--z-lime)', color: 'var(--z-lime-ink)', boxShadow: '0 4px 20px rgba(212,240,90,0.3)' },
    dark:   { background: 'var(--z-ink)', color: '#fff' },
    purple: { background: 'var(--z-primary)', color: '#fff' },
    white:  { background: '#fff', color: 'var(--z-ink)' },
    glass:  { background: 'rgba(255,255,255,0.14)', color: '#fff', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)' },
    ghost:  { background: 'transparent', color: 'var(--z-p-ink-2)' },
    outline:{ background: 'transparent', color: 'var(--z-ink)', boxShadow: 'inset 0 0 0 1.5px var(--z-line)' },
  };
  return (
    <button disabled={disabled} onClick={onClick} style={{ ...base, ...variants[variant] }}
      onMouseDown={e => !disabled && (e.currentTarget.style.transform = 'scale(0.98)')}
      onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
      {icon}{children}
    </button>
  );
}

// ─── Chat bubbles ──────────────────────────────────────────────
function ZBubble({ role, children, meta, showAvatar = true }) {
  const isUser = role === 'user';
  return (
    <div className="z-bubble-in" style={{
      display: 'flex', alignItems: 'flex-end',
      flexDirection: isUser ? 'row-reverse' : 'row',
      gap: 8, marginBottom: 10,
    }}>
      {/* Avatar removed per design — bubbles alone. */}
      <div style={{ maxWidth: isUser ? '75%' : '85%' }}>
        <div style={{
          padding: '11px 15px',
          borderRadius: isUser ? '20px 20px 6px 20px' : '20px 20px 20px 6px',
          background: isUser ? 'var(--z-ink)' : '#fff',
          color: isUser ? '#fff' : 'var(--z-ink)',
          fontSize: 15, lineHeight: 1.42, letterSpacing: '-0.005em',
          boxShadow: isUser ? 'none' : '0 1px 3px rgba(26,15,61,0.06)',
          whiteSpace: 'pre-wrap',
        }}>{children}</div>
        {meta && (
          <div style={{ fontSize: 11, color: 'var(--z-ink-3)', marginTop: 4, padding: '0 6px' }}>{meta}</div>
        )}
      </div>
    </div>
  );
}

function ZTypingBubble() {
  return (
    <div className="z-bubble-in" style={{
      display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 10,
    }}>
      {/* Avatar removed per design — bubbles alone. */}
      <div style={{
        padding: '14px 18px',
        borderRadius: '20px 20px 20px 6px',
        background: '#fff',
        boxShadow: '0 1px 3px rgba(26,15,61,0.06)',
      }}>
        <div className="z-typing"><span /><span /><span /></div>
      </div>
    </div>
  );
}

// ─── Header ────────────────────────────────────────────────────
function ZHeader({ onBack, right, centerTitle, onPurple = false, light = false, leftIcon }) {
  const iconBg = onPurple ? 'rgba(255,255,255,0.14)' : '#fff';
  const iconColor = onPurple ? '#fff' : 'var(--z-ink)';
  const titleColor = onPurple ? '#fff' : 'var(--z-ink)';
  return (
    <div style={{
      position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '58px 18px 10px', gap: 10,
      minHeight: 58 + 38 + 10,
    }}>
      {onBack ? (
        <button onClick={onBack} style={{
          width: 38, height: 38, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: iconBg,
          color: iconColor,
          boxShadow: onPurple ? 'none' : '0 1px 2px rgba(26,15,61,0.06)',
          border: onPurple ? '1px solid rgba(255,255,255,0.15)' : 'none',
          position: 'relative', zIndex: 1,
        }}>
          {leftIcon || (
            <svg width="9" height="15" viewBox="0 0 10 16" fill="none">
              <path d="M8 2L2 8l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      ) : <div style={{ width: 38 }} />}
      <div style={{
        position: 'absolute', left: '50%', top: 58, transform: 'translateX(-50%)',
        height: 38, display: 'flex', alignItems: 'center',
        fontSize: 16, fontWeight: 600, color: titleColor,
        pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>{centerTitle}</div>
      <div style={{ position: 'relative', zIndex: 1 }}>{right || <div style={{ width: 38 }} />}</div>
    </div>
  );
}

function ZScorePill({ score, onClick, onPurple = false }) {
  return (
    <button onClick={onClick} style={{
      height: 34, padding: '0 12px', borderRadius: 999,
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: onPurple ? 'rgba(255,255,255,0.14)' : '#fff',
      color: onPurple ? '#fff' : 'var(--z-ink)',
      boxShadow: onPurple ? 'none' : '0 1px 2px rgba(26,15,61,0.06)',
      border: onPurple ? '1px solid rgba(255,255,255,0.15)' : 'none',
      fontSize: 13,
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: '50%',
        background: `conic-gradient(var(--z-lime) ${score * 3.6}deg, ${onPurple ? 'rgba(255,255,255,0.2)' : 'var(--z-line)'} 0)`,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 3, borderRadius: '50%',
          background: onPurple ? 'var(--z-primary)' : '#fff',
        }} />
      </div>
      <span className="z-mono" style={{ fontWeight: 500 }}>{score}</span>
      <span style={{ opacity: 0.6 }}>trust</span>
    </button>
  );
}

// ─── Bottom tab bar ────────────────────────────────────────────
function ZTabBar({ active, onChange, hasNotif = true }) {
  const tabs = [
    { key: 'vault',    label: 'Vault',    icon: '🔒' },
    { key: 'circles',  label: 'Circles',  icon: '👥' },
    { key: 'zyro',     label: 'Zyro',     center: true },
    { key: 'lists',    label: 'Lists',    icon: '☰' },
    { key: 'earnings', label: 'Earnings', icon: '💰' },
  ];
  return (
    <div style={{
      background: '#0A0713',
      padding: '10px 14px 24px',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      position: 'relative',
    }}>
      {tabs.map(t => {
        if (t.center) {
          return (
            <button key={t.key} onClick={() => onChange(t.key)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              marginTop: -24, position: 'relative',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'linear-gradient(180deg, #6B3FD4, #3B1FA0)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '3px solid #0A0713',
                boxShadow: '0 4px 16px rgba(107,63,212,0.5)',
                position: 'relative',
              }}>
                <ZCreature size={44} breathing={false} />
                {hasNotif && (
                  <div style={{
                    position: 'absolute', top: 4, right: 4,
                    width: 10, height: 10, borderRadius: '50%',
                    background: '#FF4D6D', border: '2px solid #0A0713',
                  }} />
                )}
              </div>
              <div style={{ fontSize: 10.5, color: active === t.key ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{t.label}</div>
            </button>
          );
        }
        const on = active === t.key;
        return (
          <button key={t.key} onClick={() => onChange(t.key)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '6px 4px', minWidth: 52,
            color: on ? '#fff' : 'rgba(255,255,255,0.55)',
          }}>
            <div style={{ fontSize: 18, marginBottom: 1 }}>{t.icon}</div>
            <div style={{ fontSize: 10.5, fontWeight: 500 }}>{t.label}</div>
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, {
  ZLogo, ZCreature, ZTrustBar, ZPassport, ZButton, ZBubble, ZTypingBubble,
  ZHeader, ZScorePill, ZTabBar, PASSPORT_TILES,
});
