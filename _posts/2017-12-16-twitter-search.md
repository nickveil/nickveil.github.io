---
layout: blog_layout
title: "Twitter Search"
---

Twitter Search
=========================
 
 
## I'm done with Boot Camp!!! Now what???

So, Bootcamp is over and I’ve really switched my focus to finding a job. Instead of 
```
Route::resource('tracks', 'TrackController');
```
and 
```
foreach ($tracker as $track) { 
    $trackUpdate = $events
    	->where( 'tracker_id', $track->id )
      	->max('date');
```

I have been writing *“Hello, thank you for taking the time to review my application information…”*. And while my focus has shifted it is still important to keep practicing writing code and I decided to work on the things we touched on in class but didn’t go too in-depth into for me to have a firm grasp.

My first project was to focus on using API’s and understand how to pull them into a project. I noticed many of my classmates used API’s in their final projects and saw the wealth of information they were able to pull and incorporate into their applications. But which API to use??? I recalled during a recent meetup, many of the participants were going around the room talking about funny apps people have created and one person talked about a Twitter Bot that would take President Trump’s tweets and convert the text to crayon to make it look like the tweets were sent out by a child. This concept of automatically pulling a specific user’s tweets, altering the tweet in some way, and posting the altered tweet was very interesting to me and providing the idea for playing with an API. *Twitter*

I did a quick search for twitter bot and found a youtube series from the Coding Train called [Twitter Bot Tutorial - node.js and Processing](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6atTSxoRiVnSuOn6JHnq2yV) which I used as my guide for playing with the Twitter API. 

#### Step 1
Install node.js. 

I already had this this installed as I’m sure most people do, however I’m glad I went to the [node.js] website as they have recently upgraded to 8.9.3 to address vulnerabilities with previous versions. I just downloaded the update from the website but you can install however you prefer.

#### Step 2
Create a package.json file

In terminal, navigate to your project directory and run:
 `npm init`  
This walks you through setting up the package.json file for your project.

#### Step 3 
Install the twit package. 

This package makes connecting with the Twitter API alot easier. More information and examples can be found in the twit Github repository [here](https://github.com/ttezel/twit). From the directory as the package.json, run:
 `npm install twit --save`
This saves the dependencies needed for the twit package into the package.json file. The other thing we need to do is add 
`"start": "node search.js"`
to the scripts section of the package.json file. This will help us test our javascript code in the command line.

#### Step 4 
Register your application to get access to the Twitter API

We will need to register our app to gain access to the Twitter API. Got to [Twitter’s Developer Site](https://apps.twitter.com/) and click the Create New App button to register your app. You will need a Twitter account to do this, so if you don’t have one, create your Twitter account first. Also, be sure to have a phone number linked to your Twitter account. Without it, you will not be able to register your app.

After registering your app, you will receive the following: consumer key, consumer secret, access token, and access token secret. Hang onto these as you’ll need them to call the API.

#### Step 5
Write some Javascript

We will need to create a javascript file and write some code to call the Twitter API. First, we will need to pull in the twit library.
`var Twit = require('twit');`

Next, we will need to bring in our credentials to access the API. It is a good idea to keep this information private so we should create another javascript file to hold that information. I called mine config.js. In the config.js file place the following(make sure to use your information):

```javascript
module.exports = {
	consumer_key:         '<your consumer key>',
  	consumer_secret:      '<your consumer secret>',
 	access_token:         '<your access key>',
  	access_token_secret:  '<your access token secret>',
  	timeout_ms:           60*1000, 

}
```

Now, we will have to bring this information into our search.js file. Add the following to search.js:

```
var config = require('./config');
var T = new Twit(config);
```
 
Now it time for the fun stuff and we can start using some of the examples from [twit repo](https://github.com/ttezel/twit). For example:

```
T.get('search/tweets', { 
	q: 'banana since:2011-07-11', 
	count: 100 }, 
	
	function(err, data, response) {
  	console.log(data);
	}
})
```

will pull a query of 100 tweets that include ‘banana since:2011-07-11’ and output json data to the console.log.

#### That's all for now but ...

In the next blog we will figure out what to do with this data.  

