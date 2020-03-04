import {User} from "../model/user";

const { ApolloServer, gql , withFilter } = require('apollo-server-express');
import {
    getAllPosts,
    getAllPostsFromProvider,
    getAllPostsFromSource,
    getAllPostsOnPublishedDate,
    getAllPostsSincePublishedDate,
    getAllPostsSinceScrapedDate,
    getPostById,
    getPostsCustom,
    getPostWithKeyword
} from '../db/post_table'

import {
    generateToken,
    getUser,
    getUsers, isEmailUsed,
    isUsernameTaken,
    makeUserAdmin,
    signInUser,
    signUpUser,
    verifyUser
} from '../db/user_table';
import {
    activationFunction,
    addInterestForUser,
    addInterestListForUser, getInterestsForUser,
    muteInterestForUser,
    removeInterestForUser, unMuteOrResetInterestForUser, updateInterestForUser
} from "../db/interest_table";
import {RedisPubSub} from "graphql-redis-subscriptions";
import {NativeClass} from "../native";
import {Interest} from "../model/interest";
import {Post} from "../model/post";
const cookie = require('cookie');

export const PubSub = new RedisPubSub();

const typeDef = gql`

    type Post {
        postid: Int,
        title: String,
        body: String,
        provider: String,
        source_link: String, 
        published_on: Int,
        scraped_on: Int,
        metadata: Metadata,
        keywords: [Keyword]
    }

    type User {
        uid: Int!,
        first_name: String!,
        middle_name: String,
        last_name: String!,
        email: String!,
        username: String!,
        phone_number: String,
        interests: [Interest],
        country: String,
        last_location: String
    }

    input IUser {
        first_name: String!,
        middle_name: String,
        last_name: String!,
        email: String!,
        username: String!,
        phone_number: String,
        country: String,
        last_location: String,
        password: String!
    }

    type Token {
        token: String
    }

    type Keyword {
        keyword: String,
        postid: Int
    }

    type Interest {
        interest: String,
        score: Float,
        uid: Int
    }

    input IInterest {
        interest: String!,
        score: Float!
    }

    input UInterest {
        interest: String,
        score: Float!
    }

    type CommunityInteraction {
        views: Int,
        likes: Int,
        replies: Int,
        retweets: Int,
        comments: Int,
        video_views: Int
    }
    
    input FilterQuery {
        title: String,
        body: String,
        provider: String,
        source: String,
        keyword: String,
        published_on: String,
        scraped_on: String,
        metadata: String,

        _title: String,
        _body: String,
        _provider: String,
        _source: String,
        _keyword: String,
        _published_on: String,
        _scraped_on: String,

        connector: String
    }

    type Owner {
        owner_id: Int,
        owner_user_name: String
    }
    
    type AdditionalThumbnails {
        config_height: Int,
        config_width: Int,
        src: String
    }

    type Dimentions {
        width: Int,
        height: Int
    }

    type Audio {
        src: String
    }

    type Image {
        src: String
    }

    interface Metadata {
        community_interaction: CommunityInteraction
    }

    type FacebookMetadata implements Metadata {
        community_interaction: CommunityInteraction
        post: FacebookPost
    }

    type TwitterMetadata implements Metadata {
        community_interaction: CommunityInteraction
        tweet: TwitterPost
    }

    type TelegramMetadata implements Metadata {
        community_interaction: CommunityInteraction
        message: TelegramPost
    }

    type InstagramMetadata implements Metadata {
        community_interaction: CommunityInteraction
        post: InstagramPost
    }

    interface PostElement {
        poster_avatar: String,
        poster_full_name: String,
        poster_user_name: String,
    }

    type FacebookPost implements PostElement {
        poster_avatar: String,
        poster_media_img: String,
        poster_media_metadata: String,
        poster_media_text: String,
        poster_full_name: String,
        poster_user_name: String,
    }

    type TwitterPost implements PostElement {
        poster_avatar: String,
        poster_full_name: String,
        poster_user_name: String,
    }

    type TelegramPost implements PostElement {
        poster_avatar: String,
        poster_full_name: String,
        poster_user_name: String,
        owner: Owner,
        audio: Audio,
        author_name: String,
        image: Image,
    }

    type InstagramPost implements PostElement {
        poster_avatar: String,
        poster_media_img: String,
        poster_media_metadata: String,
        poster_media_text: String,
        poster_full_name: String,
        poster_user_name: String,
        accessibility_caption: String,
        owner: Owner,
        dimensions: Dimentions
        is_video: Boolean
        full_size_image: String,
        additional_thumbnails: [AdditionalThumbnails],
        post_id: Int,
        thumbnail_image: String
    }

    type Query {
        getPosts(page: Int, range: Int): [Post]
        getPost(id: Int) : Post
        getPostFromProvider(provider: String, page: Int, range: Int): [Post]
        getPostFromSource(source: String, page: Int, range: Int): [Post]
    
        getPostScrapedSince(time: Int, page: Int, range: Int): [Post]
        getPostFrom(time: Int, page: Int, range: Int): [Post]
        getPostPublishedOn(time: Int, page: Int, range: Int): [Post]
    
        getPostWithKeyword(keyword: String, page: Int, range: Int): [Post]
        getPostCustomized(jsonQuery: [FilterQuery!]!, page: Int, range: Int): [Post]
        getAllUsers(page: Int, range: Int): [User]

        getUserWithId(uid: Int) : User  # ONLY FOR ADMIN ROLE USERS!
        me: User
        getUser: User   # The same as the above query but more explainatory naming
        
        isUserNameTaken(username: String) : Boolean
        isEmailUsed(email: String) : Boolean
        
        getInterestsOfUser: [Interest]
    }

    type Mutation {
        # Auth
        
        signIn(email: String!, password: String!) : Token
        signUp(new_user: IUser) : Token
        makeUserAdmin(uid: Int) : Boolean
        signOut: Boolean
        
        addInterest(interest: IInterest!) : Boolean
        updateInterestList(interests: [IInterest]!) : Boolean
        cleanUpdateInterestList(interests: [IInterest]!) : Boolean
        updateInterest(interest: String!, update: UInterest!) : Boolean
        muteInterest(interest: String!) : Boolean
        unMuteOrResetInterest(interest: String!) : Boolean
        removeInterest(interest: String!) : Boolean
        
    } 
    
    type Subscription {
        postAdded: [Post]
        postRemoved: [Post]
        userAdded: [User]
        userRemoved: [User]
    }

`;

