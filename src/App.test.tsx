import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the app', () => {
  const { getByTestId } = render(<App />);
  const startButton = getByTestId('start-button');
  expect(startButton).toBeInTheDocument();
});