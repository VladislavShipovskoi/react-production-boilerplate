import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders production ready text', () => {
  render(<App />);
  const textElement = screen.getByText(/Production Ready Architecture/i);
  expect(textElement).toBeInTheDocument();
});
