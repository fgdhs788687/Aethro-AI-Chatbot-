import { useState, useRef, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import "./App.css"

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [isDay, setIsDay] = useState(true)
  const bottomRef = useRef(null)
  const messageListRef = useRef(null)

  useEffect(() => {
    const list = messageListRef.current
    if (!list) return
    const isNearBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 100
    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  async function sendMessage(text) {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage = { role: "user", content: messageText }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setLoading(true)

    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: messageText })
    })

    setLoading(false)
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let aiText = ""

    setMessages(prev => [...prev, { role: "assistant", content: "" }])

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split("\n")

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const parsed = JSON.parse(line.slice(6))
            aiText += parsed.token
            setMessages(prev => {
              const updated = [...prev]
              updated[updated.length - 1] = { role: "assistant", content: aiText }
              return updated
            })
          } catch { continue }
        }
      }
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") sendMessage()
  }

  const chips = [
    { label: "✦ Latest news", prompt: "What is the latest news today?" },
    { label: "🎬 Movies",     prompt: "Recommend me a good movie to watch tonight." },
    { label: "📚 Study help", prompt: "Give me some effective study tips." },
    { label: "💡 Random fact", prompt: "Tell me an interesting random fact." },
  ]

  return (
    <div className={`aethro-root ${isDay ? "day" : "night"}`}>

      {/* SKY ELEMENTS */}
      <div className="sun" />
      <div className="moon" />
      <div className="clouds">
        <div className="cloud c1">
          <svg width="220" height="70" viewBox="0 0 220 70">
            <defs>
              <linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#d6eaf8" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <ellipse cx="110" cy="52" rx="100" ry="22" fill="url(#cg1)" />
            <ellipse cx="75"  cy="40" rx="55"  ry="32" fill="url(#cg1)" />
            <ellipse cx="135" cy="36" rx="50"  ry="29" fill="url(#cg1)" />
            <ellipse cx="95"  cy="22" rx="36"  ry="26" fill="white" />
            <ellipse cx="130" cy="18" rx="28"  ry="22" fill="white" />
          </svg>
        </div>
        <div className="cloud c2">
          <svg width="170" height="55" viewBox="0 0 170 55">
            <defs>
              <linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#ddeef8" stopOpacity="0.88" />
              </linearGradient>
            </defs>
            <ellipse cx="85"  cy="42" rx="75"  ry="17" fill="url(#cg2)" />
            <ellipse cx="55"  cy="32" rx="42"  ry="25" fill="url(#cg2)" />
            <ellipse cx="108" cy="28" rx="40"  ry="23" fill="url(#cg2)" />
            <ellipse cx="78"  cy="16" rx="28"  ry="19" fill="white" />
          </svg>
        </div>
        <div className="cloud c3">
          <svg width="130" height="46" viewBox="0 0 130 46">
            <defs>
              <linearGradient id="cg3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e2f0f9" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <ellipse cx="65" cy="35" rx="58" ry="15" fill="url(#cg3)" />
            <ellipse cx="42" cy="26" rx="34" ry="21" fill="url(#cg3)" />
            <ellipse cx="84" cy="23" rx="30" ry="19" fill="url(#cg3)" />
            <ellipse cx="60" cy="13" rx="20" ry="15" fill="white" />
          </svg>
        </div>
        <div className="cloud c4">
          <svg width="260" height="78" viewBox="0 0 260 78">
            <defs>
              <linearGradient id="cg4" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#cce5f5" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <ellipse cx="130" cy="60" rx="120" ry="22" fill="url(#cg4)" />
            <ellipse cx="85"  cy="46" rx="65"  ry="34" fill="url(#cg4)" />
            <ellipse cx="165" cy="42" rx="60"  ry="30" fill="url(#cg4)" />
            <ellipse cx="110" cy="26" rx="44"  ry="28" fill="white" />
            <ellipse cx="152" cy="22" rx="36"  ry="24" fill="white" />
          </svg>
        </div>
      </div>

      {/* STARS (night only, rendered via CSS) */}
      <div className="stars">
        {!isDay && Array.from({ length: 120 }).map((_, i) => {
          const size = Math.random() * 2.8 + 0.6
          const colors = ['#ffffff','#e8f0ff','#b8d4ff','#ffd6a0','#c8b8ff','#a0d4ff','#f0e0ff']
          const col = colors[Math.floor(Math.random() * colors.length)]
          return (
            <div key={i} className="star" style={{
              width: size, height: size,
              top: `${Math.random() * 88}%`,
              left: `${Math.random() * 100}%`,
              background: col,
              boxShadow: `0 0 ${size * 2.5}px ${size}px ${col}`,
              '--dur': `${1.8 + Math.random() * 3.5}s`,
              '--delay': `-${Math.random() * 4}s`,
            }} />
          )
        })}
        {!isDay && Array.from({ length: 6 }).map((_, i) => {
          const grads = [['#ffffff','#a0c8ff'],['#ffd080','#ffaa30'],['#d0b0ff','#8060e0'],['#a0e8ff','#40b0e0']]
          const g = grads[Math.floor(Math.random() * grads.length)]
          const len = 90 + Math.random() * 80
          return (
            <div key={`s${i}`} className="shoot" style={{
              width: len,
              top: `${5 + Math.random() * 45}%`,
              left: `${Math.random() * 55}%`,
              background: `linear-gradient(90deg, ${g[0]}, ${g[1]}, transparent)`,
              '--sdur': `${4 + Math.random() * 5}s`,
              '--sdelay': `-${Math.random() * 8}s`,
            }} />
          )
        })}
      </div>

      <div className="horizon" />

      {/* MODE TOGGLE */}
      <button className="mode-toggle" onClick={() => setIsDay(prev => !prev)}>
        {isDay ? "🌙 Night mode" : "☀️ Day mode"}
      </button>

      {/* CHAT PANEL */}
      <div className="chat-panel">
        <div className="aethro-header">
          <div className="aethro-logo">✦</div>
          <div>
            <div className="aethro-title">Aethro AI</div>
            <div className="aethro-sub">Your intelligent assistant</div>
          </div>
          <div className="online-dot" />
        </div>

        <div className="message-list" ref={messageListRef}>
          <div className="aethro-msg">
            <div className="avatar ai">A</div>
            <div className="bubble ai">
              Hey! I'm Aethro ✦ Ask me about news, education, movies, or anything on your mind!
            </div>
          </div>

          {messages.map((msg, i) => (
            <div key={i} className={`aethro-msg ${msg.role === "user" ? "user" : ""}`}>
              <div className={`avatar ${msg.role === "user" ? "usr" : "ai"}`}>
                {msg.role === "user" ? "M" : "A"}
              </div>
              <div className={`bubble ${msg.role === "user" ? "usr" : "ai"}`}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}

          {loading && (
            <div className="aethro-msg">
              <div className="avatar ai">A</div>
              <div className="bubble ai thinking">
                <span className="dot-pulse">
                  <span /><span /><span />
                </span>
                &nbsp; Aethro is thinking...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="chips">
          {chips.map((chip, i) => (
            <button key={i} className="chip" onClick={() => sendMessage(chip.prompt)}>
              {chip.label}
            </button>
          ))}
        </div>

        <div className="input-area">
          <input
            className="chat-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Aethro anything..."
          />
          <button className="send-btn" onClick={() => sendMessage()}>➤</button>
        </div>
      </div>
    </div>
  )
}

export default App