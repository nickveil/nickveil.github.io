---
layout: blog_layout
title: "Twitter Bot"
---

Twitter Bot
=========================
 
 
Well, I had a slight change in plans with my Twitter Search app. Last time, I was working on setting up a Javascript search query for Twitter based on geocode information. Throughout this process it dawned on me, so what??? I didn't see myself using it, so I decided to go a different route. I went back down the path of creating a Twitter bot.
Luckily most of what we covered in my last blog is still valid because we are still using the twit package and registering your application still has to be done. So, let's continue down the path of a Twitter bot that automatically retweets a message the screen name that mentions you in a tweet.
#### First we connect the stream
If you're following along with my last blog, we can get rid of... 
```
T.get('search/tweets', { 
    q: 'banana since:2011-07-11', 
    count: 100 }, 
    
    function(err, data, response) {
      console.log(data);
    }
})
```
everything else is fine.
Then, we have to set up a user stream:
```
var stream = T.stream('user'):
```
from that stream, we have to listen for an event and call a function that does something once we receive a tweet. I'll name that function tweetEvent(). 
```
stream.on('tweet', tweetEvent);
```
#### Hey someone tweeted @ us.
The tweetEvent function is where we can react to a mention. We will want to capture stuff we need to reply. Such as, in_reply_to_sreen_name, text, and most important who sent the tweet. We also want to check that we are the only recipient and will want to create a responding message. For this example, our function looks like the following:
```
function tweetEvent (event){
    var replyto = event.in_reply_to_screen_name;
    var text = event.text;
    var from = event.user.screen_name;
    if (replyto ==='<Your ScreenName>'){
        var newTweet = '@' + from + ' Thanks for the tweet, have a nice day!';
        T.post('statuses/update', { status: newTweet }, function(err, data, response) {
  console.log(data)
    })
};
```
I used an if statement to check that my screenName is the only recipient of the tweet and if it is I post a message mentioning the sender.
#### Where to go from here
The Twitter bot allows a user to be active in the conversation even if they are not constantly checking their Twitter feed. There are several applications where this could be useful. An account that receives a lot of traffic and can't possibly respond to all messages. Maybe there should only be responses to messages containing specific keywords in the tweet.





