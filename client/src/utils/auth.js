import decode from 'jwt-decode';

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
class AuthService {
  saveToken(token) {
    localStorage.setItem('jwtToken', token);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  /* use jwt-decode: https://www.npmjs.com/package/jwt-decode */
  getUserFromToken() {
    const token = this.getToken();
    const userData = decode(token);
    return userData;
  }

  isLoggedIn() {
    const token = this.getToken();
    if(!token) {
      /* user logged out, token was removed */
      return false;
    }
    /* token exists, user is still logged in */
    if(this.checkTokenExpired(token)) {
      /* token expired, we removed it, not logged in */
      return false;
    }
    /* token exists, is not expired, we are logged in */
    return true;
  }

  checkTokenExpired(token) {
    try {
      /* decode token and get expire time */
      const userData = decode(token);
      if(userData.exp > Date.now() / 1000) {
        /* hasn't expired yet */
        return false;
      }
      /* has expired */
      this.deleteToken();
      return true;
    } catch (err) {
      return false;
    }
  }

  deleteToken() {
    localStorage.removeItem('jwtToken');
  }

}

export default new AuthService();
