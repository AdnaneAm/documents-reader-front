export default function authHeader(){
  let token = JSON.parse(localStorage.getItem('auth-token'));
  if (token) {
      return {'Authorization':`bearer ${token}`};
  } else {
      return {};
  }     
}