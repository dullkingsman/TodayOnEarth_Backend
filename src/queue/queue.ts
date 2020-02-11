import Queue from 'bull'
import { insertPost } from '../db/post_table'
import TwitterFetcher from '../PostFetchers/TwitterFetcher'
import FacebookFetcher from '../PostFetchers/FacebookFetcher'
import TelegramFetcher from '../PostFetchers/TelegramFetcher'
import InstagramFetcher from '../PostFetchers/InstagramFetcher'

const TwitterQueue = new Queue('twitter_queue'); 
const FacebookQueue = new Queue('facebook_queue'); 
const InstagramQueue = new Queue('instagram_queue'); 
const TelegramQueue = new Queue('telegram_queue');

TwitterQueue.process((job) => {
    // twitter scraper module => push to db
    // ,then
    
    return new TwitterFetcher(job.data.from , job.data.source).getPosts().then(
        posts => posts.forEach(
            post => {
                if (post.metadata) {
                    // move keywords outside
                    if (typeof post.metadata === 'string') post.metadata = JSON.parse(post.metadata)
                    if (post.metadata.keywords != undefined) post.keywords = post.metadata.keywords
                    post.metadata.keywords = undefined
                }
                insertPost(post).then(() => 
                    console.log(`added ${post.source_link} from ${post.provider}`)
                ).catch(e => console.error(`failed to add ${post.source_link} with ${e}`))
            }
        )
    )

})

FacebookQueue.process((job) => {
    // facebook scraper module => push to db
    // ,then
    return new FacebookFetcher(job.data.from , job.data.source).getPosts().then(
        posts => posts.forEach(
            post => {
                if (post.metadata && post.metadata.keywords) {
                    // move keywords outside
                    post.keywords = post.metadata.keywords
                    post.metadata.keywords = undefined
                }
                insertPost(post).then(() => 
                    console.log(`added ${post.source_link} from ${post.provider}`)                
                ).catch(e => console.error(`failed to add ${post.source_link} with ${e}`))
            }
        )
    )
})

InstagramQueue.process((job) => {
    // instagram scraper module => push to db
    // ,then
    return new InstagramFetcher(job.data.from , job.data.source).getPosts().then(
        posts => posts.forEach(
            post => {
                if (post.metadata && post.metadata.keywords) {
                    // move keywords outside
                    post.keywords = post.metadata.keywords
                    post.metadata.keywords = undefined
                }
                insertPost(post).then(() => 
                    console.log(`added ${post.source_link} from ${post.provider}`)
                ).catch(e => console.error(`failed to add ${post.source_link} with ${e}`))
            }
        )
    )
})

TelegramQueue.process((job) => {
    // telegram scraper module => push to db
    // ,then
    return new TelegramFetcher(job.data.from , job.data.source).getPosts().then(
        posts => posts.forEach(
            post => {

                if (post.metadata && post.metadata.keywords) {
                    post.keywords = post.metadata.keywords
                    post.metadata.keywords = undefined
                }

                insertPost(post).then(() => 
                    console.log(`added ${post.source_link} from ${post.provider}`)
                ).catch(e => console.error(`failed to add ${post.source_link} with ${e}`))
            }
        )
    );
})

async function addToTwitter(taskdata : object, cron : string = '20 * * * * *') {
    TwitterQueue.add(taskdata , {repeat: { cron: cron }})
}

async function addToFacebook(taskdata : object, cron : string = '20 * * * * *') {
    FacebookQueue.add(taskdata , {repeat: { cron: cron }})
}

async function addToInstagram(taskdata : object, cron : string = '20 * * * * *') {
    InstagramQueue.add(taskdata , {repeat: { cron: cron }})
}

async function addToTelegram(taskdata : object, cron : string = '20 * * * * *') {
    TelegramQueue.add(taskdata , {repeat: { cron: cron }})
}

export {
    addToTwitter,
    addToFacebook,
    addToInstagram,
    addToTelegram
}