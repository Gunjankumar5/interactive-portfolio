import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { GoogleGenerativeAI } from '@google/generative-ai'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000
const apiKey = process.env.GEMINI_API_KEY
const mongoUri = process.env.MONGODB_URI
const mongoDbName = process.env.MONGODB_DB || 'portfolio'
let mongoServer = null
let MongoMemoryServer = null

// Only import MongoMemoryServer in development
if (process.env.NODE_ENV !== 'production') {
  try {
    const module = await import('mongodb-memory-server')
    MongoMemoryServer = module.MongoMemoryServer
  } catch (err) {
    console.warn('[warn] mongodb-memory-server not available')
  }
}

if (!apiKey) {
  console.warn('[WARN] GEMINI_API_KEY is not set. Please add it to your .env file.')
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null
const model = genAI ? genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }) : null

// MongoDB models
const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, enum: ['user', 'assistant'], required: true },
    text: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema)

async function connectMongo() {
  try {
    let uri = mongoUri
    
    // Use in-memory MongoDB if no external URI configured (only in development)
    if (!uri && MongoMemoryServer && process.env.NODE_ENV !== 'production') {
      console.log('[mongo] starting in-memory MongoDB...')
      mongoServer = await MongoMemoryServer.create()
      uri = mongoServer.getUri()
      console.log('[mongo] in-memory MongoDB started')
    }
    
    if (uri) {
      await mongoose.connect(uri, { dbName: mongoDbName })
      console.log('[mongo] connected')
    } else {
      console.log('[mongo] no database connection - chat history will not persist')
    }
  } catch (err) {
    console.error('[mongo] connection error - continuing without database', err.message)
  }
}

connectMongo()

const portfolioContext = `
Name: Gunjan Kumar
Summary: Final Year B.Tech CSE AI&ML student with strong knowledge of HTML, CSS, and JavaScript, with practical experience in React.js and Firebase. Built responsive, realtime web applications and implemented clean, scalable frontends. Eager to apply frontend development skills to build user-friendly, cross-browser compatible applications in a professional environment.
Projects:
- Devine: E-Commerce Platform for Pooja Kits & Temple Services. Backend for buying pooja kits and booking poojas at temples. Secure APIs for auth, orders, products. AI astrology predictions for enhanced UX.
- Empower: Women Safety App Using NFC Tag (April 2025 - Present). Backend for Android safety app. Secure REST APIs for auth, NFC-triggered SOS alerts, realtime location sharing. Integrated Firebase and Google Maps API for reliable storage, communication, and rapid emergency response.
Education:
- B.Tech CSE (AI & ML), Sharda University, Greater Noida (Sept 2022 - Present).
- Intermediate (CBSE), Gyan Sagar Public School, New Delhi, 80% (April 2021 - Mar 2022).
- Matriculation (CBSE), Gyan Sagar Public School, New Delhi, 76% (April 2019 - Mar 2020).
Skills:
- Soft Skills: Communication & Presentation; Client Engagement & Negotiation; Teamwork & Decision Making; Market Research.
- Technical Skills: Python, SQL, Java, C, C++, React.js, HTML, CSS, JavaScript.
- Tools: MS Office, Git, Firebase.
`

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body || {}
    const userMessage = (message || '').trim()

    if (!userMessage) {
      return res.status(400).json({ error: 'Message is required.' })
    }

    if (!model) {
      return res.status(500).json({ error: 'Server is not configured with GEMINI_API_KEY.' })
    }

    const recentHistory = Array.isArray(history) ? history.slice(-6) : []
    const historyText = recentHistory
      .map((m) => `${m.sender || 'user'}: ${m.text || ''}`)
      .join('\n')

    const prompt = `You are the AI persona for Gunjan Kumar's portfolio. Answer in ONE very short sentence (aim for ~12-15 words), friendly and factual. Use only the portfolio data. If unsure or asked unrelated things, politely say you're focused on the portfolio.

  Portfolio Data:\n${portfolioContext}\n
  Recent Conversation:\n${historyText}\n
  User: ${userMessage}\nAssistant:`

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 60,
      },
    })

    const reply = result?.response?.text()?.trim() || 'Sorry, I could not generate a response right now.'

    // Persist conversation snippets if DB is connected
    if (mongoose.connection.readyState === 1) {
      try {
        await Message.insertMany([
          { sender: 'user', text: userMessage },
          { sender: 'assistant', text: reply },
        ])
      } catch (dbErr) {
        console.warn('[mongo] failed to save messages', dbErr?.message)
      }
    }

    return res.json({ reply })
  } catch (err) {
    console.error('[ERROR] /api/chat', err)
    return res.status(500).json({ error: 'Something went wrong generating a reply.' })
  }
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`[server] running on http://localhost:${PORT}`)
})
