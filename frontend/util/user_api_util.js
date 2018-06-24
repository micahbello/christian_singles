export const updateUserInfo = (user) => {
  return $.ajax ({
    method: 'PATCH',
    url: `/api/users/${user.id}`,
    data: { user }
  });
};

export const updateUserPicture = (formData, id) => {
  return $.ajax ({
      method: 'PATCH',
      url: `/api/users/${id}`,
      contentType: false,
      processData: false,
      data: formData
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
};

export const getMatches = (id) => {
  return $.ajax ({
    method: 'GET',
    url: '/api/matches',
    data: { id }
  });
};
