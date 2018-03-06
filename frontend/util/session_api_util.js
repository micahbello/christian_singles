export const signup = () => {
  return $.ajax ({
    method: 'POST'
    url: '/api/users'
  });
};


export const login = () => {

}
