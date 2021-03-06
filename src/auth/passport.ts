import Passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as TwitterStrategy } from 'passport-twitter'
import { Strategy as GithubStrategy } from 'passport-github2'
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2'

import {
    addSocialId, generateEmail,
    generateToken,
    generateUsername,
    socialIdExists,
    SocialType,
    verifyUser
} from '../db/user_table'
import {addTokenForUser} from "../db/token_table";

const request = require('request');

const dotenv = require('dotenv');
dotenv.config();

Passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.HOST}/auth/google/callback`,
        passReqToCallback: true
    }, async (req, accessToken , refreshToken, profile, done) => {

        if (!profile._json.given_name || !profile._json.family_name) {
            done('data from google is incomplete. Missing name')
        }

        let result = req.cookies.userId;
        let clientIdExists = await socialIdExists(SocialType.google_id, profile.id);

        if (result && !clientIdExists) {
            // we have a user ... just modify the token table

            let user = await verifyUser(result);
            let addSocial = await addSocialId(user.uid , SocialType.google_id , profile.id);
            let tokenInsert = await addTokenForUser('google' , `${accessToken}|||${refreshToken}` , user.uid);

            done(null, {
                token: await generateToken(user)
            });
        } else if (clientIdExists) {
            if (result && (await verifyUser(result)).uid !== clientIdExists.uid) {
                return done('This social account is liked with someone else')
            }

            let tokenInsert = await addTokenForUser('google' , `${accessToken}|||${refreshToken}` , clientIdExists.uid);
            return done(null, {
                token: await generateToken(clientIdExists)
            });
        } else {
            // new user, so send it to the front-end to get more info

            done(null, {
                potential_user: {
                    first_name: profile._json.given_name,
                    middle_name: undefined,
                    last_name: profile._json.family_name,
                    email: profile._json.email || await generateEmail(profile._json.given_name, profile._json.family_name || '.google'),
                    username: await generateUsername(profile._json.given_name, profile._json.family_name),
                    google_id: profile.id,

                    // this is used to add the access_token as a field in the token table.
                    // We need to insert the user's' uid to do this.
                    // ❗❗❗ Google does provide Refresh tokens, should be kept with care until it's sent back ❗❗❗
                    // access_token: accessToken,
                    // refresh_token: refreshToken,
                    // provided_by: 'google'
                }
            });
        }

    })
);

Passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: `${process.env.HOST}/auth/facebook/callback`,
        graphAPIVersion: 'v6.0',
        enableProof: true,
        passReqToCallback: true
    }, (req, accessToken , refreshToken, profile, done) => {
        try {
            request(`https://graph.facebook.com/me?fields=email,first_name,middle_name,last_name,address,gender,age_range&access_token=${accessToken}`,
                async function (err, data, response) {
                    if (err) {
                        done(`error on fb-graph: ${err}`)
                    } else {
                        const profile = JSON.parse(response);

                        // check if there is a missing data from the provider
                        if (!profile.first_name || !profile.last_name) {
                            done('data from facebook is incomplete. Missing name')
                        }

                        let result = req.cookies.userId;
                        let clientIdExists = await socialIdExists(SocialType.facebook_id, profile.id);

                        if (result && !clientIdExists) {
                            // we have a user ... just modify the token table

                            let user = await verifyUser(result);
                            let addSocial = await addSocialId(user.uid , SocialType.facebook_id , profile.id);
                            let tokenInsert = await addTokenForUser('facebook' , `${accessToken}|||${refreshToken}` , user.uid);

                            done(null, {
                                token: await generateToken(user)
                            });
                        } else if (clientIdExists) {
                            if (result && (await verifyUser(result)).uid !== clientIdExists.uid) {
                                return done('This social account is liked with someone else')
                            }

                            let tokenInsert = await addTokenForUser('facebook' , `${accessToken}|||${refreshToken}` , clientIdExists.uid);
                            return done(null, {
                                token: await generateToken(clientIdExists)
                            });
                        } else {
                            // new user, so send it to the front-end to get more info

                            done(null, {
                                potential_user: {
                                    first_name: profile.first_name,
                                    middle_name: profile.middle_name,
                                    last_name: profile.last_name,
                                    email: profile.email || await generateEmail(profile.first_name, profile.last_name || '.facebook'),
                                    username: await generateUsername(profile.first_name, profile.last_name),
                                    age_group: profile.age_group,
                                    facebook_id: profile.id

                                    // this is used to add the access_token as a field in the token table.
                                    // We need to insert the user's' uid to do this.
                                    // ❗❗❗ Facebook doesn't provide Refresh tokens, so we need check the availability
                                    // of the access_token ❗❗❗
                                    // access_token: accessToken,
                                    // provided_by: 'facebook'
                                }
                            });
                        }

                    }
                });
        } catch (exception) {
            done(`ex: ${exception}`)
        }

    })
);

Passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_ID,   // 266033008053-06q(MORE).apps.googleusercontent.com
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET, // eEriCU9KEX(MORE)
        callbackURL: `${process.env.HOST}/auth/twitter/callback`,
        includeEmail: true,
        includeStatus: false,
        includeEntities: false,
        passReqToCallback: true
    }, async (req, accessToken , refreshToken, profile, done) => {

        if (!profile._json.name) {
            done('data from Twitter is incomplete. Missing name')
        }

        let result = req.cookies.userId;
        let clientIdExists = await socialIdExists(SocialType.twitter_id, profile.id);

        if (result && !clientIdExists) {
            // we have a user ... just modify the token table

            let user = await verifyUser(result);
            let addSocial = await addSocialId(user.uid , SocialType.twitter_id , profile.id);
            let tokenInsert = await addTokenForUser('twitter' , `${accessToken}|||${refreshToken}` , user.uid);

            done(null, {
                token: await generateToken(user)
            });
        } else if (clientIdExists) {
            if (result && (await verifyUser(result)).uid !== clientIdExists.uid) {
                return done('This social account is liked with someone else')
            }

            let tokenInsert = await addTokenForUser('twitter' , `${accessToken}|||${refreshToken}` , clientIdExists.uid);
            return done(null, {
                token: await generateToken(clientIdExists)
            });
        } else {
            // new user, so send it to the front-end to get more info

            let [ given_name , family_name ] = profile._json.name.split(' ');

            done(null, {
                potential_user: {
                    first_name: given_name,
                    middle_name: undefined,
                    last_name: family_name || '@twitter',
                    email: profile._json.email || await generateEmail(given_name, family_name || '.twitter'),
                    username: await generateUsername(given_name, family_name || `twitter`),
                    twitter_id: profile.id,
                    provided_by: 'twitter'
                }
            });
        }
    })
);

Passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.HOST}/auth/github/callback`,
        passReqToCallback: true
    }, async (req, accessToken , refreshToken, profile, done) => {

        if (!profile._json.name) {
            done('data from github is incomplete. Missing name')
        }

    let result = req.cookies.userId;
    let clientIdExists = await socialIdExists(SocialType.github_id, profile.id);

    if (result && !clientIdExists) {
        // we have a user ... just modify the token table

        let user = await verifyUser(result);
        let addSocial = await addSocialId(user.uid , SocialType.github_id , profile.id);
        let tokenInsert = await addTokenForUser('github' , `${accessToken}|||${refreshToken}` , user.uid);

        done(null, {
            token: await generateToken(user)
        });
    } else if (clientIdExists) {
        if (result && (await verifyUser(result)).uid !== clientIdExists.uid) {
            return done('This social account is liked with someone else')
        }

        let tokenInsert = await addTokenForUser('github' , `${accessToken}|||${refreshToken}` , clientIdExists.uid);
        return done(null, {
            token: await generateToken(clientIdExists)
        });
    } else {
            // new user, so send it to the front-end to get more info

            let [ given_name , family_name ] = profile._json.name.split(' ');

            done(null, {
                potential_user: {
                    first_name: given_name,
                    middle_name: undefined,
                    last_name: family_name || '.git',
                    email: profile._json.email || await generateEmail(given_name, family_name || '.git'),
                    username: await generateUsername(given_name, family_name || 'git'),
                    github_id: profile.id,

                    // this is used to add the access_token as a field in the token table.
                    // We need to insert the user's' uid to do this.
                    // ❗❗❗ Github doesn't provide Refresh tokens, token checks should be made ❗❗❗
                    // access_token: accessToken,
                    // provided_by: 'github'
                }
            });
        }

    })
);

Passport.use(new LinkedInStrategy({
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL: `${process.env.HOST}/auth/linkedin/callback`,
        scope: ['r_emailaddress' , 'r_liteprofile' , 'w_member_social'],
        state: true,
        passReqToCallback: true
    }, async (req, accessToken , refreshToken, profile, done) => {

        if (!profile.name.givenName) {
            done('data from LinkedIn is incomplete. Missing name')
        } else if (!profile.emails[0].value) {
            // done('data from LinkedIn is incomplete. Missing email')
        }

        let result = req.cookies.userId;
        let clientIdExists = await socialIdExists(SocialType.linkedin_id, profile.id);

        if (result && !clientIdExists) {
            // we have a user ... just modify the token table

            let user = await verifyUser(result);
            let addSocial = await addSocialId(user.uid , SocialType.linkedin_id , profile.id);
            let tokenInsert = await addTokenForUser('linkedin' , `${accessToken}|||${refreshToken}` , user.uid);

            done(null, {
                token: await generateToken(user)
            });
        } else if (clientIdExists) {
            if (result && (await verifyUser(result)).uid !== clientIdExists.uid) {
                return done('This social account is liked with someone else')
            }

            let tokenInsert = await addTokenForUser('linkedin' , `${accessToken}|||${refreshToken}` , clientIdExists.uid);
            return done(null, {
                token: await generateToken(clientIdExists)
            });
        } else {
            // new user, so send it to the front-end to get more info

            let { givenName , familyName } = profile.name;

            done(null, {
                potential_user: {
                    first_name: givenName,
                    middle_name: undefined,
                    last_name: familyName || '.linkedin',
                    email: profile.emails[0].value || await generateEmail(givenName, familyName || '.linkedin'),
                    username: await generateUsername(givenName, familyName || 'linkedin'),
                    linkedin_id: profile.id,

                    // this is used to add the access_token as a field in the token table.
                    // We need to insert the user's' uid to do this.
                    // ❗❗❗ Github doesn't provide Refresh tokens, token checks should be made ❗❗❗
                    // access_token: accessToken,
                    // provided_by: 'linkedin'
                }
            });
        }
    })
 );


Passport.serializeUser(function(user, done) {
    done(null, user);
});

Passport.deserializeUser(function(user, done) {
    done(null, user);
});

export default Passport
