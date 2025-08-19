// Quiz Data for Reptile Info Tablet
// Interactive quizzes to test knowledge and make learning fun!

export const quizData = {
  'Leopard Gecko': [
    {
      id: 'lg_1',
      question: 'What is the best temperature for a Leopard Gecko\'s basking spot?',
      options: [
        '70-75°F (21-24°C)',
        '80-85°F (27-29°C)',
        '90-95°F (32-35°C)',
        '100-105°F (38-41°C)'
      ],
      correctAnswer: 2,
      explanation: 'Leopard Geckos need a basking spot of 90-95°F (32-35°C) for proper digestion and thermoregulation.',
      funFact: '🦎 Leopard Geckos are one of the few gecko species that can blink! Most geckos have transparent eyelids that they lick clean.'
    },
    {
      id: 'lg_2',
      question: 'How often should you feed a juvenile Leopard Gecko?',
      options: [
        'Once a week',
        'Every 1-2 days',
        'Every 3-4 days',
        'Once a month'
      ],
      correctAnswer: 1,
      explanation: 'Juvenile Leopard Geckos should be fed every 1-2 days to support their rapid growth.',
      funFact: '🍽️ Leopard Geckos store fat in their tails, which can grow quite plump when they\'re well-fed!'
    },
    {
      id: 'lg_3',
      question: 'What substrate should you avoid for young Leopard Geckos?',
      options: [
        'Paper towels',
        'Reptile carpet',
        'Fine sand',
        'Coconut fiber'
      ],
      correctAnswer: 2,
      explanation: 'Fine sand can cause impaction if ingested, which is dangerous for young geckos.',
      funFact: '⚠️ Young geckos are more likely to accidentally ingest substrate while hunting, so safe options are crucial!'
    }
  ],
  'Bearded Dragon': [
    {
      id: 'bd_1',
      question: 'What percentage of a juvenile Bearded Dragon\'s diet should be insects?',
      options: [
        '20% insects, 80% vegetables',
        '50% insects, 50% vegetables',
        '80% insects, 20% vegetables',
        '100% insects'
      ],
      correctAnswer: 2,
      explanation: 'Juvenile Bearded Dragons need 80% insects and 20% vegetables for proper protein intake during growth.',
      funFact: '🐉 Bearded Dragons can change color based on their mood, temperature, and even to communicate with other dragons!'
    },
    {
      id: 'bd_2',
      question: 'What type of lighting is essential for Bearded Dragons?',
      options: [
        'Only heat lamps',
        'Only UVB lighting',
        'Both heat and UVB lighting',
        'No special lighting needed'
      ],
      correctAnswer: 2,
      explanation: 'Bearded Dragons need both heat lamps for basking and UVB lighting for vitamin D3 synthesis and calcium absorption.',
      funFact: '☀️ Without UVB lighting, Bearded Dragons can develop metabolic bone disease, which can be fatal!'
    },
    {
      id: 'bd_3',
      question: 'How do Bearded Dragons communicate with each other?',
      options: [
        'Vocal sounds',
        'Arm waving and head bobbing',
        'Tail rattling',
        'All of the above'
      ],
      correctAnswer: 3,
      explanation: 'Bearded Dragons use arm waving, head bobbing, and even color changes to communicate with each other.',
      funFact: '👋 Arm waving is often a sign of submission, while head bobbing can indicate dominance or territorial behavior!'
    }
  ],
  'Pacman Frog': [
    {
      id: 'pf_1',
      question: 'Why are Pacman Frogs called "Pacman Frogs"?',
      options: [
        'They make pac-man sounds',
        'They eat everything in sight like the video game',
        'They have round, Pac-Man-like bodies',
        'They were discovered by someone named Pacman'
      ],
      correctAnswer: 2,
      explanation: 'Pacman Frogs are named for their round, Pac-Man-like body shape and their voracious appetite.',
      funFact: '🐸 Pacman Frogs can eat prey nearly their own size! They\'re incredibly voracious eaters.'
    },
    {
      id: 'pf_2',
      question: 'What humidity level do Pacman Frogs need?',
      options: [
        '30-40%',
        '50-60%',
        '70-80%',
        '90-100%'
      ],
      correctAnswer: 2,
      explanation: 'Pacman Frogs need 70-80% humidity to maintain healthy skin and prevent dehydration.',
      funFact: '💧 Pacman Frogs absorb water through their skin, so proper humidity is crucial for their survival!'
    },
    {
      id: 'pf_3',
      question: 'How often should you handle a Pacman Frog?',
      options: [
        'Daily for bonding',
        'Weekly for health checks',
        'Minimally, only when necessary',
        'Never handle them'
      ],
      correctAnswer: 2,
      explanation: 'Pacman Frogs should be handled minimally as they\'re sensitive to oils on human skin and stress easily.',
      funFact: '🤲 Pacman Frogs have very sensitive skin that can absorb chemicals and oils, making handling risky!'
    }
  ],
  'Ball Python': [
    {
      id: 'bp_1',
      question: 'Why do Ball Pythons curl into a ball?',
      options: [
        'To keep warm',
        'To hide from predators',
        'To sleep comfortably',
        'To show they\'re happy'
      ],
      correctAnswer: 1,
      explanation: 'Ball Pythons curl into a tight ball as a defensive mechanism to protect their head and vital organs.',
      funFact: '🔄 This defensive behavior is so characteristic that it gave them their common name!'
    },
    {
      id: 'bp_2',
      question: 'What is the best food for Ball Pythons?',
      options: [
        'Live mice and rats',
        'Frozen/thawed mice and rats',
        'Raw meat',
        'Vegetables'
      ],
      correctAnswer: 1,
      explanation: 'Frozen/thawed prey is safer for both the snake and the prey, preventing injury to the snake.',
      funFact: '❄️ Frozen prey is not only safer but also more convenient to store and feed!'
    },
    {
      id: 'bp_3',
      question: 'How long can Ball Pythons go without eating?',
      options: [
        'A few days',
        'A few weeks',
        'Several months',
        'Over a year'
      ],
      correctAnswer: 2,
      explanation: 'Ball Pythons can go several months without eating, especially during breeding season or when stressed.',
      funFact: '⏰ This ability to fast for long periods helps them survive in the wild when food is scarce!'
    }
  ],
  'Corn Snake': [
    {
      id: 'cs_1',
      question: 'Why are Corn Snakes excellent escape artists?',
      options: [
        'They can fly',
        'They can fit through tiny openings',
        'They can dig tunnels',
        'They can teleport'
      ],
      correctAnswer: 1,
      explanation: 'Corn Snakes can escape through surprisingly small openings and gaps in their enclosure.',
      funFact: '🚪 Always secure your Corn Snake\'s enclosure tightly - they\'re masters of finding escape routes!'
    },
    {
      id: 'cs_2',
      question: 'How many color variations do Corn Snakes have?',
      options: [
        'About 50',
        'About 200',
        'Over 800',
        'Over 1000'
      ],
      correctAnswer: 2,
      explanation: 'Corn Snakes come in over 800 different color and pattern variations due to selective breeding.',
      funFact: '🎨 This incredible variety makes Corn Snakes one of the most diverse snake species in captivity!'
    },
    {
      id: 'cs_3',
      question: 'What is the best substrate for Corn Snakes?',
      options: [
        'Sand',
        'Gravel',
        'Aspen shavings or cypress mulch',
        'Newspaper only'
      ],
      correctAnswer: 2,
      explanation: 'Aspen shavings or cypress mulch provide good burrowing opportunities and are safe if accidentally ingested.',
      funFact: '🌱 Corn Snakes love to burrow, so providing substrate that allows this natural behavior is important!'
    }
  ]
};

