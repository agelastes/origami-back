const JwtStarategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const keys = require('../config/keys');
const User = mongoose.model('users');
const usersUtils = require('../utils/userUtils');

const options = {
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey: keys.jwt,
};

module.exports = (passport) => {
  passport.use(
      new JwtStarategy(options, async (payload, done) => {
        try {
            const currentUser = await User.findById(payload.userId);
            const user = usersUtils.mapUserToClient(currentUser);

            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (e) {
            console.log(e);
        }
      })
  )
};
