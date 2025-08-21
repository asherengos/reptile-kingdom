// Care Checklist Data for Reptile Info Tablet
// Provides comprehensive shopping lists and care requirements for each species

import { reptileData } from './reptileData';

export const careChecklistData = {
  'Leopard Gecko': {
    essential: [
      {
        id: 'lg_habitat_1',
        category: 'Habitat',
        item: '20+ gallon terrarium',
        description: 'Minimum size for adult leopard gecko',
        priority: 'critical',
        estimatedCost: '$40-80',
        notes: 'Glass terrarium with secure lid'
      },
      {
        id: 'lg_habitat_2',
        category: 'Habitat',
        item: 'Heat mat or under-tank heater',
        description: 'For belly heat and digestion',
        priority: 'critical',
        estimatedCost: '$20-40',
        notes: 'Should cover 1/3 of tank bottom'
      },
      {
        id: 'lg_habitat_3',
        category: 'Habitat',
        item: 'Thermometer',
        description: 'To monitor temperature',
        priority: 'critical',
        estimatedCost: '$10-20',
        notes: 'Digital thermometer recommended'
      },
      {
        id: 'lg_substrate_1',
        category: 'Substrate',
        item: 'Paper towels or reptile carpet',
        description: 'Safe substrate for young geckos',
        priority: 'critical',
        estimatedCost: '$5-15',
        notes: 'Avoid loose substrates for juveniles'
      },
      {
        id: 'lg_hiding_1',
        category: 'Hiding Spots',
        item: 'Warm hide',
        description: 'Hiding spot on warm side',
        priority: 'critical',
        estimatedCost: '$10-25',
        notes: 'Should be snug and secure'
      },
      {
        id: 'lg_hiding_2',
        category: 'Hiding Spots',
        item: 'Cool hide',
        description: 'Hiding spot on cool side',
        priority: 'critical',
        estimatedCost: '$10-25',
        notes: 'Should be snug and secure'
      },
      {
        id: 'lg_hiding_3',
        category: 'Hiding Spots',
        item: 'Humid hide',
        description: 'For shedding assistance',
        priority: 'important',
        estimatedCost: '$15-30',
        notes: 'Fill with damp moss or paper towels'
      },
      {
        id: 'lg_food_1',
        category: 'Food',
        item: 'Live insects (crickets, mealworms)',
        description: 'Primary food source',
        priority: 'critical',
        estimatedCost: '$5-15/week',
        notes: 'Gut-load insects before feeding'
      },
      {
        id: 'lg_food_2',
        category: 'Food',
        item: 'Calcium supplement',
        description: 'For bone health',
        priority: 'critical',
        estimatedCost: '$10-20',
        notes: 'Dust insects before feeding'
      },
      {
        id: 'lg_food_3',
        category: 'Food',
        item: 'Vitamin supplement',
        description: 'Multivitamin for overall health',
        priority: 'important',
        estimatedCost: '$10-20',
        notes: 'Use 1-2 times per week'
      },
      {
        id: 'lg_water_1',
        category: 'Water',
        item: 'Shallow water dish',
        description: 'For drinking',
        priority: 'important',
        estimatedCost: '$5-15',
        notes: 'Should be shallow to prevent drowning'
      }
    ],
    optional: [
      {
        id: 'lg_optional_1',
        category: 'Enrichment',
        item: 'Climbing branches',
        description: 'For exercise and exploration',
        priority: 'nice-to-have',
        estimatedCost: '$10-25',
        notes: 'Natural branches work well'
      },
      {
        id: 'lg_optional_2',
        category: 'Enrichment',
        item: 'UVB lighting',
        description: 'Optional for vitamin D synthesis',
        priority: 'nice-to-have',
        estimatedCost: '$30-60',
        notes: 'Not essential but beneficial'
      }
    ],
    careChecklist: [
      { label: 'Spot clean enclosure', frequency: 'daily', notes: 'Remove waste and uneaten insects.' },
      { label: 'Refresh water dish', frequency: 'daily', notes: 'Use shallow dish; replace with clean water.' },
      { label: 'Feed insects (juveniles)', frequency: 'every 1-2 days', notes: 'Dust with calcium with D3.' },
      { label: 'Feed insects (adults)', frequency: '2-3x/week', notes: 'Vary insects: crickets, dubia, mealworms.' },
      { label: 'Check warm/cool hide temps', frequency: 'weekly', notes: 'Warm side ~90°F; cool ~75°F.' }
    ],
    aiRecommendations: [
      'Replace heat mat every 1-2 years for safety',
      'Clean water dish daily to prevent bacteria',
      'Rotate between different insect types for variety',
      'Keep a spare hide in case one needs cleaning'
    ]
  },
  'Bearded Dragon': {
    essential: [
      {
        id: 'bd_habitat_1',
        category: 'Habitat',
        item: '40+ gallon terrarium',
        description: 'Minimum size for adult bearded dragon',
        priority: 'critical',
        estimatedCost: '$80-150',
        notes: 'Larger is better for adults'
      },
      {
        id: 'bd_lighting_1',
        category: 'Lighting',
        item: 'UVB fluorescent bulb',
        description: 'Essential for vitamin D3 synthesis',
        priority: 'critical',
        estimatedCost: '$30-60',
        notes: 'Replace every 6-12 months'
      },
      {
        id: 'bd_lighting_2',
        category: 'Lighting',
        item: 'Heat lamp/basking bulb',
        description: 'For basking spot temperature',
        priority: 'critical',
        estimatedCost: '$20-40',
        notes: '100-150W for proper basking temperature'
      },
      {
        id: 'bd_lighting_3',
        category: 'Lighting',
        item: 'Ceramic heat emitter',
        description: 'For night-time heat without light',
        priority: 'important',
        estimatedCost: '$25-45',
        notes: 'Only if night temps drop below 65°F'
      },
      {
        id: 'bd_habitat_2',
        category: 'Habitat',
        item: 'Thermometer and hygrometer',
        description: 'Monitor temperature and humidity',
        priority: 'critical',
        estimatedCost: '$15-30',
        notes: 'Digital dual sensor recommended'
      },
      {
        id: 'bd_substrate_1',
        category: 'Substrate',
        item: 'Reptile carpet or tile',
        description: 'Safe, easy-to-clean substrate',
        priority: 'critical',
        estimatedCost: '$20-40',
        notes: 'Avoid loose substrates for young dragons'
      },
      {
        id: 'bd_hiding_1',
        category: 'Hiding Spots',
        item: 'Basking platform',
        description: 'Elevated area for basking',
        priority: 'critical',
        estimatedCost: '$15-35',
        notes: 'Should be large enough for full body'
      },
      {
        id: 'bd_hiding_2',
        category: 'Hiding Spots',
        item: 'Cool hide',
        description: 'Shaded area for cooling down',
        priority: 'important',
        estimatedCost: '$15-30',
        notes: 'Should be large enough to fit inside'
      },
      {
        id: 'bd_food_1',
        category: 'Food',
        item: 'Live insects (crickets, dubia roaches)',
        description: 'Protein source for juveniles',
        priority: 'critical',
        estimatedCost: '$10-25/week',
        notes: 'Size should be smaller than space between eyes'
      },
      {
        id: 'bd_food_2',
        category: 'Food',
        item: 'Fresh vegetables and greens',
        description: 'Main diet for adults',
        priority: 'critical',
        estimatedCost: '$5-15/week',
        notes: 'Collard greens, mustard greens, squash'
      },
      {
        id: 'bd_food_3',
        category: 'Food',
        item: 'Calcium supplement',
        description: 'For bone health',
        priority: 'critical',
        estimatedCost: '$10-20',
        notes: 'Dust insects daily for juveniles'
      },
      {
        id: 'bd_water_1',
        category: 'Water',
        item: 'Large water dish',
        description: 'For drinking and soaking',
        priority: 'important',
        estimatedCost: '$10-25',
        notes: 'Should be large enough for soaking'
      }
    ],
    optional: [
      {
        id: 'bd_optional_1',
        category: 'Enrichment',
        item: 'Climbing branches',
        description: 'For exercise and exploration',
        priority: 'nice-to-have',
        estimatedCost: '$15-35',
        notes: 'Natural branches work well'
      },
      {
        id: 'bd_optional_2',
        category: 'Enrichment',
        item: 'Hammock',
        description: 'Additional basking spot',
        priority: 'nice-to-have',
        estimatedCost: '$15-25',
        notes: 'Many dragons enjoy hammocks'
      }
    ],
    careChecklist: [
      { label: 'Offer fresh greens (adults)', frequency: 'daily', notes: 'Collards, mustard greens, squash.' },
      { label: 'Feed insects (juveniles)', frequency: 'daily', notes: 'Small crickets/roaches dusted with calcium.' },
      { label: 'UVB bulb check', frequency: 'monthly', notes: 'Replace every 6–12 months.' },
      { label: 'Basking spot temp check', frequency: 'weekly', notes: 'Aim for 95–105°F for adults.' }
    ],
    aiRecommendations: [
      'Replace UVB bulb every 6-12 months for effectiveness',
      'Offer fresh vegetables daily for adult dragons',
      'Monitor basking temperature regularly',
      'Provide variety in insect prey for juveniles'
    ]
  },
  'Pacman Frog': {
    essential: [
      {
        id: 'pf_habitat_1',
        category: 'Habitat',
        item: '10+ gallon terrarium',
        description: 'Minimum size for adult Pacman frog',
        priority: 'critical',
        estimatedCost: '$30-60',
        notes: 'Height is more important than length'
      },
      {
        id: 'pf_habitat_2',
        category: 'Habitat',
        item: 'Secure lid',
        description: 'Prevent escape',
        priority: 'critical',
        estimatedCost: '$15-25',
        notes: 'Must be escape-proof'
      },
      {
        id: 'pf_substrate_1',
        category: 'Substrate',
        item: 'Coconut fiber or sphagnum moss',
        description: 'Maintains humidity',
        priority: 'critical',
        estimatedCost: '$10-20',
        notes: 'Keep moist but not soaking wet'
      },
      {
        id: 'pf_habitat_3',
        category: 'Habitat',
        item: 'Thermometer and hygrometer',
        description: 'Monitor temperature and humidity',
        priority: 'critical',
        estimatedCost: '$15-30',
        notes: 'Digital dual sensor recommended'
      },
      {
        id: 'pf_lighting_1',
        category: 'Lighting',
        item: 'Low-wattage heat bulb',
        description: 'Maintain proper temperature',
        priority: 'important',
        estimatedCost: '$15-25',
        notes: '25-40W usually sufficient'
      },
      {
        id: 'pf_hiding_1',
        category: 'Hiding Spots',
        item: 'Hiding spot',
        description: 'For security and comfort',
        priority: 'important',
        estimatedCost: '$10-20',
        notes: 'Half-buried in substrate works well'
      },
      {
        id: 'pf_food_1',
        category: 'Food',
        item: 'Live insects (crickets, roaches)',
        description: 'Primary food source',
        priority: 'critical',
        estimatedCost: '$8-20/week',
        notes: 'Size should be smaller than frog\'s mouth'
      },
      {
        id: 'pf_food_2',
        category: 'Food',
        item: 'Calcium supplement',
        description: 'For bone health',
        priority: 'critical',
        estimatedCost: '$10-20',
        notes: 'Dust insects before feeding'
      },
      {
        id: 'pf_food_3',
        category: 'Food',
        item: 'Vitamin supplement',
        description: 'Multivitamin for overall health',
        priority: 'important',
        estimatedCost: '$10-20',
        notes: 'Use 1-2 times per week'
      },
      {
        id: 'pf_water_1',
        category: 'Water',
        item: 'Shallow water dish',
        description: 'For soaking and drinking',
        priority: 'important',
        estimatedCost: '$5-15',
        notes: 'Should be shallow to prevent drowning'
      }
    ],
    optional: [
      {
        id: 'pf_optional_1',
        category: 'Enrichment',
        item: 'Live plants',
        description: 'Natural decoration and humidity',
        priority: 'nice-to-have',
        estimatedCost: '$10-25',
        notes: 'Choose hardy, non-toxic plants'
      }
    ],
    aiRecommendations: [
      'Keep substrate consistently moist but not wet',
      'Feed appropriately sized prey items',
      'Clean water dish daily',
      'Monitor humidity levels closely'
    ]
  },
  'Ball Python': {
    essential: [
      {
        id: 'bp_habitat_1',
        category: 'Habitat',
        item: '40+ gallon terrarium',
        description: 'Minimum size for adult ball python',
        priority: 'critical',
        estimatedCost: '$80-150',
        notes: 'Larger is better for adults'
      },
      {
        id: 'bp_habitat_2',
        category: 'Habitat',
        item: 'Secure lid with locks',
        description: 'Prevent escape',
        priority: 'critical',
        estimatedCost: '$20-40',
        notes: 'Must be escape-proof'
      },
      {
        id: 'bp_heating_1',
        category: 'Heating',
        item: 'Under-tank heating pad',
        description: 'For belly heat',
        priority: 'critical',
        estimatedCost: '$25-45',
        notes: 'Should cover 1/3 of tank bottom'
      },
      {
        id: 'bp_heating_2',
        category: 'Heating',
        item: 'Thermostat',
        description: 'Control heating pad temperature',
        priority: 'critical',
        estimatedCost: '$30-60',
        notes: 'Essential for safety'
      },
      {
        id: 'bp_habitat_3',
        category: 'Habitat',
        item: 'Thermometer',
        description: 'Monitor temperature',
        priority: 'critical',
        estimatedCost: '$10-20',
        notes: 'Digital thermometer recommended'
      },
      {
        id: 'bp_substrate_1',
        category: 'Substrate',
        item: 'Coconut fiber or cypress mulch',
        description: 'Holds humidity well',
        priority: 'critical',
        estimatedCost: '$15-30',
        notes: 'Keep slightly moist'
      },
      {
        id: 'bp_hiding_1',
        category: 'Hiding Spots',
        item: 'Warm hide',
        description: 'Hiding spot on warm side',
        priority: 'critical',
        estimatedCost: '$15-30',
        notes: 'Should be snug and secure'
      },
      {
        id: 'bp_hiding_2',
        category: 'Hiding Spots',
        item: 'Cool hide',
        description: 'Hiding spot on cool side',
        priority: 'critical',
        estimatedCost: '$15-30',
        notes: 'Should be snug and secure'
      },
      {
        id: 'bp_food_1',
        category: 'Food',
        item: 'Frozen/thawed rodents',
        description: 'Primary food source',
        priority: 'critical',
        estimatedCost: '$5-15/week',
        notes: 'Size should be 10-15% of snake\'s weight'
      },
      {
        id: 'bp_water_1',
        category: 'Water',
        item: 'Large water dish',
        description: 'For drinking and soaking',
        priority: 'important',
        estimatedCost: '$15-30',
        notes: 'Large enough for snake to soak in'
      }
    ],
    optional: [
      {
        id: 'bp_optional_1',
        category: 'Enrichment',
        item: 'Climbing branches',
        description: 'For exercise and exploration',
        priority: 'nice-to-have',
        estimatedCost: '$15-35',
        notes: 'Natural branches work well'
      },
      {
        id: 'bp_optional_2',
        category: 'Enrichment',
        item: 'UVB lighting',
        description: 'Optional for vitamin D synthesis',
        priority: 'nice-to-have',
        estimatedCost: '$30-60',
        notes: 'Not essential but beneficial'
      }
    ],
    aiRecommendations: [
      'Never handle for 48 hours after feeding',
      'Keep humidity at 50-60% (higher during shedding)',
      'Provide two identical hides for security',
      'Use thermostat to prevent overheating'
    ]
  },
  'Corn Snake': {
    essential: [
      {
        id: 'cs_habitat_1',
        category: 'Habitat',
        item: '20+ gallon terrarium',
        description: 'Minimum size for adult corn snake',
        priority: 'critical',
        estimatedCost: '$40-80',
        notes: 'Larger is better for adults'
      },
      {
        id: 'cs_habitat_2',
        category: 'Habitat',
        item: 'Secure lid with locks',
        description: 'Prevent escape',
        priority: 'critical',
        estimatedCost: '$20-40',
        notes: 'Must be escape-proof'
      },
      {
        id: 'cs_heating_1',
        category: 'Heating',
        item: 'Under-tank heating pad',
        description: 'For belly heat',
        priority: 'critical',
        estimatedCost: '$25-45',
        notes: 'Should cover 1/3 of tank bottom'
      },
      {
        id: 'cs_heating_2',
        category: 'Heating',
        item: 'Thermostat',
        description: 'Control heating pad temperature',
        priority: 'critical',
        estimatedCost: '$30-60',
        notes: 'Essential for safety'
      },
      {
        id: 'cs_habitat_3',
        category: 'Habitat',
        item: 'Thermometer',
        description: 'Monitor temperature',
        priority: 'critical',
        estimatedCost: '$10-20',
        notes: 'Digital thermometer recommended'
      },
      {
        id: 'cs_substrate_1',
        category: 'Substrate',
        item: 'Aspen shavings or cypress mulch',
        description: 'Good for burrowing',
        priority: 'critical',
        estimatedCost: '$15-30',
        notes: 'Keep dry'
      },
      {
        id: 'cs_hiding_1',
        category: 'Hiding Spots',
        item: 'Warm hide',
        description: 'Hiding spot on warm side',
        priority: 'critical',
        estimatedCost: '$15-30',
        notes: 'Should be snug and secure'
      },
      {
        id: 'cs_hiding_2',
        category: 'Hiding Spots',
        item: 'Cool hide',
        description: 'Hiding spot on cool side',
        priority: 'critical',
        estimatedCost: '$15-30',
        notes: 'Should be snug and secure'
      },
      {
        id: 'cs_food_1',
        category: 'Food',
        item: 'Frozen/thawed rodents',
        description: 'Primary food source',
        priority: 'critical',
        estimatedCost: '$5-15/week',
        notes: 'Size should be 10-15% of snake\'s weight'
      },
      {
        id: 'cs_water_1',
        category: 'Water',
        item: 'Water dish',
        description: 'For drinking',
        priority: 'important',
        estimatedCost: '$10-20',
        notes: 'Change water daily'
      }
    ],
    optional: [
      {
        id: 'cs_optional_1',
        category: 'Enrichment',
        item: 'Climbing branches',
        description: 'For exercise and exploration',
        priority: 'nice-to-have',
        estimatedCost: '$15-35',
        notes: 'Natural branches work well'
      },
      {
        id: 'cs_optional_2',
        category: 'Enrichment',
        item: 'UVB lighting',
        description: 'Optional for vitamin D synthesis',
        priority: 'nice-to-have',
        estimatedCost: '$30-60',
        notes: 'Not essential but beneficial'
      }
    ],
    aiRecommendations: [
      'Secure all enclosure openings tightly',
      'Never handle for 24-48 hours after feeding',
      'Provide multiple hiding spots for security',
      'Monitor temperature gradients carefully'
    ]
  }
};

