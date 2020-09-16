---
layout: blog_layout
title: "Laravel and Pusher Chatroom App Part 5"
---

A Simple Chatroom Application with Laravel and Pusher(Part 5)  
=========================
A quick review... I came across an example for a chatroom app that utilized Laravel and Pusher, a connection and messaging app that provides real-time content relay. It also touches on several features within Laravel, such as database connection, model generation, Vue.js integration, and eventing. If you haven't started yet, go to [Part 1](http://localhost:3000/2020/09/11/laravel-pusher-chatroomapp-part-1.html) in this series to get started.    

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
Before we can run our migration, we have to set up our database. I use PostgreSQL but other [databases are supported](https://laravel.com/docs/7.x/database#introduction). Connecting the database for our dev work is also done in the  ```.env``` file.
<pre class="code-red">
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=XXXXXXXXXXXX
DB_USERNAME=XXXXXXXXXXXX
DB_PASSWORD=XXXXXXXXXXXX
</pre>
With our database connection set, we can now run ``` php artisan migrate``` in the teminal.

### Adding the Message Model
We'll start by creating a Model with a corresponding migration file.
```php artisan make:model Message -m```
This generates a ```Message.php``` model in the ```/app``` folder of our project that contains our Message class. Open our ```Message.php``` file and we will need to specify the table column where our messages will be stored to the database by adding a ```protected $fillable ``` variable like so:
<pre class='code-red'>
/**
     * Fields that are mass assignable
     * 
     * @var array
     */
    protected $fillable = ['message'];
</pre>
Now, we have to set up our database schema to store our messages. In ```app/database/migrations``` folder we want to open the ```messages``` table migration that was created with our ```make:model -m``` command above. Within the ``` up()``` function, we have to update the schema for our messages table to look like the code below:
<pre class="code-red">
Schema::create('messages', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->text('message');
            $table->timestamps();
        });
</pre>
With our model and schema updated we can now run the migration in the terminal:
```php artisan migrate```

