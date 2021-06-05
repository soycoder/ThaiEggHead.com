// jwt-passport.js
import passport from "passport";
import passportJWT from 'passport-jwt';
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
import userModel from '../models/User.js';
import { jwtSecret, ROLES } from '../config/jwtConfig.js';
import { logError } from "./util.js";

export const jwtPassport = () => {
    let params = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //ExtractJwt.fromAuthHeaderWithScheme("bearer"),
        secretOrKey: jwtSecret, // 'very-secret'
    }
    var strategy = new JwtStrategy(params, (jwt_payload, done) => {
        userModel.findOne({email:jwt_payload.email})
            .then(user => {
                // done is a passport callback accepting arguments done(error, user, info)
                if (user) {  return done(null, user);  }
                return done(null, false, "Invalid User");
            })
            .catch(err => { return done(err, false, { message: "Invalid Token Credential"} );  })
    });
    
    passport.use(strategy); // make passport use a specified strategy
    return {
        initialize: () => passport.initialize(),
        authenticate: () =>  
                passport.authenticate('jwt', { session: false }) 
                // false: disable passport persistent session
                // Thus, user must send the token on each request to the secure routes
    }
};
// role must use the ROLES.<name>, role here is a number (1,2)
export const isInRole = (role) => (req, res, next) => {
    if (!req.user) 
        return res.status(404).json(logError("Need to signin"))

    const hasRole = role <= ROLES[req.user.role];
    console.log(hasRole, req.user.role, role)
    if (hasRole) return next();
    return res.status(404).json(logError(`Required ${ROLES.name(role)} authorization`))
}
