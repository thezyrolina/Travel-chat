// The full scripted demo timeline.
// 5 friends · $2K/person budget · zyro asks 1-2 questions, then decides.

const SCRIPT = [
  // ─────────── Moment 1: Solo intro ───────────
  { type:'scene', value:'solo' },
  { type:'msg', from:'cassie', text:"zyro, planning a Japan trip for 5 of us in October. Help." },
  { type:'typing', ms: 700 },
  { type:'msg', from:'zyro', text:"October Japan: koyo season, *chef's kiss*. Two quick reads: cozy/cultural or party/big-city? And what's the per-person budget?" },
  { type:'msg', from:'cassie', text:"cozy + cultural. ~$2K each, Sam will riot otherwise" },
  { type:'mood', value:'thinking' },
  { type:'typing', ms: 800 },
  { type:'mood', value:'idle' },
  { type:'toast', text:'Saved: cozy/cultural · $2K cap · October', sub:'+3% Trust Score · Earning-eligible signal' },
  { type:'trust', value: 81 },
  { type:'msg', from:'zyro', text:"Locked in. Pulling your flight first, then I'll loop the crew for lodging." },

  // ─────────── Moment 2: Solo planning (1 flight rec) ───────────
  { type:'cards', kind:'flights' },
  { type:'msg', from:'cassie', text:"perfect, hold it" },
  { type:'mood', value:'excited' },
  { type:'toast', text:'Flight held: JAL JL5 · $1,840', sub:'Action-validated signal · +2% Trust Score' },
  { type:'trust', value: 83 },
  { type:'mood', value:'idle' },
  { type:'cards', kind:'soloPicks' },

  // ─────────── Moment 3: The hinge ───────────
  { type:'msg', from:'cassie', text:"now lodging, should I just pick or…?" },
  { type:'typing', ms: 700 },
  { type:'msg', from:'zyro', text:"This one's a group call. Lodging is where group trips fall apart over text 😅. Want me to drop into your thread with Maya, Jordan, Priya, and Sam?" },
  { type:'cards', kind:'groupCTA' },
  { type:'msg', from:'cassie', text:"yes pls" },
  { type:'msg', from:'zyro', text:"On it. I won't read past messages, just there when you @ me." },
  { type:'transition' },

  // ─────────── Moment 4: Group — one question, one decision ───────────
  { type:'scene', value:'group' },
  { type:'mood', value:'idle' },
  { type:'msg', from:'zyro', text:"Hey crew 👋 Cassie pulled me in for Japan lodging. One quick ask: what's the **one thing** each of you needs?", inGroup:true },
  { type:'msg', from:'maya',   text:"tokyo nights. shibuya energy", inGroup:true },
  { type:'msg', from:'jordan', text:"a ryokan night with onsen. non-negotiable", inGroup:true },
  { type:'msg', from:'priya',  text:"kyoto temples 🥹", inGroup:true },
  { type:'msg', from:'sam',    text:"under $2K each, please and thank you", inGroup:true },
  { type:'mood', value:'thinking' },
  { type:'typing', ms: 1100, inGroup:true },
  { type:'mood', value:'idle' },
  { type:'msg', from:'zyro', text:"Got it. Here are 3 itineraries that hit everyone's must-have, all under $2K. **Option A** is my pick. Hakone gives Jordan the onsen, Tokyo + Kyoto cover the rest, $1,930/person.", inGroup:true, hasReadout: true },

  // ─────────── Moment 5: 3 recs, group picks A ───────────
  { type:'cards', kind:'itineraries', inGroup:true },
  { type:'msg', from:'maya',   text:"A. easy", inGroup:true },
  { type:'msg', from:'jordan', text:"A. onsen wins", inGroup:true },
  { type:'msg', from:'priya',  text:"A 🥹", inGroup:true },
  { type:'msg', from:'sam',    text:"A. under cap, no notes", inGroup:true },
  { type:'msg', from:'cassie', text:"A. lock it", inGroup:true },
  { type:'mood', value:'celebrating' },
  { type:'cards', kind:'confirm', inGroup:true },
  { type:'mood', value:'idle' },

  // ─────────── Moment 6: Value reveal ───────────
  { type:'scene', value:'reveal' },
  { type:'panel', value:'A' },
  { type:'panel', value:'B' },
  { type:'panel', value:'C' },
  { type:'end' },
];

// Quickly find scene boundaries for "skip to reveal"
function findSceneStart(scriptArr, scene) {
  for (let i = 0; i < scriptArr.length; i++) {
    if (scriptArr[i].type === 'scene' && scriptArr[i].value === scene) return i;
  }
  return 0;
}

window.SCRIPT = SCRIPT;
window.findSceneStart = findSceneStart;
