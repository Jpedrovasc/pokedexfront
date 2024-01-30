import { useState } from 'react'
import './App.css'
import { PokedexList } from './pages/pokedexList'

function App() {
  const [count, setCount] = useState(0)

  return (
   <PokedexList></PokedexList>
  )
}

export default App
