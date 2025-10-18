import { useState, useEffect } from 'react'
import './counter.css'

const Counter = () => {
  const [count, setCount] = useState(0)
  const [history, setHistory] = useState([])
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (history.length > 4) {
      setHistory(prev => prev.slice(-4))
    }
  }, [history])

  const createParticles = (type) => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      type,
    }))
    setParticles(prev => [...prev, ...newParticles])
    
    // Remove particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.includes(p)))
    }, 1200)
  }

  const increment = () => {
    const newCount = count + 1
    setCount(newCount)
    setHistory(prev => [...prev, { type: 'increment', from: count, to: newCount }])
    createParticles('increment')
  }

  const decrement = () => {
    const newCount = count - 1
    setCount(newCount)
    setHistory(prev => [...prev, { type: 'decrement', from: count, to: newCount }])
    createParticles('decrement')
  }

  const reset = () => {
    if (count !== 0) {
      setHistory(prev => [...prev, { type: 'reset', from: count, to: 0 }])
    }
    setCount(0)
    createParticles('reset')
  }

  const quickIncrement = () => {
    const newCount = count + 5
    setCount(newCount)
    setHistory(prev => [...prev, { type: 'quick-increment', from: count, to: newCount }])
    createParticles('quick-increment')
  }

  const quickDecrement = () => {
    const newCount = count - 5
    setCount(newCount)
    setHistory(prev => [...prev, { type: 'quick-decrement', from: count, to: newCount }])
    createParticles('quick-decrement')
  }

  const getCounterColor = () => {
    if (count > 0) return 'positive'
    if (count < 0) return 'negative'
    return 'zero'
  }

  const getCounterMood = () => {
    if (count > 20) return '🚀'
    if (count > 15) return '😎'
    if (count > 10) return '🌟'
    if (count > 5) return '😊'
    if (count > 0) return '🙂'
    if (count === 0) return '⚡'
    if (count > -5) return '😐'
    if (count > -10) return '😕'
    if (count > -15) return '😟'
    return '🌪️'
  }

  const getCounterTitle = () => {
    const absCount = Math.abs(count)
    if (absCount === 0) return 'Ready to Count!'
    if (absCount === 69) return 'Nice! 😏'
    if (absCount === 100) return 'Century! 🎯'
    if (count > 50) return 'Rockstar! 🤘'
    if (count < -50) return 'Rebel! 🎸'
    if (count > 0) return 'Going Up! 📈'
    if (count < 0) return 'Going Down! 📉'
    return 'Quantum Counter'
  }

  return (
    <div className="counter-container">
      <div className="counter-card">
        {/* Particle Effects */}
        <div className="particles-container">
          {particles.map(particle => (
            <div
              key={particle.id}
              className={`particle particle-${particle.type}`}
            />
          ))}
        </div>

        {/* Counter Display */}
        <div className="counter-display">
          <div className="counter-title">
            {getCounterTitle()}
          </div>

          <div className="counter-value-wrapper">
            <span className={`counter-value ${getCounterColor()}`}>
              {count}
            </span>
            
            <span className="counter-mood">
              {getCounterMood()}
            </span>
          </div>

          <div className="counter-status">
            <span className={getCounterColor()}>
              {count > 0 ? 'Positive' : count < 0 ? 'Negative' : 'Zero'}
            </span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="counter-controls">
          {/* Quick Actions */}
          <div className="control-group quick-actions">
            <button 
              className="btn btn-quick btn-quick-decrement"
              onClick={quickDecrement}
            >
              <span>-5</span>
            </button>

            <button 
              className="btn btn-danger btn-reset"
              onClick={reset}
            >
              <span>RESET</span>
            </button>

            <button 
              className="btn btn-quick btn-quick-increment"
              onClick={quickIncrement}
            >
              <span>+5</span>
            </button>
          </div>

          {/* Main Actions */}
          <div className="control-group main-actions">
            <button 
              className="btn btn-secondary btn-large"
              onClick={decrement}
            >
              <span>DECREASE</span>
            </button>

            <button 
              className="btn btn-primary btn-large"
              onClick={increment}
            >
              <span>INCREASE</span>
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="counter-stats">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Squared</span>
              <span className="stat-value">
                {count * count}
              </span>
            </div>
            
            <div className="stat-card">
              <span className="stat-label">Even/Odd</span>
              <span className={`stat-value ${count % 2 === 0 ? 'positive' : 'negative'}`}>
                {count % 2 === 0 ? 'Even' : 'Odd'}
              </span>
            </div>
            
            <div className="stat-card">
              <span className="stat-label">Absolute</span>
              <span className="stat-value">{Math.abs(count)}</span>
            </div>
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="history-section">
            <h4>Recent Actions</h4>
            <div className="history-list">
              {history.slice().reverse().map((item, index) => (
                <div
                  key={`${item.type}-${item.from}-${item.to}-${index}`}
                  className="history-item"
                >
                  <span className={`history-type history-${item.type}`}>
                    {item.type.includes('increment') ? '↑' : item.type.includes('decrement') ? '↓' : '↺'}
                  </span>
                  <span className="history-text">
                    {item.from} → {item.to}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Counter