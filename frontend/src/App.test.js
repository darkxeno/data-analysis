import { render, screen } from '@testing-library/react';
import App from './App';

test('renders weekday on some of the fields', () => {
  render(<App />);
  const linkElement = screen.getByText(/WEEKDAY/i);
  expect(linkElement).toBeInTheDocument();
});
