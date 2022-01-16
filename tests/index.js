import { jest } from '@jest/globals'
import React, { useState } from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { EyeDropper } from './mocks'
import useEyeDropper from '../src'

beforeEach(() => {
  global.window.EyeDropper = EyeDropper
})

afterEach(() => {
  delete global.window.EyeDropper
})

describe('EyeDropper Mock', () => {
  it('open() resolves color', async () => {
    const dropper = new EyeDropper()
    const color = await dropper.open()
    expect(color.sRGBHex).toEqual('rgba(255, 255, 255, 0)')
  })
})

describe('useEyeDropper', () => {
  describe('open()', () => {
    const Button = ({ onPick }) => {
      const [color, setColor] = useState('None')
      const { open } = useEyeDropper()
      const onClick = () => {
        const openPicker = async () => {
          const controller = new AbortController()
          const { signal } = controller
          let result
          try {
            result = await onPick(open, controller)
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
    it('open() resolves color', async () => {
      const onPick = open => open()
      render(<Button onPick={onPick} />)
      const button = screen.getByText('None')
      expect(button).toBeInTheDocument()
      fireEvent.click(button)
      await waitFor(() => expect(screen.getByText('rgba(255, 255, 255, 0)')).toBeInTheDocument())
    })
    it('open() does not resolve when called with an aborted signal', async () => {
      const onPick = (open, controller) => {
        controller.abort()
        return open({ signal: controller.signal })
      }
      render(<Button onPick={onPick} />)
      fireEvent.click(screen.getByText('None'))
      await waitFor(() => expect(screen.getByText("Failed to execute 'open' on 'EyeDropper': Color selection aborted.")).toBeInTheDocument())
    })
    it('open() does not resolve when called with an aborted signal while open', async () => {
      const onPick = (open, controller) =>
        new Promise((resolve, reject) => {
          open({ signal: controller.signal })
            .then(result => resolve(result))
            .catch(err => reject(err))
          controller.abort()
        })
      render(<Button onPick={onPick} />)
      fireEvent.click(screen.getByText('None'))
      await waitFor(() => expect(screen.getByText("Color selection aborted.")).toBeInTheDocument())
    })
  })
  describe('isSupported()', () => {
    const Hint = () => {
      const { isSupported } = useEyeDropper()
      return isSupported() ? 'EyeDropper API is supported' : 'EyeDropper API unavailable'
    }
    it('isSupported() is truthy when supported', async () => {
      render(<Hint />)
      expect(screen.getByText('EyeDropper API is supported'))
    })
    it('isSupported() is falsy when unsupported', async () => {
      delete window.EyeDropper
      render(<Hint />)
      expect(screen.getByText('EyeDropper API unavailable'))
    })
  })
})
