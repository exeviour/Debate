// PRE-POPULATED SEASON 4 DATA (ALIGNED WITH DISPLAY PDFs & CONSOLIDATED CODE)
// ============================================================================

export const INITIAL_BATTLES = [
  {
    id: 'btl-12894',
    code: '#12894',
    title: 'AI will completely replace human software engineers by 2030.',
    category: 'Debate',
    mode: 'Live War',
    host: 'Kinglex',
    entry_fee: 1.5,
    prize_pool: 12.0,
    slots: '6/8 MCs',
    status: 'live',
    payouts_disbursed: false,
    entries: [
      {
        id: 'ent-kinglex',
        full_name: 'Kinglex',
        handle: '@kinglex',
        level: 'LVL 42',
        stance: 'Proposition (A)',
        institution: 'Harare Debate Society • Zimbabwe',
        judge_score: 88.0,
        default_gateway: 'ecocash',
        recipient_account: '+263 77 123 4567'
      },
      {
        id: 'ent-rxa',
        full_name: 'RXA',
        handle: '@rxa_orator',
        level: 'LVL 38',
        stance: 'Opposition (B)',
        institution: 'Global Orators Guild • South Africa',
        judge_score: 82.0,
        default_gateway: 'innbucks',
        recipient_account: '+263 71 890 2231'
      }
    ]
  },
  {
    id: 'btl-304',
    code: '#304',
    title: 'Universal Basic Income is essential for post-AI automation.',
    category: 'Debate',
    mode: 'Live War',
    host: 'Marcus V.',
    entry_fee: 1.5,
    prize_pool: 12.0,
    slots: '7/8 MCs',
    status: 'open',
    payouts_disbursed: false,
    entries: [
      {
        id: 'ent-marcus',
        full_name: 'Marcus Vance',
        handle: '@marcus_v',
        level: 'LVL 35',
        stance: 'Proposition (A)',
        institution: 'University of Zimbabwe (UZ)',
        judge_score: 85.5,
        default_gateway: 'ecocash',
        recipient_account: '+263 77 441 9920'
      },
      {
        id: 'ent-sarah',
        full_name: 'Sarah Lin',
        handle: '@sarahlin_uk',
        level: 'LVL 40',
        stance: 'Opposition (B)',
        institution: 'Oxford Union • United Kingdom',
        judge_score: 87.0,
        default_gateway: 'paypal',
        recipient_account: 'sarah.lin@debateuk.org'
      }
    ]
  },
  {
    id: 'btl-305',
    code: '#305',
    title: 'Echoes of the Silicon Savannah: A Digital Awakening.',
    category: 'Poetry',
    mode: 'Recorded War',
    host: 'Chipo Ncube',
    entry_fee: 1.5,
    prize_pool: 9.0,
    slots: '5/6 MCs',
    status: 'judging',
    payouts_disbursed: false,
    entries: [
      {
        id: 'ent-chipo',
        full_name: 'Chipo Ncube',
        handle: '@chipo_bars',
        level: 'LVL 39',
        stance: 'Featured Poet',
        institution: 'Cape Town Spoken Word • South Africa',
        judge_score: 91.0,
        default_gateway: 'stripe',
        recipient_account: 'chipo.ncube@spokenword.co.za'
      },
      {
        id: 'ent-amina',
        full_name: 'Amina Mohamed',
        handle: '@amina_nairobi',
        level: 'LVL 36',
        stance: 'Featured Poet',
        institution: 'Nairobi Lyric Collective • Kenya',
        judge_score: 86.0,
        default_gateway: 'paypal',
        recipient_account: 'amina.mohamed@nairobiarts.ke'
      }
    ]
  },
  {
    id: 'btl-306',
    code: '#306',
    title: 'Micro-Economics of Decentralized Finance in Africa.',
    category: 'Public Speaking',
    mode: 'Live War',
    host: 'David Moyo',
    entry_fee: 1.5,
    prize_pool: 18.0,
    slots: '10/12 MCs',
    status: 'open',
    payouts_disbursed: false,
    entries: [
      {
        id: 'ent-david',
        full_name: 'David Moyo',
        handle: '@david_moyo',
        level: 'LVL 37',
        stance: 'Keynote Speaker',
        institution: 'Bindura University (BUSE) • Zimbabwe',
        judge_score: 89.0,
        default_gateway: 'ecocash',
        recipient_account: '+263 77 602 1188'
      },
      {
        id: 'ent-sarah2',
        full_name: 'Sarah Lin',
        handle: '@sarahlin_uk',
        level: 'LVL 40',
        stance: 'Keynote Speaker',
        institution: 'United Kingdom',
        judge_score: 86.5,
        default_gateway: 'paypal',
        recipient_account: 'sarah.lin@debateuk.org'
      }
    ]
  },
  {
    id: 'btl-307',
    code: '#307',
    title: 'The Last Rainmaker of Bulawayo in 2075.',
    category: 'Storytelling',
    mode: 'Recorded War',
    host: 'James Ross',
    entry_fee: 1.5,
    prize_pool: 6.0,
    slots: '3/4 MCs',
    status: 'open',
    payouts_disbursed: false,
    entries: [
      {
        id: 'ent-james',
        full_name: 'James Ross',
        handle: '@jross_stories',
        level: 'LVL 33',
        stance: 'Storyteller',
        institution: 'Toronto Story Guild • Canada',
        judge_score: 84.5,
        default_gateway: 'stripe',
        recipient_account: 'james.ross@storyguild.ca'
      },
      {
        id: 'ent-tendai',
        full_name: 'Tendai Mapfumo',
        handle: '@tendai_byo',
        level: 'LVL 31',
        stance: 'Storyteller',
        institution: 'NUST Bulawayo • Zimbabwe',
        judge_score: 83.0,
        default_gateway: 'innbucks',
        recipient_account: '+263 78 330 7741'
      }
    ]
  }
];

