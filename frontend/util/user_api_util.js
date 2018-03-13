export const updateUserInfo = (user) => {
  debugger
  return $.ajax ({
    method: 'PATCH',
    url: `/api/users/${user.id}`,
    data: { user }
  });
};

export const getCurrentProfile = (id) => {
  return $.ajax ({
    method: 'GET',
    url: `/api/users/${id}`
  });
};
