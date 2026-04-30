// Chat shell components — bubbles, headers, cards, toasts, signal animations
// Reuses tokens from zyro.css. Built for the demo, not the full Zyro app.

// ── Avatar ───────────────────────────────────────────────────
function ZAvatar({ who, size = 30 }) {
  if (who === 'zyro') {
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: 'linear-gradient(180deg,#6B3FD4,#3B1FA0)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(60,30,150,0.5)', flexShrink: 0
      }}>
        <img src="zyro-mascot.png" alt="zyro"
        style={{ width: size * 0.78, height: size * 0.78, objectFit: 'contain' }}
        draggable={false} />
      </div>);

  }
  const c = CAST[who];
  if (!c) return null;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: c.color, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.5, fontWeight: 600, flexShrink: 0,
      boxShadow: '0 1px 4px rgba(0,0,0,0.18)'
    }}>{c.emoji}</div>);

}

// ── Solo chat header (zyro 1:1) ──────────────────────────────
function SoloHeader({ mood, transitioning }) {
  return (
    <div style={{
      paddingTop: 60, paddingBottom: 14,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      position: 'relative', zIndex: 5,
      transition: 'opacity 0.4s', opacity: transitioning ? 0.3 : 1
    }}>
      <div style={{ position: 'relative' }}>
        <ZCreature size={48} mood={mood} breathing={mood === 'idle'} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--tk-header-ink)' }}>
          zyro
        </div>
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: '#3DE0A0', boxShadow: '0 0 8px #3DE0A0, 0 0 2px #3DE0A0'
        }} />
        <div style={{ fontSize: 12, color: 'var(--tk-header-ink-2)' }}>active now</div>
      </div>
    </div>);

}

// ── Group chat header ────────────────────────────────────────
function GroupHeader({ mood }) {
  const members = ['cassie', 'maya', 'jordan', 'priya', 'sam', 'zyro'];
  return (
    <div style={{
      paddingTop: 60, paddingBottom: 10,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      position: 'relative', zIndex: 5
    }}>
      <div style={{ display: 'flex', marginLeft: 12 }}>
        {members.map((m, i) =>
        <div key={m} style={{ marginLeft: i === 0 ? 0 : -10, position: 'relative', zIndex: members.length - i,
          border: '2px solid var(--tk-bubble-them)', borderRadius: '50%' }}>
            <ZAvatar who={m} size={28} />
          </div>
        )}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--tk-header-ink)', textAlign: 'center' }}>
        The Quiet Sake Society
      </div>
      <div style={{ fontSize: 10.5, color: 'var(--tk-header-ink-2)', display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3DE0A0', boxShadow: '0 0 8px #3DE0A0' }} />
        zyro · active in this thread
      </div>
    </div>);

}

// ── Chat bubble ──────────────────────────────────────────────
function ChatBubble({ from, text, inGroup, hasReadout }) {
  const isMe = from === 'cassie';
  const isZyro = from === 'zyro';
  const c = CAST[from];

  // Render markdown-ish **bold**
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).filter(Boolean).map((p, i) => {
    if (p.startsWith('**')) return <strong key={i} style={{ fontWeight: 600 }}>{p.slice(2, -2)}</strong>;
    if (p.startsWith('*')) return <em key={i} style={{ fontStyle: 'italic', opacity: 0.85 }}>{p.slice(1, -1)}</em>;
    return <React.Fragment key={i}>{p}</React.Fragment>;
  });

  const bubble =
  <div style={{

    borderRadius: isMe ? '20px 20px 6px 20px' : '20px 20px 20px 6px',
    background: isMe ? '#1A0F3D' : isZyro ? '#fff' : '#fff',
    color: isMe ? '#fff' : '#1A0F3D',
    fontSize: 14.5, lineHeight: 1.42, letterSpacing: '-0.005em',
    boxShadow: isMe ? '0 1px 2px rgba(0,0,0,0.2)' : '0 1px 3px rgba(26,15,61,0.06)',
    maxWidth: '100%',
    whiteSpace: 'pre-wrap', padding: '10px 14px'
  }}>{parts}</div>;


  return (
    <div className="z-bubble-in" style={{
      display: 'flex', alignItems: 'flex-end', gap: 7,
      flexDirection: isMe ? 'row-reverse' : 'row',
      marginBottom: 8
    }}>
      {!isMe && inGroup ? <ZAvatar who={from} size={26} /> : !isMe ? <div style={{ width: 6 }} /> : null}
      <div style={{ maxWidth: isMe ? '78%' : '78%' }}>
        {!isMe && inGroup &&
        <div style={{
          fontSize: 10.5, color: 'rgba(255,255,255,0.55)',
          padding: '0 10px 2px', display: 'flex', alignItems: 'baseline', gap: 6
        }}>
            <span style={{ fontWeight: 600, color: isZyro ? '#fff' : c.color }}>{c.name}</span>
            {!isZyro && c.persona &&
          <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
                ({c.persona})
              </span>
          }
          </div>
        }
        {bubble}
        {hasReadout && <PersonaReadout />}
      </div>
    </div>);

}

