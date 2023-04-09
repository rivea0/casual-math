import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from '../components/Header';

describe('Header', () => {
  it('renders Header component', () => {
    render(<Header />);
    screen.getAllByAltText('logo');
    // implicit assertion, getByRole throws error if element is not there
    screen.getByRole('heading', { level: 1, name: 'Casual Math' });
    screen.getByTestId('darkModeBtn');
    screen.getByTestId('darkModeIcon');
  });
});
