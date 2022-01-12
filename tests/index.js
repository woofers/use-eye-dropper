import { jest } from '@jest/globals'
import React, { useState } from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import useEyeDropper from '../src/index'

describe('EyeDropper Mock', () => {
  it('open() resolves color', async () => {
    const { EyeDropper } = window
    const dropper = new EyeDropper()
    const color = await dropper.open()
    expect(color.sRGBHex).toEqual('rgba(255, 255, 255, 0)')
  })
})

describe('useEyeDropper', () => {
  it('open() resolves color', async () => {
    const Button = () => {
      const [color, setColor] = useState('None')
      const { open } = useEyeDropper()
      return <button onClick={() => open().then(result => setColor(result.sRGBHex))}>{color}</button>
    }
    render(<Button />)
    const button = screen.getByText('None')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    await waitFor(() => expect(screen.getByText('rgba(255, 255, 255, 0)')).toBeInTheDocument())
  })
  it('open() does not resolve when called with an aborted signal', async () => {
    const Button = () => {
      const [color, setColor] = useState('None')
      const { open } = useEyeDropper()
      const onClick = () => {
        const openPicker = async () => {
          const controller = new AbortController()
          controller.abort()
          const { signal } = controller
          let result
          try {
            result = await open({ signal })
          }
          catch (e) {
            setColor(e.message)
            return
          }
          setColor(result.sRGBHex)
        }
        openPicker()
      }
      return <button onClick={onClick}>{color}</button>
    }
    render(<Button />)
    fireEvent.click(screen.getByText('None'))
    await waitFor(() => expect(screen.getByText("Failed to execute 'open' on 'EyeDropper': Color selection aborted.")).toBeInTheDocument())
  })
  it('open() does not resolve when called with an aborted signal while open', async () => {
    const Button = () => {
      const [color, setColor] = useState('None')
      const { open } = useEyeDropper()
      const onClick = () => {
        const openPicker = async () => {
          const controller = new AbortController()
          const { signal } = controller
          open({ signal }).then(result => setColor(result.sRGBHex)).catch(e => setColor(e.message))
          controller.abort()
        }
        openPicker()
      }
      return <button onClick={onClick}>{color}</button>
    }
    render(<Button />)
    fireEvent.click(screen.getByText('None'))
    await waitFor(() => expect(screen.getByText("Color selection aborted.")).toBeInTheDocument(), { timeout: 4000 })
  })
})
