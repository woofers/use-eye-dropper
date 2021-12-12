
# useEyeDropper

Browser color picker hook for React.

Implements the [EyeDropper API](https://github.com/WICG/eyedropper-api) (currently only available in Chrome)
into easy-to-use React hook.

## Features

- Supports Server-Side rendering
- Safely detect and fallback on unsupported browsers using `isSupported` method.
- Closes eye dropper when corresponding component is unmounted.
- Provides explicit `close` method to cancel eye dropper (signals can still be used).


# Installation

**Yarn**

    yarn add use-eye-dropper

**npm**

    npm install use-eye-dropper

# Usage

```jsx
import React, { useState } from 'react'
import useEyeDropper from 'use-eye-dropper'

const App = () => {
  const { open, close, isSupported } = useEyeDropper()
  const [color, setColor] = useState('#fff')
  // useEyeDropper will cancel/cleanup the open() promise on unmount,
  // so setState never fires when the component is unmounted.
  const pickColor = () =>
    open().then(color => setColor(color.sRGBHex).catch(() => setColor('#fff'))
  return (
    <>
      <div style={{ padding: '64px', color }}>Selected color</div>
      {isSupported() ?
          <button onClick={pickColor}>Pick color</button>
        : <span>EyeDropper API not supported in this browser</span>
      }
    </>
  )
}
```
