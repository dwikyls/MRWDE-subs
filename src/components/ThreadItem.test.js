/**
 * @jest-environment jsdom
 */

/**
 * skenario testing
 *
 * - ThreadItem component
 *   - should not have user Id on vote
 *   - should handle up vote
 *   - should handle down vote
 *   - should handle neutral vote
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThreadItem from './ThreadItem';

import '@testing-library/jest-dom';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('ThreadItem component', () => {
  it('should handle up vote', async () => {
    const mockVote = jest.fn();
    const initialThread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
      vote: mockVote,
      authUser: 'users-1',
    };

    // Arrange
    render(<ThreadItem {...initialThread} />);
    const likeButton = await screen.findByLabelText(`like-${initialThread.id}`);
    const likeIcon = await screen.findByLabelText(`like-icon-${initialThread.id}`);

    // Action
    await userEvent.click(likeButton);

    // Assert
    expect(likeIcon).toHaveStyle('color: red');
  });
});
