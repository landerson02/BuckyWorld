import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page, { submitSignIn } from '../signin/page.jsx';

describe('Page', () => {
  test('renders the signin form', () => {
    render(<Page />);

    const inputs = screen.getAllByRole('textbox');
    const buttons = screen.getAllByRole('button');

    // We expect at least 1 input for username and buttons for submitting
    expect(inputs.length).toBeGreaterThanOrEqual(1);
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  test('displays error message when username and password are empty', async () => {
    render(<Page />);

    // Assuming the submit button is always rendered and is the first button
    const submitButton = screen.getAllByRole('button')[0];
    fireEvent.click(submitButton);

    // Use findByText for asynchronous updates
    const errorMessage = await screen.findByText('Please enter a valid username and password');
    expect(errorMessage).toBeInTheDocument();
  });

  // test('calls console.log when form is submitted with valid credentials', async () => {
  //   const consoleSpy = jest.spyOn(console, 'log');
  
  //   render(<Page />);
  
  //   // Use a general method to select inputs and fill them in
  //   const inputFields = screen.getAllByRole('textbox');
  //   if (inputFields.length >= 2) {
  //     fireEvent.change(inputFields[0], { target: { value: 'testuser' } });
  //     fireEvent.change(inputFields[1], { target: { value: 'testpassword' } });
  //   }
  
  //   const form = screen.getByRole('form');
  //   fireEvent.submit(form);
  
  //   // Wait for the console.log to be called with an increased timeout
  //   await waitFor(() => {
  //     expect(consoleSpy).toHaveBeenCalledWith('submitted');
  //   }, { timeout: 5000 });
  
  //   consoleSpy.mockRestore();
  // });
});