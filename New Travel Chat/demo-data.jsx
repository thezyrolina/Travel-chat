// Group cast — personas locked per brief
const CAST = {
  cassie:  { id:'cassie',  name:'Cassie',  emoji:'🌙', color:'#8B5FE8', persona:'The Strategic Explorer · INTP', vibe:'Cozy + Creative + Intuitive', trust: 78, isMe: true },
  zyro:    { id:'zyro',    name:'zyro',    color:'#6B3FD4', persona:null, isAssistant: true },
  maya:    { id:'maya',    name:'Maya',    emoji:'🔥', color:'#FF6B9D', persona:'The Bold Adventurer · Aries',   vibe:'Bold + Energetic + Curious',  trust: 64 },
  jordan:  { id:'jordan',  name:'Jordan',  emoji:'🌊', color:'#5DC9E8', persona:'The Compassionate Visionary · Cancer', vibe:'Calm + Analytical + Supportive', trust: 71 },
  priya:   { id:'priya',   name:'Priya',   emoji:'🎨', color:'#D4F05A', persona:'The Quiet Tastemaker · INFJ',  vibe:'Aesthetic + Intentional + Curious', trust: 58 },
  sam:     { id:'sam',     name:'Sam',     emoji:'💵', color:'#7BD3A8', persona:'The Deal-Savvy Planner',       vibe:'Practical + Resourceful + Driven',  trust: 49 },
};

// Trust score → tier label
function trustTier(score) {
  if (score >= 90) return { label:'Fully Calibrated', glow: true };
  if (score >= 76) return { label:'Mind Meld', glow: 'subtle' };
  if (score >= 51) return { label:'Dialed In', glow: false };
  if (score >= 26) return { label:'Getting Warm', glow: false };
  return { label:'Just Met', glow: false };
}

// Flight options (Moment 2). zyro picks JAL, shows 2 alternates.
const FLIGHT = {
  airline:'JAL', flight:'JL5', route:'JFK → HND',
  depart:'Oct 12 · 1:55p', arrive:'Oct 13 · 5:25p',
  duration:'14h 30m · direct', cabin:'Premium Economy',
  price:1840,
  why:"Direct, lands morning, premium economy fits your $2K cap with $160 to spare. I checked ANA and United, this was the call.",
};

const FLIGHT_ALTS = [
  {
    airline:'ANA', flight:'NH9', cabin:'Premium Economy',
    depart:'Oct 12 · 11:00a', arrive:'Oct 13 · 3:35p',
    duration:'14h 35m · direct', price:1920,
    why:"More legroom, gentler boarding, in-cabin tea service. The cozy choice, $80 more.",
  },
  {
    airline:'United', flight:'UA79', cabin:'Economy Plus',
    depart:'Oct 12 · 10:30a', arrive:'Oct 13 · 7:15p',
    duration:'16h 45m · 1 stop SFO', price:1510,
    why:"$330 under cap. The layover stings on a 14h trip though, not your speed.",
  },
];

// Three itinerary recommendations (Moment 5). Option A is zyro's pick.
const ITINS = [
  {
    id:'A', name:'Tokyo + Hakone Ryokan + Kyoto',
    nights:7, dates:'Oct 12–19', pricePerPerson: 1930,
    recommended: true,
    fits:[
      { who:'maya',   note:'Tokyo nights' },
      { who:'jordan', note:'Onsen ryokan' },
      { who:'priya',  note:'Kyoto temples' },
      { who:'cassie', note:'Cozy + cultural' },
      { who:'sam',    note:'Under $2K ✓' },
    ],
  },
  {
    id:'B', name:'Tokyo + Naoshima + Kyoto',
    nights:7, dates:'Oct 12–19', pricePerPerson: 1980,
    fits:[
      { who:'maya',   note:'Tokyo' },
      { who:'priya',  note:'Naoshima ✨' },
      { who:'cassie', note:'Kyoto' },
      { who:'jordan', note:'No onsen' },
      { who:'sam',    note:'Under cap' },
    ],
  },
  {
    id:'C', name:'Tokyo + Hakone + Kyoto + Osaka',
    nights:8, dates:'Oct 12–20', pricePerPerson: 1995,
    fits:[
      { who:'maya',   note:'Osaka nightlife' },
      { who:'jordan', note:'Onsen ryokan' },
      { who:'cassie', note:'Kyoto' },
      { who:'priya',  note:'No Naoshima' },
      { who:'sam',    note:'$5 to spare 😅' },
    ],
  },
];

// Single itin alias kept for any leftover refs
const ITIN = ITINS[0];

// Vibe Cards for Moment 6 panel C
const VIBE_CARDS = [
  { who:'maya',   superlative:'Most Likely to Add a 4 AM Karaoke Detour' },
  { who:'jordan', superlative:'Most Likely to Save the Trip with One Onsen Recommendation' },
  { who:'priya',  superlative:'Best Eye for the Detour Worth Taking' },
  { who:'sam',    superlative:'Most Likely to Find the Hidden $200 You Missed' },
  { who:'cassie', superlative:'Most Likely to Get Everyone in One Place Without Losing It' },
];

Object.assign(window, { CAST, trustTier, FLIGHT, FLIGHT_ALTS, ITIN, ITINS, VIBE_CARDS });
