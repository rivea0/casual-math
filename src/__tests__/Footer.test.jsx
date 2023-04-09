import React from 'react';
import { render, screen } from '@testing-library/react';

import Footer from '../components/Footer';

describe('Footer', () => {
  it('renders footer component', () => {
    render(<Footer />);
  });

  it('displays the github link', () => {
    render(<Footer />);
    screen.getByTestId('github-link');
  });

  it('displays the github icon', () => {
    render(<Footer />);
    screen.getByTestId('github-icon');
  });

  it('displays the mail link', () => {
    render(<Footer />);
    screen.getByTestId('mail-link');
  });

  it('displays the mail icon', () => {
    render(<Footer />);
    screen.getByTestId('mail-icon');
  });

  it('displays the text', () => {
    render(<Footer />);
    screen.getByText(`\u00A9 ${new Date().getFullYear()} Eda Eren.`);
  });
});
