---
layout: blog_layout
title: "10 Things I've Learned about Drupal 7"
---

10 Things I've Learned about Drupal 7
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
My first thought on "why use a CMS" instead of a framework or another method was that learning the basics had a much more gradual learning curve making it possible to get content published very quickly. However, as my friend pointed out during our discussion, frameworks work well when there is quite a bit of interaction between the site and the user. CMS makes sense when your site is presenting a lot information to the user. When there is a lot of information, CMS's make it easier to disseminate that information quickly without affecting other areas of the site.

## 4. CMS Pyramid

1. Content  - *Documents, HTML*
2. Creative Design - *Page layout, Information Architecture, Usability*
3. Technical Design - Items created for you*Customization, PHP, JavaScript*

## 5. Drupal Admin Dashboard
The dashboard is set up so that the items used more frequently are on the left and items used less frequently are on the right. Content, structure and appearance were used quite heavily in my first trial run. The only caveat is that when setting up my first site, I did use the module tab quite frequently. But I believe this was due to setting up the site from scratch.

## 6. Content Workflow

1. Setting up the Structure - *Content types and features*
2. Adding data fields
3. Adding Content

## 7. There are five layers of a Drupal site

1. Nodes - Individual data. (*article, page, poll, etc.*)
2. Modules - Addons or plugins that add functionality to your Drupal site. Modules can be part of the core that comes with installation, they can come from the Drupal community, or you can create your own.
3. Blocks and menus - Chunks of information that display and navigate through your sites nodes.
4. User Permissions - Assignable roles for other users or collaborators. Helpful in allowing others to add content to your site while limiting security or inoperability risks.
5. Themes/Templates - The front end design or skin of the Drupal site.

##  8. Taxonomy
Taxonomy is the categorization of nodes for the site and allows users to define and organize terms. This feature is useful for creating a tagging system for nodes or linking nodes that share some type of relationships, such as linking a music artist page to an album page or vice versa.

## 9. Field API
Allows administrators to create information architecture for the requirements of individual sites instead of relying on an architecture solution that accommodates every situation. You can define new data types and create methods for collecting and displaying data on your site. Essentially, you are defining how the data for your field work, keeping it independent from the context of how the data is used.

## 10. Hooks
Hooks allow the admin to implement custom features without having to modify Drupal's core code. Think of hooks as functions that allow you to change URLs, add content to pages, or set up custom database tables.