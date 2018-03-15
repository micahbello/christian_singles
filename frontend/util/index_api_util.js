export const getAllUsers = () => {
  return $.ajax ({
    method: 'GET',
    url: '/api/users'
  });
}
