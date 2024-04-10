import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSession, signIn } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';
import Page from '../signin/page.tsx';

// Mock the useSession hook
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({ data: null })),
  SessionProvider: ({ children }) => <>{children}</>,
  signIn: jest.fn(),
}));

describe('Page', () => {
  test('renders the signin form', () => {
    render(<Page />);

    const inputs = screen.getAllByRole('textbox');
    const buttons = screen.getAllByRole('button');

    expect(inputs.length).toBeGreaterThanOrEqual(1);
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  test('displays error message when username and password are empty', async () => {
    render(<Page />);

    const submitButton = screen.getByRole('button', { name: 'Log In' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(/please enter a valid username and password/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('calls console.log when form is submitted with valid credentials', async () => {
    const consoleSpy = jest.spyOn(console, 'log');

    render(<Page />);

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Log In' });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('submitted');
    });

    consoleSpy.mockRestore();
  });

  test('calls signIn with Google when "Sign in with Google" button is clicked', () => {
    render(<Page />);

    const googleSignInButton = screen.getByRole('button', { name: 'Sign in with Google' });
    fireEvent.click(googleSignInButton);

    expect(signIn).toHaveBeenCalledWith('google', { callbackUrl: 'http://localhost:3000/' });
  });
});