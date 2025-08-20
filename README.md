# 🦎 Reptile Info Tablet

An interactive tablet application designed to educate Petco customers about reptiles and amphibians right at their enclosures. Built with React and Tailwind CSS for a modern, touch-friendly interface, now powered by **local AI intelligence** via Ollama.

## 🎯 Features

- **Interactive Species Selection**: Grid-based interface for easy species selection
- **Comprehensive Care Information**: Detailed habitat, diet, and care requirements
- **Educational Content**: Fun facts and important warnings for each species
- **🤖 AI-Powered Q&A**: Ask questions and get intelligent responses about reptile care
- **🛒 Care Checklist System**: Comprehensive shopping lists with cost estimates and AI recommendations
- **Tablet-Optimized**: Touch-friendly design with responsive layout
- **Offline-Ready**: Built to work without internet connection
- **Local AI Processing**: All AI responses generated locally using Ollama
- **Modular Architecture**: Clean, expandable codebase for future features

## 🏷️ Category
Best Local Agent — runs offline with GPT-OSS and provides in-store assistance.

## 🚀 Quick Start
1) Install Node.js (v16+)
2) Clone and install deps:
```bash
npm install
```
3) AI (GPT-OSS via Ollama):
```bash
# install ollama from https://ollama.ai
ollama pull gpt-oss:20b
ollama serve
```
4) Configure provider (optional):
- Copy `src/config.example` to `.env` and adjust values
- Default provider is `ollama`

5) Run the app:
```bash
npm start
```

