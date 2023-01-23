import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

beforeEach(() => {
  render(<NotFound />);
});
describe('Testes NotFound', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    const pageReq = screen.getByRole('heading', { level: 2, name: 'Page requested not found' });
    expect(pageReq).toBeInTheDocument();
  });
  it('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const image = screen.getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
