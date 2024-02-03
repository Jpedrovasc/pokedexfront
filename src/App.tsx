import "./App.css";
import { PokedexList } from "./pages/pokedexList";
import { PokemonExibir } from "./pages/pokemonExibir";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Pokedex" element={<PokedexList />} />
        <Route path="/Pokemon/:id" element={<PokemonExibir />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
