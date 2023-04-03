/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Text from './components/Text';

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

  it('displays the result after enter press', async () => {
    render(<Text {...obj} innerText="" />);
    // const user = userEvent.setup();
    const inputElement = screen.getByTestId('inputElement');
    await userEvent.type(inputElement, '2+2{enter}');
    await waitFor(() => expect(screen.findByText(/The result is:/)).toBeVisible());
    screen.debug();
  });
});