// ── Typing indicator ─────────────────────────────────────────
function TypingBubble({ inGroup }) {
  return (
    <div className="z-bubble-in" style={{
      display: 'flex', alignItems: 'flex-end', gap: 7, marginBottom: 8
    }}>
      {inGroup && <ZAvatar who="zyro" size={26} />}
      {!inGroup && <div style={{ width: 6 }} />}
      <div style={{
        padding: '12px 16px', background: '#fff',
        borderRadius: '20px 20px 20px 6px',
        boxShadow: '0 1px 3px rgba(26,15,61,0.06)'
      }}>
        <div className="z-typing"><span /><span /><span /></div>
      </div>
    </div>);

}

// Persona-mapping ghost readout
function PersonaReadout() {
  const items = [
  { who: 'maya', note: 'Tokyo energy' },
  { who: 'jordan', note: 'ryokan + onsen' },
  { who: 'priya', note: 'Naoshima' },
  { who: 'sam', note: '$300/night cap' }];

  return (
    <div style={{
      marginTop: 8, padding: '10px 12px', borderRadius: 14,
      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
      fontSize: 11.5
    }}>
      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
        signals captured
      </div>
      {items.map((it) => {
        const c = CAST[it.who];
        return (
          <div key={it.who} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 0' }}>
            <ZAvatar who={it.who} size={18} />
            <span style={{ color: '#fff', fontWeight: 500 }}>{c.name}</span>
            <span style={{ color: 'rgba(255,255,255,0.45)' }}>·</span>
            <span style={{ color: '#D4F05A' }}>{it.note}</span>
          </div>);

      })}
    </div>);

}

// ── Signal toast ─────────────────────────────────────────────
function SignalToast({ text, sub, onDismiss }) {
  React.useEffect(() => {
    const t = setTimeout(onDismiss, 3200);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{
      position: 'absolute', top: 100, left: 16, right: 16, zIndex: 200,
      background: 'rgba(10,7,20,0.96)',
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      border: '1px solid rgba(212,240,90,0.45)',
      borderRadius: 16, padding: '12px 14px',
      boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
      display: 'flex', gap: 11, alignItems: 'flex-start',
      animation: 'z-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both'
    }}>
      <div style={{
        width: 26, height: 26, borderRadius: '50%',
        background: 'rgba(212,240,90,0.18)', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <svg width="14" height="14" viewBox="0 0 16 16">
          <path d="M8 2L9.5 6.5L14 8L9.5 9.5L8 14L6.5 9.5L2 8L6.5 6.5Z" fill="#D4F05A" />
        </svg>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: '#fff', lineHeight: 1.35 }}>{text}</div>
        {sub && <div style={{ fontSize: 11, color: '#D4F05A', marginTop: 2, fontWeight: 500 }}>{sub}</div>}
      </div>
    </div>);

}

// ── Trust score chip (header overlay) ────────────────────────
function TrustChip({ score }) {
  const tier = trustTier(score);
  const [pulse, setPulse] = React.useState(false);
  const prev = React.useRef(score);
  React.useEffect(() => {
    if (score !== prev.current) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 600);
      prev.current = score;
      return () => clearTimeout(t);
    }
  }, [score]);
  return (
    <div style={{
      position: 'absolute', top: 70, right: 14, zIndex: 30,
      border: '1px solid rgba(255,255,255,0.18)',
      borderRadius: 999, padding: '5px 11px 5px 7px',
      display: 'flex', alignItems: 'center', gap: 7,
      backdropFilter: 'blur(12px)',
      boxShadow: tier.glow ? '0 0 12px rgba(212,240,90,0.3)' : 'none',
      transition: 'box-shadow 0.4s', background: 'rgba(0,0,0,0.55)'
    }}>
      <div style={{
        width: 16, height: 16, borderRadius: '50%',
        background: `conic-gradient(#D4F05A ${score * 3.6}deg, rgba(255,255,255,0.15) 0)`,
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', inset: 2.5, borderRadius: '50%', background: '#000' }} />
      </div>
      <div className={`z-mono ${pulse ? 'z-score-pulse' : ''}`} style={{
        fontSize: 12, fontWeight: 600, color: '#fff', lineHeight: 1, transformOrigin: 'left center'
      }}>
        {score}<span style={{ opacity: 0.5, fontSize: 10 }}>/100</span>
      </div>
    </div>);

}

Object.assign(window, {
  ZAvatar, SoloHeader, GroupHeader, ChatBubble, TypingBubble, SignalToast, TrustChip, PersonaReadout
});