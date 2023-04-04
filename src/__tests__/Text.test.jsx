/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import Text from '../components/Text';

const obj = {
  innerText: ['1', '2', '3'],
  handleEnterPress: jest.fn(),
  handleButtonClick: jest.fn(),
  handleChange: jest.fn(),
  equationValue: '',
  content: '',
  result: '',
};

describe('Text', () => {
  it('renders Text component', () => {
    render(<Text {...obj} />);
    screen.getByTestId('text');
  });

  it('does not display result with initial render', () => {
    render(<Text {...obj} />);
    expect(screen.queryByText(/The result is:/)).toBeNull();
  });

  it('displays the input element on simplify option click', async () => {
    render(<App />);
    const user = userEvent.setup();
    const simplify = screen.getByText(/Simplify/);
    await user.click(simplify);
    screen.getByLabelText(/Type equation to simplify:/, { selector: 'input' });
  });

  it('displays the input element on factor option click', async () => {
    render(<App />);
    const user = userEvent.setup();
    const factor = screen.getByText(/Factor/);
    await user.click(factor);
    screen.getByLabelText(/Type equation to factor:/, { selector: 'input' });
  });

  it('displays the input element on derive option click', async () => {
    render(<App />);
    const user = userEvent.setup();
    const derive = screen.getByText(/Derive/);
    await user.click(derive);
    screen.getByLabelText(/Type equation to derive:/, { selector: 'input' });
  });

  it('displays the input element on integrate option click', async () => {
    render(<App />);
    const user = userEvent.setup();
    const integrate = screen.getByText(/Integrate/);
    await user.click(integrate);
    screen.getByLabelText(/Type equation to integrate:/, { selector: 'input' });
  });

  it('displays the input element on zeroes option click', async () => {
    render(<App />);
    const zeroes = screen.getByText(/Find 0's/);
    await userEvent.click(zeroes);
    screen.getByLabelText(/Type equation to find 0's:/);
  });
});
