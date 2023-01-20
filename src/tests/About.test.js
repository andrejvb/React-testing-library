import React from 'react';
import { screen, render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import About from '../pages/About';

beforeEach(() => {
  render(<About />);
});

describe('Teste o componente <About.js />.', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const infoPokedex = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);
    const infoPokedex2 = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them/i);
    expect(infoPokedex).toBeInTheDocument();
    expect(infoPokedex2).toBeInTheDocument();
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const aboutPokedex = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(aboutPokedex).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = render(<About />);
    const paragraph = container.querySelectorAll('p');
    expect(paragraph).toHaveLength(2);
  });
  it('Teste se a página contém a imagem', () => {
    const image = screen.getByRole('img', { name: 'Pokédex' });
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
