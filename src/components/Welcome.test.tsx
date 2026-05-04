import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Welcome } from './Welcome'

describe('Welcome', () => {
  it('renders the welcome heading with the default app name', () => {
    render(<Welcome />)
    expect(
      screen.getByRole('heading', { level: 1, name: /welcome to my socials/i }),
    ).toBeInTheDocument()
  })

  it('renders a custom app name when provided', () => {
    render(<Welcome appName="Acme" />)
    expect(
      screen.getByRole('heading', { level: 1, name: /welcome to acme/i }),
    ).toBeInTheDocument()
  })

  it('shows a generic greeting when no name is entered', () => {
    render(<Welcome />)
    expect(screen.getByText(/hello there!/i)).toBeInTheDocument()
  })

  it('updates the greeting as the user types', async () => {
    const user = userEvent.setup()
    render(<Welcome />)

    await user.type(
      screen.getByLabelText(/what should we call you\?/i),
      'Lucas',
    )

    expect(screen.getByText(/hello, lucas!/i)).toBeInTheDocument()
  })

  it('trims whitespace around the typed name', async () => {
    const user = userEvent.setup()
    render(<Welcome />)

    await user.type(
      screen.getByLabelText(/what should we call you\?/i),
      '   Ada   ',
    )

    expect(screen.getByText(/hello, ada!/i)).toBeInTheDocument()
  })

  it('disables the Get started button when the name is empty', () => {
    render(<Welcome />)
    expect(screen.getByRole('button', { name: /get started/i })).toBeDisabled()
  })

  it('enables the Get started button once a name is entered', async () => {
    const user = userEvent.setup()
    render(<Welcome />)

    await user.type(screen.getByLabelText(/what should we call you\?/i), 'Lin')

    expect(screen.getByRole('button', { name: /get started/i })).toBeEnabled()
  })

  it('keeps the button disabled if the input only contains whitespace', async () => {
    const user = userEvent.setup()
    render(<Welcome />)

    await user.type(screen.getByLabelText(/what should we call you\?/i), '   ')

    expect(screen.getByRole('button', { name: /get started/i })).toBeDisabled()
  })

  it('calls onGetStarted with the trimmed name when the button is clicked', async () => {
    const user = userEvent.setup()
    const onGetStarted = vi.fn()
    render(<Welcome onGetStarted={onGetStarted} />)

    await user.type(
      screen.getByLabelText(/what should we call you\?/i),
      '  Ada  ',
    )
    await user.click(screen.getByRole('button', { name: /get started/i }))

    expect(onGetStarted).toHaveBeenCalledTimes(1)
    expect(onGetStarted).toHaveBeenCalledWith('Ada')
  })

  it('does not throw when no onGetStarted handler is provided', async () => {
    const user = userEvent.setup()
    render(<Welcome />)

    await user.type(screen.getByLabelText(/what should we call you\?/i), 'Ada')

    expect(() =>
      screen.getByRole('button', { name: /get started/i }).click(),
    ).not.toThrow()
  })
})
