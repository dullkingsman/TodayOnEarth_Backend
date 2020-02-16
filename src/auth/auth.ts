import { Router } from "express";
import Passport  from './passport'

export const authRouter = Router();
authRouter.use(Passport.initialize());
authRouter.use(Passport.session());

authRouter.get('/google' , Passport.authenticate('google', {
    authType: 'rerequest', accessType: 'offline', prompt: 'consent', includeGrantedScopes: true,
    scope: ['profile' , 'email' , 'openid']}));

authRouter.get('/google/callback' , Passport.authenticate('google', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }),
    function(req, res) {
        res.status(200).send({
            auth: 'success',
            provider: 'google',
            message: 'You have logged in correctly'
        })
    }
);

authRouter.get('/facebook' , Passport.authenticate('facebook', {
    authType: 'rerequest', accessType: 'offline', prompt: 'consent', scope: ['email' , 'public_profile']}));

authRouter.get('/facebook/callback' , Passport.authenticate('facebook', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }),
    function(req, res) {
        res.status(200).send({
            auth: 'success',
            provider: 'facebook',
            message: 'You have logged in correctly'
        })
    }
);

authRouter.get('/twitter' , Passport.authenticate('twitter'));

authRouter.get('/twitter/callback' , Passport.authenticate('twitter', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }),
    function(req, res) {
        res.status(200).send({
            auth: 'success',
            provider: 'twitter',
            message: 'You have logged in correctly'
        })
    }
);

authRouter.get('/github' , Passport.authenticate('github', { accessType: 'offline' }));

authRouter.get('/github/callback' , Passport.authenticate('github', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }),
    function(req, res) {
        res.status(200).send({
            auth: 'success',
            provider: 'github',
            message: 'You have logged in correctly'
        })
    }
);

authRouter.get('/success' , (req , res) => {
    res.status(200).send({
        auth: 'success',
        message: 'You have logged in correctly'
    })
});

authRouter.get('/failure' , (req , res) => {
    res.status(401).send({
        auth: 'failure',
        message: 'You are not logged in'
    })
});

