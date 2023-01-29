import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import Pokedex from '../pages/Pokedex';

const idTest = 'pokemon-name';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe(' Teste o componente Pokedex', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon renderizado pela Pokedex passando as props', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const title = screen.getByRole('heading', { level: 2, name: /Encountered Pokémon/i });
    expect(title).toBeInTheDocument();
  });
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon, renderizado pelo App', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { level: 2, name: /Encountered Pokémon/i });
    expect(title).toBeInTheDocument();
  });
  it('O botão deve conter o texto Próximo Pokémon', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(button).toBeInTheDocument();
  });
  it('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo Pokémon/i });
    pokemonList.forEach((pokemon) => {
      expect(screen.getByTestId(idTest).textContent).toBe(pokemon.name);
      userEvent.click(button);
    });
    expect(screen.getByTestId(idTest).textContent).toBe(pokemonList[0].name);
  });
  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo Pokémon/i });
    pokemonList.forEach(() => {
      userEvent.click(button);
      expect(screen.getAllByTestId(idTest)).toHaveLength(1);
    });
  });
  it('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição;', () => {
    renderWithRouter(<App />);
    const idTestTypes = 'pokemon-type-button';
    const typesPokemon = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const typesButton = screen.getAllByTestId(idTestTypes);
    const mapPokemon = typesButton.map((e) => e.textContent);
    const nextPokemonButton = screen.getByTestId('next-pokemon');
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(mapPokemon).toEqual(typesPokemon);

    typesButton.forEach((button) => {
      userEvent.click(button);
      pokemonList.forEach(() => {
        const types = screen.getByTestId('pokemon-type');
        expect(button.textContent).toBe(types.textContent);
        userEvent.click(nextPokemonButton);
        expect(allButton).toBeInTheDocument();
      });
    });
  });
  it('Testa os botões, All e os types Button', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId(idTest).textContent).toBe('Pikachu');
    const allButton = screen.getByRole('button', { name: 'All' });
    const fireButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireButton);
    expect(screen.getByTestId(idTest).textContent).toBe('Charmander');
    const bugButton = screen.getByRole('button', { name: /bug/i });
    userEvent.click(bugButton);
    expect(screen.getByTestId(idTest).textContent).toBe('Caterpie');
    const poisonButton = screen.getByRole('button', { name: /poison/i });
    userEvent.click(poisonButton);
    expect(screen.getByTestId(idTest).textContent).toBe('Ekans');
    userEvent.click(allButton);
    expect(screen.getByTestId(idTest).textContent).toBe('Pikachu');
    const psychicButton = screen.getByRole('button', { name: /psychic/i });
    userEvent.click(psychicButton);
    expect(screen.getByTestId(idTest).textContent).toBe('Alakazam');
    const normalButton = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normalButton);
    expect(screen.getByTestId(idTest).textContent).toBe('Snorlax');
    const dragonButton = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(dragonButton);
    expect(screen.getByTestId(idTest).textContent).toBe('Dragonair');
  });
});
