import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

const ogFetch = global.fetch;

function mockFetch(operation, expression, result) {
  global.fetch = jest.fn(() => {
    const data = { operation, expression, result };
    return Promise.resolve({
      json: () => Promise.resolve(data),
    });
  });
}

afterAll(() => {
  global.fetch = ogFetch;
});

describe('App', () => {
  afterEach(() => {
    global.fetch = ogFetch;
  });

  it('renders App component', () => {
    render(<App />);
    screen.getByTestId('container');
    screen.getByTestId('options');
    screen.getByTestId('text-area');
  });

  it('gets correct result after simplify option enter press', async () => {
    render(<App />);
    mockFetch('simplify', '2^2+2(2)', '8');
    const user = userEvent.setup();
    const simplify = screen.getByText(/Simplify/);
    await user.click(simplify);
    const inputElement = screen.getByLabelText(/Type equation to simplify:/, { selector: 'input' });
    await user.type(inputElement, '2^2+2(2){enter}');
    screen.findByText(/8/);
  });

  it('gets correct result after simplify option button click', async () => {
    render(<App />);
    mockFetch('simplify', '2^2+2(2)', '8');
    const user = userEvent.setup();
    const simplify = screen.getByText(/Simplify/);
    await user.click(simplify);
    const button = screen.getByRole('button', { name: /simplify/ });
    await user.click(button);
    screen.findByText(/8/);
  });

  it('gets correct result after factor option enter press', async () => {
    render(<App />);
    mockFetch('factor', 'x^2+2x', 'x (x + 2)');
    const user = userEvent.setup();
    const factor = screen.getByText(/Factor/);
    await user.click(factor);
    const inputElement = screen.getByLabelText(/Type equation to factor:/, { selector: 'input' });
    await user.type(inputElement, 'x^2 + 2x{enter}');
    screen.findByText(/x (x + 2)/);
  });

  it('gets correct result after factor option button click', async () => {
    render(<App />);
    mockFetch('factor', 'x^2+2x', 'x (x + 2)');
    const user = userEvent.setup();
    const factor = screen.getByText(/Factor/);
    await user.click(factor);
    const button = screen.getByRole('button', { name: /factor/ });
    await user.click(button);
    screen.findByText(/x (x + 2)/);
  });

  it('gets correct result after derive option enter press', async () => {
    render(<App />);
    mockFetch('derive', 'x^2+2x', '2 x + 2');
    const user = userEvent.setup();
    const derive = screen.getByText(/Derive/);
    await user.click(derive);
    const inputElement = screen.getByLabelText(/Type equation to derive:/, { selector: 'input' });
    await user.type(inputElement, 'x^2+2x{enter}');
    screen.findByText(/2 x + 2/);
  });

  it('gets correct result after derive option button click', async () => {
    render(<App />);
    mockFetch('derive', 'x^2+2x', '2 x + 2');
    const user = userEvent.setup();
    const derive = screen.getByText(/Derive/);
    await user.click(derive);
    const button = screen.getByRole('button', { name: /derive/ });
    await user.click(button);
    screen.findByText(/2 x + 2/);
  });

  it('gets correct result after integrate option enter press', async () => {
    render(<App />);
    mockFetch('integrate', 'x^2+2x', '1/3 x^3 + x^2');
    const user = userEvent.setup();
    const integrate = screen.getByText(/Integrate/);
    await user.click(integrate);
    const inputElement = screen.getByLabelText(/Type equation to integrate:/, { selector: 'input' });
    await user.type(inputElement, 'x^2+2x{enter}');
    screen.findByText(/1\/3 x^3 + x^2/);
  });

  it('gets correct result after integrate option button click', async () => {
    render(<App />);
    mockFetch('integrate', 'x^2+2x', '1/3 x^3 + x^2');
    const user = userEvent.setup();
    const integrate = screen.getByText(/Integrate/);
    await user.click(integrate);
    const button = screen.getByRole('button', { name: /integrate/ });
    await user.click(button);
    screen.findByText(/1\/3 x^3 + x^2/);
  });

  it('gets correct result after zeroes option enter press', async () => {
    render(<App />);
    mockFetch('zeroes', 'x^2+2x', [-2, 0]);
    const user = userEvent.setup();
    const zeroes = screen.getByText(/Find 0's/);
    await user.click(zeroes);
    const inputElement = screen.getByLabelText(/Type equation to find 0's:/, { selector: 'input' });
    await user.type(inputElement, 'x^2+2x{enter}');
    screen.findByText(/-2, 0/);
  });

  it('gets correct result after zeroes option button click', async () => {
    render(<App />);
    mockFetch('zeroes', 'x^2+2x', [-2, 0]);
    const user = userEvent.setup();
    const zeroes = screen.getByText(/Find 0's/);
    await user.click(zeroes);
    const button = screen.getByRole('button', { name: /find 0's/ });
    await user.click(button);
    screen.findByText(/-2, 0/);
  });
});
