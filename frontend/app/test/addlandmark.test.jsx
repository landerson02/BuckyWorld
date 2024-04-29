import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Page from '../addlandmark/Page';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/lib/UserContext';
import { addLandmark } from '@/lib/Service';
import '@testing-library/jest-dom';

// Mocking useRouter and addLandmark

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

jest.mock('@/lib/Service', () => ({
  addLandmark: jest.fn()
}));

/**
 * tests the functionality of the addlandmark page
 */
describe("Add Landmark Page Tests", () => {
  // Mock UserContext and useRouter
  const mockUser = {
    user: { username: "testuser", points: 100 },
    updateUser: jest.fn()
  };

  // mock push function
  const mockRouter = {
    push: jest.fn()
  };

  // clear router values
  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
    addLandmark.mockClear();
    mockRouter.push.mockClear();

    // mock coordinates pressed on the map to get here
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ lat: 10, lng: 20 })); 
  });

  // render if user logged in
  test('renders the add landmark form when the user is logged in', async () => {
    render(
      <UserContext.Provider value={mockUser}>
        <Page />
      </UserContext.Provider>
    );

    await waitFor(() => {
      // check addlandmark page displays input components
      expect(screen.getByText("Add a Landmark")).toBeInTheDocument();
      expect(screen.getByLabelText("Landmark Name")).toBeInTheDocument();
      expect(screen.getByLabelText("Points")).toBeInTheDocument();

    })
    
  });

  // tests values are updating upon new input
  test('updates landmark fields on input change', () => {
    render(
      <UserContext.Provider value={mockUser}>
        <Page />
      </UserContext.Provider>
    );

    fireEvent.change(screen.getByLabelText("Landmark Name"), { target: { value: 'New Landmark' } });
    fireEvent.change(screen.getByLabelText("Points"), { target: { value: 500 } });

    expect(screen.getByLabelText("Landmark Name").value).toBe('New Landmark');
    expect(screen.getByLabelText("Points").value).toBe('500');
  });

  // 
  test('submits the form and adds a landmark successfully', async () => {
    // Setup: Assume `addLandmark` resolves successfully
    addLandmark.mockResolvedValueOnce({ status: 200 });
  
    // Render component in the appropriate context
    render(
      <UserContext.Provider value={{ user: mockUser, updateUser: jest.fn() }}>
        <Page />
      </UserContext.Provider>
    );
  
    // Simulate user input
    fireEvent.change(screen.getByLabelText("Landmark Name"), { target: { value: 'Central Park' } });
    fireEvent.change(screen.getByLabelText("Points"), { target: { value: 300 } });
    fireEvent.change(screen.getByLabelText("Picture URL"), { target: { value: 'http://example.com/picture.jpg' } });
    fireEvent.change(screen.getByLabelText("Description"), { target: { value: 'A large public park in New York City' } });
  
    // Simulate form submission
    fireEvent.click(screen.getByText("Submit"));
  
    // Wait for add landmark api call to occur
    await waitFor(() => {
      // input arguments --> landmark
      expect(addLandmark).toHaveBeenCalledWith({
        landmarkName: 'Central Park',
        latitude: 10, 
        longitude: 20,
        url: 'http://example.com/picture.jpg',
        description: 'A large public park in New York City',
        points: 300,
        landmarkId: -1
      });
      expect(mockRouter.push).toHaveBeenCalledWith('/');
    });
  });
  

  // cancel routes back to map page
  test('navigates back on cancel', () => {
    render(
      <UserContext.Provider value={mockUser}>
        <Page />
      </UserContext.Provider>
    );

    fireEvent.click(screen.getByText("Cancel"));

    // home page
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

});
