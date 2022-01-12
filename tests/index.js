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
})
