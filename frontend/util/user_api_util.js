export const updateUserInfo = (user) => {
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

export const getAllUsers = () => {
  return $.ajax ({
    method: 'GET',
    url: '/api/users'
  });
}