// General reptile knowledge quiz
export const generalQuiz = [
  {
    id: 'gen_1',
    question: 'What is the most important factor for reptile health?',
    options: [
      'Proper temperature',
      'Proper humidity',
      'Proper diet',
      'All of the above'
    ],
    correctAnswer: 3,
    explanation: 'All three factors - temperature, humidity, and diet - are equally important for reptile health.',
    funFact: '🏥 Reptiles need all three factors to work together for optimal health and longevity!'
  },
  {
    id: 'gen_2',
    question: 'Why should you wash your hands after handling reptiles?',
    options: [
      'To remove germs from the reptile',
      'To prevent salmonella transmission',
      'To keep the reptile clean',
      'All of the above'
    ],
    correctAnswer: 1,
    explanation: 'Reptiles can carry salmonella bacteria, which can be transmitted to humans through handling.',
    funFact: '🧼 Always wash your hands after handling any reptile to prevent illness!'
  },
  {
    id: 'gen_3',
    question: 'What is the best way to transport a reptile?',
    options: [
      'In a cardboard box',
      'In a secure, ventilated container',
      'In your pocket',
      'In a plastic bag'
    ],
    correctAnswer: 1,
    explanation: 'Reptiles should be transported in a secure, well-ventilated container to prevent escape and ensure safety.',
    funFact: '🚗 Secure transport containers are essential for both the reptile\'s safety and your peace of mind!'
  }
];

// Get quiz for a specific species
export const getSpeciesQuiz = (speciesName) => {
  return quizData[speciesName] || [];
};

// Get all available species for quizzes
export const getQuizSpecies = () => {
  return Object.keys(quizData);
};

// Get random quiz question
export const getRandomQuiz = (speciesName = null) => {
  if (speciesName && quizData[speciesName]) {
    const speciesQuiz = quizData[speciesName];
    return speciesQuiz[Math.floor(Math.random() * speciesQuiz.length)];
  }
  
  // Return random general question
  return generalQuiz[Math.floor(Math.random() * generalQuiz.length)];
};
