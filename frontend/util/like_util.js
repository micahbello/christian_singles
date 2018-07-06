export const createLike = (currentUserId, likedUserId) => {
  return $.ajax ({
      method: 'POST',
      url: `/api/users/${currentUserId}/likes`,
      data: { like: {liker_id: currentUserId, liked_id: likedUserId }}
  });
};
