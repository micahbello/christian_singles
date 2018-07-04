export const createLike = (currentUserId, likedUserId) => {
  return $.ajax ({
      method: 'POST',
      url: `/api/users/${currentUserId}/likes`,
      data: { likedUserId }
  });
};
