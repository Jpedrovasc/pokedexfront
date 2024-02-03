import NavBarSearch from "../components/Navbar/NavBarSeach";
import PokemonCard from "../components/PokemonCard/ModeloCard";
import { ListPokemons } from "../services/apiService";
import { Link } from "react-router-dom";
import React, {
  useEffect,
  useState
} from "react";
import {
  Container,
  Grid,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface Pokemon {
  id: string;
  name: string;
  imagem: string;
  types: string[];
  moves: string[];
}

export const PokedexList = () => {
      const [pokemons, setPokemons] = useState < Pokemon[] > ([]);
      const [originalPokemons, setOriginalPokemons] = useState < Pokemon[] > ([]);
      const [nextOffset, setNextOffset] = useState(0);
      const theme = useTheme();
      const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

      useEffect(() => {
          loadPokemons(pokemons.length.toString());
      }, []);

      const loadPokemons = async (LimitValue: string) => {
          try {
              const result = await ListPokemons(LimitValue);
              setPokemons(result);
              setOriginalPokemons(result);
          } catch (error) {
              console.error("Erro ao obter Pokémon:", error);
          }
      };

      const handleButtonClick = async () => {
          try {

              const result = await ListPokemons(pokemons.length.toString());
              setPokemons((prevPokemons: Pokemon[]) => [...prevPokemons, ...result]);
              setOriginalPokemons((prevPokemons: Pokemon[]) => [
                  ...prevPokemons,
                  ...result,
              ]);
          } catch (error) {
              console.error("Erro ao carregar mais Pokémon:", error);
          }
      };

      const handleSearchChange = (searchValue: string) => {
          if (searchValue === "") {
              setPokemons(originalPokemons);
          } else if (searchValue.length === 1) {
              const filteredPokemons = filterPokemons(searchValue);
              setPokemons(filteredPokemons);
          } else {
              const filteredPokemons = filterPokemons(searchValue);
              setPokemons(filteredPokemons);
          }
      };

      const filterPokemons = (filterValue: string) => {
          if (filterValue === "") {
              return originalPokemons;
          } else {
              const filteredPokemons = originalPokemons.filter((pokemon) =>
                  pokemon.name
                  .toLowerCase()
                  .includes(filterValue.toLowerCase().substring(0, 3))
              );
              return filteredPokemons;
          }
      };

  return (
    <div>
      <NavBarSearch onSearchChange={handleSearchChange} />
      <Container>
        <Grid container spacing={isSmallScreen ? 1 : 2}>
          {pokemons && Array.isArray(pokemons) && pokemons.length > 0
            ? pokemons.map((pokemon: Pokemon) => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={pokemon.id}>
                  <Link to={`/Pokemon/${pokemon.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <PokemonCard
                      name={pokemon.name}
                      image={pokemon.imagem}
                      types={pokemon.types}
                      id={pokemon.id}
                    />
                  </Link>
                </Grid>
              ))
            : null}
        </Grid>

        {pokemons.length > 0 && (
          <Grid container justifyContent="center" style={{ marginTop: "16px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleButtonClick}
            >
              Carregar mais Pokémon
            </Button>
          </Grid>
        )}
      </Container>
    </div>
  );
};