## 🔗 Demo Links
- Live Demo (Netlify): [https://reptilerocks.netlify.app/](https://reptilerocks.netlify.app/)
- Demo Video (YouTube): <ADD_LINK_AFTER_UPLOAD>

## 🖼️ Image Sources
Photos are sourced from stock sites (Unsplash/Pexels) and used under their licenses. See IMAGE_DOWNLOAD_GUIDE.md for filenames; add attributions here as we finalize the set.

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.js       # App header with title
│   ├── ReptileGrid.js  # Main species selection grid
│   ├── SpeciesDetailModal.js # Detailed species information modal
│   ├── ReptileQA.js    # AI-powered Q&A component
│   ├── ReptileQuiz.js  # Interactive quiz system
│   ├── DailyFunFacts.js # Rotating fun facts modal
│   ├── CareChecklist.js # Shopping list and care requirements
│   ├── KnowledgeLog.js # Saved AI responses manager
│   └── AchievementsDisplay.js # Achievement and progress tracking
├── services/            # Service layer
│   ├── aiService.js    # AI integration with Ollama
│   ├── knowledgeService.js # Knowledge log management
│   └── achievementService.js # Achievement and progress tracking
├── data/               # Data files
│   ├── reptileData.js  # Species information database
│   ├── quizData.js     # Quiz questions and answers
│   └── careChecklistData.js # Shopping lists and care requirements
├── App.js              # Main application component
├── index.js            # React entry point
└── index.css           # Global styles and Tailwind imports
```

## 🤖 AI Integration

### Features
- **Local AI Processing**: All responses generated locally using Ollama
- **Species-Specific Advice**: AI considers individual species data when answering
- **Safety-First Responses**: Built-in safety rules prevent harmful advice
- **Fun Fact Integration**: Each response includes educational tidbits
- **Offline Fallback**: Graceful degradation when AI is unavailable

### How It Works
1. User asks a question about a specific reptile
2. AI service sends query to local Ollama instance
3. AI generates response using species data and reptile expertise
4. Response includes answer and optional fun fact
5. All processing happens locally - no internet required

### Safety Features
- **No Live Prey Recommendations**: AI never suggests feeding live prey to snakes
- **Temperature Safety**: AI validates temperature and humidity suggestions
- **Substrate Safety**: AI recommends only safe substrate options
- **Veterinary Guidance**: AI suggests consulting vets for complex issues

## 🎨 Design System

### Color Palette
- **Reptile Green**: Primary brand color (#2D5016)
- **Desert Sand**: Accent text (#F4E4BC)
- **Jungle Dark**: Secondary background (#1A3D14)
- **Swamp Moss**: Tertiary accent (#8B9A47)
- **Coral Accent**: Highlight color (#FF6B6B)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Display**: Bold headings and titles
- **Body**: Regular text and descriptions

## 🦎 Current Species

1. **Leopard Gecko** - Popular beginner reptile
2. **Bearded Dragon** - Friendly desert lizard
3. **Pacman Frog** - Unique amphibian pet
4. **Ball Python** - Gentle giant snake
5. **Corn Snake** - Colorful escape artist

## 🎯 Quests

### Quest 10: The Great Playtest
**Testing & Analytics Dashboard** - Real-time metrics collection, user satisfaction monitoring, and completion rate analytics with export capabilities.

### Quest 11: The Rite of Eternal Growth  
**Automated Evolution System** - AI-powered insight engine, living roadmap, and sustainability spells for continuous platform improvement.

### Quest 12: The Image Enchantment
**Visual Transformation** - 19 species with professional stock photos, enhanced UI/UX, and responsive design optimized for tablets.

**Live demo: [https://reptilerocks.netlify.app/](https://reptilerocks.netlify.app/)**

## 🔮 Future Enhancements

- **Enhanced AI Models**: Support for more Ollama models
- **Voice Interaction**: Speech-to-text and text-to-speech
- **More Species**: Expanded database of reptiles and amphibians
- **Interactive Elements**: Habitat setup guides and feeding schedules
- **Multimedia**: High-quality species images and hero banner visuals
- **Search Functionality**: Quick species lookup with AI assistance
- **Customer Feedback**: Rating and review system
- **Multi-language Support**: AI responses in multiple languages

## 🖼️ Quest 12: The Image Enchantment

The visual transformation quest that brings real, immersive imagery to the Reptile Kingdom:

### Features
- **Hero Banner**: Full-width hero image with dark gradient overlay for text legibility
- **Creature Cards Upgrade**: Real species images with emoji badges as secondary accents
- **Enhanced Visual Layout**: Improved spacing, shadows, and hover effects for images
- **Responsive Image Design**: Tablet-optimized image display with fallback emojis

### Implementation
- `public/images/hero-bearded-dragon.svg` - Hero banner background image
- `public/images/1.svg`, `2.svg`, `3.svg` - Species-specific creature images
- Enhanced Header component with hero banner and overlay
- Updated ReptileGrid with image-based creature cards
- New CSS classes for image enchantment effects
- Subtle background texture for enhanced visual depth

### Image Sources
- Custom SVG illustrations for each species (Leopard Gecko, Bearded Dragon, Pacman Frog)
- Hero banner featuring a majestic bearded dragon in desert habitat
- Emoji badges maintained as secondary visual elements
- Fallback system ensures graceful degradation if images fail to load

## 🛠️ Technology Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Build Tool**: Create React App
- **Package Manager**: npm
- **Fonts**: Google Fonts (Inter)
- **AI Backend**: Ollama with gpt-oss models
- **AI Models**: Llama2, Mistral, or other Ollama-compatible models

## 📱 Tablet Optimization

- Touch-friendly button sizes (minimum 44px)
- Responsive grid layout
- Optimized for 768px+ screen sizes
- Smooth animations and transitions
- High contrast for retail environments
- AI processing optimized for tablet hardware

## 🔒 Security & Privacy

- **100% Local Processing**: No data leaves your device
- **No Internet Required**: Works completely offline
- **No User Data Collection**: No personal information stored
- **Safe AI Responses**: Built-in safety rules prevent harmful advice
- **Veterinary Disclaimers**: AI always recommends professional consultation when needed

## 🤝 Contributing

This project follows a modular architecture designed for easy expansion. When adding new features:

1. Follow the existing component structure
2. Use the established design system
3. Ensure tablet-friendly interactions
4. Add comprehensive data for new species
5. Test AI responses for safety and accuracy
6. Test on various screen sizes

## 📄 License

This project is designed for educational and commercial use at Petco locations.

---

**Built with 🦎 by the Reptile Info Tablet Team**

*Powered by local AI intelligence for safe, accurate reptile care advice* 🤖✨
 
Deployed demo: https://reptilerocks.netlify.app/ 

## 🤖 AI Integration (Hackathon-compliant)

AI Integration
- Primary (required by hackathon): GPT-OSS local model (tested with Ollama / gpt-oss:20b)
  Setup:
    1. Install Ollama: https://ollama.ai
    2. Pull model: ollama pull gpt-oss:20b
    3. Start server: ollama serve
    4. Frontend config: set REACT_APP_AI_PROVIDER=ollama (or follow src/config.example)
- Optional fallback: OpenAI API (disabled by default). See src/config.example for API key usage. 
