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
Name: Gunjan Kumar | Final-year B.Tech CSE (AI & ML)
Contact: ss222802@gmail.com | +91 8178840076 | GitHub github.com/Gunjankumar5 | LinkedIn linkedin.com/in/gunjan-kumar-8ab741392

Summary: Frontend & backend developer; ships responsive React frontends and Node/Express APIs; practical Firebase and MongoDB; focuses on clean, scalable code.

Projects:
- Empower (Apr 2025–Present): Women safety Android backend; REST auth; NFC-triggered SOS; realtime location; Firebase + Google Maps; rapid alert flow.
- Devine (Jul–Nov 2024): E-commerce for pooja kits & temple services; auth/orders/products APIs; AI astrology enhancer.
- Interactive AI Portfolio (2025): React + Vite UI; Gemini-powered chatbot; Express backend; deployed on Vercel + Render.

Internship:
- Information Security Intern, eSec Forte (Jun–Aug 2024): Worked on security fundamentals and team delivery.

Education:
- B.Tech CSE (AI & ML), Sharda University (Sept 2022–Present).
- Intermediate CBSE, Gyan Sagar Public School, New Delhi, 80% (Apr 2021–Mar 2022).
- Matriculation CBSE, Gyan Sagar Public School, New Delhi, 76% (Apr 2019–Mar 2020).

Technical Skills: Python, SQL, Java, C, C++, JavaScript, HTML, CSS, React.js, Node.js, Express.js, MongoDB, Firebase, MySQL, REST APIs, Google Maps API, Gemini AI, Git, Postman, VS Code, MS Office.
Soft Skills: Communication & presentation; client engagement; teamwork; decision making; market research; problem solving.
Certifications: Oracle Java Fundamentals & PL/SQL; MERN bootcamp (EZ Training); NPTEL: Patent Creation; NPTEL: Project Management.
Achievements: Design team member (E-Cell Sharda); participant Technovation Hackathon (Sharda).
`

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body || {}
    const userMessage = (message || '').trim()

    if (!userMessage) {
      return res.status(400).json({ error: 'Message is required.' })
    }

    if (!model) {
      console.error('[ERROR] Missing GEMINI_API_KEY; cannot generate response')
      return res.status(503).json({ error: 'Backend is missing GEMINI_API_KEY; please configure and redeploy.' })
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