export const [ POST_ADDED, POST_REMOVED, USER_ADDED, USER_REMOVED ] = [ "post_added" , "post_removed", "user_added", "user_removed" ];

function getVectorPairFromInterests(interests: Interest[]) {
    const returnable = [];
    interests.forEach(interest => returnable.push([ interest.interest , interest.score ]));
    return returnable;
}

function filterFn(actualPayload , variables , { currentUser }) {
    actualPayload.forEach((item: Post) => item.keywords = []);
    const vector = getVectorPairFromInterests(currentUser.interests);

    const interestScore = JSON.parse(
        NativeClass.sortByUserInterest(
            JSON.stringify([actualPayload[0]]),
            JSON.stringify(vector),
            false
        )
    );

    return activationFunction(interestScore[0].score_interest_total) > 0.5;
}

const resolvers = {
    Subscription: {
        postAdded: {
            subscribe: withFilter(
                () => PubSub.asyncIterator(POST_ADDED),
                (payload , variables , context) => filterFn(payload.postAdded, variables, context))
        },
        postRemoved: {
            subscribe: withFilter(
                () => PubSub.asyncIterator(POST_REMOVED),
                (payload , variables , context) => filterFn(payload.postRemoved, variables, context))
        },
        userAdded: { subscribe: (_ , __, { user }) => { return PubSub.asyncIterator([USER_ADDED]) } },
        userRemoved: { subscribe: (_ , __, { user }) => { return PubSub.asyncIterator([USER_REMOVED]) } },
    },

    Query: {
        getPostCustomized: async (_ , { jsonQuery, page, range }) => {
            return await getPostsCustom(jsonQuery, page, range)
        },
        getPosts: async (_ , {page , range}) => {
            return await getAllPosts(page, range)
        },
        getPost: async (_,{ id }) => {
            return await getPostById(id)
        },
        getPostFromProvider: async (_ , {provider, page, range}) => {
            return await getAllPostsFromProvider(provider, page, range)
        },
        getPostFromSource: async (_, {source, page, range}) => {
            return await getAllPostsFromSource(source, page, range)
        },
        getPostScrapedSince: async (_, {time, page, range}) => {
            return await getAllPostsSinceScrapedDate(time, page, range)
        },
        getPostPublishedOn: async (_, {time, page, range}) => {
            return await getAllPostsOnPublishedDate(time, page, range)
        },
        getPostFrom: async (_, {time, page, range}) => {
            return await getAllPostsSincePublishedDate(time, page, range)
        },
        getPostWithKeyword: async (_, {keyword, page, range}) => {
            return await getPostWithKeyword(keyword, page, range)
        },
        getAllUsers: async (_ , __, { user, page, range }) => {
            let userObject = (await user.getUser());
            if (!userObject) throw new Error('You must be authenticated & be an admin to access this');
            if (!userObject.role && userObject.role < 2) throw new Error('You must be an admin');    // These numbers might change
            return await getUsers(page, range);
        },

        getUserWithId: async (_, { uid }, { user }) => {
            if (!await user.getUser()) throw new Error('You must be authenticated to access this');
            let returnableUser = await getUser(uid);
            returnableUser.password_hash = undefined;
            return returnableUser;
        },

        me: async ( _ , __ , { user }) => { return user.getUser() },
        getUser: async (_ , __ , { user }) => { return user.getUser() },

        isUserNameTaken: async ( _ , { username }) => { return await isUsernameTaken(username) },
        isEmailUsed: async ( _ , { email }) => { return await isEmailUsed(email) },

        getInterestsOfUser: async ( _ , __ , { user }) => {
            user = await user.getUser();
            if (!user) throw new Error('You must be authenticated to access this');
            return getInterestsForUser(user.uid);
        }
    },

    Metadata: {
        __resolveType(metadata) {
            if (metadata.message) return 'TelegramMetadata';
            else if (metadata.post && metadata.post.additional_thumbnails) return 'InstagramMetadata';
            else if (metadata.post) return 'FacebookMetadata';
            else if (metadata.tweet) return 'TwitterMetadata';
            else return null
        },
    },

    Post: {
        published_on: (incoming) => {
            return new Date(incoming.published_on).getTime() / 1000
        },
        scraped_on: (incoming) => {
            return new Date(incoming.scraped_on).getTime() / 1000   // sec time instead of micro
        }
    },

    Mutation: {

        makeUserAdmin: async (_, { uid }, { user }) => {
            user = await user.getUser();
            if (!user) throw new Error('You must be authenticated to access this');
            if (user.role < 4) throw new Error('You are not an admin');
            return makeUserAdmin(uid)
        },
        signIn: async (_, { email, password }, { user }) => {
            let token = await signInUser(email, password);
            await user.signInUser(token);
            return { token }
        },
        signUp: async (_, { new_user }, {user}) => {
            let token = await signUpUser(new_user.first_name, new_user.middle_name, new_user.last_name,
                new_user.phone_number, new_user.username, new_user.country, new_user.email, new_user.password);
            const generatedToken = await generateToken(token)
            await user.signInUser(generatedToken);
            return { token:  generatedToken}
        },

        signOut: async (_, __, {user}) => {
            return !await user.signOutUser();
        },

        addInterest: async (_ , {interest} , {user}) => {
            let userObj = await user.getUser();
            if (!userObj) throw new Error('You must be authenticated to access this');
            return !!await addInterestForUser(interest.interest , interest.score, userObj.uid);
        },

        updateInterest: async (_ , { interest , update } , {user}) => {
            let userObj = await user.getUser();
            if (!userObj) throw new Error('You must be authenticated to access this');
            return !!await updateInterestForUser(interest , update , userObj.uid);
        },

        updateInterestList: async (_ , {interests} , {user}) => {
            let userObj = await user.getUser();
            if (!userObj) throw new Error('You must be authenticated to access this');
            return addInterestListForUser(interests , userObj.uid)
        },

        cleanUpdateInterestList: async (_ , {interests} , {user}) => {
            let userObj = await user.getUser();
            if (!userObj) throw new Error('You must be authenticated to access this');
            return addInterestListForUser(interests , userObj.uid , true)
        },

        muteInterest: async (_ , {interest} , {user}) => {
            let userObj = await user.getUser();
            if (!userObj) throw new Error('You must be authenticated to access this');
            return !!await muteInterestForUser(interest, userObj.uid)
        },

        unMuteOrResetInterest: async (_ , {interest} , {user}) => {
            let userObj = await user.getUser();
            if (!userObj) throw new Error('You must be authenticated to access this');
            return !!await unMuteOrResetInterestForUser(interest, userObj.uid)
        },

        removeInterest: async (_ , {interest} , {user}) => {
            let userObj = await user.getUser();
            if (!userObj) throw new Error('You must be authenticated to access this');
            return removeInterestForUser(interest , userObj.uid)
        },
    },

};

