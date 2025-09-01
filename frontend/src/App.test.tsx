import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders VeloCollab MVP title', () => {
  render(<App />);
  const titleElement = screen.getByText(/VeloCollab MVP/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders connecting to API message initially', () => {
  render(<App />);
  const loadingElement = screen.getByText(/connecting to api/i);
  expect(loadingElement).toBeInTheDocument();
});

test('renders phase 1 completion message', () => {
  render(<App />);
  const phaseElement = screen.getByText(/phase 1: project foundation complete/i);
  expect(phaseElement).toBeInTheDocument();
});
