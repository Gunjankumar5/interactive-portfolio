import { useState, useMemo, useRef, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const personaContext = `
Name: Gunjan Kumar
Summary: Final Year B.Tech CSE AI&ML student with strong knowledge of HTML, CSS, JavaScript, React.js, Firebase. Built responsive, realtime web applications and clean, scalable frontends.
Projects: Devine (backend for pooja kits & temple services, auth/orders/products, AI astrology), Empower (women safety app backend, NFC SOS, realtime location, Firebase, Google Maps, Apr 2025-Present).
Education: B.Tech CSE (AI&ML) Sharda University (Sept 2022 - Present); Intermediate CBSE Gyan Sagar Public School New Delhi 80% (Apr 2021 - Mar 2022); Matriculation CBSE Gyan Sagar Public School New Delhi 76% (Apr 2019 - Mar 2020).
Skills: Soft — Communication & Presentation; Client Engagement & Negotiation; Teamwork & Decision Making; Market Research. Technical — Python, SQL, Java, C, C++, React.js, HTML, CSS, JavaScript. Tools — MS Office, Git, Firebase.
`

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(true)
  const [messages, setMessages] = useState([
    { sender: 'assistant', text: 'Hi! I am Gunjan\'s AI persona. Ask me about projects, skills, or education.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)

  const chatHistory = useMemo(() => messages.map((m) => ({ sender: m.sender, text: m.text })), [messages])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isOpen])

  const handleSend = async (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const nextMessages = [...messages, { sender: 'user', text: trimmed }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history: chatHistory }),
      })

      if (!res.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await res.json()
      const reply = data.reply || 'Sorry, I could not generate a response right now.'
      setMessages([...nextMessages, { sender: 'assistant', text: reply }])
    } catch (err) {
      console.error(err)
      setMessages([
        ...nextMessages,
        {
          sender: 'assistant',
          text: 'I had trouble responding. Please try again. If it persists, the backend may be down.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
      <button className="chat-toggle" onClick={() => setIsOpen((prev) => !prev)} aria-label="Toggle chat">
        {isOpen ? '×' : 'AI Chat'}
      </button>

      {isOpen && (
        <div className="chat-panel">
          <div className="chat-header">
            <div>
              <p className="chat-title">AI Persona</p>
              <p className="chat-subtitle">Answers about Gunjan\'s portfolio</p>
            </div>
            <span className="chat-status">{loading ? 'Typing…' : 'Online'}</span>
          </div>

          <div className="chat-messages" ref={scrollRef}>
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-bubble ${m.sender}`}>
                <p>{m.text}</p>
              </div>
            ))}
          </div>

          <form className="chat-input" onSubmit={handleSend}>
            <textarea
              rows="2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills, education..."
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>

          <div className="chat-hint">
            <p>Try: "Tell me about Devine" or "What are your skills?"</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatWidget
