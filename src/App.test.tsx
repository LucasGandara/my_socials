import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the headline', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { level: 1, name: /get started/i }),
    ).toBeInTheDocument()
  })

  it('renders the React and Vite logos with accessible labels', () => {
    render(<App />)
    expect(screen.getByAltText(/react logo/i)).toBeInTheDocument()
    expect(screen.getByAltText(/vite logo/i)).toBeInTheDocument()
  })

  it('starts the counter at zero', () => {
    render(<App />)
    expect(
      screen.getByRole('button', { name: /count is 0/i }),
    ).toBeInTheDocument()
  })

  it('increments the counter when the button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const button = screen.getByRole('button', { name: /count is 0/i })
    await user.click(button)

    expect(
      screen.getByRole('button', { name: /count is 1/i }),
    ).toBeInTheDocument()
  })

  it('increments the counter on multiple clicks', async () => {
    const user = userEvent.setup()
    render(<App />)

    const button = screen.getByRole('button', { name: /count is/i })
    await user.click(button)
    await user.click(button)
    await user.click(button)

    expect(
      screen.getByRole('button', { name: /count is 3/i }),
    ).toBeInTheDocument()
  })

  it('renders external documentation and social links', () => {
    render(<App />)

    expect(
      screen.getByRole('link', { name: /explore vite/i }),
    ).toHaveAttribute('href', 'https://vite.dev/')
    expect(screen.getByRole('link', { name: /learn more/i })).toHaveAttribute(
      'href',
      'https://react.dev/',
    )
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/vitejs/vite',
    )
    expect(screen.getByRole('link', { name: /discord/i })).toHaveAttribute(
      'href',
      'https://chat.vite.dev/',
    )
  })

  it('opens external links in a new tab', () => {
    render(<App />)
    const externalLinks = screen.getAllByRole('link')
    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
    })
  })
})
