---
title: Aethro AI
emoji: 🌤️
colorFrom: blue
colorTo: purple
sdk: docker
pinned: false
---

# Aethro AI 🌤️

> A full-stack AI chatbot with a beautiful animated sky interface, real-time streaming responses, and persistent memory.

🌐 **Live Demo:** [https://faizalrazza-aethro-ai.hf.space](https://faizalrazza-aethro-ai.hf.space)

---

## ✨ Features

- 💬 **Real-time streaming responses** — words appear as they're generated, just like ChatGPT
- 🧠 **Persistent conversation memory** — chat history saved across sessions using SQLite
- 🌤️ **Animated day/night sky UI** — realistic moving clouds by day, glowing stars and shooting stars by night
- 📝 **Markdown rendering** — bold text, bullet points, and formatted replies rendered properly
- ⚡ **Quick-action chips** — one-click prompts for news, movies, study help, and random facts
- 🔒 **Secure API key handling** — environment variables, never hardcoded
- 🐳 **Dockerized** — fully containerized for consistent deployment

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, CSS Animations |
| Backend | Python, Flask, Gunicorn |
| Database | SQLite |
| AI | OpenRouter API (GPT OSS 120B) |
| Deployment | Docker, Hugging Face Spaces |

---

## 📁 Project Structure

```
ai-chatbot/
├── app.py              # Flask backend + API routes
├── database.py         # SQLite database logic
├── requirements.txt    # Python dependencies
├── Dockerfile          # Container configuration
├── .env                # API keys (not committed)
└── frontend/
    ├── src/
    │   ├── App.jsx     # Main React component
    │   └── App.css     # Styling + animations
    └── vite.config.js  # Vite configuration
```

---

## 🚀 Local Setup

1. **Clone the repo**
```
git clone https://github.com/fgdhs788687/Aethro-AI-Chatbot-.git
cd Aethro-AI-Chatbot-
```

2. **Create a `.env` file** in the root folder
```
OPENROUTER_API_KEY=your_key_here
```

3. **Install Python dependencies**
```
pip install -r requirements.txt
```

4. **Install frontend dependencies**
```
cd frontend
npm install
```

5. **Run the backend**
```
python app.py
```

6. **Run the frontend** in a second terminal
```
cd frontend
npm run dev
```

7. **Open** `http://localhost:5173`

---

## 🔑 Getting an API Key

1. Go to [openrouter.ai](https://openrouter.ai)
2. Sign up and go to API Keys
3. Create a new key and paste it in your `.env` file

---

## 👤 Author

**Md Faizal Razza**
- GitHub: [@fgdhs788687](https://github.com/fgdhs788687)
- Live Demo: [faizalrazza-aethro-ai.hf.space](https://faizalrazza-aethro-ai.hf.space)
