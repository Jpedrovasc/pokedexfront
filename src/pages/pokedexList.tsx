import React, { useEffect, useState } from 'react';
import NavBarSearch from '../components/Navbar/NavBarSeach';
import PokemonCard from '../components/PokemonCard/ModeloCard';
import { Container, Grid, Button, useMediaQuery, useTheme } from '@mui/material';
import { ListPokemon } from '../services/apiService';

export const PokedexList = () => {
  const [pokemons, setPokemons] = useState<any>([]);
  const [nextOffset, setNextOffset] = useState(0); // Offset para carregar os próximos Pokémon
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    try {
      const result = await ListPokemon(nextOffset.toString());
      // Limpa a lista antiga e adiciona os novos Pokémon
      setPokemons(result);
      setNextOffset((prevOffset) => prevOffset + result.length);
    } catch (error) {
      console.error('Erro ao obter Pokémon:', error);
    }
  };

  const handleButtonClick = () => {
    loadPokemons();
  };

  return (
    <div>
      <NavBarSearch />
      <Container>
        <Grid container spacing={isSmallScreen ? 1 : 2}>
          {pokemons && Array.isArray(pokemons) && pokemons.length > 0 ? (
            pokemons.map((pokemon: { id: number; name: string; imagem: string }) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={pokemon.id}>
                <PokemonCard name={pokemon.name} image={pokemon.imagem} />
              </Grid>
            ))
          ) : (
            null
          )}
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
