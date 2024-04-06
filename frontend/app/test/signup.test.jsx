import { render, screen, fireEvent } from '@testing-library/react';
import Page from '../signup/page.tsx';

describe('Page Component', () => {
  test('updates input fields correctly', () => {
    render(<Page />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    // Simulate user typing
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testpass' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpass');
    expect(confirmPasswordInput.value).toBe('testpass');
  });
});