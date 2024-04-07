import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import this library
import UserPage from '../userpage/page.tsx';

// Mock the dummy data import
jest.mock('../../data/dummy_data.json', () => ({
  Users: [
    {
      Username: 'testuser',
      TotalPoints: 1000,
    },
  ],
}));

describe('UserPage', () => {
  test('renders user information correctly', () => {
    render(<UserPage />);

    // Check if the profile picture container is rendered
    const profilePicture = screen.getByTestId('profile-picture');
    expect(profilePicture).toBeInTheDocument();

    // Check if the username is rendered correctly
    const usernameElement = screen.getByText('testuser');
    expect(usernameElement).toBeInTheDocument();

    // Check if the points are rendered correctly
    const pointsElement = screen.getByText('1000 points');
    expect(pointsElement).toBeInTheDocument();

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