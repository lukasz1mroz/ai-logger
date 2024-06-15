import {createRoot} from 'react-dom/client'
import App from './App'

const container = document.getElementById('root')
if (!container) {
  throw Error('HTML element #root must exist for this app to work.')
}
createRoot(container).render(<App />)