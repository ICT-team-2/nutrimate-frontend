export const ADD_COMMENT = 'ADD_COMMENT';

export const addComment = (postId, comment) => ({
  type: ADD_COMMENT,
  payload: {
    postId,
    comment,
  },
});

export const editPost = (postId, newData) => ({
  type: 'EDIT_POST',
  payload: {
    postId,
    newData
  }
});