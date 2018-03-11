export const updateUserInfo = (user) => {
  return $.ajax ({
    method: 'PATCH',
    url: `/api/users/${user.id}`,
    data: { user }
  });
};

export const getCurrentProfile = (user) => {
  return $.ajax ({
    method: 'GET',
    url: `/api/users/${user.id}`
  });
};
