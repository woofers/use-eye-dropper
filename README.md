
# useEyeDropper

[![img](https://github.com/woofers/use-eye-dropper/workflows/build/badge.svg)](https://github.com/woofers/use-eye-dropper/actions) [![img](https://badge.fury.io/js/use-eye-dropper.svg)](https://www.npmjs.com/package/use-eye-dropper) [![img](https://img.shields.io/npm/dt/use-eye-dropper.svg)](https://www.npmjs.com/package/use-eye-dropper) [![img](https://badgen.net/bundlephobia/minzip/use-eye-dropper)](https://bundlephobia.com/result?p=use-eye-dropper) [![img](https://img.shields.io/npm/l/use-eye-dropper.svg)](https://github.com/woofers/use-eye-dropper/blob/main/LICENSE)

👀🩸🧫 Browser color picker hook for React.

Implements the [EyeDropper API](https://github.com/WICG/eyedropper-api)
into an easy-to-use React hook.  This API is currently only available in Chromium based browsers.

## Features

- Supports Server-Side rendering.
- Test coverage with unit and integration tests.
- Safely detect and fallback on unsupported browsers using `isSupported` method.
- Closes eye dropper when corresponding component is unmounted.
- Provides explicit `close` method to cancel eye dropper (signals can still be used).


## Installation

**Yarn**

```yarn
yarn add use-eye-dropper
```

**npm**

```npm
npm install use-eye-dropper
```

## Usage

```jsx
import React, { useState } from 'react'
import useEyeDropper from 'use-eye-dropper'

const App = () => {
  const { open, close, isSupported } = useEyeDropper()
  const [color, setColor] = useState('#fff')
  const [error, setError] = useState()
  // useEyeDropper will reject/cleanup the open() promise on unmount,
  // so setState never fires when the component is unmounted.
  const pickColor = () => {
    open()
      .then(color => setColor(color.sRGBHex))
      .catch(e => {
        console.log(e)
        // Ensures component is still mounted
        // before calling setState
        if (!e.canceled) setError(e)
      })
  }
  return (
    <>
      <div style={{ padding: '64px', background: color }}>Selected color</div>
      {isSupported() ?
          <button onClick={pickColor}>Pick color</button>
        : <span>EyeDropper API not supported in this browser</span>
      }
      {!!error && <span>{error.message}</span>}
    </>
  )
}
```

## Methods

- `open({ signal?: AbortSignal }) => Promise<{ sRGBHex: string }>'`

  Opens the EyeDropper API in supported browsers and returns a
  promise which will resolve with the selected color.  Alternatively the promise will be rejected if
  the user cancels the operation, for instance by hitting escape.
  Additionally if the browser does not support the API, the
  promise is rejected. While the spec currently indicates that a
  6-digit HEX value is returned, the current Chrome implementation
  returns a `rgba` value.

- `close() => void`

  This method closes the EyeDropper API selector if it is open and
  rejects the promise from `open`. Otherwise this
  performs a no-op.

- `isSupported() => boolean`

  Determines if the EyeDropper API is supported in the current browser.
