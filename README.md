# Interactive AI Portfolio

An interactive portfolio website powered by Google Gemini AI chatbot. Built with React.js frontend, Node.js Express backend, and MongoDB database.

## Features

- 🤖 **AI Chatbot**: Ask questions about projects, skills, and education powered by Google Generative AI (Gemini)
- 📱 **Responsive Design**: Fully responsive chat interface with beautiful UI
- 💾 **Database Integration**: MongoDB for storing chat history
- 🚀 **Real-time Updates**: Hot Module Replacement during development
- 🎨 **Modern Tech Stack**: React + Vite, Express.js, Mongoose ODM

## Tech Stack

### Frontend
- React.js 19
- Vite (build tool)
- CSS3 with gradients and animations
- Responsive design

### Backend
- Node.js with Express.js
- Google Generative AI (Gemini 1.5 Flash)
- Mongoose ODM for MongoDB
- CORS enabled for frontend communication
- MongoDB Memory Server for testing/development

### Database
- MongoDB (in-memory for development)
- Mongoose schemas for data validation

## Project Structure

```
interactive-portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ChatWidget.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Gunjankumar5/interactive-portfolio.git
cd interactive-portfolio
```

2. **Backend Setup**
```bash
cd backend
npm install
```

Create `.env` file:
```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
MONGODB_DB=portfolio
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
```

### Running the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

Visit `http://localhost:5173` in your browser!

## API Endpoints

### Chat Endpoint
- **POST** `/api/chat`
- **Body**: `{ message: string, history: Array }`
- **Response**: `{ reply: string }`

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google Gemini API key | `AIzaSy...` |
| `PORT` | Backend server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/portfolio` |
| `MONGODB_DB` | Database name | `portfolio` |

## Getting Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your key to `.env` file

## Features in Detail

### AI Chatbot
- Trained on portfolio context (projects, skills, education)
- Understands natural language questions
- Stores conversation history
- Real-time responses

### Chat Widget
- Fixed position on portfolio page
- Expandable/collapsible interface
- Message history display
- Loading states
- Error handling

## Built With

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Express.js](https://expressjs.com)
- [Google Generative AI](https://ai.google.dev)
- [Mongoose](https://mongoosejs.com)
- [MongoDB](https://www.mongodb.com)

## Author

**Gunjan Kumar**
- GitHub: [@Gunjankumar5](https://github.com/Gunjankumar5)
- B.Tech CSE (AI & ML), Sharda University
- Skills: React.js, Node.js, Python, Firebase, MongoDB

## License

This project is open source and available under the MIT License.

## Deployment

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set `VITE_API_BASE_URL=your_backend_url` in environment variables
4. Deploy

### Backend (Render/Railway)
1. Push code to GitHub
2. Create new service on Render/Railway
3. Connect GitHub repository
4. Set environment variables
5. Deploy

## Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ by Gunjan Kumar
