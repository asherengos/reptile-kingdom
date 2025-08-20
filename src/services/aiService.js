// AI Service for Reptile Info Tablet
// Primary provider: GPT-OSS via Ollama (required by hackathon)
// Optional fallback: OpenAI API (disabled by default)

class AIService {
  constructor() {
    // Provider selection via env var
    // Values: 'ollama' (default, GPT-OSS) | 'openai' (optional fallback)
    this.provider = (process.env.REACT_APP_AI_PROVIDER || 'ollama').toLowerCase();

    // Ollama (GPT-OSS) config
    this.baseUrl = process.env.REACT_APP_OLLAMA_BASE || 'http://localhost:11434';
    this.model = process.env.REACT_APP_OLLAMA_MODEL || 'gpt-oss:20b';

    // OpenAI config (optional)
    this.openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY || '';
    this.openaiModel = process.env.REACT_APP_OPENAI_MODEL || 'gpt-4o-mini';

    this.isConnected = false;
    // Only probe Ollama when provider is ollama
    if (this.provider === 'ollama') {
      this.testConnection();
    } else {
      this.isConnected = !!this.openaiApiKey;
    }
  }

  // Test connection to Ollama
  async testConnection() {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`);
      if (response.ok) {
        this.isConnected = true;
        console.log('✅ Connected to Ollama AI service');
      } else {
        this.isConnected = false;
        console.warn('⚠️ Ollama service not responding');
      }
    } catch (error) {
      this.isConnected = false;
      console.warn('⚠️ Cannot connect to Ollama service:', error.message);
    }
  }

  // Generate AI response for reptile care questions
  async generateResponse(question, speciesData = null) {
    const prompt = this.buildPrompt(question, speciesData);

    try {
      if (this.provider === 'ollama') {
        if (!this.isConnected) return this.getFallbackResponse(question, speciesData);

        const response = await fetch(`${this.baseUrl}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: this.model,
            prompt,
            stream: false,
            options: { temperature: 0.7, top_p: 0.9, max_tokens: 300 }
          })
        });
        if (!response.ok) throw new Error(`Ollama error: ${response.status}`);
        const data = await response.json();
        return this.formatAIResponse(data.response);
      }

      if (this.provider === 'openai') {
        if (!this.openaiApiKey) return this.getFallbackResponse(question, speciesData);

        const resp = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.openaiApiKey}`
          },
          body: JSON.stringify({
            model: this.openaiModel,
            messages: [
              { role: 'system', content: 'You are a helpful reptile expert that follows strict safety rules.' },
              { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 300
          })
        });
        if (!resp.ok) throw new Error(`OpenAI error: ${resp.status}`);
        const json = await resp.json();
        const content = json.choices?.[0]?.message?.content || '';
        return this.formatAIResponse(content);
      }

      // Unknown provider → fallback
      return this.getFallbackResponse(question, speciesData);
    } catch (error) {
      console.error('AI service error:', error);
      return this.getFallbackResponse(question, speciesData);
    }
  }

  // Build intelligent prompt for the AI
  buildPrompt(question, speciesData) {
    let basePrompt = `You are a helpful reptile expert at Petco. Give concise, safe, and clear advice about reptile care. 
    
IMPORTANT SAFETY RULES:
- NEVER recommend feeding live prey to snakes
- NEVER suggest unsafe temperatures or humidity levels
- NEVER recommend dangerous substrates or tank setups
- Always prioritize animal safety and welfare
- If unsure, recommend consulting a veterinarian

Question: ${question}`;

    if (speciesData) {
      basePrompt += `

SPECIFIC SPECIES INFORMATION:
Name: ${speciesData.name}
Type: ${speciesData.type}
Habitat: ${JSON.stringify(speciesData.habitat)}
Diet: ${JSON.stringify(speciesData.diet)}
Care Tips: ${speciesData.careTips.join(', ')}
Warnings: ${speciesData.warnings.join(', ')}

Please provide advice specific to ${speciesData.name} based on the information above.`;
    }

    basePrompt += `

Please provide a helpful, accurate response in 2-3 sentences. Include one fun fact if relevant.`;

    return basePrompt;
  }

  // Format AI response for display
  formatAIResponse(response) {
    // Clean up the response
    let cleaned = response.trim();
    
    // Extract fun fact if present
    let funFact = null;
    if (cleaned.includes('Fun fact:') || cleaned.includes('Did you know:')) {
      const parts = cleaned.split(/Fun fact:|Did you know:/);
      if (parts.length > 1) {
        cleaned = parts[0].trim();
        funFact = parts[1].trim();
      }
    }

    return {
      answer: cleaned,
      funFact: funFact,
      source: 'AI Expert'
    };
  }

  // Fallback response when AI is not available
  getFallbackResponse(question, speciesData) {
    const fallbackResponses = {
      'feeding': 'For feeding questions, please refer to the care information above and consult with a Petco associate for specific guidance.',
      'temperature': 'Temperature requirements are listed in the habitat section above. Always use proper thermometers and heating equipment.',
      'humidity': 'Humidity levels are crucial for reptile health. Check the habitat requirements above and use hygrometers to monitor levels.',
      'substrate': 'Substrate recommendations are listed above. Avoid loose substrates for young reptiles and always research before use.',
      'handling': 'Handle reptiles gently and support their body fully. Wash hands before and after handling.',
      'default': 'This is a great question! Please refer to the care information above and feel free to ask a Petco associate for additional guidance.'
    };

    // Try to match question to fallback response
    const questionLower = question.toLowerCase();
    let response = fallbackResponses.default;
    
    for (const [key, value] of Object.entries(fallbackResponses)) {
      if (questionLower.includes(key)) {
        response = value;
        break;
      }
    }

    return {
      answer: response,
      funFact: '💡 Pro Tip: Always research thoroughly before bringing a new reptile friend home!',
      source: 'Care Guide'
    };
  }

  // Change AI model (Ollama only)
  async changeModel(modelName) {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`);
      if (response.ok) {
        const models = await response.json();
        const availableModel = models.models?.find(m => m.name.includes(modelName));
        if (availableModel) {
          this.model = availableModel.name;
          console.log(`✅ Switched to AI model: ${this.model}`);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error changing model:', error);
      return false;
    }
  }

  // Get connection status
  getStatus() {
    return {
      connected: this.isConnected,
      model: this.model,
      endpoint: this.baseUrl,
      provider: this.provider
    };
  }
}

export default new AIService();
