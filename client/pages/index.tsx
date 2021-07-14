import { h } from '../deps.ts'
import { Transposer } from '../components/Transposer.tsx'

export default function App() {
  return (
  <div style="text-align: center; margin-top: 60px; font-family: 'Arial'">
    <h1>Harmonica toolkit</h1>
    <Transposer />
  </div>
  )
}
