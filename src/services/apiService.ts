// src/services/apiService.ts

import axios from 'axios';

const BASE_URL = 'http://localhost:3333/Pokedex'; 

const api = axios.create({
  baseURL: BASE_URL,
});

export const ListPokemon = async (limitValue: string) => {
  try {
    const response = await api.post('/Consultar', { limitValue }); 

    return response.data;
  } catch (error) {
    console.error('Erro na requisição API:', error);
    throw error; 
  }
};