export class UserHandler {
    req;
    res;

    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async signOutUser() {
       await this.res.clearCookie('userId');
    }

    async signInUser(token) {
        let time = new Date().getTime() + (process.env.USER_SESSION_EXPIRES_AFTER);   // one week
        const cookieOptions = { httpOnly: false, expires: new Date(time) };
        this.res.cookie('userId', token, cookieOptions);
    }

    async getUser() {
        let token = this.req.headers.authorization;

        if (!token && this.req.cookies) token = this.req.cookies.userId || '';

        if (token) return await verifyUser(token);
        else return null
    }
}

async function getCookieFromWebSocket(webSocket): Promise<any> {
    return new Promise((resolve , reject) => resolve(cookie.parse(webSocket.upgradeReq.headers.cookie)));
}

export const server = new ApolloServer({ typeDefs: typeDef , resolvers,
    subscriptions: {
        onConnect: async (connectionParams, webSocket) => {
            if (connectionParams.authToken) {
                return { currentUser: await verifyUser(connectionParams.authToken) }
            } else {
                try {
                    const cookies = await getCookieFromWebSocket(webSocket);
                    if (cookies.userId) return {currentUser: await verifyUser(cookies.userId)};
                } catch (e) {
                    throw new Error(`You must be signed in. more_info: ${e}`)
                }
            }
        }
    },
    context: async ({ req, res, connection }) => {
        if (!req || !req.headers) return connection.context;
        else return {user: new UserHandler(req, res)}
    },
    playground: {
        settings: {
            // include cookies in the requests from the GraphQL playground
            'request.credentials': 'include',
        },
    },
});
