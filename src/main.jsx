import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import { initTracking } from './utils/tracking'
import './index.css'

export const createRoot = ViteReactSSG({ routes }, ({ isClient }) => {
  if (isClient) {
    initTracking()
    import('./utils/smoothScroll').then(({ initClient }) => initClient())
  }
})
