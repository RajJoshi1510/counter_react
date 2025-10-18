import { useState, useEffect } from 'react'
import './App.css'
import Counter from './counter'

function App() {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const newStars = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
    }))
    setStars(newStars)
  }, [])

  return (
    <div className="app">
      {/* Animated Background */}
      <div className="background">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
          />
        ))}
        
        {/* Floating Shapes */}
        <div className="floating-shape shape-1" />
        <div className="floating-shape shape-2" />
        <div className="floating-shape shape-3" />
      </div>

      {/* Main Content */}
      <div className="app-container">
        <header className="app-header">
          <h1>COUNTER</h1>
          <p>Experience for Counting</p>
        </header>

        <main className="app-main">
          <Counter />
        </main>

        <footer className="app-footer">
          <p>Using React</p>
        </footer>
      </div>
    </div>
  )
}

export default App