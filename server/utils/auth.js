const jwt = require('jsonwebtoken');
const secret = "sssssshhhhhh";
const expiration = '2h';

module.exports = {
  /* generate the token with the data, secret and the expire time */
  /* https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs */
  signToken: function ({ _id, fullName, email}) {
    console.log(`signToken: ${_id} ${fullName} ${email}`);
    const token = jwt.sign( 
      { data: {_id, fullName, email}},
      secret, 
      { expiresIn: expiration});
    return token;
  },

  /* middleware to verify the token on client requests to access protected resources */
  authMiddleware: function(req, res, next) {

    /* token can be in the request body, or query params, or in Authorization in the header */
    let token = req.body.token || req.query.token || req.headers.authorization;

    /* if in the Authorization header, the format is like this for example: */
    /* Authorization: Bearer AbCdEf123456 */
    /* need to get the token from this array */
    if(req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    /* if we don't have anything in the token, return right away */
    if(!token) {
      res.status(401).json({message: 'Authentication failed, no token in request'});
      return;
    }

    /* We have a token, go ahead and verify it, retrieve the user data from it. */
    /* Token format: xxxxx.yyyyy.zzzzz - header, payload, signature */
    /* header - signing algorithm and token type (here, JWT) */
    /* payload - user data, expire time */
    /* signature - contains the secret */
    /* Call jwt.verify with the received token, and the secret and expire time we used earlier */
    /* to get the user data */
    try {
      const { data } = jwt.verify( token, secret, {maxAge: expiration});
      /* valid token, go on and do the operation */
      req.user = data;
    } catch {
      /* invalid token, return response right away and return */
      return res.status(401).json({message: 'Authentication failed, invalid token'});
    }

    next();
  }
}