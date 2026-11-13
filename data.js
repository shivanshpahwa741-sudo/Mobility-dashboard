// India mobility map data - given inputs only.

const COLUMNS = ['2W', '3W', '4W', '>4W (buses & trucks)'];
const ROWS = ['Private (Personal)', 'Public Passenger', 'Private Commercial', 'Public Commercial'];

// Intracity cells, keyed "col|row".
// facts: [text, srcKey]. leaders: {name, tag, blurb, srcKey, more, moreSrc}
const CELLS = {
  '0|0': {
    stat: 'Commute, errands, family transport.',
    scope: 'Intracity',
    title: '2W - Private (Personal)',
    summary: 'Personal two-wheelers - scooters, mopeds and motorcycles - cover daily commuting, errands and family transport.',
    facts: [],
    leaders: [],
  },
  '1|0': {
    stat: 'Personal-use 3W rather than fare-earning ones.',
    scope: 'Intracity',
    title: '3W - Private (Personal)',
    summary: 'Three-wheelers owned for personal use rather than commercial work.',
    facts: [],
    leaders: [],
  },
  '2|0': {
    stat: 'Personal and family mobility.',
    scope: 'Intracity',
    title: '4W - Private (Personal)',
    summary: 'Private cars are personal and family mobility.',
    facts: [],
    leaders: [],
  },
  '0|1': {
    stat: 'Bike taxis carrying fare passengers.',
    scope: 'Intracity',
    title: '2W - Public Passenger (bike taxis)',
    summary: 'Two-wheelers carrying fare-paying passengers - bike taxis booked on platforms.',
    facts: [],
    leaders: [
      { name: 'Rapido', tag: 'private', blurb: 'Bike-taxi platform.', srcKey: null },
      { name: 'Uber Moto', tag: 'public/global', blurb: 'Two-wheeler taxi category on Uber.', srcKey: null },
    ],
  },
  '1|1': {
    stat: 'Autos carrying fare passengers.',
    scope: 'Intracity',
    title: '3W - Public Passenger (autos)',
    summary: 'Auto-rickshaws carrying fare-paying passengers, hailed on the street or booked on platforms.',
    facts: [],
    leaders: [
      { name: 'Namma Yatri', tag: 'private', blurb: 'Driver-owned auto booking platform on the ONDC network.', srcKey: null },
      { name: 'Uber Auto', tag: 'public/global', blurb: 'Auto category on Uber.', srcKey: null },
    ],
  },
  '2|1': {
    stat: 'Cabs carrying fare passengers.',
    scope: 'Intracity',
    title: '4W - Public Passenger (cabs)',
    summary: 'Cars carrying fare-paying passengers - app cabs, tourist taxis and fleet operators.',
    facts: [],
    leaders: [
      { name: 'Uber', tag: 'public/global', blurb: 'App cabs across Indian cities.', srcKey: null },
      { name: 'Ola', tag: 'private', blurb: 'App cabs across Indian cities.', srcKey: null },
    ],
  },
  '3|1': {
    stat: 'City and contract buses carrying fare passengers.',
    scope: 'Intracity',
    title: '>4W - Public Passenger (buses)',
    summary: 'Buses carrying fare-paying passengers - city bus services, stage carriages and contract buses.',
    facts: [],
    leaders: [],
  },
  '0|2': {
    stat: 'Business-owned 2W running its own errands.',
    scope: 'Intracity',
    title: '2W - Private Commercial (Captive/Own-Use)',
    summary: 'Two-wheelers a business owns for its own work - a store or restaurant running its own deliveries, for example.',
    facts: [],
    leaders: [],
  },
  '1|2': {
    stat: 'Captive 3W delivery - a business moving its own goods.',
    scope: 'Intracity',
    title: '3W - Private Commercial (Captive/Own-Use)',
    summary: 'Three-wheelers a business owns to move its own goods rather than freight for hire.',
    facts: [],
    leaders: [],
  },
  '2|2': {
    stat: 'Corporate-leased and company cars.',
    scope: 'Intracity',
    title: '4W - Private Commercial (Captive/Own-Use)',
    summary: 'Cars held for a business\'s own use - corporate-leased executive cars and company fleets.',
    facts: [],
    leaders: [],
  },
  '3|2': {
    stat: 'Company-owned trucks and school buses.',
    scope: 'Intracity',
    title: '>4W - Private Commercial (Captive/Own-Use)',
    summary: 'Heavy vehicles held for the owner\'s own use - company trucks moving the company\'s own goods, school buses, staff buses.',
    facts: [],
    leaders: [],
  },
  '0|3': {
    stat: 'For-hire 2W parcel and courier work.',
    scope: 'Intracity',
    title: '2W - Public Commercial (For-Hire/Logistics)',
    summary: 'Two-wheelers carrying other people\'s goods for a fee - hyperlocal parcel and courier work.',
    facts: [],
    leaders: [
      { name: 'Porter', tag: 'private', blurb: 'Two-wheeler courier and light goods platform.', srcKey: null },
      { name: 'Borzo', tag: 'private', blurb: 'Hyperlocal courier platform.', srcKey: null },
    ],
  },
  '1|3': {
    stat: 'Cargo 3W carrying goods for hire.',
    scope: 'Intracity',
    title: '3W - Public Commercial (For-Hire/Logistics)',
    summary: 'Cargo three-wheelers carrying other people\'s goods for a fee on short city hops.',
    facts: [],
    leaders: [],
  },
  '2|3': {
    stat: 'LCVs and vans carrying goods for hire.',
    scope: 'Intracity',
    title: '4W - Public Commercial (For-Hire/Logistics)',
    summary: 'Light commercial vehicles and vans carrying other people\'s goods for a fee - distribution, hub runs, market loads.',
    facts: [],
    leaders: [
      { name: 'Porter', tag: 'private', blurb: 'Light goods platform across city freight.', srcKey: null },
    ],
  },
  '3|3': {
    stat: 'Trucks carrying freight for hire.',
    scope: 'Intracity + intercity',
    title: '>4W - Public Commercial (trucks)',
    summary: 'Trucks carrying other people\'s freight for a fee - inside cities on construction, wholesale and port runs, and between cities on long-haul routes.',
    facts: [],
    leaders: [
      { name: 'BlackBuck', tag: 'public (NSE/BSE)', blurb: 'Listed digital freight-matching platform for trucking.', srcKey: null },
    ],
  },
};

