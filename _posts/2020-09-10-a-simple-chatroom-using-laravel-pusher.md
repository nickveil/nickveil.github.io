---
layout: blog_layout
title: "A Simple Chatroom Application with Laravel and Pusher"
---

A Simple Chatroom Application with Laravel and Pusher
=========================

![ChatRoom application made with Laravel, Vue.js, and Pusher](https://photos.google.com/share/AF1QipMZZI3HESoO8g2awGPy9jDO8WXRNtx2J7vGZh41g4NJ2EiHp3cbPwEaMQoryLM46Q/photo/AF1QipPzsOWd1sxvKQOCCuNMKejB8hF1dYnsv7SQnlc_?key=UnlRREFqNHMwbEpDb2NqZ25SdGFJZnlmRkNOUVJn)
 
I came across an example for a chatroom app that utilized Laravel and Pusher, a connection and messaging app that provides real-time content relay. It also touches on several features within Laravel, such as database connection, model generation, Vue.js integration, and eventing. 

### Initial Laravel Setup
First, we need to create a new Laravel project within the terminal:

```laravel new laravel-chat```

which creates a project called laravel-chat in the directory. CD into the laravel-chat directory and open your editor from within. We will need to use the event broadcasting feature within Laravel. 

Open ```config/app.php``` and uncomment ```App\Providers\BroadcastServiceProvider::class``` found in 

```'providers' =>[]```

We will also need to specify the Pusher driver in the ```.env``` file

```BROADCAST_DRIVER=pusher```

Laravel supports Pusher out of the box but Pusher PHP SDK still needs to be installed. From the terminal within the laravel-chat directory
```composer require pusher/pusher-php-server "~4.0" ```

Find out more from the [Laravel documentation] (https://laravel.com/docs/7.x/broadcasting#driver-prerequisites).

### Pusher Setup and Configuration
A free pusher account can be obtained at [https://dashboard.pusher.com/accounts/sign_up](https://dashboard.pusher.com/accounts/sign_up). After setting up a channel on Pusher, go to the App Keys section of the dashboard. We will need these credentials for the Laravel project. 
Add the pusher information to the ```.env``` file