const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../model/user');

passport.use(
    new JWTStrategy(
        {
            secretOrKey : process.env.JWT_SECRET,
            jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
            // jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken() Uses this if you are usuing Bearer token
        },
        async function (token, done) {
            try{
                return done(null, token.user);
            } catch (error){
                done(error);
            }
        }  
    )
);

// This middleware saves the information provided by the user to the database,
// and then sends the information to the next middleware if succesful,
// else it send an error 
passport.use(
    'signup',
    new localStrategy(
        {
            usernameField : 'email',
            passwordField : 'password'
        },
        async function (email, password, done) {
            try{
                const user = await UserModel.create({email, password});
                return done(null, user);
            } catch (error){
                done(error);
            }
        }
    )
);


passport.use(
    'login',
    new localStrategy(
        {
            usernameField : 'email',
            passwordField : 'password'
        },
        async function (email, password, done) {
            try{
                const user = await UserModel.findOne({email});
                if(!user){
                    return done(null, false, {message : 'User not found'});
                }

                const validate = await user.isValidPassword(password);
                if(!validate){
                    return done(null, false, {message : 'Wrong Password'});
                }

                return done(null, user, {message : 'Logged in Successfully'});
            } catch (error){
                return done(error);
            }
        }

    )    
)
