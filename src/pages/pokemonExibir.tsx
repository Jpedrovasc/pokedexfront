import { useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard/ModeloCard";
import { ExibirPokemon } from "../services/apiService";
import BasicTabs from "../components/Tabs/Tabs";
import {
  Container,
  Grid,
  Box,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface Pokemon {
  id: string;
  name: string;
  imagem: string;
  types: string[];
  moves: string[];
  abilities: string[];
}

export const PokemonExibir = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (id) {
      CarregarPokemon(id);
    }
  }, [id]);

  const CarregarPokemon = async (idPokemon: string) => {
    try {
      const result = await ExibirPokemon(idPokemon);
      setPokemon(result || null);
    } catch (error) {
      console.error(`Erro ao obter Pokémon com ID ${idPokemon}:`, error);
    }
  };

  return (
    <Container style={{ marginTop: '2em' }}>
      {pokemon !== null && (
        <>
          <Grid container spacing={isSmallScreen ? 1 : 2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <PokemonCard
                  name={pokemon.name}
                  image={pokemon.imagem}
                  types={pokemon.types}
                  id={pokemon.id}
                />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ borderBottom: 1, borderColor: "divider", marginTop: 2 }}>
  <BasicTabs
    tabData={[
      { label: "Abilities", content: pokemon.abilities.join(", ")  },
      { label: "Evolution", content: "Conteúdo para Evolução" },
      { label: "Movimentos", content: pokemon.moves.join(", ") },
    ]}
  />
</Box>
        </>
      )}
    </Container>
  );
};
