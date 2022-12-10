import decode from 'jwt-decode';

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
    return true;
  }

  checkTokenExpired(token) {
    /* decode token and get expire time */
    const userData = decode(token);
    if(userData.exp > Date.now / 1000) {
      /* hasn't expired yet */
      return false;
    }
    /* has expired */
    return true;
  }

  deleteToken() {
    localStorage.removeItem('jwtToken');
  }
}

export default new AuthService();