import { useState } from 'react'
import profilePic from './profilePic/profile.jpeg'
import ChatWidget from './components/ChatWidget'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header className="header">
        <img src={profilePic} alt="Profile" className="profile-image" />
        <h1>Gunjan Kumar</h1>
        <p className="subtitle">Full Stack Developer | Creative Problem Solver</p>
      </header>

      <section className="about">
        <h2>About Me</h2>
        <p>Final Year B.Tech CSE AI&ML student with strong knowledge of HTML, CSS, and JavaScript, along with practical experience in React.js and Firebase projects. Built responsive, realtime web applications and implemented clean, scalable frontends. Eager to apply frontend development skills to build user-friendly, cross-browser compatible applications in a professional environment.</p>
      </section>

      <div className="card interactive">
        <button onClick={() => setCount((count) => count + 1)} className="btn">
          Click Count: {count}
        </button>
        <p>
          Click the button to test interactivity
        </p>
      </div>

      <footer className="footer">
        <p>Let's connect and build something amazing together!</p>
      </footer>

      <ChatWidget />
    </>
  )
}

export default App