// Helper: find species info
const getSpeciesInfo = (name) => reptileData.find(s => s.name === name);

// Generate a reasonable default checklist when specific data is missing
const generateChecklist = (speciesName) => {
  const info = getSpeciesInfo(speciesName);
  if (!info) return null;

  const slug = speciesName.toLowerCase().replace(/\s+/g, '_');
  const type = (info.type || '').toLowerCase();

  // Base items applicable to most
  const base = [
    { id: `${slug}_habitat`, category: 'Habitat', item: 'Appropriate enclosure', description: 'Sized for adult', priority: 'critical', estimatedCost: '$60-150', notes: '' },
    { id: `${slug}_thermo`, category: 'Habitat', item: 'Thermometer & hygrometer', description: 'Monitor temp and humidity', priority: 'critical', estimatedCost: '$15-30', notes: 'Digital recommended' },
    { id: `${slug}_hide_warm`, category: 'Hiding Spots', item: 'Warm hide', description: 'Snug hide on warm side', priority: 'critical', estimatedCost: '$10-25', notes: '' },
    { id: `${slug}_hide_cool`, category: 'Hiding Spots', item: 'Cool hide', description: 'Snug hide on cool side', priority: 'critical', estimatedCost: '$10-25', notes: '' }
  ];

  let essentials = [];
  let optional = [];

  if (type === 'amphibian') {
    essentials = [
      base[0], base[1],
      { id: `${slug}_substrate`, category: 'Substrate', item: 'Coconut fiber or sphagnum moss', description: 'Maintains humidity', priority: 'critical', estimatedCost: '$10-20', notes: '' },
      { id: `${slug}_hide`, category: 'Hiding Spots', item: 'Hide', description: 'For security and comfort', priority: 'important', estimatedCost: '$10-20', notes: '' },
      { id: `${slug}_water_dish`, category: 'Water', item: 'Shallow water dish', description: 'Soaking/drinking', priority: 'important', estimatedCost: '$5-15', notes: 'Easy exit' },
      { id: `${slug}_food`, category: 'Food', item: 'Live insects', description: 'Primary food source', priority: 'critical', estimatedCost: '$8-20/week', notes: '' }
    ];
  } else if (type === 'turtle') {
    essentials = [
      { id: `${slug}_tank`, category: 'Habitat', item: 'Aquatic tank (75+ gal adult)', description: 'Swimming space', priority: 'critical', estimatedCost: '$120-250', notes: '' },
      { id: `${slug}_filter`, category: 'Habitat', item: 'Canister filter', description: 'Keeps water clean', priority: 'critical', estimatedCost: '$60-150', notes: 'Strong filtration' },
      { id: `${slug}_dock`, category: 'Habitat', item: 'Basking dock/platform', description: 'Dry area for basking', priority: 'critical', estimatedCost: '$20-40', notes: '' },
      { id: `${slug}_uvb`, category: 'Lighting', item: 'UVB lighting', description: 'Shell health', priority: 'critical', estimatedCost: '$30-60', notes: 'Replace 6–12 mo' },
      { id: `${slug}_heat`, category: 'Heating', item: 'Heat lamp', description: 'Basking temperature', priority: 'important', estimatedCost: '$20-40', notes: '' },
      { id: `${slug}_food`, category: 'Food', item: 'Pellets & greens', description: 'Staple diet', priority: 'critical', estimatedCost: '$10-25/week', notes: '' }
    ];
  } else if (type === 'snake') {
    essentials = [
      base[0],
      { id: `${slug}_uth`, category: 'Heating', item: 'Under-tank heater', description: 'Belly heat', priority: 'critical', estimatedCost: '$25-45', notes: '' },
      { id: `${slug}_thermostat`, category: 'Heating', item: 'Thermostat', description: 'Controls heater safely', priority: 'critical', estimatedCost: '$30-60', notes: '' },
      base[1], base[2], base[3],
      { id: `${slug}_substrate`, category: 'Substrate', item: 'Aspen or cypress mulch', description: 'Safe substrate', priority: 'critical', estimatedCost: '$15-30', notes: '' },
      { id: `${slug}_water_dish`, category: 'Water', item: 'Water dish', description: 'For drinking/soaking', priority: 'important', estimatedCost: '$10-20', notes: '' },
      { id: `${slug}_food`, category: 'Food', item: 'Frozen/thawed rodents', description: 'Primary food', priority: 'critical', estimatedCost: '$5-15/week', notes: '' }
    ];
  } else { // lizards and others
    essentials = [
      base[0],
      { id: `${slug}_uvb`, category: 'Lighting', item: 'UVB lighting', description: 'Vitamin D synthesis', priority: 'critical', estimatedCost: '$30-60', notes: '' },
      { id: `${slug}_bask`, category: 'Heating', item: 'Heat lamp/basking bulb', description: 'Basking temperature', priority: 'critical', estimatedCost: '$20-40', notes: '' },
      base[1], base[2], base[3],
      { id: `${slug}_substrate`, category: 'Substrate', item: 'Reptile carpet or tile', description: 'Safe/easy clean', priority: 'critical', estimatedCost: '$15-30', notes: '' },
      { id: `${slug}_water_dish`, category: 'Water', item: 'Water dish', description: 'For drinking', priority: 'important', estimatedCost: '$5-15', notes: '' },
      { id: `${slug}_food`, category: 'Food', item: 'Insects or greens', description: 'Diet varies by species', priority: 'critical', estimatedCost: '$8-20/week', notes: '' }
    ];
  }

  return {
    essential: essentials,
    optional: optional,
    aiRecommendations: [
      'Monitor temperatures and humidity regularly',
      'Quarantine new animals and practice good hygiene'
    ]
  };
};

