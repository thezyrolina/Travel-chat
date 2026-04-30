// Value reveal panels (Moment 6) — three stacked cards revealing on tap.

function PanelA({ revealed }) {
  if (!revealed) return null;
  const stats = [
  { v: '$340', l: 'saved per person', sub: 'vs. comparable trips on Booking.com / Expedia (matched cohort)' },
  { v: '12 hrs', l: 'of group decision time', sub: 'gone' },
  { v: '47 → 6', l: 'messages collapsed', sub: 'one thread, one decision' }];

  return (
    <div className="z-bubble-in" style={{
      background: '#fff', borderRadius: 24, padding: 18, color: '#1A0F3D',
      marginBottom: 14, boxShadow: '0 8px 30px rgba(0,0,0,0.25)'
    }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', color: '#8A82A8' }}>
        WHAT YOU SAVED
      </div>
      <div className="z-serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 6, lineHeight: 1.15 }}>
        One trip. Real receipts.
      </div>
      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {stats.map((s, i) =>
        <div key={i} style={{
          display: 'flex', alignItems: 'baseline', gap: 12,
          padding: '12px 14px', borderRadius: 14,
          background: 'rgba(91,63,255,0.06)'
        }}>
            <div className="z-mono" style={{
            fontSize: 24, fontWeight: 700, color: '#6B3FD4',
            minWidth: 84, fontFamily: '"Work Sans"', lineHeight: 1
          }}>{s.v}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{s.l}</div>
              <div style={{ fontSize: 11, color: '#8A82A8', marginTop: 2, lineHeight: 1.4 }}>{s.sub}</div>
            </div>
          </div>
        )}
      </div>
    </div>);

}

function PanelB({ revealed }) {
  if (!revealed) return null;
  const [networkOn, setNetworkOn] = React.useState(false);
  return (
    <div className="z-bubble-in" style={{
      background: 'linear-gradient(160deg, #2D1560, #4B2FB0)',
      color: '#fff', borderRadius: 24, padding: 18,
      marginBottom: 14, boxShadow: '0 8px 30px rgba(45,21,96,0.4)',
      border: '1px solid rgba(212,240,90,0.3)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', color: '#D4F05A' }}>
          WHAT YOU EARNED
        </div>
        <span style={{ fontSize: 9.5, padding: '2px 7px', borderRadius: 999,
          background: 'rgba(212,240,90,0.18)', color: '#D4F05A', fontWeight: 600 }}>
          earning-eligible
        </span>
      </div>
      <div className="z-serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 6, lineHeight: 1.15 }}>
        Your circle made signals.
      </div>
      <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.7)', marginTop: 6, lineHeight: 1.5 }}>
        Not a payout yet, earning-eligible. These signals will route to your account when Network mode goes live.
      </p>

      {/* Headline value */}
      <div style={{ marginTop: 14, padding: '14px 14px',
        background: 'rgba(212,240,90,0.12)',
        border: '1px solid rgba(212,240,90,0.4)',
        borderRadius: 16,
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12
      }}>
        <div>
          <div className="z-mono" style={{ fontSize: 28, fontWeight: 700, color: '#D4F05A', lineHeight: 1, fontFamily: '"Work Sans"' }}>
            $48.20
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
            group earning-eligible · this session
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="z-mono" style={{ fontSize: 14, fontWeight: 600 }}>5</div>
          <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.6)' }}>members</div>
        </div>
      </div>

      {/* Signal breakdown */}
      <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div style={{ padding: '10px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="z-mono" style={{ fontSize: 18, fontWeight: 700 }}>28</div>
          <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.7)' }}>confirmed signals</div>
          <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
            style · food · travel · lodging · budget
          </div>
        </div>
        <div style={{ padding: '10px 12px', borderRadius: 12, background: 'rgba(212,240,90,0.1)',
          border: '1px solid rgba(212,240,90,0.3)' }}>
          <div className="z-mono" style={{ fontSize: 18, fontWeight: 700, color: '#D4F05A' }}>9</div>
          <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.75)' }}>circle-verified</div>
          <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
            highest-tier · only zyro produces
          </div>
        </div>
      </div>

      {/* Per-member split — by contribution */}
      <div style={{ marginTop: 12, padding: '12px 14px', borderRadius: 12,
        background: 'rgba(0,0,0,0.18)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
          color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 10 }}>
          per-member split (by contribution)
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
          { who: 'cassie', n: 8, v: 14.40 },
          { who: 'jordan', n: 6, v: 10.80 },
          { who: 'maya', n: 5, v: 9.00 },
          { who: 'priya', n: 5, v: 9.00 },
          { who: 'sam', n: 4, v: 5.00 }].
          map((m) => {
            const c = CAST[m.who];
            return (
              <div key={m.who} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5 }}>
                <ZAvatar who={m.who} size={18} />
                <span style={{ flex: 1, fontWeight: 500 }}>{c.name}</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10.5 }}>{m.n} signals</span>
                <span className="z-mono" style={{ minWidth: 50, textAlign: 'right', color: '#D4F05A', fontWeight: 600, fontFamily: '"Work Sans"' }}>
                  ${m.v.toFixed(2)}
                </span>
              </div>);
          })}
        </div>
      </div>

      {/* Mode toggle */}
      <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 12,
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600 }}>
            {networkOn ? 'Network mode' : 'Training mode'} · 11 eligible
          </div>
          <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.6)', marginTop: 1, lineHeight: 1.4 }}>
            {networkOn ?
            'Per-signal consent · routes to your account when live' :
            'Private. Free. Default. 11 can opt into Network with per-signal consent.'}
          </div>
        </div>
        <div onClick={(e) => {e.stopPropagation();setNetworkOn((v) => !v);}} style={{
          width: 36, height: 20, borderRadius: 999,
          background: networkOn ? '#D4F05A' : 'rgba(255,255,255,0.18)',
          position: 'relative', cursor: 'pointer', transition: 'background 0.2s'
        }}>
          <div style={{ position: 'absolute', top: 2, left: networkOn ? 18 : 2,
            width: 16, height: 16, borderRadius: '50%', background: '#fff',
            transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
        </div>
      </div>
    </div>);

}

