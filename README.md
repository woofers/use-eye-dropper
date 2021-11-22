
# useEyeDropper

Browser color picker hook for React.

Implements the [EyeDropper API](https://github.com/WICG/eyedropper-api) (currently only available in Chrome)
into easy-to-use React hook.

## Features

- Supports Server-Side rendering
- Safely detect and fallback on unsupported browsers using `isSupported` method.
- Closes eye dropper when corresponding component is unmounted.
- Provides explicit `close` method to cancel eye dropper (signals can still be used).
