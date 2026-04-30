// Main demo app — state machine driving the scripted timeline.
//
// Engine model (single source of truth: stepRef):
//   - User tap calls runFrom(stepRef.current).
//   - runFrom executes ONE step, advances stepRef, then:
//       * if action is "auto" (scene/typing/mood/trust/transition/toast-dismiss) -> chains runFrom(next) on a timer
//       * if action is "stop" (msg/cards/panel/end) -> returns; waits for next tap
//   - Step state mirrors stepRef for UI ("3/47"), but engine reads the ref.
// This avoids the duplicate-bubble bug from the prior version.

const { useState, useEffect, useRef, useMemo } = React;

const STOP_TYPES = new Set(['msg', 'cards', 'panel', 'end']);

function ZyroDemo() {
  const stepRef = useRef(0);
  const [stepUI, setStepUI] = useState(0);
  const [scene, setScene] = useState('solo');
  const [history, setHistory] = useState([]);
  const [trustScore, setTrustScore] = useState(78);
  const [mood, setMood] = useState('idle');
  const [toast, setToast] = useState(null);
  const [typing, setTyping] = useState(null);
  const [groupAccepted, setGroupAccepted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [revealedPanels, setRevealedPanels] = useState({ A:false, B:false, C:false });
  const [showEnd, setShowEnd] = useState(false);
  const [showHelp, setShowHelp] = useState(true);

  const scrollRef = useRef(null);
  const timersRef = useRef([]);
  const runningRef = useRef(false); // prevents re-entry during chained autos

  const clearTimers = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };
  const t = (fn, ms) => { const id = setTimeout(fn, ms); timersRef.current.push(id); return id; };

  // Sync ref → UI
  const setStep = (n) => { stepRef.current = n; setStepUI(n); };

  useEffect(() => {
    if (scrollRef.current) {
      requestAnimationFrame(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      });
    }
  }, [history.length, typing, toast, revealedPanels.A, revealedPanels.B, revealedPanels.C, showEnd]);

  useEffect(() => { if (stepUI > 0) setShowHelp(false); }, [stepUI]);

  // Run from idx — execute one action, advance pointer, chain if auto.
  const runFrom = (idx) => {
    if (idx >= SCRIPT.length) return;
    const s = SCRIPT[idx];
    const next = idx + 1;
    setStep(next);

    switch (s.type) {
      case 'scene': {
        setScene(s.value);
        if (s.value !== 'reveal') setHistory([]);
        t(() => runFrom(next), 50);
        return;
      }
      case 'msg': {
        setTyping(null);
        setHistory(h => h.some(x => x.id === idx) ? h : [...h, { ...s, id: idx }]);
        return; // stop — wait for tap
      }
      case 'typing': {
        setTyping({ inGroup: !!s.inGroup });
        t(() => {
          setTyping(null);
          runFrom(next);
        }, s.ms || 700);
        return;
      }
      case 'toast': {
        setToast({ text: s.text, sub: s.sub });
        return; // stop — toast auto-dismisses, which will continue
      }
      case 'trust': {
        setTrustScore(s.value);
        t(() => runFrom(next), 250);
        return;
      }
      case 'mood': {
        setMood(s.value);
        t(() => runFrom(next), 100);
        return;
      }
      case 'cards': {
        const addCard = (entry) => setHistory(h => h.some(x => x.id === idx) ? h : [...h, entry]);
        if (s.kind === 'flights')      addCard({ type:'cards-flights',   id: idx, inGroup: s.inGroup });
        if (s.kind === 'soloPicks')    addCard({ type:'cards-soloPicks', id: idx });
        if (s.kind === 'groupCTA')     addCard({ type:'cards-groupCTA',  id: idx });
        if (s.kind === 'itineraries')  addCard({ type:'cards-itin',      id: idx, inGroup: true });
        if (s.kind === 'confirm')      addCard({ type:'cards-confirm',   id: idx, inGroup: true });
        return; // stop — wait for tap
      }
      case 'transition': {
        setTransitioning(true);
        t(() => setTransitioning(false), 800);
        t(() => runFrom(next), 900);
        return;
      }
      case 'panel': {
        setRevealedPanels(p => ({ ...p, [s.value]: true }));
        return; // stop
      }
      case 'end': {
        setShowEnd(true);
        return; // stop
      }
      default:
        runFrom(next);
    }
  };

  // User tap — advance from current ref.
  const advance = () => {
    if (stepRef.current >= SCRIPT.length) return;
    if (toast) {
      setToast(null);
      // continue from current ref (toast already advanced step)
      t(() => runFrom(stepRef.current), 80);
      return;
    }
    runFrom(stepRef.current);
  };

  const restart = () => {
    clearTimers();
    setStep(0);
    setScene('solo');
    setHistory([]);
    setTrustScore(78);
    setMood('idle');
    setToast(null);
    setTyping(null);
    setGroupAccepted(false);
    setTransitioning(false);
    setRevealedPanels({ A:false, B:false, C:false });
    setShowEnd(false);
    setShowHelp(true);
  };

  const skipToReveal = () => {
    clearTimers();
    const target = findSceneStart(SCRIPT, 'reveal');
    setScene('reveal');
    setHistory([]);
    setTrustScore(83);
    setMood('idle');
    setToast(null);
    setTyping(null);
    setGroupAccepted(true);
    setRevealedPanels({ A:true, B:false, C:false });
    setShowEnd(false);
    setStep(target + 2); // past scene + first panel
    setShowHelp(false);
  };

  const isReveal = scene === 'reveal';
  const isGroup = scene === 'group';

  return (
    <div onClick={advance} style={{ height:'100%', cursor: stepRef.current < SCRIPT.length ? 'pointer' : 'default' }}>
      {!isReveal && (isGroup ? <GroupHeader mood={mood} /> : <SoloHeader mood={mood} transitioning={transitioning} />)}
      {isReveal && <RevealHeader />}

      <TrustChip score={trustScore} />

      {toast && <SignalToast text={toast.text} sub={toast.sub} onDismiss={() => {
        setToast(null);
        t(() => runFrom(stepRef.current), 80);
      }} />}

      <div ref={scrollRef} className="z-noscroll" style={{
        position:'absolute', top: isReveal ? 100 : 152, bottom: 32, left: 0, right: 0,
        overflowY:'auto', padding: '12px 14px 24px',
        background: isReveal
          ? 'var(--tk-reveal-grad)'
          : 'var(--tk-stage-grad)',
      }}>
        {isReveal ? (
          <RevealStream
            revealed={revealedPanels}
            showEnd={showEnd}
            onRestart={restart}
          />
        ) : (
          <ChatStream
            history={history}
            typing={typing}
            groupAccepted={groupAccepted}
            onAcceptGroup={() => {
              setGroupAccepted(true);
              t(() => runFrom(stepRef.current), 350);
            }}
          />
        )}
      </div>

      {!showEnd && ReactDOM.createPortal(
        <>
          <button onClick={(e)=>{e.stopPropagation(); restart();}} style={{
            fontSize:11, color:'rgba(255,255,255,0.75)', background:'transparent',
            padding:'4px 10px', borderRadius:999, border:'1px solid rgba(255,255,255,0.18)',
            cursor:'pointer', fontFamily:'inherit',
          }}>↻ Restart</button>
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.55)', minWidth:120, textAlign:'center' }}>
            {showHelp ? 'tap anywhere to advance' : `${Math.min(stepUI, SCRIPT.length)}/${SCRIPT.length}`}
          </div>
          <button onClick={(e)=>{e.stopPropagation(); skipToReveal();}} style={{
            fontSize:11, color:'rgba(255,255,255,0.75)', background:'transparent',
            padding:'4px 10px', borderRadius:999, border:'1px solid rgba(255,255,255,0.18)',
            cursor:'pointer', fontFamily:'inherit',
          }}>Skip to reveal →</button>
        </>,
        document.getElementById('controls-host')
      )}
    </div>
  );
}

