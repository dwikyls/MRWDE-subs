/**
 * @jest-environment jsdom
 */

/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';

import '@testing-library/jest-dom';

describe('RegisterInput component', () => {
  it('should handle email typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => { }} />);
    const emailInput = await screen.getByPlaceholderText('Nama');

    // Action
    await userEvent.type(emailInput, 'dwikyls1234');

    // Assert
    expect(emailInput).toHaveValue('dwikyls1234');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => { }} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(emailInput, 'dwikyls1234@gmail.com');

    // Assert
    expect(emailInput).toHaveValue('dwikyls1234@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => { }} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, '123456');

    // Assert
    expect(passwordInput).toHaveValue('123456');
  });

  it('should call register function when register button is clicked', async () => {
    // Arrange
    const mockRegister = jest.fn();
    render(<RegisterInput register={mockRegister} />);
    const namaInput = await screen.getByPlaceholderText('Nama');
    await userEvent.type(namaInput, 'dwikyls1234');
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'dwikyls1234@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, '123456');
    const registerButton = await screen.getByRole('button', { name: 'Register' });

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(mockRegister).toBeCalledWith({
      name: 'dwikyls1234',
      email: 'dwikyls1234@gmail.com',
      password: '123456',
    });
  });
});
