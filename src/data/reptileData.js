export const reptileData = [
  {
    id: 1,
    name: "Leopard Gecko",
    type: "Lizard",
    emoji: "🦎",
    slug: "leopard-gecko",
    displayName: "Leopard Gecko",
    shortDesc: "Beginner‑friendly nocturnal lizard with simple heating needs.",
    longDesc: "Leopard Geckos are hardy, calm lizards that thrive with a warm hide, a cool hide, and a moist hide for shedding. They do best with belly heat and do not require intense UVB.",
    habitat: {
      temperature: "75-85°F (24-29°C) with 90°F (32°C) basking spot",
      humidity: "30-40%",
      enclosureSize: "20+ gallon tank for adults",
      substrate: "Paper towels, reptile carpet, or fine sand"
    },
    diet: {
      primary: "Insects (crickets, mealworms, dubia roaches)",
      frequency: "Every 1-2 days for juveniles, 2-3 times per week for adults",
      supplements: "Calcium with D3 and multivitamin powder",
      water: "Shallow water dish, mist occasionally"
    },
    size: "7-10 in (18-25 cm)",
    lifespan: "15-20 years",
    images: {
      desktop: "leopard-gecko-v1.webp",
      mobile: "leopard-gecko-v1.webp",
      alt: "Leopard gecko perched on a rock",
      caption: "Leopard geckos are calm, hardy lizards ideal for beginners."
    },
    careTips: [
      "Provide multiple hiding spots and climbing opportunities",
      "Use under-tank heating pad for belly heat",
      "Feed in the evening when they're most active",
      "Handle gently and support their body fully"
    ],
    funFacts: [
      "They can detach their tail to escape predators",
      "They're one of the few geckos that can blink",
      "They store fat in their tails for energy",
      "They can live 15-20 years in captivity"
    ],
    warnings: [
      "Never use heat rocks as they can cause burns",
      "Avoid loose substrates for young geckos",
      "Don't house multiple males together"
    ]
  },
  {
    id: 2,
    name: "Bearded Dragon",
    type: "Lizard",
    emoji: "🐉",
    slug: "bearded-dragon",
    displayName: "Bearded Dragon",
    shortDesc: "Day‑active lizard that enjoys handling and basking under UVB.",
    longDesc: "Bearded Dragons are engaging, diurnal lizards that require strong UVB, a hot basking spot, and a varied omnivorous diet that shifts from insects to greens as they age.",
    habitat: {
      temperature: "75-85°F (24-29°C) with 95-105°F (35-40°C) basking spot",
      humidity: "30-40%",
      enclosureSize: "40+ gallon tank for adults",
      substrate: "Reptile carpet, tile, or paper towels"
    },
    diet: {
      primary: "Insects and vegetables (80% insects for juveniles, 80% vegetables for adults)",
      frequency: "Daily for juveniles, every 1-2 days for adults",
      supplements: "Calcium with D3 and multivitamin powder",
      water: "Shallow water dish, mist vegetables for hydration"
    },
    size: "18-24 in (45-60 cm)",
    lifespan: "10-15 years",
    images: {
      desktop: "bearded-dragon-v1.webp",
      mobile: "bearded-dragon-v1.webp",
      alt: "Bearded dragon basking under a heat lamp",
      caption: "Bearded dragons need bright basking light and strong UVB."
    },
    careTips: [
      "Provide UVB lighting for proper calcium absorption",
      "Create temperature gradient with basking and cool areas",
      "Offer variety of vegetables and insects",
      "Handle regularly to build trust"
    ],
    funFacts: [
      "They can change color based on mood and temperature",
      "Males have larger heads and more pronounced beards",
      "They wave their arms to communicate",
      "They can run on their hind legs like tiny dinosaurs"
    ],
    warnings: [
      "Never feed fireflies or lightning bugs",
      "Avoid iceberg lettuce as it has no nutritional value",
      "Don't use sand for young dragons"
    ]
  },
  {
    id: 3,
    name: "Pacman Frog",
    type: "Amphibian",
    emoji: "🐸",
    habitat: {
      temperature: "75-85°F (24-29°C)",
      humidity: "70-80%",
      enclosureSize: "10+ gallon tank for adults",
      substrate: "Coconut fiber or sphagnum moss"
    },
    diet: {
      primary: "Insects and small vertebrates (crickets, roaches, pinky mice)",
      frequency: "Every 2-3 days",
      supplements: "Calcium powder on insects",
      water: "Dechlorinated water, change daily"
    },
    careTips: [
      "Keep substrate moist but not soaking wet",
      "Provide shallow water dish for soaking",
      "Feed appropriately sized prey",
      "Handle minimally as they're sensitive to oils on skin"
    ],
    funFacts: [
      "They're named after the video game character due to their round shape",
      "They can eat prey nearly their own size",
      "They spend most of their time buried in substrate",
      "They can live 10-15 years in captivity"
    ],
    warnings: [
      "Never use tap water without dechlorinating",
      "Avoid handling too frequently",
      "Don't house multiple frogs together"
    ]
  },
  {
    id: 4,
    name: "Ball Python",
    type: "Snake",
    emoji: "🐍",
    slug: "ball-python",
    displayName: "Ball Python",
    shortDesc: "Calm, nocturnal snake with moderate care requirements.",
    longDesc: "Ball pythons are gentle snakes known for curling into a ball when stressed. They require secure hides on both warm and cool sides, stable humidity, and appropriately sized frozen/thawed prey.",
    habitat: {
      temperature: "75-80°F (24-27°C) with 88-92°F (31-33°C) basking spot",
      humidity: "50-60% (70-80% during shedding)",
      enclosureSize: "40+ gallon tank for adults",
      substrate: "Coconut fiber, cypress mulch, or aspen shavings"
    },
    diet: {
      primary: "Frozen/thawed rodents (mice, rats)",
      frequency: "Every 1-2 weeks for adults, every 5-7 days for juveniles",
      supplements: "No supplements needed with whole prey",
      water: "Large water dish for soaking and drinking"
    },
    size: "3-5 ft (0.9-1.5 m)",
    lifespan: "20-30 years",
    images: {
      desktop: "ball-python-v1.webp",
      mobile: "ball-python-v1.webp",
      alt: "Ball python coiled calmly on branch",
      caption: "Ball pythons are docile and do well with secure hides and steady humidity."
    },
    careTips: [
      "Provide multiple hiding spots (one on warm side, one on cool side)",
      "Use under-tank heating for belly heat",
      "Handle gently and support their body fully",
      "Never feed live prey to avoid injury"
    ],
    funFacts: [
      "They're called 'ball' pythons because they curl into a tight ball when stressed",
      "They can go months without eating during breeding season",
      "They're excellent climbers despite being ground-dwelling",
      "They can live 20-30 years in captivity"
    ],
    warnings: [
      "Never handle for 48 hours after feeding",
      "Avoid handling during shedding",
      "Don't use heat rocks as they can cause burns"
    ]
  },
  {
    id: 5,
    name: "Corn Snake",
    type: "Snake",
    emoji: "🐍",
    slug: "corn-snake",
    displayName: "Corn Snake",
    shortDesc: "Hardy beginner snake with many color morphs.",
    longDesc: "Corn snakes are active, curious snakes that thrive with a warm hide, a cool hide, and a secure lid. They are excellent feeders on frozen/thawed prey and make great first snakes.",
    habitat: {
      temperature: "75-80°F (24-27°C) with 85-88°F (29-31°C) basking spot",
      humidity: "40-50% (60-70% during shedding)",
      enclosureSize: "20+ gallon tank for adults",
      substrate: "Aspen shavings, cypress mulch, or paper towels"
    },
    diet: {
      primary: "Frozen/thawed rodents (mice, rats)",
      frequency: "Every 5-7 days for juveniles, every 7-10 days for adults",
      supplements: "No supplements needed with whole prey",
      water: "Shallow water dish, change daily"
    },
    size: "3-5 ft (0.9-1.5 m)",
    lifespan: "15-20 years",
    images: {
      desktop: "corn-snake-v1.webp",
      mobile: "corn-snake-v1.webp",
      alt: "Corn snake slithering across natural wood",
      caption: "Corn snakes are escape artists—use a secure lid and check small gaps."
    },
    careTips: [
      "Provide climbing branches and hiding spots",
      "Use under-tank heating for belly heat",
      "Handle regularly to build trust",
      "Feed appropriately sized prey (no wider than snake's body)"
    ],
    funFacts: [
      "They're excellent escape artists and can fit through tiny openings",
      "They're named after the corn fields where they were commonly found",
      "They come in over 800 different color and pattern variations",
      "They can live 15-20 years in captivity"
    ],
    warnings: [
      "Secure enclosure lid tightly to prevent escapes",
      "Never handle for 24-48 hours after feeding",
      "Don't use sand or gravel substrates"
    ]
  }
  ,
  {
    id: 6,
    name: "Crested Gecko",
    type: "Lizard",
    emoji: "🦎",
    habitat: {
      temperature: "72-78°F (22-26°C)",
      humidity: "50-70%",
      enclosureSize: "18x18x24 for adults",
      substrate: "Coconut fiber, paper towels, or bioactive"
    },
    diet: {
      primary: "Commercial crested gecko diet + insects",
      frequency: "CGD 3-4x/week; insects 1-2x/week",
      supplements: "Calcium with D3 on insects",
      water: "Shallow dish; mist enclosure nightly"
    },
    careTips: [
      "Provide vertical climbing space and foliage",
      "Avoid direct basking lights; use ambient heating",
      "Offer ledges and hides at multiple heights",
      "Do not house with other males"
    ],
    funFacts: [
      "Also called eyelash geckos due to crest",
      "Can vocalize with chirps",
      "Often active at night",
      "Many color morphs available"
    ],
    warnings: [
      "Avoid high heat; they overheat easily",
      "Do not handle excessively",
      "Keep humidity consistent to prevent shedding issues"
    ]
  },
  {
    id: 7,
    name: "Axolotl",
    type: "Amphibian",
    emoji: "🦎",
    habitat: {
      temperature: "60-68°F (16-20°C)",
      humidity: "Aquatic",
      enclosureSize: "20+ gallon long for adults",
      substrate: "Bare bottom or fine sand (no gravel)"
    },
    diet: {
      primary: "High-quality pellets, earthworms, bloodworms",
      frequency: "Every 2-3 days",
      supplements: "Not typically needed",
      water: "Dechlorinated, well-filtered, gentle flow"
    },
    careTips: [
      "Keep water cool; avoid heaters",
      "Use gentle filtration and frequent water changes",
      "Provide hides and low light",
      "Avoid sharp decor"
    ],
    funFacts: [
      "Can regenerate limbs and organs",
      "Remain aquatic and gilled throughout life",
      "Come in multiple morphs (leucistic, wild type, etc.)",
      "Sensitive to poor water quality"
    ],
    warnings: [
      "No gravel (risk of impaction)",
      "Keep temperature below 70°F",
      "Avoid tankmates that can nip"
    ]
  },
  {
    id: 8,
    name: "Red-Eared Slider",
    type: "Turtle",
    emoji: "🐢",
    habitat: {
      temperature: "Water 75-80°F (24-27°C), basking 85-90°F (29-32°C)",
      humidity: "Aquatic",
      enclosureSize: "75+ gallons for adults",
      substrate: "Bare bottom or large river stones"
    },
    diet: {
      primary: "Pellets, leafy greens, occasional protein",
      frequency: "Daily for juveniles; 4-5x/week adults",
      supplements: "Calcium/UVB for shell health",
      water: "Powerful filtration; frequent changes"
    },
    careTips: [
      "Provide large swimming area",
      "Strong filter and regular maintenance",
      "Dry basking dock with UVB",
      "Offer varied diet"
    ],
    funFacts: [
      "Can live decades with proper care",
      "Very active swimmers",
      "Iconic red stripe behind the eyes",
      "Require significant space"
    ],
    warnings: [
      "Large adult size needs big enclosures",
      "Maintain water quality to prevent illness",
      "UVB is essential for shell health"
    ]
  },
  {
    id: 9,
    name: "Green Anole",
    type: "Lizard",
    emoji: "🦎",
    habitat: {
      temperature: "75-85°F (24-29°C) with 90-95°F (32-35°C) basking",
      humidity: "60-80%",
      enclosureSize: "10+ gallon for adults",
      substrate: "Coconut fiber, sphagnum moss, or bioactive"
    },
    diet: {
      primary: "Small insects (crickets, fruit flies, small roaches)",
      frequency: "Daily for juveniles; every 1-2 days for adults",
      supplements: "Calcium with D3 on insects",
      water: "Mist enclosure; shallow dish optional"
    },
    careTips: [
      "Provide plenty of climbing branches and foliage",
      "Use UVB lighting for proper calcium absorption",
      "Keep humidity high with regular misting",
      "Handle minimally as they're easily stressed"
    ],
    funFacts: [
      "Can change color from green to brown",
      "Males have a red dewlap for display",
      "Very active and entertaining to watch",
      "Native to southeastern United States"
    ],
    warnings: [
      "Avoid handling when stressed",
      "Keep away from other anole species",
      "Monitor for signs of stress or illness"
    ]
  },
  {
    id: 10,
    name: "Blue-Tongued Skink",
    type: "Lizard",
    emoji: "🦎",
    habitat: {
      temperature: "75-85°F (24-29°C) with 95-105°F (35-40°C) basking",
      humidity: "40-60%",
      enclosureSize: "40+ gallon for adults",
      substrate: "Cypress mulch, coconut fiber, or bioactive"
    },
    diet: {
      primary: "Omnivorous - insects, vegetables, fruits, occasional protein",
      frequency: "Every 2-3 days",
      supplements: "Calcium with D3 and multivitamin",
      water: "Shallow dish; mist vegetables for hydration"
    },
    careTips: [
      "Provide large enclosure with hiding spots",
      "Use UVB lighting for proper health",
      "Offer varied diet including vegetables",
      "Handle regularly to build trust"
    ],
    funFacts: [
      "Named for their distinctive blue tongue",
      "Very intelligent and can learn tricks",
      "Give birth to live young",
      "Can live 20+ years in captivity"
    ],
    warnings: [
      "Avoid high humidity which can cause respiratory issues",
      "Don't feed dog or cat food",
      "Provide proper UVB lighting"
    ]
  },
  {
    id: 11,
    name: "Milk Snake",
    type: "Snake",
    emoji: "🐍",
    habitat: {
      temperature: "75-85°F (24-29°C) with 85-90°F (29-32°C) basking",
      humidity: "40-60%",
      enclosureSize: "20+ gallon for adults",
      substrate: "Aspen shavings, cypress mulch, or paper towels"
    },
    diet: {
      primary: "Frozen/thawed mice or rats",
      frequency: "Every 5-7 days for juveniles; 7-10 days for adults",
      supplements: "Not typically needed",
      water: "Fresh water dish; change regularly"
    },
    careTips: [
      "Provide secure hiding spots",
      "Use under-tank heating for belly heat",
      "Handle gently and support body fully",
      "Feed appropriately sized prey"
    ],
    funFacts: [
      "Beautiful color variations and patterns",
      "Non-venomous and generally docile",
      "Good beginner snake species",
      "Can live 15-20 years"
    ],
    warnings: [
      "Never feed live prey",
      "Avoid handling for 48 hours after feeding",
      "Keep enclosure secure to prevent escape"
    ]
  },
  {
    id: 12,
    name: "Fire-Bellied Toad",
    type: "Amphibian",
    emoji: "🐸",
    habitat: {
      temperature: "70-80°F (21-27°C)",
      humidity: "70-80%",
      enclosureSize: "10+ gallon for small groups",
      substrate: "Coconut fiber or sphagnum moss"
    },
    diet: {
      primary: "Small insects (crickets, fruit flies, small roaches)",
      frequency: "Every 2-3 days",
      supplements: "Calcium powder on insects",
      water: "Shallow water dish; keep substrate moist"
    },
    careTips: [
      "Keep substrate consistently moist",
      "Provide both land and water areas",
      "Use gentle heating if needed",
      "Handle minimally to avoid stress"
    ],
    funFacts: [
      "Bright orange/red belly as warning display",
      "Active during day and night",
      "Can live in small groups",
      "Good for beginners"
    ],
    warnings: [
      "Avoid handling with bare hands",
      "Keep away from other species",
      "Monitor humidity levels carefully"
    ]
  },
  {
    id: 13,
    name: "Uromastyx",
    type: "Lizard",
    emoji: "🦎",
    habitat: {
      temperature: "80-90°F (27-32°C) with 110-120°F (43-49°C) basking",
      humidity: "20-30%",
      enclosureSize: "40+ gallon for adults",
      substrate: "Play sand, calcium sand, or tile"
    },
    diet: {
      primary: "Vegetables, flowers, and occasional insects",
      frequency: "Daily vegetables; insects 1-2x/week",
      supplements: "Calcium with D3 and multivitamin",
      water: "Mist vegetables; shallow dish optional"
    },
    careTips: [
      "Provide very hot basking area",
      "Use strong UVB lighting",
      "Offer varied vegetables and flowers",
      "Keep humidity very low"
    ],
    funFacts: [
      "Also called spiny-tailed lizards",
      "Herbivorous as adults",
      "Can live 15-20 years",
      "Native to desert regions"
    ],
    warnings: [
      "Avoid high humidity",
      "Don't use loose substrates for juveniles",
      "Provide very hot basking temperatures"
    ]
  },
  {
    id: 14,
    name: "Hognose Snake",
    type: "Snake",
    emoji: "🐍",
    habitat: {
      temperature: "75-85°F (24-29°C) with 85-90°F (29-32°C) basking",
      humidity: "30-50%",
      enclosureSize: "20+ gallon for adults",
      substrate: "Aspen shavings, cypress mulch, or sand"
    },
    diet: {
      primary: "Frozen/thawed mice or toads",
      frequency: "Every 5-7 days for juveniles; 7-10 days for adults",
      supplements: "Not typically needed",
      water: "Fresh water dish; change regularly"
    },
    careTips: [
      "Provide deep substrate for burrowing",
      "Use under-tank heating",
      "Handle gently and regularly",
      "Offer appropriately sized prey"
    ],
    funFacts: [
      "Upturned snout for digging",
      "Play dead when threatened",
      "Generally docile temperament",
      "Good beginner snake"
    ],
    warnings: [
      "Never feed live prey",
      "Avoid handling after feeding",
      "Keep enclosure secure"
    ]
  },
  {
    id: 15,
    name: "Chameleon",
    type: "Lizard",
    emoji: "🦎",
    habitat: {
      temperature: "70-80°F (21-27°C) with 85-95°F (29-35°C) basking",
      humidity: "60-80%",
      enclosureSize: "18x18x36 for adults",
      substrate: "Bare bottom or paper towels"
    },
    diet: {
      primary: "Insects (crickets, roaches, flies, worms)",
      frequency: "Daily for juveniles; every 1-2 days for adults",
      supplements: "Calcium with D3 and multivitamin",
      water: "Mist enclosure 2-3x daily; dripper system"
    },
    careTips: [
      "Provide vertical climbing space",
      "Use UVB lighting and misting system",
      "Handle minimally to reduce stress",
      "Offer varied insect diet"
    ],
    funFacts: [
      "Can change colors for communication",
      "Eyes move independently",
      "Long tongue for catching prey",
      "Very sensitive to stress"
    ],
    warnings: [
      "Avoid excessive handling",
      "Keep humidity consistent",
      "Provide proper UVB lighting",
      "Monitor for signs of stress"
    ]
  },
  {
    id: 16,
    name: "Tiger Salamander",
    type: "Amphibian",
    emoji: "🦎",
    habitat: {
      temperature: "60-70°F (16-21°C)",
      humidity: "70-80%",
      enclosureSize: "20+ gallon for adults",
      substrate: "Coconut fiber, sphagnum moss, or bioactive"
    },
    diet: {
      primary: "Insects, worms, and small vertebrates",
      frequency: "Every 2-3 days",
      supplements: "Calcium powder on insects",
      water: "Shallow dish; keep substrate moist"
    },
    careTips: [
      "Keep temperature cool",
      "Maintain high humidity",
      "Provide hiding spots",
      "Handle minimally"
    ],
    funFacts: [
      "Largest land salamander in North America",
      "Can live 15+ years",
      "Excellent swimmers",
      "Active during breeding season"
    ],
    warnings: [
      "Avoid high temperatures",
      "Don't handle with bare hands",
      "Keep away from other species"
    ]
  },
  {
    id: 17,
    name: "Gargoyle Gecko",
    type: "Lizard",
    emoji: "🦎",
    habitat: {
      temperature: "72-80°F (22-27°C)",
      humidity: "60-80%",
      enclosureSize: "18x18x24 for adults",
      substrate: "Coconut fiber, paper towels, or bioactive"
    },
    diet: {
      primary: "Commercial crested gecko diet + insects",
      frequency: "CGD 3-4x/week; insects 1-2x/week",
      supplements: "Calcium with D3 on insects",
      water: "Mist enclosure nightly; shallow dish optional"
    },
    careTips: [
      "Provide vertical climbing space",
      "Use ambient heating, not basking lights",
      "Offer ledges and hides at multiple heights",
      "Keep humidity consistent"
    ],
    funFacts: [
      "Named for their bumpy, gargoyle-like appearance",
      "Can vocalize with chirps",
      "Nocturnal and arboreal",
      "Many color morphs available"
    ],
    warnings: [
      "Avoid high heat",
      "Don't handle excessively",
      "Keep humidity consistent"
    ]
  },
  {
    id: 18,
    name: "Kingsnake",
    type: "Snake",
    emoji: "🐍",
    habitat: {
      temperature: "75-85°F (24-29°C) with 85-90°F (29-32°C) basking",
      humidity: "40-60%",
      enclosureSize: "20+ gallon for adults",
      substrate: "Aspen shavings, cypress mulch, or paper towels"
    },
    diet: {
      primary: "Frozen/thawed mice or rats",
      frequency: "Every 5-7 days for juveniles; 7-10 days for adults",
      supplements: "Not typically needed",
      water: "Fresh water dish; change regularly"
    },
    careTips: [
      "Provide secure hiding spots",
      "Use under-tank heating",
      "Handle gently and regularly",
      "Feed appropriately sized prey"
    ],
    funFacts: [
      "Named for eating other snakes",
      "Generally docile temperament",
      "Many beautiful color patterns",
      "Can live 20+ years"
    ],
    warnings: [
      "Never feed live prey",
      "Avoid handling after feeding",
      "Keep enclosure secure"
    ]
  },
  {
    id: 19,
    name: "Dart Frog",
    type: "Amphibian",
    emoji: "🐸",
    habitat: {
      temperature: "70-80°F (21-27°C)",
      humidity: "80-100%",
      enclosureSize: "10+ gallon for small groups",
      substrate: "Coconut fiber, sphagnum moss, or bioactive"
    },
    diet: {
      primary: "Small insects (fruit flies, springtails, small crickets)",
      frequency: "Daily",
      supplements: "Calcium powder on insects",
      water: "Mist enclosure 2-3x daily"
    },
    careTips: [
      "Keep humidity very high",
      "Provide plenty of plants and hiding spots",
      "Use gentle heating if needed",
      "Handle minimally"
    ],
    funFacts: [
      "Bright colors warn of toxicity",
      "Very small and active",
      "Excellent for bioactive setups",
      "Can live in small groups"
    ],
    warnings: [
      "Avoid handling with bare hands",
      "Keep away from other species",
      "Monitor humidity carefully"
    ]
  }
];

