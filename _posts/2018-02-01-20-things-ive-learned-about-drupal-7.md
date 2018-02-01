---
layout: blog_layout
title: "20 Things I've Learned about Drupal 7"
---

20 Things I've Learned about Drupal 7
=========================
 
This week I was fortunate enough to receive an invitation for a face to face interview with a prospective employer. I participated in a phone interview a few weeks back and while I thought the position would be a great opportunity to utilize my previous experience with customer service and managing small projects, the focus was on my knowledge of Drupal 7. I had very little. Actually, I had zero experience with Drupal 7 and very little with Drupal 8. Needless to say, I didn't feel comfortable with the conversation and did not think I would be asked to meet. But, luckily they saw something in my past experience to give me a second chance to which I am very grateful and fortunate. After speaking with a friend about these sequences of events, he mentioned that a good exercise for me to familiarize myself with Drupal 7 might be to write this blog post. And I completely agreed! 

Lets Start with the basics:
### 1. Installing Drupal
This may be a bit of a misnomer as I never really felt that I "installed" Drupal. I used the [Pantheon](https://pantheon.io/) free hosting platform that allowed me to practice Drupal. It provides the entire LAMP stack and is all hosted in the cloud. The free dev account allows users to develop two sandbox projects with either Drupal 7 or 8 or WordPress. It's easy to set up and quick.

### 2. Setting up A Drupal Project
After deploying a CMS to your dev account in Pantheon, you can quickly set up installation Drupal to set up your site. But configuring the site did have a few section that wasn't explained very well and I messed up a couple times.

##### Site Information
__Site Name:__ This is obvious. *What you plan to call your site*

__Site Email:__ This is the email account message from your site will use. *It's a good idea to use an address ending in your domain name to prevent these emails from being flagged as spam.* 

##### Site Maintenance Account
__Username:__ This is the site admin account. *Should be something unique but not necessarily tied to a specific user*

__Email address:__ An email account that is actively being used. *Example: account to recover admin password*

__Password:__ Password for the admin account. *Use a good password. Remember this is the account that can do anything to your website.*

##### Server Settings
Make sure these settings reflect the time zone the website is operating in. *Especially if there will be time sensitive information on your site*

### 3. Why a Content Management System (CMS)
My first thought on "why use a CMS" instead of a framework or another method was that learning the basics had a much more gradual learning curve making it possible to get content published very quickly. However, as my friend pointed out during our discussion, frameworks work well when there is quite a bit of interaction between the site and the user. CMS makes a lot of sense when your site is presenting information to the user. When there is a lot of information, CMS's make it easier to disseminate that information quickly without affecting other areas of the site.

## 4. CMS Pyramid

1. Content  - *Documents, HTML*
2. Creative Design - *Page layout, Information Architecture, Usability*
3. Technical Design - Items created for you*Customization, PHP, JavaScript*

## 5. Drupal Admin Dashboard
The dashboard is set up so that the items used more frequently are on the left and items used less frequently are on the right. Content, structure and appearance were used quite heavily in my first trial run. The only caveat is that when setting up my first site, I did use the module tab quite frequently. But I believe this was due to setting up the site from scratch.

## 6. Content Workflow

1. Setting up the Structure * Content types and features*
2. Adding data fields
3. Adding Content