** As a side note, if something looks messed up in the messages table(ie. 'messages' is spelled wrong) you can correct the error in your migrations table and run PHP artisan migrate:refresh``` in the terminal which will rollback your and re-execute the migrations. This is a good option at the beginning of a project when there might not be as much data loss, but if you're further along in your project, look at the [Migrations Section](https://laravel.com/docs/7.x/migrations#running-migrations) of the Laravel docs to find a suitable solution.

### Setting up the User and Message Relationship

Back to our models, we have to define the relationships between User and Message.
First, we will update the ```app/Message.php``` model by adding a user function to the Message class: 
<pre class="code-red">
 /**
     * A message belongs to a user
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
</pre>

Next, we will do something similar in the ```User``` model by adding a messages function to the User class:
<pre class='code-red'>
/**
     * A user can have many messages
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function messages()
    {
        return $this->hasMany(Message::class);
    }
</pre>

Notice the ```belongsTo``` and ```hasMany``` methods that are being returned in each function? These are part of the [Eloquent ORM](https://laravel.com/docs/7.x/eloquent-relationships#introduction) which is included with Laravel.

### Defining the Route

Now we can define our routes. In ```routes/web.php```,  we can set this up by replacing the default Route with: 
<pre class='code-red'>
Auth::routes();

Route::get('/', 'ChatsController@index');
Route::get('messages', 'ChatsController@fetchMessages'); 
Route::post('messages', 'ChatsController@sendMessage'); 
</pre>
Now a couple things we want to consider. First, we have changed the ```/home``` route so we will have to change the ```$redirectTo``` variable in both ```app/Http/Controllers/Auth/LoginController.php``` and ```app/Http/Controllers/Auth/RegisterController.php```. 

We will change it to:
<pre class='code-red'>
protected $redirectTo = '/'; 
</pre>
which sends it to our newly created path after a user registers or logs in. Second, the ChatsController defined in our routes is not set up yet, so lets do that now.

### ChatsController
We will begin by using artisan to create the controller in the terminal:
```php artisan make:controller ChatsController```
which gives us a bare-bones controller. Quite a bit we have to do here. First, let's build the construct to validate our user is logged in:
<pre class='code-red'>
public function __construct() { 
	$this->middleware('auth'); 
}
</pre>

Since we are using the Auth middleware, we'll have to include the ```use Illuminate\Support\Facades\Auth;``` dependency.


Next, we will create an index function that returns a view(we still have to create) to display our chatroom. 
<pre class='code-red'>
    /**
    * Show chats
    * 
    * @return \Illuminate\Http\Response
    */
    public function index()
    {
        return view('chat');
    }
</pre>


Next, we will define a fetchMessages function that returns all the message the user can see:

<pre class='code-red'>
    /**
    * Fetch all messages
    *
    * @return Message
    */
    public function fetchMessages()
    {
        return Message::with('user')->get();
    }
</pre>

Again, we will want to make sure we have access to our Messages by including it in our dependencies ```use App\Message;```

And then we want to make sure that any new message created by the user persists to the database
<pre class='code-red'>
    /** 
    * Persist message to the database
    *
    * @param  Request $request
    * @return Response
    */
    public function sendMessage(Request $request)
    {
        $user = Auth::user();

        $message = $user->messages()->create([
            'message' => $request->input('message')
        ]);

        return ['status' => 'Message Sent!'];
    }
</pre>

The entire controller should look like this:
<pre class='code-red'>
    <?php

    namespace App\Http\Controllers;

    use App\Message;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;


    class ChatsController extends Controller
    {
        public function __construct()
        {
            $this->middleware('auth');
        }

        /**
        * Show chats
        * 
        * @return \Illuminate\Http\Response
        */
        public function index()
        {
            return view('chat');
        }

        * Fetch all messages
        *
        * @return Message
        */
        public function fetchMessages()
        {
            return Message::with('user')->get();
        }

        /**
        * Persist message to the database
        *
        * @param  Request $request
        * @return Response
        */
        public function sendMessage(Request $request)
        {
            $user = Auth::user();

            $message = $user->messages()->create([
                'message' => $request->input('message')
            ]);

            return ['status' => 'Message Sent!'];
        }
    }
</pre>




### Chat View

Create a view called ```chat.blade.php``` in  ```app/resources/views``` to display the chat room. This file can be done in many different ways. Here is how I did it:
<pre class='code-red'>
// app/resources/views/chat.blade.php

@extends('layouts.app')

@section('content')

&lt;div class="display-3 text-center"&gt;ChatRoom&lt;/div&gt;
&lt;div class="container"&gt;
    &lt;div class="row"&gt;
        &lt;div class="col-md-10 col-md-offset-1"&gt;
            &lt;div class="chat-block p-4"&gt;
                &lt;chat-messages :messages="messages" class="messages"&gt;&lt;/chat-messages&gt;
            &lt;/div&gt;
            &lt;div class="panel-footer"&gt;
                &lt;chat-form
                    v-on:messagesent="addMessage"
                    :user="{{ Auth::user() }}"
                &gt;&lt;/chat-form&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
@endsection

</pre>
And the corresponding style in ```app/resources/sass/app.scss``` : 
<pre class='code-red'>

.text-right {
    text-align: right;
}


.blockquote {
    margin: 15px;
    color: $purple
    
}
.user-color {
    color: $cyan;
}
.chat {
    overflow-y: scroll;
    max-height: 400px;
   
}

.chat::-webkit-scrollbar {
    width: .5em;
}
 
.chat::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px $blue;
    border-radius: 10px;
    background-color: #F5F5F5;
}
 
.chat::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px $gray;
    background-color: $cyan;
}
</pre>
Again, this can really look however you want it to but the important pieces are ```@extends ('layouts.app')``` which maintains the key pieces of the rest of the site. 

The 
<pre class='code-red'>
  @section('content')
	// code....
  @endsection
</pre>
which defines where this blade file should insert itself into the ```layouts/app.blade.php``` file.  

And the ```<chat-form>``` and ```<chat-messages>``` elements which are Vue components we still need to create.