// Get checklist for a specific species
export const getSpeciesChecklist = (speciesName) => {
  return careChecklistData[speciesName] || generateChecklist(speciesName);
};

// Get all available species for checklists
export const getChecklistSpecies = () => {
  return Object.keys(careChecklistData);
};

// Calculate total estimated cost for a species
export const getTotalEstimatedCost = (speciesName) => {
  const checklist = getSpeciesChecklist(speciesName);
  if (!checklist) return null;

  // Helper to parse a cost string like "$30-60", "$15", "$5-15/week"
  const parseCostRange = (costStr) => {
    if (!costStr) return null;
    const isRecurring = /\/(week|month|day)|per\s+(week|month|day)/i.test(costStr);
    if (isRecurring) return null; // exclude recurring food costs from initial setup

    const match = costStr.match(/\$?\s*(\d+)(?:\s*-\s*(\d+))?/);
    if (!match) return null;
    const min = parseInt(match[1], 10) || 0;
    const max = match[2] ? parseInt(match[2], 10) : min;
    return { min, max };
  };

  // Parse recurring costs and convert to approximate monthly
  const parseRecurringMonthly = (costStr) => {
    if (!costStr) return null;
    const m = costStr.match(/\$?\s*(\d+)(?:\s*-\s*(\d+))?\s*(?:\/(week|month|day)|per\s+(week|month|day))/i);
    if (!m) return null;
    const min = parseInt(m[1], 10) || 0;
    const max = m[2] ? parseInt(m[2], 10) : min;
    const unit = (m[3] || m[4] || '').toLowerCase();
    const factor = unit === 'week' ? 4 : unit === 'day' ? 30 : 1; // rough monthly
    return { min: min * factor, max: max * factor };
  };

  let minTotal = 0;
  let maxTotal = 0;
  let monthlyMin = 0;
  let monthlyMax = 0;

  checklist.essential.forEach(item => {
    const range = parseCostRange(item.estimatedCost);
    if (range) {
      minTotal += range.min;
      maxTotal += range.max;
    }
    const rec = parseRecurringMonthly(item.estimatedCost);
    if (rec) {
      monthlyMin += rec.min;
      monthlyMax += rec.max;
    }
  });

  // Include recurring optional costs (e.g., supplements if marked per week/month)
  checklist.optional.forEach(item => {
    const rec = parseRecurringMonthly(item.estimatedCost);
    if (rec) {
      monthlyMin += rec.min;
      monthlyMax += rec.max;
    }
  });

  const essentialCount = checklist.essential.length;
  const monthlyLabel = monthlyMin === monthlyMax ? `$${monthlyMin}` : `$${monthlyMin}-${monthlyMax}`;

  return {
    // number of essential items, used by UI
    essential: essentialCount,
    // total estimated initial setup range
    range: `$${minTotal}-${maxTotal}`,
    monthly: monthlyLabel,
    breakdown: {
      habitat: checklist.essential.filter(item => item.category === 'Habitat').length,
      heating: checklist.essential.filter(item => item.category === 'Heating' || item.category === 'Lighting').length,
      substrate: checklist.essential.filter(item => item.category === 'Substrate').length,
      hiding: checklist.essential.filter(item => item.category === 'Hiding Spots').length,
      food: checklist.essential.filter(item => item.category === 'Food').length,
      water: checklist.essential.filter(item => item.category === 'Water').length
    }
  };
};

// Get checklist by priority
export const getChecklistByPriority = (speciesName, priority = 'all') => {
  const checklist = getSpeciesChecklist(speciesName);
  if (!checklist) return null;

  if (priority === 'all') {
    return {
      essential: checklist.essential,
      optional: checklist.optional
    };
  }

  return {
    essential: checklist.essential.filter(item => item.priority === priority),
    optional: checklist.optional.filter(item => item.priority === priority)
  };
};

// Get checklist by category
export const getChecklistByCategory = (speciesName, category) => {
  const checklist = getSpeciesChecklist(speciesName);
  if (!checklist) return null;

  return {
    essential: checklist.essential.filter(item => item.category === category),
    optional: checklist.optional.filter(item => item.category === category)
  };
};
