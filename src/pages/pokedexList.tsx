import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBarSearch from "../components/Navbar/NavBarSeach";
import PokemonCard from "../components/PokemonCard/ModeloCard";
import { ListPokemons } from "../services/apiService";
import IPokemon from "../interface/IPokemon"
import {
  Container,
  Grid,
  Button,
  useMediaQuery,
  useTheme,
  Skeleton,
} from "@mui/material";


export const PokedexList = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [originalPokemons, setOriginalPokemons] = useState<IPokemon[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(true); 
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    try {
      setLoading(true);
      const result = await ListPokemons(pokemons.length.toString());
      setPokemons(result);
      setOriginalPokemons(result);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter Pokémon:", error);
    }
  };

  const handleButtonClick = async () => {
    try {
      setButtonDisabled(true); 
      setLoading(true);
      const result = await ListPokemons(pokemons.length.toString());
      setPokemons((prevPokemons: IPokemon[]) => [...prevPokemons, ...result]);
      setOriginalPokemons((prevPokemons: IPokemon[]) => [
        ...prevPokemons,
        ...result,
      ]);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar mais Pokémon:", error);
    } finally {
      setButtonDisabled(false);
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
        pokemon.name.toLowerCase().includes(filterValue.toLowerCase().substring(0, 3))
      );
      return filteredPokemons;
    }
  };

  return (
    <div>
      <NavBarSearch onSearchChange={handleSearchChange} />
      <Container>
        <Grid container spacing={isSmallScreen ? 1 : 2}>
          {loading ? (
            // Exibindo o efeito Skeleton durante o carregamento
            Array.from({ length: 12 }).map((_, index) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                <Skeleton variant="rectangular" height={150} />
              </Grid>
            ))
          ) : (
            pokemons.map((pokemon: IPokemon) => (
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
          )}
        </Grid>

        {pokemons.length > 0 && !loading && (
          <Grid container justifyContent="center" style={{ marginTop: "16px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleButtonClick}
              disabled={buttonDisabled} 
            >
              Carregar mais Pokémon
            </Button>
          </Grid>
        )}
      </Container>
    </div>
  );
};