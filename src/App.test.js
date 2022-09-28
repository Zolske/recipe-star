// The code is based on  "Adam Lapinski's" walk-through project "Moments"!
// https://github.com/Code-Institute-Solutions/moments

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
