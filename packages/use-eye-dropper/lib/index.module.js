import { default as DropperDev } from './use-eye-dropper.module.dev.js'
import { default as Dropper } from './use-eye-dropper.module.js'

export default process.env.NODE_ENV === 'production' ? Dropper : DropperDev
