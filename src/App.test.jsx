import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  it('renders App component', () => {
    render(<App />);
    screen.getByTestId('container');
    screen.getByTestId('options');
    screen.getByTestId('calc-area');
  });

  it('handles simplify option click', async () => {
    render(<App />);
    const simplify = screen.getByText(/Simplify/);
    await userEvent.click(simplify);
    screen.getByLabelText(/Type equation to simplify:/);
    const inputElement = screen.getByTestId('inputElement');
    await userEvent.type(inputElement, '2+2{enter}');
    await waitFor(() => expect(screen.findByText(/The result is:/)).toBeVisible());
  });

  it('handles factor option click', async () => {
    render(<App />);
    const factor = screen.getByText(/Factor/);
    await userEvent.click(factor);
    screen.getByLabelText(/Type equation to factor:/);
  });

  it('handles derive option click', async () => {
    render(<App />);
    const derive = screen.getByText(/Derive/);
    await userEvent.click(derive);
    screen.getByLabelText(/Type equation to derive:/);
  });

  it('handles integrate option click', async () => {
    render(<App />);
    const integrate = screen.getByText(/Integrate/);
    await userEvent.click(integrate);
    screen.getByLabelText(/Type equation to integrate:/);
  });

  it('handles zeroes option click', async () => {
    render(<App />);
    const zeroes = screen.getByText(/Find 0's/);
    await userEvent.click(zeroes);
    screen.getByLabelText(/Type equation to find 0's:/);
  });
});
