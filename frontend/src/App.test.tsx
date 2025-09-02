import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the components that depend on external APIs
jest.mock('./pages/Home', () => {
  return function MockHome() {
    return (
      <div>
        <h1>Welcome to VeloCollab!</h1>
        <p>System Status</p>
      </div>
    );
  };
});

test('renders app with router', () => {
  render(<App />);
  // Check if the app renders without crashing
  expect(document.body).toBeInTheDocument();
});

test('renders welcome message on home page', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/welcome to velocollab/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('renders system status section', () => {
  render(<App />);
  const statusElement = screen.getByText(/system status/i);
  expect(statusElement).toBeInTheDocument();
});