export const INITIAL_VOTES_BY_BATTLE = {
  'btl-12894': { 'ent-kinglex': 58, 'ent-rxa': 42 },
  'btl-304': { 'ent-marcus': 31, 'ent-sarah': 34 },
  'btl-305': { 'ent-chipo': 46, 'ent-amina': 29 },
  'btl-306': { 'ent-david': 39, 'ent-sarah2': 27 },
  'btl-307': { 'ent-james': 18, 'ent-tendai': 22 }
};

export const INITIAL_CHAT_MESSAGES = [
  {
    id: 'msg-1',
    user: 'TendaiM',
    role: 'audience',
    text: "Kinglex's opening analogy on legacy code was unreal!"
  },
  {
    id: 'msg-2',
    user: 'GraceK',
    role: 'audience',
    text: 'RXA is about to drop the rebuttal heat though. Stay tuned.'
  },
  {
    id: 'msg-3',
    user: 'Judge_Alex',
    role: 'judge',
    text: 'Scoring weights validated (70% Judge / 30% Crowd). Excellent logical structure from both sides.'
  },
  {
    id: 'msg-4',
    user: 'FaraiZ',
    role: 'audience',
    text: "Paid my $1.50 entry via EcoCash for tomorrow's debate battle. Let's go MicWars!"
  }
];

export const PODIUM_LEADERS = [
  {
    rank: 2,
    name: 'Sarah Lin',
    country: 'UNITED KINGDOM',
    category: 'DEBATE',
    winRate: '92%',
    battles: 48,
    earnings: '$1,420'
  },
  {
    rank: 1,
    name: 'Kinglex',
    country: 'ZIMBABWE',
    category: 'KEYNOTE & DEBATE',
    winRate: '96%',
    battles: 62,
    earnings: '$2,150'
  },
  {
    rank: 3,
    name: 'Chipo Ncube',
    country: 'SOUTH AFRICA',
    category: 'POETRY',
    winRate: '89%',
    battles: 41,
    earnings: '$1,180'
  }
];

