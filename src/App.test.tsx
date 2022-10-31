// todo all app tests


import { render, screen } from '@testing-library/react';
import App from './components/App/App';

test('renders title Create Demand', () => {
  render(<App />);
  const linkElement = screen.getByText(/Create Demand/i);
  expect(linkElement).toBeInTheDocument();
});
