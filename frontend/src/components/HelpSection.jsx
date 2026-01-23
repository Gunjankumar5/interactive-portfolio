import { useState } from 'react'
import '../styles/HelpSection.css'

function HelpSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)
    
    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
      const response = await fetch(`${API_BASE}/api/help`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        alert('Failed to submit. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error submitting form. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="help-section">
      <div className="help-container">
        <div className="help-header">
          <h2>❓ Have Questions?</h2>
          <p>Reach out to me with any questions, suggestions, or collaboration opportunities</p>
        </div>

        <div className="help-content">
          <div className="faq-column">
            <h3>Frequently Asked Questions</h3>
            <div className="faq-list">
              <div className="faq-item">
                <h4>What technologies do you specialize in?</h4>
                <p>I specialize in React.js, JavaScript, HTML/CSS for frontend, and Firebase for backend solutions.</p>
              </div>
              <div className="faq-item">
                <h4>Are you available for freelance projects?</h4>
                <p>Yes! I'm open to freelance opportunities. Feel free to reach out with your project details.</p>
              </div>
              <div className="faq-item">
                <h4>How can I connect with you?</h4>
                <p>You can use the contact form on this page or reach out via email and social media links below.</p>
              </div>
              <div className="faq-item">
                <h4>What's your experience level?</h4>
                <p>I'm a final year B.Tech student with hands-on experience in building full-stack applications.</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send me a Message</h3>
            
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>

            {submitted && (
              <div className="success-message">
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}
          </form>
        </div>

        <div className="contact-info">
          <h3>Connect with Me</h3>
          <div className="contact-links">
            <a href="mailto:ss222802@gmail.com" className="contact-link">
              📧 Email
            </a>
            <a href="https://www.linkedin.com/in/gunjan-kumar-8ab741392" target="_blank" rel="noopener noreferrer" className="contact-link">
              💼 LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">
              🐙 GitHub
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="contact-link">
              𝕏 Twitter
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HelpSection
