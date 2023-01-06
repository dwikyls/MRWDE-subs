/**
 * test scenario for commentsReducer
 *
 * - commentsReducer function
 *  - should return initial state when given by unknown action
 *  - should return comments when given by RECEIVE_COMMENTS action
 *  - should return comments when given by ADD_COMMENT action
 *  - should return NULL when given by CLEAR_COMMENTS action
 *  - should return comments with voted/unvoted comment when given by TOGGLE_LIKE_COMMENT action
 *
 */

import commentsReducer from './reducer';

describe('commentsReducer function', () => {
  it('should return initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = commentsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return comments when given by RECEIVE_COMMENTS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_COMMENTS',
      payload: {
        comments: [
          {
            id: 'comment-1',
            content: 'Ini adalah komentar pertama',
            createdAt: '2021-06-21T07:00:00.000Z',
            owner: {
              id: 'users-1',
              name: 'John Doe',
              avatar: 'https://generated-image-url.jpg',
            },
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
    };

    // action
    const nextState = commentsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.comments);
  });

  it('should return comments when given by ADD_COMMENT action', () => {
    // arrange
    const initialState = [];

    const action = {
      type: 'ADD_COMMENT',
      payload: {
        comment: {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    // action
    const nextState = commentsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.comment, ...initialState]);
  });

  it('should return NULL when given by CLEAR_COMMENTS action', () => {
    // arrange
    const initialState = [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const action = {
      type: 'CLEAR_COMMENTS',
    };

    // action
    const nextState = commentsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });

  it('should return comments with voted/unvoted comment when given by TOGGLE_LIKE_COMMENT action', () => {
    // arrange
    const initialState = [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    let action = {
      type: 'TOGGLE_LIKE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'users-1',
        isUp: true,
      },
    };

    // action: up vote
    let nextState = commentsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
        downVotesBy: [],
      },
    ]);

    action = { ...action, payload: { ...action.payload, isUp: false } };

    // action: down vote
    nextState = commentsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [action.payload.userId],
      },
    ]);

    action = { ...action, payload: { ...action.payload, isUp: null } };

    // action: neutral vote
    nextState = commentsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);
  });
});
