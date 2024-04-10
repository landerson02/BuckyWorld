import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserPage from '../userpage/page.tsx';
import { useSession } from 'next-auth/react';

// Mock the useSession hook
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

describe('UserPage', () => {
  beforeEach(() => {
    jest.mocked(useSession).mockReturnValue({
      data: {
        user: {
          name: 'testuser',
          email: 'testuser@example.com',
          image: '/path/to/profile-image.jpg',
        },
      },
    });
  });

  test('renders user information correctly', () => {
    render(<UserPage />);
    // Check if the profile picture is rendered
    const profilePicture = screen.getByAltText('user');
    expect(profilePicture).toBeInTheDocument();

    // Check if the username is rendered correctly
    const usernameElement = screen.getByTestId('username');
    expect(usernameElement).toBeInTheDocument();

    // Check if the email is rendered correctly
    const emailElement = screen.getByTestId('email');
    expect(emailElement).toBeInTheDocument(); 

    // Check if the points are rendered correctly
    const pointsElement = screen.getByTestId('points');
    expect(pointsElement).toHaveTextContent('120 points');

    // Check if the leaderboard position is rendered
    const positionElement = screen.getByText(/---- #56 on leaderboard ----/);
    expect(positionElement).toBeInTheDocument();
  });

  test('renders buttons correctly', () => {
    render(<UserPage />);

    // Check if all buttons are rendered
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(3);

    // Check button text
    expect(buttons[0]).toHaveTextContent('Account');
    expect(buttons[1]).toHaveTextContent('Leaderboard');
    expect(buttons[2]).toHaveTextContent('Logout');
  });
});