function PanelC({ revealed }) {
  if (!revealed) return null;
  const [activeIdx, setActiveIdx] = React.useState(0);
  const card = VIBE_CARDS[activeIdx];
  const c = CAST[card.who];
  return (
    <div className="z-bubble-in" style={{
      background: '#fff', borderRadius: 24, padding: 18, color: '#1A0F3D',
      marginBottom: 14, boxShadow: '0 8px 30px rgba(0,0,0,0.25)'
    }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', color: '#8A82A8' }}>
        GROUP SUPERLATIVES
      </div>
      <div className="z-serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 6, lineHeight: 1.15 }}>
        Vibe Cards. Shareable.
      </div>

      {/* Carousel dots / picker */}
      <div style={{ marginTop: 14, display: 'flex', gap: 5, justifyContent: 'center' }}>
        {VIBE_CARDS.map((v, i) =>
        <button key={i} onClick={(e) => {e.stopPropagation();setActiveIdx(i);}} style={{
          width: i === activeIdx ? 18 : 7, height: 7, borderRadius: 5,
          background: i === activeIdx ? '#6B3FD4' : 'rgba(26,15,61,0.15)',
          transition: 'all 0.2s', border: 'none'
        }} />
        )}
      </div>

      {/* Vibe card */}
      <div className="z-pop" key={activeIdx} style={{
        marginTop: 14,
        aspectRatio: '4 / 5',
        background: `linear-gradient(160deg, #2D1560 0%, #5A2EAA 60%, ${c.color}AA 100%)`,
        borderRadius: 22, padding: 18,
        position: 'relative', overflow: 'hidden',
        color: '#fff', display: 'flex', flexDirection: 'column',
        boxShadow: '0 12px 40px rgba(45,21,96,0.4)'
      }}>
        {/* twinkles */}
        {[
        { x: '15%', y: '12%', d: '0s' }, { x: '82%', y: '18%', d: '0.6s' },
        { x: '8%', y: '70%', d: '1.2s' }, { x: '88%', y: '78%', d: '0.3s' },
        { x: '45%', y: '8%', d: '0.9s' }].
        map((t, i) =>
        <div key={i} className="z-twinkle" style={{
          position: 'absolute', left: t.x, top: t.y, width: 5, height: 5, borderRadius: '50%',
          background: '#fff', boxShadow: '0 0 6px #fff', animationDelay: t.d
        }} />
        )}

        {/* Tanuki — sits in upper-center */}
        <div style={{ position: 'absolute', top: '34%', left: '50%',
          transform: 'translate(-50%, -50%)', opacity: 0.95 }}>
          <ZCreature size={140} breathing={true} />
        </div>

        {/* Cassie / member name */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.12em',
            color: '#D4F05A', textTransform: 'uppercase', opacity: 0.85 }}>
            VIBE CARD · {c.name.toUpperCase()}
          </div>
          <div className="z-serif" style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.15, marginTop: 8,
            textWrap: 'balance' }}>
            "{card.superlative}"
          </div>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
            <ZAvatar who={card.who} size={24} />
            <div>
              <div style={{ fontWeight: 600 }}>{c.name}</div>
              {c.persona && <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 9.5 }}>{c.persona}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Share button */}
      <button onClick={(e) => e.stopPropagation()} style={{
        marginTop: 12, width: '100%', height: 44, borderRadius: 14,
        background: '#1A0F3D', color: '#fff', fontWeight: 600, fontSize: 13,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, border: 'none', cursor: 'pointer'
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14"><path d="M11 1l-5 6m5-6h-4m4 0v4M2 6v6h6m-6-6l4 4" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Share {c.name}'s card
      </button>
    </div>);

}

// End screen
function EndCard({ onRestart }) {
  return (
    <div className="z-bubble-in" style={{
      background: 'linear-gradient(160deg, #1A0A35, #2D1560)',
      color: '#fff', borderRadius: 24, padding: '28px 22px',
      marginBottom: 14, boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
      textAlign: 'center', position: 'relative', overflow: 'hidden'
    }}>
      <ZCreature size={64} mood="celebrating" breathing={false} />
      <div className="z-serif" style={{ fontSize: 26, fontWeight: 600, marginTop: 14, lineHeight: 1.15, textWrap: 'balance', fontFamily: "Montserrat" }}>
        This is what one trip looks like with zyro.
      </div>
      <div className="z-serif" style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.15, marginTop: 4,
        background: 'linear-gradient(90deg, #D4F05A, #9B7FFF)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontFamily: "Montserrat" }}>
        Imagine 50.
      </div>
      <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.7)', marginTop: 14, fontStyle: 'italic',
        lineHeight: 1.5 }}>
        Decide less. Live more. Get paid.
      </div>
      <button onClick={(e) => {e.stopPropagation();onRestart && onRestart();}} style={{
        marginTop: 22, width: '100%', height: 52, borderRadius: 999,
        background: '#D4F05A', color: '#1A0F3D', fontWeight: 600, fontSize: 15,
        border: 'none', cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(212,240,90,0.35)'
      }}>
        Join the waitlist →
      </button>
    </div>);

}

Object.assign(window, { PanelA, PanelB, PanelC, EndCard });