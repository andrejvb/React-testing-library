import React from 'react';
import { getByAltText, getByLabelText, getByPlaceholderText, getByRole, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const testId = 'pokemon-name';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    const { container } = renderWithRouter(<App />);
    const pokeCard = container.getElementsByClassName('pokemon');
    expect(pokeCard.length).toBe(1);
    const pokemonName = screen.getByTestId(testId);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeigth).toBeInTheDocument();
  });
  it('A partir de um click informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId(testId);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    const buttonFire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(buttonFire);
    expect(pokemonName.textContent).toBe('Charmander');
    expect(pokemonType.textContent).toBe('Fire');
    expect(pokemonWeigth.textContent).toBe('Average weight: 8.5 kg');
    const { averageWeight: { value, measurementUnit } } = pokemonList[1];
    expect(pokemonWeigth.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
    const image = screen.getByAltText(`${pokemonName.textContent} sprite`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/0a/Spr_5b_004.png');
  });
  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido;', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', '/pokemon/25');
    const pokemonName = screen.getByTestId(testId).textContent;
    userEvent.click(moreDetails);
    const pokemonDetails = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(pokemonDetails.textContent).toEqual(`${pokemonName} Details`);
  });
  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemon/${pokemonList[0].id}`);
  });
  it('Teste se existe um ícone de estrela nos Pokémon favoritados:', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId(testId).textContent;
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const favCheckBox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(favCheckBox);
    expect(favCheckBox).toBeChecked();
    const favStar = screen.getByAltText(/Pikachu is marked as favorite?/i);
    expect(favStar).toBeInTheDocument();
    expect(favStar).toHaveAttribute('src', '/star-icon.svg');
    // expect(favStar).toHaveAttribute('alt', `${pokemonName} is marked as favorite?`);
  });
});
