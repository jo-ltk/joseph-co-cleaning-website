import './framer-core/styles.css'
import { Component } from 'react'
// @ts-expect-error — FramerGroup from context.jsx
import { FramerGroup } from './framer-core/context.jsx'
import CountUp from './framer/CountUp'
import Primary from './framer/Primary'
import Testimonials from './framer/Testimonials'

class ErrorBoundary extends Component<{name: string, children: React.ReactNode}, {error: string | null}> {
  state = { error: null as string | null }
  static getDerivedStateFromError(e: Error) { return { error: e.message } }
  render() {
    if (this.state.error) return (
      <div style={{ padding: 16, margin: 8, border: '1px solid rgba(255,0,0,0.2)', borderRadius: 8, fontSize: 12, color: '#999' }}>
        <strong>{this.props.name}</strong>: {this.state.error}
      </div>
    )
    return this.props.children
  }
}

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, background: 'rgb(255, 255, 255)', minHeight: '100vh' }}>
      <FramerGroup>
      <ErrorBoundary name="CountUp">
        <CountUp.Responsive />
      </ErrorBoundary>
      <ErrorBoundary name="Primary">
        <Primary.Responsive
          buttonText="Get a free quote"
        />
      </ErrorBoundary>
      <ErrorBoundary name="Testimonials">
        <Testimonials.Responsive
          padding="160px 40px 160px 40px"
        />
      </ErrorBoundary>
      </FramerGroup>
    </div>
  )
}