// Intercity (between cities) - a different market from intracity.
const CELLS_X = {
  'x0|0': {
    stat: 'Leisure touring and inter-town commutes.',
    scope: 'Intercity',
    title: '2W - Private (Personal), intercity',
    summary: 'Intercity two-wheeler travel covers leisure touring and longer inter-town commutes.',
    facts: [],
    leaders: [],
  },
  'x1|0': {
    na: true,
    stat: 'No intercity format.',
    scope: 'Intercity',
    title: '3W - Private (Personal), intercity',
    summary: 'Not applicable - three-wheelers are a city-range format.',
    facts: [],
    leaders: [],
  },
  'x2|0': {
    stat: 'Family highway travel.',
    scope: 'Intercity',
    title: '4W - Private (Personal), intercity',
    summary: 'Private cars cover family and personal intercity travel on highways.',
    facts: [],
    leaders: [],
  },
  'x0|1': {
    na: true,
    stat: 'No intercity format.',
    scope: 'Intercity',
    title: '2W - Public Passenger, intercity',
    summary: 'Not applicable - bike taxis are an urban, short-hop format.',
    facts: [],
    leaders: [],
  },
  'x1|1': {
    na: true,
    stat: 'No intercity format.',
    scope: 'Intercity',
    title: '3W - Public Passenger, intercity',
    summary: 'Not applicable - auto-rickshaws are an urban format.',
    facts: [],
    leaders: [],
  },
  'x2|1': {
    stat: 'Outstation cabs and intercity rentals.',
    scope: 'Intercity',
    title: '4W - Public Passenger, intercity (outstation)',
    summary: 'Outstation cabs and intercity car rentals serve city-to-city travel: airport runs, weekend routes, family trips.',
    facts: [],
    leaders: [],
  },
  'x3|1': {
    stat: 'Intercity buses on city-to-city routes.',
    scope: 'Intercity',
    title: '>4W - Public Passenger, intercity (buses)',
    summary: 'Intercity buses carry fare-paying passengers between cities, from ordinary coaches to sleeper services.',
    facts: [],
    leaders: [],
  },
  'x0|2': {
    na: true,
    stat: 'No intercity format.',
    scope: 'Intercity',
    title: '2W - Private Commercial, intercity',
    summary: 'Not applicable - business-owned two-wheelers work close to their base.',
    facts: [],
    leaders: [],
  },
  'x1|2': {
    na: true,
    stat: 'No intercity format.',
    scope: 'Intercity',
    title: '3W - Private Commercial, intercity',
    summary: 'Not applicable - captive cargo three-wheelers are a city-range format.',
    facts: [],
    leaders: [],
  },
  'x2|2': {
    stat: 'Company cars on intercity business travel.',
    scope: 'Intercity',
    title: '4W - Private Commercial, intercity',
    summary: 'Company and corporate-leased cars run intercity business trips - executive travel and site visits.',
    facts: [],
    leaders: [],
  },
  'x3|2': {
    stat: 'Captive trucks and buses on own routes.',
    scope: 'Intercity',
    title: '>4W - Private Commercial, intercity',
    summary: 'Company-owned trucks and buses run intercity on the owner\'s own work - plant-to-warehouse movements, school and staff transport.',
    facts: [],
    leaders: [],
  },
  'x0|3': {
    na: true,
    stat: 'No intercity format.',
    scope: 'Intercity',
    title: '2W - Public Commercial, intercity',
    summary: 'Not applicable - two-wheeler cargo is an intracity format.',
    facts: [],
    leaders: [],
  },
  'x1|3': {
    na: true,
    stat: 'No intercity format.',
    scope: 'Intercity',
    title: '3W - Public Commercial, intercity',
    summary: 'Not applicable - cargo three-wheelers are an intracity format.',
    facts: [],
    leaders: [],
  },
  'x2|3': {
    stat: 'Vans run some intercity freight; trucks are the main vehicle.',
    scope: 'Intercity',
    title: '4W - Public Commercial, intercity',
    summary: 'Small vans run some intercity freight; the main intercity cargo vehicle is the truck.',
    facts: [],
    leaders: [],
  },
  'x3|3': {
    stat: 'For-hire trucking between cities.',
    scope: 'Intercity freight',
    title: '>4W - Public Commercial, intercity (trucking)',
    summary: 'Long-haul for-hire trucking - freight moving between cities on trucks run by fleets and small operators.',
    facts: [],
    leaders: [
      { name: 'BlackBuck', tag: 'public (NSE/BSE)', blurb: 'Listed digital freight-matching platform for trucking.', srcKey: null },
    ],
  },
};

