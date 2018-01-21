---
layout: blog_layout
title: "Working with JSON"
---

Working with JSON
=========================
 
I had a bit of a "duh" moment today while working on re-familiarizing myself with a vue.js project. I created a contact list where I wanted to focus on learning transitions and annimations and had to reference an example from the boot camp to set it up. It came back to me fairly quickly, but there was one line of code that led me down a rabbit hole and ultimately led me to an idea that I think will help me bring in data and style projects much quicker.

## That line of code??
```bash
axios.get("http://blahblahblah.com/api/images/get?format=xml&results_per_page=6")
```

The portion that peaked my interest wasn't the axios.get call, but the URL itself. I have seen other examples that aren't tied to an API  and wondered where does the URL come from? Then "duh", it dawned on me that I can create a JSON object and store it in a repo and call it from any project I am working on. I could actually create a GitHub repo with just different JSON objects, use them to provide a quick data set and help with styling/formatting the page. The only trick is that when you navigate to the JSON file in the repo, you have to use the URL provided when clicking on the "raw" button.