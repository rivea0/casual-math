import React from 'react';
import { render } from '@testing-library/react';

import Option from '../components/Option';

describe('Option', () => {
  it('renders option component', () => {
    render(<Option />);
  });
});