// ---- Use-case flow: given FY26 inputs (thinking-exercise display) ----
// Volumes in lakh units, values in Rs thousand crore. Range inputs computed at the end matching official counts.
// Splits: given four-way fleet-usage allocations (each row totals 100), applied to FY26 sales.
const FLOW_SEGMENTS = [
  { id:'2w',    name:'Two-wheelers',           color:'#e8604c', vol:217.06, volDisp:'~2.17 Cr',     val:257,  valDisp:'~\u20B92.57 L Cr', split:{ priv:0.86, pubp:0.02, prvc:0.01, pubc:0.11 }, note:'~11% (~2.8 Cr active bikes) run quick commerce, food delivery and parcel logistics; ~2% bike taxis.' },
  { id:'pv',    name:'Passenger vehicles',     color:'#eda944', vol:46.43,  volDisp:'~46.4 L',      val:547,  valDisp:'~\u20B95.47 L Cr', split:{ priv:0.88, pubp:0.07, prvc:0.04, pubc:0.01 }, note:'7% app cabs/tourist taxis; 4% corporate-leased executive cars; 1% self-drive rentals.' },
  { id:'cv',    name:'Commercial vehicles',    color:'#45ab90', vol:10.80,  volDisp:'~10.8 L',      val:238,  valDisp:'~\u20B92.38 L Cr', split:{ pubp:0.12, prvc:0.23, pubc:0.65 }, note:'12% stage/contract buses; 23% captive company trucks and school buses; 65% for-hire freight trucks.' },
  { id:'trac',  name:'Tractors',               color:'#7299c4', vol:11.60,  volDisp:'~10.5-11.6 L', val:97,   valDisp:'~\u20B997,000 Cr', split:{ prvc:0.75, pubc:0.25 }, note:'75% on-farm by owners (private business asset); ~25% rented out or hauling commercial goods.' },
  { id:'ce',    name:'Construction equipment', color:'#a68fd4', vol:1.35,   volDisp:'~1.3-1.4 L',   val:78.5, valDisp:'~\u20B978,500 Cr', split:{ prvc:0.40, pubc:0.60 }, note:'40% owned by infra developers (captive); 60% rental-agency machines leased out for hire.' },
  { id:'3w',    name:'Three-wheelers',         color:'#8cb84f', vol:8.36,   volDisp:'~8.4-13.6 L',  val:34,   valDisp:'~\u20B934,000 Cr', split:{ priv:0.01, pubp:0.78, prvc:0.03, pubc:0.18 }, note:'78% carry passengers (auto/e-rickshaws); 18% cargo 3Ws for hire; 3% captive delivery.' },
  { id:'micro', name:'Micro-mobility',         color:'#d67ba1', vol:15.0,   volDisp:'~15+ L',       val:14.5, valDisp:'~\u20B914,500 Cr', split:{ priv:0.55, pubp:0.10, pubc:0.35 }, note:'55% personal e-bikes/scooters; 35% B2B last-mile delivery rentals; 10% shared dockless rides.' },
];
const FLOW_BUCKETS = {
  priv: { name:'1. Private (Personal)',                    short:'Private' },
  pubp: { name:'2. Public Passenger (Fare/Taxi/Bus)',      short:'Public passenger' },
  prvc: { name:'3. Private Commercial (Captive/Own-Use)',  short:'Private commercial' },
  pubc: { name:'4. Public Commercial (For-Hire/Logistics)', short:'Public commercial' },
};

