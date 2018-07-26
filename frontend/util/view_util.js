export const createView = (currentUserId, viewedUserId) => {
  return $.ajax ({
      method: 'POST',
      url: `/api/users/${currentUserId}/views`,
      data: { view: {viewed_id: viewedUserId, viewer_id: currentUserId}}
  });
};
