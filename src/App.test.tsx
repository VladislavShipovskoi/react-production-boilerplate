import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ready text', () => {
  render(<App />);
  const textElement = screen.getByText(/Ready/i);
  expect(textElement).toBeInTheDocument();
});