// Append additional common species with comprehensive, detailed profiles
import { additionalSpecies } from './additionalSpecies';

additionalSpecies.forEach((s, idx) => {
  const baseId = reptileData.length + 1 + idx;
  
  // Enhanced species profiles with detailed information
  const enhancedProfiles = {
    'Crested Gecko': {
      id: baseId,
      name: 'Crested Gecko',
      type: 'Lizard',
      emoji: '🦎',
      slug: 'crested-gecko',
      displayName: 'Crested Gecko',
      shortDesc: 'Arboreal gecko with distinctive crest and gentle temperament.',
      longDesc: 'Crested geckos are excellent beginner reptiles known for their distinctive crest above the eyes and their ability to vocalize with chirps. They thrive in vertical enclosures with plenty of climbing opportunities and moderate humidity.',
      habitat: {
        temperature: '72-78°F (22-26°C)',
        humidity: '50-70%',
        enclosureSize: '18x18x24 inches for adults',
        substrate: 'Coconut fiber, paper towels, or bioactive setup'
      },
      diet: {
        primary: 'Commercial crested gecko diet (CGD) + insects',
        frequency: 'CGD 3-4x/week; insects 1-2x/week',
        supplements: 'Calcium with D3 on insects',
        water: 'Shallow dish; mist enclosure nightly'
      },
      size: '7-9 inches (18-23 cm)',
      lifespan: '15-20 years',
      images: {
        desktop: 'crested-gecko-v1.webp',
        mobile: 'crested-gecko-v1.webp',
        alt: 'Crested gecko with distinctive crest above eyes',
        caption: 'Crested geckos are excellent climbers and make great first reptiles.'
      },
      careTips: [
        'Provide vertical climbing space and foliage',
        'Avoid direct basking lights; use ambient heating',
        'Offer ledges and hides at multiple heights',
        'Do not house with other males'
      ],
      funFacts: [
        'Also called eyelash geckos due to crest',
        'Can vocalize with chirps and squeaks',
        'Often active at night (nocturnal)',
        'Many beautiful color morphs available'
      ],
      warnings: [
        'Avoid high heat; they overheat easily',
        'Do not handle excessively',
        'Keep humidity consistent to prevent shedding issues'
      ]
    },
    'Axolotl': {
      id: baseId + 1,
      name: 'Axolotl',
      type: 'Amphibian',
      emoji: '🦎',
      slug: 'axolotl',
      displayName: 'Axolotl',
      shortDesc: 'Aquatic salamander that retains juvenile features throughout life.',
      longDesc: 'Axolotls are fascinating aquatic salamanders that never fully metamorphose, keeping their gills and aquatic lifestyle. They are excellent for experienced keepers who can maintain cool, clean water conditions.',
      habitat: {
        temperature: '60-68°F (16-20°C)',
        humidity: 'Aquatic',
        enclosureSize: '20+ gallon long for adults',
        substrate: 'Bare bottom or fine sand (no gravel)'
      },
      diet: {
        primary: 'High-quality pellets, earthworms, bloodworms',
        frequency: 'Every 2-3 days',
        supplements: 'Not typically needed',
        water: 'Dechlorinated, well-filtered, gentle flow'
      },
      size: '9-12 inches (23-30 cm)',
      lifespan: '10-15 years',
      images: {
        desktop: 'axolotl-v1.webp',
        mobile: 'axolotl-v1.webp',
        alt: 'Axolotl with feathery gills and aquatic features',
        caption: 'Axolotls are unique among salamanders for their permanent aquatic lifestyle.'
      },
      careTips: [
        'Keep water cool; avoid heaters',
        'Use gentle filtration and frequent water changes',
        'Provide hides and low light',
        'Avoid sharp decor'
      ],
      funFacts: [
        'Can regenerate limbs and organs',
        'Remain aquatic and gilled throughout life',
        'Come in multiple morphs (leucistic, wild type, etc.)',
        'Sensitive to poor water quality'
      ],
      warnings: [
        'No gravel (risk of impaction)',
        'Keep temperature below 70°F',
        'Avoid tankmates that can nip'
      ]
    },
    'Red-Eared Slider': {
      id: baseId + 2,
      name: 'Red-Eared Slider',
      type: 'Turtle',
      emoji: '🐢',
      slug: 'red-eared-slider',
      displayName: 'Red-Eared Slider',
      shortDesc: 'Popular aquatic turtle with distinctive red stripe behind eyes.',
      longDesc: 'Red-eared sliders are active, social turtles that require significant space and excellent water quality. They are excellent swimmers and need both aquatic and basking areas.',
      habitat: {
        temperature: 'Water 75-80°F (24-27°C), basking 85-90°F (29-32°C)',
        humidity: 'Aquatic',
        enclosureSize: '75+ gallons for adults',
        substrate: 'Bare bottom or large river stones'
      },
      diet: {
        primary: 'Pellets, leafy greens, occasional protein',
        frequency: 'Daily for juveniles; 4-5x/week adults',
        supplements: 'Calcium/UVB for shell health',
        water: 'Powerful filtration; frequent changes'
      },
      size: '8-12 inches (20-30 cm)',
      lifespan: '20-40 years',
      images: {
        desktop: 'red-eared-slider-v1.webp',
        mobile: 'red-eared-slider-v1.webp',
        alt: 'Red-eared slider turtle with red stripe behind eye',
        caption: 'Red-eared sliders are excellent swimmers and need large aquatic setups.'
      },
      careTips: [
        'Provide large swimming area',
        'Strong filter and regular maintenance',
        'Dry basking dock with UVB',
        'Offer varied diet'
      ],
      funFacts: [
        'Can live decades with proper care',
        'Very active swimmers',
        'Iconic red stripe behind the eyes',
        'Require significant space'
      ],
      warnings: [
        'Large adult size needs big enclosures',
        'Maintain water quality to prevent illness',
        'UVB is essential for shell health'
      ]
    },
    'Green Anole': {
      id: baseId + 3,
      name: 'Green Anole',
      type: 'Lizard',
      emoji: '🦎',
      slug: 'green-anole',
      displayName: 'Green Anole',
      shortDesc: 'Active arboreal lizard that can change color.',
      longDesc: 'Green anoles are small, active lizards native to the southeastern United States. They are excellent climbers and can change color from green to brown based on mood and environment.',
      habitat: {
        temperature: '75-85°F (24-29°C) with 90-95°F (32-35°C) basking',
        humidity: '60-80%',
        enclosureSize: '10+ gallon for adults',
        substrate: 'Coconut fiber, sphagnum moss, or bioactive'
      },
      diet: {
        primary: 'Small insects (crickets, fruit flies, small roaches)',
        frequency: 'Daily for juveniles; every 1-2 days for adults',
        supplements: 'Calcium with D3 on insects',
        water: 'Mist enclosure; shallow dish optional'
      },
      size: '5-8 inches (13-20 cm)',
      lifespan: '4-8 years',
      images: {
        desktop: 'green-anole-v1.webp',
        mobile: 'green-anole-v1.webp',
        alt: 'Green anole lizard with dewlap extended',
        caption: 'Green anoles are excellent climbers and can change color dramatically.'
      },
      careTips: [
        'Provide plenty of climbing branches and foliage',
        'Use UVB lighting for proper calcium absorption',
        'Keep humidity high with regular misting',
        'Handle minimally as they\'re easily stressed'
      ],
      funFacts: [
        'Can change color from green to brown',
        'Males have a red dewlap for display',
        'Very active and entertaining to watch',
        'Native to southeastern United States'
      ],
      warnings: [
        'Avoid handling when stressed',
        'Keep away from other anole species',
        'Monitor for signs of stress or illness'
      ]
    },
    'Blue-Tongued Skink': {
      id: baseId + 4,
      name: 'Blue-Tongued Skink',
      type: 'Lizard',
      emoji: '🦎',
      slug: 'blue-tongued-skink',
      displayName: 'Blue-Tongued Skink',
      shortDesc: 'Large, intelligent lizard with distinctive blue tongue.',
      longDesc: 'Blue-tongued skinks are large, intelligent lizards known for their distinctive blue tongue and gentle temperament. They are excellent for intermediate keepers and can learn tricks.',
      habitat: {
        temperature: '75-85°F (24-29°C) with 95-105°F (35-40°C) basking',
        humidity: '40-60%',
        enclosureSize: '40+ gallon for adults',
        substrate: 'Cypress mulch, coconut fiber, or bioactive'
      },
      diet: {
        primary: 'Omnivorous - insects, vegetables, fruits, occasional protein',
        frequency: 'Every 2-3 days',
        supplements: 'Calcium with D3 and multivitamin',
        water: 'Shallow dish; mist vegetables for hydration'
      },
      size: '18-24 inches (45-60 cm)',
      lifespan: '20+ years',
      images: {
        desktop: 'blue-tongued-skink-v1.webp',
        mobile: 'blue-tongued-skink-v1.webp',
        alt: 'Blue-tongued skink with distinctive blue tongue',
        caption: 'Blue-tongued skinks are intelligent and can learn tricks.'
      },
      careTips: [
        'Provide large enclosure with hiding spots',
        'Use UVB lighting for proper health',
        'Offer varied diet including vegetables',
        'Handle regularly to build trust'
      ],
      funFacts: [
        'Named for their distinctive blue tongue',
        'Very intelligent and can learn tricks',
        'Give birth to live young',
        'Can live 20+ years in captivity'
      ],
      warnings: [
        'Avoid high humidity which can cause respiratory issues',
        'Don\'t feed dog or cat food',
        'Provide proper UVB lighting'
      ]
    },
    'Milk Snake': {
      id: baseId + 5,
      name: 'Milk Snake',
      type: 'Snake',
      emoji: '🐍',
      slug: 'milk-snake',
      displayName: 'Milk Snake',
      shortDesc: 'Beautiful banded snake with many color variations.',
      longDesc: 'Milk snakes are beautiful, docile snakes with striking banded patterns. They are excellent beginner snakes and come in many color variations. They are active and good feeders.',
      habitat: {
        temperature: '75-85°F (24-29°C) with 85-90°F (29-32°C) basking',
        humidity: '40-60%',
        enclosureSize: '20+ gallon for adults',
        substrate: 'Aspen shavings, cypress mulch, or paper towels'
      },
      diet: {
        primary: 'Frozen/thawed mice or rats',
        frequency: 'Every 5-7 days for juveniles; 7-10 days for adults',
        supplements: 'Not typically needed',
        water: 'Fresh water dish; change regularly'
      },
      size: '3-5 feet (0.9-1.5 m)',
      lifespan: '15-20 years',
      images: {
        desktop: 'milk-snake-v1.webp',
        mobile: 'milk-snake-v1.webp',
        alt: 'Milk snake with red, black, and white bands',
        caption: 'Milk snakes come in many beautiful color variations.'
      },
      careTips: [
        'Provide secure hiding spots',
        'Use under-tank heating',
        'Handle gently and regularly',
        'Feed appropriately sized prey'
      ],
      funFacts: [
        'Beautiful color variations and patterns',
        'Non-venomous and generally docile',
        'Good beginner snake species',
        'Can live 15-20 years'
      ],
      warnings: [
        'Never feed live prey',
        'Avoid handling for 48 hours after feeding',
        'Keep enclosure secure to prevent escape'
      ]
    },
    'Fire-Bellied Toad': {
      id: baseId + 6,
      name: 'Fire-Bellied Toad',
      type: 'Amphibian',
      emoji: '🐸',
      slug: 'fire-bellied-toad',
      displayName: 'Fire-Bellied Toad',
      shortDesc: 'Brightly colored toad with toxic skin secretions.',
      longDesc: 'Fire-bellied toads are small, colorful amphibians known for their bright orange or red bellies. They are active and social, making them excellent for small groups.',
      habitat: {
        temperature: '70-80°F (21-27°C)',
        humidity: '70-80%',
        enclosureSize: '10+ gallon for small groups',
        substrate: 'Coconut fiber or sphagnum moss'
      },
      diet: {
        primary: 'Small insects (crickets, fruit flies, small roaches)',
        frequency: 'Every 2-3 days',
        supplements: 'Calcium powder on insects',
        water: 'Shallow water dish; keep substrate moist'
      },
      size: '1.5-2.5 inches (4-6 cm)',
      lifespan: '10-15 years',
      images: {
        desktop: 'fire-bellied-toad-v1.webp',
        mobile: 'fire-bellied-toad-v1.webp',
        alt: 'Fire-bellied toad with bright orange belly',
        caption: 'Fire-bellied toads are active and social amphibians.'
      },
      careTips: [
        'Keep substrate consistently moist',
        'Provide both land and water areas',
        'Use gentle heating if needed',
        'Handle minimally to avoid stress'
      ],
      funFacts: [
        'Bright orange/red belly as warning display',
        'Active during day and night',
        'Can live in small groups',
        'Good for beginners'
      ],
      warnings: [
        'Avoid handling with bare hands',
        'Keep away from other species',
        'Monitor humidity levels carefully'
      ]
    },
    'Uromastyx': {
      id: baseId + 7,
      name: 'Uromastyx',
      type: 'Lizard',
      emoji: '🦎',
      slug: 'uromastyx',
      displayName: 'Uromastyx',
      shortDesc: 'Desert lizard with spiny tail and herbivorous diet.',
      longDesc: 'Uromastyx are desert-dwelling lizards known for their spiny tails and herbivorous diet. They require very hot basking temperatures and low humidity.',
      habitat: {
        temperature: '80-90°F (27-32°C) with 110-120°F (43-49°C) basking',
        humidity: '20-30%',
        enclosureSize: '40+ gallon for adults',
        substrate: 'Play sand, calcium sand, or tile'
      },
      diet: {
        primary: 'Vegetables, flowers, and occasional insects',
        frequency: 'Daily vegetables; insects 1-2x/week',
        supplements: 'Calcium with D3 and multivitamin',
        water: 'Mist vegetables; shallow dish optional'
      },
      size: '10-18 inches (25-45 cm)',
      lifespan: '15-20 years',
      images: {
        desktop: 'uromastyx-v1.webp',
        mobile: 'uromastyx-v1.webp',
        alt: 'Uromastyx with spiny tail and desert coloring',
        caption: 'Uromastyx are desert specialists requiring very hot temperatures.'
      },
      careTips: [
        'Provide very hot basking area',
        'Use strong UVB lighting',
        'Offer varied vegetables and flowers',
        'Keep humidity very low'
      ],
      funFacts: [
        'Also called spiny-tailed lizards',
        'Herbivorous as adults',
        'Can live 15-20 years',
        'Native to desert regions'
      ],
      warnings: [
        'Avoid high humidity',
        'Don\'t use loose substrates for juveniles',
        'Provide very hot basking temperatures'
      ]
    },
    'Hognose Snake': {
      id: baseId + 8,
      name: 'Hognose Snake',
      type: 'Snake',
      emoji: '🐍',
      slug: 'hognose-snake',
      displayName: 'Hognose Snake',
      shortDesc: 'Docile snake with upturned snout and dramatic defense.',
      longDesc: 'Hognose snakes are gentle, docile snakes known for their upturned snout and dramatic defensive behaviors. They are excellent beginner snakes with unique personalities.',
      habitat: {
        temperature: '75-85°F (24-29°C) with 85-90°F (29-32°C) basking',
        humidity: '30-50%',
        enclosureSize: '20+ gallon for adults',
        substrate: 'Aspen shavings, cypress mulch, or sand'
      },
      diet: {
        primary: 'Frozen/thawed mice or toads',
        frequency: 'Every 5-7 days for juveniles; 7-10 days for adults',
        supplements: 'Not typically needed',
        water: 'Fresh water dish; change regularly'
      },
      size: '2-4 feet (0.6-1.2 m)',
      lifespan: '15-20 years',
      images: {
        desktop: 'hognose-snake-v1.webp',
        mobile: 'hognose-snake-v1.webp',
        alt: 'Hognose snake with upturned snout',
        caption: 'Hognose snakes have unique personalities and dramatic defense displays.'
      },
      careTips: [
        'Provide deep substrate for burrowing',
        'Use under-tank heating',
        'Handle gently and regularly',
        'Offer appropriately sized prey'
      ],
      funFacts: [
        'Upturned snout for digging',
        'Play dead when threatened',
        'Generally docile temperament',
        'Good beginner snake'
      ],
      warnings: [
        'Never feed live prey',
        'Avoid handling after feeding',
        'Keep enclosure secure'
      ]
    },
    'Chameleon': {
      id: baseId + 9,
      name: 'Chameleon',
      type: 'Lizard',
      emoji: '🦎',
      slug: 'chameleon',
      displayName: 'Chameleon',
      shortDesc: 'Color-changing lizard with independently moving eyes.',
      longDesc: 'Chameleons are fascinating lizards known for their ability to change colors and their independently moving eyes. They require specialized care and are best for experienced keepers.',
      habitat: {
        temperature: '70-80°F (21-27°C) with 85-95°F (29-35°C) basking',
        humidity: '60-80%',
        enclosureSize: '18x18x36 inches for adults',
        substrate: 'Bare bottom or paper towels'
      },
      diet: {
        primary: 'Insects (crickets, roaches, flies, worms)',
        frequency: 'Daily for juveniles; every 1-2 days for adults',
        supplements: 'Calcium with D3 and multivitamin',
        water: 'Mist enclosure 2-3x daily; dripper system'
      },
      size: '12-24 inches (30-60 cm)',
      lifespan: '5-10 years',
      images: {
        desktop: 'chameleon-v1.webp',
        mobile: 'chameleon-v1.webp',
        alt: 'Chameleon with independently moving eyes',
        caption: 'Chameleons are masters of color change and camouflage.'
      },
      careTips: [
        'Provide vertical climbing space',
        'Use UVB lighting and misting system',
        'Handle minimally to reduce stress',
        'Offer varied insect diet'
      ],
      funFacts: [
        'Can change colors for communication',
        'Eyes move independently',
        'Long tongue for catching prey',
        'Very sensitive to stress'
      ],
      warnings: [
        'Avoid excessive handling',
        'Keep humidity consistent',
        'Provide proper UVB lighting',
        'Monitor for signs of stress'
      ]
    },
    'Tiger Salamander': {
      id: baseId + 10,
      name: 'Tiger Salamander',
      type: 'Amphibian',
      emoji: '🦎',
      slug: 'tiger-salamander',
      displayName: 'Tiger Salamander',
      shortDesc: 'Large terrestrial salamander with distinctive stripes.',
      longDesc: 'Tiger salamanders are large, terrestrial salamanders with striking yellow and black stripes. They are excellent for intermediate keepers and can be quite interactive.',
      habitat: {
        temperature: '60-70°F (16-21°C)',
        humidity: '70-80%',
        enclosureSize: '20+ gallon for adults',
        substrate: 'Coconut fiber, sphagnum moss, or bioactive'
      },
      diet: {
        primary: 'Insects, worms, and small vertebrates',
        frequency: 'Every 2-3 days',
        supplements: 'Calcium powder on insects',
        water: 'Shallow dish; keep substrate moist'
      },
      size: '6-13 inches (15-33 cm)',
      lifespan: '15+ years',
      images: {
        desktop: 'tiger-salamander-v1.webp',
        mobile: 'tiger-salamander-v1.webp',
        alt: 'Tiger salamander with yellow and black stripes',
        caption: 'Tiger salamanders are the largest land salamanders in North America.'
      },
      careTips: [
        'Keep temperature cool',
        'Maintain high humidity',
        'Provide hiding spots',
        'Handle minimally'
      ],
      funFacts: [
        'Largest land salamander in North America',
        'Can live 15+ years',
        'Excellent swimmers',
        'Active during breeding season'
      ],
      warnings: [
        'Avoid high temperatures',
        'Don\'t handle with bare hands',
        'Keep away from other species'
      ]
    },
    'Gargoyle Gecko': {
      id: baseId + 11,
      name: 'Gargoyle Gecko',
      type: 'Lizard',
      emoji: '🦎',
      slug: 'gargoyle-gecko',
      displayName: 'Gargoyle Gecko',
      shortDesc: 'Bumpy-textured gecko with gentle temperament.',
      longDesc: 'Gargoyle geckos are named for their bumpy, textured skin that resembles stone gargoyles. They are excellent climbers and make great pets for beginners.',
      habitat: {
        temperature: '72-80°F (22-27°C)',
        humidity: '60-80%',
        enclosureSize: '18x18x24 inches for adults',
        substrate: 'Coconut fiber, paper towels, or bioactive'
      },
      diet: {
        primary: 'Commercial crested gecko diet + insects',
        frequency: 'CGD 3-4x/week; insects 1-2x/week',
        supplements: 'Calcium with D3 on insects',
        water: 'Mist enclosure nightly; shallow dish optional'
      },
      size: '7-9 inches (18-23 cm)',
      lifespan: '15-20 years',
      images: {
        desktop: 'gargoyle-gecko-v1.webp',
        mobile: 'gargoyle-gecko-v1.webp',
        alt: 'Gargoyle gecko with bumpy, textured skin',
        caption: 'Gargoyle geckos are named for their stone-like appearance.'
      },
      careTips: [
        'Provide vertical climbing space',
        'Use ambient heating, not basking lights',
        'Offer ledges and hides at multiple heights',
        'Keep humidity consistent'
      ],
      funFacts: [
        'Named for their bumpy, gargoyle-like appearance',
        'Can vocalize with chirps',
        'Nocturnal and arboreal',
        'Many color morphs available'
      ],
      warnings: [
        'Avoid high heat',
        'Don\'t handle excessively',
        'Keep humidity consistent'
      ]
    },
    'Kingsnake': {
      id: baseId + 12,
      name: 'Kingsnake',
      type: 'Snake',
      emoji: '🐍',
      slug: 'kingsnake',
      displayName: 'Kingsnake',
      shortDesc: 'Powerful constrictor known for eating other snakes.',
      longDesc: 'Kingsnakes are powerful constrictors known for their ability to eat other snakes, including venomous ones. They are excellent pets with beautiful patterns.',
      habitat: {
        temperature: '75-85°F (24-29°C) with 85-90°F (29-32°C) basking',
        humidity: '40-60%',
        enclosureSize: '20+ gallon for adults',
        substrate: 'Aspen shavings, cypress mulch, or paper towels'
      },
      diet: {
        primary: 'Frozen/thawed mice or rats',
        frequency: 'Every 5-7 days for juveniles; 7-10 days for adults',
        supplements: 'Not typically needed',
        water: 'Fresh water dish; change regularly'
      },
      size: '3-6 feet (0.9-1.8 m)',
      lifespan: '20+ years',
      images: {
        desktop: 'kingsnake-v1.webp',
        mobile: 'kingsnake-v1.webp',
        alt: 'Kingsnake with banded pattern',
        caption: 'Kingsnakes are powerful constrictors with beautiful patterns.'
      },
      careTips: [
        'Provide secure hiding spots',
        'Use under-tank heating',
        'Handle gently and regularly',
        'Feed appropriately sized prey'
      ],
      funFacts: [
        'Named for eating other snakes',
        'Generally docile temperament',
        'Many beautiful color patterns',
        'Can live 20+ years'
      ],
      warnings: [
        'Never feed live prey',
        'Avoid handling after feeding',
        'Keep enclosure secure'
      ]
    }
  };

  // Add the enhanced profile to reptileData
  const speciesName = s.name;
  if (enhancedProfiles[speciesName]) {
    reptileData.push(enhancedProfiles[speciesName]);
  } else {
    // Fallback for any species not in enhanced profiles – provide helpful, type-based defaults
    const typeLower = (s.type || '').toLowerCase();
    const defaultsByType = {
      lizard: {
        habitat: {
          temperature: '75-85°F (24-29°C) with 90-100°F (32-38°C) basking',
          humidity: '40-60% (tropical 60-80%)',
          enclosureSize: '20+ gallon for small species; 18x18x24"+ arboreal',
          substrate: 'Reptile carpet, tile, or cypress mulch'
        },
        diet: {
          primary: 'Insectivores: crickets/roaches/worms; omnivores: add leafy greens',
          frequency: 'Juveniles daily; adults every 2-3 days',
          supplements: 'Calcium with D3 2-3x/week; multivitamin 1x/week',
          water: 'Shallow dish; change daily'
        },
        size: '6-24 inches (15-60 cm)',
        lifespan: '8-20 years'
      },
      snake: {
        habitat: {
          temperature: '75-85°F (24-29°C) with 85-90°F (29-32°C) warm side',
          humidity: '30-60% (species-dependent)',
          enclosureSize: '20+ gallon for small species; larger for adults',
          substrate: 'Aspen shavings, cypress mulch, or paper'
        },
        diet: {
          primary: 'Frozen/thawed rodents sized to widest part of body',
          frequency: 'Juveniles every 5-7 days; adults every 7-14 days',
          supplements: 'Not typically needed',
          water: 'Fresh water dish; change regularly'
        },
        size: '2-6 feet (0.6-1.8 m)',
        lifespan: '10-25 years'
      },
      turtle: {
        habitat: {
          temperature: 'Water 75-80°F (24-27°C), basking 85-90°F (29-32°C)',
          humidity: 'Aquatic',
          enclosureSize: '75+ gallons for adults',
          substrate: 'Bare bottom or large river stones'
        },
        diet: {
          primary: 'Pellets with leafy greens; occasional protein',
          frequency: 'Juveniles daily; adults 4-5x/week',
          supplements: 'Calcium and UVB exposure for shell health',
          water: 'Strong filtration; weekly partial water changes'
        },
        size: '6-12 inches shell length (15-30 cm)',
        lifespan: '20-40 years'
      },
      amphibian: {
        habitat: {
          temperature: '60-75°F (16-24°C)',
          humidity: '70-90% (aquatic for fully aquatic species)',
          enclosureSize: '10+ gallons small species; 20+ gallons larger',
          substrate: 'Coconut fiber, sphagnum moss, or bioactive'
        },
        diet: {
          primary: 'Small insects (fruit flies, crickets, worms) or aquatic pellets',
          frequency: 'Every 1-3 days depending on species',
          supplements: 'Calcium powder on insects',
          water: 'Dechlorinated water; mist or partial water changes daily'
        },
        size: '1-12 inches (2.5-30 cm)',
        lifespan: '5-15 years (some longer)'
      }
    };

    const defaults = defaultsByType[typeLower] || {
      habitat: {
        temperature: '72-82°F (22-28°C)',
        humidity: '40-70%',
        enclosureSize: 'Appropriate adult size with secure lid',
        substrate: 'Species-appropriate, easy to clean'
      },
      diet: {
        primary: 'Balanced, species-appropriate diet',
        frequency: 'Juveniles more often than adults',
        supplements: 'Calcium/mineral support as appropriate',
        water: 'Fresh, clean water available at all times'
      },
      size: 'Small-to-medium sized captive species',
      lifespan: '8-20 years with proper care'
    };

    reptileData.push({
      id: baseId,
      name: s.name,
      type: s.type,
      emoji: s.emoji,
      slug: s.name.toLowerCase().replace(/\s+/g, '-'),
      displayName: s.name,
      shortDesc: 'Popular species in the pet trade.',
      longDesc: `${s.name} is a popular species that benefits from stable temperatures, proper lighting, and a species-appropriate diet. Research the specific care needs for best results.`,
      habitat: defaults.habitat,
      diet: defaults.diet,
      size: defaults.size,
      lifespan: defaults.lifespan,
      images: {
        desktop: `${s.name.toLowerCase().replace(/\s+/g, '-')}-v1.webp`,
        mobile: `${s.name.toLowerCase().replace(/\s+/g, '-')}-v1.webp`,
        alt: `${s.name} in natural habitat`,
        caption: `${s.name} requires consistent temperatures and clean water.`
      },
      careTips: [
        'Provide secure hides and enrichment',
        'Monitor temperature and humidity with digital gauges',
        'Offer appropriately sized, varied diet',
        'Quarantine new animals and practice good hygiene'
      ],
      funFacts: [
        'Popular in the pet trade',
        'Captive-bred individuals recommended',
        'Each species has unique needs',
        'Proper research is essential'
      ],
      warnings: [
        'Ensure enclosure size and heating are adequate',
        'Avoid wild-caught animals when possible',
        'Never release pets into the wild'
      ]
    });
  }
});
