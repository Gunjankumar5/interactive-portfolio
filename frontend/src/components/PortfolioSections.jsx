import { useState } from 'react'
import '../styles/PortfolioSections.css'

function PortfolioSections() {
  const [activeSection, setActiveSection] = useState(null)

  const sections = {
    skills: {
      title: '💼 Key Skills',
      content: {
        soft: ['Communication & Presentation', 'Client Engagement & Negotiation', 'Teamwork & Decision Making', 'Market Research'],
        technical: ['Python', 'SQL', 'Java', 'C', 'C++', 'React.js', 'HTML', 'CSS', 'JavaScript', 'Firebase']
      }
    },
    education: {
      title: '🎓 Education',
      content: [
        { degree: 'B.Tech CSE (AI & ML)', institution: 'Sharda University', period: 'Sept 2022 - Present' },
        { degree: 'Intermediate (CBSE)', institution: 'Gyan Sagar Public School, New Delhi', percentage: '80%', period: 'Apr 2021 - Mar 2022' },
        { degree: 'Matriculation (CBSE)', institution: 'Gyan Sagar Public School, New Delhi', percentage: '76%', period: 'Apr 2019 - Mar 2020' }
      ]
    },
    projects: {
      title: '🚀 Projects',
      content: [
        {
          name: 'Devine',
          description: 'Backend for pooja kits & temple services',
          features: ['Authentication System', 'Order Management', 'Product Catalog', 'AI Astrology Integration']
        },
        {
          name: 'Empower',
          description: 'Women safety app with advanced features',
          features: ['NFC SOS Emergency Button', 'Realtime Location Tracking', 'Firebase Integration', 'Google Maps Integration'],
          period: 'Apr 2025 - Present'
        }
      ]
    },
    certifications: {
      title: '🏆 Certifications',
      content: [
        { name: 'React.js Fundamentals', issuer: 'Industry Standard Course', date: '2024' },
        { name: 'Firebase Database Design', issuer: 'Professional Development', date: '2024' },
        { name: 'Web Development Bootcamp', issuer: 'Full Stack Training', date: '2023' }
      ]
    },
    achievements: {
      title: '⭐ Extra & Co-Curricular Achievements',
      content: [
        { title: 'Hackathon Winner', description: 'Won First Prize in College Web Development Hackathon', year: '2024' },
        { title: 'Technical Lead', description: 'Led frontend development team for university tech fest', year: '2024' },
        { title: 'Community Contributor', description: 'Active contributor to open-source projects', year: '2023-Present' },
        { title: 'University Scholar', description: 'Maintained excellent academic records throughout university', year: '2022-Present' }
      ]
    },
    internship: {
      title: '💼 Internship',
      content: [
        {
          role: 'Information Security Intern',
          company: 'eSec Forte Technologies Pvt. Ltd.',
          period: 'June 2024 – August 2024',
          responsibilities: [
            'Worked on information security fundamentals and cybersecurity practices',
            'Actively contributed as a proactive and disciplined team member'
          ]
        }
      ]
    }
  }

  const renderContent = (section) => {
    if (!section) return null

    if (section.title.includes('Skills')) {
      return (
        <div className="section-content">
          <div className="skill-category">
            <h3>Soft Skills</h3>
            <ul>
              {section.content.soft.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="skill-category">
            <h3>Technical Skills</h3>
            <ul>
              {section.content.technical.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      )
    }

    if (section.title.includes('Education')) {
      return (
        <div className="section-content">
          {section.content.map((edu, idx) => (
            <div key={idx} className="education-item">
              <h3>{edu.degree}</h3>
              <p><strong>Institution:</strong> {edu.institution}</p>
              {edu.percentage && <p><strong>Percentage:</strong> {edu.percentage}</p>}
              <p><strong>Period:</strong> {edu.period}</p>
            </div>
          ))}
        </div>
      )
    }

    if (section.title.includes('Projects')) {
      return (
        <div className="section-content">
          {section.content.map((project, idx) => (
            <div key={idx} className="project-item">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="features">
                <strong>Key Features:</strong>
                <ul>
                  {project.features.map((feature, fidx) => (
                    <li key={fidx}>{feature}</li>
                  ))}
                </ul>
              </div>
              {project.period && <p><strong>Period:</strong> {project.period}</p>}
            </div>
          ))}
        </div>
      )
    }

    if (section.title.includes('Certifications')) {
      return (
        <div className="section-content">
          {section.content.map((cert, idx) => (
            <div key={idx} className="cert-item">
              <h3>{cert.name}</h3>
              <p><strong>Issuer:</strong> {cert.issuer}</p>
              <p><strong>Date:</strong> {cert.date}</p>
            </div>
          ))}
        </div>
      )
    }

    if (section.title.includes('Achievements')) {
      return (
        <div className="section-content">
          {section.content.map((achievement, idx) => (
            <div key={idx} className="achievement-item">
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
              <p className="year">{achievement.year}</p>
            </div>
          ))}
        </div>
      )
    }

    if (section.title.includes('Internship')) {
      return (
        <div className="section-content">
          {section.content.map((internship, idx) => (
            <div key={idx} className="internship-item">
              <h3>{internship.role}</h3>
              <p><strong>Company:</strong> {internship.company}</p>
              <p><strong>Period:</strong> {internship.period}</p>
              <div className="responsibilities">
                <strong>Responsibilities:</strong>
                <ul>
                  {internship.responsibilities.map((resp, ridx) => (
                    <li key={ridx}>{resp}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )
    }
  }

  return (
    <section className="portfolio-sections">
      <h2>My Portfolio</h2>
      <div className="buttons-container">
        {Object.entries(sections).map(([key, section]) => (
          <button
            key={key}
            className={`section-btn ${activeSection === key ? 'active' : ''}`}
            onClick={() => setActiveSection(activeSection === key ? null : key)}
          >
            {section.title}
          </button>
        ))}
      </div>

      {activeSection && (
        <div className="active-section">
          <h2>{sections[activeSection].title}</h2>
          {renderContent(sections[activeSection])}
        </div>
      )}
    </section>
  )
}

export default PortfolioSections
