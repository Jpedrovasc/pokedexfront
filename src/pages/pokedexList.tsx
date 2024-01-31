import React, { useEffect, useState } from 'react';
import NavBarSearch from '../components/Navbar/NavBarSeach';
import PokemonCard from '../components/PokemonCard/ModeloCard';
import { Container, Grid, Button, useMediaQuery, useTheme } from '@mui/material';
import { ListPokemon } from '../services/apiService';

interface Pokemon {
  id: number;
  name: string;
  imagem: string;
  types: string[];
}

export const PokedexList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]); 
  const [nextOffset, setNextOffset] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    loadPokemons('0');
  }, []);

  const loadPokemons = async (LimitValue: string) => {
    try {
      const result = await ListPokemon(LimitValue);
      setPokemons(result);
      setNextOffset((prevOffset) => prevOffset + result.length);
    } catch (error) {
      console.error('Erro ao obter Pokémon:', error);
    }
  };

  const handleButtonClick = async () => {
    try {
      const result = await ListPokemon(nextOffset.toString());
      setPokemons((prevPokemons: Pokemon[]) => [...prevPokemons, ...result]);
      setNextOffset((prevOffset) => prevOffset + result.length);
    } catch (error) {
      console.error('Erro ao carregar mais Pokémon:', error);
    }
  };

  const handleSearchChange = (searchValue: string) => {
    if (searchValue === "") {
      loadPokemons('0');
    } else {
      pokemonFilter(searchValue);
    }
  };


  const pokemonFilter = (pokemonName: string) => {
    if (pokemonName === "") {
      // Se a barra de pesquisa estiver vazia, carregue todos os Pokémon novamente
      loadPokemons('0');
    } else {
      const filteredPokemons = pokemons.filter((pokemon: { name: string; }) =>
        pokemon.name.toLowerCase().includes(pokemonName.toLowerCase().substring(0, 3))
      );

      setPokemons(filteredPokemons);
    }
  };

  return (
    <div>
     <NavBarSearch onSearchChange={handleSearchChange} />
      <Container>
        <Grid container spacing={isSmallScreen ? 1 : 2}>
          {pokemons && Array.isArray(pokemons) && pokemons.length > 0 ? (
            pokemons.map((pokemon: Pokemon) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={pokemon.id}>
                <PokemonCard name={pokemon.name} image={pokemon.imagem} types={pokemon.types} />
              </Grid>
            ))
          ) : null}
        </Grid>

        {pokemons.length > 0 && (
          <Grid container justifyContent="center" style={{ marginTop: '16px' }}>
            <Button variant="contained" color="primary" onClick={handleButtonClick}>
              Carregar mais Pokémon
            </Button>
          </Grid>
        )}
      </Container>
    </div>
  );
};