function RevealHeader() {
  return (
    <div style={{
      paddingTop: 60, paddingBottom: 12,
      display:'flex', flexDirection:'column', alignItems:'center', gap:3,
      position:'relative', zIndex:5,
    }}>
      <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:'0.14em',
        color:'var(--tk-header-ink-2)', textTransform:'uppercase' }}>
        SESSION SUMMARY
      </div>
      <div className="z-serif" style={{ fontSize:18, fontWeight:600, color:'var(--tk-header-ink)' }}>
        The Quiet Sake Society
      </div>
    </div>
  );
}

function ChatStream({ history, typing, groupAccepted, onAcceptGroup }) {
  return (
    <>
      {history.map((h) => {
        if (h.type === 'msg') return <ChatBubble key={h.id} from={h.from} text={h.text} inGroup={h.inGroup} hasReadout={h.hasReadout} />;
        if (h.type === 'cards-flights')   return <FlightCards   key={h.id} />;
        if (h.type === 'cards-soloPicks') return <SoloPicks     key={h.id} />;
        if (h.type === 'cards-groupCTA')  return <GroupCTACard  key={h.id} taken={groupAccepted} onTap={onAcceptGroup} />;
        if (h.type === 'cards-itin')      return <ItineraryCards key={h.id} />;
        if (h.type === 'cards-confirm')   return <ConfirmCard   key={h.id} />;
        return null;
      })}
      {typing && <TypingBubble inGroup={typing.inGroup} />}
    </>
  );
}

function RevealStream({ revealed, showEnd, onRestart }) {
  return (
    <>
      <PanelA revealed={revealed.A} />
      <PanelB revealed={revealed.B} />
      <PanelC revealed={revealed.C} />
      {showEnd && <EndCard onRestart={onRestart} />}
      {!showEnd && (revealed.A || revealed.B || revealed.C) && (
        <div style={{
          textAlign:'center', fontSize:10.5, color:'rgba(255,255,255,0.3)',
          padding:'8px 0', letterSpacing:'0.06em',
        }}>tap to reveal next ↓</div>
      )}
    </>
  );
}

window.ZyroDemo = ZyroDemo;
