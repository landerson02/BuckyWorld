import { render, screen, fireEvent } from '@testing-library/react';
import Page from '../signup/page.tsx';

describe('Page Component', () => {
  test('updates input fields correctly', () => {
    render(<Page />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    // Simulate user typing
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testpass' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpass');
    expect(confirmPasswordInput.value).toBe('testpass');
  });

  test('displays password mismatch error when passwords do not match', () => {
    render(<Page />);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /register/i });
  
    // Simulate user typing different passwords
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'differentpass' } });
  
    // Submit the form
    fireEvent.click(submitButton);
  
    // Check if the password mismatch error is displayed
    const errorMessage = screen.getByText(/passwords do not match/i);
    expect(errorMessage).toBeTruthy();
  });

  test('submits the form when passwords match', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Page />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /register/i });

    // Simulate user typing matching passwords
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testpass' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Check if the form is submitted
    expect(consoleSpy).toHaveBeenCalledWith('submitted');

    consoleSpy.mockRestore();
  });
});