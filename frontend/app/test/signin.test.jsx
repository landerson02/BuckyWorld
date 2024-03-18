import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Page from '../signin/page.tsx';

describe('Page', () => {
  test('renders the signin form', () => {
    render(<Page />);

    // Assert that the form elements are rendered
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
  });

  test('displays error message when username and password are empty', () => {
    render(<Page />);

    // Simulate form submission with empty inputs
    fireEvent.submit(screen.getByRole('form'));

    // Assert that the error message is displayed
    expect(screen.getByText('Please enter a valid username and password')).toBeInTheDocument();
  });

  test('calls console.log when form is submitted with valid credentials', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Page />);

    // Fill in the username and password inputs
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testpassword' } });

    // Simulate form submission
    fireEvent.submit(screen.getByRole('form'));

    // Assert that console.log was called
    expect(consoleSpy).toHaveBeenCalledWith('submitted');
    consoleSpy.mockRestore();
  });
});