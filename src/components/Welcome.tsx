import { useState } from 'react'

interface WelcomeProps {
  appName?: string
  onGetStarted?: (name: string) => void
}

export function Welcome({
  appName = 'My Socials',
  onGetStarted,
}: WelcomeProps) {
  const [name, setName] = useState('')
  const trimmed = name.trim()
  const greeting = trimmed ? `Hello, ${trimmed}!` : 'Hello there!'

  return (
    <section aria-labelledby="welcome-heading" className="welcome">
      <h1 id="welcome-heading">Welcome to {appName}</h1>
      <p>{greeting}</p>
      <label>
        What should we call you?
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
        />
      </label>
      <button
        type="button"
        onClick={() => onGetStarted?.(trimmed)}
        disabled={!trimmed}
      >
        Get started
      </button>
    </section>
  )
}
