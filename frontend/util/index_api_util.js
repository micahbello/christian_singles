export const getAllUsers = () => {
  debugger
  return $.ajax ({
    method: 'GET',
    url: '/api/users'
  });
}
