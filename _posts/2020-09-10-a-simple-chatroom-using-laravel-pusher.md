---
layout: blog_layout
title: "A Simple Chatroom Application with Laravel and Pusher"
---

A Simple Chatroom Application with Laravel and Pusher  
=========================
I came across an example for a chatroom app that utilized Laravel and Pusher, a connection and messaging app that provides real-time content relay. It also touches on several features within Laravel, such as database connection, model generation, Vue.js integration, and eventing.   

<img class="blog-img" src='https://github.com/nickveil/nickveil.github.io/blob/master/_assets/blog/img/Chat_Room_display.gif?raw=true' alt='ChatRoom application made with Laravel, Vue.js, and Pusher' width='100%' >  

### Initial Laravel Setup
First, we need to create a new Laravel project within the terminal:

```laravel new laravel-chat```

which creates a project called laravel-chat in the directory. CD into the laravel-chat directory and open your editor from within. We will need to use the event broadcasting feature within Laravel. 

Open ```config/app.php``` and uncomment ```App\Providers\BroadcastServiceProvider::class``` found in 

```'providers' =>[]```

We will also need to specify the Pusher driver in the ```.env``` file.  

```BROADCAST_DRIVER=pusher```

Laravel supports Pusher out of the box but Pusher PHP SDK still needs to be installed. From the terminal within the laravel-chat directory

```composer require pusher/pusher-php-server "~4.0" ```

Find out more from the [Laravel documentation](https://laravel.com/docs/7.x/broadcasting#driver-prerequisites).


### Pusher Setup and Configuration
A free pusher account can be obtained at [https://dashboard.pusher.com/accounts/sign_up](https://dashboard.pusher.com/accounts/sign_up).
After setting  up a channel on Pusher, go to the App Keys section of the dashboard. We will need these credentials for the Laravel project. 
Add the pusher information to the ```.env``` file

<pre class="code-red">
PUSHER_APP_ID=xxxxxx 
PUSHER_APP_KEY=xxxxxxxxxxxxxxxxxxxx
PUSHER_APP_SECRET=xxxxxxxxxxxxxxxxxxxx
PUSHER_CLUSTER=xx
</pre>
Since we will be using the Laravel broadcasting services, double-check the ```config/broadcasting.php``` file. Go to the file and check the connections array to see that it is configured like so:
<pre class="code-red">
'pusher' => [
        'driver' => 'pusher',
        'key' => env('PUSHER_APP_KEY'),
        'secret' => env('PUSHER_APP_SECRET'),
        'app_id' => env('PUSHER_APP_ID'),
        'options' => [
            'cluster' => env('PUSHER_APP_CLUSTER'),
            'useTLS' => true,
        ],
</pre>

Notice that the values for key, secret, app_id, and options[cluster] all pull from the env('VALUE'). This technique is built into Laravel and keeps your pusher credentials private when pushing your project to github provided your ```.env``` file is included in your ```.gitignore``` . 

Next, we have to bring in the Laravel Mix to help compile the CSS and JavaScript. We can install the dependencies using npm.
From the terminal
```npm install```
We will also want to install Laravel Echo and the Pusher JavaScript library that allows us to subscribe to channels and listen for events that are broadcast on those channels. Again from the terminal
```npm install --save laravel-echo pusher-js```

Laravel already has the Echo configured to Pusher but it commented out. In resources/js/bootstrap.js, uncomment the following lines:

<pre class='code-red'>
import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: true
});
</pre>

### Adding Authentication

Since users need to be authenticated, we will need to add it to our project. Luckily, Laravel provides a quick way to scaffold this with its laravel/ui package. First, we have to add the package. From the terminal, run:
<pre class="code-red">
composer require laravel/ui:^2.4
php artisan ui vue --auth
</pre>
This command installs views for the layout, registration, and login;  sets up the routes for authentication; and generates a HomeController to handle post-login requests. The package also generates several pre-built controllers. More info can be found in the [documentation](https://laravel.com/docs/7.x/authentication#authentication-quickstart).
Additionally, the User model and migration tables associated with the user are created which we will need to store our authorized user information.
Before we can run our migration, we have to set up our database. I use PostgreSQL but three other [databases are supported](https://laravel.com/docs/7.x/database#introduction). This connection is also setup in the ```.env``` file.
<pre class="code-red">
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=XXXXXXXXXXXX
DB_USERNAME=XXXXXXXXXXXX
DB_PASSWORD=XXXXXXXXXXXX
</pre>
With our database connection set, we can now run ``` php artisan migrate``` in the teminal.