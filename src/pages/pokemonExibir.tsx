import { useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard/ModeloCard";
import { ExibirPokemon } from "../services/apiService";
import BasicTabs from "../components/Tabs/Tabs";
import IPokemon from "../interface/IPokemon"
import {
  Container,
  Grid,
  Box,
  useMediaQuery,
  useTheme,
  Chip,
} from "@mui/material";



export const PokemonExibir = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
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
    <Container style={{ marginTop: theme.spacing(4) }}>
      {pokemon && (
        <>
          <Grid
            container
            spacing={isSmallScreen ? 1 : 2}
            justifyContent="center"
          >
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
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              marginTop: theme.spacing(2),
            }}
          >
            <BasicTabs
              tabData={[
                {
                  label: "Abilities",
                  content: (
                    <div>
                      {pokemon.abilities.map((abilitie, index) => (
                        <p key={index}>{abilitie}</p>
                      ))}
                    </div>
                  ),
                },
                {
                  label: "Evolutions",
                  content: (
                    <div>
                      {pokemon.evolutions.map((evolution, index) => (
                        <p key={index}>{evolution}</p>
                      ))}
                    </div>
                  ),
                },
                {
                  label: "Movements",
                  content: (
                    <div>
                      {pokemon.moves.map((move, index) => (
                        <p key={index}>{move}</p>
                      ))}
                    </div>
                  ),
                },
              ]}
            />
          </Box>
        </>
      )}
    </Container>
  );
};
