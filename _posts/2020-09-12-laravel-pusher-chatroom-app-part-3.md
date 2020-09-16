---
layout: blog_layout
title: "Laravel and Pusher Chatroom App Part 3"
---

A Simple Chatroom Application with Laravel and Pusher(Part 3)  
=========================
A quick review... I came across an example for a chatroom app that utilized Laravel and Pusher, a connection and messaging app that provides real-time content relay. It also touches on several features within Laravel, such as database connection, model generation, Vue.js integration, and eventing. If you haven't started yet, go to [Part 1](http://localhost:3000/2020/09/11/laravel-pusher-chatroomapp-part-1.html) in this series to get started.    

<img class="blog-img" src='https://github.com/nickveil/nickveil.github.io/blob/master/_assets/blog/img/Chat_Room_display.gif?raw=true' alt='ChatRoom application made with Laravel, Vue.js, and Pusher' width='100%' >  

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

In the next post we'll build out the blade templates that will add and display our messages. [View Part 4 here.](http://localhost:3000/2020/09/13/laravel-pusher-chatroom-app-part-4.html)


