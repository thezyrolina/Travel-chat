// Inline cards: flight (one rec), solo picks, group CTA, itinerary (one rec), confirm, vibe cards.

// ── Flights (3 options, JAL recommended) ─────────────────────
function FlightCards() {
  const f = FLIGHT;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.55)', fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.06em', padding: '4px 0 8px 4px' }}>
        ✈️ 3 options · JFK → HND · zyro picked one
      </div>

      {/* Hero — JAL recommended */}
      <div className="z-bubble-in" style={{
        background: '#fff', borderRadius: 18,
        padding: '14px 16px', color: '#1A0F3D',
        border: '2px solid #D4F05A',
        boxShadow: '0 6px 20px rgba(212,240,90,0.25)',
        marginBottom: 8,
        position: 'relative',
      }}>
        <div style={{
          display: 'inline-block',
          fontSize: 9.5, fontWeight: 700, letterSpacing: '0.06em',
          padding: '3px 8px', borderRadius: 999,
          background: '#D4F05A', color: '#1A0F3D',
          marginBottom: 8,
        }}>✨ ZYRO'S PICK</div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, fontSize: 15 }}>{f.airline}</span>
            <span style={{ fontSize: 11, color: '#8A82A8' }}>{f.flight}</span>
            <span style={{ fontSize: 10.5, color: '#6B3FD4', padding: '1px 7px', background: 'rgba(91,63,255,0.08)', borderRadius: 5, fontWeight: 600 }}>{f.cabin}</span>
          </div>
          <div className="z-mono" style={{ fontSize: 16, fontWeight: 600, fontFamily: '"Work Sans"' }}>${f.price.toLocaleString()}</div>
        </div>
        <div style={{ fontSize: 12, color: '#4A3F6D', marginBottom: 8 }}>
          {f.depart} → {f.arrive}
          <div style={{ color: '#8A82A8', fontSize: 11, marginTop: 1 }}>{f.duration}</div>
        </div>
        <div style={{ fontSize: 11.5, color: '#6B3FD4', fontStyle: 'italic', lineHeight: 1.45,
          paddingTop: 8, borderTop: '1px solid rgba(91,63,255,0.1)' }}>
          "{f.why}"
        </div>
        <div style={{ marginTop: 10, padding: '7px 10px', background: 'rgba(212,240,90,0.18)',
          borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#3F5800',
          display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6l3 3 5-7" stroke="#3F5800" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Held for 24h · tap to confirm
        </div>
      </div>

      {/* Alternates — equal weight, full why-line */}
      {FLIGHT_ALTS.map((a, i) => (
        <div key={i} className="z-bubble-in" style={{
          background: '#fff', borderRadius: 18,
          padding: '12px 14px', color: '#1A0F3D',
          boxShadow: '0 1px 3px rgba(26,15,61,0.06)',
          marginBottom: 8,
          opacity: 0.96,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{a.airline}</span>
              <span style={{ fontSize: 10.5, color: '#8A82A8' }}>{a.flight}</span>
              <span style={{ fontSize: 10, color: '#6B3FD4', padding: '1px 6px', background: 'rgba(91,63,255,0.06)', borderRadius: 5, fontWeight: 600 }}>{a.cabin}</span>
            </div>
            <div className="z-mono" style={{ fontSize: 14, fontWeight: 600, fontFamily: '"Work Sans"', color: '#1A0F3D' }}>${a.price.toLocaleString()}</div>
          </div>
          <div style={{ fontSize: 11.5, color: '#4A3F6D', marginBottom: 6 }}>
            {a.depart} → {a.arrive}
            <div style={{ color: '#8A82A8', fontSize: 10.5, marginTop: 1 }}>{a.duration}</div>
          </div>
          <div style={{ fontSize: 11, color: '#6B3FD4', fontStyle: 'italic', lineHeight: 1.45,
            paddingTop: 7, borderTop: '1px solid rgba(91,63,255,0.08)' }}>
            "{a.why}"
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Solo pick cards (teppanyaki + bookstore) ─────────────────
function SoloPicks() {
  const picks = [
    { tag: 'TOKYO · DINNER', title: 'Aragawa', sub: "Chef's-counter teppanyaki · Shimbashi",
      why: "INTP read: you'll want one solo, hyper-focused meal. Group can sit it out.", icon: '🍴' },
    { tag: 'TOKYO · WANDER', title: 'Komiyama Books', sub: 'Photo-book heaven · Jimbocho',
      why: 'Pure vibe match. No group input needed.', icon: '📚' },
  ];
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.55)', fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.06em', padding: '4px 0 8px 4px' }}>
        Just for you (the group doesn't need to weigh in)
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {picks.map((p, i) =>
          <div key={i} className="z-bubble-in" style={{
            background: '#fff', borderRadius: 18, padding: '12px 14px', color: '#1A0F3D',
            boxShadow: '0 1px 3px rgba(26,15,61,0.06)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
              <div style={{ fontSize: 24 }}>{p.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9.5, color: '#8A82A8', fontWeight: 700, letterSpacing: '0.08em' }}>{p.tag}</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{p.title}</div>
                <div style={{ fontSize: 11.5, color: '#4A3F6D', marginTop: 1 }}>{p.sub}</div>
                <div style={{ fontSize: 11, color: '#6B3FD4', fontStyle: 'italic', marginTop: 6, lineHeight: 1.4 }}>"{p.why}"</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Group CTA ───────────────────────────────────────────────
function GroupCTACard({ onTap, taken }) {
  return (
    <div className="z-bubble-in" style={{ marginBottom: 10 }}>
      <div className="z-group-cta" onClick={() => !taken && onTap && onTap()} style={{
        background: 'linear-gradient(135deg, #D4F05A, #B8E03E)', color: '#1A0F3D',
        borderRadius: 18, padding: '14px 16px', cursor: taken ? 'default' : 'pointer',
        marginLeft: 6,
      }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', opacity: 0.7 }}>
          GROUP DECISION DETECTED
        </div>
        <div style={{ fontSize: 14.5, fontWeight: 600, marginTop: 4, lineHeight: 1.4 }}>
          Start a group with Maya, Jordan, Priya & Sam?
        </div>
        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ display: 'flex' }}>
            {['maya', 'jordan', 'priya', 'sam'].map((m, i) =>
              <div key={m} style={{ marginLeft: i === 0 ? 0 : -8, border: '2px solid #D4F05A', borderRadius: '50%' }}>
                <ZAvatar who={m} size={22} />
              </div>
            )}
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, marginLeft: 'auto' }}>
            {taken ? '✓ Group started' : 'Tap to confirm →'}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Itinerary cards (3 recommendations, A is zyro's pick) ──
function ItineraryCards() {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.55)', fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.06em', padding: '4px 0 8px 32px' }}>
        ✨ 3 itineraries · zyro recommends Option A
      </div>
      <div style={{ marginLeft: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ITINS.map((it) => (
          <div key={it.id} className="z-bubble-in" style={{
            background: '#fff', borderRadius: 18, padding: '14px 14px 12px', color: '#1A0F3D',
            boxShadow: it.recommended ? '0 4px 14px rgba(26,15,61,0.12)' : '0 2px 8px rgba(26,15,61,0.08)',
            border: it.recommended ? '2px solid #D4F05A' : '2px solid transparent',
            position: 'relative', overflow: 'hidden',
          }}>
            {it.recommended && (
              <div style={{
                marginBottom: 10,
                display: 'inline-block',
                fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
                padding: '3px 8px', borderRadius: 999,
                background: '#D4F05A', color: '#1A0F3D',
              }}>✨ RECOMMENDED</div>
            )}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9.5, color: '#8A82A8', fontWeight: 700, letterSpacing: '0.08em' }}>
                  OPTION {it.id} · {it.nights} NIGHTS · {it.dates.toUpperCase()}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2, lineHeight: 1.3 }}>
                  {it.name}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div className="z-mono" style={{ fontSize: 16, fontWeight: 600, color: '#1A0F3D', fontFamily: '"Work Sans"' }}>
                  ${it.pricePerPerson.toLocaleString()}
                </div>
                <div style={{ fontSize: 9.5, color: '#8A82A8' }}>per person</div>
              </div>
            </div>

            {/* per-member fit chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 10 }}>
              {it.fits.map((f, i) => {
                const win = !f.note.startsWith('No') && !f.note.includes('😅');
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    padding: '3px 8px 3px 3px', borderRadius: 999,
                    background: win ? 'rgba(61,224,160,0.14)' : 'rgba(255,90,139,0.12)',
                    fontSize: 10.5, fontWeight: 500,
                    color: win ? '#1A6B4A' : '#9B2D49',
                  }}>
                    <ZAvatar who={f.who} size={16} />
                    <span>{f.note}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Booking confirmation card ────────────────────────────────
function ConfirmCard() {
  const it = ITIN;
  return (
    <div className="z-bubble-in" style={{ marginBottom: 10, marginLeft: 32 }}>
      <div className="z-shine" style={{
        background: 'linear-gradient(135deg, #2D1560, #6B3FD4)',
        color: '#fff', borderRadius: 20, padding: '16px 16px 14px',
        boxShadow: '0 8px 30px rgba(45,21,96,0.5)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(212,240,90,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7l3 3 7-8" stroke="#D4F05A" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#D4F05A' }}>
            LOCKED IN
          </span>
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>
          {it.name}
        </div>
        <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
          {it.nights} nights · {it.dates} · 5 travelers
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 10 }}>
          <span className="z-mono" style={{ fontSize: 22, fontWeight: 600, color: '#D4F05A' }}>${it.pricePerPerson.toLocaleString()}</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>per person · group rate</span>
        </div>
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 11px', background: 'rgba(255,255,255,0.08)', borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.12)' }}>
          <svg width="22" height="14" viewBox="0 0 24 14">
            <rect x="0" y="0" width="24" height="14" rx="2" fill="#1A1F71" />
            <text x="12" y="10" fontSize="6" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Arial">VISA</text>
          </svg>
          <span style={{ fontSize: 11.5, fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>
            Visa-pay-ready when you're ready to book
          </span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { FlightCards, SoloPicks, GroupCTACard, ItineraryCards, ConfirmCard });