export const GLOBAL_STANDINGS = [
  {
    rank: 4,
    initials: 'DM',
    name: 'David Moyo',
    country: 'Zimbabwe',
    category: 'Public Speaking',
    record: '38/45',
    earnings: '$950.00'
  },
  {
    rank: 5,
    initials: 'AM',
    name: 'Amina Mohamed',
    country: 'Kenya',
    category: 'Debate',
    record: '35/40',
    earnings: '$890.00'
  },
  {
    rank: 6,
    initials: 'JR',
    name: 'James Ross',
    country: 'Canada',
    category: 'Storytelling',
    record: '31/38',
    earnings: '$760.00'
  },
  {
    rank: 7,
    initials: 'EX',
    name: 'Exeviour',
    country: 'Zimbabwe',
    category: 'Debate & Oratory',
    record: '19/24',
    earnings: '$342.00'
  }
];

export const INITIAL_PENDING_PAYOUTS = [
  {
    id: 'tx-901',
    full_name: 'Kinglex',
    rank: 1,
    amount: 7.2,
    battle_title: 'Motion #294: Decentralized Currency & Sovereignty',
    gateway_ref: 'MW-PAY-294-1-173201',
    gateway: 'ecocash',
    recipient_account: '+263 77 123 4567'
  },
  {
    id: 'tx-902',
    full_name: 'Sarah Lin',
    rank: 2,
    amount: 3.0,
    battle_title: 'Motion #294: Decentralized Currency & Sovereignty',
    gateway_ref: 'MW-PAY-294-2-173202',
    gateway: 'paypal',
    recipient_account: 'sarah.lin@debateuk.org'
  }
];

export const INITIAL_INQUIRIES = [
  {
    id: 'inq-1',
    full_name: 'Tendai Mapfumo',
    email: 't.mapfumo@buse.ac.zw',
    institution: 'Bindura University Debate Society',
    subject: 'Inter-Varsity Bulk Entry via EcoCash & InnBucks',
    message:
      'Greetings MicWars team! Can we register 8 debaters for the Season 4 Regional Open using a single EcoCash merchant batch transfer?',
    status: 'new',
    created_at: '2026-11-23 14:20 CAT'
  },
  {
    id: 'inq-2',
    full_name: 'Dr. Rumbidzai Chidzonga',
    email: 'r.chidzonga@uz.ac.zw',
    institution: 'University of Zimbabwe — Faculty of Arts',
    subject: 'Certified Judge Ballot Accreditation',
    message:
      'Requesting judge ballot credentials for two senior adjudicators scoring the 70% rubric in Friday evening rounds.',
    status: 'replied',
    created_at: '2026-11-22 17:05 CAT'
  }
];

export const RECENT_BATTLE_HISTORY = [
  {
    id: 'hist-1',
    title: 'Motion #12894: AI will completely replace human software engineers by 2030.',
    category: 'Debate • Live War',
    result: 'WIN',
    compositeScore: '86.4 / 100',
    payout: '+$7.20',
    date: 'Nov 22, 2026'
  },
  {
    id: 'hist-2',
    title: 'Motion #301: Digital Sovereignty & Pan-African Cloud Infrastructure',
    category: 'Public Speaking • Live War',
    result: 'WIN',
    compositeScore: '89.1 / 100',
    payout: '+$10.80',
    date: 'Nov 18, 2026'
  },
  {
    id: 'hist-3',
    title: 'Motion #298: Crypto Regulation vs Grassroots Financial Inclusion',
    category: 'Debate • Recorded War',
    result: '2ND PLACE',
    compositeScore: '81.5 / 100',
    payout: '+$3.00',
    date: 'Nov 14, 2026'
  }
];

// ============================================================================