// ---- Layer figures: given inputs, each with its own metric, period and stated basis ----
// memo:true rows are subsets or embedded values - displayed for context, never additive.
const LAYER_FIGS = {
  l1: [
    { label:'Automotive Aftermarket & MRO', amount:'\u20B91,08,453 Cr', what:'Replacement parts, tires, batteries and lubricants sold to existing vehicles', period:'FY26', basis:'ACMA FY26 Review' },
    { label:'Auto Component Exports', amount:'\u20B92,12,176 Cr', what:'Export revenue ($24.0B) from Indian component makers to global OEMs', period:'FY26', basis:'ACMA FY26 Review' },
    { label:'Railways (Rolling Stock & Infra Capex)', amount:'\u20B92,65,000 Cr', what:'Annual capex on locomotives, coaches, wagons and track expansion', period:'FY26', basis:'Ministry of Railways' },
    { label:'Aviation (Market Size & MRO)', amount:'\u20B91,60,500 Cr', what:'Total civil & commercial aviation market ($18.14B), incl. operations and MRO', period:'FY26', basis:'India Aviation Market Report' },
    { label:'Maritime & Ports', amount:'\u20B91,57,000 Cr', what:'Sagarmala port modernization & coastal shipping infrastructure value (915 MT cargo at major ports)', period:'FY26', basis:'Ministry of Ports & PIB' },
    { label:'Auto Components (Total Industry)', amount:'\u20B97,59,234 Cr', what:'Total manufacturing turnover (OEM + aftermarket + exports); the OEM-supplies share (\u20B96,62,893 Cr) is embedded in vehicle prices, so excluded to avoid double counting', period:'FY26', basis:'ACMA FY26 Review', memo:true },
  ],
  l2: [
    { label:'National Highways Capex (NHAI)', amount:'\u20B92,44,362 Cr', what:'Annual capex for constructing and expanding National Highways (5,313 km built)', period:'FY26', basis:'MoRTH / PIB' },
    { label:'Diesel Retail Sales (HSD)', amount:'\u20B910,14,200 Cr', what:'Retail value of 94.7 MMT of diesel (~70% road freight, buses, agri-transport)', period:'FY26', basis:'PPAC Consumption Data' },
    { label:'Petrol Retail Sales (MS)', amount:'\u20B95,87,900 Cr', what:'Retail value of 42.6 MMT of petrol, used almost entirely in cars and two-wheelers', period:'FY26', basis:'PPAC Consumption Data' },
    { label:'Aviation Turbine Fuel (ATF)', amount:'\u20B91,17,200 Cr', what:'Commercial airline fuel consumption value (9.87 MMT)', period:'FY26', basis:'PPAC Estimates' },
  ],
  l3: [
    { label:'Total Freight & Logistics Market', amount:'\u20B927,95,700 Cr', what:'Total annual revenue ($315.9B): road trucking (65% share), rail/water freight, warehousing, express parcel/3PL', period:'FY26', basis:'Mordor Intelligence / Brickwork' },
    { label:'of which Railways Freight Revenue', amount:'\u20B91,77,754 Cr', what:'Tariff revenue from hauling 1,670 MT of rail cargo', period:'FY26', basis:'Ministry of Railways / PIB', memo:true },
    { label:'Railways Passenger Revenue', amount:'\u20B980,000 Cr', what:'Ticket revenue from carrying 741 crore passengers', period:'FY26', basis:'Ministry of Railways / PIB' },
    { label:'Road Passenger Ops (Buses, Cabs, 3Ws)', amount:'\u20B93,85,000 Cr', what:'Estimated annual fare revenue across state/private buses, ride-hailing and auto/e-rickshaw rides', period:'FY26', basis:'Industry Consensus Estimate' },
  ],
  l4: [
    { label:'Vehicle Loan Book (FinTech & Risk)', amount:'\u20B920,50,000 Cr', what:'STOCK: total outstanding vehicle loans - cars \u20B99.9L Cr, CVs \u20B97.4L Cr, 2Ws \u20B91.9L Cr, used cars \u20B91.3L Cr', period:'as of Jun 2026', basis:'CRIF High Mark Wheels Report' },
    { label:'Motor Insurance (FinTech & Risk)', amount:'\u20B999,093 Cr', what:'FLOW: gross direct annual motor insurance premium underwritten', period:'FY25', basis:'IRDAI / Economic Times' },
    { label:'Fleet & Supply Chain Software', amount:'\u20B911,500 Cr', what:'FLOW: annual market revenue ($1.30B) - telematics, route optimization, fleet SaaS', period:'CY25/FY26', basis:'India Fleet Management Report' },
    { label:'Autonomous, Connected & OS', amount:'\u20B945,666 Cr', what:'FLOW: connected-car hardware, embedded telematics and in-cabin OS ($5.16B across 9.8M active connected vehicles)', period:'CY25/FY26', basis:'India Connected Car Report' },
    { label:'ADAS Sub-Segment', amount:'\u20B912,036 Cr', what:'ADAS sensor, camera and radar fitment ($1.36B, ~18% CAGR)', period:'FY26', basis:'Mordor Intelligence ADAS', memo:true },
    { label:'Trade, Compliance & Governance', amount:'\u20B968,000 Cr', what:'FLOW: FASTag toll collections (~\u20B965,000+ Cr) plus customs brokerage and testing/homologation fees', period:'FY26', basis:'NPCI / Industry Estimate' },
  ],
};
