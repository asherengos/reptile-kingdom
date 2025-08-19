# 🚀 Ollama Setup Guide for Reptile Info Tablet

This guide will help you set up Ollama to power the AI features of your Reptile Info Tablet.

## 📋 Prerequisites

- Windows 10/11 (or macOS/Linux)
- At least 8GB RAM (16GB recommended)
- 4GB free disk space for models

## 🎯 Quick Start

### 1. Install Ollama

1. Visit [ollama.ai](https://ollama.ai)
2. Download the Windows installer
3. Run the installer and follow the prompts
4. Restart your computer if prompted

### 2. Download a Model

Open Command Prompt or PowerShell and run:

```bash
# Download a lightweight model (recommended for tablets)
ollama pull llama2:7b

# Or download a more capable model (requires more RAM)
ollama pull llama2:13b

# For even better performance (requires 16GB+ RAM)
ollama pull llama2:70b
```

### 3. Start Ollama Service

```bash
# Start the Ollama service
ollama serve
```

Keep this terminal window open - Ollama needs to run in the background.

### 4. Test the Connection

In a new terminal, test if Ollama is working:

```bash
ollama list
```

You should see your downloaded models listed.

## 🔧 Configuration

### Default Settings

The app is configured to connect to Ollama at:
- **URL**: `http://localhost:11434`
- **Default Model**: `llama2`

### Change Model

To use a different model, modify the `aiService.js` file:

```javascript
this.model = 'llama2:13b'; // Change this line
```

### Available Models

| Model | Size | RAM Required | Quality | Speed |
|-------|------|--------------|---------|-------|
| `llama2:7b` | ~4GB | 8GB | Good | Fast |
| `llama2:13b` | ~8GB | 12GB | Better | Medium |
| `llama2:70b` | ~40GB | 16GB+ | Best | Slow |

## 🧪 Testing the AI

1. Start your React app: `npm start`
2. Open the app in your browser
3. Click on any reptile species
4. Click "🤖 Ask AI Expert"
5. Ask a question like "How often should I feed a leopard gecko?"

## 🚨 Troubleshooting

### "AI Not Connected" Error

1. **Check if Ollama is running:**
   ```bash
   ollama list
   ```

2. **Verify the service is accessible:**
   Open [http://localhost:11434](http://localhost:11434) in your browser
   You should see Ollama's API documentation

3. **Check firewall settings:**
   Windows Defender might block Ollama. Add an exception for the Ollama executable.

### Slow Responses

1. **Use a smaller model:**
   ```bash
   ollama pull llama2:7b
   ```

2. **Close other applications** to free up RAM

3. **Check your system resources** in Task Manager

### Model Not Found

1. **List available models:**
   ```bash
   ollama list
   ```

2. **Pull the model again:**
   ```bash
   ollama pull llama2:7b
   ```

3. **Check model name spelling** in `aiService.js`

## 🔒 Security Notes

- Ollama runs locally on your machine
- No data is sent to external servers
- All AI responses are generated locally
- Perfect for offline tablet use

## 📱 Tablet Optimization

For tablet deployment:

1. **Use lightweight models** (llama2:7b)
2. **Ensure adequate cooling** - AI models generate heat
3. **Monitor battery usage** - AI processing uses more power
4. **Test offline functionality** before deployment

## 🎉 Success!

Once everything is working, you'll see:
- ✅ "AI Connected" status in the app
- 🤖 AI responses to your questions
- 💡 Fun facts with each answer
- 🚀 Fast, local AI processing

Your Reptile Info Tablet is now powered by intelligent AI! 🦎✨
